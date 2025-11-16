'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

// Generates a set of 10 image URLs with a 2:3 aspect ratio (e.g., 112x168)
const generateImageRow = (seed: number): string[] => {
  return Array.from({ length: 10 }, (_, i) => `https://picsum.photos/seed/${seed + i}/400/600`);
};


// NOTE: This component is now self-contained and does not rely on external CSS animations.
const CarouselRow = ({
  images,
  direction = 'forward',
  duration = 30 // Duration in seconds
}: {
  images: string[],
  direction?: 'forward' | 'backward',
  duration?: number
}) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true, // Allows for a "free-wheeling" scroll feel on interaction
      align: 'start',
    },
    [
      Autoplay({
        playOnInit: true,
        delay: 0, // Start immediately
        stopOnInteraction: false, // Continue playing even if user interacts
        stopOnMouseEnter: true, // Pause on hover for better UX
        // --- THE CRITICAL FIX IS HERE ---
        // We simulate direction by telling the autoplay which way to go.
        direction: direction === 'forward' ? 'forward' : 'backward',
      })
    ]
  );

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {[...images, ...images].map((src, index) => ( // Duplicate the images for a seamless loop effect
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
         <CarouselRow images={row1Images} direction="forward" duration={30} />
         <CarouselRow images={row2Images} direction="backward" duration={35} />
         <CarouselRow images={row3Images} direction="forward" duration={28} />
         <CarouselRow images={row4Images} direction="backward" duration={40} />
         <CarouselRow images={row5Images} direction="forward" duration={32} />
      </div>
   );
}
