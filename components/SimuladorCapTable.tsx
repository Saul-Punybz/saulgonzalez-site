'use client'

import { useState, useRef, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import Mascot from '@/components/tools/Mascot'
import LeadCTA, { burstConfetti } from '@/components/tools/LeadCTA'

/* ── types ─────────────────────────────────────────── */
type Round = {
  id: number
  name: string
  amount: number      // capital levantado (USD)
  preMoney: number    // valuación pre-money (USD)
  newPoolPct: number  // nuevo option pool creado en esta ronda (% del post-money)
}

type Group = { key: string; label: string; type: 'founders' | 'pool' | 'inv' }
type Snapshot = { label: string; state: Record<string, number> }

const fmtMoney = (n: number) =>
  n > 0 ? n.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '0'
const pct = (x: number) => `${(x * 100).toFixed(2)}%`

/* ── simulation ────────────────────────────────────── */
function simulate(initialPool: number, rounds: Round[]) {
  const groups: Group[] = [
    { key: 'founders', label: 'Founders', type: 'founders' },
    { key: 'pool', label: 'Option pool', type: 'pool' },
  ]
  let state: Record<string, number> = {
    founders: 1 - initialPool / 100,
    pool: initialPool / 100,
  }
  const snapshots: Snapshot[] = [{ label: 'Inicio', state: { ...state } }]

  rounds.forEach((r, i) => {
    const post = r.preMoney + r.amount
    const invPct = post > 0 ? r.amount / post : 0
    const newPool = Math.max(0, (r.newPoolPct || 0) / 100)
    const remaining = Math.max(0, 1 - invPct - newPool)

    const next: Record<string, number> = {}
    Object.keys(state).forEach(k => { next[k] = state[k] * remaining })
    next.pool = (next.pool || 0) + newPool
    const invKey = `inv${i}`
    next[invKey] = invPct

    groups.push({ key: invKey, label: `Inv. ${r.name || `Ronda ${i + 1}`}`, type: 'inv' })
    state = next
    snapshots.push({ label: r.name || `Ronda ${i + 1}`, state: { ...state } })
  })

  return { groups, snapshots, final: state }
}

export default function SimuladorCapTable() {
  const idRef = useRef(3)
  const [numFounders, setNumFounders] = useState(2)
  const [initialPool, setInitialPool] = useState(0)
  const [rounds, setRounds] = useState<Round[]>([
    { id: 1, name: 'Pre-seed', amount: 150000, preMoney: 1000000, newPoolPct: 0 },
    { id: 2, name: 'Seed', amount: 1200000, preMoney: 6000000, newPoolPct: 10 },
  ])

  const setRound = (id: number, k: keyof Round, v: string | number) =>
    setRounds(rs => rs.map(r => (r.id === id ? { ...r, [k]: v } : r)))
  const addRound = () =>
    setRounds(rs => [...rs, { id: idRef.current++, name: '', amount: 500000, preMoney: 10000000, newPoolPct: 0 }])
  const removeRound = (id: number) => setRounds(rs => rs.filter(r => r.id !== id))

  const { groups, snapshots, final } = simulate(initialPool, rounds)
  const foundersFinal = final.founders || 0
  const perFounder = numFounders > 0 ? foundersFinal / numFounders : 0

  /* ── mascota reactiva según ownership final de los founders ── */
  const mascot: { name: 'champ' | 'ok' | 'worried' | 'skull' | 'rocket'; verdict: string } =
    rounds.length === 0
      ? { name: 'rocket', verdict: 'Añade tu primera ronda 🚀' }
      : foundersFinal > 0.5
        ? { name: 'champ', verdict: 'Sigues mandando 😎' }
        : foundersFinal >= 0.3
          ? { name: 'ok', verdict: 'Todavía en control 🙂' }
          : foundersFinal >= 0.15
            ? { name: 'worried', verdict: 'Vas perdiendo control 😟' }
            : { name: 'skull', verdict: 'Te diluiste casi por completo 💀' }

  const prevChamp = useRef(false)
  useEffect(() => {
    const isChamp = rounds.length > 0 && foundersFinal > 0.5
    if (isChamp && !prevChamp.current) burstConfetti()
    prevChamp.current = isChamp
  }, [foundersFinal, rounds.length])

  const inputCls = 'w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20'
  const labelCls = 'block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5'
  const groupColor = (t: Group['type']) =>
    t === 'founders' ? 'text-violet-600 dark:text-violet-400 font-semibold'
      : t === 'pool' ? 'text-amber-600 dark:text-amber-400'
      : 'text-slate-700 dark:text-slate-300'

  return (
    <ToolLayout
      title="Simulador de cap table"
      description="Añade tus rondas (monto + valuación) y mira cómo se diluye tu ownership como founder, ronda a ronda. Gratis."
      icon="📊"
    >
      {/* ── Headline ── */}
      <div className="mb-8 rounded-2xl border border-violet-200 dark:border-violet-500/25 bg-violet-50/60 dark:bg-violet-500/[0.06] p-6 flex flex-col sm:flex-row items-center sm:items-end sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="shrink-0"><Mascot name={mascot.name} size={96} /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-1">Ownership de los founders al final</p>
            <p className="text-5xl font-black text-violet-600 dark:text-violet-400 tabular-nums leading-none">{pct(foundersFinal)}</p>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-2">{mascot.verdict}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Empezaron con {pct(1 - initialPool / 100)} · tras {rounds.length} ronda{rounds.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Cada founder (÷ {numFounders})</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{pct(perFounder)}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-start">
        {/* ── Controls ── */}
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}># de founders</label>
              <input type="number" min={1} className={inputCls} value={numFounders || ''} onChange={e => setNumFounders(Math.max(1, Number(e.target.value)))} />
            </div>
            <div>
              <label className={labelCls}>Pool inicial (%)</label>
              <input type="number" min={0} max={99} className={inputCls} value={initialPool || ''} onChange={e => setInitialPool(Math.min(99, Math.max(0, Number(e.target.value))))} placeholder="0" />
            </div>
          </div>

          <div className="space-y-4">
            {rounds.map((r, i) => {
              const post = r.preMoney + r.amount
              const invPct = post > 0 ? r.amount / post : 0
              return (
                <div key={r.id} className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Ronda {i + 1}</span>
                    <button type="button" onClick={() => removeRound(r.id)} className="text-xs text-slate-400 hover:text-red-500 transition-colors">Quitar</button>
                  </div>
                  <input className={inputCls} value={r.name} onChange={e => setRound(r.id, 'name', e.target.value)} placeholder="Nombre (ej. Pre-seed)" />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Monto (USD)</label>
                      <input type="number" min={0} className={inputCls} value={r.amount || ''} onChange={e => setRound(r.id, 'amount', Number(e.target.value))} />
                    </div>
                    <div>
                      <label className={labelCls}>Pre-money (USD)</label>
                      <input type="number" min={0} className={inputCls} value={r.preMoney || ''} onChange={e => setRound(r.id, 'preMoney', Number(e.target.value))} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Nuevo pool en esta ronda (%)</label>
                    <input type="number" min={0} max={99} className={inputCls} value={r.newPoolPct || ''} onChange={e => setRound(r.id, 'newPoolPct', Number(e.target.value))} placeholder="0" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Post-money ${fmtMoney(post)} · el inversor toma {pct(invPct)}
                  </p>
                </div>
              )
            })}
          </div>

          <button onClick={addRound} className="w-full btn-gradient text-white font-bold text-sm py-3 rounded-xl">+ Añadir ronda</button>
        </div>

        {/* ── Results table ── */}
        <div>
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[420px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-white/[0.03]">
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Stakeholder</th>
                    {snapshots.map((s, i) => (
                      <th key={i} className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 whitespace-nowrap">{s.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {groups.map(g => (
                    <tr key={g.key} className="border-t border-slate-100 dark:border-white/[0.06]">
                      <td className={`px-4 py-3 whitespace-nowrap ${groupColor(g.type)}`}>{g.label}</td>
                      {snapshots.map((s, i) => {
                        const v = s.state[g.key]
                        return (
                          <td key={i} className={`px-4 py-3 text-right tabular-nums ${g.type === 'founders' ? 'font-semibold text-violet-600 dark:text-violet-400' : 'text-slate-600 dark:text-slate-300'}`}>
                            {v === undefined ? <span className="text-slate-300 dark:text-slate-600">—</span> : pct(v)}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
            Cada ronda diluye a todos los que ya estaban: el nuevo inversor recibe <b>monto ÷ post-money</b>, y si
            creas un nuevo option pool, ese porcentaje también sale de los existentes. Por eso tu % como founder
            baja ronda a ronda — la meta no es evitar la dilución, sino que cada ronda aumente el valor de tu
            porción más de lo que se reduce.
          </p>
          <p className="text-[11px] text-slate-400 mt-3">Estimación educativa — el cap table real depende de los términos exactos, conversiones de SAFE/notas y el orden de las rondas. No es consejo legal ni de inversión.</p>

          <div className="mt-6">
            <LeadCTA
              hideMascot
              service="Simulador de cap table"
              headline="¿Perdiendo demasiado control?"
              sub="Te ayudo a planear tus rondas para no diluirte de más."
              emailPitch="Déjame tu correo y revisamos tu cap table juntos."
              context={() => `Simuló ${rounds.length} ronda(s) [${rounds.map(r => r.name || 'ronda').join(', ')}] con ${numFounders} founder(s) y pool inicial ${initialPool}% → founders finales ${pct(foundersFinal)} (cada founder ${pct(perFounder)})`}
              celebrate={false}
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
