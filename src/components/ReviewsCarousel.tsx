'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { reviews } from '@/lib/reviews-data';

const ReviewsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {reviews.map((review, index) => (
            <div key={index} className="flex-[0_0_80%] md:flex-[0_0_90%] ml-3">
                <div className="px-4 py-2 bg-zinc-900 rounded-lg">
                    <p className="font-semibold text-sm text-white mb-1">{review.username}</p>
                    <p className="text-sm text-gray-400">{review.text}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 -translate-y-1/2 left-0 text-white"
        onClick={scrollPrev}
      >
         <span className="material-icons-outlined">arrow_back_ios</span>
      </button>
      <button
        className="absolute top-1/2 -translate-y-1/2 right-0 text-white"
        onClick={scrollNext}
      >
        <span className="material-icons-outlined">arrow_forward_ios</span>
      </button>
    </div>
  );
};

export default ReviewsCarousel;
