import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Keywords Extractor — Palabras Clave de Cualquier Página',
  description: 'Extrae gratis las palabras clave más relevantes de cualquier página y verifica su presencia en el title, H1 y meta description.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools/keywords' },
  openGraph: {
    title: 'Keywords Extractor — Palabras Clave de Cualquier Página',
    description: 'Extrae gratis las palabras clave más relevantes de cualquier página y verifica su presencia en el title, H1 y meta description.',
    url: 'https://saulgonzalez.pro/tools/keywords',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://saulgonzalez.pro' },
    { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://saulgonzalez.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'Keywords Extractor', item: 'https://saulgonzalez.pro/tools/keywords' },
  ],
}

const webApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Keywords Extractor',
  url: 'https://saulgonzalez.pro/tools/keywords',
  description: 'Extrae gratis las palabras clave más relevantes de cualquier página y verifica su presencia en el title, H1 y meta description.',
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
