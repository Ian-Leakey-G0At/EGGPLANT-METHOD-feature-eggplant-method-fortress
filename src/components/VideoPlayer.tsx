'use client';

import React, { useRef, useEffect, useState } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

interface VideoPlayerProps {
  url: string;
  playing: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, playing }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // The core of the new strategy: direct, imperative control of the video element.
  useEffect(() => {
    if (videoRef.current) {
      if (playing) {
        // The `play()` method returns a promise. We handle potential errors.
        videoRef.current.play().catch(error => {
          // Autoplay was prevented. This is a common browser policy.
          // We can mute the video and try again, as muted autoplay is often allowed.
          if (error.name === 'NotAllowedError') {
            console.warn('Autoplay was prevented. Muting and retrying.');
            setMuted(true);
            if(videoRef.current) {
              videoRef.current.play();
            }
          } else {
            console.error('Error attempting to play video:', error);
          }
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [playing]); // This effect re-runs whenever the `playing` command changes.

  return (
    <div className="relative w-full h-full group">
      <video
        ref={videoRef}
        src={url}
        muted={muted}
        loop
        playsInline // Important for iOS autoplay.
        className="w-full h-full object-cover"
        onCanPlay={() => {
          // When the video is ready, re-evaluate the play state.
          // This handles cases where the `playing` prop was true before the video loaded.
          if (playing && videoRef.current) {
             videoRef.current.play().catch(e => console.error("Error onCanPlay:", e));
          }
        }}
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setMuted(!muted)} className="text-white">
          {muted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
