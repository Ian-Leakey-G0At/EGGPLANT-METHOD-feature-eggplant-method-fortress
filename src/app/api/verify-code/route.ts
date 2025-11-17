
import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = Redis.fromEnv();

interface TokenData {
    fulfillmentId: string;
    userEmail: string;
}

/**
 * This endpoint verifies a user's access token.
 * It checks for the token's existence in Vercel KV and, if valid,
 * returns the associated fulfillment data without deleting the token.
 */
export async function POST(req: NextRequest) {
  // 1. Parse the token from the request body
  const { token } = await req.json();

  if (!token || typeof token !== 'string') {
    return new NextResponse('Token is required', { status: 400 });
  }

  try {
    const tokenKey = `token:${token}`;

    // 2. Look up the token in Redis
    const data = await redis.get<TokenData>(tokenKey);

    if (!data) {
      // Token not found or expired
      return NextResponse.json({ isValid: false, error: 'Invalid or expired token.' }, { status: 404 });
    }

    // 3. Per the "Durable Key" model, we do not burn the token on read.
    // Its validity is controlled by the 365-day expiry set during creation.
    // await redis.del(tokenKey); // THIS LINE IS INTENTIONALLY OMITTED.

    // 4. If the token is valid, return success and the fulfillmentId
    return NextResponse.json({ isValid: true, fulfillmentId: data.fulfillmentId });

  } catch (error) {
    console.error('Verification Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
