'use client'

import React, { useEffect, useState } from "react";
import { useApolloClient, gql } from "@apollo/client";
import  Video  from "../../components/video";
import VideoContainer from "../../components/videoContainer";

export type Video = {
  id: string | undefined;
}

export default function VideoPlayer() {
  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);

  const client = useApolloClient();

  const getUrlVars = () => {
    var vars: { [key: string]: string } = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value;
        return '';
      }
    );
    return vars;
  };

  const GET_VIDEOS = gql`
    query videos(
      $first: Int
      $skip: Int
      $orderBy: Video_orderBy
      $orderDirection: OrderDirection
      $where: Video_filter
    ) {
      videos(
        first: $first
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: $where
      ) {
        id
        hash
        title
        description
        location
        category
        thumbnailHash
        isAudio
        date
        author
        createdAt
      }
    }
  `;

  const getRelatedVideos = () => {
    client
      .query({
        query: GET_VIDEOS,
        variables: {
          first: 20,
          skip: 0,
          orderBy: "createdAt",
          orderDirection: "desc",
          where: {},
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        setRelatedVideos(data.videos);
          const video = data?.videos?.find((video: Video) => video.id === getUrlVars().id);
       if (video) {
        setVideo(video)
       }     
      })
      .catch((err) => {
        alert("Something went wrong. please try again.!");
      });
  };

  useEffect(() => {
    getRelatedVideos();
  }, []);

  return (
    <div className="w-full   bg-[#1a1c1f]  flex flex-row">
      <div className="flex-1 flex flex-col">
        {video && (
          <div className="flex flex-col m-10 justify-between      lg:flex-row">
            <div className="lg:w-4/6 w-6/6">
              <VideoContainer video={video} />
            </div>
            <div className="w-2/6">
              <h4 className="text-md font-bold text-white ml-5 mb-3">
                Related Videos
              </h4>
              {relatedVideos.map((video) => (
                <div
                  onClick={() => {
                    setVideo(video);
                  } }
                  key={video.id}
                >
                  <Video video={video} horizontal={true} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
