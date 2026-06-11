import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Open Graph Preview — Cómo se ve tu Link al Compartirlo',
  description: 'Visualiza gratis cómo se ve tu link al compartirlo en Facebook, LinkedIn, Twitter/X y WhatsApp. Detecta problemas de og:image y og:title.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools/og-preview' },
  openGraph: {
    title: 'Open Graph Preview — Cómo se ve tu Link al Compartirlo',
    description: 'Visualiza gratis cómo se ve tu link al compartirlo en Facebook, LinkedIn, Twitter/X y WhatsApp. Detecta problemas de og:image y og:title.',
    url: 'https://saulgonzalez.pro/tools/og-preview',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://saulgonzalez.pro' },
    { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://saulgonzalez.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'Open Graph Preview', item: 'https://saulgonzalez.pro/tools/og-preview' },
  ],
}

const webApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Open Graph Preview',
  url: 'https://saulgonzalez.pro/tools/og-preview',
  description: 'Visualiza gratis cómo se ve tu link al compartirlo en Facebook, LinkedIn, Twitter/X y WhatsApp. Detecta problemas de og:image y og:title.',
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
