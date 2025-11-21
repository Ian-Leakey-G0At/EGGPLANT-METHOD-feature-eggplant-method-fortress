/**
 * COMPONENT: ProofGallery (VerticalCarousel)
 * FRAMEWORK: React (Compatible with Next.js 'use client')
 * STYLING: Tailwind CSS
 * DESCRIPTION:
 * A high-performance, vertical video feed designed for mobile viewports.
 * It features a unique "stacking" visual effect where the active card
 * expands to dominate the screen, while inactive cards shrink into 
 * "thumbnails" immediately above and below.
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* 1. CONFIGURATION & CONSTANTS                                               */
/* -------------------------------------------------------------------------- */

const APP_CONFIG = {
  slideCount: 50,
  throttleDelay: 50, // ms - Controls how often scroll logic fires (performance)
};

// The list of Pinterest video IDs provided by the user
const PINTEREST_IDS = [
  "920423242671398323", "920423242671398320", "920423242671398310", "920423242671398302",
  "920423242671398297", "920423242671398295", "920423242671398279", "920423242671398288",
  "920423242671398284", "920423242671398272", "920423242671398267", "920423242671398248",
  "920423242671398243", "920423242671398235", "920423242671398218", "920423242671398196",
  "920423242671398192", "920423242671398206", "920423242671398186", "920423242671398206",
  "920423242671398179", "920423242671398176", "920423242671398164", "920423242671398183",
  "920423242671398161", "920423242671398144", "920423242671398151", "920423242671398146",
  "920423242671398155", "920423242671398135", "920423242671398098", "920423242671398117",
  "920423242671398103", "920423242671398123", "920423242671398103", "920423242671398092",
  "920423242671398080", "920423242671398072", "920423242671398054", "920423242671398088",
  "920423242671398047", "920423242671398019", "920423242671398011"
];

// Helper to get the full 50 items
const getSlides = () => {
  const totalSlots = APP_CONFIG.slideCount;
  const items = [];
  for (let i = 0; i < totalSlots; i++) {
    items.push({
      id: PINTEREST_IDS[i % PINTEREST_IDS.length],
      uniqueId: i, // Unique key for React
      initialLikes: Math.floor(Math.random() * 1000) + 500,
    });
  }
  return items;
};

const SLIDES = getSlides();

/* -------------------------------------------------------------------------- */
/* 2. SUB-COMPONENTS                                                          */
/* -------------------------------------------------------------------------- */

// The "Encrypted" Facade - A high-tech, minimalist placeholder
const EncryptedCard = ({ id }: { id: string }) => (
  <div className="w-full h-full bg-gray-950 flex flex-col items-center justify-center border border-white/5 p-4 relative overflow-hidden group">
    {/* Scanline Effect */}
    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>

    {/* Lock Icon */}
    <div className="mb-3 text-gray-600 group-hover:text-purple-500 transition-colors duration-500">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    </div>

    {/* Data Text */}
    <div className="text-[10px] font-mono text-gray-700 text-center tracking-widest">
      <div>ENCRYPTED</div>
      <div className="mt-1 opacity-50">{id.slice(-6)}</div>
    </div>

    {/* Corner Accents */}
    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gray-800"></div>
    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gray-800"></div>
  </div>
);

