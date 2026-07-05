import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const dataDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    const file = path.join(dataDir, 'rsvps.json');
    const prev = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
    prev.push({ ...body, createdAt: new Date().toISOString() });
    fs.writeFileSync(file, JSON.stringify(prev, null, 2));
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('RSVP error', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
