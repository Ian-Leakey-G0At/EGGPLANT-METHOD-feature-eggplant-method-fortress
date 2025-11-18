'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import VideoPlayer from './VideoPlayer';
import { courses } from '@/lib/course-data';

const HeroCarousel = () => {
  const course = courses.find(c => c.id === 'eggplant-method-v1');
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const updateSelectedIndex = useCallback(() => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateSelectedIndex();
    emblaApi.on('select', updateSelectedIndex);
    emblaApi.on('reInit', updateSelectedIndex);
    return () => {
      emblaApi.off('select', updateSelectedIndex);
      emblaApi.off('reInit', updateSelectedIndex);
    };
  }, [emblaApi, updateSelectedIndex]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {/* Slide 1: Video Player - Radically Simplified */}
          <div className="relative flex-[0_0_100%] aspect-[16/9]">
            {course && (
              <VideoPlayer
                url={course.teaserVideoUrl}
                thumbnailUrl={course.teaserThumbnailUrl}
              />
            )}
          </div>
          {/* Slide 2: Image */}
          <div className="relative flex-[0_0_100%] aspect-[16/9]">
            <img
              src="https://picsum.photos/seed/hero1/1280/720"
              alt="Promotional Image 1"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Slide 3: Image */}
          <div className="relative flex-[0_0_100%] aspect-[16/9]">
            <img
              src="https://picsum.photos/seed/hero2/1280/720"
              alt="Promotional Image 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Pagination Indicators - Now part of this component */}
      <div className="flex justify-center space-x-2 py-2 my-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`h-1 rounded-sm transition-all ${index === selectedIndex ? 'bg-primary w-6' : 'bg-gray-600 w-3'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
