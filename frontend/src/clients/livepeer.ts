'use client'

import { createReactClient, studioProvider } from "@livepeer/react";

const LIVEPEER_KEY = process.env.NEXT_PUBLIC_LIVEPEER_KEY || "";


const LivepeerClient = createReactClient({
    provider: studioProvider({
        apiKey: LIVEPEER_KEY
    })
});

export default LivepeerClient;