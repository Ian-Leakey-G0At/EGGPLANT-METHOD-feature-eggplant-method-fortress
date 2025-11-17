
import { UnpurchasedHomepage } from "@/components/UnpurchasedHomepage";
import { PurchasedExperience } from "@/components/PurchasedExperience";

// The fortress is for a single product, so the course ID is constant.
const COURSE_ID = 'eggplant-method-v1';

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function verifyTokenOnServer(token: string) {
  // Construct the verification URL from environment variables
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-code`;

  try {
    const res = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
      cache: 'no-store', // Always perform a fresh check
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Verification failed with non-JSON response.' }));
      return { isValid: false, error: errorData.error || 'Invalid token response.' };
    }

    const data = await res.json();
    return { isValid: data.isValid as boolean, error: null };

  } catch (error) {
    console.error('Verification fetch error:', error);
    return { isValid: false, error: 'A network error occurred during verification.' };
  }
}

export default async function HomePage({ searchParams }: HomeProps) {
  const token = searchParams?.token as string | undefined;

  if (!token) {
    // State 1: No token, render the public-facing sales page.
    return <UnpurchasedHomepage />;
  }

  // State 2: Token exists, verify it on the server.
  const { isValid } = await verifyTokenOnServer(token);

  if (isValid) {
    // State 2a: Token is valid, render the private, purchased content.
    return <PurchasedExperience courseId={COURSE_ID} />;
  }

  // State 2b: Token is invalid, render the public page again (or a dedicated Access Denied component).
  // For this project, we redirect to the homepage for simplicity.
  return <UnpurchasedHomepage />;
}
