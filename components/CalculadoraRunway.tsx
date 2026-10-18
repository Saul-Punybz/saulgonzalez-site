'use client'

import { useState, useEffect, useRef } from 'react'
import ToolLayout from '@/components/ToolLayout'
import Mascot, { MascotName } from '@/components/tools/Mascot'
import LeadCTA, { burstConfetti } from '@/components/tools/LeadCTA'

const fmtMoney = (n: number) =>
  (isFinite(n) ? n : 0).toLocaleString('en-US', { maximumFractionDigits: 0 })

function addMonths(base: Date, months: number) {
  const d = new Date(base)
  d.setMonth(d.getMonth() + Math.floor(months))
  return d
}
const fmtDate = (d: Date) =>
  d.toLocaleDateString('es', { month: 'long', year: 'numeric' })

/* Runway in months. Returns Infinity when cash-flow positive. */
function runwayMonths(
  mode: 'neto' | 'detalle',
  cash: number,
  netBurn: number,
  ingresos: number,
  gastos: number,
  growthPct: number,
): number {
  if (cash <= 0) return 0
  if (mode === 'neto') {
    return netBurn > 0 ? cash / netBurn : Infinity
  }
  const g = growthPct / 100
  // No growth → closed form
  if (g === 0) {
    const burn = gastos - ingresos
    return burn > 0 ? cash / burn : Infinity
  }
  // Growth → month-by-month projection
  let c = cash
  let ing = ingresos
  let m = 0
  while (m < 600) {
    const burn = gastos - ing
    if (burn <= 0) return Infinity // became cash-flow positive
    if (c - burn <= 0) return m + c / burn // fractional last month
    c -= burn
    ing = ing * (1 + g)
    m++
  }
  return Infinity
}

