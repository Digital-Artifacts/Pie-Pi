// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

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
    IERC20 public immutable pie;

    // Creating a mapping of videoCount to videoCount
    mapping(uint256 => Video) public videos;

    // Create a mapping for total view count of a video
    mapping(uint256 => uint256) public video_view_count;

    // Create a mapping for User token allocation in relation to a video
    // video id => user address => allocation
    mapping(uint256 => mapping(address => uint256)) public user_token_allocation;

    uint256 public videoCount = 0;

    // Create a struct called 'Video' with the following properties:
    struct Video {
        uint256 id;
        string hash;
        string title;
        string description;
        string location;
        string category;
        string thumbnailHash;
        string date;
        address author;
        uint256 twt;
        string livepeerID;
        uint256 author_allocation;
    }

    // Create a 'VideoUploaded' event that emits the properties of the video
    event VideoUploaded(
        uint256 indexed id,
        string hash,
        string title,
        string description,
        string location,
        string category,
        string thumbnailHash,
        string date,
        uint256 twt,
        string livepeerID,
        address indexed author
    );

    event VideoWatched(
        uint256 indexed id,
        address userAddress,
        uint256 allocation
    );

    event RewardUser(uint256 indexed id, address userAddress, uint256 reward);

    constructor(address _pieToken) Ownable(msg.sender) {
        pie = IERC20(_pieToken);
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
        string memory _livepeerID,
        address _author
    ) public onlyOwner {
        // Validating the video hash, title, and author's address
        require(bytes(_videoHash).length > 0, "Invalid Byte Length!");
        require(bytes(_title).length > 0, "Invalid Title!");

        // Incrementing videoCount
        videoCount++;

        // Adding the video to the contract
        videos[videoCount] = Video({
            id: videoCount,
            hash: _videoHash,
            title: _title,
            description: _description,
            location: _location,
            category: _category,
            thumbnailHash: _thumbnailHash,
            date: _date,
            livepeerID: _livepeerID,
            author: _author,
            twt: _twt,
            author_allocation: 0
        });

        // Triggering the event
        emit VideoUploaded(
            videoCount,
            _videoHash,
            _title,
            _description,
            _location,
            _category,
            _thumbnailHash,
            _date,
            _twt,
            _livepeerID,
            _author
        );
    }

    // Function to be called after a user locks in their watch time
    function lockInWatchTime(
        uint256 _videoId,
        uint256 _watchTime,
        address _userAddress
    ) public onlyOwner {
        // Make sure the video exists
        require(_videoId > 0 && _videoId <= videoCount, "Invalid Video ID");
        require(msg.sender != address(0));
        require(
            keccak256(abi.encode(videos[_videoId].hash)) !=
                keccak256(abi.encode("")),
            "Video doesn't Exist!"
        );
        require(videos[_videoId].twt == _watchTime, "Invalid watch time");

        // add view count to video
        video_view_count[_videoId]++;

        // calculate token allocation based on watch time
        uint256 token_allocation = calculateTokenAllocation(
            videos[_videoId].twt
        );
        user_token_allocation[_videoId][_userAddress] += token_allocation;

        emit VideoWatched(_videoId, _userAddress, token_allocation);
    }

    function claimRewards(uint256 _videoId, uint256 _watchTime) public {
        require(
            videos[_videoId].twt == _watchTime,
            "WatchTime and VideoLength Mismatch!"
        );
        require(
            user_token_allocation[_videoId][msg.sender] != 0,
            "No Tokens To Claim"
        );

        uint256 user_allocation = user_token_allocation[_videoId][msg.sender];
        user_token_allocation[_videoId][msg.sender] = 0;

        bool success = pie.transfer(msg.sender, user_allocation);
        require(success, "Failed to transfer tokens");

        emit RewardUser(_videoId, msg.sender, user_allocation);
    }

    // function to calculate token allocation
    function calculateTokenAllocation(uint256 _twt)
        private
        pure
        returns (uint256)
    {
        (bool success, uint256 res) = Math.tryDiv((_twt * 10**18), 60);
        require(success, "Invalid Total Watch Time");

        return res;
    }

    // Function to get all videos
    function getVideos() public view returns (Video[] memory) {
        Video[] memory allVideos = new Video[](videoCount);
        for (uint256 i = 1; i <= videoCount; i++) {
            allVideos[i - 1] = videos[i];
        }
        return allVideos;
    }

    // Function to get all videos along with their properties
    function getVideosWithProperties() public view returns 
        (uint256[] memory, string[] memory, string[] memory, 
        string[] memory, string[] memory, 
        uint256[] memory, string[] memory, address[] memory) {
        
        
        uint256[] memory videoId = new uint256[](videoCount);
        string[] memory videoHash = new string[](videoCount);
        string[] memory videoTitle = new string[](videoCount);
        string[] memory videoDescription = new string[](videoCount);
        string[] memory videoThumbnailHash = new string[](videoCount);
        uint256[] memory videoTWT = new uint256[](videoCount);
        string[] memory videoLivepeerID = new string[](videoCount);
        address[] memory videoAuthor = new address[](videoCount);

        for (uint256 i = 1; i <= videoCount; i++) {
            videoId[i - 1] = videos[i].id;
            videoHash[i - 1] = videos[i].hash;
            videoTitle[i -1] = videos[i].title;
            videoDescription[i -1] = videos[i].description;
            videoThumbnailHash[i -1] = videos[i].thumbnailHash;
            videoTWT[i -1] = videos[i].twt; 
            videoLivepeerID[i -1] = videos[i].livepeerID;
            videoAuthor[i -1] = videos[i].author;
        }
    
        return (videoId, videoHash, videoTitle, 
                videoDescription,
                videoThumbnailHash, videoTWT, 
                videoLivepeerID, videoAuthor);
    }
}