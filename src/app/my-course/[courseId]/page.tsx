'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { courses } from '@/lib/course-data';
import VideoPlayer from '@/components/VideoPlayer';
import { PurchasedExperience } from '@/components/PurchasedExperience';

type VerificationStatus = 'verifying' | 'success' | 'error';

const CourseAccessPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<VerificationStatus>('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  const courseId = params.courseId as string;
  const token = searchParams.get('token');

  const course = courses.find((c) => c.id === courseId);

  // --- START OF THE "EARLY RETURN" PROTOCOL ---
  // If the courseId from the URL doesn't match any course in our data,
  // we don't even need to proceed with verification. We halt immediately.
  if (!course) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 pt-4">
        <div className="text-center p-8 bg-red-900/20 rounded-lg">
          <h1 className="text-2xl font-bold text-red-400 mb-2">Invalid Course</h1>
          <p className="text-red-300">The course you are trying to access does not exist.</p>
        </div>
      </div>
    );
  }
  // --- END OF THE "EARLY RETURN" PROTOCOL ---

  useEffect(() => {
    const verifyToken = async () => {
      // This check is now redundant because of the early return, but it's good practice.
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
          // A more robust error parsing from the server response
          try {
            const errorData = await response.json();
            setErrorMessage(errorData.error || 'Invalid or expired access link.');
          } catch {
            setErrorMessage('Invalid or expired access link. Failed to parse server response.');
          }
          setStatus('error');
        }
      } catch (err) {
        setErrorMessage('An unexpected error occurred. Please try again later.');
        setStatus('error');
      }
    };

    verifyToken();
    // The `course` object is stable and doesn't need to be in the dependency array.
  }, [token, courseId]);

  // If we've reached this part of the code, TypeScript now knows that `course` CANNOT be undefined.
  // The early return acts as a type guard for the rest of the component.
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
        <PurchasedExperience courseId={courseId} />
      )}
    </div>
  );
};

export default CourseAccessPage;
