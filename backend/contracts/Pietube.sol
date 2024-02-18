// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Pietube {

    // Declaring the videoCount 0 by default
    uint256 public videoCount = 0;

    // Name of your contract
    string public name = "Pietube";

    // Create a struct called 'Video' with the following properties:
    struct VideoMetadata {
        uint256 id;
        string hash;
        string title;
        string description;
        string location;
        string category;
        string thumbnailHash;
        string livepeerID;
        uint256 date;
        address author;
    }

    struct VideoParams {
        uint256 duration;
        uint256 bitrate;
        uint256 size;
    }

    // Mapping to store video metadata
    mapping(uint256 => VideoMetadata) public videoMetadata;

    // Mapping to store video statistics
    mapping(uint256 => VideoParams) public videoParams;

    // Create a 'VideoUploaded' event that emits the properties of the video
    event VideoUploaded(
        uint256 id,
        string hash,
        string title,
        string description,
        string location,
        string category,
        string thumbnailHash,
        string livepeerID,
        uint256 date,
        address author,
        uint256 duration,
        uint256 bitrate,
        uint256 size
    );

    // Function to upload a video
    function uploadVideo(
        string memory _videoHash,
        string memory _title,
        string memory _description,
        string memory _location,
        string memory _category,
        string memory _thumbnailHash,
        string memory _livepeerID,
        uint256 _date,
        uint256 _duration,
        uint256 _bitrate,
        uint256 _size
    ) public {
        // Validating the video hash, title and author's address
        require(bytes(_videoHash).length > 0);
        require(bytes(_title).length > 0);
        require(msg.sender != address(0));

        // Incrementing the video count 
        videoCount++;

        // Adding the video metadata to the contract
        videoMetadata[videoCount] = VideoMetadata(
            videoCount,
            _videoHash,
            _title,
            _description,
            _location,
            _category,
            _thumbnailHash,
            _livepeerID,
            _date,
            msg.sender
        );

        // Adding the video parameters to the contract
        videoParams[videoCount] = VideoParams(
            _duration,
            _bitrate,
            _size
        );

        // Triggering the event
        emit VideoUploaded(
            videoCount,
            _videoHash,
            _title,
            _description,
            _location,
            _category,
            _thumbnailHash,
            _livepeerID,
            _date,
            msg.sender,
             _duration,
            _bitrate,
            _size
        );
    }
}