import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'GET /api/acquisition/companies — placeholder' });
}

export async function POST() {
  return NextResponse.json({ message: 'POST /api/acquisition/companies — placeholder' });
}
