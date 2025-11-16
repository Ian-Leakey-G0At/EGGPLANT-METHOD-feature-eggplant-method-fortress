import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Define the schema for the incoming request body
const verifyCodeSchema = z.object({
  token: z.string().min(1, { message: "Token cannot be empty" }),
  courseId: z.string().min(1, { message: "courseId cannot be empty" }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = verifyCodeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { token, courseId } = validation.data;

    const tokenKey = `token:${token}`;
    const tokenData = await kv.get<{ courseId: string; customerEmail: string }>(tokenKey);

    if (!tokenData) {
      return NextResponse.json({ error: 'Token not found or expired.' }, { status: 404 });
    }

    if (tokenData.courseId !== courseId) {
      return NextResponse.json({ error: 'Token is not valid for this course.' }, { status: 403 });
    }

    // "Durable Key" model: We do NOT delete the token.
    return NextResponse.json({ success: true, courseId: tokenData.courseId });

  } catch (error) {
    console.error('[/api/verify-code] Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
