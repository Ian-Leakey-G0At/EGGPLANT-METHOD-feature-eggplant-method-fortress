import Link from 'next/link';
import React from 'react';
import BackIcon from '@/components/icons/BackIcon';

// Generates a set of 10 image URLs with a 2:3 aspect ratio (e.g., 112x168)
const generateImageRow = (seed: number): string[] => {
  return Array.from({ length: 10 }, (_, i) => `https://picsum.photos/seed/${seed + i}/112/168`);
};

const carousels = [
  { images: generateImageRow(1), direction: 'ltr', duration: '40s' },
  { images: generateImageRow(11), direction: 'rtl', duration: '45s' },
  { images: generateImageRow(21), direction: 'ltr', duration: '38s' },
  { images: generateImageRow(31), direction: 'rtl', duration: '50s' },
  { images: generateImageRow(41), direction: 'ltr', duration: '42s' },
];

const ProofPage = () => {
  return (
    <div className="flex flex-col">
      <header className="h-14 px-4 flex items-center justify-between bg-background-dark/80 sticky top-0 z-10 border-b border-gray-800 backdrop-blur-sm">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <BackIcon className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-semibold text-white">Proof Gallery</h1>
        <div className="w-6" /> {/* Spacer for centering */}
      </header>

      <main className="flex-grow overflow-x-hidden py-2">
        <div className="flex flex-col space-y-2">
          {carousels.map((carousel, rowIndex) => (
            <div
              key={rowIndex}
              className="w-full overflow-hidden"
              style={{ '--animation-duration': carousel.duration } as React.CSSProperties}
            >
              <div className={`flex ${carousel.direction === 'ltr' ? 'animate-scroll-ltr' : 'animate-scroll-rtl'}`}>
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
