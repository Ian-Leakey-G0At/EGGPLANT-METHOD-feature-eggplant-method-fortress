'use client';

import React from 'react';

interface VideoPlayerProps {
  videoId: string;
}

export const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
  // Construct the YouTube embed URL. 'rel=0' prevents showing related videos
  // from other channels once the video finishes.
  // 'modestbranding=1' removes the YouTube logo from the control bar.
  // 'showinfo=0' removes the video title and uploader before the video starts.
  // 'autoplay=1' can be added if we want it to start automatically (consider UX).
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;

  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingTop: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
