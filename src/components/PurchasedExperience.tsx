'use client';

import { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import { courses } from '@/lib/course-data';

// The Engagement Ploy: Interactive Rating System
const PloyRatingSystem = () => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        if (rating === 0) return; // Require at least a star rating

        setIsSubmitted(true);

        // Reset after 3 seconds to allow another "submission"
        setTimeout(() => {
            setIsSubmitted(false);
            setRating(0);
            setReviewText('');
        }, 3000);
    };

    return (
        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 mb-12 backdrop-blur-sm">
            {isSubmitted ? (
                <div className="flex items-center justify-center h-40 animate-fadeIn">
                    <p className="text-lime-400 font-bold text-xl text-center tracking-tight">
                        Thank you for your feedback!
                    </p>
                </div>
            ) : (
                <div className="animate-fadeIn">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white tracking-tight">Share Your Results</h3>
                        <span className="text-lime-400 font-bold text-xs bg-lime-400/10 px-3 py-1 rounded-full border border-lime-400/20 tracking-wide uppercase">
                            4.7 stars
                        </span>
                    </div>

                    {/* Stars */}
                    <div className="flex space-x-3 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`text-4xl transition-all duration-300 transform hover:scale-110 ${star <= rating ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-zinc-700 hover:text-yellow-400/50'}`}
                                aria-label={`Rate ${star} stars`}
                            >
                                ★
                            </button>
                        ))}
                    </div>

                    {/* Text Area */}
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review here..."
                        className="w-full bg-zinc-950/50 border border-white/10 rounded-xl p-4 text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-lime-500/50 focus:ring-1 focus:ring-lime-500/50 transition-all mb-6 h-32 resize-none"
                    />

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={rating === 0}
                        className={`w-full py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 ${rating > 0
                            ? 'bg-lime-500 text-black hover:bg-lime-400 shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] transform hover:-translate-y-0.5'
                            : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                            }`}
                    >
                        Post Review
                    </button>
                </div>
            )}
        </div>
    );
};

export function PurchasedExperience({ courseId }: { courseId: string }) {
    const course = courses.find((c) => c.id === courseId);

    if (!course) {
        return <p>Course not found.</p>;
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-6 pt-8 pb-20">
            {/* 1. The Video Player */}
            <div className="aspect-video mb-12 rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-zinc-900">
                <VideoPlayer
                    url={course.fullVideoUrl}
                    thumbnailUrl={course.fullThumbnailUrl}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Description */}
                <div className="lg:col-span-2">
                    <section className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tighter leading-tight">
                            {course.name}
                        </h1>

                        <div className="bg-zinc-900/30 rounded-2xl border border-white/5 overflow-hidden">
                            <details className="group" open>
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-zinc-200 hover:text-white transition-colors bg-zinc-900/50">
                                    <span className="text-lg tracking-tight">Course Description</span>
                                    <span className="transition-transform duration-300 group-open:rotate-180 text-zinc-500 group-hover:text-white">
                                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <div className="text-zinc-400 px-6 pb-8 pt-2 group-open:animate-fadeIn space-y-6 text-lg leading-relaxed font-light">
                                    <p className="text-zinc-300 font-normal">
                                        The Simple 2-Step Method to Naturally Boost Length & Girth.
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
                            </details>
                        </div>
                    </section>
                </div>

                {/* Right Column: Rating System (Sticky on desktop) */}
                <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-8">
                        <PloyRatingSystem />
                    </div>
                </div>
            </div>
        </div>
    );
}
