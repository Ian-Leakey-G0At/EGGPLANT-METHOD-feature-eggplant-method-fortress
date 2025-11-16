import { verifyTokenOnServer } from '@/lib/server-auth';
import { UnpurchasedHomepage } from '@/components/UnpurchasedHomepage';
import { PurchasedExperience } from '@/components/PurchasedExperience';
import { AccessDenied } from '@/components/AccessDenied';

// This is a React Server Component
export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const token = searchParams?.token;

  // SCENARIO 1: No token present. Show the public sales page.
  if (!token) {
    return <UnpurchasedHomepage />;
  }

  // SCENARIO 2: Token is present. Attempt to verify it on the server.
  // We assume the courseId for this single-product site is known.
  const courseId = 'eggplant-method-v1'; // This should match the ID in your course-data lib
  const verificationResult = await verifyTokenOnServer(token, courseId);

  if (verificationResult.isValid) {
    // SCENARIO 2A: Token is valid. Show the private course content.
    return <PurchasedExperience courseId={courseId} />;
  } else {
    // SCENARIO 2B: Token is invalid. Show the access denied page.
    return <AccessDenied reason={verificationResult.error} />;
  }
}
