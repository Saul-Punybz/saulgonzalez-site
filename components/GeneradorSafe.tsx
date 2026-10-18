'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import ToolLayout from '@/components/ToolLayout'
import Mascot from '@/components/tools/Mascot'
import { burstConfetti } from '@/components/tools/LeadCTA'

/* ── helpers ───────────────────────────────────────── */
const fmtMoney = (n: number) =>
  n > 0 ? n.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '0'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

/* ── Optional SAFE / side-letter clauses ───────────────
   risk: 'ok' (razonable) | 'caution' (cuidado) | 'danger' (solo bajo desesperación) */
type Risk = 'ok' | 'caution' | 'danger'
type Clause = {
  key: string; label: string; risk: Risk
  desc: string; notConv: string; doc: string
}

const CLAUSES: Clause[] = [
  {
    key: 'mfn', label: 'Most Favored Nation (MFN)', risk: 'caution',
    desc: 'Si más adelante emites otro instrumento con mejores términos, este inversor los recibe automáticamente.',
    notConv: 'No conviene si planeas varios SAFEs a términos distintos — te amarra a igualarle siempre el mejor trato.',
    doc: 'Most Favored Nation: If the Company issues any subsequent convertible security with terms more favorable to its holder prior to the termination of this Safe, the Company shall notify the Investor, and this Safe may be amended to include those more favorable terms.',
  },
  {
    key: 'proRata', label: 'Derechos de pro-rata', risk: 'ok',
    desc: 'El inversor puede invertir de nuevo en tu próxima ronda para mantener su porcentaje.',
    notConv: 'Con muchos inversionistas pequeños, dárselo a todos satura tu ronda con precio.',
    doc: 'Pro Rata Rights: The Investor shall have the right, pursuant to a side letter, to participate in subsequent equity financings to maintain its percentage ownership.',
  },
  {
    key: 'infoRights', label: 'Derechos de información', risk: 'ok',
    desc: 'Te comprometes a enviarle estados financieros y updates con cierta frecuencia.',
    notConv: 'Dárselo a cada cheque pequeño es carga administrativa y expone información sensible.',
    doc: 'Information Rights: The Company shall deliver to the Investor annual and quarterly financial statements and a capitalization table upon reasonable request.',
  },
  {
    key: 'boardObserver', label: 'Asiento de observador en el board', risk: 'caution',
    desc: 'El inversor asiste a las reuniones del board, pero sin voto.',
    notConv: 'En pre-seed rara vez conviene: ve todo e influye, y es difícil de quitar después.',
    doc: 'Board Observer: The Investor shall have the right to designate one representative to attend all meetings of the Board of Directors in a non-voting observer capacity.',
  },
  {
    key: 'boardSeat', label: 'Asiento con voto en el board', risk: 'danger',
    desc: 'El inversor obtiene un puesto CON voto en tu junta directiva.',
    notConv: 'Casi nunca en etapa SAFE: le das control real sobre tus decisiones. Solo bajo desesperación.',
    doc: 'Board Seat: The Investor shall have the right to designate one voting member of the Board of Directors. [Non-standard for a SAFE — significantly favors the Investor.]',
  },
  {
    key: 'liqPref', label: 'Preferencia de liquidación >1x', risk: 'danger',
    desc: 'En una venta, el inversor recupera 2x–3x su dinero ANTES que tú.',
    notConv: 'En una salida modesta puedes quedarte sin nada. Solo bajo desesperación.',
    doc: 'Liquidation Preference: Upon a Liquidity or Dissolution Event, the Investor shall be entitled to receive two times (2x) the Purchase Amount before any distribution to holders of Common Stock. [Non-standard for a SAFE — aggressive.]',
  },
  {
    key: 'participating', label: 'Preferencia participativa (double dip)', risk: 'danger',
    desc: 'Cobra su preferencia Y además participa en el resto como si tuviera acciones comunes.',
    notConv: 'Doble cobro a tu costa. Solo bajo desesperación.',
    doc: 'Participating Preferred: After receiving its liquidation preference, the Investor shall also participate pro rata with the holders of Common Stock in the remaining proceeds. [Aggressive — double dip.]',
  },
  {
    key: 'redemption', label: 'Derechos de redención', risk: 'danger',
    desc: 'El inversor puede exigirte que le devuelvas su dinero tras cierto tiempo.',
    notConv: 'Convierte tu equity en deuda; puede forzarte a una venta apurada. Solo bajo desesperación.',
    doc: 'Redemption Rights: At any time after five (5) years, the Investor may require the Company to repurchase this instrument for the Purchase Amount. [Converts equity into debt — very aggressive.]',
  },
  {
    key: 'superProRata', label: 'Súper pro-rata', risk: 'danger',
    desc: 'El inversor puede comprar MÁS de su porcentaje en futuras rondas.',
    notConv: 'Desplaza a los founders y a otros inversionistas. Solo bajo desesperación.',
    doc: 'Super Pro Rata Rights: The Investor shall have the right to purchase more than its pro rata share in subsequent financings. [Aggressive — crowds out founders and other investors.]',
  },
]

