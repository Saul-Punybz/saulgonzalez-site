import type { Metadata } from 'next'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Herramientas de Capital Gratis — SAFE, Dilución, Dataroom, Term Sheet',
  description: 'Herramientas gratis en español para levantar capital: generador de SAFE y nota convertible, calculadora de dilución y de SAFE, checklist de dataroom, simulador de cap table, runway y detector de cláusulas predatorias.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools' },
  openGraph: {
    title: 'Herramientas de Capital Gratis — SAFE, Dilución, Dataroom',
    description: 'Genera documentos, calcula tu dilución, arma tu dataroom y detecta cláusulas predatorias. Gratis, en español.',
    url: 'https://saulgonzalez.pro/tools',
  },
}

const tools = [
  {
    href: '/tools/generador-safe',
    icon: '📄',
    title: 'Generador de SAFE',
    desc: 'Formulario → tu SAFE completo en Word y PDF, sobre la plantilla post-money de Y Combinator. Con cláusulas opcionales y alertas.',
    badge: 'Gratis',
    available: true,
  },
  {
    href: '/tools/generador-nota-convertible',
    icon: '📝',
    title: 'Generador de nota convertible',
    desc: 'Tu convertible note lista para firmar: interés, vencimiento, valuation cap y discount. Descarga en Word y PDF.',
    badge: 'Gratis',
    available: true,
  },
  {
    href: '/tools/checklist-dataroom',
    icon: '🗂️',
    title: 'Checklist de dataroom',
    desc: 'Todo lo que un inversor pide antes de firmar. Marca los ítems, mide tu progreso y exporta el resumen.',
    badge: 'Gratis',
    available: true,
  },
  {
    href: '/tools/calculadora-dilucion',
    icon: '📉',
    title: 'Calculadora de dilución',
    desc: 'Monto + valuación → cuánto equity entregas, cómo pesa el option pool y tu cap table después de la ronda.',
    badge: 'Calculadora',
    available: true,
  },
  {
    href: '/tools/calculadora-safe',
    icon: '🧮',
    title: 'Calculadora de SAFE',
    desc: 'Cap + discount → precio de conversión y el ownership real que entregas cuando el SAFE convierte en la ronda priced.',
    badge: 'Calculadora',
    available: true,
  },
  {
    href: '/tools/simulador-cap-table',
    icon: '📊',
    title: 'Simulador de cap table',
    desc: 'Añade tus rondas y mira cómo se diluye tu ownership de founder ronda a ronda hasta la Serie A.',
    badge: 'Calculadora',
    available: true,
  },
  {
    href: '/tools/calculadora-runway',
    icon: '🛫',
    title: 'Calculadora de runway',
    desc: 'Caja ÷ burn → cuántos meses de pista te quedan, cuándo se acaba la caja y cuándo empezar a levantar.',
    badge: 'Calculadora',
    available: true,
  },
  {
    href: '/tools/red-flags-term-sheet',
    icon: '🚩',
    title: 'Red-flags de term sheet',
    desc: 'Marca las cláusulas de tu term sheet y detecta las predatorias — con su gravedad y cómo negociarlas.',
    badge: 'Análisis',
    available: true,
  },
]

const badgeColors: Record<string, string> = {
  Gratis: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Calculadora: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  Análisis: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
}

export default function ToolsHub() {
  return (
    <div className="min-h-screen bg-white dark:bg-ink">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-100 dark:border-white/5 bg-white/80 dark:bg-ink/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            ← saulgonzalez.pro
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="hero-grid border-b border-slate-100 dark:border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-4">
            Herramientas de Capital
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Levanta capital con las herramientas<br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600"> que nadie tiene en español</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Genera documentos, calcula tu dilución, arma tu dataroom y detecta cláusulas predatorias. Gratis, sin jerga, en español.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <div key={tool.href + tool.title} className="relative">
              {tool.available ? (
                <Link
                  href={tool.href}
                  className="group block h-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-lg hover:shadow-violet-500/5 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColors[tool.badge] ?? ''}`}>
                      {tool.badge}
                    </span>
                  </div>
                  <h2 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{tool.desc}</p>
                  <p className="text-xs text-violet-600 dark:text-violet-400 font-semibold mt-3">
                    Usar herramienta →
                  </p>
                </Link>
              ) : (
                <div className="h-full rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.01] p-5 opacity-60">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl grayscale">{tool.icon}</span>
                    <span className="text-xs bg-slate-100 dark:bg-white/5 text-slate-400 px-2 py-0.5 rounded-full">Pronto</span>
                  </div>
                  <h2 className="font-semibold text-slate-500 dark:text-slate-500 mb-1">{tool.title}</h2>
                  <p className="text-sm text-slate-400 dark:text-slate-600">{tool.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            ¿Necesitas más que herramientas para tu ronda?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Orientación 1:1 de fundraising con alguien que ya levantó su ronda: estrategia, vehículo y dataroom.
          </p>
          <Link
            href="/#contacto"
            className="btn-gradient btn-glow inline-block text-white font-semibold px-8 py-3 rounded-xl text-sm"
          >
            Ver asesoría →
          </Link>
        </div>
      </section>
    </div>
  )
}
