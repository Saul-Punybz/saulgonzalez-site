import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculadora de Runway — Cuántos meses de pista te quedan',
  description: 'Calcula gratis tu runway: caja ÷ burn = meses de pista, la fecha en que se acaba tu dinero y cuándo empezar a levantar tu próxima ronda. En español.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools/calculadora-runway' },
  openGraph: {
    title: 'Calculadora de Runway — Cuántos meses de pista te quedan',
    description: 'Caja ÷ burn = meses de pista, fecha de fondeo y cuándo empezar a levantar. Gratis, en español.',
    url: 'https://saulgonzalez.pro/tools/calculadora-runway',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://saulgonzalez.pro' },
    { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://saulgonzalez.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'Calculadora de Runway', item: 'https://saulgonzalez.pro/tools/calculadora-runway' },
  ],
}

const webApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Calculadora de Runway',
  url: 'https://saulgonzalez.pro/tools/calculadora-runway',
  description: 'Calcula gratis tu runway (meses de pista) a partir de tu caja y burn mensual, con proyección de crecimiento de ingresos y recomendación de cuándo levantar.',
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
