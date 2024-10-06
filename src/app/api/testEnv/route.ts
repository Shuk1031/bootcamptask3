import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const dbUrl = process.env.DATABASE_URL;
  return NextResponse.json({ DATABASE_URL: dbUrl });
}