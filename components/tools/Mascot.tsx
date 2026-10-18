'use client'

import Lottie from 'lottie-react'
import champ from '@/public/lottie/champ.json'
import ok from '@/public/lottie/ok.json'
import worried from '@/public/lottie/worried.json'
import skull from '@/public/lottie/skull.json'
import party from '@/public/lottie/party.json'
import starstruck from '@/public/lottie/starstruck.json'
import rocket from '@/public/lottie/rocket.json'
import fire from '@/public/lottie/fire.json'
import thinking from '@/public/lottie/thinking.json'
import crying from '@/public/lottie/crying.json'
import money from '@/public/lottie/money.json'

const MAP = { champ, ok, worried, skull, party, starstruck, rocket, fire, thinking, crying, money }
export type MascotName = keyof typeof MAP

/**
 * Mascota animada (Google Noto Animated Emoji vía Lottie).
 * key={name} fuerza remount → animación de pop-in cada vez que cambia el estado.
 */
export default function Mascot({
  name, size = 120, loop = true, className = '', pop = true,
}: { name: MascotName; size?: number; loop?: boolean; className?: string; pop?: boolean }) {
  return (
    <div key={name} className={`lv-mascot ${pop ? 'lv-pop' : ''} ${className}`} aria-hidden="true">
      <Lottie animationData={MAP[name] as object} loop={loop} autoplay style={{ width: size, height: size }} />
      <style jsx>{`
        .lv-mascot { display: inline-block; }
        .lv-pop { animation: lvPop .5s cubic-bezier(.2,1.3,.4,1) both; }
        @keyframes lvPop { 0% { transform: scale(.3) rotate(-12deg); opacity: 0 } 60% { transform: scale(1.12) rotate(4deg) } 100% { transform: scale(1) rotate(0); opacity: 1 } }
        @media (prefers-reduced-motion: reduce) { .lv-pop { animation: none } }
      `}</style>
    </div>
  )
}

export function fireConfetti() {
  // no-op placeholder kept for API symmetry; real confetti lives in LeadCTA
}
