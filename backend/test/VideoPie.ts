import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("VideoPie", function () {
  async function setUp() {
    const [owner, test, author, watcher] = await ethers.getSigners();

    const PieToken = await ethers.getContractFactory("Pie");
    const pie = await PieToken.deploy("Pie", "PIE", owner);

    const VideoPie = await ethers.getContractFactory("VideoPie");
    const videoPie = await VideoPie.deploy(pie.getAddress());

    await pie
      .connect(owner)
      .transfer(videoPie.getAddress(), await pie.balanceOf(owner.address));

    return { owner, test, pie, videoPie, author, watcher };
  }

  describe("Deployment", function () {
    it("ERC20 name should be Pie", async function () {
      const { pie, owner } = await loadFixture(setUp);

      // console.log(await pie);
      expect(await pie.name()).to.eq("Pie");
      expect(await pie.owner()).to.eq(owner);
    });

    it("Balance of VideoPie should be 1,000,000", async function () {
      const { pie, videoPie } = await loadFixture(setUp);

      let token_count = ethers.parseEther("1000000");

      expect(await pie.balanceOf(videoPie.getAddress())).to.eq(token_count);
    });

    it("VideoPie Contract name Should be 'VideoPie' and Should have address of Pie contract", async function () {
      const { videoPie, pie } = await loadFixture(setUp);

      expect(await videoPie.name()).to.eq("VideoPie");
      expect(await videoPie.pie()).to.eq(await pie.getAddress());
    });

    it("VideoPie should be owned by Owner address", async function () {
      const { videoPie, owner } = await loadFixture(setUp);

      expect(await videoPie.owner()).to.eq(owner);
    });
  });

  describe("Upload Video", function () {
    it("Should fail to Upload Video", async function () {
      const { videoPie, test } = await loadFixture(setUp);

      await expect(
        videoPie
          .connect(test)
          .uploadVideo(
            "hash",
            "title",
            "description",
            "location",
            "category",
            "thumbnailHash",
            "date",
            1,
            test.address
          )
      ).to.be.revertedWithCustomError(videoPie, "OwnableUnauthorizedAccount");
    });

    it("Should Upload Video Successfully", async function () {
      const { videoPie, owner, author } = await loadFixture(setUp);

      await expect(
        videoPie
          .connect(owner)
          .uploadVideo(
            "hash111",
            "title",
            "description",
            "location",
            "category",
            "thumbnailHash",
            "date",
            1,
            author.address
          )
      )
        .to.emit(videoPie, "VideoUploaded")
        .withArgs(
          "hash111",
          "title",
          "description",
          "location",
          "category",
          "thumbnailHash",
          "date",
          author.address
        );
    });

    it("Should Fail to Upload Video", async function () {
      const { videoPie, owner, author } = await loadFixture(setUp);

      // upload a video
      await videoPie
        .connect(owner)
        .uploadVideo(
          "hash111",
          "title",
          "description",
          "location",
          "category",
          "thumbnailHash",
          "date",
          1,
          author.address
        );

      // try to upload again with the exact same data
      await expect(
        videoPie
          .connect(owner)
          .uploadVideo(
            "hash111",
            "title",
            "description",
            "location",
            "category",
            "thumbnailHash",
            "date",
            1,
            author.address
          )
      ).to.be.revertedWith("Video already exists!");
    });

    it("Video author should be author", async function () {
      const { videoPie, owner, author } = await loadFixture(setUp);

      // upload a video
      await videoPie
        .connect(owner)
        .uploadVideo(
          "hash111",
          "title",
          "description",
          "location",
          "category",
          "thumbnailHash",
          "date",
          1,
          author.address
        );

      // get the result from the mapping
      const details = await videoPie.videos("hash111");

      expect(details[details.length - 3]).to.eq(author.address);
    });
  });

  describe("Watch Time and Reward Claim", async function () {
    it("Should Lock In Watch Successfully", async function () {
      const { videoPie, owner, author, watcher } = await loadFixture(setUp);

      // upload a video
      await videoPie
        .connect(owner)
        .uploadVideo(
          "hash111",
          "title",
          "description",
          "location",
          "category",
          "thumbnailHash",
          "date",
          1,
          author.address
        );

      // lock in a watch time
      let allocation = (1n * 10n ** 18n) / 60n;
      await expect(
        videoPie.connect(owner).lockInWatchTime("hash111", 1, watcher.address)
      )
        .to.emit(videoPie, "VideoWatched")
        .withArgs("hash111", watcher.address, allocation);
    });

    it("Should Not Allow Lock In Of Watch Time", async function () {
      const { videoPie, owner, author, watcher } = await loadFixture(setUp);

      // upload a video
      await videoPie
        .connect(owner)
        .uploadVideo(
          "hash111",
          "title",
          "description",
          "location",
          "category",
          "thumbnailHash",
          "date",
          1,
          author.address
        );

      // lock in invalid watch time
      await expect(
        videoPie.connect(owner).lockInWatchTime("hash111", 5, watcher.address)
      ).to.be.revertedWith("Invalid watch time");
    });

    it("Should Allow Claim Of Rewards", async function () {
      const { videoPie, pie, owner, author, watcher } = await loadFixture(
        setUp
      );

      // upload a video
      await videoPie
        .connect(owner)
        .uploadVideo(
          "hash111",
          "title",
          "description",
          "location",
          "category",
          "thumbnailHash",
          "date",
          1,
          author.address
        );

      // lock in watch time
      await videoPie
        .connect(owner)
        .lockInWatchTime("hash111", 1, watcher.address);

      console.log(await pie.allowance(owner, videoPie.getAddress()));

      // claim reward
      await videoPie.connect(watcher).claimRewards("hash111", 1);

      let allocation = (1n * 10n ** 18n) / 60n;
      expect(await pie.balanceOf(watcher.address)).to.eq(allocation);
    });
  });
});
