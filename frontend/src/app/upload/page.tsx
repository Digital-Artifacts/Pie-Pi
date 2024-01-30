'use client'

import LivepeerClient from "@/clients/livepeer";
import { LivepeerConfig } from "@livepeer/react";
import Upload from "./upload";
import { ApolloProvider } from "@apollo/client";
import ApolloClient from "@/clients/apollo";

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

        <ApolloProvider client={ApolloClient}>
            <LivepeerConfig client={LivepeerClient}>
                <Upload />
            </LivepeerConfig>
        </ApolloProvider>
    )
}

export default UploadPage;