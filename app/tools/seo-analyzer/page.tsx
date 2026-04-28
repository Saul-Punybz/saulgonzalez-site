'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import LeadCapture, { LeadIssue } from '@/components/LeadCapture'

type Check = { id: string; title: string; status: 'ok' | 'warn' | 'fail'; detail: string }
type Result = {
  url: string; checks: Check[]; score: number
  headings: { h1: string[]; h2: string[]; h3: string[] }
  images: { total: number; withAlt: number; missingAlt: Array<{ src: string; alt: string | null; missing: boolean }> }
  links: { total: number; internal: number; external: number }
  words: number
  error?: string
}

const statusIcon = { ok: '✅', warn: '⚠️', fail: '❌' }
const statusBg = {
  ok: 'border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20',
  warn: 'border-amber-100 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20',
  fail: 'border-red-100 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20',
}
const statusText = {
  ok: 'text-emerald-700 dark:text-emerald-400',
  warn: 'text-amber-700 dark:text-amber-400',
  fail: 'text-red-700 dark:text-red-400',
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500'
  return (
    <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2">
      <div className={`h-2 rounded-full transition-all duration-700 ${color}`} style={{ width: `${score}%` }} />
    </div>
  )
}

export default function SeoAnalyzerPage() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [showAll, setShowAll] = useState(false)

  async function analyze(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    setResult(null)
    setShowAll(false)
    try {
      const url = input.trim().startsWith('http') ? input.trim() : `https://${input.trim()}`
      const res = await fetch(`/api/tools/seo-analyzer?url=${encodeURIComponent(url)}`)
      setResult(await res.json())
    } catch {
      setResult({ error: 'Error al conectar' } as Result)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolLayout
      icon="📐"
      title="SEO Analyzer"
      description="Análisis SEO on-page completo: headings, imágenes, links, contenido, meta tags y datos estructurados."
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
          {loading ? 'Analizando…' : 'Analizar →'}
        </button>
      </form>

      {loading && (
        <div className="text-center py-16 text-slate-400">
          <div className="text-4xl mb-3 animate-pulse">📐</div>
          <p>Analizando SEO on-page…</p>
        </div>
      )}

      {result?.error && (
        <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-4 text-sm text-red-700 dark:text-red-400">
          ❌ {result.error}
        </div>
      )}

      {result && !result.error && (
        <div className="space-y-6">
          {/* Score */}
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Score SEO On-Page</p>
                <p className="text-xs text-slate-400 break-all">{result.url}</p>
              </div>
              <span className={`text-3xl font-extrabold ${result.score >= 80 ? 'text-emerald-600 dark:text-emerald-400' : result.score >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
                {result.score}
              </span>
            </div>
            <ScoreBar score={result.score} />
            <div className="flex gap-4 mt-3 text-xs text-slate-400">
              <span>✅ {result.checks.filter(c => c.status === 'ok').length} ok</span>
              <span>⚠️ {result.checks.filter(c => c.status === 'warn').length} warnings</span>
              <span>❌ {result.checks.filter(c => c.status === 'fail').length} errores</span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { icon: '📝', label: 'Palabras', val: result.words.toLocaleString() },
              { icon: '🖼️', label: 'Imágenes', val: `${result.images.withAlt}/${result.images.total} con alt` },
              { icon: '🔗', label: 'Links internos', val: String(result.links.internal) },
              { icon: '🌐', label: 'Links externos', val: String(result.links.external) },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3 text-center">
                <div className="text-xl mb-1">{s.icon}</div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">{s.val}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Checks */}
          <div>
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Checks SEO
            </h2>
            <div className="space-y-2">
              {result.checks.map(check => (
                <div key={check.id} className={`rounded-lg border p-3 ${statusBg[check.status]}`}>
                  <div className="flex items-center gap-2">
                    <span className="shrink-0">{statusIcon[check.status]}</span>
                    <span className="font-semibold text-sm text-slate-900 dark:text-white">{check.title}</span>
                    <span className={`text-xs ml-auto ${statusText[check.status]}`}>{check.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Headings */}
          {result.headings.h1.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Estructura de Headings
              </h2>
              <div className="space-y-1.5">
                {result.headings.h1.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-xs bg-violet-600 text-white px-1.5 py-0.5 rounded shrink-0 mt-0.5">H1</span>
                    <span className="text-slate-700 dark:text-slate-300">{h}</span>
                  </div>
                ))}
                {(showAll ? result.headings.h2 : result.headings.h2.slice(0, 4)).map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm ml-4">
                    <span className="font-bold text-xs bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded shrink-0 mt-0.5">H2</span>
                    <span className="text-slate-600 dark:text-slate-400">{h}</span>
                  </div>
                ))}
                {result.headings.h2.length > 4 && !showAll && (
                  <button onClick={() => setShowAll(true)} className="text-xs text-violet-600 dark:text-violet-400 ml-4 hover:underline">
                    + {result.headings.h2.length - 4} H2 más
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Images missing alt */}
          {result.images.missingAlt.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Imágenes sin alt text
              </h2>
              <div className="space-y-1.5">
                {result.images.missingAlt.map((img, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg border border-red-100 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 p-2.5 text-xs">
                    <span>❌</span>
                    <span className="text-slate-500 dark:text-slate-400 break-all line-clamp-1">{img.src}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <LeadCapture
            tool="SEO Analyzer"
            url={result.url}
            score={result.score}
            summary={`SEO score: ${result.score}/100. ${result.checks.filter(c => c.status === 'fail').length} errores críticos. ${result.words} palabras de contenido.`}
            issues={[
              ...result.checks.filter(c => c.status === 'fail').map(c => ({ text: c.detail, type: 'critical' as const })),
              ...result.checks.filter(c => c.status === 'warn').map(c => ({ text: c.detail, type: 'warning' as const })),
            ]}
          />
        </div>
      )}
    </ToolLayout>
  )
}
