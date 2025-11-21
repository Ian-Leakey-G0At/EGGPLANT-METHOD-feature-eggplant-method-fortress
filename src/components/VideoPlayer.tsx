'use client';

import React, { useState, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ReactPlayerProps } from 'react-player'; // This will now resolve from our custom .d.ts file

// Dynamically import the component without trying to infer its type here.
const ReactPlayerClient = dynamic(() => import('react-player'), { ssr: false });

// A clean, reusable Play icon component
const PlayIcon = () => (
  <svg
    className="absolute bottom-8 right-8 w-12 h-12 text-white opacity-100 transition-transform duration-300 group-hover:scale-110"
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
  >
    <defs>
      <mask id="SVGOVEmxbON">
        <g fill="#555555" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
          <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" />
          <path d="M20 24v-6.928l6 3.464L32 24l-6 3.464l-6 3.464z" />
        </g>
      </mask>
    </defs>
    <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#SVGOVEmxbON)" />
  </svg>
);

interface VideoPlayerProps {
  url: string;
  thumbnailUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, thumbnailUrl }) => {
  const [isActivated, setIsActivated] = useState(false);

  // Extract Dailymotion ID from URL
  // Supports: https://www.dailymotion.com/video/ID or https://dai.ly/ID
  const getDailymotionId = (videoUrl: string) => {
    if (videoUrl.includes('/video/')) {
      return videoUrl.split('/video/')[1];
    }
    if (videoUrl.includes('dai.ly/')) {
      return videoUrl.split('dai.ly/')[1];
    }
    return null;
  };

  const videoId = getDailymotionId(url);

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

  // Fallback if ID extraction fails (shouldn't happen with correct data)
  if (!videoId) {
    return <div className="w-full h-full bg-black flex items-center justify-center text-white">Invalid Video URL</div>;
  }

  return (
    <div className="relative w-full h-full aspect-[16/9] bg-black overflow-hidden">
      <iframe
        src={`https://geo.dailymotion.com/player.html?video=${videoId}`}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: '0px',
          top: '0px',
          overflow: 'hidden',
          border: 'none',
        }}
        allowFullScreen
        title="Dailymotion Video Player"
        allow="web-share; autoplay; fullscreen; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
