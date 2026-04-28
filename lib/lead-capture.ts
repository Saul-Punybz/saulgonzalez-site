import { Resend } from 'resend'
import { google } from 'googleapis'

const resend = new Resend(process.env.RESEND_API_KEY)

export type LeadData = {
  email: string
  tool: string
  url: string
  score?: number
  summary?: string
}

export async function captureLead(data: LeadData) {
  const { email, tool, url, score, summary } = data
  const timestamp = new Date().toLocaleString('es-PR', {
    timeZone: 'America/Puerto_Rico',
    dateStyle: 'short',
    timeStyle: 'short',
  })

  await Promise.allSettled([
    saveToSheets(timestamp, email, tool, url, score),
    notifyChat(timestamp, email, tool, url, score),
    sendEmail(email, tool, url, score, summary),
  ])
}

async function saveToSheets(timestamp: string, email: string, tool: string, url: string, score?: number) {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!)
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  const sheets = google.sheets({ version: 'v4', auth })
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: 'Tools!A:F',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[timestamp, email, tool, url, score ?? '', 'Nuevo']],
    },
  })
}

async function notifyChat(timestamp: string, email: string, tool: string, url: string, score?: number) {
  const scoreText = score !== undefined ? ` · Score: ${score}/100` : ''
  const text = `🛠 *Lead — ${tool}*\n📧 ${email}\n🌐 ${url}${scoreText}\n🕐 ${timestamp}`
  await fetch(process.env.GOOGLE_CHAT_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
}

async function sendEmail(email: string, tool: string, url: string, score?: number, summary?: string) {
  const scoreColor = !score ? '#888' : score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444'
  const scoreGrade = !score ? '' : score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F'

  await resend.emails.send({
    from: 'Saul González <saul@saulgonzalez.pro>',
    to: email,
    subject: `Tu análisis de ${tool} para ${url}`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f8f7ff;font-family:Inter,system-ui,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(112,48,239,0.08);">

    <div style="background:linear-gradient(135deg,#7030ef,#c026d3);padding:32px 40px;">
      <p style="color:rgba(255,255,255,0.8);margin:0 0 4px;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Saul González · Tools</p>
      <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;">Tu análisis de ${tool}</h1>
      <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">${url}</p>
    </div>

    <div style="padding:32px 40px;">
      ${score !== undefined ? `
      <div style="text-align:center;margin-bottom:28px;">
        <div style="display:inline-block;background:#f8f7ff;border-radius:50%;width:96px;height:96px;line-height:96px;font-size:36px;font-weight:800;color:${scoreColor};">${score}</div>
        <p style="margin:8px 0 0;font-size:14px;color:#666;">Score ${scoreGrade} · de 100 puntos</p>
      </div>
      ` : ''}

      ${summary ? `
      <div style="background:#f8f7ff;border-radius:8px;padding:20px;margin-bottom:24px;">
        <h2 style="margin:0 0 12px;font-size:16px;color:#1a1a2e;">Resumen del análisis</h2>
        <p style="margin:0;color:#444;font-size:14px;line-height:1.6;">${summary}</p>
      </div>
      ` : ''}

      <div style="margin-bottom:28px;">
        <h2 style="font-size:16px;color:#1a1a2e;margin:0 0 12px;">¿Qué sigue?</h2>
        <p style="color:#444;font-size:14px;line-height:1.6;margin:0 0 16px;">Este análisis es el punto de partida. Para convertirlo en un plan de acción concreto para tu negocio, agenda una consulta gratuita de 30 minutos conmigo.</p>
        <a href="https://saulgonzalez.pro/#quiz" style="display:inline-block;background:linear-gradient(135deg,#7030ef,#c026d3);color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:15px;font-weight:600;">Agenda tu consulta gratis →</a>
      </div>

      <div style="border-top:1px solid #eee;padding-top:24px;">
        <p style="margin:0;font-size:13px;color:#888;">Este análisis fue generado con <a href="https://saulgonzalez.pro/tools" style="color:#7030ef;text-decoration:none;">saulgonzalez.pro/tools</a> · herramientas gratuitas para negocios digitales.</p>
      </div>
    </div>
  </div>
</body>
</html>`,
  })
}
