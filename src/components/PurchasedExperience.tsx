'use client';

import { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import { courses } from '@/lib/course-data';

// A simple rating component
const PloyRatingSystem = () => {
  const [rating, setRating] = useState(0);
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Rate this course</h3>
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button 
            key={star} 
            onClick={() => setRating(star)}
            className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-500'}`}>
            ★
          </button>
        ))}
      </div>
    </div>
  );
};

export function PurchasedExperience({ courseId }: { courseId: string }) {
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return <p>Course not found.</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-4">
      {/* 1. The Video Player - Now Corrected */}
      <div className="aspect-video mb-8">
        <VideoPlayer
          url={course.fullVideoUrl}
          thumbnailUrl={course.fullThumbnailUrl} // Using the thumbnail
        />
      </div>

      {/* 2. The Description Component */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
        <p className="text-gray-400">
          A detailed summary of the course content goes here...
        </p>
      </section>

      {/* 3. The "Ploy" Rating System */}
      <PloyRatingSystem />
    </div>
  );
}
