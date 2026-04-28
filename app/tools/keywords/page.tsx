'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import LeadCapture, { LeadIssue } from '@/components/LeadCapture'

type Keyword = {
  word: string; count: number; density: number
  inTitle: boolean; inDescription: boolean; inH1: boolean; inH2: boolean
}
type Result = {
  url: string; totalWords: number; uniqueWords: number
  keywords: Keyword[]; title: string | null; description: string | null; h1: string | null
  error?: string
}

function PresenceBadge({ active, label }: { active: boolean; label: string }) {
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${active ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400' : 'bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-600'}`}>
      {label}
    </span>
  )
}

export default function KeywordsPage() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [filter, setFilter] = useState<'all' | 'title' | 'h1' | 'missing'>('all')

  async function analyze(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const url = input.trim().startsWith('http') ? input.trim() : `https://${input.trim()}`
      const res = await fetch(`/api/tools/keywords?url=${encodeURIComponent(url)}`)
      setResult(await res.json())
    } catch {
      setResult({ error: 'Error al conectar' } as Result)
    } finally {
      setLoading(false)
    }
  }

  const filtered = result?.keywords?.filter(k => {
    if (filter === 'title') return k.inTitle
    if (filter === 'h1') return k.inH1
    if (filter === 'missing') return !k.inTitle && !k.inDescription && !k.inH1 && !k.inH2
    return true
  }) ?? []

  const topScore = result ? (() => {
    const top5 = result.keywords.slice(0, 5)
    const optimized = top5.filter(k => k.inTitle && k.inDescription && (k.inH1 || k.inH2)).length
    return Math.round(((optimized / Math.max(top5.length, 1)) * 60) + (result.totalWords >= 300 ? 40 : (result.totalWords / 300) * 40))
  })() : 0

  return (
    <ToolLayout
      icon="🔑"
      title="Keywords Extractor"
      description="Extrae y analiza las palabras clave más relevantes de cualquier página. Verifica su presencia en título, descripción y headings."
    >
      <form onSubmit={analyze} className="flex flex-col sm:flex-row gap-2 mb-8">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="saulgonzalez.pro o https://example.com"
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-gradient text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-60 whitespace-nowrap"
        >
          {loading ? 'Extrayendo…' : 'Extraer →'}
        </button>
      </form>

      {loading && (
        <div className="text-center py-16 text-slate-400">
          <div className="text-4xl mb-3 animate-pulse">🔑</div>
          <p>Extrayendo palabras clave…</p>
        </div>
      )}

      {result?.error && (
        <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-4 text-sm text-red-700 dark:text-red-400">
          ❌ {result.error}
        </div>
      )}

      {result && !result.error && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3 text-center">
              <p className="text-2xl font-extrabold text-violet-600 dark:text-violet-400">{result.totalWords.toLocaleString()}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Palabras totales</p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3 text-center">
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{result.uniqueWords.toLocaleString()}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Únicas (filtradas)</p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3 text-center">
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{topScore}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Score SEO /100</p>
            </div>
          </div>

          {/* Key elements */}
          <div className="space-y-2">
            {[
              { label: 'Title', val: result.title },
              { label: 'H1', val: result.h1 },
            ].filter(r => r.val).map(row => (
              <div key={row.label} className="rounded-lg border border-slate-100 dark:border-white/5 p-3 flex gap-3">
                <span className="text-xs font-semibold bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 px-2 py-0.5 rounded shrink-0 h-fit">{row.label}</span>
                <p className="text-sm text-slate-700 dark:text-slate-300">{row.val}</p>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div>
            <div className="flex flex-wrap gap-1 mb-3">
              {([
                { id: 'all', label: `Todas (${result.keywords.length})` },
                { id: 'title', label: `En title (${result.keywords.filter(k => k.inTitle).length})` },
                { id: 'h1', label: `En H1 (${result.keywords.filter(k => k.inH1).length})` },
                { id: 'missing', label: `No optimizadas (${result.keywords.filter(k => !k.inTitle && !k.inDescription && !k.inH1 && !k.inH2).length})` },
              ] as const).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${filter === tab.id ? 'bg-violet-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Keywords table */}
            <div className="rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-white/5">
                    <th className="text-left p-2.5 font-semibold text-slate-500 dark:text-slate-400">#</th>
                    <th className="text-left p-2.5 font-semibold text-slate-500 dark:text-slate-400">Keyword</th>
                    <th className="text-right p-2.5 font-semibold text-slate-500 dark:text-slate-400">Freq.</th>
                    <th className="text-right p-2.5 font-semibold text-slate-500 dark:text-slate-400">Dens.</th>
                    <th className="text-left p-2.5 font-semibold text-slate-500 dark:text-slate-400 hidden sm:table-cell">Presencia</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.slice(0, 20).map((kw, i) => (
                    <tr key={kw.word} className="border-t border-slate-100 dark:border-white/5">
                      <td className="p-2.5 text-slate-400">{i + 1}</td>
                      <td className="p-2.5 font-semibold text-slate-900 dark:text-white">{kw.word}</td>
                      <td className="p-2.5 text-right text-slate-600 dark:text-slate-400">{kw.count}</td>
                      <td className="p-2.5 text-right text-slate-600 dark:text-slate-400">{kw.density}%</td>
                      <td className="p-2.5 hidden sm:table-cell">
                        <div className="flex flex-wrap gap-1">
                          <PresenceBadge active={kw.inTitle} label="Title" />
                          <PresenceBadge active={kw.inDescription} label="Desc" />
                          <PresenceBadge active={kw.inH1} label="H1" />
                          <PresenceBadge active={kw.inH2} label="H2" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filter === 'missing' && filtered.length > 0 && (
            <div className="rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 p-4 text-sm text-amber-700 dark:text-amber-400">
              ⚠️ Estas palabras aparecen frecuentemente en el contenido pero <strong>no están en tu title ni headings</strong>. Considera incluirlas para mejorar el SEO.
            </div>
          )}

          <LeadCapture
            tool="Keywords Extractor"
            url={result.url}
            score={topScore}
            summary={`${result.totalWords} palabras, ${result.keywords.length} keywords. Top keywords: ${result.keywords.slice(0, 5).map(k => k.word).join(', ')}.`}
            issues={[
              result.totalWords < 300 ? { text: `Solo ${result.totalWords} palabras — Google prefiere páginas con más de 300 palabras`, type: 'critical' as const } : null,
              result.keywords.length > 0 && !result.keywords[0].inTitle ? { text: `"${result.keywords[0].word}" (keyword #1) no está en tu título — estás perdiendo relevancia`, type: 'critical' as const } : null,
              result.keywords.length > 0 && !result.keywords[0].inH1 ? { text: `"${result.keywords[0].word}" no está en tu H1 — Google no la detecta como tema principal`, type: 'warning' as const } : null,
              result.keywords.filter(k => !k.inTitle && !k.inDescription && !k.inH1).length > 5 ? { text: `${result.keywords.filter(k => !k.inTitle && !k.inDescription && !k.inH1).length} keywords sin optimizar en tags clave`, type: 'warning' as const } : null,
            ].filter(Boolean) as LeadIssue[]}
          />
        </div>
      )}
    </ToolLayout>
  )
}
