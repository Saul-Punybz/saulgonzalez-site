import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technology Detector — Detecta el Stack de Cualquier Sitio',
  description: 'Descubre gratis qué tecnología usa cualquier sitio web: frameworks, CMS, analytics, hosting y headers de seguridad. 50+ tecnologías detectadas.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools/tech-detector' },
  openGraph: {
    title: 'Technology Detector — Detecta el Stack de Cualquier Sitio',
    description: 'Descubre gratis qué tecnología usa cualquier sitio web: frameworks, CMS, analytics, hosting y headers de seguridad. 50+ tecnologías detectadas.',
    url: 'https://saulgonzalez.pro/tools/tech-detector',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://saulgonzalez.pro' },
    { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://saulgonzalez.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'Technology Detector', item: 'https://saulgonzalez.pro/tools/tech-detector' },
  ],
}

const webApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Technology Detector',
  url: 'https://saulgonzalez.pro/tools/tech-detector',
  description: 'Descubre gratis qué tecnología usa cualquier sitio web: frameworks, CMS, analytics, hosting y headers de seguridad. 50+ tecnologías detectadas.',
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
