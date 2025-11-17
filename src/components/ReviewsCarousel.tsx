import React from 'react';
import { reviews } from '@/lib/reviews-data';

const ReviewsCarousel = () => {
  // Duplicate reviews to create a seamless loop
  const duplicatedReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex animate-scrolling-reviews">
        {duplicatedReviews.map((review, index) => (
          <div key={index} className="flex-shrink-0 w-80 mx-2">
            <div className="h-36 flex flex-col p-4 bg-gray-800/50 rounded-lg">
              <p className="flex-grow line-clamp-4 text-sm text-gray-200">{review.text}</p>
              <p className="text-xs font-bold text-white">{review.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsCarousel;
