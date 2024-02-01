'use client'

import LivepeerClient from "@/clients/livepeer";
import { LivepeerConfig } from "@livepeer/react";
import Upload from "./upload";


export type UploadData = {
    video: string | undefined;
    title: string;
    description: string;
    location: string;
    category: string;
    thumbnail: string;
    UploadedDate: number;
  };

  const UploadPage = () => {

    return (

        
            <LivepeerConfig client={LivepeerClient}>
                <Upload />
            </LivepeerConfig>
       
    )
}

export default UploadPage;