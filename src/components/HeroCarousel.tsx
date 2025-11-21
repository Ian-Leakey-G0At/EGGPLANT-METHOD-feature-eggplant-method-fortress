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
                thumbnailUrl="https://i.pinimg.com/736x/39/eb/de/39ebde3b6432f7e7f8785211531346b9.jpg"
              />
            )}
          </div>
          {/* Slide 2: Image */}
          <div className="relative flex-[0_0_100%] aspect-[16/9]">
            <img
              src="https://i.pinimg.com/736x/53/b1/c1/53b1c1887c617adaa7d8766c174563e1.jpg"
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
                  src="https://i.pinimg.com/736x/e7/ed/80/e7ed8072a449dcb9b8cf6ad3d8502d33.jpg"
                  alt="Play Video"
                  className="w-full h-full object-cover group-hover:opacity-100 transition-opacity duration-700"
                />

                {/* The Play Button Overlay */}
                <svg
                  className="absolute bottom-8 right-8 w-12 h-12 text-white opacity-100 transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                >
                  <defs>
                    <mask id="SVGOVEmxbON_hero">
                      <g fill="#555555" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                        <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" />
                        <path d="M20 24v-6.928l6 3.464L32 24l-6 3.464l-6 3.464z" />
                      </g>
                    </mask>
                  </defs>
                  <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#SVGOVEmxbON_hero)" />
                </svg>
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
