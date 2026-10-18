'use client'

import { useState, useRef, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import Mascot from '@/components/tools/Mascot'
import { burstConfetti } from '@/components/tools/LeadCTA'

/* ── Checklist data (real fundraising dataroom) ───────── */
type Category = { key: string; label: string; icon: string; items: string[] }

const CATEGORIES: Category[] = [
  {
    key: 'negocio', label: 'Negocio', icon: '📈',
    items: [
      'Pitch deck actualizado',
      'Roadmap de producto',
      'Pipeline de clientes',
      'Contratos clave con clientes',
      'KPIs / SaaS metrics (MRR, CAC, LTV, churn)',
      'Análisis de mercado',
    ],
  },
  {
    key: 'financiero', label: 'Financiero', icon: '💰',
    items: [
      'Cuentas anuales (2-3 años)',
      'Estados mensuales 12-24 meses (P&L, balance, flujo de caja)',
      'Conciliaciones bancarias',
      'Proyecciones 3-5 años con hipótesis',
    ],
  },
  {
    key: 'ip', label: 'Propiedad intelectual', icon: '🔐',
    items: [
      'Marcas y patentes',
      'Cesión de IP de empleados y colaboradores',
      'Protección de datos / compliance',
    ],
  },
  {
    key: 'legal', label: 'Legal / Estructura', icon: '⚖️',
    items: [
      'Acuerdo de accionistas (SHA)',
      'Rondas previas (SAFEs, notas convertibles)',
      'Actas de junta',
      'Certificado de incorporación',
      'Cap table',
    ],
  },
]

const ALL_ITEMS = CATEGORIES.flatMap(c => c.items.map(i => `${c.key}::${i}`))

/* ── Export document ─────────────────────────────────── */
function buildSummaryHtml(checked: Record<string, boolean>, done: number, total: number) {
  const pct = total ? Math.round((done / total) * 100) : 0
  const sections = CATEGORIES.map(c => {
    const rows = c.items.map(i => {
      const on = !!checked[`${c.key}::${i}`]
      return `<li style="color:${on ? '#166534' : '#9ca3af'}">${on ? '☑' : '☐'} ${i}</li>`
    }).join('')
    const cd = c.items.filter(i => checked[`${c.key}::${i}`]).length
    return `<h2>${c.icon} ${c.label} <small>(${cd}/${c.items.length})</small></h2><ul>${rows}</ul>`
  }).join('')

  return `<!doctype html><html><head><meta charset="utf-8"><title>Checklist de Dataroom</title>
<style>
  body{font-family:Georgia,'Times New Roman',serif;color:#111;max-width:720px;margin:40px auto;padding:0 32px;line-height:1.6;font-size:14px}
  h1{font-size:22px}
  h2{font-size:15px;margin-top:24px;border-bottom:1px solid #ddd;padding-bottom:4px}
  ul{list-style:none;padding-left:0}
  li{margin:5px 0}
  .bar{background:#f6f3fe;border:1px solid #e3dbfb;border-radius:8px;padding:14px 18px;margin:16px 0;font-size:15px}
  small{color:#777;font-weight:normal}
</style></head><body>
<h1>Checklist de Dataroom</h1>
<div class="bar"><b>Progreso: ${pct}%</b> — ${done} de ${total} documentos listos.</div>
${sections}
<p style="margin-top:30px;font-size:11px;color:#888">Generado con Levanta · saulgonzalez.pro/tools/checklist-dataroom</p>
</body></html>`
}

export default function ChecklistDataroom() {
  const tsRef = useRef<number>(0)
  useEffect(() => { tsRef.current = Date.now() }, [])

  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [unlocked, setUnlocked] = useState(false)
  const [gate, setGate] = useState({ name: '', email: '' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [hp, setHp] = useState('')

  const toggle = (id: string) => setChecked(c => ({ ...c, [id]: !c[id] }))
  const total = ALL_ITEMS.length
  const done = ALL_ITEMS.filter(id => checked[id]).length
  const pct = total ? Math.round((done / total) * 100) : 0
  const catCount = (c: Category) => c.items.filter(i => checked[`${c.key}::${i}`]).length

  // ── Reactive mascot + confetti ─────────────────────────
  const mascot: { name: 'party' | 'champ' | 'ok' | 'thinking'; line: string } =
    pct >= 100 ? { name: 'party', line: '¡Dataroom completo! 🎉' }
    : pct >= 75 ? { name: 'champ', line: 'Casi listo 😎' }
    : pct >= 40 ? { name: 'ok', line: 'Vas avanzando 🙂' }
    : { name: 'thinking', line: 'Te falta bastante 🤔' }

  const prevPct = useRef(pct)
  useEffect(() => {
    if (prevPct.current < 100 && pct >= 100) burstConfetti()
    prevPct.current = pct
  }, [pct])

  async function unlock(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!gate.name.trim() || !gate.email.includes('@')) {
      setError('Escribe tu nombre y un email válido.')
      return
    }
    setSending(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: gate.name, email: gate.email,
          service: 'Checklist de dataroom', stage: 'lead-magnet',
          message: `Dataroom ${pct}% listo (${done}/${total} documentos)`,
          _hp: hp, _ts: tsRef.current,
        }),
      })
      setUnlocked(true)
    } catch {
      setUnlocked(true)
    } finally {
      setSending(false)
    }
  }

  function downloadWord() {
    const blob = new Blob(['﻿', buildSummaryHtml(checked, done, total)], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Checklist-Dataroom.doc'
    a.click()
    URL.revokeObjectURL(url)
  }

  function printPdf() {
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(buildSummaryHtml(checked, done, total))
    w.document.close()
    w.focus()
    setTimeout(() => w.print(), 350)
  }

  const inputCls = 'w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20'

  return (
    <ToolLayout
      title="Checklist de dataroom"
      description="Todo lo que un inversionista pide antes de firmar, en un checklist interactivo. Marca tu progreso y exporta el resumen. Gratis."
      icon="🗂️"
    >
      <div className="grid md:grid-cols-[1fr_320px] gap-8 items-start">
        {/* ── CHECKLIST ── */}
        <div className="space-y-6">
          <p className="text-sm text-slate-500 dark:text-slate-400 -mt-2">
            Un dataroom bien armado puede <b className="text-slate-700 dark:text-slate-200">recortar 2-4 semanas</b> el cierre de tu ronda. Marca lo que ya tienes.
          </p>

          {CATEGORIES.map(cat => {
            const cd = catCount(cat)
            const cpct = Math.round((cd / cat.items.length) * 100)
            return (
              <div key={cat.key} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{cat.icon}</span>{cat.label}
                  </h3>
                  <span className="text-xs font-mono tabular-nums text-slate-500">{cd}/{cat.items.length}</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10 mb-4 overflow-hidden">
                  <div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${cpct}%` }} />
                </div>
                <div className="space-y-1.5">
                  {cat.items.map(item => {
                    const id = `${cat.key}::${item}`
                    const on = !!checked[id]
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggle(id)}
                        className={`w-full text-left flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors ${on ? 'bg-violet-50 dark:bg-violet-500/[0.08]' : 'hover:bg-slate-50 dark:hover:bg-white/[0.03]'}`}
                      >
                        <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center text-[11px] font-bold ${on ? 'bg-violet-600 border-violet-600 text-white' : 'border-slate-300 dark:border-white/20 text-transparent'}`}>✓</span>
                        <span className={`text-sm ${on ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>{item}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* honeypot */}
          <input type="text" value={hp} onChange={e => setHp(e.target.value)} tabIndex={-1} autoComplete="off"
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
        </div>

        {/* ── PROGRESS / EXPORT ── */}
        <div className="space-y-4 md:sticky md:top-20">
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-5">
            <div className="flex flex-col items-center mb-2">
              <Mascot name={mascot.name} size={96} />
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">{mascot.line}</p>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">Tu progreso</p>
            <p className="text-4xl font-black text-violet-600 dark:text-violet-400 tabular-nums">{pct}%</p>
            <p className="text-xs text-slate-500 mt-1">{done} de {total} documentos listos</p>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10 mt-4 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all" style={{ width: `${pct}%` }} />
            </div>
            <dl className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 space-y-1.5">
              {CATEGORIES.map(c => (
                <div key={c.key} className="flex justify-between text-xs">
                  <dt className="text-slate-500">{c.icon} {c.label}</dt>
                  <dd className="tabular-nums text-slate-700 dark:text-slate-300 font-medium">{catCount(c)}/{c.items.length}</dd>
                </div>
              ))}
            </dl>
          </div>

          {!unlocked ? (
            <form onSubmit={unlock} className="rounded-2xl border border-violet-200 dark:border-violet-500/25 bg-violet-50/60 dark:bg-violet-500/[0.06] p-5 space-y-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Exporta tu resumen gratis</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Déjame dónde enviártelo y desbloqueas la exportación.</p>
              <input className={inputCls} placeholder="Tu nombre" value={gate.name} onChange={e => setGate(g => ({ ...g, name: e.target.value }))} />
              <input className={inputCls} type="email" placeholder="tu@email.com" value={gate.email} onChange={e => setGate(g => ({ ...g, email: e.target.value }))} />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button type="submit" disabled={sending} className="w-full btn-gradient text-white font-bold text-sm py-3 rounded-xl disabled:opacity-60">
                {sending ? 'Un momento…' : 'Exportar resumen →'}
              </button>
              <p className="text-[10px] text-slate-400 text-center">Sin spam. Puedes darte de baja cuando quieras.</p>
            </form>
          ) : (
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/25 bg-emerald-50/60 dark:bg-emerald-500/[0.06] p-5 space-y-3">
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">✓ Listo — exporta tu checklist</p>
              <button onClick={downloadWord} className="w-full btn-gradient text-white font-bold text-sm py-3 rounded-xl">Descargar Word (.doc)</button>
              <button onClick={printPdf} className="w-full border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-violet-500 hover:text-violet-600 font-semibold text-sm py-3 rounded-xl transition-colors">Descargar / Imprimir PDF</button>
            </div>
          )}

          <p className="text-[11px] leading-relaxed text-slate-400 px-1">
            Herramienta educativa. La lista es una guía general del dataroom típico de una ronda temprana;
            tu caso puede requerir documentos adicionales.
          </p>
        </div>
      </div>
    </ToolLayout>
  )
}
