import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { token, courseId } = await req.json();

    if (!token || !courseId) {
      return new NextResponse('Missing token or courseId', { status: 400 });
    }

    const tokenKey = `token:${token}`;

    // 1. It Consults the Ledger
    const tokenData: { courseId: string; customerEmail: string } | null = await redis.get(tokenKey);

    if (!tokenData) {
      console.log(`Verification failed: Token ${token} not found.`);
      return new NextResponse('Invalid token', { status: 401 });
    }

    // 2. It Performs the "Lock-and-Key" Check
    if (tokenData.courseId !== courseId) {
      console.log(`Verification failed: Token ${token} has mismatched courseId. Expected ${courseId}, got ${tokenData.courseId}`);
      // Note: We do not delete the token here, as it might be a simple user error (e.g., wrong link).
      return new NextResponse('Token is not valid for this course', { status: 403 });
    }

    // 3. Access is granted. The key is NOT burned.
    console.log(`Successful verification for token ${token} for course ${courseId}.`);
    return new NextResponse(JSON.stringify({ success: true, message: 'Token verified' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Verification Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
