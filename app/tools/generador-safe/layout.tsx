import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Generador de SAFE — Crea tu SAFE gratis en español',
  description: 'Llena un formulario y descarga tu SAFE completo (Word + PDF), sobre la plantilla estándar post-money de Y Combinator. Cap, discount y MFN. Gratis, en español.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools/generador-safe' },
  openGraph: {
    title: 'Generador de SAFE — Crea tu SAFE gratis en español',
    description: 'Formulario → tu SAFE completo en Word y PDF, sobre la plantilla estándar post-money de Y Combinator. Gratis.',
    url: 'https://saulgonzalez.pro/tools/generador-safe',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://saulgonzalez.pro' },
    { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://saulgonzalez.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'Generador de SAFE', item: 'https://saulgonzalez.pro/tools/generador-safe' },
  ],
}

const webApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Generador de SAFE',
  url: 'https://saulgonzalez.pro/tools/generador-safe',
  description: 'Genera gratis un SAFE completo (post-money, valuation cap, discount, MFN) en Word y PDF sobre la plantilla estándar de Y Combinator.',
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
