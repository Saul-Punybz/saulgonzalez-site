'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Lottie from 'lottie-react'
import confetti from 'canvas-confetti'
import ToolLayout from '@/components/ToolLayout'
import champAnim from '@/public/lottie/champ.json'
import okAnim from '@/public/lottie/ok.json'
import worriedAnim from '@/public/lottie/worried.json'
import skullAnim from '@/public/lottie/skull.json'

/* ── severidad ─────────────────────────────────────── */
type Sev = 'moderado' | 'alto' | 'critico'
type Flag = {
  key: string; label: string; sev: Sev; weight: number
  meaning: string; danger: string; rec: string
}

const SEV_META: Record<Sev, { label: string; dot: string; text: string; border: string; bg: string }> = {
  moderado: { label: 'Moderado', dot: 'bg-amber-500',  text: 'text-amber-600 dark:text-amber-400',   border: 'border-amber-500/40',  bg: 'bg-amber-50/60 dark:bg-amber-500/[0.06]' },
  alto:     { label: 'Alto',     dot: 'bg-orange-500', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-500/40', bg: 'bg-orange-50/60 dark:bg-orange-500/[0.06]' },
  critico:  { label: 'Crítico',  dot: 'bg-red-500',    text: 'text-red-600 dark:text-red-400',       border: 'border-red-500/40',    bg: 'bg-red-50/60 dark:bg-red-500/[0.06]' },
}

const FLAGS: Flag[] = [
  {
    key: 'liqPref', label: 'Liquidation preference múltiple (2x / 3x)', sev: 'critico', weight: 3,
    meaning: 'El inversor recupera 2x o 3x su inversión antes de que tú veas un dólar en una venta.',
    danger: 'En una salida modesta te puedes quedar con casi nada aunque tengas la mayoría de las acciones.',
    rec: 'Empuja a 1x non-participating (el estándar limpio). Cualquier múltiplo >1x es señal de alarma.',
  },
  {
    key: 'participating', label: 'Participating preferred (double dip)', sev: 'critico', weight: 3,
    meaning: 'El inversor cobra su preferencia Y ADEMÁS participa en el resto como si tuviera comunes.',
    danger: 'Cobra dos veces del mismo pastel — tu upside se desploma en cualquier exit.',
    rec: 'Pide non-participating. Si insisten, negocia un cap (ej. 1x preference + participación hasta 3x).',
  },
  {
    key: 'fullRatchet', label: 'Full-ratchet anti-dilution', sev: 'critico', weight: 3,
    meaning: 'Si haces una ronda a menor valuación, el precio del inversor se reajusta al nuevo, más bajo.',
    danger: 'Un down-round te diluye brutalmente a ti y al equipo — el inversor queda protegido a tu costa.',
    rec: 'Pide "weighted-average broad-based", que es el estándar justo. Full-ratchet es predatorio.',
  },
  {
    key: 'redemption', label: 'Redemption rights (recompra en 3-5 años)', sev: 'critico', weight: 3,
    meaning: 'El inversor puede exigir que la empresa le recompre sus acciones tras cierto tiempo.',
    danger: 'Convierte el equity en deuda: puede forzar una venta apurada o quebrar tu caja.',
    rec: 'Elimínalo. Si no, aleja el plazo y ata la recompra a que haya caja disponible legalmente.',
  },
  {
    key: 'guaranteedExit', label: 'Guaranteed exit / IRR mínimo', sev: 'critico', weight: 3,
    meaning: 'Te comprometes a lograr una venta o un retorno mínimo (ej. 25% IRR) en X años.',
    danger: 'Te pone una soga: si no vendes a tiempo, se activan penalidades o ventas forzadas.',
    rec: 'Recházalo. Ningún founder debe garantizar un retorno — el riesgo es la esencia del VC.',
  },
  {
    key: 'optionPool', label: 'Option pool >20% pre-money', sev: 'alto', weight: 2,
    meaning: 'Se crea un pool de opciones grande ANTES de la inversión, saliendo solo de tu equity.',
    danger: 'Es dilución disfrazada: el pool grande baja tu valuación efectiva y te diluye solo a ti.',
    rec: 'Negocia el pool según el plan de contratación real (10-15% suele bastar) y post-money si puedes.',
  },
  {
    key: 'dragAlong', label: 'Drag-along agresivo', sev: 'alto', weight: 2,
    meaning: 'Una minoría de inversores puede forzar la venta de la empresa y obligarte a vender.',
    danger: 'Pierdes control sobre cuándo y a quién vendes, incluso si no te conviene.',
    rec: 'Pide que el drag requiera mayoría de comunes + del board, no solo del inversor.',
  },
  {
    key: 'boardControl', label: 'Control del board para el inversor (mayoría o veto amplio)', sev: 'alto', weight: 2,
    meaning: 'El inversor obtiene mayoría del board o derechos de veto sobre muchas decisiones.',
    danger: 'En una seed/pre-seed es demasiado: pierdes el control operativo de tu propia empresa.',
    rec: 'Mantén board 2-1 a favor de founders en etapa temprana; limita los vetos a temas mayores.',
  },
  {
    key: 'reVesting', label: 'Founder re-vesting (revesting de acciones ya ganadas)', sev: 'alto', weight: 2,
    meaning: 'Tus acciones ya "vesteadas" vuelven a un nuevo calendario de 4 años.',
    danger: 'Si sales o te sacan temprano, pierdes acciones que ya te habías ganado con años de trabajo.',
    rec: 'Da crédito por el tiempo ya trabajado y negocia aceleración si te despiden sin causa.',
  },
  {
    key: 'cumDividends', label: 'Cumulative dividends', sev: 'moderado', weight: 1,
    meaning: 'Se acumulan dividendos (ej. 8% anual) a favor del inversor aunque no se paguen.',
    danger: 'Aumenta silenciosamente la preferencia de liquidación con el tiempo, comiéndose tu upside.',
    rec: 'Pide dividendos "non-cumulative" y solo si los declara el board. Evita el 8% acumulado.',
  },
  {
    key: 'superProRata', label: 'Súper pro-rata', sev: 'moderado', weight: 1,
    meaning: 'El inversor puede comprar MÁS de su porcentaje en futuras rondas.',
    danger: 'Desplaza a nuevos inversores y te quita margen para armar la próxima ronda.',
    rec: 'Limítalo a pro-rata simple (mantener su %). El súper pro-rata es innecesario en seed.',
  },
  {
    key: 'mfnBroad', label: 'MFN sobre-amplio', sev: 'moderado', weight: 1,
    meaning: 'El inversor recibe automáticamente cualquier término mejor que des a otro, sin límite.',
    danger: 'Te amarra las manos para negociar con futuros inversores a términos distintos.',
    rec: 'Acótalo a la misma ronda/instrumento y con fecha de expiración.',
  },
]

/* ── mascota: 4 estados (Lottie — Google Noto Animated Emoji) ── */
type Mood = 'champ' | 'ok' | 'worried' | 'danger'

const MOOD_ANIM: Record<Mood, unknown> = {
  champ: champAnim, ok: okAnim, worried: worriedAnim, danger: skullAnim,
}

function Mascot({ mood }: { mood: Mood }) {
  return (
    // key={mood} remounts on change → pop-in animation fires every transition
    <div key={mood} className={`lv-mascot lv-pop ${mood === 'danger' ? 'lv-shake' : ''} ${mood === 'champ' ? 'lv-glow-good' : mood === 'danger' ? 'lv-glow-bad' : ''}`} aria-hidden="true">
      <Lottie
        animationData={MOOD_ANIM[mood] as object}
        loop
        autoplay
        style={{ width: 140, height: 140 }}
      />
      {mood === 'danger' && (
        <svg className="lv-xoverlay" width="140" height="140" viewBox="0 0 140 140">
          <g className="lv-xmark" stroke="#ef4444" strokeWidth="11" strokeLinecap="round">
            <line x1="30" y1="30" x2="110" y2="110" />
            <line x1="110" y1="30" x2="30" y2="110" />
          </g>
        </svg>
      )}
    </div>
  )
}

export default function RedFlagsTermSheet() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const toggle = (k: string) => setChecked(c => ({ ...c, [k]: !c[k] }))

  const tsRef = useRef<number>(0)
  useEffect(() => { tsRef.current = Date.now() }, [])
  const [gate, setGate] = useState({ name: '', email: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [err, setErr] = useState('')
  const [hp, setHp] = useState('')

  const flagged = FLAGS.filter(f => checked[f.key])
  const score = flagged.reduce((s, f) => s + f.weight, 0)
  const criticoCount = flagged.filter(f => f.sev === 'critico').length
  const maxScore = FLAGS.reduce((s, f) => s + f.weight, 0)
  const ratio = score / maxScore

  let mood: Mood
  let verdict: { title: string; text: string }
  if (flagged.length === 0) {
    mood = 'champ'
    verdict = { title: '¡Term sheet limpio! 😎', text: 'No marcaste ninguna cláusula predatoria. Vas bien — aun así, dale una última leída con tu abogado.' }
  } else if (criticoCount > 0 || ratio >= 0.45) {
    mood = 'danger'
    verdict = { title: '☠️ Term sheet tóxico', text: `Marcaste ${criticoCount || 'varias'} cláusula${criticoCount === 1 ? '' : 's'} que pueden dejarte sin empresa o sin upside. NO firmes esto solo — negócialo primero.` }
  } else if (ratio >= 0.18) {
    mood = 'worried'
    verdict = { title: '😟 Ojo, hay que negociar', text: 'No hay nada mortal, pero sí términos que te restan. Empújalos antes de firmar.' }
  } else {
    mood = 'ok'
    verdict = { title: '🙂 Casi limpio', text: 'Un par de detalles menores. Fáciles de negociar — no te cuesta pedir que los quiten.' }
  }

  // ── efectos dramáticos al cambiar de estado ──
  const prevMood = useRef<Mood | null>(null)
  const [flash, setFlash] = useState(false)
  useEffect(() => {
    const prev = prevMood.current
    if (prev && prev !== mood) {
      if (mood === 'champ') {
        // 🎉 celebración al dejarlo limpio
        const shots = [{ x: 0.15, a: 60 }, { x: 0.85, a: 120 }]
        shots.forEach(s => confetti({ particleCount: 90, spread: 70, angle: s.a, origin: { x: s.x, y: 0.7 }, colors: ['#7030EF', '#12A386', '#FF6F61', '#fab800'] }))
      } else if (mood === 'danger') {
        // 💥 flash rojo al volverse tóxico
        setFlash(true)
        setTimeout(() => setFlash(false), 500)
      }
    }
    prevMood.current = mood
  }, [mood])

  const moodBg: Record<Mood, string> = {
    champ:   'from-emerald-500/15 to-emerald-500/5 border-emerald-500/30',
    ok:      'from-emerald-500/12 to-transparent border-emerald-500/25',
    worried: 'from-amber-500/15 to-transparent border-amber-500/30',
    danger:  'from-red-500/20 to-red-500/5 border-red-500/40',
  }
  const barTone = mood === 'danger' ? 'bg-red-500' : mood === 'worried' ? 'bg-amber-500' : 'bg-emerald-500'
  const isBad = mood === 'danger' || mood === 'worried'

  async function submitLead(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    if (!gate.name.trim() || !gate.email.includes('@')) {
      setErr('Escribe tu nombre y un email válido.')
      return
    }
    setSending(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: gate.name, email: gate.email,
          service: 'Red-flags de term sheet', stage: 'lead-magnet',
          message: `Analizó su term sheet — score ${score}/${maxScore}, ${flagged.length} cláusulas (${criticoCount} críticas): ${flagged.map(f => f.label).join('; ')}`,
          _hp: hp, _ts: tsRef.current,
        }),
      })
      setSent(true)
    } catch {
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <ToolLayout
      title="Red-flags de term sheet"
      description="Marca las cláusulas de tu term sheet y descubre si es limpio o tóxico. Tu mascota reacciona en tiempo real. Gratis."
      icon="🚩"
    >
      <div className="grid md:grid-cols-[1fr_340px] gap-8 items-start">
        {/* ── LISTA DE CLÁUSULAS ── */}
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
            Marca cada cláusula que aparezca en tu term sheet y mira cómo reacciona tu mascota 👉 Ámbar = moderado · naranja = alto · rojo = <b>crítico</b>.
          </p>
          <div className="space-y-2.5">
            {FLAGS.map(fl => {
              const on = !!checked[fl.key]
              const m = SEV_META[fl.sev]
              return (
                <button
                  key={fl.key}
                  type="button"
                  onClick={() => toggle(fl.key)}
                  className={`w-full text-left rounded-xl border p-3.5 transition-all ${on ? `${m.border} ${m.bg}` : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/20'}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center text-[11px] font-bold ${on ? 'bg-violet-600 border-violet-600 text-white' : 'border-slate-300 dark:border-white/20 text-transparent'}`}>✓</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{fl.label}</span>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide ${m.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />{m.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{fl.meaning}</p>
                      {on && (
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed"><b className={m.text}>Por qué es peligroso:</b> {fl.danger}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed"><b className="text-violet-600 dark:text-violet-400">Cómo negociarla:</b> {fl.rec}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── MASCOTA / VEREDICTO ── */}
        <div className="space-y-4 md:sticky md:top-20">
          <div className={`lv-verdict rounded-2xl border bg-gradient-to-b ${moodBg[mood]} p-6 text-center ${flash ? 'lv-flash' : ''}`}>
            <div className="flex justify-center mb-2"><Mascot mood={mood} /></div>
            <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">{verdict.title}</p>
            <p className="text-xs mt-2 leading-relaxed text-slate-600 dark:text-slate-300">{verdict.text}</p>

            {/* score bar */}
            <div className="mt-4 text-left">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Nivel de toxicidad</span>
                <span className="text-xs font-mono tabular-nums text-slate-700 dark:text-slate-300">{score}/{maxScore}</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${barTone}`} style={{ width: `${Math.max(4, Math.round(ratio * 100))}%` }} />
              </div>
              <p className="text-[11px] text-slate-500 mt-2">{flagged.length} marcada{flagged.length === 1 ? '' : 's'} · {criticoCount} crítica{criticoCount === 1 ? '' : 's'}</p>
            </div>
          </div>

          {/* ── LEAD CAPTURE / CTA ── */}
          {isBad ? (
            !sent ? (
              <form onSubmit={submitLead} className="rounded-2xl border border-violet-200 dark:border-violet-500/30 bg-violet-50/70 dark:bg-violet-500/[0.07] p-5 space-y-3">
                <p className="text-sm font-bold text-slate-900 dark:text-white">No firmes esto solo 🙅</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Déjame tu correo y te mando cómo negociar cada cláusula que marcaste — con la contra-oferta exacta para pedir.
                </p>
                <input className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" placeholder="Tu nombre" value={gate.name} onChange={e => setGate(g => ({ ...g, name: e.target.value }))} />
                <input className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" type="email" placeholder="tu@email.com" value={gate.email} onChange={e => setGate(g => ({ ...g, email: e.target.value }))} />
                {err && <p className="text-xs text-red-500">{err}</p>}
                <button type="submit" disabled={sending} className="w-full btn-gradient text-white font-bold text-sm py-3 rounded-xl disabled:opacity-60">
                  {sending ? 'Enviando…' : 'Mándame cómo negociarlo →'}
                </button>
                <div className="text-center">
                  <Link href="/#contacto" className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline">o agenda una consulta gratis 1:1 →</Link>
                </div>
                {/* honeypot */}
                <input type="text" value={hp} onChange={e => setHp(e.target.value)} tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
              </form>
            ) : (
              <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/25 bg-emerald-50/70 dark:bg-emerald-500/[0.07] p-5 text-center space-y-2">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">✓ ¡Listo! Revisa tu correo</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">Te llega el análisis con cómo negociar cada cláusula. ¿Prefieres hablarlo?</p>
                <Link href="/#contacto" className="inline-block btn-gradient text-white font-bold text-sm py-2.5 px-5 rounded-xl">Agenda consulta gratis →</Link>
              </div>
            )
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-5 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">¿Quieres que un experto le dé el ojo? 👀</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Un term sheet limpio a veces esconde detalles. Segunda opinión gratis.</p>
              <Link href="/#contacto" className="inline-block btn-gradient text-white font-bold text-sm py-2.5 px-5 rounded-xl">Agenda consulta gratis →</Link>
            </div>
          )}

          <p className="text-[11px] leading-relaxed text-slate-400 px-1">
            Herramienta educativa — no es consejo legal ni de inversión. Un term sheet real tiene matices;
            revísalo siempre con un abogado antes de firmar.
          </p>
        </div>
      </div>

      <style jsx>{`
        .lv-mascot { position: relative; display: inline-block; width: 140px; height: 140px; border-radius: 50%; }
        .lv-pop { animation: lvPop .5s cubic-bezier(.2,1.3,.4,1) both; }
        @keyframes lvPop { 0% { transform: scale(.3) rotate(-12deg); opacity: 0 } 60% { transform: scale(1.12) rotate(4deg) } 100% { transform: scale(1) rotate(0); opacity: 1 } }
        .lv-glow-good { filter: drop-shadow(0 8px 24px rgba(18,163,134,.45)); }
        .lv-glow-bad  { filter: drop-shadow(0 8px 26px rgba(239,68,68,.5)); }
        .lv-shake  { animation: lvPop .5s cubic-bezier(.2,1.3,.4,1) both, lvShake 0.5s ease-in-out .5s infinite; }
        @keyframes lvShake { 0%,100% { transform: translate(0,0) rotate(0) } 25% { transform: translate(-3px,1px) rotate(-3deg) } 75% { transform: translate(3px,-1px) rotate(3deg) } }
        .lv-xoverlay { position: absolute; inset: 0; pointer-events: none; }
        .lv-xmark line { stroke-dasharray: 118; stroke-dashoffset: 118; animation: lvDraw .35s ease-out .35s forwards; }
        .lv-xmark line:last-child { animation-delay: .53s; }
        @keyframes lvDraw { to { stroke-dashoffset: 0 } }
        .lv-verdict { transition: box-shadow .3s; }
        .lv-flash { animation: lvFlash .5s ease-out; }
        @keyframes lvFlash { 0% { box-shadow: 0 0 0 0 rgba(239,68,68,.7), inset 0 0 40px rgba(239,68,68,.4) } 100% { box-shadow: 0 0 0 18px rgba(239,68,68,0), inset 0 0 0 rgba(239,68,68,0) } }
        @media (prefers-reduced-motion: reduce) {
          .lv-pop, .lv-shake, .lv-flash { animation: none; }
          .lv-xmark line { stroke-dashoffset: 0; animation: none; }
        }
      `}</style>
    </ToolLayout>
  )
}
