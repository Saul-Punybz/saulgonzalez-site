import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Simulador de Cap Table — Cómo evoluciona tu ownership ronda a ronda',
  description: 'Simula gratis tu cap table: añade rondas (pre-seed, seed, Serie A) con monto y valuación y mira cómo se diluye tu ownership como founder ronda a ronda. En español.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools/simulador-cap-table' },
  openGraph: {
    title: 'Simulador de Cap Table — Cómo evoluciona tu ownership ronda a ronda',
    description: 'Añade rondas con monto y valuación y mira cómo se diluye tu ownership como founder, ronda a ronda. Gratis, en español.',
    url: 'https://saulgonzalez.pro/tools/simulador-cap-table',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://saulgonzalez.pro' },
    { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://saulgonzalez.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'Simulador de Cap Table', item: 'https://saulgonzalez.pro/tools/simulador-cap-table' },
  ],
}

const webApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Simulador de Cap Table',
  url: 'https://saulgonzalez.pro/tools/simulador-cap-table',
  description: 'Simula gratis la evolución de tu cap table y la dilución de tu ownership como founder a través de múltiples rondas de inversión.',
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
