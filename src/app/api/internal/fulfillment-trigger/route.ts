import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

// Initialize Redis
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// Initialize Nodemailer Transporter (Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EGGPLANT_METHOD_GMAIL_USER,
    pass: process.env.EGGPLANT_METHOD_GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    // 1. Authorization Check
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.EGGPLANT_METHOD_INTERNAL_SECRET_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse Payload
    const body = await request.json();
    // Handle nested payload from service-connector
    const data = body.payload || body;
    const { fulfillmentId, userEmail } = data;

    if (!fulfillmentId || !userEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 3. Generate Unique Token
    const token = `${fulfillmentId}-${uuidv4()}`;

    // 4. Store in Redis (Durable Key - 365 days)
    // Key: token, Value: { fulfillmentId, userEmail, createdAt }
    await redis.set(token, JSON.stringify({
      fulfillmentId,
      userEmail,
      createdAt: new Date().toISOString(),
    }), { ex: 31536000 }); // 365 days in seconds

    // 5. Construct Access URL
    // Use Vercel URL in production, localhost in dev
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eggplant-method.vercel.app';
    const accessUrl = `${baseUrl}/my-course/${fulfillmentId}?token=${token}`;

    console.log(`[Fulfillment] Generated access URL for ${userEmail}: ${accessUrl}`);

    // 6. Send Email via Gmail SMTP
    try {
      await transporter.sendMail({
        from: '"Eggplant Method Team" <ian19leakey@gmail.com>',
        to: userEmail,
        subject: 'Your Access to The Eggplant Method',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Welcome to the Inner Sanctum.</h1>
            <p>You have successfully unlocked the method.</p>
            <p>Click the button below to access your secure video stream.</p>
            <a href="${accessUrl}" style="display: inline-block; background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 16px;">Access Now</a>
            <p style="margin-top: 24px; font-size: 12px; color: #666;">This link is valid for 365 days. Do not share it.</p>
          </div>
        `,
      });

      return NextResponse.json({ success: true });
    } catch (emailError) {
      console.error('Gmail SMTP Error:', emailError);
      // Return 500 so the webhook retries if it's a transient issue
      return NextResponse.json({ error: 'Failed to send email', details: emailError }, { status: 500 });
    }

  } catch (error) {
    console.error('Fulfillment Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
