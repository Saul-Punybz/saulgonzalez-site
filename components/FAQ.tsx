'use client'

import { useState } from 'react'

const faqs = [
  {
    q: '¿Cuánto cuesta trabajar contigo?',
    a: 'La consulta inicial es gratis y sin compromiso. Después te entrego un estimado honesto — rango de costos, tiempos y scope — antes de que te comprometas a nada. No hay letra pequeña.',
  },
  {
    q: '¿Trabajas solo o con un equipo?',
    a: 'Para proyectos pequeños trabajo directamente. Para proyectos que lo requieren, escalo con una red de desarrolladores que conozco y con los que he trabajado — no con freelancers al azar contratados por Upwork.',
  },
  {
    q: '¿Qué pasa si no sé qué tecnología necesito?',
    a: 'Eso es exactamente para lo que está la primera llamada. No necesitas saber de tecnología para hablar conmigo. Yo te hago las preguntas correctas y te explico las opciones en lenguaje de negocio, no de programador.',
  },
  {
    q: '¿Puedes integrar IA a un sistema que ya tenemos?',
    a: 'Sí, es uno de los proyectos más comunes. No necesitas reemplazar tu sistema actual — en la mayoría de casos se puede agregar una capa de IA encima de lo que ya existe. En la primera llamada evaluamos qué tiene sentido para tu caso.',
  },
  {
    q: '¿Haces proyectos fuera de Puerto Rico?',
    a: 'Sí. Trabajo con clientes en Puerto Rico, Estados Unidos y LATAM. Todo 100% remoto. El timezone AST de PR hace fácil trabajar con ambos lados del mundo.',
  },
  {
    q: '¿Qué pasa si mi proyecto no es para ti?',
    a: 'Si después de la llamada descubrimos que hay alguien mejor para tu caso específico, te lo digo directamente y te presento con esa persona. Sin cobro, sin rodeos. Prefiero mandarte con quien te puede ayudar de verdad.',
  },
  {
    q: '¿Cuánto tiempo toma un proyecto típico?',
    a: 'Un MVP funcional puede estar listo en 4–8 semanas. Proyectos más complejos toman más, pero siempre con entregables claros en cada etapa. No meses en el oscuro sin ver nada.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-slate-200 dark:border-white/[0.07] rounded-xl overflow-hidden bg-white dark:bg-transparent">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors"
            aria-expanded={open === i}
          >
            <span className="font-medium text-slate-800 dark:text-white text-sm pr-4">{faq.q}</span>
            <span
              className={`text-indigo-500 dark:text-indigo-400 text-xl flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}
              aria-hidden
            >
              +
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-48' : 'max-h-0'}`}>
            <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {faq.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
