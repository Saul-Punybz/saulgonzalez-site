import { NextRequest, NextResponse } from 'next/server'
import { normalizeUrl } from '@/lib/analyzer'

async function dnsQuery(name: string, type: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`,
      { headers: { Accept: 'application/dns-json' }, signal: AbortSignal.timeout(5000) }
    )
    const data = await res.json()
    return (data.Answer ?? []).map((r: { data: string }) =>
      r.data.replace(/["\\]/g, '').trim()
    )
  } catch { return [] }
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('url')
  if (!raw) return NextResponse.json({ error: 'url required' }, { status: 400 })

  try {
    const url = normalizeUrl(raw.trim())
    const hostname = new URL(url).hostname

    const start = Date.now()
    const ctrl = new AbortController()
    setTimeout(() => ctrl.abort(), 10000)

    // Fetch the page and track redirects
    const redirects: string[] = []
    let finalUrl = url
    let status = 0
    let headers: Record<string, string> = {}
    let responseTime = 0

    try {
      // First try HTTP to check redirect to HTTPS
      const httpUrl = url.replace(/^https:/, 'http:')
      const httpRes = await fetch(httpUrl, {
        method: 'HEAD',
        redirect: 'manual',
        signal: AbortSignal.timeout(5000),
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SaulTools/1.0)' },
      })
      if (httpRes.status >= 300 && httpRes.status < 400) {
        redirects.push(httpUrl + ' → ' + (httpRes.headers.get('location') ?? ''))
      }
    } catch { /* ignore http check failure */ }

    const t0 = Date.now()
    try {
      const res = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
        signal: ctrl.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SaulTools/1.0)' },
      })
      responseTime = Date.now() - t0
      status = res.status
      finalUrl = res.url
      res.headers.forEach((v, k) => { headers[k] = v })
    } catch (e) {
      responseTime = Date.now() - t0
      status = 0
    }

    // DNS records in parallel
    const [aRecords, mxRecords, nsRecords, txtRecords] = await Promise.all([
      dnsQuery(hostname, 'A'),
      dnsQuery(hostname, 'MX'),
      dnsQuery(hostname, 'NS'),
      dnsQuery(hostname, 'TXT'),
    ])

    const security = {
      https: url.startsWith('https://'),
      hsts: !!headers['strict-transport-security'],
      hstsValue: headers['strict-transport-security'] ?? null,
      xFrameOptions: headers['x-frame-options'] ?? null,
      csp: !!headers['content-security-policy'],
      xContentType: headers['x-content-type-options'] ?? null,
      referrerPolicy: headers['referrer-policy'] ?? null,
      server: headers['server'] ?? null,
      poweredBy: headers['x-powered-by'] ?? null,
    }

    const securityScore = [
      security.https,
      security.hsts,
      !!security.xFrameOptions,
      security.csp,
      !!security.xContentType,
    ].filter(Boolean).length

    const healthChecks = [
      { label: 'HTTPS', ok: security.https, detail: security.https ? 'Conexión cifrada' : 'Sin HTTPS — inseguro' },
      { label: 'Disponible', ok: status >= 200 && status < 400, detail: status ? `HTTP ${status}` : 'Sin respuesta' },
      { label: 'HSTS', ok: security.hsts, detail: security.hsts ? security.hstsValue ?? 'Activo' : 'No configurado' },
      { label: 'X-Frame-Options', ok: !!security.xFrameOptions, detail: security.xFrameOptions ?? 'No configurado' },
      { label: 'DNS A record', ok: aRecords.length > 0, detail: aRecords.length > 0 ? aRecords[0] : 'No encontrado' },
      { label: 'MX (Email)', ok: mxRecords.length > 0, detail: mxRecords.length > 0 ? `${mxRecords.length} servidor${mxRecords.length !== 1 ? 'es' : ''} de email` : 'Sin servidores de email' },
      { label: 'CSP', ok: security.csp, detail: security.csp ? 'Configurado' : 'Content Security Policy no configurado' },
      { label: 'X-Content-Type', ok: !!security.xContentType, detail: security.xContentType ?? 'No configurado' },
    ]

    const overallScore = Math.round(
      (healthChecks.filter(c => c.ok).length / healthChecks.length) * 100
    )

    return NextResponse.json({
      url: finalUrl || url,
      hostname,
      status,
      responseTime,
      redirects,
      security,
      securityScore,
      dns: { a: aRecords, mx: mxRecords, ns: nsRecords, txt: txtRecords.slice(0, 5) },
      healthChecks,
      score: overallScore,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error al analizar'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
