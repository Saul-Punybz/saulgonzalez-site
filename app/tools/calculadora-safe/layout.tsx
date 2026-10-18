import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculadora de SAFE — Precio de conversión y ownership',
  description: 'Calcula gratis cómo convierte tu SAFE en la ronda con precio: ownership resultante, precio de conversión y si gana el valuation cap o el discount. En español.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools/calculadora-safe' },
  openGraph: {
    title: 'Calculadora de SAFE — Precio de conversión y ownership',
    description: 'Modela la conversión de tu SAFE en la ronda priced: cap vs discount, valuación efectiva y ownership. Gratis, en español.',
    url: 'https://saulgonzalez.pro/tools/calculadora-safe',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://saulgonzalez.pro' },
    { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://saulgonzalez.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'Calculadora de SAFE', item: 'https://saulgonzalez.pro/tools/calculadora-safe' },
  ],
}

const webApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Calculadora de SAFE',
  url: 'https://saulgonzalez.pro/tools/calculadora-safe',
  description: 'Calcula gratis la conversión de un SAFE post-money en la ronda con precio: ownership, precio de conversión y comparación entre valuation cap y discount.',
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
