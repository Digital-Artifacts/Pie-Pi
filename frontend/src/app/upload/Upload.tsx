'use client'

import React, { useState, useRef } from "react";
import { BiCloud, BiMusic, BiPlus } from "react-icons/bi";
import { create } from "ipfs-http-client";
import saveToIPFS from "../../utils/saveToIPFS";
import { useCreateAsset } from "@livepeer/react";
import getContract from "../../utils/getContract";
import LivepeerClient from "@/clients/livepeer";
import { LivepeerConfig } from "@livepeer/react";



export type UploadData = {
  video: string | undefined;
  title: string;
  description: string;
  location: string;
  category: string;
  thumbnail: string;
  UploadedDate: number;
};



export default function Upload() {
  // Creating state for the input field
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File>();
  const [video, setVideo] = useState<File>();
  const [uploadData, setUploadData] = useState<UploadData>({
    video: '',
    title: '',
    description: '',
    location: '',
    category: '',
    thumbnail: '',
    UploadedDate: 0,
  });
  

  //  Creating a ref for thumbnail and video
  const thumbnailRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null);
  
  const {
    mutate: createAsset,
    data: assets,
    status,
    progress,
    error,
  } = useCreateAsset(
    // we use a `const` assertion here to provide better Typescript types
    // for the returned data
    video
      ? {
          sources: [
            {
              name: video.name,
              file: video,
              storage: {
                ipfs: true,
                metadata: {
                  name: "interesting video",
                  description: "a great description of the video",
                },
              },
            },
          ] as const,
        }
      : null,
  );

  const goBack = () => {
    window.history.back()
  }



  // When a user clicks on the upload button
  const handleSubmit = async () => {

    // Calling the upload video function
    await uploadVideo();

    // Calling the upload thumbnail function and getting the CID
    const thumbnailCID = await uploadThumbnail();

   
    // Creating a object to store the metadata
      let data = {
        video: assets?.[0].id,
        title,
        description,
        location,
        category,
        thumbnail: thumbnailCID,
        UploadedDate: Date.now(),
      };
      // Calling the saveVideo function and passing the metadata object
      console.log(data)
      await saveVideo(data);

      

    
  };

  // Function to upload the video to IPFS
  const uploadThumbnail = async () => {
    
    if (thumbnail) {
      // Passing the file to the saveToIPFS function and getting the CID
    const cid = await saveToIPFS(thumbnail);

    // Returning the CID
    return cid;
    } else {
      return null;
    }
    
  };

  // Function to upload the video to Livepeer
  const uploadVideo = async () => {
    
    // Calling the createAsset function from the useCreateAsset hook to upload the video
    createAsset?
    ({
      name: title,
      file: video
    }) : null

  };


  // Function to save the video to the Contract
  const saveVideo = async (data: UploadData = uploadData) => {
    // Get the contract from the getContract function
    let contract = await getContract();

    // Upload the video to the contract
    await contract.uploadVideo(
      data.video,
      data.title,
      data.description,
      data.location,
      data.category,
      data.thumbnail,
      false,
      data.UploadedDate
    );
  };


  return (

    <LivepeerConfig client={LivepeerClient}> 

    <div className="w-full h-screen bg-[#1a1c1f] flex flex-row">
      <div className="flex-1 flex flex-col">
        <div className="mt-5 mr-10 flex  justify-end">
          <div className="flex items-center">
            <button className="bg-transparent  text-[#9CA3AF] py-2 px-6 border rounded-lg  border-gray-600  mr-6">
              Discard
            </button>
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
            >
              <BiCloud />
              <p className="ml-2">Upload</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col m-10     mt-5  lg:flex-row">
          <div className="flex lg:w-3/4 flex-col ">
            <label className="text-[#9CA3AF]  text-sm">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Rick Astley - Never Gonna Give You Up (Official Music Video)"
              className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />
            <label className="text-[#9CA3AF] mt-10">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Never Gonna Give You Up was a global smash on its release in July 1987, topping the charts in 25 countries including Rick’s native UK and the US Billboard Hot 100.  It also won the Brit Award for Best single in 1988. Stock Aitken and Waterman wrote and produced the track which was the lead-off single and lead track from Rick’s debut LP “Whenever You Need Somebody."
              className="w-[90%] text-white h-32 placeholder:text-gray-600  rounded-md mt-2 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />

            <div className="flex flex-row mt-10 w-[90%]  justify-between">
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder="Bali - Indonesia"
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                />
              </div>
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                >
                  <option>Music</option>
                  <option>Sports</option>
                  <option>Gaming</option>
                  <option>News</option>
                  <option>Entertainment</option>
                  <option>Education</option>
                  <option>Science & Technology</option>
                  <option>Travel</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <label className="text-[#9CA3AF]  mt-10 text-sm">Thumbnail</label>

            <div
              onClick={() => {
                if (thumbnailRef.current) {
                  thumbnailRef.current.click();
                }
                
              }}
              className="border-2 w-64 border-gray-600  border-dashed rounded-md mt-2 p-2  h-36 items-center justify-center flex"
            >
              {thumbnail ? (
                <img
                  onClick={() => {
                    if (thumbnailRef.current) {
                      thumbnailRef.current.click();
                    }      
                  }}
                  src={URL.createObjectURL(thumbnail)}
                  alt="thumbnail"
                  className="h-full rounded-md"
                />
              ) : (
                <BiPlus size={40} color="gray" />
              )}
            </div>

            <input
              type="file"
              className="hidden"
              ref={thumbnailRef}
              onChange={(e) => {

                // Add a null check for e.target.files
                if (e.target.files && e.target.files.length > 0) {
                  setThumbnail(e.target.files[0]);
                  console.log(e.target.files[0]);
                }
              }}
            />
          </div>

          <div
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.click();
              }
            }}
            className={
              video
                ? " w-96   rounded-md  h-64 items-center justify-center flex"
                : "border-2 border-gray-600  w-96 border-dashed rounded-md mt-8   h-64 items-center justify-center flex"
            }
          >
            {video ? (
              <video
                controls
                src={URL.createObjectURL(video)}
                className="h-full rounded-md"
              />
            ) : (
              <p className="text-[#9CA3AF]">Upload Video</p>
            )}
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          ref={videoRef}
          accept={"video/*"}
          onChange={(e) => {
            
            // Add a null check for e.target.files
            if (e.target.files && e.target.files.length > 0) {
              setVideo(e.target.files[0]);
              console.log(e.target.files[0]);
            } 
          }}
        />
      </div>
    </div>

    </LivepeerConfig>
    
  );
}
