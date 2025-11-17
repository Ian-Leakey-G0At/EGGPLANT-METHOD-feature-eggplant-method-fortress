'use client';

import React from 'react';

export function ProofBanner() {
  const bannerText = "5-STAR RANKS... BEHOLD, THE MEN WHO TURNED GODS!";

  return (
    <div className="bg-charcoal-800 border-y border-gray-800 w-full overflow-hidden rounded-lg">
      <div className="relative flex overflow-x-hidden py-1 text-xs text-lime-500/70">
        <div className="animate-marquee-left-to-right whitespace-nowrap">
          <span className="mx-4">{bannerText}</span>
          <span className="mx-4">{bannerText}</span>
          <span className="mx-4">{bannerText}</span>
          <span className="mx-4">{bannerText}</span>
        </div>

        <div className="absolute top-0 animate-marquee-left-to-right2 whitespace-nowrap py-1">
          <span className="mx-4">{bannerText}</span>
          <span className="mx-4">{bannerText}</span>
          <span className="mx-4">{bannerText}</span>
          <span className="mx-4">{bannerText}</span>
        </div>
      </div>
    </div>
  );
}
