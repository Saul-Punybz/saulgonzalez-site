'use client'

import { useState, useEffect, useRef } from 'react'
import ToolLayout from '@/components/ToolLayout'
import Mascot from '@/components/tools/Mascot'
import LeadCTA, { burstConfetti } from '@/components/tools/LeadCTA'

const fmtMoney = (n: number) =>
  n > 0 ? n.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '0'

export default function CalculadoraSafe() {
  const [amount, setAmount] = useState(150000)
  const [cap, setCap] = useState(8000000)
  const [discount, setDiscount] = useState(20)
  const [roundPre, setRoundPre] = useState(0)

  // Ownership por cap: monto / cap post-money
  const capOwn = cap > 0 ? (amount / cap) * 100 : 0

  // Ownership por discount: aplica solo si hay valuación de la ronda priced
  const discEffVal = roundPre > 0 && discount > 0 ? roundPre * (1 - discount / 100) : 0
  const discOwn = discEffVal > 0 ? (amount / discEffVal) * 100 : 0

  const hasRound = roundPre > 0 && discount > 0
  // El SAFE convierte al precio que le da MÁS acciones al inversor (menor valuación efectiva)
  const capWins = !hasRound || capOwn >= discOwn
  const finalOwn = hasRound ? Math.max(capOwn, discOwn) : capOwn

  // ── Mascota reactiva según cuánto ownership entregas al convertir ──
  const mood: 'champ' | 'ok' | 'worried' | 'skull' =
    finalOwn < 6 ? 'champ' : finalOwn < 12 ? 'ok' : finalOwn < 20 ? 'worried' : 'skull'
  const moodHead =
    mood === 'champ' ? 'Conversión suave 😎'
    : mood === 'ok' ? 'Dilución razonable 🙂'
    : mood === 'worried' ? 'Ojo con esa dilución 😟'
    : 'Ese cap te diluye durísimo 💀'

  const prevMood = useRef(mood)
  useEffect(() => {
    if (mood === 'champ' && prevMood.current !== 'champ') burstConfetti()
    prevMood.current = mood
  }, [mood])

  const inputCls = 'w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20'
  const labelCls = 'block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5'

  return (
    <ToolLayout
      title="Calculadora de SAFE"
      description="Calcula cómo convierte tu SAFE en la ronda con precio: precio de conversión, ownership y si gana el cap o el discount. Gratis."
      icon="🧮"
    >
      <div className="grid md:grid-cols-[1fr_360px] gap-8 items-start">
        {/* ── INPUTS ── */}
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Monto invertido en el SAFE (USD)</label>
              <input type="number" min={0} className={inputCls} value={amount || ''} onChange={e => setAmount(Number(e.target.value))} />
            </div>
            <div>
              <label className={labelCls}>Post-money valuation cap (USD)</label>
              <input type="number" min={0} className={inputCls} value={cap || ''} onChange={e => setCap(Number(e.target.value))} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Discount (%) — opcional</label>
              <input type="number" min={0} max={99} className={inputCls} value={discount || ''} onChange={e => setDiscount(Number(e.target.value))} placeholder="0" />
            </div>
            <div>
              <label className={labelCls}>Pre-money de la ronda priced (USD) — opcional</label>
              <input type="number" min={0} className={inputCls} value={roundPre || ''} onChange={e => setRoundPre(Number(e.target.value))} placeholder="Para aplicar el discount" />
            </div>
          </div>

          {/* Comparación cap vs discount */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-white/[0.03] text-left">
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Base de conversión</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Valuación efectiva</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 text-right">Tu ownership</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                <tr className={`border-t border-slate-100 dark:border-white/[0.06] ${capWins ? 'bg-violet-50/60 dark:bg-violet-500/[0.06]' : ''}`}>
                  <td className="px-4 py-3 text-slate-900 dark:text-white font-semibold">
                    Por cap {capWins && <span className="text-violet-600 dark:text-violet-400 text-[10px] font-bold ml-1">GANA</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 tabular-nums">${fmtMoney(cap)}</td>
                  <td className="px-4 py-3 text-right text-slate-900 dark:text-white tabular-nums">{capOwn.toFixed(3)}%</td>
                </tr>
                <tr className={`border-t border-slate-100 dark:border-white/[0.06] ${!capWins ? 'bg-violet-50/60 dark:bg-violet-500/[0.06]' : ''}`}>
                  <td className="px-4 py-3 text-slate-900 dark:text-white font-semibold">
                    Por discount ({discount || 0}%) {hasRound && !capWins && <span className="text-violet-600 dark:text-violet-400 text-[10px] font-bold ml-1">GANA</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 tabular-nums">{hasRound ? `$${fmtMoney(discEffVal)}` : '—'}</td>
                  <td className="px-4 py-3 text-right text-slate-900 dark:text-white tabular-nums">{hasRound ? `${discOwn.toFixed(3)}%` : '—'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-4">
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <b className="text-slate-900 dark:text-white">Cómo funciona:</b> el SAFE convierte al precio que le da <b>más acciones</b> al
              inversionista — es decir, la <b>menor valuación efectiva</b>. Por eso un <b>cap bajo</b> suele
              diluirte más que un discount. El discount solo aplica cuando ya hay una ronda con precio;
              si no pones la valuación de la ronda, ves solo la conversión por cap.
            </p>
          </div>
        </div>

        {/* ── RESULT ── */}
        <div className="space-y-4 md:sticky md:top-20">
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-5 text-center">
            <div className="flex justify-center"><Mascot name={mood} size={130} /></div>
            <p className="text-base font-black text-slate-900 dark:text-white leading-tight">{moodHead}</p>
          </div>

          <div className="rounded-2xl border border-violet-200 dark:border-violet-500/25 bg-violet-50/60 dark:bg-violet-500/[0.06] p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-1">Ownership al convertir</p>
            <p className="text-4xl font-black text-violet-600 dark:text-violet-400 tabular-nums">{finalOwn.toFixed(3)}%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {hasRound
                ? <>Convierte <b>por {capWins ? 'cap' : 'discount'}</b> — la base que más te diluye.</>
                : <>Por cap (monto ÷ cap). Añade la valuación de la ronda para comparar con el discount.</>}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-5">
            <dl className="space-y-2 text-sm font-mono">
              <div className="flex justify-between"><dt className="text-slate-500">Monto</dt><dd className="text-slate-900 dark:text-white tabular-nums">${fmtMoney(amount)}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Cap</dt><dd className="text-slate-900 dark:text-white tabular-nums">${fmtMoney(cap)}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Discount</dt><dd className="text-slate-900 dark:text-white tabular-nums">{discount || 0}%</dd></div>
              {hasRound && <div className="flex justify-between"><dt className="text-slate-500">Ronda (pre)</dt><dd className="text-slate-900 dark:text-white tabular-nums">${fmtMoney(roundPre)}</dd></div>}
            </dl>
          </div>

          <LeadCTA
            hideMascot
            service="Calculadora de SAFE"
            headline="¿Tu cap te está diluyendo de más?"
            sub="Te ayudo a negociar el cap y el discount correctos."
            emailPitch="Déjame tu correo y te mando cómo negociar mejores términos."
            context={() => `Monto $${fmtMoney(amount)}, cap $${fmtMoney(cap)}, discount ${discount || 0}%${hasRound ? `, ronda pre $${fmtMoney(roundPre)}` : ''} → ownership ${finalOwn.toFixed(3)}%`}
            celebrate={false}
          />

          <p className="text-[11px] leading-relaxed text-slate-400 px-1">
            Estimación educativa. La dilución real depende del cap table completo, el option pool y los
            términos exactos de la ronda. No es consejo legal ni de inversión.
          </p>
        </div>
      </div>
    </ToolLayout>
  )
}
