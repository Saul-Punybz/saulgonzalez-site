import { NextRequest, NextResponse } from 'next/server'
import { fetchPage, getMeta, getTitle, getLinkTags, getJsonLdTypes, normalizeUrl } from '@/lib/analyzer'

function extractHeadings(html: string, tag: string): string[] {
  const results: string[] = []
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi')
  let m
  while ((m = regex.exec(html)) !== null) {
    const text = m[1].replace(/<[^>]+>/g, '').trim()
    if (text) results.push(text)
  }
  return results
}

type ImageInfo = { src: string; alt: string | null; missing: boolean }

function extractImages(html: string, baseUrl: string): ImageInfo[] {
  const results: ImageInfo[] = []
  const regex = /<img([^>]*?)(?:\s*\/)?>(?!<)/gi
  let m
  while ((m = regex.exec(html)) !== null) {
    const attrs = m[1]
    const src  = attrs.match(/src=["']([^"']+)["']/i)?.[1] ?? ''
    const altM = attrs.match(/alt=["']([^"']*)["']/i)
    const alt  = altM ? altM[1].trim() : null
    if (src && !src.startsWith('data:')) {
      results.push({ src, alt, missing: alt === null || alt === '' })
    }
  }
  return results.slice(0, 50)
}

type LinkInfo = { href: string; text: string; type: 'internal' | 'external' | 'anchor' | 'other' }

function extractLinks(html: string, baseUrl: string): LinkInfo[] {
  const results: LinkInfo[] = []
  const regex = /<a([^>]*?)>([\s\S]*?)<\/a>/gi
  let m
  const domain = (() => { try { return new URL(baseUrl).hostname } catch { return '' } })()
  while ((m = regex.exec(html)) !== null) {
    const attrs = m[1]
    const href = attrs.match(/href=["']([^"']+)["']/i)?.[1] ?? ''
    const text = m[2].replace(/<[^>]+>/g, '').trim().slice(0, 60)
    if (!href) continue
    let type: LinkInfo['type'] = 'other'
    if (href.startsWith('#') || href.startsWith('javascript:')) type = 'anchor'
    else if (href.startsWith('http')) {
      try { type = new URL(href).hostname === domain ? 'internal' : 'external' } catch { type = 'external' }
    } else {
      type = 'internal'
    }
    results.push({ href, text, type })
  }
  return results.slice(0, 100)
}

function wordCount(html: string): number {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean).length
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('url')
  if (!raw) return NextResponse.json({ error: 'url required' }, { status: 400 })

  try {
    const { html, finalUrl } = await fetchPage(raw)
    const url = normalizeUrl(raw)

    const title        = getTitle(html)
    const description  = getMeta(html, 'name', 'description')
    const robots       = getMeta(html, 'name', 'robots')
    const canonical    = getLinkTags(html).find(l => l.rel === 'canonical')?.href ?? null
    const jsonLd       = getJsonLdTypes(html)
    const h1s          = extractHeadings(html, 'h1')
    const h2s          = extractHeadings(html, 'h2')
    const h3s          = extractHeadings(html, 'h3')
    const images       = extractImages(html, url)
    const links        = extractLinks(html, finalUrl || url)
    const words        = wordCount(html)

    const internalLinks = links.filter(l => l.type === 'internal')
    const externalLinks = links.filter(l => l.type === 'external')
    const imagesWithAlt = images.filter(i => !i.missing)
    const imagesMissingAlt = images.filter(i => i.missing)

    const checks: Array<{ id: string; title: string; status: 'ok' | 'warn' | 'fail'; detail: string }> = [
      {
        id: 'h1',
        title: 'H1 único',
        status: h1s.length === 1 ? 'ok' : h1s.length === 0 ? 'fail' : 'warn',
        detail: h1s.length === 0 ? 'Sin H1 — crítico para SEO' : h1s.length > 1 ? `${h1s.length} H1 encontrados — solo debe haber 1` : `"${h1s[0].slice(0, 60)}${h1s[0].length > 60 ? '…' : ''}"`,
      },
      {
        id: 'title',
        title: 'Title tag',
        status: !title ? 'fail' : title.length < 30 || title.length > 65 ? 'warn' : 'ok',
        detail: !title ? 'Falta el title tag' : `${title.length} chars — ${title.length < 30 ? 'muy corto' : title.length > 65 ? 'muy largo (máx 65)' : 'perfecto'}`,
      },
      {
        id: 'desc',
        title: 'Meta description',
        status: !description ? 'fail' : description.length < 70 || description.length > 165 ? 'warn' : 'ok',
        detail: !description ? 'Falta meta description' : `${description.length} chars — ${description.length < 70 ? 'muy corta' : description.length > 165 ? 'muy larga (máx 165)' : 'perfecta'}`,
      },
      {
        id: 'canonical',
        title: 'URL canónica',
        status: canonical ? 'ok' : 'warn',
        detail: canonical ? canonical : 'Sin canonical — riesgo de contenido duplicado',
      },
      {
        id: 'images',
        title: 'Imágenes con alt text',
        status: imagesMissingAlt.length === 0 ? 'ok' : imagesMissingAlt.length <= 3 ? 'warn' : 'fail',
        detail: images.length === 0 ? 'Sin imágenes' : `${imagesWithAlt.length}/${images.length} con alt text${imagesMissingAlt.length > 0 ? ` — ${imagesMissingAlt.length} sin alt` : ''}`,
      },
      {
        id: 'words',
        title: 'Contenido suficiente',
        status: words >= 300 ? 'ok' : words >= 100 ? 'warn' : 'fail',
        detail: `${words} palabras — ${words < 100 ? 'muy poco contenido' : words < 300 ? 'contenido escaso (mín 300)' : 'buen volumen de contenido'}`,
      },
      {
        id: 'links',
        title: 'Links internos',
        status: internalLinks.length >= 3 ? 'ok' : internalLinks.length >= 1 ? 'warn' : 'fail',
        detail: `${internalLinks.length} interno${internalLinks.length !== 1 ? 's' : ''}, ${externalLinks.length} externo${externalLinks.length !== 1 ? 's' : ''}`,
      },
      {
        id: 'schema',
        title: 'Datos estructurados',
        status: jsonLd.length > 0 ? 'ok' : 'warn',
        detail: jsonLd.length > 0 ? `JSON-LD: ${jsonLd.join(', ')}` : 'Sin JSON-LD — Google no puede mostrar rich snippets',
      },
      {
        id: 'noindex',
        title: 'Indexable por Google',
        status: robots?.includes('noindex') ? 'fail' : 'ok',
        detail: robots?.includes('noindex') ? '⛔ Página bloqueada con noindex' : 'Indexable (no noindex encontrado)',
      },
    ]

    const okCount = checks.filter(c => c.status === 'ok').length
    const score = Math.round((okCount / checks.length) * 100)

    return NextResponse.json({
      url: finalUrl || url,
      checks,
      score,
      headings: { h1: h1s, h2: h2s.slice(0, 10), h3: h3s.slice(0, 10) },
      images: { total: images.length, withAlt: imagesWithAlt.length, missingAlt: imagesMissingAlt.slice(0, 5) },
      links: { total: links.length, internal: internalLinks.length, external: externalLinks.length },
      words,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error al analizar'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
