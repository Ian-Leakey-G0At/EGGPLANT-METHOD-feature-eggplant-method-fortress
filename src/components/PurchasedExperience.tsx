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
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 mb-12">
            {isSubmitted ? (
                <div className="flex items-center justify-center h-40 animate-fadeIn">
                    <p className="text-lime-400 font-bold text-xl text-center">
                        Thank you for your feedback!
                    </p>
                </div>
            ) : (
                <div className="animate-fadeIn">
                    <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-lg font-bold text-white">Share Your Results</h3>
                        <span className="text-lime-500 font-bold text-sm bg-lime-500/10 px-2 py-0.5 rounded border border-lime-500/20">
                            [4.7 stars]
                        </span>
                    </div>

                    {/* Stars */}
                    <div className="flex space-x-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`text-3xl transition-colors duration-200 ${star <= rating ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400/50'}`}
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
                        className="w-full bg-gray-900/80 border border-gray-700 rounded-md p-3 text-gray-300 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 transition-all mb-4 h-24 resize-none"
                    />

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={rating === 0}
                        className={`w-full py-3 rounded-md font-bold transition-all duration-200 ${rating > 0
                            ? 'bg-lime-500 text-black hover:bg-lime-400 transform hover:scale-[1.02]'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
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
        <div className="w-full max-w-4xl mx-auto px-4 pt-4">
            {/* 1. The Video Player */}
            <div className="aspect-video mb-8">
                <VideoPlayer
                    url={course.fullVideoUrl}
                    thumbnailUrl={course.fullThumbnailUrl}
                />
            </div>

            {/* 2. The Description Component (Dropdown) */}
            <section className="mb-8">
                <h1 className="text-3xl font-bold mb-4 text-white">{course.name}</h1>

                <details className="group bg-gray-900/50 rounded-lg border border-gray-800">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-gray-300 hover:text-white transition-colors">
                        <span>Course Description</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                    </summary>
                    <div className="text-gray-400 px-4 pb-4 group-open:animate-fadeIn space-y-4 text-base border-t border-gray-800 pt-4">
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
                </details>
            </section>

            {/* 3. The "Ploy" Rating System */}
            <PloyRatingSystem />
        </div>
    );
}
