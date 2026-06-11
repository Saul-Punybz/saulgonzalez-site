import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Domain & Health Check — DNS, SSL y Seguridad de tu Dominio',
  description: 'Chequeo gratis de salud de tu dominio: registros DNS, certificado SSL, headers de seguridad y tiempo de respuesta.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools/domain-check' },
  openGraph: {
    title: 'Domain & Health Check — DNS, SSL y Seguridad de tu Dominio',
    description: 'Chequeo gratis de salud de tu dominio: registros DNS, certificado SSL, headers de seguridad y tiempo de respuesta.',
    url: 'https://saulgonzalez.pro/tools/domain-check',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://saulgonzalez.pro' },
    { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://saulgonzalez.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'Domain & Health Check', item: 'https://saulgonzalez.pro/tools/domain-check' },
  ],
}

const webApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Domain & Health Check',
  url: 'https://saulgonzalez.pro/tools/domain-check',
  description: 'Chequeo gratis de salud de tu dominio: registros DNS, certificado SSL, headers de seguridad y tiempo de respuesta.',
  applicationCategory: 'SEO Tool',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Person', name: 'Saul A. González Alonso', url: 'https://saulgonzalez.pro' },
}

export default function ToolSegmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }} />
      {children}
    </>
  )
}
