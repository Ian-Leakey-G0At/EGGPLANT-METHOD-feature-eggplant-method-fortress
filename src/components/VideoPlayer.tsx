'use client';

import React, { useRef, useState } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };


  return (
    <div className="relative group aspect-[16/9] w-full mt-4 rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        onClick={handlePlayPause}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center space-x-4">
          <button onClick={handleRewind} className="text-white">
            <span className="material-icons-outlined text-3xl">replay_10</span>
          </button>

          <button onClick={handlePlayPause} className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="material-icons-outlined text-white text-4xl ml-1">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button onClick={handleForward} className="text-white">
            <span className="material-icons-outlined text-3xl">forward_10</span>
          </button>
        </div>

        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
            <span className="material-icons-outlined text-white">
                {volume > 0.5 ? 'volume_up' : volume > 0 ? 'volume_down' : 'volume_off'}
            </span>
            <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
        </div>

         <button onClick={handleReplay} className="absolute bottom-4 left-4 text-white">
            <span className="material-icons-outlined text-3xl">replay</span>
          </button>

      </div>
    </div>
  );
};

export default VideoPlayer;
