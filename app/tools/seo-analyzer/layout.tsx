import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Analyzer Gratis — Análisis SEO On-Page Completo',
  description: 'Análisis SEO on-page gratis: headings, imágenes con alt, links internos y externos, word count y checklist de optimización.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools/seo-analyzer' },
  openGraph: {
    title: 'SEO Analyzer Gratis — Análisis SEO On-Page Completo',
    description: 'Análisis SEO on-page gratis: headings, imágenes con alt, links internos y externos, word count y checklist de optimización.',
    url: 'https://saulgonzalez.pro/tools/seo-analyzer',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://saulgonzalez.pro' },
    { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://saulgonzalez.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'SEO Analyzer', item: 'https://saulgonzalez.pro/tools/seo-analyzer' },
  ],
}

const webApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SEO Analyzer',
  url: 'https://saulgonzalez.pro/tools/seo-analyzer',
  description: 'Análisis SEO on-page gratis: headings, imágenes con alt, links internos y externos, word count y checklist de optimización.',
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
