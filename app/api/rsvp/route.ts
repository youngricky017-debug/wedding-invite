import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // If a Google Apps Script webhook URL is provided via env, forward the RSVP to that URL.
    const sheetsUrl = process.env.SHEETS_WEBHOOK_URL;
    const sheetsToken = process.env.SHEETS_WEBHOOK_TOKEN;
    if (sheetsUrl) {
      try {
        const payload = {
          name: body.name,
          phone: body.phone,
          message: body.message,
          createdAt: new Date().toISOString(),
        };
        // include token if available
        if (sheetsToken) payload['token'] = sheetsToken;

        const resp = await fetch(sheetsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!resp.ok) {
          console.error('Sheets webhook failed', resp.status, await resp.text().catch(()=>''));
          // fallback to file write below
        } else {
          return NextResponse.json({ ok: true, forwarded: true }, { status: 201 });
        }
      } catch (err) {
        console.error('Error calling sheets webhook', err);
        // continue to fallback
      }
    }

    // Fallback: append to local file (keeps existing behavior for development)
    const dataDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    const file = path.join(dataDir, 'rsvps.json');
    const prev = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
    prev.push({ name: body.name, phone: body.phone, message: body.message, createdAt: new Date().toISOString() });
    fs.writeFileSync(file, JSON.stringify(prev, null, 2));

    return NextResponse.json({ ok: true, forwarded: false }, { status: 201 });
  } catch (err) {
    console.error('RSVP error', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
