'use client'
import { useState } from 'react'

export type LeadIssue = { text: string; type: 'critical' | 'warning' }

type Props = {
  tool: string
  url: string
  score?: number
  summary?: string
  issues?: LeadIssue[]
}

function getUrgency(score?: number) {
  if (score === undefined) return {
    bg: 'from-violet-600 to-fuchsia-600',
    border: 'border-violet-300 dark:border-violet-700',
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    headline: '📋 Recibe tu análisis completo',
    subhead: 'Te enviamos el informe detallado + un plan de acción personalizado.',
    cta: 'Quiero mi análisis gratis →',
  }
  if (score < 50) return {
    bg: 'from-red-600 to-rose-600',
    border: 'border-red-300 dark:border-red-700',
    badge: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    headline: '🚨 Tu sitio tiene problemas críticos',
    subhead: 'Estos errores te están costando clientes ahora mismo. Sin corrección, seguirás invisible en Google.',
    cta: 'Quiero que me ayuden AHORA →',
  }
  if (score < 70) return {
    bg: 'from-amber-500 to-orange-500',
    border: 'border-amber-300 dark:border-amber-700',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    headline: '⚠️ Tu sitio está perdiendo visibilidad',
    subhead: 'Con los cambios correctos puedes duplicar tu visibilidad en 30 días. Aquí está tu plan.',
    cta: 'Quiero mi plan de mejora →',
  }
  if (score < 85) return {
    bg: 'from-violet-600 to-fuchsia-600',
    border: 'border-violet-300 dark:border-violet-700',
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    headline: '📈 Estás cerca — hay dinero sobre la mesa',
    subhead: 'Tu sitio está bien pero hay optimizaciones que pueden destacarte sobre tus competidores.',
    cta: 'Recibir mi análisis completo →',
  }
  return {
    bg: 'from-emerald-500 to-teal-500',
    border: 'border-emerald-300 dark:border-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    headline: '✅ Buen score — optimicemos el resto',
    subhead: 'Tu base es sólida. Un plan enfocado puede llevarte al top de Google en tu nicho.',
    cta: 'Ver cómo mejorarlo →',
  }
}

export default function LeadCapture({ tool, url, score, summary, issues = [] }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const urgency = getUrgency(score)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setStatus('loading')
    try {
      const res = await fetch('/api/tools/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tool, url, score, summary }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className={`rounded-2xl border ${urgency.border} bg-white dark:bg-white/[0.03] overflow-hidden`}>
        <div className={`bg-gradient-to-r ${urgency.bg} px-6 py-4`}>
          <p className="text-white font-bold text-lg">¡Listo! Revisa tu email 📬</p>
        </div>
        <div className="p-6 text-center">
          <p className="text-slate-600 dark:text-slate-300">
            Enviamos tu análisis completo a <strong className="text-slate-900 dark:text-white">{email}</strong>
          </p>
          <p className="text-sm text-slate-400 mt-2">
            ¿No lo ves? Revisa spam. Llega en menos de 5 minutos.
          </p>
          <a
            href="https://saulgonzalez.pro/#quiz"
            className={`inline-block mt-4 bg-gradient-to-r ${urgency.bg} text-white font-bold px-6 py-2.5 rounded-xl text-sm`}
          >
            Hablar con Saul directamente →
          </a>
        </div>
      </div>
    )
  }

  const criticalCount = issues.filter(i => i.type === 'critical').length
  const domain = (() => { try { return new URL(url.startsWith('http') ? url : `https://${url}`).hostname.replace('www.', '') } catch { return url } })()

  return (
    <div className={`rounded-2xl border-2 ${urgency.border} bg-white dark:bg-white/[0.03] overflow-hidden shadow-lg`}>

      {/* Dramatic header */}
      <div className={`bg-gradient-to-r ${urgency.bg} px-6 py-5`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-white font-extrabold text-xl leading-tight">{urgency.headline}</p>
            <p className="text-white/85 text-sm mt-1">{urgency.subhead}</p>
          </div>
          {score !== undefined && (
            <div className="shrink-0 text-center">
              <div className="text-4xl font-black text-white leading-none">{score}</div>
              <div className="text-white/70 text-xs font-semibold">/100</div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-5">

        {/* Issues found */}
        {issues.length > 0 && (
          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
              {criticalCount > 0 ? `${criticalCount} problema${criticalCount !== 1 ? 's' : ''} crítico${criticalCount !== 1 ? 's' : ''} encontrado${criticalCount !== 1 ? 's' : ''} en ${domain}` : 'Lo que encontramos'}
            </p>
            <div className="space-y-1.5">
              {issues.slice(0, 4).map((issue, i) => (
                <div key={i} className={`flex items-start gap-2 text-sm rounded-lg px-3 py-2 ${issue.type === 'critical' ? 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400' : 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400'}`}>
                  <span className="shrink-0 mt-0.5">{issue.type === 'critical' ? '❌' : '⚠️'}</span>
                  <span>{issue.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What you get */}
        <div className={`rounded-xl border ${urgency.border} bg-slate-50 dark:bg-white/[0.02] p-4`}>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Lo que recibirás — gratis</p>
          <div className="space-y-2">
            {[
              { icon: '📊', text: 'Informe completo con todos los problemas detectados' },
              { icon: '🎯', text: '3 acciones prioritarias que impactan más en 30 días' },
              { icon: '📞', text: 'Consulta gratuita de 30 min con Saul González' },
              { icon: '⚡', text: 'En tu inbox en menos de 1 hora' },
            ].map(item => (
              <div key={item.icon} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="text-base">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Email form */}
        <div>
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 dark:focus:border-violet-400"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`bg-gradient-to-r ${urgency.bg} text-white font-bold text-sm px-5 py-3 rounded-xl disabled:opacity-60 whitespace-nowrap shadow-lg`}
            >
              {status === 'loading' ? 'Enviando…' : urgency.cta}
            </button>
          </form>
          {status === 'error' && (
            <p className="text-xs text-red-500 mt-2">Error al enviar. Intenta de nuevo.</p>
          )}
          <p className="text-xs text-slate-400 mt-2 text-center">
            Sin spam. Un email, tu análisis y tu plan. Eso es todo.
          </p>
        </div>
      </div>
    </div>
  )
}
