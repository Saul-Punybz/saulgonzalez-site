import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Metadata Deep Scan — Análisis Completo del Head HTML',
  description: 'Escaneo gratis y completo del head de tu sitio: todos los meta tags, JSON-LD, datos estructurados y link tags. Ideal para auditorías SEO.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools/metadata-scan' },
  openGraph: {
    title: 'Metadata Deep Scan — Análisis Completo del Head HTML',
    description: 'Escaneo gratis y completo del head de tu sitio: todos los meta tags, JSON-LD, datos estructurados y link tags. Ideal para auditorías SEO.',
    url: 'https://saulgonzalez.pro/tools/metadata-scan',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://saulgonzalez.pro' },
    { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://saulgonzalez.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'Metadata Deep Scan', item: 'https://saulgonzalez.pro/tools/metadata-scan' },
  ],
}

const webApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Metadata Deep Scan',
  url: 'https://saulgonzalez.pro/tools/metadata-scan',
  description: 'Escaneo gratis y completo del head de tu sitio: todos los meta tags, JSON-LD, datos estructurados y link tags. Ideal para auditorías SEO.',
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
