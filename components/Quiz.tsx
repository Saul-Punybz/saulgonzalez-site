'use client'

import { useState, useRef, useEffect } from 'react'

type Service = 'webapp' | 'mobile' | 'ai' | 'consulting' | 'unknown'
type Stage = 'idea' | 'spec' | 'improve' | 'evaluate'
type Concern = 'cost' | 'timeline' | 'trust' | 'viability'

interface FormData {
  service: Service | null
  stage: Stage | null
  concern: Concern | null
  budget: number | null
  name: string
  email: string
  company: string
  message: string
}

const BUDGET_RANGES = ['$1k – $2k', '$3k – $5k', '$5k – $10k', '$11k – $20k', '$20k – $35k', '$36k – $50k', '$50k+']

const services: { id: Service; label: string; icon: string; desc: string }[] = [
  { id: 'webapp',     label: 'WebApp / Sistema Web',      icon: '🖥',  desc: 'CRM, portal, dashboard, marketplace' },
  { id: 'mobile',     label: 'App iOS o Android',          icon: '📱',  desc: 'Desde MVP hasta escala' },
  { id: 'ai',         label: 'Integrar IA a mi negocio',   icon: '✦',   desc: 'Agentes, automatizaciones, chatbots' },
  { id: 'consulting', label: 'Consultoría técnica',        icon: '⚡',  desc: 'Arquitectura, CTO as a Service' },
  { id: 'unknown',    label: 'No sé bien lo que necesito', icon: '💡',  desc: 'Ayúdame a descubrirlo' },
]

const stages: { id: Stage; label: string; sub: string }[] = [
  { id: 'idea',     label: 'Solo tengo una idea',                          sub: 'No está estructurada todavía' },
  { id: 'spec',     label: 'Tengo el spec, necesito ejecución',            sub: 'Sé qué quiero, busco quien lo construya' },
  { id: 'improve',  label: 'Quiero mejorar o escalar algo existente',      sub: 'Ya tengo algo funcionando' },
  { id: 'evaluate', label: 'Quiero evaluar qué tecnología usar',           sub: 'Necesito orientación antes de decidir' },
]

const concerns: { id: Concern; label: string; sub: string }[] = [
  { id: 'cost',      label: 'El presupuesto',           sub: 'No quiero sorpresas ni costos ocultos' },
  { id: 'timeline',  label: 'Los tiempos',              sub: 'He sido quemado antes, necesito cumplimiento' },
  { id: 'trust',     label: 'Encontrar a alguien confiable', sub: 'El mercado está lleno de promesas vacías' },
  { id: 'viability', label: 'Viabilidad técnica',       sub: 'No sé si mi idea es posible con mi presupuesto' },
]

const label = {
  service: (s: Service | null) => services.find(x => x.id === s)?.label ?? '',
  stage:   (s: Stage | null)   => stages.find(x => x.id === s)?.label ?? '',
  concern: (c: Concern | null) => concerns.find(x => x.id === c)?.label ?? '',
}

const inputCls = `
  bg-white dark:bg-white/[0.05]
  border border-slate-200 dark:border-white/[0.1]
  hover:border-slate-300 dark:hover:border-white/25
  focus:border-violet-500 dark:focus:border-violet-400
  rounded-xl px-5 py-4
  text-slate-900 dark:text-white text-base
  placeholder:text-slate-400 dark:placeholder:text-slate-500
  outline-none transition-colors w-full
`.replace(/\s+/g, ' ').trim()

