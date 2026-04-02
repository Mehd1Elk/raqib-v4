import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'GET /api/acquisition/companies/[id] — placeholder' });
}

export async function PATCH() {
  return NextResponse.json({ message: 'PATCH /api/acquisition/companies/[id] — placeholder' });
}
