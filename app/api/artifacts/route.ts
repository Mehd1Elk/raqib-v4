import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const dir = path.join(process.cwd(), 'public', 'artifacts');

  try {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') || f.endsWith('.html'));
    return NextResponse.json({
      total: files.length,
      artifacts: files.map(f => ({
        name: f,
        url: `/artifacts/${f}`,
        type: f.endsWith('.jsx') ? 'jsx' : 'html',
      })),
    });
  } catch {
    return NextResponse.json({ total: 0, artifacts: [] });
  }
}
