'use client';

import React, { useRef, useCallback } from 'react';
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
  const playerRef = useRef<any>(null);

  const handleReady = useCallback(() => {
    // The player is now ready, and the user has clicked (to get past the thumbnail).
    // This is the safest moment to imperatively play.
    if (playerRef.current) {
      const internalPlayer = playerRef.current.getInternalPlayer();
      if (internalPlayer) {
        internalPlayer.play().catch((error: any) => {
          console.error('Video play failed after thumbnail:', error);
        });
      }
    }
  }, []);

  // We need to cast the type to include the 'ref' prop.
  const TypedPlayer = ReactPlayerClient as React.ComponentType<ReactPlayerProps & { ref: React.Ref<any> }>;

  return (
    <div className="relative aspect-[16/9] w-full h-full bg-black">
      <TypedPlayer
        ref={playerRef}
        url={url}
        light={thumbnailUrl}
        playIcon={<PlayIcon />} // Custom icon
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
