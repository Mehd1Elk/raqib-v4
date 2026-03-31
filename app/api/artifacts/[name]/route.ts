import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  // Prevent path traversal
  if (name.includes('..') || name.includes('/')) {
    return Response.json({ error: 'Invalid artifact name' }, { status: 400 });
  }

  const filePath = join(process.cwd(), 'public', 'artifacts', name);

  try {
    const content = readFileSync(filePath, 'utf-8');
    const isHTML = name.endsWith('.html');
    return new Response(content, {
      headers: {
        'Content-Type': isHTML ? 'text/html' : 'application/javascript',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return Response.json({ error: 'Artifact not found' }, { status: 404 });
  }
}
