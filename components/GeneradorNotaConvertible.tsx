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
function plusMonthsISO(months: number) {
  const d = new Date()
  d.setMonth(d.getMonth() + months)
  return d.toISOString().slice(0, 10)
}
function yearsBetween(from: string, to: string) {
  const a = new Date(from).getTime()
  const b = new Date(to).getTime()
  if (isNaN(a) || isNaN(b) || b <= a) return 0
  return (b - a) / (365.25 * 24 * 60 * 60 * 1000)
}

/* ── Convertible note document (standard convertible promissory note) ── */
function buildNoteHtml(f: {
  company: string; state: string; investor: string; amount: number
  cap: number; discount: number; interest: number; maturity: string; date: string; mfn: boolean
}) {
  const amount = `$${fmtMoney(f.amount)}`
  const cap = `$${fmtMoney(f.cap)}`
  const discountText = f.discount > 0
    ? `the lower of (i) the price per share based on the Valuation Cap of ${cap}, or (ii) ${100 - f.discount}% of the price per share paid by other investors in the Qualifying Financing (a ${f.discount}% discount)`
    : `the price per share based on the Valuation Cap of ${cap}`
  const mfnLine = f.mfn
    ? `<p><b>Most Favored Nation:</b> If the Company issues any subsequent convertible security with terms more favorable to its holder prior to conversion or repayment of this Note, the Company shall notify the Holder, and this Note may be amended to include those more favorable terms.</p>`
    : ''

  return `<!doctype html><html><head><meta charset="utf-8"><title>Convertible Note — ${f.company}</title>
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
<h1>CONVERTIBLE PROMISSORY NOTE<br><small>(Nota Convertible)</small></h1>

<div class="disc">
  <b>Aviso:</b> Documento educativo generado con Levanta. No constituye consejo legal ni de inversión.
  Revísalo con un abogado antes de firmar.
</div>

<p>FOR VALUE RECEIVED, <b>${f.company}</b>, a ${f.state} corporation (the “Company”), hereby
promises to pay to <b>${f.investor}</b> (the “Holder”) the principal sum of <b>${amount}</b> (the
“Principal”), advanced on or about <b>${f.date}</b>, together with interest thereon, subject to the
terms set forth below.</p>

<div class="meta">
  <p><b>Principal:</b> ${amount}</p>
  <p><b>Interest Rate:</b> ${f.interest}% per annum (simple)</p>
  <p><b>Maturity Date:</b> ${f.maturity}</p>
  <p><b>Valuation Cap:</b> ${cap}</p>
  ${f.discount > 0 ? `<p><b>Discount Rate:</b> ${f.discount}%</p>` : ''}
  <p><b>Governing Law:</b> State of ${f.state}, United States.</p>
</div>

<h2>1. Interest</h2>
<p>This Note shall accrue simple interest on the outstanding Principal at a rate of ${f.interest}%
per annum, computed on the basis of a 365-day year, from the date of advance until the Principal
and all accrued interest are converted or repaid in full.</p>

<h2>2. Conversion</h2>
<p><b>(a) Automatic Conversion.</b> Upon the closing of the next bona fide equity financing in which
the Company raises capital by issuing Preferred Stock (a “Qualifying Financing”) prior to the
Maturity Date, the outstanding Principal and all accrued interest shall automatically convert into
shares of the Preferred Stock issued in such Qualifying Financing at a price per share equal to
${discountText}.</p>
<p><b>(b) No Fractional Shares.</b> No fractional shares shall be issued upon conversion; any
fractional share shall be rounded down and paid in cash.</p>

<h2>3. Maturity</h2>
<p>If this Note has not been converted pursuant to Section 2 on or before the Maturity Date, then at
the election of the Holder the Company shall either (i) repay the outstanding Principal together
with all accrued and unpaid interest, or (ii) convert the outstanding Principal and accrued interest
into shares of the Company’s Common or Preferred Stock at a price per share based on the Valuation
Cap.</p>

<h2>4. Prepayment</h2>
<p>The Company may not prepay this Note prior to the Maturity Date without the prior written consent
of the Holder.</p>

<h2>5. Representations</h2>
<p>The Company is duly organized, validly existing and in good standing under the laws of the State
of ${f.state}, and has the power and authority to execute this Note. The Holder has full power and
authority to execute this Note, is an accredited investor, and is acquiring this Note for its own
account and not with a view to distribution.</p>

<h2>6. Miscellaneous</h2>
<p>Any provision of this Note may be amended or waived by written consent of the Company and the
Holder. This Note shall be governed by the laws of the State of ${f.state}, without regard to its
conflict of law provisions.</p>
${mfnLine}

<div class="sig">
  <div><div class="line"><b>${f.company}</b><br>By: ________________________<br>Name / Title</div></div>
  <div><div class="line"><b>${f.investor}</b><br>By: ________________________<br>Holder</div></div>
</div>

<p style="margin-top:30px;font-size:11px;color:#888">Generado con Levanta · saulgonzalez.pro/tools/generador-nota-convertible — plantilla educativa, no consejo legal.</p>
</body></html>`
}

