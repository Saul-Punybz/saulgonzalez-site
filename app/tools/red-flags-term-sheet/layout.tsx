import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Red-flags de Term Sheet — Detecta cláusulas predatorias gratis',
  description: 'Marca las cláusulas de tu term sheet y detecta las predatorias: liquidation preference, participating, full-ratchet, redemption y más. Score de riesgo y recomendaciones. Gratis, en español.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools/red-flags-term-sheet' },
  openGraph: {
    title: 'Red-flags de Term Sheet — Detecta cláusulas predatorias',
    description: 'Marca las cláusulas de tu term sheet → score de riesgo, qué significan y cómo negociarlas. Gratis, en español.',
    url: 'https://saulgonzalez.pro/tools/red-flags-term-sheet',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://saulgonzalez.pro' },
    { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://saulgonzalez.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'Red-flags de Term Sheet', item: 'https://saulgonzalez.pro/tools/red-flags-term-sheet' },
  ],
}

const webApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Red-flags de Term Sheet',
  url: 'https://saulgonzalez.pro/tools/red-flags-term-sheet',
  description: 'Detecta cláusulas predatorias en un term sheet: liquidation preference múltiple, participating preferred, full-ratchet, redemption rights y más. Score de riesgo y recomendaciones de negociación.',
  applicationCategory: 'FinanceApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />
      {children}
    </>
  )
}
