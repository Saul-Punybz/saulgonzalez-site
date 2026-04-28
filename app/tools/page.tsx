import type { Metadata } from 'next'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Herramientas Digitales Gratis — SEO, Meta Tags, OG Preview',
  description: 'Analiza tu presencia digital gratis. Meta Tags Checker, Open Graph Preview, Technology Detector, Metadata Scanner y más. Herramientas para negocios y creadores en Puerto Rico y LatAm.',
}

const tools = [
  {
    href: '/tools/meta-tags',
    icon: '🏷️',
    title: 'Meta Tags Checker',
    desc: 'Verifica title, description, viewport, canonical y todos los meta tags de cualquier URL.',
    badge: 'SEO',
    available: true,
  },
  {
    href: '/tools/og-preview',
    icon: '🔗',
    title: 'Open Graph Preview',
    desc: 'Visualiza cómo se ve tu link cuando lo compartes en Facebook, LinkedIn, Twitter y WhatsApp.',
    badge: 'Redes',
    available: true,
  },
  {
    href: '/tools/tech-detector',
    icon: '🔬',
    title: 'Technology Detector',
    desc: 'Descubre el stack tecnológico de cualquier sitio: frameworks, CMS, analytics, hosting.',
    badge: 'Dev',
    available: true,
  },
  {
    href: '/tools/metadata-scan',
    icon: '🔍',
    title: 'Metadata Deep Scan',
    desc: 'Escaneo completo del <head>: todos los meta tags, JSON-LD, link tags y datos estructurados.',
    badge: 'SEO',
    available: true,
  },
  {
    href: '/tools/core-web-vitals',
    icon: '📊',
    title: 'Core Web Vitals',
    desc: 'Velocidad de carga, LCP, CLS, TBT y score de PageSpeed para móvil y desktop.',
    badge: 'Velocidad',
    available: true,
  },
  {
    href: '/tools/keywords',
    icon: '🔑',
    title: 'Keywords Extractor',
    desc: 'Extrae las palabras clave más relevantes y verifica su presencia en title, H1 y descripción.',
    badge: 'SEO',
    available: true,
  },
  {
    href: '/tools/seo-analyzer',
    icon: '📐',
    title: 'SEO Analyzer',
    desc: 'Análisis SEO on-page completo: headings, imágenes, links internos/externos y más.',
    badge: 'SEO',
    available: true,
  },
  {
    href: '/tools/domain-check',
    icon: '⚙️',
    title: 'Domain & Health Check',
    desc: 'DNS, SSL, seguridad, tiempo de respuesta y health check completo de cualquier dominio.',
    badge: 'Tech',
    available: true,
  },
  {
    href: '#',
    icon: '🗺️',
    title: 'Google Business Profile',
    desc: 'Analiza la presencia de un negocio en Google Maps: reseñas, fotos, info y score.',
    badge: 'Local',
    available: false,
  },
  {
    href: '#',
    icon: '🌐',
    title: 'PresenciaDigital',
    desc: 'Score completo de presencia digital: Google, sitio web, redes sociales y reputación.',
    badge: 'Completo',
    available: false,
  },
]

const badgeColors: Record<string, string> = {
  SEO: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  Redes: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Dev: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Velocidad: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Local: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  Completo: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-400',
  Tech: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
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
            Herramientas Gratis
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Analiza tu presencia<br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600"> digital en segundos</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            10 herramientas para SEO, redes sociales y análisis técnico. Gratis, sin registro, para cualquier URL.
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
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColors[tool.badge] ?? ''}`}>
                        {tool.badge}
                      </span>
                      <span className="text-xs bg-slate-100 dark:bg-white/5 text-slate-400 px-2 py-0.5 rounded-full">
                        Pronto
                      </span>
                    </div>
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
            ¿Quieres un análisis completo de tu negocio digital?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Consulta gratuita de 30 minutos. Te digo exactamente qué está fallando y cómo solucionarlo.
          </p>
          <Link
            href="https://saulgonzalez.pro/#quiz"
            className="btn-gradient btn-glow inline-block text-white font-semibold px-8 py-3 rounded-xl text-sm"
          >
            Agenda tu consulta gratis →
          </Link>
        </div>
      </section>
    </div>
  )
}
