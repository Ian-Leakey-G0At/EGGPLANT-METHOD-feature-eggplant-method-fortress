import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import ReviewsCarousel from "@/components/ReviewsCarousel";

export function UnpurchasedHomepage() {
  return (
    <>
      <div className="px-4">
        <HeroCarousel />
      </div>

      <main className="p-4 pb-28">
        <section className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            Viral 2 Step Big Dick Growth Method 2025
          </h1>
          <p className="text-3xl font-bold text-white mb-4">$10</p>
        </section>

        <section className="mb-8" id="reviews-section">
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-lg font-semibold text-gray-400">
              Customer reviews
            </h2>
            <Link
              className="inline-flex items-center text-sm font-normal text-lime-700 hover:opacity-80 transition-opacity"
              href="/proof"
            >
              See Proof
              <span className="material-icons-outlined text-base ml-1">
                arrow_forward_ios
              </span>
            </Link>
          </div>
          <ReviewsCarousel />
        </section>

        <div className="my-6 border-t border-gray-800"></div>

        <section className="text-sm space-y-4 text-gray-400">
          <p className="font-semibold">
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
            ✍️ Get the full 11-minute video for how it all works—no fluff, no
            hard sell, just clear steps that deliver.
          </p>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-20 bg-background-dark p-4 border-t border-gray-800">
        <div className="max-w-md mx-auto">
          <a
            className="block w-full text-center bg-primary text-gray-900 font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
            href="https://polar.sh/placeholder-for-commander-to-update"
            data-testid="cta-button"
          >
            Get Video Now
          </a>
        </div>
      </div>
    </>
  );
}
