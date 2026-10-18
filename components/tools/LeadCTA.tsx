'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import Mascot, { MascotName } from './Mascot'

const BRAND = ['#7030EF', '#12A386', '#FF6F61', '#fab800', '#55a6e6']

export function burstConfetti() {
  ;[{ x: 0.15, a: 60 }, { x: 0.85, a: 120 }].forEach(s =>
    confetti({ particleCount: 90, spread: 72, angle: s.a, origin: { x: s.x, y: 0.7 }, colors: BRAND }),
  )
}

/**
 * Bloque reutilizable para el panel de resultados de cada herramienta:
 * mascota animada + (confetti opcional) + captura de email → /api/contact
 * (Google Sheets + Google Chat de Puny.bz) + CTA "Agenda consulta gratis" → /#contacto.
 */
export default function LeadCTA({
  service,
  mascot = 'party',
  headline,
  sub,
  emailPitch = 'Déjame tu correo y te mando el análisis completo + próximos pasos.',
  context,
  celebrate = true,
  compact = false,
  hideMascot = false,
}: {
  service: string
  mascot?: MascotName
  headline: string
  sub?: string
  emailPitch?: string
  context?: () => string
  celebrate?: boolean
  compact?: boolean
  hideMascot?: boolean
}) {
  const tsRef = useRef<number>(0)
  useEffect(() => { tsRef.current = Date.now() }, [])
  useEffect(() => { if (celebrate) burstConfetti() }, [celebrate])

  const [form, setForm] = useState({ name: '', email: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [err, setErr] = useState('')
  const [hp, setHp] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    if (!form.name.trim() || !form.email.includes('@')) {
      setErr('Escribe tu nombre y un email válido.')
      return
    }
    setSending(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, email: form.email, service, stage: 'lead-magnet',
          message: context ? context() : `Usó la herramienta: ${service}`,
          _hp: hp, _ts: tsRef.current,
        }),
      })
      setSent(true)
      burstConfetti()
    } catch {
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  const inputCls = 'w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20'

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/25 bg-emerald-50/70 dark:bg-emerald-500/[0.07] p-5 text-center space-y-2">
        <div className="flex justify-center"><Mascot name="starstruck" size={compact ? 72 : 96} /></div>
        <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">¡Listo! Revisa tu correo 🎉</p>
        <p className="text-xs text-slate-600 dark:text-slate-300">Te llega lo prometido. ¿Prefieres hablarlo 1:1?</p>
        <Link href="/#contacto" className="inline-block btn-gradient text-white font-bold text-sm py-2.5 px-5 rounded-xl">Agenda consulta gratis →</Link>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-violet-200 dark:border-violet-500/30 bg-violet-50/70 dark:bg-violet-500/[0.07] p-5 text-center">
      {!hideMascot && <div className="flex justify-center mb-1"><Mascot name={mascot} size={compact ? 84 : 120} /></div>}
      <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">{headline}</p>
      {sub && <p className="text-xs mt-1.5 text-slate-600 dark:text-slate-300 leading-relaxed">{sub}</p>}

      <form onSubmit={submit} className="mt-4 space-y-2.5 text-left">
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{emailPitch}</p>
        <input className={inputCls} placeholder="Tu nombre" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <input className={inputCls} type="email" placeholder="tu@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        {err && <p className="text-xs text-red-500">{err}</p>}
        <button type="submit" disabled={sending} className="w-full btn-gradient text-white font-bold text-sm py-3 rounded-xl disabled:opacity-60">
          {sending ? 'Enviando…' : 'Mándamelo →'}
        </button>
        <div className="text-center pt-1">
          <Link href="/#contacto" className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline">o agenda una consulta gratis 1:1 →</Link>
        </div>
        <input type="text" value={hp} onChange={e => setHp(e.target.value)} tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
      </form>
    </div>
  )
}
