'use client'

import React from "react";
import client  from "@/clients/apollo";
import { ApolloProvider } from "@apollo/client";
import { LivepeerConfig } from "@livepeer/react";
import LivepeerClient from "@/clients/livepeer";
import VideoPlayer from "./videoplayer";

export type Video = {
    id: string | undefined;
}

const VideoPlayerPage = () => {

    return (

        <ApolloProvider client={client}>
            <LivepeerConfig client={LivepeerClient}>
                <VideoPlayer />
            </LivepeerConfig>
    </ApolloProvider>
    )
}

export default VideoPlayerPage;