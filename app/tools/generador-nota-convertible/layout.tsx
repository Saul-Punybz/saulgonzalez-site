import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Generador de Nota Convertible — Crea tu convertible note gratis',
  description: 'Llena un formulario y descarga tu nota convertible completa (Word + PDF): principal, tasa de interés, vencimiento, valuation cap y discount. Gratis, en español.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools/generador-nota-convertible' },
  openGraph: {
    title: 'Generador de Nota Convertible — Crea tu convertible note gratis',
    description: 'Formulario → tu nota convertible completa en Word y PDF: interés, vencimiento, cap y discount. Gratis, en español.',
    url: 'https://saulgonzalez.pro/tools/generador-nota-convertible',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://saulgonzalez.pro' },
    { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://saulgonzalez.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'Generador de Nota Convertible', item: 'https://saulgonzalez.pro/tools/generador-nota-convertible' },
  ],
}

const webApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Generador de Nota Convertible',
  url: 'https://saulgonzalez.pro/tools/generador-nota-convertible',
  description: 'Genera gratis una nota convertible (convertible note) completa con principal, tasa de interés, vencimiento, valuation cap y discount, en Word y PDF.',
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