const SlideItem = ({ data, index, isActive }: { data: any, index: number, isActive: boolean }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(data.initialLikes);

  // Like Toggle Logic
  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount((prev: number) => liked ? prev - 1 : prev + 1);
  };

  return (
    <div
      data-slide="true"
      data-index={index}
      /* LAYOUT LOGIC - CONTAINER HEIGHT
         h-[20vh]: This is the secret sauce. Even though the card expands to 55vh,
         the container remains 20vh. This forces the cards to "overlap" visually,
         creating the dense stack effect.
         
         LAYOUT LOGIC - Z-INDEX
         isActive ? 'z-20' : 'z-0': This fixes "ghosting". By default, HTML elements
         lower in the DOM paint on top of earlier ones. This forces the active card
         to physically sit on top of the cards below it.
      */
      className={`w-full h-[20vh] flex justify-center items-center snap-center relative ${isActive ? 'z-20' : 'z-0'}`}
    >

      {/* --- Pagination Indicator --- 
          This sits to the right. It transforms from a thin line (inactive) 
          to a glowing pill (active).
      */}
      <div className="absolute right-4 z-30 flex items-center justify-center pointer-events-none">
        <div
          className={`
            flex items-center justify-center transition-all duration-500 ease-out
            ${isActive
              ? 'w-6 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.3)]'
              : 'w-1 h-8 bg-white/20 rounded-full'
            }
          `}
        >
          {/* The inner green dot */}
          <div
            className={`
               bg-green-400 rounded-full transition-all duration-300
               ${isActive ? 'w-2 h-2 opacity-100 scale-100' : 'w-0 h-0 opacity-0 scale-0'}
             `}
          />
        </div>
      </div>

      {/* --- The Actual Card --- 
          This is the element that scales up/down.
      */}
      <div
        className={`
          relative flex-shrink-0 rounded-3xl overflow-hidden transition-all duration-500 ease-out origin-center
          aspect-[9/16] // Forces Portrait Mode
          bg-gray-900   // Background color prevents transparency issues during loading
          
          /* ANIMATION STATES */
          ${isActive
            ? 'h-[55vh] opacity-100 scale-100 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.9)] ring-1 ring-white/20'
            : 'h-[55vh] opacity-40 scale-[0.45] blur-[1px] grayscale brightness-50 translate-y-0'
          }
        `}
      >

        {/* Media Layer */}
        <div className="absolute inset-0 bg-gray-800">
          {isActive ? (
            <div className="absolute inset-0 w-full h-full animate-in fade-in duration-700">
              {/* The CROP HACK: Scaling the iframe to 170% to aggressively hide Pinterest Logos */}
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <iframe
                  src={`https://assets.pinterest.com/ext/embed.html?id=${data.id}&autoplay=1&loop=1`}
                  className="absolute top-1/2 left-1/2 w-[170%] h-[170%] -translate-x-1/2 -translate-y-1/2 object-cover"
                  frameBorder="0"
                  scrolling="no"
                  allow="autoplay"
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                />
              </div>
            </div>
          ) : (
            /* Fallback for inactive slides to save GPU/Memory */
            <EncryptedCard id={data.id} />
          )}
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none" />
        </div>

        {/* Interaction Layer (Heart) */}
        <div
          className={`
            absolute bottom-0 left-0 w-full p-6 flex flex-col gap-3 transition-all duration-500 delay-75
            ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
        >
          <div className="flex items-center justify-start pt-2 mt-2">
            <button
              onClick={toggleLike}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group bg-black/20 p-2 rounded-full backdrop-blur-sm"
            >
              <Heart
                size={24}
                className={`transition-all duration-300 ${liked ? 'fill-pink-500 text-pink-500 scale-110' : 'text-white group-hover:scale-110'}`}
              />
              <span className="text-sm font-bold">{likeCount}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. MAIN COMPONENT                                                          */
/* -------------------------------------------------------------------------- */

export function ProofGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /**
   * SCROLL HANDLER LOGIC
   * This function determines which card is currently "Active".
   * It calculates the distance between the center of the viewport 
   * and the center of every child element.
   */
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();

    // The mathematical center of the viewable area
    const centerPoint = containerRect.top + containerRect.height / 2;

    const children = Array.from(container.children) as HTMLElement[];

    let closestIndex = 0;
    let minDistance = Infinity;

    // Iterate through all DOM nodes in the container
    children.forEach((child) => {
      // Optimization: Skip spacer divs that don't contain slide data
      if (!child.hasAttribute('data-slide')) return;

      const rect = child.getBoundingClientRect();
      const childCenter = rect.top + rect.height / 2;

      // Calculate absolute distance from center
      const distance = Math.abs(childCenter - centerPoint);

      if (distance < minDistance) {
        minDistance = distance;
        const indexAttr = child.getAttribute('data-index');
        if (indexAttr !== null) {
          closestIndex = parseInt(indexAttr);
        }
      }
    });

    // Only update state if the active index has actually changed (prevents re-renders)
    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  /**
   * EFFECT: SCROLL LISTENER
   * Attaches the scroll event listener with a throttle.
   * The throttle prevents the calculations from running on every single pixel shift.
   */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout | null = null;
    const onScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, APP_CONFIG.throttleDelay);
    };

    container.addEventListener('scroll', onScroll);
    handleScroll(); // Run once on mount to set initial state

    return () => {
      container.removeEventListener('scroll', onScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeIndex]);

  return (
    // Outer Wrapper: Ensures this component centers perfectly on a desktop screen
    // while acting as the main view on mobile.
    <div className="flex justify-center items-center min-h-screen bg-background-dark font-sans">

      <div className="relative w-full max-w-[430px] h-[100dvh] bg-background-dark shadow-2xl overflow-hidden flex flex-col">

        {/* Scrollable Container */}
        <main
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar relative"
        >
          {/* TOP SPACER 
             Logic: We need 40vh of empty space so the very first item (which is 20vh)
             can be scrolled down to the exact center of the screen.
          */}
          <div className="h-[40vh] w-full" />

          {SLIDES.map((slide, index) => (
            <SlideItem
              key={slide.uniqueId}
              data={slide}
              index={index}
              isActive={index === activeIndex}
            />
          ))}

          {/* BOTTOM SPACER: Same logic as top spacer */}
          <div className="h-[40vh] w-full" />
        </main>

        {/* Hide Scrollbar CSS Injection */}
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

      </div>
    </div>
  );
}
