import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('google.com, pub-3835252173185326, DIRECT, f08c47fec0942fa0', {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
