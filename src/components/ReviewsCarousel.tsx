import React from 'react';
import { reviews } from '@/lib/reviews-data';

const ReviewsCarousel = () => {
  return (
    <div className="flex overflow-x-auto space-x-4 px-4 scrollbar-hide">
      {reviews.map((review, index) => (
        <div key={index} className="flex-shrink-0 w-80 h-48 bg-zinc-900 rounded-lg px-4 py-3 flex flex-col justify-between">
          <p className="text-sm text-gray-400 overflow-hidden">{review.text}</p>
          <p className="font-semibold text-xs text-white mt-2">{review.username}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsCarousel;
