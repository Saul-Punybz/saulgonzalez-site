'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import LeadCapture, { LeadIssue } from '@/components/LeadCapture'

type MetaTag = Record<string, string>
type Result = {
  url: string; title: string | null; allMeta: MetaTag[]; ogTags: MetaTag[]; twTags: MetaTag[]
  seoTags: MetaTag[]; links: MetaTag[]; jsonLd: string[]; scripts: number; inlineStyles: number
  performance: { preconnect: number; preload: number; dnsPrefetch: number }
  issues: string[]; score: number
  counts: { total: number; og: number; twitter: number; seo: number; links: number; jsonLd: number }
  error?: string
}

export default function MetadataScanPage() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [activeTab, setActiveTab] = useState<'seo' | 'og' | 'twitter' | 'links' | 'all'>('seo')

  async function analyze(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const url = input.trim().startsWith('http') ? input.trim() : `https://${input.trim()}`
      const res = await fetch(`/api/tools/metadata-scan?url=${encodeURIComponent(url)}`)
      setResult(await res.json())
    } catch {
      setResult({ error: 'Error al conectar' } as Result)
    } finally {
      setLoading(false)
    }
  }

  const tabMeta: Record<string, MetaTag[]> = result ? {
    seo: result.seoTags,
    og: result.ogTags,
    twitter: result.twTags,
    links: result.links,
    all: result.allMeta,
  } : {}

  const tabs = [
    { id: 'seo', label: 'SEO', count: result?.counts.seo ?? 0 },
    { id: 'og', label: 'Open Graph', count: result?.counts.og ?? 0 },
    { id: 'twitter', label: 'Twitter', count: result?.counts.twitter ?? 0 },
    { id: 'links', label: 'Link Tags', count: result?.counts.links ?? 0 },
    { id: 'all', label: 'Todos', count: result?.counts.total ?? 0 },
  ] as const

  return (
    <ToolLayout
      icon="🔍"
      title="Metadata Deep Scan"
      description="Escaneo completo del &lt;head&gt;: todos los meta tags, link tags, JSON-LD, datos estructurados y rendimiento."
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
          {loading ? 'Escaneando…' : 'Escanear →'}
        </button>
      </form>

      {loading && (
        <div className="text-center py-16 text-slate-400">
          <div className="text-4xl mb-3 animate-pulse">🔍</div>
          <p>Escaneando metadatos…</p>
        </div>
      )}

      {result?.error && (
        <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-4 text-sm text-red-700 dark:text-red-400">
          ❌ {result.error}
        </div>
      )}

      {result && !result.error && (
        <div className="space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[
              { label: 'Score', val: `${result.score}`, sub: '/100', accent: true },
              { label: 'Meta tags', val: String(result.counts.total), sub: 'total' },
              { label: 'Open Graph', val: String(result.counts.og), sub: 'tags' },
              { label: 'Twitter', val: String(result.counts.twitter), sub: 'tags' },
              { label: 'JSON-LD', val: String(result.counts.jsonLd), sub: 'schemas' },
              { label: 'Scripts', val: String(result.scripts), sub: 'en página' },
            ].map(card => (
              <div key={card.label} className={`rounded-xl border p-3 text-center ${card.accent ? 'border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/30' : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03]'}`}>
                <p className={`text-xl font-extrabold ${card.accent ? 'text-violet-600 dark:text-violet-400' : 'text-slate-900 dark:text-white'}`}>
                  {card.val}<span className="text-sm font-normal text-slate-400">{card.sub}</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Issues */}
          {result.issues.length > 0 && (
            <div className="rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 p-4">
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-2">⚠️ {result.issues.length} problema{result.issues.length !== 1 ? 's' : ''} encontrado{result.issues.length !== 1 ? 's' : ''}</p>
              <ul className="space-y-1">
                {result.issues.map(issue => (
                  <li key={issue} className="text-sm text-amber-700 dark:text-amber-400 flex items-start gap-2">
                    <span className="shrink-0 mt-0.5">•</span>{issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Title */}
          {result.title && (
            <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Title Tag</p>
              <p className="font-semibold text-slate-900 dark:text-white">{result.title}</p>
              <p className="text-xs text-slate-400 mt-1">{result.title.length} caracteres</p>
            </div>
          )}

          {/* JSON-LD */}
          {result.jsonLd.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Datos Estructurados (JSON-LD)
              </h2>
              <div className="flex flex-wrap gap-2">
                {result.jsonLd.map(type => (
                  <span key={type} className="text-sm bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 px-3 py-1 rounded-full font-medium">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Performance */}
          <div>
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Hints de Rendimiento
            </h2>
            <div className="grid sm:grid-cols-3 gap-2">
              {[
                { label: 'preconnect', val: result.performance.preconnect, icon: '⚡' },
                { label: 'preload', val: result.performance.preload, icon: '📦' },
                { label: 'dns-prefetch', val: result.performance.dnsPrefetch, icon: '🌐' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 rounded-lg border border-slate-100 dark:border-white/5 p-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{item.val}</p>
                    <p className="text-xs text-slate-400 font-mono">&lt;link rel=&quot;{item.label}&quot;&gt;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs: meta tags explorer */}
          <div>
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Explorador de Meta Tags
            </h2>
            <div className="flex flex-wrap gap-1 mb-3">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${activeTab === tab.id ? 'bg-violet-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-violet-50 dark:hover:bg-violet-900/20'}`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden">
              {(tabMeta[activeTab] ?? []).length === 0 ? (
                <p className="p-4 text-sm text-slate-400 text-center">No hay tags en esta categoría</p>
              ) : (
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-white/5">
                      <th className="text-left p-2.5 font-semibold text-slate-500 dark:text-slate-400 w-1/3">Atributo</th>
                      <th className="text-left p-2.5 font-semibold text-slate-500 dark:text-slate-400">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(tabMeta[activeTab] ?? []).map((tag, i) => {
                      const key = tag.name || tag.property || tag.rel || tag.equiv || Object.keys(tag)[0] || `tag-${i}`
                      const val = tag.content || tag.href || tag.src || Object.values(tag).filter(v => v !== key)[0] || ''
                      return (
                        <tr key={`${key}-${i}`} className="border-t border-slate-100 dark:border-white/5">
                          <td className="p-2.5 font-mono text-violet-600 dark:text-violet-400 align-top">{key}</td>
                          <td className="p-2.5 text-slate-600 dark:text-slate-400 break-all max-w-0 truncate" title={val}>{val}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <LeadCapture
            tool="Metadata Deep Scan"
            url={result.url}
            score={result.score}
            summary={`Score: ${result.score}/100. ${result.counts.total} meta tags, ${result.counts.jsonLd} JSON-LD schemas. ${result.issues.length} problemas detectados.`}
            issues={result.issues.map(i => ({ text: i, type: 'critical' as const }))}
          />
        </div>
      )}
    </ToolLayout>
  )
}
