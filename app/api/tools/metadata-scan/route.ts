import { NextRequest, NextResponse } from 'next/server'
import { fetchPage, getAllMeta, getLinkTags, getJsonLdTypes, getTitle, normalizeUrl } from '@/lib/analyzer'

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('url')
  if (!raw) return NextResponse.json({ error: 'url required' }, { status: 400 })

  try {
    const { html, finalUrl } = await fetchPage(raw)
    const url = normalizeUrl(raw)

    const allMeta  = getAllMeta(html)
    const links    = getLinkTags(html)
    const jsonLd   = getJsonLdTypes(html)
    const title    = getTitle(html)

    const scriptCount  = (html.match(/<script/gi) ?? []).length
    const inlineStyles = (html.match(/style=/gi) ?? []).length

    const preconnect  = links.filter(l => l.rel === 'preconnect').length
    const preload     = links.filter(l => l.rel === 'preload').length
    const dnsPrefetch = links.filter(l => l.rel === 'dns-prefetch').length

    const ogTags  = allMeta.filter(m => (m.property || '').startsWith('og:'))
    const twTags  = allMeta.filter(m => (m.name || '').startsWith('twitter:'))
    const seoTags = allMeta.filter(m => ['description','keywords','author','robots','viewport','canonical'].includes(m.name || ''))

    const issues: string[] = []
    if (!title) issues.push('Falta el <title>')
    if (!allMeta.some(m => m.name === 'description')) issues.push('Falta meta description')
    if (!allMeta.some(m => m.name === 'viewport')) issues.push('Falta meta viewport')
    if (!links.some(l => l.rel === 'canonical')) issues.push('Sin URL canónica')
    if (ogTags.length === 0) issues.push('Sin Open Graph tags')
    if (twTags.length === 0) issues.push('Sin Twitter Card tags')
    if (jsonLd.length === 0) issues.push('Sin datos estructurados (JSON-LD)')
    if (scriptCount > 15) issues.push(`${scriptCount} scripts en la página — puede afectar velocidad`)

    const score = Math.max(0, Math.round(100 - issues.length * 12))

    return NextResponse.json({
      url: finalUrl || url,
      title,
      allMeta,
      ogTags,
      twTags,
      seoTags,
      links: links.slice(0, 30),
      jsonLd,
      scripts: scriptCount,
      inlineStyles,
      performance: { preconnect, preload, dnsPrefetch },
      issues,
      score,
      counts: {
        total: allMeta.length,
        og: ogTags.length,
        twitter: twTags.length,
        seo: seoTags.length,
        links: links.length,
        jsonLd: jsonLd.length,
      },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error al analizar'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
