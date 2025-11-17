'use client';

import Link from "next/link";
import React, { useState } from 'react';
import HeroCarousel from "@/components/HeroCarousel";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import { AntechamberModal } from './AntechamberModal';

export function UnpurchasedHomepage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const VENDETTA_MACHINE_URL = 'https://vendetta-machine.vercel.app/art/eggplant-method-1';

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <AntechamberModal
        isOpen={isModalOpen}
        redirectUrl={VENDETTA_MACHINE_URL}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="pb-28 pt-4">
        <div className="px-4">
          <main>
            <div className="flex flex-col">
              <HeroCarousel />

              {/* Title and Price */}
              <section className="pt-2">
                <h1 className="text-3xl font-bold text-white">
                  Viral 2 Step Big Dick Growth Method 2025
                </h1>
                <p className="text-4xl font-bold text-lime-400 mt-2">$22.30</p>
              </section>

              {/* Reviews */}
              <section className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-gray-300">
                    Customer reviews
                  </h2>
                  <Link
                    className="text-sm font-medium text-lime-500 flex items-center"
                    href="/proof"
                  >
                    See Proof
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24"><path fill="currentColor" fillRule="evenodd" d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"/></svg>
                  </Link>
                </div>
                <ReviewsCarousel />
              </section>

              {/* Description */}
              <section className="mt-4">
                <div className="space-y-4 text-gray-400 text-base">
                  <p>
                    The Simple 2-Step Method to Naturally Boost Length & Girth (watch
                    the short video on the thumbnail first)
                  </p>
                  <p>
                    Let's cut through the noise. No pills. No surgery. No awkward
                    gadgets. No sketchy exercises. Just a science-backed method that's
                    helping thousands of men in 2025 get serious results—safely and
                    naturally.
                  </p>
                  <p>
                  We're talking about a straightforward 2-step system that's now been tested by over 6,700 men, with real, visible growth. It's based on human biology, not hype.✍️ Get the full 11-minute video for how it all works—no fluff, no
                    hard sell, just clear steps that deliver.
                    Have questions or want to share your results? I'm always on Instagram. Shoot me a message—I'll personally reply. 📩
                    Take the first step.
                  </p>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      {/* The Fixed CTA Button - Outside and after the main content */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-background-dark p-4 border-t border-gray-800">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleOpenModal}
            className="w-full bg-lime-500 text-black font-bold py-4 rounded-lg"
            data-testid="cta-button"
          >
            Get Video Now
          </button>
        </div>
      </div>
    </>
  );
}
