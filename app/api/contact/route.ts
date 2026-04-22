import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, service, stage, concern, budget, message, referrer, utm_source, utm_medium, utm_campaign } = body

    const timestamp = new Date().toLocaleString('es-PR', {
      timeZone: 'America/Puerto_Rico',
      dateStyle: 'short',
      timeStyle: 'short',
    })

    // ── Google Sheets ──────────────────────────────────────────────
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!)
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    const sheets = google.sheets({ version: 'v4', auth })
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: 'Sheet1!A:N',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, name, email, company || '', service || '', stage || '', concern || '', budget || '', message || '', 'Nuevo', referrer || '', utm_source || '', utm_medium || '', utm_campaign || '']],
      },
    })

    // ── Google Chat notification ───────────────────────────────────
    const lines = [
      `🔔 *Nuevo lead — ${name}*`,
      `📧 ${email}${company ? ` · ${company}` : ''}`,
      `🛠 Proyecto: ${service || '—'}`,
      stage    ? `📍 Etapa: ${stage}` : '',
      concern  ? `⚠️ Preocupación: ${concern}` : '',
      budget   ? `💰 Presupuesto: ${budget}` : '',
      message  ? `\n💬 _${message.slice(0, 200)}${message.length > 200 ? '…' : ''}_` : '',
      (() => {
        const src = utm_source || (referrer ? new URL(referrer).hostname.replace('www.', '') : '')
        return src ? `🌐 Fuente: ${src}${utm_medium ? ` / ${utm_medium}` : ''}${utm_campaign ? ` — ${utm_campaign}` : ''}` : ''
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
