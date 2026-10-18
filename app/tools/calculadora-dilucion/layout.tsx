import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculadora de Dilución — Cuánto equity entregas en tu ronda',
  description: 'Calcula gratis tu dilución: valuación pre-money + monto a levantar → % para el inversor, % del option pool y cuánto te queda a los founders. Con cap table después de la ronda. En español.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools/calculadora-dilucion' },
  openGraph: {
    title: 'Calculadora de Dilución — Cuánto equity entregas en tu ronda',
    description: 'Valuación pre-money + monto → % para el inversor, option pool y cuánto te queda. Cap table después de la ronda. Gratis, en español.',
    url: 'https://saulgonzalez.pro/tools/calculadora-dilucion',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://saulgonzalez.pro' },
    { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://saulgonzalez.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'Calculadora de Dilución', item: 'https://saulgonzalez.pro/tools/calculadora-dilucion' },
  ],
}

const webApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Calculadora de Dilución',
  url: 'https://saulgonzalez.pro/tools/calculadora-dilucion',
  description: 'Calcula gratis la dilución de tu ronda: valuación pre-money y monto a levantar → porcentaje para el inversor, option pool y equity restante para los founders, con cap table después de la ronda.',
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
