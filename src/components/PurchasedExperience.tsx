'use client';

import { useState } from 'react';
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
        <div className="bg-[#111] p-6 rounded-xl border border-white/5">
            {isSubmitted ? (
                <div className="flex items-center justify-center h-40 animate-fadeIn">
                    <p className="text-lime-400 font-medium text-lg text-center tracking-tight">
                        Thank you for your feedback!
                    </p>
                </div>
            ) : (
                <div className="animate-fadeIn">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-white tracking-tight">Share Your Results</h3>
                        <span className="text-lime-400 font-bold text-[10px] bg-lime-400/10 px-2 py-1 rounded-md border border-lime-400/20 tracking-wider uppercase">
                            4.7 stars
                        </span>
                    </div>

                    {/* Stars */}
                    <div className="flex space-x-2 mb-5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`text-3xl transition-all duration-200 ${star <= rating ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'text-[#333] hover:text-white/50'}`}
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
                        className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg p-3 text-sm text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-lime-500/30 focus:ring-1 focus:ring-lime-500/30 transition-all mb-4 h-28 resize-none"
                    />

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={rating === 0}
                        className={`w-full py-3 rounded-lg font-medium text-sm tracking-wide transition-all duration-200 ${rating > 0
                            ? 'bg-white text-black hover:bg-zinc-200'
                            : 'bg-[#222] text-zinc-600 cursor-not-allowed'
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
        <div className="w-full max-w-[1400px] mx-auto px-4 pt-4 pb-20 flex flex-col gap-4">
            {/* 1. The Course Access Link (Formerly Video Player) */}
            <a
                href="https://drive.google.com/drive/folders/1vwhvjzRTxh1zyOsLzffktJ2hUJu2i6kD?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group block aspect-video w-full rounded-xl overflow-hidden bg-[#050505] border border-white/5 shadow-2xl relative hover:border-lime-400/30 transition-all duration-300"
            >
                <img
                    src="/course-access-thumbnail.webp"
                    alt="Access Course Content"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/60 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-full group-hover:bg-black/80 group-hover:scale-105 transition-all duration-300">
                        <span className="text-white font-medium tracking-wide">Access Course Content</span>
                    </div>
                </div>
            </a>

            {/* Instruction Text */}
            <div className="w-full text-center py-2">
                <p className="text-lime-400 text-sm font-medium tracking-widest uppercase animate-pulse">
                    [Tap Image To Access Course Content]
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
                {/* Left Column: Description */}
                <div className="flex-1 min-w-0">
                    <section className="flex flex-col gap-4">
                        <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight leading-tight break-words">
                            {course.name}
                        </h1>

                        {/* Description - Clean Text with 16px spacing */}
                        <div className="text-zinc-400 flex flex-col gap-4 text-base leading-relaxed font-light">
                            <p className="text-zinc-200 font-normal">
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
                            </p>
                            <p>
                                Have questions or want to share your results? I'm always on Instagram. Shoot me a message—I'll personally reply. 📩
                                Take the first step.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Right Column: Rating System */}
                <div className="w-full lg:w-[400px] flex-shrink-0">
                    <div className="lg:sticky lg:top-4">
                        <PloyRatingSystem />
                    </div>
                </div>
            </div>
        </div>
    );
}
