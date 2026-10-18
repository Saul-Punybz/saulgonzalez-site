'use client'

import { useState, useRef, useEffect } from 'react'
import Mascot from '@/components/tools/Mascot'
import { burstConfetti } from '@/components/tools/LeadCTA'

const STAGES = [
  { v: '', label: '¿En qué etapa estás?' },
  { v: 'idea', label: '💡 Tengo la idea' },
  { v: 'pre-seed', label: '🌱 Pre-seed / bootstrapping' },
  { v: 'levantando', label: '🚀 Levantando ahora' },
  { v: 'terminos', label: '📄 Tengo términos sobre la mesa' },
]

export default function ContactForm() {
  const tsRef = useRef<number>(0)
  useEffect(() => { tsRef.current = Date.now() }, [])

  const [f, setF] = useState({ name: '', email: '', company: '', stage: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [err, setErr] = useState('')
  const [hp, setHp] = useState('')
  const set = (k: string, v: string) => setF(s => ({ ...s, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    if (!f.name.trim() || !f.email.includes('@')) { setErr('Escribe tu nombre y un email válido.'); return }
    setSending(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.name, email: f.email, company: f.company,
          service: 'Asesoría de fundraising', stage: f.stage || 'sin especificar',
          message: f.message, _hp: hp, _ts: tsRef.current,
        }),
      })
      setSent(true)
      burstConfetti()
    } catch {
      setSent(true)
    } finally { setSending(false) }
  }

  const inputCls = 'w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition'

  if (sent) {
    return (
      <div className="max-w-lg mx-auto text-center rounded-3xl border border-emerald-200 dark:border-emerald-500/25 bg-emerald-50/70 dark:bg-emerald-500/[0.07] p-10">
        <div className="flex justify-center"><Mascot name="rocket" size={130} /></div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">¡Recibido! 🎉</h3>
        <p className="text-slate-600 dark:text-slate-300 mt-2">Te escribo en menos de 24 horas para agendar tu orientación de fundraising. Revisa tu correo.</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={submit} className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 sm:p-8 shadow-xl shadow-violet-500/5 space-y-3.5">
        <div className="grid sm:grid-cols-2 gap-3.5">
          <input className={inputCls} placeholder="Tu nombre *" value={f.name} onChange={e => set('name', e.target.value)} />
          <input className={inputCls} type="email" placeholder="tu@email.com *" value={f.email} onChange={e => set('email', e.target.value)} />
        </div>
        <input className={inputCls} placeholder="Tu startup (opcional)" value={f.company} onChange={e => set('company', e.target.value)} />
        <select className={inputCls} value={f.stage} onChange={e => set('stage', e.target.value)}>
          {STAGES.map(s => <option key={s.v} value={s.v}>{s.label}</option>)}
        </select>
        <textarea className={inputCls + ' resize-none'} rows={3} placeholder="¿En qué te ayudo? (opcional)" value={f.message} onChange={e => set('message', e.target.value)} />
        {err && <p className="text-xs text-red-500">{err}</p>}
        <button type="submit" disabled={sending} className="w-full btn-gradient btn-glow text-white font-bold text-base py-4 rounded-xl disabled:opacity-60 transition">
          {sending ? 'Enviando…' : 'Agenda tu consulta gratis →'}
        </button>
        <p className="text-[11px] text-slate-400 text-center">30 min · sin costo · sin compromiso · respuesta en ≤ 24h</p>
        <input type="text" value={hp} onChange={e => setHp(e.target.value)} tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
      </form>
    </div>
  )
}
