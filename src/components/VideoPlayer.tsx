'use client';

import React, { useState, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ReactPlayerProps } from 'react-player'; // This will now resolve from our custom .d.ts file

// Dynamically import the component without trying to infer its type here.
const ReactPlayerClient = dynamic(() => import('react-player'), { ssr: false });

// A clean, reusable Play icon component
const PlayIcon = () => (
  <svg
    className="absolute inset-0 m-auto h-20 w-20 text-white opacity-75 transition-opacity group-hover:opacity-100"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16M9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664z"
      clipRule="evenodd"
    />
  </svg>
);

interface VideoPlayerProps {
  url: string;
  thumbnailUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, thumbnailUrl }) => {
  const [isActivated, setIsActivated] = useState(false);
  const playerRef = useRef<any>(null);

  const handleReady = useCallback(() => {
    // This is the definitive fix:
    // We directly command the internal player instance to play.
    // This bypasses any declarative prop race conditions and respects browser autoplay policies when muted.
    if (playerRef.current) {
      const internalPlayer = playerRef.current.getInternalPlayer();
      if (internalPlayer) {
        internalPlayer.play().catch((error: any) => {
          console.error("Video play failed:", error);
        });
      }
    }
  }, []);

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

  // We need to cast the type to include the 'ref' prop.
  const TypedPlayer = ReactPlayerClient as React.ComponentType<ReactPlayerProps & { ref: React.Ref<any> }>;

  return (
    <div className="relative aspect-[16/9]">
      <TypedPlayer
        ref={playerRef}
        url={url}
        playing={true} // Keep this for players that do respond to it
        onReady={handleReady}
        width="100%"
        height="100%"
        controls={true}
        muted={true} // Muting is essential for autoplay
        className="absolute top-0 left-0"
      />
    </div>
  );
};

export default VideoPlayer;
