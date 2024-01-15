'use client'

import React, { useEffect, useState } from "react";
import client  from "@/clients/apollo";
import { ApolloProvider } from "@apollo/client";
import { LivepeerConfig } from "@livepeer/react";
import LivepeerClient from "@/clients/livepeer";
import VideoPlayer from "./VideoPlayer";

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