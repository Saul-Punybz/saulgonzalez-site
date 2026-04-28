'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import LeadCapture, { LeadIssue } from '@/components/LeadCapture'

type Tech = { name: string; category: string; confidence: 'high' | 'medium' | 'low'; icon: string }
type Security = { https: boolean; hsts: boolean; xframe: string | null; csp: boolean; xcontenttype: string | null }
type Result = {
  url: string; technologies: Tech[]; generator: string | null; poweredBy: string | null
  server: string | null; security: Security; score: number; error?: string
}

const confidenceLabel = { high: 'Confirmado', medium: 'Probable', low: 'Posible' }
const confidenceColor = {
  high: 'text-emerald-600 dark:text-emerald-400',
  medium: 'text-amber-600 dark:text-amber-400',
  low: 'text-slate-500 dark:text-slate-400',
}

const categoryColors: Record<string, string> = {
  Framework: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  'Librería UI': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  CMS: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  eCommerce: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'No-Code': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  Analytics: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  Marketing: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Hosting: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
  'CDN/Proxy': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
  Chat: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  'CSS Framework': 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-400',
  'Website Builder': 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
}

export default function TechDetectorPage() {
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
      const res = await fetch(`/api/tools/tech-detector?url=${encodeURIComponent(url)}`)
      setResult(await res.json())
    } catch {
      setResult({ error: 'Error al conectar' } as Result)
    } finally {
      setLoading(false)
    }
  }

  const categories = result?.technologies
    ? Array.from(new Set(result.technologies.map(t => t.category)))
    : []

  return (
    <ToolLayout
      icon="🔬"
      title="Technology Detector"
      description="Descubre el stack tecnológico de cualquier sitio web: frameworks, CMS, analytics, hosting y seguridad."
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
          {loading ? 'Detectando…' : 'Detectar →'}
        </button>
      </form>

      {loading && (
        <div className="text-center py-16 text-slate-400">
          <div className="text-4xl mb-3 animate-pulse">🔬</div>
          <p>Analizando tecnologías…</p>
        </div>
      )}

      {result?.error && (
        <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-4 text-sm text-red-700 dark:text-red-400">
          ❌ {result.error}
        </div>
      )}

      {result && !result.error && (
        <div className="space-y-6">
          {/* URL + count */}
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">URL analizada</p>
            <p className="font-semibold text-slate-900 dark:text-white text-sm break-all">{result.url}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {result.technologies.length === 0
                ? 'No se detectaron tecnologías conocidas'
                : `${result.technologies.length} tecnología${result.technologies.length !== 1 ? 's' : ''} detectada${result.technologies.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          {/* Technologies by category */}
          {categories.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Tecnologías detectadas
              </h2>
              <div className="space-y-4">
                {categories.map(cat => (
                  <div key={cat}>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{cat}</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {result.technologies.filter(t => t.category === cat).map(tech => (
                        <div key={tech.name} className="flex items-center gap-3 rounded-lg border border-slate-100 dark:border-white/5 bg-white dark:bg-white/[0.02] p-3">
                          <span className="text-xl shrink-0">{tech.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-slate-900 dark:text-white">{tech.name}</p>
                            <p className={`text-xs ${confidenceColor[tech.confidence]}`}>
                              {confidenceLabel[tech.confidence]}
                            </p>
                          </div>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${categoryColors[cat] ?? 'bg-slate-100 text-slate-700'}`}>
                            {cat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Server info */}
          {(result.server || result.poweredBy || result.generator) && (
            <div>
              <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Servidor
              </h2>
              <div className="grid sm:grid-cols-3 gap-2">
                {[
                  { label: 'Server', val: result.server },
                  { label: 'X-Powered-By', val: result.poweredBy },
                  { label: 'Generator', val: result.generator },
                ].filter(r => r.val).map(row => (
                  <div key={row.label} className="rounded-lg border border-slate-100 dark:border-white/5 bg-white dark:bg-white/[0.02] p-3">
                    <p className="text-xs text-slate-400 mb-0.5">{row.label}</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{row.val}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security */}
          <div>
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Seguridad
            </h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { label: 'HTTPS', val: result.security.https, ok: result.security.https },
                { label: 'HSTS (HTTP Strict Transport)', val: result.security.hsts, ok: result.security.hsts },
                { label: 'X-Frame-Options', val: result.security.xframe, ok: !!result.security.xframe },
                { label: 'Content Security Policy', val: result.security.csp, ok: result.security.csp },
                { label: 'X-Content-Type-Options', val: result.security.xcontenttype, ok: !!result.security.xcontenttype },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 rounded-lg border border-slate-100 dark:border-white/5 p-3">
                  <span className="text-base shrink-0">{item.ok ? '✅' : '❌'}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{item.label}</p>
                    {typeof item.val === 'string' && item.val && (
                      <p className="text-xs text-slate-400">{item.val}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <LeadCapture
            tool="Technology Detector"
            url={result.url}
            score={result.score}
            summary={`Detectadas: ${result.technologies.map(t => t.name).join(', ')}.`}
            issues={[
              !result.security.https ? { text: 'Sin HTTPS — tu sitio no es seguro para los usuarios', type: 'critical' as const } : null,
              !result.security.hsts ? { text: 'Sin HSTS — vulnerabilidad de seguridad activa', type: 'warning' as const } : null,
              !result.security.csp ? { text: 'Sin Content Security Policy — riesgo de ataques XSS', type: 'warning' as const } : null,
              !result.security.xframe ? { text: 'Sin X-Frame-Options — tu sitio puede ser embebido en iframes maliciosos', type: 'warning' as const } : null,
            ].filter(Boolean) as LeadIssue[]}
          />
        </div>
      )}
    </ToolLayout>
  )
}
