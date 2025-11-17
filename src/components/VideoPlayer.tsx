'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ReactPlayerProps } from 'react-player'; // This will now resolve from our custom .d.ts file

// Dynamically import the component without trying to infer its type here.
const ReactPlayerClient = dynamic(() => import('react-player'), { ssr: false });

// A clean, reusable Play icon component
const PlayIcon = () => (
  <svg
    className="absolute inset-0 m-auto h-20 w-20 text-white opacity-75 transition-opacity group-hover:opacity-100"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

interface VideoPlayerProps {
  url: string;
  thumbnailUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, thumbnailUrl }) => {
  const [isActivated, setIsActivated] = useState(false);

  if (!isActivated) {
    return (
      <div
        className="relative w-full h-full aspect-[16/9] bg-cover bg-center cursor-pointer group"
        style={{ backgroundImage: `url(${thumbnailUrl})` }}
        onClick={() => setIsActivated(true)}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
        <PlayIcon />
      </div>
    );
  }

  // Cast the client to the correct props type to satisfy TypeScript
  const TypedPlayer = ReactPlayerClient as React.ComponentType<ReactPlayerProps>;

  return (
    <div className="relative aspect-[16/9]">
      <TypedPlayer
        url={url}
        playing={true}
        width="100%"
        height="100%"
        controls={true}
        muted={false}
        className="absolute top-0 left-0"
      />
    </div>
  );
};

export default VideoPlayer;
