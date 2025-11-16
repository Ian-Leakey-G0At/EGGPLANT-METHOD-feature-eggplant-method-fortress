import { NextResponse } from 'next/server';
import { verifyTokenOnServer } from '@/lib/server-auth';
import { z } from 'zod';

const RequestBodySchema = z.object({
  token: z.string(),
  courseId: z.string(),
});

export async function POST(request: Request) {
  const requestBody = await request.json();

  const parsedBody = RequestBodySchema.safeParse(requestBody);

  if (!parsedBody.success) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { token, courseId } = parsedBody.data;

  try {
    const verificationResult = await verifyTokenOnServer(token, courseId);
    return NextResponse.json(verificationResult);
  } catch (error) {
    console.error('API Verification Error:', error);
    return NextResponse.json({ isValid: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
