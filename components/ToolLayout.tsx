import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

type Props = {
  title: string
  description: string
  icon: string
  children: React.ReactNode
}

export default function ToolLayout({ title, description, icon, children }: Props) {
  return (
    <div className="min-h-screen bg-white dark:bg-ink">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-100 dark:border-white/5 bg-white/80 dark:bg-ink/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/tools" className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors flex items-center gap-1">
              ← Tools
            </Link>
            <span className="text-slate-200 dark:text-slate-700">/</span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">{title}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
              saulgonzalez.pro
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="mb-8">
          <div className="text-4xl mb-3">{icon}</div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h1>
          <p className="text-slate-500 dark:text-slate-400">{description}</p>
        </div>

        {children}
      </main>

      {/* Footer CTA */}
      <footer className="border-t border-slate-100 dark:border-white/5 mt-16 py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            ¿Necesitas ayuda con tu presencia digital?
          </p>
          <Link
            href="https://saulgonzalez.pro/#quiz"
            className="btn-gradient text-white font-semibold text-sm px-5 py-2 rounded-lg"
          >
            Consulta gratis 30 min →
          </Link>
        </div>
      </footer>
    </div>
  )
}
