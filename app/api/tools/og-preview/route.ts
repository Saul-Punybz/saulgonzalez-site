import { NextRequest, NextResponse } from 'next/server'
import { fetchPage, getMeta, getTitle, getLinkTags, getFavicon, normalizeUrl } from '@/lib/analyzer'

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('url')
  if (!raw) return NextResponse.json({ error: 'url required' }, { status: 400 })

  try {
    const { html, finalUrl } = await fetchPage(raw)
    const baseUrl = normalizeUrl(raw)

    const ogTitle       = getMeta(html, 'property', 'og:title')
    const ogDesc        = getMeta(html, 'property', 'og:description')
    const ogImage       = getMeta(html, 'property', 'og:image')
    const ogType        = getMeta(html, 'property', 'og:type')
    const ogUrl         = getMeta(html, 'property', 'og:url')
    const ogSiteName    = getMeta(html, 'property', 'og:site_name')
    const twitterCard   = getMeta(html, 'name', 'twitter:card')
    const twitterTitle  = getMeta(html, 'name', 'twitter:title')
    const twitterDesc   = getMeta(html, 'name', 'twitter:description')
    const twitterImage  = getMeta(html, 'name', 'twitter:image')
    const twitterSite   = getMeta(html, 'name', 'twitter:site')
    const pageTitle     = getTitle(html)
    const metaDesc      = getMeta(html, 'name', 'description')
    const favicon       = getFavicon(html, baseUrl)

    const missing: string[] = []
    if (!ogTitle)    missing.push('og:title')
    if (!ogDesc)     missing.push('og:description')
    if (!ogImage)    missing.push('og:image')
    if (!ogType)     missing.push('og:type')
    if (!twitterCard) missing.push('twitter:card')

    const total = 5
    const score = Math.round(((total - missing.length) / total) * 100)

    return NextResponse.json({
      url: finalUrl || baseUrl,
      favicon,
      og: {
        title:    ogTitle || pageTitle,
        description: ogDesc || metaDesc,
        image:    ogImage,
        type:     ogType ?? 'website',
        url:      ogUrl || finalUrl || baseUrl,
        siteName: ogSiteName,
      },
      twitter: {
        card:        twitterCard,
        title:       twitterTitle || ogTitle || pageTitle,
        description: twitterDesc || ogDesc || metaDesc,
        image:       twitterImage || ogImage,
        site:        twitterSite,
      },
      pageTitle,
      metaDesc,
      missing,
      score,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error al analizar'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
