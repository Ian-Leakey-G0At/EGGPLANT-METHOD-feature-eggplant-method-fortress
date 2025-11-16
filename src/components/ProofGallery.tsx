'use client'

import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

// Generates a set of 10 image URLs with a 2:3 aspect ratio (e.g., 112x168)
const generateImageRow = (seed: number): string[] => {
  return Array.from({ length: 10 }, (_, i) => `https://picsum.photos/seed/${seed + i}/400/600`);
};

// Ping-pong slow motion carousel row
const CarouselRow = ({
  images,
  duration = 60 // Duration in seconds for a full cycle
}: {
  images: string[],
  duration?: number
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  useEffect(() => {
    if (!emblaApi) return;

    let scrollInterval: NodeJS.Timeout;

    const startPingPong = () => {
      scrollInterval = setInterval(() => {
        const scrollProgress = emblaApi.scrollProgress();
        const maxScroll = emblaApi.scrollSnapList().length - 1;

        // Reverse direction at ends
        if (scrollProgress >= 1 && direction === 1) {
          setDirection(-1);
        } else if (scrollProgress <= 0 && direction === -1) {
          setDirection(1);
        }

        // Scroll gently
        emblaApi.scrollNext(direction === 1);
      }, (duration * 1000) / (images.length * 2)); // Adjust speed for gentle motion
    };

    startPingPong();

    return () => clearInterval(scrollInterval);
  }, [emblaApi, direction, duration, images.length]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {[...images, ...images].map((src, index) => ( // Duplicate for seamless loop
          <div key={index} className="relative flex-[0_0_auto] w-2/5 md:w-1/5 pr-2">
            <div className="aspect-[2/3]">
              <img
                src={src}
                alt={`Proof image ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function ProofGallery() {
   const row1Images = generateImageRow(1);
   const row2Images = generateImageRow(11);
   const row3Images = generateImageRow(21);
   const row4Images = generateImageRow(31);
   const row5Images = generateImageRow(41);

   return (
      <div className="space-y-2 py-4">
         <CarouselRow images={row1Images} duration={30} />
         <CarouselRow images={row2Images} duration={35} />
         <CarouselRow images={row3Images} duration={28} />
         <CarouselRow images={row4Images} duration={40} />
         <CarouselRow images={row5Images} duration={32} />
      </div>
   );
}
