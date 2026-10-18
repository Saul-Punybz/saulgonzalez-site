import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checklist de Dataroom — Qué pide un inversor antes de firmar',
  description: 'Checklist interactivo del dataroom que un inversionista pide antes de invertir: negocio, financiero, propiedad intelectual y legal. Marca, mide tu progreso y exporta. Gratis, en español.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools/checklist-dataroom' },
  openGraph: {
    title: 'Checklist de Dataroom — Qué pide un inversor antes de firmar',
    description: 'Todo lo que un inversionista revisa antes de firmar, en un checklist interactivo. Marca tu progreso y exporta el resumen. Gratis.',
    url: 'https://saulgonzalez.pro/tools/checklist-dataroom',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://saulgonzalez.pro' },
    { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://saulgonzalez.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'Checklist de Dataroom', item: 'https://saulgonzalez.pro/tools/checklist-dataroom' },
  ],
}

const webApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Checklist de Dataroom',
  url: 'https://saulgonzalez.pro/tools/checklist-dataroom',
  description: 'Checklist interactivo del dataroom que un inversionista pide antes de invertir: negocio, financiero, propiedad intelectual y legal. Marca, mide progreso y exporta el resumen. Gratis.',
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
