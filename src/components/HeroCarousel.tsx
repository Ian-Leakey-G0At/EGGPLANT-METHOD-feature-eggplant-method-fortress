'use client';

import React, { useEffect } from 'react';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import VideoPlayer from './VideoPlayer';

// The API is the second item in the tuple returned by the hook
type EmblaApiType = UseEmblaCarouselType[1];

interface HeroCarouselProps {
  setApi: (api: EmblaApiType) => void;
  selectedIndex: number;
}

const HeroCarousel = ({ setApi, selectedIndex }: HeroCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (emblaApi) {
      setApi(emblaApi);
    }
  }, [emblaApi, setApi]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          <div className="relative flex-[0_0_100%] aspect-[16/9]">
            <VideoPlayer
              url="https://dai.ly/kYPpMYI5r7f94TEegYu"
              playing={selectedIndex === 0}
            />
          </div>
          <div className="relative flex-[0_0_100%] aspect-[16/9]">
            <img
              src="https://picsum.photos/seed/hero1/1280/720"
              alt="Promotional Image 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative flex-[0_0_100%] aspect-[16/9]">
            <img
              src="https://picsum.photos/seed/hero2/1280/720"
              alt="Promotional Image 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
