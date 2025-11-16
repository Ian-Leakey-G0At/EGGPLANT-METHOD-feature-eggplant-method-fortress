import React from 'react';
import { reviews } from '@/lib/reviews-data';

const ReviewsCarousel = () => {
  return (
    <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
      {reviews.map((review, index) => (
        <div key={index} className="flex-shrink-0 w-80">
          <div className="h-36 flex flex-col p-4 bg-gray-800 rounded-lg">
            <p className="flex-grow line-clamp-4 text-sm text-gray-200">{review.text}</p>
            <p className="text-xs font-bold text-white">{review.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsCarousel;
