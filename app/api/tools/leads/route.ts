import { NextRequest, NextResponse } from 'next/server'
import { captureLead } from '@/lib/lead-capture'

function sanitize(v: unknown, max = 200): string {
  if (typeof v !== 'string') return ''
  return v.replace(/<[^>]*>/g, '').trim().slice(0, max)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email = sanitize(body.email, 100)
    const tool  = sanitize(body.tool, 100)
    const url   = sanitize(body.url, 300)

    if (!email.includes('@') || !tool || !url) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    await captureLead({
      email,
      tool,
      url,
      score:   typeof body.score === 'number' ? body.score : undefined,
      summary: sanitize(body.summary, 600),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[tools/leads]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
