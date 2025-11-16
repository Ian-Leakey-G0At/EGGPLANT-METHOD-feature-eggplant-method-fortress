'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { UnpurchasedHomepage } from '@/components/UnpurchasedHomepage';
import { PurchasedExperience } from '@/components/PurchasedExperience';
import { AccessDenied } from '@/components/AccessDenied';

// A simple loading component, as the page will now be client-rendered.
function LoadingState() {
  return (
    <div className="flex justify-center items-center h-screen bg-background-dark text-white">
      <div className="flex flex-col items-center">
        <svg className="animate-spin h-8 w-8 text-lime-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-lg">Verifying Access...</p>
      </div>
    </div>
  );
}

// The main component that will be rendered on the client.
function HomePageClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const courseId = 'eggplant-method-v1';

  const [verificationState, setVerificationState] = useState<{
    status: 'loading' | 'valid' | 'invalid' | 'no-token';
    error?: string;
  }>({ status: 'loading' });

  useEffect(() => {
    if (!token) {
      setVerificationState({ status: 'no-token' });
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch('/api/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, courseId }),
        });

        const result = await response.json();

        if (result.isValid) {
          setVerificationState({ status: 'valid' });
        } else {
          setVerificationState({ status: 'invalid', error: result.error });
        }
      } catch (error) {
        setVerificationState({ status: 'invalid', error: 'Failed to verify token.' });
      }
    };

    verifyToken();
  }, [token, courseId]);

  if (verificationState.status === 'no-token') {
    return <UnpurchasedHomepage />;
  }

  if (verificationState.status === 'loading') {
    return <LoadingState />;
  }

  if (verificationState.status === 'valid') {
    return <PurchasedExperience courseId={courseId} />;
  }

  if (verificationState.status === 'invalid') {
    return <AccessDenied reason={verificationState.error} />;
  }

  return <LoadingState />; // Default fallback
}


// The main export must wrap the client component in Suspense
// because useSearchParams requires it.
export default function HomePage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <HomePageClient />
    </Suspense>
  );
}