export default function Quiz() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [source, setSource] = useState({ referrer: '', utm_source: '', utm_medium: '', utm_campaign: '' })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setSource({
      referrer: document.referrer || '',
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
    })
  }, [])

  useEffect(() => {
    if (submitted) {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [submitted])
  const [form, setForm] = useState<FormData>({
    service: null, stage: null, concern: null, budget: null,
    name: '', email: '', company: '', message: '',
  })

  const pick = {
    service: (s: Service) => {
      setForm(f => ({ ...f, service: s }))
      setStep(s === 'unknown' ? 3 : 1)
    },
    stage: (s: Stage) => {
      setForm(f => ({ ...f, stage: s }))
      setStep(2)
    },
    concern: (c: Concern) => {
      setForm(f => ({ ...f, concern: c }))
      setStep(3)
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    const budgetLabel = form.budget !== null ? BUDGET_RANGES[form.budget] : ''
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          service: label.service(form.service),
          stage: label.stage(form.stage),
          concern: label.concern(form.concern),
          budget: budgetLabel,
          message: form.message,
          ...source,
        }),
      })
    } catch {
      // silently continue — lead is still shown success
    }
    setSending(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div ref={containerRef} className="text-center py-20 px-8 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-3xl shadow-sm">
        <div className="w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-600/20 border-2 border-violet-200 dark:border-violet-500/30 flex items-center justify-center mx-auto mb-6">
          <svg className="w-9 h-9 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Recibido, {form.name.split(' ')[0]}.
        </h3>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-2">
          Te escribo a <span className="text-slate-900 dark:text-white font-semibold">{form.email}</span> en menos de 24 horas.
        </p>
        <p className="text-slate-400 dark:text-slate-500 text-sm mt-4">
          ¿Urgente? → <a href="mailto:saul@puny.bz" className="text-violet-600 dark:text-violet-400 hover:underline">saul@puny.bz</a>
        </p>
        <button
          onClick={() => { setSubmitted(false); setStep(0); setForm({ service: null, stage: null, concern: null, budget: null, name: '', email: '', company: '', message: '' }) }}
          className="mt-8 text-sm text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors underline underline-offset-2"
        >
          Enviar otra consulta
        </button>
      </div>
    )
  }

  const totalSteps = form.service === 'unknown' ? 2 : 4
  const progressPct = (step / totalSteps) * 100

  const stepLabels = form.service === 'unknown'
    ? [{ full: 'Proyecto', short: 'Proyecto' }, { full: 'Contacto', short: 'Contacto' }]
    : [{ full: 'Proyecto', short: 'Proyecto' }, { full: 'Etapa', short: 'Etapa' }, { full: 'Preocupación', short: 'Preoc.' }, { full: 'Contacto', short: 'Contacto' }]

  return (
    <div ref={containerRef} className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-3xl shadow-sm overflow-hidden">

      {/* Header with step progress */}
      <div className="px-8 pt-8 pb-6 border-b border-slate-100 dark:border-white/[0.06]">
        <div className="flex items-center justify-between mb-4">
          {stepLabels.map((lbl, i) => (
            <div key={lbl.full} className="flex items-center gap-1.5">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0 ${
                i < step
                  ? 'bg-violet-600 text-white'
                  : i === step
                  ? 'bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 ring-2 ring-violet-500/50'
                  : 'bg-slate-100 dark:bg-white/[0.05] text-slate-400 dark:text-slate-600'
              }`}>
                {i < step
                  ? <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  : i + 1
                }
              </div>
              <span className={`text-xs font-medium ${i === step ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'}`}>
                <span className="hidden sm:inline">{lbl.full}</span>
                <span className="sm:hidden">{lbl.short}</span>
              </span>
              {i < stepLabels.length - 1 && (
                <div className={`w-4 sm:w-8 h-px ml-1 flex-shrink-0 ${i < step ? 'bg-violet-500' : 'bg-slate-200 dark:bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-slate-100 dark:bg-white/[0.07] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-violet-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="px-8 py-8">

        {/* Step 0 — Service type */}
        {step === 0 && (
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">¿Qué tipo de proyecto necesitas?</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Selecciona el que más se acerca a tu situación.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map(s => (
                <button key={s.id} onClick={() => pick.service(s.id)}
                  className="text-left p-6 rounded-2xl border-2 border-slate-200 dark:border-white/10 hover:border-violet-400 dark:hover:border-violet-500/60 hover:bg-violet-50/60 dark:hover:bg-violet-500/[0.07] transition-all group">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div className="font-bold text-base text-slate-800 dark:text-white group-hover:text-violet-700 dark:group-hover:text-violet-300 mb-1">{s.label}</div>
                  <div className="text-sm text-slate-400 dark:text-slate-500">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1 — Stage */}
        {step === 1 && (
          <div>
            <button onClick={() => setStep(0)} className="text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 text-sm mb-6 flex items-center gap-1.5 transition-colors font-medium">
              ← Atrás
            </button>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">¿En qué etapa está tu proyecto?</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Esto me ayuda a preparar algo útil para nuestra conversación.</p>
            <div className="flex flex-col gap-3">
              {stages.map(s => (
                <button key={s.id} onClick={() => pick.stage(s.id)}
                  className="text-left px-6 py-5 rounded-2xl border-2 border-slate-200 dark:border-white/10 hover:border-violet-400 dark:hover:border-violet-500/60 hover:bg-violet-50/60 dark:hover:bg-violet-500/[0.07] transition-all group">
                  <div className="font-bold text-base text-slate-800 dark:text-white group-hover:text-violet-700 dark:group-hover:text-violet-300">{s.label}</div>
                  <div className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">{s.sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Concern */}
        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} className="text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 text-sm mb-6 flex items-center gap-1.5 transition-colors font-medium">
              ← Atrás
            </button>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">¿Cuál es tu mayor preocupación?</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Sé honesto — así puedo ser más útil desde el primer día.</p>
            <div className="flex flex-col gap-3">
              {concerns.map(c => (
                <button key={c.id} onClick={() => pick.concern(c.id)}
                  className="text-left px-6 py-5 rounded-2xl border-2 border-slate-200 dark:border-white/10 hover:border-violet-400 dark:hover:border-violet-500/60 hover:bg-violet-50/60 dark:hover:bg-violet-500/[0.07] transition-all group">
                  <div className="font-bold text-base text-slate-800 dark:text-white group-hover:text-violet-700 dark:group-hover:text-violet-300">{c.label}</div>
                  <div className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">{c.sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — Contact form */}
        {step === 3 && (
          <div>
            {form.service !== 'unknown' && (
              <button onClick={() => setStep(2)} className="text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 text-sm mb-6 flex items-center gap-1.5 transition-colors font-medium">
                ← Atrás
              </button>
            )}

            {form.service === 'unknown' ? (
              <div className="mb-8 p-6 rounded-2xl bg-violet-50 dark:bg-violet-500/[0.1] border-2 border-violet-200 dark:border-violet-500/25">
                <p className="text-violet-700 dark:text-violet-300 font-bold text-lg mb-1">Perfecto. Para eso estoy exactamente.</p>
                <p className="text-slate-600 dark:text-slate-400">
                  En 30 minutos descubrimos juntos qué necesitas. No necesitas saber de tecnología — yo me encargo de esa parte.
                </p>
              </div>
            ) : (
              <div className="mb-8 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Tu resumen</p>
                <p className="flex items-start gap-2 text-sm">
                  <span className="text-slate-500 dark:text-slate-400 font-medium w-28 flex-shrink-0">Proyecto:</span>
                  <span className="text-slate-800 dark:text-white font-semibold">{label.service(form.service)}</span>
                </p>
                {form.stage && (
                  <p className="flex items-start gap-2 text-sm">
                    <span className="text-slate-500 dark:text-slate-400 font-medium w-28 flex-shrink-0">Etapa:</span>
                    <span className="text-slate-800 dark:text-white font-semibold">{label.stage(form.stage)}</span>
                  </p>
                )}
                {form.concern && (
                  <p className="flex items-start gap-2 text-sm">
                    <span className="text-slate-500 dark:text-slate-400 font-medium w-28 flex-shrink-0">Preocupación:</span>
                    <span className="text-slate-800 dark:text-white font-semibold">{label.concern(form.concern)}</span>
                  </p>
                )}
                {form.budget !== null && (
                  <p className="flex items-start gap-2 text-sm">
                    <span className="text-slate-500 dark:text-slate-400 font-medium w-28 flex-shrink-0">Presupuesto:</span>
                    <span className="text-slate-800 dark:text-white font-semibold">{BUDGET_RANGES[form.budget]}</span>
                  </p>
                )}
              </div>
            )}

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">¿Cómo te contacto?</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Respuesta garantizada en menos de 24 horas.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Budget selector */}
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">¿Cuál es tu presupuesto aproximado?</p>
                <div className="flex flex-wrap gap-2">
                  {BUDGET_RANGES.map((range, i) => (
                    <button key={range} type="button"
                      onClick={() => setForm(f => ({ ...f, budget: f.budget === i ? null : i }))}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                        form.budget === i
                          ? 'bg-violet-600 border-violet-600 text-white'
                          : 'bg-white dark:bg-white/[0.05] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-violet-400 dark:hover:border-violet-500/60'
                      }`}>
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required placeholder="Tu nombre *" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className={inputCls} />
                <input required type="email" placeholder="Tu email *" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className={inputCls} />
              </div>
              <input placeholder="Tu empresa o proyecto (opcional)" value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                className={inputCls} />
              <textarea rows={4} placeholder="Cuéntame más (opcional) — qué tienes, qué quieres lograr" value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className={inputCls + ' resize-none'} />
              <button type="submit" disabled={sending}
                className="btn-glow btn-gradient disabled:opacity-60 disabled:cursor-wait text-white font-bold py-5 rounded-2xl transition-all mt-2 flex items-center justify-center gap-2 text-base">
                {sending ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </>
                ) : 'Agenda mi consulta gratis →'}
              </button>
              <p className="text-center text-sm text-slate-400 dark:text-slate-500">
                30 minutos · Sin compromiso · Si no soy el indicado, te conecto con quien puede ayudarte
              </p>
            </form>
          </div>
        )}

      </div>
    </div>
  )
}
