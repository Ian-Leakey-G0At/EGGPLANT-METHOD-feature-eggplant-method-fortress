'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { UnpurchasedHomepage } from "@/components/UnpurchasedHomepage";
import { PurchasedExperience } from "@/components/PurchasedExperience";
import { AccessDenied } from './AccessDenied'; // A fallback component

const COURSE_ID = 'eggplant-method-v1';

function HomePageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    async function verifyToken() {
      try {
        const res = await fetch('/api/verify-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        if (res.ok) {
          const data = await res.json();
          setIsValid(data.isValid);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsValid(false);
      } finally {
        setIsLoading(false);
      }
    }

    verifyToken();
  }, [token]);

  if (isLoading) {
    // You can return a loading spinner here if you have one
    return <div className="flex items-center justify-center h-screen"><p>Loading...</p></div>;
  }

  if (token && isValid) {
    return <PurchasedExperience courseId={COURSE_ID} />;
  }

  // If the token is present but invalid, you might want to show an error
  if (token && isValid === false) {
      return <AccessDenied reason="Your access token is invalid or has expired." />;
  }

  // Default to the public page
  return <UnpurchasedHomepage />;
}

// The useSearchParams hook must be used within a component wrapped in <Suspense>.
// So we create a wrapper component.
export default function HomePageHandler() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen"><p>Loading...</p></div>}>
            <HomePageContent />
        </Suspense>
    )
}
