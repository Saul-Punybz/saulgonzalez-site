import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

// ── In-memory rate limiter (5 requests per IP per hour) ───────────
const rateMap = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW = 60 * 60 * 1000 // 1 hour

function checkRate(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

// ── Strip HTML tags and limit length ──────────────────────────────
function sanitize(val: unknown, max = 200): string {
  if (typeof val !== 'string') return ''
  return val.replace(/<[^>]*>/g, '').replace(/[<>]/g, '').trim().slice(0, max)
}

export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRate(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 })
  }

  // Reject oversized payloads
  const contentLength = req.headers.get('content-length')
  if (contentLength && parseInt(contentLength) > 10_000) {
    return NextResponse.json({ ok: false }, { status: 413 })
  }

  try {
    const body = await req.json()

    // Honeypot — bots fill hidden fields, humans don't
    if (body._hp) return NextResponse.json({ ok: true })

    // Time check — bots submit in milliseconds, humans take at least 3s
    const elapsed = Date.now() - Number(body._ts || 0)
    if (elapsed < 3000) return NextResponse.json({ ok: true })

    const name        = sanitize(body.name, 100)
    const email       = sanitize(body.email, 100)
    const company     = sanitize(body.company, 100)
    const service     = sanitize(body.service, 100)
    const stage       = sanitize(body.stage, 100)
    const concern     = sanitize(body.concern, 100)
    const budget      = sanitize(body.budget, 50)
    const message     = sanitize(body.message, 500)
    const referrer    = sanitize(body.referrer, 300)
    const utm_source  = sanitize(body.utm_source, 100)
    const utm_medium  = sanitize(body.utm_medium, 100)
    const utm_campaign = sanitize(body.utm_campaign, 100)

    // Basic email validation
    if (!email.includes('@') || !name) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const timestamp = new Date().toLocaleString('es-PR', {
      timeZone: 'America/Puerto_Rico',
      dateStyle: 'short',
      timeStyle: 'short',
    })

    // ── Google Sheets ────────────────────────────────────────────────
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!)
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    const sheets = google.sheets({ version: 'v4', auth })
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: 'Sheet1!A:N',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[timestamp, name, email, company, service, stage, concern, budget, message, 'Nuevo', referrer, utm_source, utm_medium, utm_campaign]],
      },
    })

    // ── Google Chat notification ─────────────────────────────────────
    const lines = [
      `🔔 *Nuevo lead — ${name}*`,
      `📧 ${email}${company ? ` · ${company}` : ''}`,
      `🛠 Proyecto: ${service || '—'}`,
      stage   ? `📍 Etapa: ${stage}` : '',
      concern ? `⚠️ Preocupación: ${concern}` : '',
      budget  ? `💰 Presupuesto: ${budget}` : '',
      message ? `\n💬 _${message.slice(0, 200)}${message.length > 200 ? '…' : ''}_` : '',
      (() => {
        try {
          const src = utm_source || (referrer ? new URL(referrer).hostname.replace('www.', '') : '')
          return src ? `🌐 Fuente: ${src}${utm_medium ? ` / ${utm_medium}` : ''}${utm_campaign ? ` — ${utm_campaign}` : ''}` : ''
        } catch { return '' }
      })(),
    ].filter(Boolean).join('\n')

    await fetch(process.env.GOOGLE_CHAT_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: lines }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
