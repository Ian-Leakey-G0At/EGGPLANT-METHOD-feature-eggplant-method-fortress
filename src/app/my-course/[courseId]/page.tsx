'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { courses } from '@/lib/course-data'; // Use the new centralized course data
import VideoPlayer from '@/components/VideoPlayer'; // Import our new player

type VerificationStatus = 'verifying' | 'success' | 'error';

const CourseAccessPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<VerificationStatus>('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  const courseId = params.courseId as string;
  const token = searchParams.get('token');

  const course = courses.find((c) => c.id === courseId);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token || !courseId) {
        setErrorMessage('Missing access token or course ID in URL.');
        setStatus('error');
        return;
      }

      if (!course) {
        setErrorMessage(`Invalid course ID.`);
        setStatus('error');
        return;
      }

      try {
        const response = await fetch('/api/verify-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, courseId }),
        });

        if (response.ok) {
          setStatus('success');
        } else {
          const errorData = await response.text();
          setErrorMessage(errorData || 'Invalid or expired access link.');
          setStatus('error');
        }
      } catch (err) {
        setErrorMessage('An unexpected error occurred. Please try again later.');
        setStatus('error');
      }
    };

    verifyToken();
  }, [token, courseId, course]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-4">
      {status === 'verifying' && (
        <div className="text-center py-10">
          <p className="text-lg animate-pulse">Verifying Access...</p>
        </div>
      )}
      {status === 'error' && (
        <div className="text-center p-8 bg-red-900/20 rounded-lg">
          <h1 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h1>
          <p className="text-red-300">{errorMessage}</p>
        </div>
      )}
      {status === 'success' && course && (
        <div>
          {/* 1. The Video Player - Radically Simplified */}
          <div className="aspect-video mb-8">
            <VideoPlayer
              url={course.fullVideoUrl}
              thumbnailUrl={course.fullThumbnailUrl}
            />
          </div>

          {/* 2. The Description Component */}
          <section className="mb-12">
            <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
            <p className="text-gray-400">
              A detailed summary of the course content goes here...
            </p>
          </section>
        </div>
      )}
    </div>
  );
};

export default CourseAccessPage;
