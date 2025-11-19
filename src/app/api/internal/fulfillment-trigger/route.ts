
import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import { AccessEmail } from '@/emails/AccessEmail';
import { courses } from '@/lib/course-data'; // Corrected import

// Initialize Redis and Resend clients
const redis = Redis.fromEnv();
const resend = new Resend(process.env.EGGPLANT_METHOD_RESEND_API_KEY);

// The shared secret for validating incoming requests
const SHARED_SECRET = process.env.EGGPLANT_METHOD_INTERNAL_SECRET_KEY;

// Interface for the token data to be stored in Redis
interface TokenData {
  fulfillmentId: string;
  userEmail: string;
}

export async function POST(req: NextRequest) {
  // 1. Validate Authorization Header
  const authHeader = req.headers.get('Authorization');
  if (authHeader !== `Bearer ${SHARED_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 2. Parse Incoming Request Body
  const body = await req.json();

  // The service-connector sends: { eventType: "...", payload: { customerEmail: "...", courseId: "..." } }
  // We need to handle both the direct format (for testing) and the nested format (from connector)
  const data = body.payload || body;

  const fulfillmentId = data.courseId || data.fulfillmentId;
  const userEmail = data.customerEmail || data.userEmail;

  if (!fulfillmentId || !userEmail) {
    return new NextResponse('Missing fulfillmentId (or courseId) or userEmail (or customerEmail)', { status: 400 });
  }

  // 3. Look up the purchased course from our master list
  const purchasedCourse = courses.find(c => c.id === fulfillmentId);

  if (!purchasedCourse) {
    console.error(`CRITICAL: Fulfillment request for unknown course ID: ${fulfillmentId}`);
    return new NextResponse(`Course not found for fulfillmentId: ${fulfillmentId}`, { status: 404 });
  }

  try {
    // 4. Generate a Unique, Secure Access Token
    const token = `${fulfillmentId}-${crypto.randomUUID()}`;
    const tokenKey = `token:${token}`;
    const tokenData: TokenData = { fulfillmentId, userEmail };

    // 5. Store the Token in Redis with a 1-Year Expiry
    const ONE_YEAR_IN_SECONDS = 86400 * 365;
    await redis.set(tokenKey, JSON.stringify(tokenData), { ex: ONE_YEAR_IN_SECONDS });

    // 6. Construct the Access URL
    const accessUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/my-course/${purchasedCourse.id}?token=${token}`;

    // 7. Send the Access Email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Commander <noreply@yourdomain.com>',
      to: [userEmail],
      subject: `Your Access to: ${purchasedCourse.name}`,
      react: AccessEmail({ accessUrl, courseTitle: purchasedCourse.name }),
    });

    if (error) {
      console.error('Error sending email:', error);
      return new NextResponse('Error sending confirmation email.', { status: 500 });
    }

    // 8. Return a Success Response
    return NextResponse.json({ success: true, message: 'Fulfillment completed.' });

  } catch (error) {
    console.error('Fulfillment Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
