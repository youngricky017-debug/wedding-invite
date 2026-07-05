import { NextResponse } from 'next/server'

export async function GET() {
  const sheetsUrl = process.env.SHEETS_WEBHOOK_URL;
  const sheetsToken = process.env.SHEETS_WEBHOOK_TOKEN;
  if (!sheetsUrl) return NextResponse.json({ ok: false, error: 'SHEETS_WEBHOOK_URL not configured' }, { status: 400 });

  try {
    const payload = {
      name: 'Webhook test',
      phone: '0000000000',
      message: 'This is a test from your Next.js server',
      createdAt: new Date().toISOString(),
    };
    if (sheetsToken) payload['token'] = sheetsToken;

    const resp = await fetch(sheetsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // give a short timeout? fetch in node doesn't support easy timeout here, keep default
    });

    const text = await resp.text().catch(()=>'<no body>');
    return NextResponse.json({ ok: true, status: resp.status, body: text });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
