'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import LeadCapture, { LeadIssue } from '@/components/LeadCapture'

type Audit = { displayValue: string; score: number | null; numericValue?: number }
type PSResult = {
  score: number
  lcp: Audit | null
  tbt: Audit | null
  cls: Audit | null
  fcp: Audit | null
  si:  Audit | null
  tti: Audit | null
  ttfb: Audit | null
}
type Results = { mobile: PSResult; desktop: PSResult; url: string; error?: string }

const METRICS = [
  { key: 'lcp',  label: 'LCP',  full: 'Largest Contentful Paint',   unit: 's',  good: 2.5,  med: 4,    help: 'Tiempo en renderizar el elemento más grande visible.' },
  { key: 'fcp',  label: 'FCP',  full: 'First Contentful Paint',      unit: 's',  good: 1.8,  med: 3,    help: 'Primer contenido visible en pantalla.' },
  { key: 'tbt',  label: 'TBT',  full: 'Total Blocking Time',         unit: 'ms', good: 200,  med: 600,  help: 'Tiempo total que el hilo principal estuvo bloqueado (proxy de FID/INP).' },
  { key: 'cls',  label: 'CLS',  full: 'Cumulative Layout Shift',     unit: '',   good: 0.1,  med: 0.25, help: 'Estabilidad visual: cuánto se mueven los elementos al cargar.' },
  { key: 'si',   label: 'SI',   full: 'Speed Index',                 unit: 's',  good: 3.4,  med: 5.8,  help: 'Qué tan rápido se llena visualmente la página.' },
  { key: 'tti',  label: 'TTI',  full: 'Time to Interactive',        unit: 's',  good: 3.8,  med: 7.3,  help: 'Tiempo hasta que la página es completamente interactiva.' },
  { key: 'ttfb', label: 'TTFB', full: 'Time to First Byte',         unit: 's',  good: 0.8,  med: 1.8,  help: 'Tiempo de respuesta del servidor.' },
]