export default function CalculadoraRunway() {
  const [mode, setMode] = useState<'neto' | 'detalle'>('detalle')
  const [cash, setCash] = useState(500000)
  const [netBurn, setNetBurn] = useState(40000)
  const [ingresos, setIngresos] = useState(20000)
  const [gastos, setGastos] = useState(60000)
  const [growth, setGrowth] = useState(0)

  const months = runwayMonths(mode, cash, netBurn, ingresos, gastos, growth)
  const infinite = !isFinite(months)
  const today = new Date()
  const outDate = addMonths(today, months)
  const raiseInMonths = Math.max(0, months - 6)
  const raiseDate = addMonths(today, raiseInMonths)
  const netBurnNow = mode === 'neto' ? netBurn : gastos - ingresos

  // ── Mascota reactiva según el runway ──
  const mood: { name: MascotName; verdict: string; color: string } =
    infinite
      ? { name: 'money', verdict: '¡Flujo positivo! 🤑', color: 'text-emerald-600 dark:text-emerald-400' }
      : months > 12
      ? { name: 'champ', verdict: 'Runway cómodo 😎', color: 'text-emerald-600 dark:text-emerald-400' }
      : months >= 6
      ? { name: 'ok', verdict: 'Vas bien, pero ojo 🙂', color: 'text-violet-600 dark:text-violet-400' }
      : months >= 3
      ? { name: 'worried', verdict: 'Empieza a levantar ya 😟', color: 'text-amber-600 dark:text-amber-400' }
      : { name: 'fire', verdict: '🔥 Se te acaba la caja', color: 'text-red-600 dark:text-red-400' }

  // Confetti solo al MEJORAR hacia runway cómodo / flujo positivo
  const prevGood = useRef(false)
  useEffect(() => {
    const good = infinite || months > 12
    if (good && !prevGood.current) burstConfetti()
    prevGood.current = good
  }, [infinite, months])

  const inputCls = 'w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20'
  const labelCls = 'block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5'

  return (
    <ToolLayout
      title="Calculadora de runway"
      description="Caja ÷ burn = meses de pista. Calcula cuánto te queda, cuándo se acaba tu dinero y cuándo empezar a levantar tu próxima ronda. Gratis."
      icon="🛫"
    >
      <div className="grid md:grid-cols-[1fr_360px] gap-8 items-start">
        {/* ── INPUTS ── */}
        <div className="space-y-5">
          <div>
            <label className={labelCls}>Caja actual (USD)</label>
            <input type="number" min={0} className={inputCls} value={cash || ''} onChange={e => setCash(Number(e.target.value))} />
          </div>

          {/* mode toggle */}
          <div className="inline-flex rounded-lg border border-slate-200 dark:border-white/10 p-1 bg-slate-50 dark:bg-white/5">
            {([['detalle', 'Ingresos + gastos'], ['neto', 'Burn neto directo']] as const).map(([m, label]) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${mode === m ? 'bg-violet-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {label}
              </button>
            ))}
          </div>

          {mode === 'neto' ? (
            <div>
              <label className={labelCls}>Burn neto mensual (USD)</label>
              <input type="number" min={0} className={inputCls} value={netBurn || ''} onChange={e => setNetBurn(Number(e.target.value))} />
              <p className="text-xs text-slate-400 mt-1.5">Cuánto dinero pierdes neto cada mes.</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Ingresos mensuales (USD)</label>
                  <input type="number" min={0} className={inputCls} value={ingresos || ''} onChange={e => setIngresos(Number(e.target.value))} />
                </div>
                <div>
                  <label className={labelCls}>Gastos mensuales (USD)</label>
                  <input type="number" min={0} className={inputCls} value={gastos || ''} onChange={e => setGastos(Number(e.target.value))} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Crecimiento mensual de ingresos (%) — opcional</label>
                <input type="number" min={0} max={100} className={inputCls} value={growth || ''} onChange={e => setGrowth(Number(e.target.value))} placeholder="0" />
                <p className="text-xs text-slate-400 mt-1.5">Con crecimiento, proyectamos mes a mes hasta que la caja llega a cero.</p>
              </div>
            </>
          )}

          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <b className="text-slate-700 dark:text-slate-200">Regla práctica:</b> empieza a levantar
              ~6 meses antes de quedarte sin caja. Los inversionistas quieren ver
              <b className="text-slate-700 dark:text-slate-200"> 12–18 meses de runway post-ronda</b>.
            </p>
          </div>
        </div>

        {/* ── RESULTS ── */}
        <div className="space-y-4 md:sticky md:top-20">
          {/* Mascota reactiva */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-gradient-to-b from-slate-50 to-white dark:from-white/[0.05] dark:to-transparent p-5 text-center">
            <div className="flex justify-center"><Mascot name={mood.name} size={130} /></div>
            <p className={`text-lg font-black leading-tight ${mood.color}`}>{mood.verdict}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">Tu runway</p>
            {infinite ? (
              <>
                <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">Flujo positivo 🎉</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">No estás quemando caja — tu runway es, en la práctica, infinito. Levantas por elección, no por necesidad.</p>
              </>
            ) : (
              <>
                <p className="text-5xl font-black text-violet-600 dark:text-violet-400 tabular-nums">{months.toFixed(1)}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">meses de pista</p>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Burn neto/mes</span>
                    <span className="text-slate-900 dark:text-white font-semibold tabular-nums">${fmtMoney(netBurnNow)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Caja se acaba</span>
                    <span className="text-slate-900 dark:text-white font-semibold capitalize">{fmtDate(outDate)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {!infinite && (
            <div className={`rounded-2xl border p-5 ${raiseInMonths <= 1 ? 'border-red-500/40 bg-red-50/60 dark:bg-red-500/[0.08]' : 'border-violet-200 dark:border-violet-500/25 bg-violet-50/60 dark:bg-violet-500/[0.06]'}`}>
              <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-2">Cuándo empezar a levantar</p>
              {raiseInMonths <= 1 ? (
                <p className="text-lg font-black text-red-600 dark:text-red-400">Ya. Empieza esta semana.</p>
              ) : (
                <p className="text-lg font-black text-slate-900 dark:text-white">
                  En ~{raiseInMonths.toFixed(0)} {raiseInMonths < 2 ? 'mes' : 'meses'}
                  <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400 capitalize mt-0.5">{fmtDate(raiseDate)}</span>
                </p>
              )}
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Levantar toma 3–6 meses. Empezar tarde = negociar desde la debilidad.</p>
            </div>
          )}

          <LeadCTA
            hideMascot
            service="Calculadora de runway"
            headline="¿Poco runway?"
            sub="Los inversionistas quieren ver 12–18 meses post-ronda. Te ayudo a llegar bien preparado."
            emailPitch="Déjame tu correo y armamos tu plan de levantamiento."
            context={() => `Caja $${fmtMoney(cash)}, burn $${fmtMoney(netBurnNow)}/mes → ${infinite ? 'flujo positivo (runway infinito)' : `${months.toFixed(1)} meses de runway`}`}
            celebrate={false}
          />

          <p className="text-[11px] leading-relaxed text-slate-400 px-1">
            Estimación educativa — no es consejo financiero. La proyección con crecimiento asume que
            los gastos se mantienen constantes.
          </p>
        </div>
      </div>
    </ToolLayout>
  )
}
