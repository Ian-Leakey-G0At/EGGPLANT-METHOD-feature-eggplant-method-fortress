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
  const [isPinterestVideoActive, setIsPinterestVideoActive] = useState(false);

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
          {/* Slide 3: Dailymotion Video */}
          <div className="relative flex-[0_0_100%] aspect-[16/9] bg-black">
            {!isPinterestVideoActive ? (
              <div
                className="relative w-full h-full cursor-pointer group"
                onClick={() => setIsPinterestVideoActive(true)}
              >
                {/* Thumbnail Facade */}
                <img
                  src="https://picsum.photos/seed/hero2/1280/720"
                  alt="Play Video"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                />

                {/* The Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                    <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative bg-black">
                <iframe
                  className="w-full h-full object-cover absolute inset-0"
                  src="https://www.dailymotion.com/embed/video/k4eKjKDY9h6VbXEfz7I?autoplay=1&mute=1&controls=0&ui-start-screen-info=false&sharing-enable=false&ui-logo=false&endscreen-enable=false"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                  sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                ></iframe>
              </div>
            )}
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
