
import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import { AccessEmail } from '@/emails/AccessEmail';
import { courseData } from '@/lib/course-data';

// Initialize Redis and Resend clients
const redis = Redis.fromEnv();
const resend = new Resend(process.env.RESEND_API_KEY);

// The shared secret for validating incoming requests
const SHARED_SECRET = process.env.INTERNAL_API_SECRET;

// Interface for the token data to be stored in Redis
interface TokenData {
    fulfillmentId: string; 
    userEmail: string;
}

/**
 * This endpoint is the fulfillment trigger called by our service-connector
 * after a successful payment. It generates a unique access token,
 * stores it in Vercel KV with a 1-year expiry, and sends the user
 * an email with their unique access link.
 */
export async function POST(req: NextRequest) {
  // 1. Validate Authorization Header
  const authHeader = req.headers.get('Authorization');
  if (authHeader !== `Bearer ${SHARED_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 2. Parse Incoming Request Body
  const { fulfillmentId, userEmail } = await req.json();
  if (!fulfillmentId || !userEmail) {
    return new NextResponse('Missing fulfillmentId or userEmail', { status: 400 });
  }

  // 3. Find Corresponding Course Data
  const course = courseData.find(c => c.id === fulfillmentId);
  if (!course) {
    return new NextResponse(`Course not found for fulfillmentId: ${fulfillmentId}`, { status: 404 });
  }

  try {
    // 4. Generate a Unique, Secure Access Token
    const token = `${fulfillmentId}-${crypto.randomUUID()}`;
    const tokenKey = `token:${token}`;
    const tokenData: TokenData = { fulfillmentId, userEmail };

    // 5. Store the Token in Redis with a 1-Year Expiry (Durable Key Model)
    const ONE_YEAR_IN_SECONDS = 86400 * 365;
    await redis.set(tokenKey, JSON.stringify(tokenData), { ex: ONE_YEAR_IN_SECONDS });

    // 6. Construct the Access URL
    const accessUrl = `${process.env.NEXT_PUBLIC_BASE_URL}?token=${token}`;

    // 7. Send the Access Email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Commander <noreply@yourdomain.com>', // Replace with your domain
      to: [userEmail],
      subject: `Your Access to: ${course.title}`,
      react: AccessEmail({ accessUrl, courseTitle: course.title }),
    });

    if (error) {
      console.error('Error sending email:', error);
      // Note: In a real-world scenario, you might have a retry mechanism or alert system here
      return new NextResponse('Error sending confirmation email.', { status: 500 });
    }

    // 8. Return a Success Response
    return NextResponse.json({ success: true, message: 'Fulfillment completed.' });

  } catch (error) {
    console.error('Fulfillment Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
