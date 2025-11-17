'use client';

import { useState } from 'react';
import VideoPlayer from './VideoPlayer';

// A self-contained component for the fake rating system
function PloyRatingSystem() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Hide the confirmation after a few seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="bg-ray-800/50 p-6 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-4">Share Your Results</h2>
      {submitted ? (
        <div className="text-center text-primary font-bold">
          Thank you for your feedback!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Simple star rating and text area would go here */}
          <p className="text-gray-400 mb-4">Let us know how the method is working for you.</p>
          <div className="flex justify-between items-center">
            <div className="text-yellow-400 text-2xl">★★★★★</div>
            <button
              type="submit"
              className="bg-primary text-gray-900 font-bold py-2 px-6 rounded-md hover:opacity-90 transition-opacity"
            >
              Post Review
            </button>
          </div>
        </form>
      )}
    </section>
  );
}


export function PurchasedExperience({ courseId }: { courseId: string }) {
  const videoUrl = "https://dai.ly/k4hFlLHNuwWqS9Eeie0"; // The full, purchased video URL

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-4">
      <div className="aspect-video mb-8">
        <VideoPlayer
          url={videoUrl}
          playing={true} // The direct and unambiguous command.
        />
      </div>

      {/* 2. The Description Component */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Viral 2 Step Big Dick Growth Method 2025</h1>
        <p className="text-gray-400">
          A detailed summary of the course content goes here. This section outlines the core principles and steps of the method shown in the video.
        </p>
      </section>

      {/* 3. The "Ploy" Rating System */}
      <PloyRatingSystem />
    </div>
  );
}
