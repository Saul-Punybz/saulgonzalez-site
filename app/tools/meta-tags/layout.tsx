import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meta Tags Checker Gratis — Verifica Title, Description y OG',
  description: 'Verifica gratis el title, meta description, canonical, Open Graph y todos los meta tags de cualquier URL. Detecta errores SEO al instante.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools/meta-tags' },
  openGraph: {
    title: 'Meta Tags Checker Gratis — Verifica Title, Description y OG',
    description: 'Verifica gratis el title, meta description, canonical, Open Graph y todos los meta tags de cualquier URL. Detecta errores SEO al instante.',
    url: 'https://saulgonzalez.pro/tools/meta-tags',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://saulgonzalez.pro' },
    { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://saulgonzalez.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'Meta Tags Checker', item: 'https://saulgonzalez.pro/tools/meta-tags' },
  ],
}

const webApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Meta Tags Checker',
  url: 'https://saulgonzalez.pro/tools/meta-tags',
  description: 'Verifica gratis el title, meta description, canonical, Open Graph y todos los meta tags de cualquier URL. Detecta errores SEO al instante.',
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
