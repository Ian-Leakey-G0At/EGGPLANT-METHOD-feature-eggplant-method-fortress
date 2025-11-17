'use client';

import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaRedo, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { IoMdSkipForward, IoMdSkipBackward } from 'react-icons/io';

interface VideoPlayerProps {
  url: string;
  isPaused: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, isPaused }) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayPause = () => setPlaying(!playing);
  const handleMute = () => setMuted(!muted);
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };
  const handleSkip = () => playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10);
  const handleRewind = () => playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10);
  const handleReplay = () => playerRef.current?.seekTo(0);

  return (
    <div className="relative w-full h-full group">
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={!isPaused && playing}
        muted={muted}
        volume={volume}
        width="100%"
        height="100%"
        config={{ youtube: { playerVars: { showinfo: 0, controls: 0 } } }}
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={handleRewind} className="text-white"><IoMdSkipBackward size={24} /></button>
        <button onClick={handlePlayPause} className="text-white">
          {playing ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        <button onClick={handleReplay} className="text-white"><FaRedo size={24} /></button>
        <button onClick={handleSkip} className="text-white"><IoMdSkipForward size={24} /></button>
        <div className="flex items-center">
          <button onClick={handleMute} className="text-white">
            {muted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={handleVolumeChange}
            className="ml-2 w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
