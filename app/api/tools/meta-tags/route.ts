import { NextRequest, NextResponse } from 'next/server'
import { fetchPage, getMeta, getTitle, getAllMeta, getLinkTags, getJsonLdTypes, normalizeUrl } from '@/lib/analyzer'

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('url')
  if (!raw) return NextResponse.json({ error: 'url required' }, { status: 400 })

  try {
    const { html, finalUrl } = await fetchPage(raw)
    const url = normalizeUrl(raw)

    const title        = getTitle(html)
    const description  = getMeta(html, 'name', 'description')
    const viewport     = getMeta(html, 'name', 'viewport')
    const robots       = getMeta(html, 'name', 'robots')
    const author       = getMeta(html, 'name', 'author')
    const charset      = html.match(/charset=["']?([^"'\s>]+)/i)?.[1]?.toUpperCase() ?? null
    const ogTitle      = getMeta(html, 'property', 'og:title')
    const ogDesc       = getMeta(html, 'property', 'og:description')
    const ogImage      = getMeta(html, 'property', 'og:image')
    const ogType       = getMeta(html, 'property', 'og:type')
    const twitterCard  = getMeta(html, 'name', 'twitter:card')
    const twitterSite  = getMeta(html, 'name', 'twitter:site')
    const links        = getLinkTags(html)
    const canonical    = links.find(l => l.rel === 'canonical')?.href ?? null

    const checks: Array<{ name: string; status: 'ok' | 'warn' | 'fail'; value: string | null; note: string }> = [
      {
        name: 'Title',
        status: !title ? 'fail' : title.length < 30 || title.length > 65 ? 'warn' : 'ok',
        value: title,
        note: !title ? 'Falta el title tag' : title.length < 30 ? 'Demasiado corto (mín. 30 chars)' : title.length > 65 ? 'Demasiado largo (máx. 65 chars)' : `${title.length} caracteres — perfecto`,
      },
      {
        name: 'Meta Description',
        status: !description ? 'fail' : description.length < 70 ? 'warn' : description.length > 165 ? 'warn' : 'ok',
        value: description,
        note: !description ? 'Falta la meta description' : description.length < 70 ? 'Demasiado corta (mín. 70 chars)' : description.length > 165 ? 'Demasiado larga (máx. 165 chars)' : `${description.length} caracteres — perfecto`,
      },
      {
        name: 'Viewport',
        status: viewport ? 'ok' : 'fail',
        value: viewport,
        note: viewport ? 'Configurado correctamente' : 'Falta el meta viewport — el sitio puede no ser mobile-friendly',
      },
      {
        name: 'Canonical',
        status: canonical ? 'ok' : 'warn',
        value: canonical,
        note: canonical ? 'URL canónica definida' : 'Sin canonical — puede causar contenido duplicado',
      },
      {
        name: 'OG Title',
        status: ogTitle ? 'ok' : 'warn',
        value: ogTitle,
        note: ogTitle ? 'Presente' : 'Falta — Facebook/LinkedIn usarán el <title> como fallback',
      },
      {
        name: 'OG Description',
        status: ogDesc ? 'ok' : 'warn',
        value: ogDesc,
        note: ogDesc ? 'Presente' : 'Falta — afecta la apariencia al compartir en redes',
      },
      {
        name: 'OG Image',
        status: ogImage ? 'ok' : 'fail',
        value: ogImage,
        note: ogImage ? 'Imagen de compartir presente' : 'FALTA — sin imagen, los links se comparten sin preview visual',
      },
      {
        name: 'Twitter Card',
        status: twitterCard ? 'ok' : 'warn',
        value: twitterCard,
        note: twitterCard ? `Tipo: ${twitterCard}` : 'Falta — Twitter/X usará preview básico sin imagen grande',
      },
      {
        name: 'Charset',
        status: charset === 'UTF-8' ? 'ok' : charset ? 'warn' : 'warn',
        value: charset,
        note: charset === 'UTF-8' ? 'UTF-8 correcto' : charset ? `Charset: ${charset}` : 'No detectado — puede causar problemas con caracteres especiales',
      },
      {
        name: 'Robots',
        status: robots?.includes('noindex') ? 'warn' : 'ok',
        value: robots ?? 'index, follow (default)',
        note: robots?.includes('noindex') ? '⚠️ Página bloqueada para Google' : 'Indexable por buscadores',
      },
    ]

    const okCount = checks.filter(c => c.status === 'ok').length
    const score = Math.round((okCount / checks.length) * 100)

    return NextResponse.json({
      url: finalUrl || url,
      title,
      description,
      viewport,
      charset,
      canonical,
      robots,
      author,
      ogTitle,
      ogDesc,
      ogImage,
      ogType,
      twitterCard,
      twitterSite,
      jsonLd: getJsonLdTypes(html),
      checks,
      score,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error al analizar'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
