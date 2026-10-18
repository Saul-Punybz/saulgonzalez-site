'use client'

import { useState, useEffect, useRef } from 'react'
import ToolLayout from '@/components/ToolLayout'
import Mascot, { MascotName } from '@/components/tools/Mascot'
import LeadCTA, { burstConfetti } from '@/components/tools/LeadCTA'

const fmtMoney = (n: number) =>
  '$' + (Number.isFinite(n) ? Math.round(n) : 0).toLocaleString('en-US')
const fmtPct = (n: number) => (Number.isFinite(n) ? n : 0).toFixed(2) + '%'

export default function CalculadoraDilucion() {
  const [pre, setPre] = useState(6000000)
  const [raise, setRaise] = useState(1000000)
  const [poolPct, setPoolPct] = useState(0)

  const post = pre + raise
  const investorPct = post > 0 ? (raise / post) * 100 : 0
  const pool = Math.max(0, Math.min(poolPct || 0, 100 - investorPct))
  const foundersPct = Math.max(0, 100 - investorPct - pool)

  // ── mascota reactiva según cuánto le queda a los founders ──
  let mascot: MascotName, verdict: string
  if (foundersPct > 70) { mascot = 'champ'; verdict = 'Dilución sana 😎' }
  else if (foundersPct >= 55) { mascot = 'ok'; verdict = 'Vas bien 🙂' }
  else if (foundersPct >= 35) { mascot = 'worried'; verdict = 'Ojo, estás soltando bastante 😟' }
  else { mascot = 'skull'; verdict = 'Te estás diluyendo demasiado 💀' }

  const prevGood = useRef(foundersPct > 70)
  useEffect(() => {
    const good = foundersPct > 70
    if (good && !prevGood.current) burstConfetti()
    prevGood.current = good
  }, [foundersPct])

  const rows = [
    { label: 'Founders (tú)', pct: foundersPct, color: 'bg-violet-500', accent: 'text-violet-600 dark:text-violet-400' },
    { label: 'Option pool', pct: pool, color: 'bg-fuchsia-400', accent: 'text-fuchsia-600 dark:text-fuchsia-400' },
    { label: 'Inversor', pct: investorPct, color: 'bg-slate-400 dark:bg-slate-500', accent: 'text-slate-600 dark:text-slate-300' },
  ]

  const inputCls = 'w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 tabular-nums'
  const labelCls = 'block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5'

  return (
    <ToolLayout
      title="Calculadora de dilución"
      description="Valuación pre-money + monto a levantar → cuánto equity entregas, cuánto se lleva el option pool y cuánto te queda a ti. Con el cap table después de la ronda."
      icon="📉"
    >
      <div className="grid md:grid-cols-[1fr_380px] gap-8 items-start">
        {/* ── INPUTS ── */}
        <div className="space-y-5">
          <div>
            <label className={labelCls}>Valuación pre-money (USD)</label>
            <input type="number" min={0} step={100000} className={inputCls} value={pre || ''} onChange={e => setPre(Number(e.target.value))} />
            <p className="text-xs text-slate-400 mt-1.5">Cuánto vale tu empresa <b>antes</b> de que entre el dinero nuevo.</p>
          </div>

          <div>
            <label className={labelCls}>Monto a levantar (USD)</label>
            <input type="number" min={0} step={50000} className={inputCls} value={raise || ''} onChange={e => setRaise(Number(e.target.value))} />
            <p className="text-xs text-slate-400 mt-1.5">El cheque total de la ronda.</p>
          </div>

          <div>
            <label className={labelCls}>Option pool a crear (%) — opcional</label>
            <input type="number" min={0} max={40} step={1} className={inputCls} value={poolPct || ''} onChange={e => setPoolPct(Number(e.target.value))} placeholder="0" />
            <p className="text-xs text-slate-400 mt-1.5">Acciones reservadas para empleados. Normalmente sale de <b>tu</b> tajada (el “pool shuffle”).</p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-4">
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5">¿Qué es la dilución?</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Cuando levantas capital, emites acciones nuevas: tu porcentaje baja aunque tu número de acciones no cambie.
              El inversor se queda con <b>monto ÷ post-money</b>. Si además creas un option pool, casi siempre se crea
              <b> antes</b> de la ronda, así que diluye a los founders, no al inversor nuevo.
            </p>
          </div>
        </div>

        {/* ── RESULTS ── */}
        <div className="space-y-4 md:sticky md:top-20">
          {/* mascota reactiva */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-gradient-to-b from-violet-50/60 to-transparent dark:from-violet-500/[0.06] p-5 text-center">
            <div className="flex justify-center"><Mascot name={mascot} size={110} /></div>
            <p className="text-base font-black text-slate-900 dark:text-white mt-1">{verdict}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Te quedas con <b className="text-violet-600 dark:text-violet-400">{fmtPct(foundersPct)}</b> de tu empresa.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-1">Te diluyes</p>
            <p className="text-4xl font-black text-violet-600 dark:text-violet-400 tabular-nums leading-none">
              {fmtPct(investorPct + pool)}
            </p>
            <p className="text-xs text-slate-400 mt-1.5">De tu empresa entre inversor y option pool.</p>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Post-money</span><span className="font-semibold text-slate-900 dark:text-white tabular-nums">{fmtMoney(post)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">% para el inversor</span><span className="font-semibold text-slate-900 dark:text-white tabular-nums">{fmtPct(investorPct)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">% option pool</span><span className="font-semibold text-slate-900 dark:text-white tabular-nums">{fmtPct(pool)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Te queda a ti</span><span className="font-bold text-violet-600 dark:text-violet-400 tabular-nums">{fmtPct(foundersPct)}</span></div>
            </div>
          </div>

          {/* Cap table */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Cap table después de la ronda</p>

            {/* stacked bar */}
            <div className="flex h-3 w-full rounded-full overflow-hidden mb-4">
              {rows.map(r => (
                <div key={r.label} className={r.color} style={{ width: `${Math.max(0, r.pct)}%` }} title={`${r.label} ${fmtPct(r.pct)}`} />
              ))}
            </div>

            <div className="space-y-2.5">
              {rows.map(r => (
                <div key={r.label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <span className={`w-2.5 h-2.5 rounded-sm ${r.color}`} />
                    {r.label}
                  </span>
                  <span className="flex items-baseline gap-3">
                    <span className={`font-semibold tabular-nums ${r.accent}`}>{fmtPct(r.pct)}</span>
                    <span className="text-xs text-slate-400 tabular-nums w-24 text-right">{fmtMoney((r.pct / 100) * post)}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <LeadCTA
            hideMascot
            service="Calculadora de dilución"
            headline="¿Estás soltando demasiado equity?"
            sub="Te ayudo a estructurar tu ronda para diluirte menos."
            emailPitch="Déjame tu correo y te mando cómo optimizar tu cap table."
            context={() => `Pre-money ${fmtMoney(pre)}, levanta ${fmtMoney(raise)}, pool ${poolPct}% → founders quedan ${fmtPct(foundersPct)}`}
            celebrate={false}
          />

          <p className="text-[11px] leading-relaxed text-slate-400 px-1">
            Estimación educativa. La dilución real depende de la estructura exacta de la ronda (SAFEs previos que
            convierten, warrants, anti-dilución, etc.). No es consejo legal ni financiero.
          </p>
        </div>
      </div>
    </ToolLayout>
  )
}
