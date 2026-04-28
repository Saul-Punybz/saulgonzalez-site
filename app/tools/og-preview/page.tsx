'use client'
import { useState } from 'react'
import Image from 'next/image'
import ToolLayout from '@/components/ToolLayout'
import LeadCapture, { LeadIssue } from '@/components/LeadCapture'

type OgData = {
  url: string
  favicon: string | null
  og: { title: string | null; description: string | null; image: string | null; type: string; url: string | null; siteName: string | null }
  twitter: { card: string | null; title: string | null; description: string | null; image: string | null; site: string | null }
  pageTitle: string | null
  metaDesc: string | null
  missing: string[]
  score: number
  error?: string
}

type Platform = { id: string; name: string; icon: string; useTwitter: boolean }

const platforms: Platform[] = [
  { id: 'facebook', name: 'Facebook', icon: '📘', useTwitter: false },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', useTwitter: false },
  { id: 'twitter', name: 'Twitter / X', icon: '🐦', useTwitter: true },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬', useTwitter: false },
]

function PreviewCard({ data, platform }: { data: OgData; platform: Platform }) {
  const src = platform.useTwitter ? data.twitter : data.og
  const title = src.title || data.pageTitle || 'Sin título'
  const desc = src.description || data.metaDesc || ''
  const img = platform.useTwitter ? (data.twitter.image || data.og.image) : data.og.image
  const domain = (() => { try { return new URL(data.url).hostname.replace('www.', '') } catch { return data.url } })()

  if (platform.id === 'whatsapp') {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] overflow-hidden">
        <div className="bg-[#dcf8c6] dark:bg-[#1a2a1a] p-3 rounded-lg m-2 flex gap-3">
          {img && (
            <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700 relative">
              <Image src={img} alt="" fill className="object-cover" unoptimized />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900 text-xs line-clamp-1">{title}</p>
            {desc && <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">{desc}</p>}
            <p className="text-xs text-slate-400 mt-1">{domain}</p>
          </div>
        </div>
        <p className="text-xs text-center text-slate-400 pb-2">{platform.name}</p>
      </div>
    )
  }

  if (platform.id === 'twitter') {
    const isLarge = data.twitter.card === 'summary_large_image'
    return (
      <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] overflow-hidden">
        <div className="rounded-xl border border-slate-200 dark:border-white/10 m-2 overflow-hidden">
          {isLarge && img ? (
            <div className="aspect-[1.91/1] relative bg-slate-200 dark:bg-slate-700">
              <Image src={img} alt="" fill className="object-cover" unoptimized />
            </div>
          ) : (
            <div className="flex gap-3 p-3">
              {img && (
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700 relative">
                  <Image src={img} alt="" fill className="object-cover" unoptimized />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-1">{title}</p>
                {desc && <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{desc}</p>}
              </div>
            </div>
          )}
          {isLarge && (
            <div className="p-3 border-t border-slate-100 dark:border-white/10">
              <p className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-1">{title}</p>
              {desc && <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{desc}</p>}
              <p className="text-xs text-slate-400 mt-1">{domain}</p>
            </div>
          )}
        </div>
        <p className="text-xs text-center text-slate-400 pb-2">{platform.name}</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] overflow-hidden">
      <div className="border border-slate-200 dark:border-white/10 rounded-xl m-2 overflow-hidden">
        {img ? (
          <div className="aspect-[1.91/1] relative bg-slate-200 dark:bg-slate-700">
            <Image src={img} alt="" fill className="object-cover" unoptimized />
          </div>
        ) : (
          <div className="aspect-[1.91/1] bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <span className="text-slate-400 text-sm">Sin imagen OG</span>
          </div>
        )}
        <div className="p-3 bg-slate-50 dark:bg-slate-900">
          <p className="text-xs text-slate-400 uppercase tracking-wide">{domain}</p>
          <p className="font-semibold text-sm text-slate-900 dark:text-white mt-0.5 line-clamp-1">{title}</p>
          {desc && <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{desc}</p>}
        </div>
      </div>
      <p className="text-xs text-center text-slate-400 pb-2">{platform.name}</p>
    </div>
  )
}

export default function OgPreviewPage() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<OgData | null>(null)

  async function analyze(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    setData(null)
    try {
      const url = input.trim().startsWith('http') ? input.trim() : `https://${input.trim()}`
      const res = await fetch(`/api/tools/og-preview?url=${encodeURIComponent(url)}`)
      setData(await res.json())
    } catch {
      setData({ error: 'Error al conectar' } as OgData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolLayout
      icon="🔗"
      title="Open Graph Preview"
      description="Visualiza cómo se ve tu enlace cuando lo compartes en Facebook, LinkedIn, Twitter/X y WhatsApp."
    >
      <form onSubmit={analyze} className="flex flex-col sm:flex-row gap-2 mb-8">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="saulgonzalez.pro o https://example.com"
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-gradient text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-60"
        >
          {loading ? 'Cargando…' : 'Preview →'}
        </button>
      </form>

      {loading && (
        <div className="text-center py-16 text-slate-400">
          <div className="text-4xl mb-3 animate-pulse">🔗</div>
          <p>Cargando previews…</p>
        </div>
      )}

      {data?.error && (
        <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-4 text-sm text-red-700 dark:text-red-400">
          ❌ {data.error}
        </div>
      )}

      {data && !data.error && (
        <div className="space-y-6">
          {/* Score */}
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03]">
            <div className="text-3xl font-extrabold text-violet-600 dark:text-violet-400">{data.score}</div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white text-sm">Score OG: {data.score}/100</p>
              {data.missing.length > 0 ? (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Falta: {data.missing.join(', ')}
                </p>
              ) : (
                <p className="text-xs text-emerald-600 dark:text-emerald-400">Todos los tags Open Graph presentes ✅</p>
              )}
            </div>
          </div>

          {/* Previews */}
          <div>
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Previews por plataforma
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {platforms.map(p => (
                <PreviewCard key={p.id} data={data} platform={p} />
              ))}
            </div>
          </div>

          {/* Tags summary */}
          <div>
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Tags detectados
            </h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { label: 'og:title', val: data.og.title },
                { label: 'og:description', val: data.og.description },
                { label: 'og:image', val: data.og.image },
                { label: 'og:type', val: data.og.type },
                { label: 'og:site_name', val: data.og.siteName },
                { label: 'twitter:card', val: data.twitter.card },
                { label: 'twitter:site', val: data.twitter.site },
                { label: 'twitter:image', val: data.twitter.image },
              ].map(row => (
                <div key={row.label} className="flex items-start gap-2 rounded-lg border border-slate-100 dark:border-white/5 p-2.5">
                  <span className="text-sm shrink-0">{row.val ? '✅' : '❌'}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-violet-600 dark:text-violet-400">{row.label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 break-all line-clamp-1">{row.val || 'No encontrado'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <LeadCapture
            tool="Open Graph Preview"
            url={data.url}
            score={data.score}
            summary={`OG score: ${data.score}/100. ${data.missing.length === 0 ? 'Todos los tags presentes.' : `Faltan: ${data.missing.join(', ')}.`}`}
            issues={data.missing.map(m => ({ text: `${m} faltante — tus links se ven mal al compartirlos`, type: 'critical' as const }))}
          />
        </div>
      )}
    </ToolLayout>
  )
}
