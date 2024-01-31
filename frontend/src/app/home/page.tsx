'use client'

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import ApolloClient from "@/clients/apollo";
import { ApolloProvider } from "@apollo/client";
import  Videos  from "../../components/videos";
import Background from "../../components/background"
import { abi } from "../../constants/videoPie";
import { Contract_Address } from "../../constants/videoPie";



interface IProps {
  horizontal?: Boolean;
}

const HomePage: React.FC<IProps> = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    // Ethereum provider and contract address (replace these with your actual values)
    const provider = new ethers.JsonRpcProvider("https://testnet-rpc.areon.network");
   
  
    const contract = new ethers.Contract(Contract_Address, abi, provider);
  
    const getVideos = async () => {
        try {
          setLoading(true);
    
      // Call the appropriate function on your smart contract to retrieve videos
      const allVideos = await contract.getVideos();
    
      // Call the function to get video properties
      const [videoId, videoHash, videoTitle, videoLivepeerID] = await contract.getVideosWithProperties();

      // Combine video information and properties
      const videosData = allVideos.map((video: any, index: any) => ({
        id: Number(video.id),
        hash: video.hash,
        title: video.title,
        description: video.description,
        thumbnailHash: video.thumbnailHash,
        duration: Number(video.twt),
        livepeerID: video.livepeerID,
        author: video.author    
        // Add other properties as needed from videoIds, videoHash, etc.
      }));

      console.log("Videos", videosData);

      // Set the videos to the state
      setVideos(videosData);
      setLoading(false);
        } catch (error) {
          console.error("Error fetching videos:", error);
          setLoading(false);
        }
      };
    
      useEffect(() => {
        // Runs the function getVideos when the component is mounted
        getVideos();
      }, []);
    

  
  return (
      
    <ApolloProvider client={ApolloClient}> 
      <Background className="w-full">   
        <div className="w-full bg-[#1a1c1f] flex flex-row">
           
             <div className="flex flex-row flex-wrap">

              <div className="flex-1 h-screen flex flex-col">
                
                <div className="flex flex-row flex-wrap">
              </div>
              {loading ? (
                <>
                {Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="w-80">
                      <Loader />
                    </div>
                  ))}
                </>
              ) : (
                videos?.map((video:any) => (
                  <Videos video={video} horizontal={false} />
                ))
              )}
           </div>       
        </div>
        </div>
      </Background>   
    </ApolloProvider>

  );
}

const Loader = () => {
  return (
    <div className="flex flex-col m-5 animate-pulse">
      <div className="w-full bg-gray-300 dark:bg-border-dark h-40 rounded-lg "></div>
      <div className="w-50 mt-3 bg-gray-300 dark:bg-border-dark h-6 rounded-md "></div>
      <div className="w-24 bg-gray-300 h-3 dark:bg-border-dark  mt-3 rounded-md "></div>
    </div>
  );
}

export default HomePage