const RISK_META: Record<Risk, { label: string; dot: string; text: string; border: string; bg: string }> = {
  ok:      { label: 'Razonable',              dot: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/40', bg: 'bg-emerald-50/60 dark:bg-emerald-500/[0.06]' },
  caution: { label: 'Cuidado',                dot: 'bg-amber-500',   text: 'text-amber-600 dark:text-amber-400',     border: 'border-amber-500/40',   bg: 'bg-amber-50/60 dark:bg-amber-500/[0.06]' },
  danger:  { label: 'Solo bajo desesperación', dot: 'bg-red-500',     text: 'text-red-600 dark:text-red-400',         border: 'border-red-500/40',     bg: 'bg-red-50/60 dark:bg-red-500/[0.06]' },
}

/* ── SAFE document (post-money, valuation cap · standard YC-style) ── */
function buildSafeHtml(
  f: { company: string; state: string; investor: string; amount: number; cap: number; discount: number; date: string },
  active: Clause[],
) {
  const amount = `$${fmtMoney(f.amount)}`
  const cap = `$${fmtMoney(f.cap)}`
  const discountLine = f.discount > 0
    ? `<p><b>Discount Rate:</b> ${100 - f.discount}% (a ${f.discount}% discount to the price per share of the Standard Preferred Stock).</p>`
    : ''
  const hasDanger = active.some(c => c.risk === 'danger')
  const sideLetter = active.length
    ? `<h2>6. Additional Terms (Side Letter)</h2>
       ${hasDanger ? `<p style="color:#b91c1c"><b>Note:</b> One or more of the following terms are non-standard for a post-money SAFE and materially favor the Investor. They are typically only accepted under duress. Have counsel review before signing.</p>` : ''}
       ${active.map(c => `<p><b>${c.label}.</b> ${c.doc}</p>`).join('\n')}`
    : ''

  return `<!doctype html><html><head><meta charset="utf-8"><title>SAFE — ${f.company}</title>
<style>
  body{font-family:Georgia,'Times New Roman',serif;color:#111;max-width:760px;margin:40px auto;padding:0 32px;line-height:1.6;font-size:14px}
  h1{font-size:20px;text-align:center;letter-spacing:.04em}
  h2{font-size:15px;margin-top:26px;border-bottom:1px solid #ddd;padding-bottom:4px}
  .meta{background:#f6f3fe;border:1px solid #e3dbfb;border-radius:8px;padding:16px 20px;margin:20px 0}
  .meta p{margin:4px 0}
  .disc{background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:12px 16px;font-size:12px;color:#7c2d12;margin:20px 0}
  .sig{margin-top:40px;display:flex;justify-content:space-between;gap:40px}
  .sig div{flex:1}
  .line{border-top:1px solid #333;margin-top:38px;padding-top:4px;font-size:12px}
  small{color:#555}
</style></head><body>
<h1>SAFE<br><small>(Simple Agreement for Future Equity)</small></h1>

<div class="disc">
  <b>Aviso:</b> Documento educativo generado a partir de la plantilla estándar post-money de Y Combinator.
  No constituye consejo legal ni de inversión. Revísalo con un abogado antes de firmar.
</div>

<p>THIS CERTIFIES THAT in exchange for the payment by <b>${f.investor}</b> (the “Investor”)
of <b>${amount}</b> (the “Purchase Amount”) on or about <b>${f.date}</b>,
<b>${f.company}</b>, a ${f.state} corporation (the “Company”), issues to the Investor the right
to certain shares of the Company’s capital stock, subject to the terms set forth below.</p>

<div class="meta">
  <p><b>Post-Money Valuation Cap:</b> ${cap}</p>
  ${discountLine}
  <p><b>Governing Law:</b> State of ${f.state}, United States.</p>
</div>

<p>This Safe is one of the forms available at ycombinator.com and the Company and the Investor
agree that neither one has modified the form, except to fill in blanks, bracketed terms and the
additional terms (if any) set forth in Section 6.</p>

<h2>1. Events</h2>
<p><b>(a) Equity Financing.</b> If there is an Equity Financing before the termination of this Safe,
on the initial closing of such Equity Financing, this Safe will automatically convert into the number
of shares of Safe Preferred Stock equal to the Purchase Amount divided by the Conversion Price.</p>
<p><b>(b) Liquidity Event.</b> If there is a Liquidity Event before the termination of this Safe, the
Investor will automatically be entitled to receive a portion of Proceeds equal to the greater of the
Purchase Amount (the “Cash-Out Amount”) or the amount payable on the number of shares of Common Stock
equal to the Purchase Amount divided by the Liquidity Price.</p>
<p><b>(c) Dissolution Event.</b> If there is a Dissolution Event before this Safe terminates, the
Investor will be entitled to receive a portion of Proceeds equal to the Cash-Out Amount.</p>
<p><b>(d) Termination.</b> This Safe will terminate upon the earlier of the issuance of stock to the
Investor in an Equity Financing, or the payment of amounts due on a Liquidity or Dissolution Event.</p>

<h2>2. Definitions</h2>
<p><b>“Post-Money Valuation Cap”</b> means ${cap}.</p>
<p><b>“Conversion Price”</b> means the price per share equal to the Post-Money Valuation Cap divided by
the Company Capitalization${f.discount > 0 ? ', or, if lower, the Discount Price' : ''}.</p>
<p><b>“Equity Financing”</b> means a bona fide transaction with the principal purpose of raising
capital, pursuant to which the Company issues and sells Preferred Stock at a fixed valuation.</p>

<h2>3. Company Representations</h2>
<p>The Company is duly organized, validly existing and in good standing under the laws of the State of
${f.state}, and has the power and authority to execute this Safe.</p>

<h2>4. Investor Representations</h2>
<p>The Investor has full power and authority to execute this Safe, is an accredited investor, and is
purchasing this Safe for its own account and not with a view to distribution.</p>

<h2>5. Miscellaneous</h2>
<p>Any provision of this Safe may be amended or waived by written consent of the Company and the
Investor. This Safe shall be governed by the laws of the State of ${f.state}.</p>

${sideLetter}

<div class="sig">
  <div><div class="line"><b>${f.company}</b><br>By: ________________________<br>Name / Title</div></div>
  <div><div class="line"><b>${f.investor}</b><br>By: ________________________<br>Investor</div></div>
</div>

<p style="margin-top:30px;font-size:11px;color:#888">Generado con Levanta · saulgonzalez.pro/tools/generador-safe — plantilla educativa, no consejo legal.</p>
</body></html>`
}

export default function GeneradorSafe() {
  const tsRef = useRef<number>(0)
  useEffect(() => { tsRef.current = Date.now() }, [])

  const [f, setF] = useState({
    company: '', state: 'Delaware', investor: '', amount: 150000,
    cap: 8000000, discount: 0, date: todayISO(),
  })
  const [clauses, setClauses] = useState<Record<string, boolean>>({})
  const [unlocked, setUnlocked] = useState(false)
  useEffect(() => { if (unlocked) burstConfetti() }, [unlocked])
  const [gate, setGate] = useState({ name: '', email: '' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [hp, setHp] = useState('')

  const set = (k: string, v: string | number) => setF(s => ({ ...s, [k]: v }))
  const toggle = (k: string) => setClauses(c => ({ ...c, [k]: !c[k] }))
  const active = CLAUSES.filter(c => clauses[c.key])
  const dangerCount = active.filter(c => c.risk === 'danger').length
  const showRed = dangerCount > 0
  const showAmber = !showRed && active.length >= 3
  const ownership = f.cap > 0 ? (f.amount / f.cap) * 100 : 0
  const ready = f.company.trim() && f.investor.trim() && f.amount > 0 && f.cap > 0

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
          name: gate.name, email: gate.email, company: f.company,
          service: 'Generador de SAFE', stage: 'lead-magnet',
          message: `Generó un SAFE — monto $${fmtMoney(f.amount)}, cap $${fmtMoney(f.cap)}, ${active.length} cláusulas extra`,
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
    const blob = new Blob(['﻿', buildSafeHtml(f, active)], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `SAFE-${f.company.replace(/[^a-z0-9]+/gi, '-') || 'documento'}.doc`
    a.click()
    URL.revokeObjectURL(url)
  }

  function printPdf() {
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(buildSafeHtml(f, active))
    w.document.close()
    w.focus()
    setTimeout(() => w.print(), 350)
  }

  const inputCls = 'w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20'
  const labelCls = 'block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5'

  return (
    <ToolLayout
      title="Generador de SAFE"
      description="Llena el formulario y descarga tu SAFE completo (Word + PDF), sobre la plantilla estándar post-money de Y Combinator. Gratis."
      icon="📄"
    >
      <div className="grid md:grid-cols-[1fr_360px] gap-8 items-start">
        {/* ── FORM ── */}
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Nombre de la empresa</label>
              <input className={inputCls} value={f.company} onChange={e => set('company', e.target.value)} placeholder="Acme Inc." />
            </div>
            <div>
              <label className={labelCls}>Estado de incorporación</label>
              <input className={inputCls} value={f.state} onChange={e => set('state', e.target.value)} placeholder="Delaware" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Nombre del inversionista</label>
            <input className={inputCls} value={f.investor} onChange={e => set('investor', e.target.value)} placeholder="Jane Investor / Fondo XYZ" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Monto de inversión (USD)</label>
              <input type="number" min={0} className={inputCls} value={f.amount || ''} onChange={e => set('amount', Number(e.target.value))} />
            </div>
            <div>
              <label className={labelCls}>Post-money valuation cap (USD)</label>
              <input type="number" min={0} className={inputCls} value={f.cap || ''} onChange={e => set('cap', Number(e.target.value))} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Discount (%) — opcional</label>
              <input type="number" min={0} max={99} className={inputCls} value={f.discount || ''} onChange={e => set('discount', Number(e.target.value))} placeholder="0" />
            </div>
            <div>
              <label className={labelCls}>Fecha</label>
              <input type="date" className={inputCls} value={f.date} onChange={e => set('date', e.target.value)} />
            </div>
          </div>

          {/* ── CLÁUSULAS OPCIONALES ── */}
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <label className={labelCls + ' mb-0'}>Cláusulas opcionales</label>
              <span className="text-xs text-slate-400">{active.length} activa{active.length === 1 ? '' : 's'}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Cada cláusula que activas le da algo al inversor. Verde = razonable · ámbar = con cuidado · rojo = <b>solo bajo desesperación</b>.
            </p>

            {/* Warning banner */}
            {showRed && (
              <div className="mb-4 rounded-xl border border-red-500/40 bg-red-50 dark:bg-red-500/[0.08] p-4">
                <p className="text-sm font-bold text-red-700 dark:text-red-400">⚠️ Estás cediendo demasiado</p>
                <p className="text-xs text-red-700/90 dark:text-red-300/90 mt-1 leading-relaxed">
                  Activaste {dangerCount} cláusula{dangerCount === 1 ? '' : 's'} que un inversor razonable <b>no pide en pre-seed</b>. Cada una reduce tu control o tu upside y te debilita en la Serie A. Solo se aceptan bajo desesperación real — y aun así, negocia.
                </p>
              </div>
            )}
            {showAmber && (
              <div className="mb-4 rounded-xl border border-amber-500/40 bg-amber-50 dark:bg-amber-500/[0.08] p-4">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Llevas {active.length} cláusulas activas</p>
                <p className="text-xs text-amber-700/90 dark:text-amber-300/90 mt-1">Cada término que cedes hoy te pesa en la próxima ronda. Menos es más.</p>
              </div>
            )}

            <div className="space-y-2.5">
              {CLAUSES.map(c => {
                const on = !!clauses[c.key]
                const m = RISK_META[c.risk]
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => toggle(c.key)}
                    className={`w-full text-left rounded-xl border p-3.5 transition-all ${on ? `${m.border} ${m.bg}` : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/20'}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center text-[11px] font-bold ${on ? 'bg-violet-600 border-violet-600 text-white' : 'border-slate-300 dark:border-white/20 text-transparent'}`}>✓</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">{c.label}</span>
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide ${m.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />{m.label}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{c.desc}</p>
                        {on && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                            <b className={m.text}>Cuándo ya no conviene:</b> {c.notConv}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* honeypot */}
          <input type="text" value={hp} onChange={e => setHp(e.target.value)} tabIndex={-1} autoComplete="off"
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
        </div>

        {/* ── PREVIEW / DOWNLOAD ── */}
        <div className="space-y-4 md:sticky md:top-20">
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">Vista previa</p>
            <dl className="space-y-2 text-sm font-mono">
              <div className="flex justify-between"><dt className="text-slate-500">Empresa</dt><dd className="text-slate-900 dark:text-white font-semibold text-right">{f.company || '—'}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Monto</dt><dd className="text-slate-900 dark:text-white tabular-nums">${fmtMoney(f.amount)}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Cap</dt><dd className="text-slate-900 dark:text-white tabular-nums">${fmtMoney(f.cap)}</dd></div>
              {f.discount > 0 && <div className="flex justify-between"><dt className="text-slate-500">Discount</dt><dd className="text-slate-900 dark:text-white tabular-nums">{f.discount}%</dd></div>}
              <div className="flex justify-between"><dt className="text-slate-500">Cláusulas extra</dt><dd className={`tabular-nums font-semibold ${dangerCount > 0 ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>{active.length}</dd></div>
            </dl>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
              <p className="text-xs text-slate-500 mb-1">Ownership al convertir (aprox.)</p>
              <p className="text-3xl font-black text-violet-600 dark:text-violet-400 tabular-nums">{ownership.toFixed(3)}%</p>
              <p className="text-[11px] text-slate-400 mt-1">Monto ÷ cap post-money. La dilución real depende de la ronda.</p>
            </div>
          </div>

          {!ready ? (
            <p className="text-sm text-slate-400 text-center px-4">Completa empresa, inversionista, monto y cap para generar.</p>
          ) : !unlocked ? (
            <form onSubmit={unlock} className="rounded-2xl border border-violet-200 dark:border-violet-500/25 bg-violet-50/60 dark:bg-violet-500/[0.06] p-5 space-y-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Descarga gratis tu SAFE</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Déjame dónde enviártelo y desbloqueas la descarga.</p>
              <input className={inputCls} placeholder="Tu nombre" value={gate.name} onChange={e => setGate(g => ({ ...g, name: e.target.value }))} />
              <input className={inputCls} type="email" placeholder="tu@email.com" value={gate.email} onChange={e => setGate(g => ({ ...g, email: e.target.value }))} />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button type="submit" disabled={sending} className="w-full btn-gradient text-white font-bold text-sm py-3 rounded-xl disabled:opacity-60">
                {sending ? 'Un momento…' : 'Desbloquear descarga →'}
              </button>
              <p className="text-[10px] text-slate-400 text-center">Sin spam. Puedes darte de baja cuando quieras.</p>
            </form>
          ) : (
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/25 bg-emerald-50/60 dark:bg-emerald-500/[0.06] p-5 space-y-3 text-center">
              <div className="flex justify-center"><Mascot name="party" size={100} /></div>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">✓ Listo — descarga tu SAFE</p>
              <button onClick={downloadWord} className="w-full btn-gradient text-white font-bold text-sm py-3 rounded-xl">Descargar Word (.doc)</button>
              <button onClick={printPdf} className="w-full border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-violet-500 hover:text-violet-600 font-semibold text-sm py-3 rounded-xl transition-colors">Descargar / Imprimir PDF</button>
              <Link href="/#contacto" className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline block pt-1">o agenda una consulta gratis 1:1 →</Link>
            </div>
          )}

          <p className="text-[11px] leading-relaxed text-slate-400 px-1">
            Herramienta educativa — no es consejo legal ni de inversión. Basada en la plantilla estándar
            post-money de Y Combinator. Revisa el documento con un abogado antes de firmar.
          </p>
        </div>
      </div>
    </ToolLayout>
  )
}
