'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import LeadCapture, { LeadIssue } from '@/components/LeadCapture'

type Check = { name: string; status: 'ok' | 'warn' | 'fail'; value: string | null; note: string }
type Result = {
  url: string; title: string | null; description: string | null
  viewport: string | null; charset: string | null; canonical: string | null
  robots: string | null; author: string | null; ogTitle: string | null
  ogDesc: string | null; ogImage: string | null; ogType: string | null
  twitterCard: string | null; twitterSite: string | null; jsonLd: string[]
  checks: Check[]; score: number; error?: string
}

const statusIcon = { ok: '✅', warn: '⚠️', fail: '❌' }
const statusColor = {
  ok: 'text-emerald-600 dark:text-emerald-400',
  warn: 'text-amber-600 dark:text-amber-400',
  fail: 'text-red-600 dark:text-red-400',
}
const statusBg = {
  ok: 'border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20',
  warn: 'border-amber-100 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20',
  fail: 'border-red-100 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20',
}

function ScoreCircle({ score }: { score: number }) {
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444'
  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F'
  const r = 40
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={100} height={100} viewBox="0 0 100 100">
        <circle cx={50} cy={50} r={r} fill="none" stroke="#e5e7eb" strokeWidth={8} className="dark:stroke-white/10" />
        <circle
          cx={50} cy={50} r={r} fill="none"
          stroke={color} strokeWidth={8}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        <text x={50} y={54} textAnchor="middle" fontSize={22} fontWeight={800} fill={color}>{score}</text>
      </svg>
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Grado {grade}</span>
    </div>
  )
}

export default function MetaTagsPage() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)

  async function analyze(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const url = input.trim().startsWith('http') ? input.trim() : `https://${input.trim()}`
      const res = await fetch(`/api/tools/meta-tags?url=${encodeURIComponent(url)}`)
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({ error: 'Error al conectar con el servidor' } as Result)
    } finally {
      setLoading(false)
    }
  }

  const summaryText = result && !result.error
    ? `Score: ${result.score}/100. ${result.checks.filter(c => c.status === 'ok').length} de ${result.checks.length} checks pasados. ${result.checks.filter(c => c.status === 'fail').map(c => c.name).join(', ')} necesitan atención.`
    : undefined

  const leadIssues: LeadIssue[] = result && !result.error ? [
    ...result.checks.filter(c => c.status === 'fail').map(c => ({ text: c.note, type: 'critical' as const })),
    ...result.checks.filter(c => c.status === 'warn').map(c => ({ text: `${c.name}: ${c.note}`, type: 'warning' as const })),
  ] : []

  return (
    <ToolLayout
      icon="🏷️"
      title="Meta Tags Checker"
      description="Verifica todos los meta tags de cualquier URL: título, descripción, viewport, Open Graph, Twitter Card y más."
    >
      {/* Input */}
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
          className="btn-gradient text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-60 whitespace-nowrap"
        >
          {loading ? 'Analizando…' : 'Analizar →'}
        </button>
      </form>

      {loading && (
        <div className="text-center py-16 text-slate-400">
          <div className="text-4xl mb-3 animate-pulse">🔍</div>
          <p>Analizando meta tags…</p>
        </div>
      )}

      {result?.error && (
        <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-4 text-sm text-red-700 dark:text-red-400">
          ❌ {result.error}
        </div>
      )}

      {result && !result.error && (
        <div className="space-y-6">
          {/* Score + URL */}
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 flex flex-col sm:flex-row items-center gap-6">
            <ScoreCircle score={result.score} />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">URL analizada</p>
              <p className="font-semibold text-slate-900 dark:text-white break-all text-sm">{result.url}</p>
              {result.title && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{result.title}</p>
              )}
              <div className="flex flex-wrap gap-1 mt-2">
                {result.jsonLd.length > 0 ? (
                  result.jsonLd.map(t => (
                    <span key={t} className="text-xs bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 px-2 py-0.5 rounded-full">
                      JSON-LD: {t}
                    </span>
                  ))
                ) : (
                  <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-full font-semibold">
                    ❌ Sin datos estructurados (JSON-LD)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Checks */}
          <div>
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Checks de Meta Tags</h2>
            <div className="space-y-2">
              {result.checks.map(check => (
                <div key={check.name} className={`rounded-lg border p-3 ${statusBg[check.status]}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-base mt-0.5 shrink-0">{statusIcon[check.status]}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white">{check.name}</span>
                        <span className={`text-xs font-medium ${statusColor[check.status]}`}>{check.note}</span>
                      </div>
                      {check.value && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 break-all line-clamp-2">{check.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Raw values */}
          {(result.author || result.twitterSite || result.ogType) && (
            <div>
              <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Otros valores</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { label: 'Author', val: result.author },
                  { label: 'OG Type', val: result.ogType },
                  { label: 'Twitter Site', val: result.twitterSite },
                ].filter(r => r.val).map(row => (
                  <div key={row.label} className="rounded-lg border border-slate-100 dark:border-white/5 bg-white dark:bg-white/[0.02] p-3">
                    <p className="text-xs text-slate-400 mb-0.5">{row.label}</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{row.val}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <LeadCapture
            tool="Meta Tags Checker"
            url={result.url}
            score={result.score}
            summary={summaryText}
            issues={leadIssues}
          />
        </div>
      )}
    </ToolLayout>
  )
}
