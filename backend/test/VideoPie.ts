import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("VideoPie", function () {
  async function setUp() {
    const [owner, test, user1] = await ethers.getSigners();

    const PieToken = await ethers.getContractFactory("Pie");
    const pie = await PieToken.deploy("Pie", "PIE", owner);

    const VideoPie = await ethers.getContractFactory("VideoPie");
    const videoPie = await VideoPie.deploy(pie.getAddress());

    return { owner, test, pie, videoPie, user1 };
  }

  describe("Deployment", function () {
    it("ERC20 name should be Pie", async function () {
      const { pie, owner } = await loadFixture(setUp);

      // console.log(await pie);
      expect(await pie.name()).to.eq("Pie");
      expect(await pie.owner()).to.eq(owner);
    });

    it("Balance of owner should be 1,000,000", async function () {
      const { pie, owner } = await loadFixture(setUp);

      let token_count = ethers.parseEther("1000000");

      expect(await pie.balanceOf(owner)).to.eq(token_count);
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

      expect(
        await videoPie
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
      ).to.be.revertedWith("Only Owner");
    });

    it("Should Upload Video Successfully", async function () {
      const { videoPie, owner, user1 } = await loadFixture(setUp);

      expect(
        await videoPie
          .connect(owner)
          .uploadVideo(
            "hash",
            "title",
            "description",
            "location",
            "category",
            "thumbnailHash",
            "date",
            1,
            user1.address
          )
      ).to.emit(videoPie, "VideoUploaded");
    });

    it("Video author should be user1", async function () {
      const { videoPie, user1 } = await loadFixture(setUp);

      const details = await videoPie.videos("hash");
      console.log(details);

      expect(details).to.eq(user1.address);
    });
  });
});
