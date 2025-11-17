'use client'

import React from 'react';

// Generates a set of 10 image URLs with a 2:3 aspect ratio
const generateImageRow = (seed: number): string[] => {
  return Array.from({ length: 10 }, (_, i) => `https://picsum.photos/seed/${seed + i}/400/600`);
};

// --- THE FINAL, CORRECTED CAROUSEL ROW COMPONENT ---
const CarouselRow = ({
  images,
  direction = 'right-to-left',
  duration = 60, // Duration in seconds for one full scroll
}: {
  images: string[];
  direction?: 'left-to-right' | 'right-to-left';
  duration?: number;
}) => {
  const animationName = direction === 'left-to-right' ? 'scroll-left-to-right' : 'scroll-right-to-left';

  return (
    <div className="overflow-hidden">
      <div
        className="flex"
        style={{
          // The animation property is composed dynamically, NOW WITH a rock-solid 'alternate'
          animation: `${animationName} ${duration}s linear infinite alternate`,
        }}
      >
        {[...images, ...images].map((src, index) => (
          <div key={index} className="relative flex-shrink-0 w-1/4 md:w-1/5 pr-2">
            <div className="aspect-[2/3] overflow-hidden rounded-md">
              <img
                src={src}
                alt={`Proof image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- THE UPDATED PROOF GALLERY COMPONENT ---
export function ProofGallery() {
   const row1Images = generateImageRow(1);
   const row2Images = generateImageRow(11);
   const row3Images = generateImageRow(21);
   const row4Images = generateImageRow(31);
   const row5Images = generateImageRow(41);

   return (
      <div className="space-y-2 py-4">
         <CarouselRow images={row1Images} direction="right-to-left" duration={30} />
         <CarouselRow images={row2Images} direction="left-to-right" duration={35} />
         <CarouselRow images={row3Images} direction="right-to-left" duration={28} />
         <CarouselRow images={row4Images} direction="left-to-right" duration={40} />
         <CarouselRow images={row5Images} direction="right-to-left" duration={32} />
      </div>
   );
}
