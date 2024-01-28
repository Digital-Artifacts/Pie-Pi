// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IERC20 {
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    function transfer(address to, uint256 amount) external returns (bool);

    function approve(address spender, uint256 value) external returns (bool);

    function totalSupply() external view returns (uint256);
}

contract VideoPie is Ownable {
    // Name of your contract
    string public name = "VideoPie";

    // Pie token
    // using SafeERC20 for IERC20;
    IERC20 public immutable pie;

    // Creating a mapping of videoCount to videoCount
    mapping(string => Video) public videos;

    // Create a mapping for total view count of a video
    mapping(string => uint256) public video_view_count;

    // Create a mapping for User token allocation in relation to a video
    // video hash => user address => allocation
    mapping(string => mapping(address => uint256)) public user_token_allocation;

    // Create a struct called 'Video' with the following properties:
    struct Video {
        string hash;
        string title;
        string description;
        string location;
        string category;
        string thumbnailHash;
        string date;
        address author;
        uint256 twt;
        uint256 author_allocation;
    }

    // Create a 'VideoUploaded' event that emits the properties of the video
    event VideoUploaded(
        string indexed hash,
        string title,
        string description,
        string location,
        string category,
        string thumbnailHash,
        string date,
        address indexed author
    );

    event VideoWatched(
        string indexed hash,
        address userAddress,
        uint256 allocation
    );

    event RewardUser(string indexed hash, address userAddress, uint256 reward);

    constructor(address _pieToken) Ownable(msg.sender) {
        pie = IERC20(_pieToken);
        // pie.approve(address(this), pie.totalSupply());
    }

    // Function to upload a video
    function uploadVideo(
        string memory _videoHash,
        string memory _title,
        string memory _description,
        string memory _location,
        string memory _category,
        string memory _thumbnailHash,
        string memory _date,
        uint256 _twt,
        address _author
    ) public onlyOwner {
        // Validating the video hash, title and author's address
        require(bytes(_videoHash).length > 0, "Invalid Byte Length!");
        require(bytes(_title).length > 0, "Invalid Title!");
        require(
            keccak256(abi.encode(videos[_videoHash].hash)) !=
                keccak256(abi.encode(_videoHash)),
            "Video already exists!"
        );

        // Adding the video to the contract
        Video memory _video = Video({
            twt: _twt,
            hash: _videoHash,
            title: _title,
            description: _description,
            location: _location,
            category: _category,
            thumbnailHash: _thumbnailHash,
            date: _date,
            author: _author,
            author_allocation: 0
        });

        videos[_videoHash] = _video;

        // Triggering the event
        emit VideoUploaded(
            _videoHash,
            _title,
            _description,
            _location,
            _category,
            _thumbnailHash,
            _date,
            _author
        );
    }

    // Function to be called after a user locks in their watch time
    function lockInWatchTime(
        string memory _videoHash,
        uint256 _watchTime,
        address _userAddress
    ) public onlyOwner {
        // Make sure the video exists
        require(bytes(_videoHash).length > 0);
        require(msg.sender != address(0));
        require(
            keccak256(abi.encode(videos[_videoHash].hash)) ==
                keccak256(abi.encode(_videoHash)),
            "Video doesn't Exist!"
        );
        require(videos[_videoHash].twt == _watchTime, "Invalid watch time");

        // add view count to video
        video_view_count[_videoHash]++;

        // calculate token allocation based on watch time
        uint256 token_allocation = calculateTokenAllocation(
            videos[_videoHash].twt
        );
        user_token_allocation[_videoHash][_userAddress] += token_allocation;

        emit VideoWatched(_videoHash, _userAddress, token_allocation);
    }

    function claimRewards(string memory _videoHash, uint256 _watchTime) public {
        require(
            videos[_videoHash].twt == _watchTime,
            "WatchTime and VideoLength Mismatch!"
        );
        require(
            user_token_allocation[_videoHash][msg.sender] != 0,
            "No Tokens To Claim"
        );

        uint256 user_allocation = user_token_allocation[_videoHash][msg.sender];
        user_token_allocation[_videoHash][msg.sender] = 0;

        bool success = pie.transfer(msg.sender, user_allocation);
        require(success, "Failed to transfer tokens");

        emit RewardUser(_videoHash, msg.sender, user_allocation);
    }

    // function to calculate tokena allocation
    function calculateTokenAllocation(uint256 _twt)
        private
        pure
        returns (uint256)
    {
        (bool success, uint256 res) = Math.tryDiv((_twt * 10**18), 60);
        require(success, "Invalid Total Watch Time");

        return res;
    }
}
