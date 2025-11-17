'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import VideoPlayer from './VideoPlayer';

const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isCarouselReady, setIsCarouselReady] = useState(false);

  // Memoize the onSelect callback for stability.
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return; // Don't do anything until the carousel API is available.

    // Use the 'init' event as the definitive signal that the carousel is ready.
    const onInit = () => {
      setIsCarouselReady(true);
      onSelect(); // Set the initial slide index correctly.
    };

    emblaApi.on('init', onInit);
    emblaApi.on('select', onSelect);

    return () => {
      // Clean up the event listeners when the component unmounts.
      emblaApi.off('init', onInit);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {/* Slide 1: Video Player */}
          <div className="relative flex-[0_0_100%] aspect-[16/9]">
            <VideoPlayer
              url="https://dai.ly/k3v4JvyhXuSbE7EegYu"
              isPaused={selectedIndex !== 0}
              isReady={isCarouselReady} // This prop is now set reliably.
            />
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
      {/* Dynamic Indicators */}
      <div className="flex justify-center space-x-2 mt-2">
        {emblaApi?.scrollSnapList().map((_, index) => (
          <div
            key={index}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              selectedIndex === index ? 'w-6 bg-white' : 'w-3 bg-white/50'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