export default function GeneradorNotaConvertible() {
  const tsRef = useRef<number>(0)
  useEffect(() => { tsRef.current = Date.now() }, [])

  const [f, setF] = useState({
    company: '', state: 'Delaware', investor: '', amount: 150000,
    cap: 8000000, discount: 20, interest: 6, maturity: plusMonthsISO(24), date: todayISO(), mfn: false,
  })
  const [unlocked, setUnlocked] = useState(false)
  useEffect(() => { if (unlocked) burstConfetti() }, [unlocked])
  const [gate, setGate] = useState({ name: '', email: '' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [hp, setHp] = useState('')

  const set = (k: string, v: string | number | boolean) => setF(s => ({ ...s, [k]: v }))
  const ownership = f.cap > 0 ? (f.amount / f.cap) * 100 : 0
  const years = yearsBetween(f.date, f.maturity)
  const accrued = f.amount * (f.interest / 100) * years
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
          service: 'Generador de nota convertible', stage: 'lead-magnet',
          message: `Generó una nota convertible — principal $${fmtMoney(f.amount)}, ${f.interest}% interés, cap $${fmtMoney(f.cap)}`,
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
    const blob = new Blob(['﻿', buildNoteHtml(f)], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Nota-Convertible-${f.company.replace(/[^a-z0-9]+/gi, '-') || 'documento'}.doc`
    a.click()
    URL.revokeObjectURL(url)
  }

  function printPdf() {
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(buildNoteHtml(f))
    w.document.close()
    w.focus()
    setTimeout(() => w.print(), 350)
  }

  const inputCls = 'w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20'
  const labelCls = 'block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5'

  return (
    <ToolLayout
      title="Generador de nota convertible"
      description="Llena el formulario y descarga tu nota convertible completa (Word + PDF): principal, interés, vencimiento, cap y discount. Gratis, en español."
      icon="📝"
    >
      <div className="grid md:grid-cols-[1fr_360px] gap-8 items-start">
        {/* ── FORM ── */}
        <div className="space-y-5">
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
            <label className={labelCls}>Nombre del inversionista (prestamista)</label>
            <input className={inputCls} value={f.investor} onChange={e => set('investor', e.target.value)} placeholder="Jane Investor / Fondo XYZ" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Principal / monto (USD)</label>
              <input type="number" min={0} className={inputCls} value={f.amount || ''} onChange={e => set('amount', Number(e.target.value))} />
            </div>
            <div>
              <label className={labelCls}>Valuation cap (USD)</label>
              <input type="number" min={0} className={inputCls} value={f.cap || ''} onChange={e => set('cap', Number(e.target.value))} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Tasa de interés anual (%)</label>
              <input type="number" min={0} max={99} step={0.1} className={inputCls} value={f.interest || ''} onChange={e => set('interest', Number(e.target.value))} placeholder="6" />
            </div>
            <div>
              <label className={labelCls}>Discount (%) — opcional</label>
              <input type="number" min={0} max={99} className={inputCls} value={f.discount || ''} onChange={e => set('discount', Number(e.target.value))} placeholder="20" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Fecha de emisión</label>
              <input type="date" className={inputCls} value={f.date} onChange={e => set('date', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Fecha de vencimiento</label>
              <input type="date" className={inputCls} value={f.maturity} onChange={e => set('maturity', e.target.value)} />
            </div>
          </div>

          <label className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
            <input type="checkbox" checked={f.mfn} onChange={e => set('mfn', e.target.checked)} className="w-4 h-4 accent-violet-600" />
            Incluir cláusula MFN (Most Favored Nation)
          </label>

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
              <div className="flex justify-between"><dt className="text-slate-500">Principal</dt><dd className="text-slate-900 dark:text-white tabular-nums">${fmtMoney(f.amount)}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Interés</dt><dd className="text-slate-900 dark:text-white tabular-nums">{f.interest}%/año</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Cap</dt><dd className="text-slate-900 dark:text-white tabular-nums">${fmtMoney(f.cap)}</dd></div>
            </dl>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 space-y-3">
              <div>
                <p className="text-xs text-slate-500 mb-1">Interés acumulado al vencimiento (aprox.)</p>
                <p className="text-2xl font-black text-violet-600 dark:text-violet-400 tabular-nums">${fmtMoney(Math.round(accrued))}</p>
                <p className="text-[11px] text-slate-400 mt-1">Interés simple sobre {years.toFixed(1)} años. Total a convertir ≈ ${fmtMoney(Math.round(f.amount + accrued))}.</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Ownership por el cap (aprox.)</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">{ownership.toFixed(3)}%</p>
              </div>
            </div>
          </div>

          {!ready ? (
            <p className="text-sm text-slate-400 text-center px-4">Completa empresa, inversionista, principal y cap para generar.</p>
          ) : !unlocked ? (
            <form onSubmit={unlock} className="rounded-2xl border border-violet-200 dark:border-violet-500/25 bg-violet-50/60 dark:bg-violet-500/[0.06] p-5 space-y-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Descarga gratis tu nota</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Déjame dónde enviártela y desbloqueas la descarga.</p>
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
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">✓ Listo — descarga tu nota</p>
              <button onClick={downloadWord} className="w-full btn-gradient text-white font-bold text-sm py-3 rounded-xl">Descargar Word (.doc)</button>
              <button onClick={printPdf} className="w-full border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-violet-500 hover:text-violet-600 font-semibold text-sm py-3 rounded-xl transition-colors">Descargar / Imprimir PDF</button>
              <Link href="/#contacto" className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline block pt-1">o agenda una consulta gratis 1:1 →</Link>
            </div>
          )}

          <p className="text-[11px] leading-relaxed text-slate-400 px-1">
            Herramienta educativa — no es consejo legal ni de inversión. Una nota convertible es deuda
            que convierte en equity. Revisa el documento con un abogado antes de firmar.
          </p>
        </div>
      </div>
    </ToolLayout>
  )
}