function getColor(score: number | null) {
  if (score === null) return { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-400', label: '—' }
  if (score >= 0.9) return { bg: 'bg-emerald-100 dark:bg-emerald-950/40', text: 'text-emerald-600 dark:text-emerald-400', label: 'Bueno' }
  if (score >= 0.5) return { bg: 'bg-amber-100 dark:bg-amber-950/40', text: 'text-amber-600 dark:text-amber-400', label: 'Mejorar' }
  return { bg: 'bg-red-100 dark:bg-red-950/40', text: 'text-red-600 dark:text-red-400', label: 'Pobre' }
}

async function fetchPS(url: string, strategy: 'mobile' | 'desktop'): Promise<PSResult> {
  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}`
  const res = await fetch(endpoint)
  if (!res.ok) throw new Error(`PageSpeed API error: ${res.status}`)
  const data = await res.json()
  const audits = data.lighthouseResult?.audits ?? {}
  const score = Math.round((data.lighthouseResult?.categories?.performance?.score ?? 0) * 100)

  const a = (key: string): Audit | null => {
    const audit = audits[key]
    if (!audit) return null
    return { displayValue: audit.displayValue ?? '', score: audit.score ?? null, numericValue: audit.numericValue }
  }

  return {
    score,
    lcp:  a('largest-contentful-paint'),
    tbt:  a('total-blocking-time'),
    cls:  a('cumulative-layout-shift'),
    fcp:  a('first-contentful-paint'),
    si:   a('speed-index'),
    tti:  a('interactive'),
    ttfb: a('server-response-time'),
  }
}

function MetricCard({ metric, mobile, desktop }: { metric: typeof METRICS[0]; mobile: PSResult; desktop: PSResult }) {
  const mVal = mobile[metric.key as keyof PSResult] as Audit | null
  const dVal = desktop[metric.key as keyof PSResult] as Audit | null
  const mColor = getColor(mVal?.score ?? null)
  const dColor = getColor(dVal?.score ?? null)

  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className="font-bold text-slate-900 dark:text-white text-sm">{metric.label}</span>
          <p className="text-xs text-slate-400">{metric.full}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className={`rounded-lg p-2 text-center ${mColor.bg}`}>
          <p className={`text-xs font-semibold ${mColor.text}`}>📱 Móvil</p>
          <p className={`text-sm font-bold ${mColor.text} mt-0.5`}>{mVal?.displayValue || '—'}</p>
          <p className={`text-xs ${mColor.text}`}>{mColor.label}</p>
        </div>
        <div className={`rounded-lg p-2 text-center ${dColor.bg}`}>
          <p className={`text-xs font-semibold ${dColor.text}`}>🖥️ Desktop</p>
          <p className={`text-sm font-bold ${dColor.text} mt-0.5`}>{dVal?.displayValue || '—'}</p>
          <p className={`text-xs ${dColor.text}`}>{dColor.label}</p>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-2">{metric.help}</p>
    </div>
  )
}

function ScoreBadge({ score, label }: { score: number; label: string }) {
  const color = score >= 90 ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
    : score >= 50 ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
    : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
  return (
    <div className={`rounded-xl border p-4 text-center ${color}`}>
      <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-1">{label}</p>
      <p className="text-4xl font-extrabold">{score}</p>
      <p className="text-xs font-semibold mt-0.5">
        {score >= 90 ? 'Bueno' : score >= 50 ? 'Necesita mejoras' : 'Pobre'}
      </p>
    </div>
  )
}

export default function CoreWebVitalsPage() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [results, setResults] = useState<Results | null>(null)

  async function analyze(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    setResults(null)

    const url = input.trim().startsWith('http') ? input.trim() : `https://${input.trim()}`

    try {
      setLoadingMsg('Analizando versión móvil… (~30 seg)')
      const mobile = await fetchPS(url, 'mobile')
      setLoadingMsg('Analizando versión desktop…')
      const desktop = await fetchPS(url, 'desktop')
      setResults({ mobile, desktop, url })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error'
      setResults({ error: msg } as Results)
    } finally {
      setLoading(false)
      setLoadingMsg('')
    }
  }

  const summary = results && !results.error
    ? `Móvil: ${results.mobile.score}/100. Desktop: ${results.desktop.score}/100.`
    : undefined

  return (
    <ToolLayout
      icon="📊"
      title="Core Web Vitals"
      description="Analiza velocidad y experiencia de usuario con Google PageSpeed: LCP, CLS, TBT, FCP y más."
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
          className="btn-gradient text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-60 whitespace-nowrap"
        >
          {loading ? 'Analizando…' : 'Analizar →'}
        </button>
      </form>

      {loading && (
        <div className="text-center py-16">
          <div className="text-4xl mb-3 animate-pulse">📊</div>
          <p className="text-slate-600 dark:text-slate-300 font-semibold">{loadingMsg}</p>
          <p className="text-sm text-slate-400 mt-2">Google PageSpeed tarda ~60 segundos. Espera un momento.</p>
          <div className="mt-4 flex justify-center gap-1">
            {[0,1,2].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      )}

      {results?.error && (
        <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-4 text-sm text-red-700 dark:text-red-400">
          ❌ {results.error}
        </div>
      )}

      {results && !results.error && (
        <div className="space-y-6">
          {/* Score overview */}
          <div className="grid grid-cols-2 gap-3">
            <ScoreBadge score={results.mobile.score} label="📱 Móvil" />
            <ScoreBadge score={results.desktop.score} label="🖥️ Desktop" />
          </div>

          <p className="text-xs text-slate-400">
            Datos de <a href={`https://pagespeed.web.dev/report?url=${encodeURIComponent(results.url)}`} target="_blank" rel="noopener noreferrer" className="text-violet-500 hover:underline">Google PageSpeed Insights</a> · Actualizado en tiempo real
          </p>

          {/* Metrics grid */}
          <div>
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Métricas
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {METRICS.map(m => (
                <MetricCard key={m.key} metric={m} mobile={results.mobile} desktop={results.desktop} />
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />Bueno</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />Necesita mejoras</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" />Pobre</div>
          </div>

          <LeadCapture
            tool="Core Web Vitals"
            url={results.url}
            score={Math.round((results.mobile.score + results.desktop.score) / 2)}
            summary={summary}
            issues={[
              results.mobile.score < 50 ? { text: `Score móvil ${results.mobile.score}/100 — la mayoría de tus visitas llegan del celular`, type: 'critical' as const } : null,
              results.mobile.score >= 50 && results.mobile.score < 75 ? { text: `Score móvil ${results.mobile.score}/100 — por debajo del estándar de Google`, type: 'warning' as const } : null,
              results.desktop.score < 50 ? { text: `Score desktop ${results.desktop.score}/100 — velocidad crítica afecta tu ranking`, type: 'critical' as const } : null,
              results.mobile.lcp && (results.mobile.lcp.score ?? 1) < 0.5 ? { text: `LCP lento en móvil (${results.mobile.lcp.displayValue}) — Google penaliza páginas lentas`, type: 'critical' as const } : null,
              results.mobile.cls && (results.mobile.cls.score ?? 1) < 0.5 ? { text: `CLS alto (${results.mobile.cls.displayValue}) — tu página "brinca" al cargar, frustrando usuarios`, type: 'warning' as const } : null,
            ].filter(Boolean) as LeadIssue[]}
          />
        </div>
      )}
    </ToolLayout>
  )
}
