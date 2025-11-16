import React from 'react';
import ProofGalleryHeader from '@/components/layout/ProofGalleryHeader';

// Generates a set of 10 image URLs with a 2:3 aspect ratio (e.g., 112x168)
const generateImageRow = (seed: number): string[] => {
  return Array.from({ length: 10 }, (_, i) => `https://picsum.photos/seed/${seed + i}/112/168`);
};

const carousels = [
  { images: generateImageRow(1), duration: '40s' },
  { images: generateImageRow(11), duration: '45s' },
  { images: generateImageRow(21), duration: '38s' },
  { images: generateImageRow(31), duration: '50s' },
  { images: generateImageRow(41), duration: '42s' },
];

const ProofPage = () => {
  return (
    <div className="flex flex-col">
      <ProofGalleryHeader />
      <main className="flex-grow overflow-x-hidden py-2 mt-16">
        <div className="flex flex-col space-y-2">
          {carousels.map((carousel, rowIndex) => (
            <div
              key={rowIndex}
              className="w-full overflow-hidden"
              style={{ '--animation-duration': carousel.duration } as React.CSSProperties}
            >
              <div className="flex animate-scroll-ping-pong">
                {/* Render the set of images twice for a seamless loop */}
                {[...carousel.images, ...carousel.images].map((url, imgIndex) => (
                  <div key={imgIndex} className="flex-shrink-0 pr-2">
                    <img
                      alt={`Proof image ${rowIndex}-${imgIndex}`}
                      className="h-[168px] w-[112px] rounded-lg object-cover"
                      src={url}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProofPage;
