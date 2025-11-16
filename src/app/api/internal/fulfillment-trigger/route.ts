import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import { AccessEmail } from '@/emails/AccessEmail';
import { course } from '@/lib/course-data';
import { render } from '@react-email/render';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  // 1. It Demands the Secret Handshake
  const authorization = req.headers.get('authorization');
  if (authorization !== `Bearer ${process.env.INTERNAL_API_SECRET_KEY}`) {
    console.warn('Unauthorized fulfillment request received');
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // 2. It Understands One Language
    const body = await req.json();
    const { customerEmail, courseId } = body;

    if (!customerEmail || !courseId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    if (courseId !== course.id) {
        return new NextResponse('Invalid courseId', { status: 400 });
    }

    console.log(`Fulfillment request received for ${customerEmail} for course ${courseId}`);

    // 3. It Forges the Key
    const token = crypto.randomUUID();
    const tokenKey = `token:${token}`;

    // 4. It Records the Deed (with a 365-day expiration)
    const oneYearInSeconds = 31536000;
    await redis.set(tokenKey, { courseId, customerEmail }, { ex: oneYearInSeconds });
    console.log(`Successfully stored token ${token} for ${customerEmail} in KV`);

    // 5. It Dispatches the Raven
    const accessUrl = `${req.nextUrl.origin}/my-course/${courseId}?token=${token}`;

    const emailHtml = render(AccessEmail({ accessUrl }));

    await resend.emails.send({
      from: 'Method <access@eggplant-method.com>',
      to: customerEmail,
      subject: 'Your Method is Unlocked',
      html: emailHtml,
    });
    console.log(`Access email dispatched to ${customerEmail}`);

    return new NextResponse(JSON.stringify({ success: true, token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Fulfillment Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
