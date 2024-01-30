import React, { useEffect, useState } from "react";
import { useAsset } from "@livepeer/react";
import Plyr, { PlyrInstance } from "plyr-react";
import "plyr-react/plyr.css";


interface PlayerProps {
    id: any;
  }
  
  const Player: React.FC<PlayerProps> = ({ id }) => {

    const { data: asset, error, status } = useAsset(id);

    if (status === 'loading') {
      return <p>Loading!</p>;
    }

    if (error || !asset) {
      console.error("Error fetching asset data: error");
      return <p>Error loading video.</p>
    }
    
 

    return (
        <Plyr
            source={{
                type: "video",
                title: asset?.name,

                sources: [
                    {
                        src: asset?.downloadUrl,
                        type: "video/mp4",
                    },
                ],
            }}
            options={{
                autoPlay: true,
            }}
                autoPlay={true}
            />
    );
}

export default Player;