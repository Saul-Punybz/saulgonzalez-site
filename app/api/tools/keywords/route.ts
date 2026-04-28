import { NextRequest, NextResponse } from 'next/server'
import { fetchPage, getTitle, getMeta, normalizeUrl } from '@/lib/analyzer'

const STOPWORDS = new Set([
  // Spanish
  'a','al','algo','algunas','algunos','ante','antes','como','con','contra','cual','cuando',
  'de','del','desde','donde','durante','e','el','ella','ellas','ellos','en','entre',
  'era','erais','eran','eras','eres','es','esa','esas','ese','eso','esos','esta',
  'estaba','estaban','estado','estados','estamos','estan','estar','estas','este','estos',
  'estoy','fue','fueron','fui','fuimos','ha','hace','hacen','hacer','hacia','han','has',
  'hasta','hay','he','hecho','hemos','la','las','le','les','lo','los','mas','me',
  'mi','mis','mismo','modo','mucho','muchos','muy','ni','no','nos','o','otra','otras',
  'otro','otros','para','pero','poco','por','porque','que','quien','quienes','se','sea',
  'seamos','sean','seas','ser','si','sido','sin','sobre','son','su','sus','también',
  'tanto','te','tenemos','tengo','ti','tiene','tienen','todo','todos','tú','u','un',
  'una','unas','uno','unos','ya','yo','les','su','nos','les','más','si','así','vez',
  'http','https','www','com','net','org','es','pr',
  // English
  'a','about','above','after','again','against','all','am','an','and','any','are',
  'as','at','be','because','been','before','being','below','between','both','but','by',
  'can','could','did','do','does','doing','down','during','each','few','for','from',
  'further','get','had','has','have','having','he','her','here','him','himself','his',
  'how','i','if','in','into','is','it','its','itself','just','know','let','like','me',
  'more','most','my','myself','no','nor','not','now','of','off','on','once','only',
  'or','other','our','ours','ourselves','out','over','own','s','same','she','should',
  'so','some','such','t','than','that','the','their','theirs','them','themselves','then',
  'there','these','they','this','those','through','to','too','under','until','up','us',
  'very','was','we','were','what','when','where','which','while','who','whom','why',
  'will','with','would','you','your','yours',
])

function extractText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

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

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('url')
  if (!raw) return NextResponse.json({ error: 'url required' }, { status: 400 })

  try {
    const { html, finalUrl } = await fetchPage(raw)
    const url = normalizeUrl(raw)

    const title       = getTitle(html) ?? ''
    const description = getMeta(html, 'name', 'description') ?? ''
    const h1s         = extractHeadings(html, 'h1')
    const h2s         = extractHeadings(html, 'h2')
    const h1Text      = h1s.join(' ')
    const h2Text      = h2s.join(' ')

    const bodyText = extractText(html)
    const words = bodyText
      .toLowerCase()
      .replace(/[^a-záéíóúñüàèìòùâêîôûäëïöü\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length >= 4 && !STOPWORDS.has(w))

    const freq = new Map<string, number>()
    for (const w of words) {
      freq.set(w, (freq.get(w) ?? 0) + 1)
    }

    const totalWords = bodyText.split(/\s+/).filter(Boolean).length

    const keywords = Array.from(freq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([word, count]) => ({
        word,
        count,
        density: parseFloat(((count / Math.max(words.length, 1)) * 100).toFixed(2)),
        inTitle: title.toLowerCase().includes(word),
        inDescription: description.toLowerCase().includes(word),
        inH1: h1Text.toLowerCase().includes(word),
        inH2: h2Text.toLowerCase().includes(word),
      }))

    return NextResponse.json({
      url: finalUrl || url,
      totalWords,
      uniqueWords: freq.size,
      keywords,
      title,
      description,
      h1: h1s[0] ?? null,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error al analizar'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
