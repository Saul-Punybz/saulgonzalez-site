'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import LeadCapture, { LeadIssue } from '@/components/LeadCapture'

type HealthCheck = { label: string; ok: boolean; detail: string }
type Result = {
  url: string; hostname: string; status: number; responseTime: number; redirects: string[]
  security: { https: boolean; hsts: boolean; hstsValue: string | null; xFrameOptions: string | null; csp: boolean; xContentType: string | null; referrerPolicy: string | null; server: string | null; poweredBy: string | null }
  securityScore: number
  dns: { a: string[]; mx: string[]; ns: string[]; txt: string[] }
  healthChecks: HealthCheck[]
  score: number
  error?: string
}

function StatusBadge({ status }: { status: number }) {
  const color = status >= 200 && status < 300 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
    : status >= 300 && status < 400 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
    : 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400'
  return (
    <span className={`text-sm font-bold px-3 py-1 rounded-full ${color}`}>
      HTTP {status || '—'}
    </span>
  )
}

export default function DomainCheckPage() {
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
      const res = await fetch(`/api/tools/domain-check?url=${encodeURIComponent(url)}`)
      setResult(await res.json())
    } catch {
      setResult({ error: 'Error al conectar' } as Result)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolLayout
      icon="🌐"
      title="Domain & Health Check"
      description="Verifica la salud de cualquier dominio: HTTPS, DNS, headers de seguridad, tiempo de respuesta y más."
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
          {loading ? 'Verificando…' : 'Verificar →'}
        </button>
      </form>

      {loading && (
        <div className="text-center py-16 text-slate-400">
          <div className="text-4xl mb-3 animate-pulse">🌐</div>
          <p>Verificando dominio y DNS…</p>
        </div>
      )}

      {result?.error && (
        <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-4 text-sm text-red-700 dark:text-red-400">
          ❌ {result.error}
        </div>
      )}

      {result && !result.error && (
        <div className="space-y-6">
          {/* Summary header */}
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h2 className="font-bold text-slate-900 dark:text-white">{result.hostname}</h2>
              <StatusBadge status={result.status} />
              {result.responseTime > 0 && (
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${result.responseTime < 500 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' : result.responseTime < 1500 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400' : 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400'}`}>
                  ⚡ {result.responseTime}ms
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Score de salud</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{result.score}/100</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${result.score >= 80 ? 'bg-emerald-500' : result.score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Health checks */}
          <div>
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Health Checks
            </h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {result.healthChecks.map(check => (
                <div key={check.label} className={`flex items-start gap-3 rounded-lg border p-3 ${check.ok ? 'border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-red-100 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20'}`}>
                  <span className="text-base shrink-0 mt-0.5">{check.ok ? '✅' : '❌'}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">{check.label}</p>
                    <p className={`text-xs break-all ${check.ok ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>{check.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DNS Records */}
          <div>
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              DNS Records
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { type: 'A', records: result.dns.a, icon: '🔴' },
                { type: 'MX', records: result.dns.mx, icon: '📧' },
                { type: 'NS', records: result.dns.ns, icon: '🌐' },
                { type: 'TXT', records: result.dns.txt, icon: '📄' },
              ].map(rec => (
                <div key={rec.type} className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    {rec.icon} {rec.type} Records
                  </p>
                  {rec.records.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No encontrado</p>
                  ) : (
                    <div className="space-y-1">
                      {rec.records.slice(0, 3).map((r, i) => (
                        <p key={i} className="text-xs font-mono text-slate-600 dark:text-slate-400 break-all">{r}</p>
                      ))}
                      {rec.records.length > 3 && (
                        <p className="text-xs text-slate-400">+{rec.records.length - 3} más</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Server info */}
          {(result.security.server || result.security.poweredBy || result.security.referrerPolicy) && (
            <div>
              <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Servidor
              </h2>
              <div className="grid sm:grid-cols-3 gap-2">
                {[
                  { label: 'Server', val: result.security.server },
                  { label: 'X-Powered-By', val: result.security.poweredBy },
                  { label: 'Referrer-Policy', val: result.security.referrerPolicy },
                ].filter(r => r.val).map(row => (
                  <div key={row.label} className="rounded-lg border border-slate-100 dark:border-white/5 bg-white dark:bg-white/[0.02] p-3">
                    <p className="text-xs text-slate-400 mb-0.5">{row.label}</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{row.val}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Redirects */}
          {result.redirects.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Redirects
              </h2>
              <div className="space-y-1.5">
                {result.redirects.map((r, i) => (
                  <div key={i} className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-white/5 rounded-lg p-2.5">
                    {r}
                  </div>
                ))}
              </div>
            </div>
          )}

          <LeadCapture
            tool="Domain & Health Check"
            url={result.url}
            score={result.score}
            summary={`Score: ${result.score}/100. HTTP ${result.status}, ${result.responseTime}ms. ${result.security.https ? 'HTTPS' : 'Sin HTTPS'}. ${result.healthChecks.filter(c => !c.ok).length} problemas encontrados.`}
            issues={result.healthChecks.filter(c => !c.ok).map(c => ({
              text: `${c.label}: ${c.detail}`,
              type: (c.label === 'HTTPS' || c.label === 'Disponible') ? 'critical' as const : 'warning' as const,
            }))}
          />
        </div>
      )}
    </ToolLayout>
  )
}
