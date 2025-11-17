'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { courseData } from '@/lib/course-data';

type VerificationStatus = 'verifying' | 'success' | 'error';

const CourseAccessPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<VerificationStatus>('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  const courseId = params.courseId as string;
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token || !courseId) {
        setErrorMessage('Missing access token or course ID in URL.');
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
  }, [token, courseId]);

  const course = courseData.find(c => c.id === courseId);

  if (status === 'success' && !course) {
    setErrorMessage(`Course content not found for ID: ${courseId}`);
    setStatus('error');
  }


  return (
    <div className="p-4 md:p-8">
      {status === 'verifying' && (
        <div className="text-center">
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
          <h1 className="text-3xl font-bold text-white mb-4">
            {course.title}
          </h1>
          <div className="aspect-video bg-black rounded-lg">
             <iframe
                src={`https://www.youtube.com/embed/${course.videoId}?autoplay=1`}
                title="Course Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAccessPage;
