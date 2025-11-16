import 'server-only'; // Ensures this code only ever runs on the server

// This function will be called by our root page.tsx server component.
export async function verifyTokenOnServer(token: string, courseId: string): Promise<{ isValid: boolean; error: string | null }> {
  try {
    // We must use the full, absolute URL when a server component calls its own API route.
    // The VERCEL_URL is automatically provided by Vercel in production.
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, courseId }),
      cache: 'no-store', // We must never cache the result of a token verification
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { isValid: false, error: errorData.error || 'Invalid token.' };
    }

    const data = await response.json();

    // Final check to ensure the API responded as expected
    if (data.success === true && data.courseId === courseId) {
      return { isValid: true, error: null };
    } else {
      return { isValid: false, error: 'Token validation failed.' };
    }

  } catch (error) {
    console.error('Server-side verification fetch failed:', error);
    return { isValid: false, error: 'An unexpected error occurred during verification.' };
  }
}
