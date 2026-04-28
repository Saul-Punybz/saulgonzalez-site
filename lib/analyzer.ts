export type FetchResult = {
  html: string
  headers: Record<string, string>
  status: number
  finalUrl: string
  fetchTime: number
}

export function normalizeUrl(raw: string): string {
  const trimmed = raw.trim()
  return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
}

export async function fetchPage(rawUrl: string): Promise<FetchResult> {
  const url = normalizeUrl(rawUrl)
  const start = Date.now()
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 9000)

  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SaulTools/1.0; +https://saulgonzalez.pro/tools)',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'es,en;q=0.9',
      },
      redirect: 'follow',
    })
    const html = await res.text()
    const headers: Record<string, string> = {}
    res.headers.forEach((v, k) => { headers[k] = v })
    return { html, headers, status: res.status, finalUrl: res.url, fetchTime: Date.now() - start }
  } finally {
    clearTimeout(timer)
  }
}

export function getMeta(html: string, attr: string, val: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+${attr}=["']${val}["'][^>]+content=["']([^"']*?)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']*?)["'][^>]+${attr}=["']${val}["']`, 'i'),
    new RegExp(`<meta[^>]+${attr}=${val}[^>]+content=["']([^"']*?)["']`, 'i'),
  ]
  for (const p of patterns) {
    const m = html.match(p)
    if (m?.[1] !== undefined) return m[1]
  }
  return null
}

export function getTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  return m?.[1]?.trim() ?? null
}

export function getAllMeta(html: string): Array<Record<string, string>> {
  const results: Array<Record<string, string>> = []
  const tagRegex = /<meta([^>]*?)(?:\s*\/)?>(?!<)/gi
  let match
  while ((match = tagRegex.exec(html)) !== null) {
    const attrs = match[1]
    const attrMap: Record<string, string> = {}
    const attrRegex = /([\w-]+)=["']([^"']*?)["']/g
    let am
    while ((am = attrRegex.exec(attrs)) !== null) {
      attrMap[am[1].toLowerCase()] = am[2]
    }
    if (Object.keys(attrMap).length > 0) results.push(attrMap)
  }
  return results
}

export function getLinkTags(html: string): Array<Record<string, string>> {
  const results: Array<Record<string, string>> = []
  const tagRegex = /<link([^>]*?)(?:\s*\/)?>(?!<)/gi
  let match
  while ((match = tagRegex.exec(html)) !== null) {
    const attrs = match[1]
    const attrMap: Record<string, string> = {}
    const attrRegex = /([\w-]+)=["']([^"']*?)["']/g
    let am
    while ((am = attrRegex.exec(attrs)) !== null) {
      attrMap[am[1].toLowerCase()] = am[2]
    }
    if (attrMap.rel || attrMap.href) results.push(attrMap)
  }
  return results
}

export function getJsonLdTypes(html: string): string[] {
  const results: string[] = []
  const regex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let m
  while ((m = regex.exec(html)) !== null) {
    try {
      const data = JSON.parse(m[1])
      if (data['@graph']) {
        for (const node of data['@graph']) {
          if (node['@type']) results.push(String(node['@type']))
        }
      } else if (data['@type']) {
        results.push(String(data['@type']))
      }
    } catch { /* ignore malformed JSON-LD */ }
  }
  return results
}

export function getFavicon(html: string, baseUrl: string): string | null {
  const links = getLinkTags(html)
  const icon = links.find(l => /icon/i.test(l.rel || ''))
  if (icon?.href) {
    const href = icon.href
    if (href.startsWith('http')) return href
    try {
      return new URL(href, baseUrl).href
    } catch { return href }
  }
  try {
    return new URL('/favicon.ico', baseUrl).href
  } catch { return null }
}
