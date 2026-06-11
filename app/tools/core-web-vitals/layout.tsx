import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Core Web Vitals Checker — LCP, CLS y TBT Gratis',
  description: 'Mide gratis los Core Web Vitals de tu sitio: LCP, CLS, TBT y score de Google PageSpeed para móvil y desktop. Sin registro.',
  alternates: { canonical: 'https://saulgonzalez.pro/tools/core-web-vitals' },
  openGraph: {
    title: 'Core Web Vitals Checker — LCP, CLS y TBT Gratis',
    description: 'Mide gratis los Core Web Vitals de tu sitio: LCP, CLS, TBT y score de Google PageSpeed para móvil y desktop. Sin registro.',
    url: 'https://saulgonzalez.pro/tools/core-web-vitals',
  },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://saulgonzalez.pro' },
    { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://saulgonzalez.pro/tools' },
    { '@type': 'ListItem', position: 3, name: 'Core Web Vitals', item: 'https://saulgonzalez.pro/tools/core-web-vitals' },
  ],
}

const webApp = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Core Web Vitals',
  url: 'https://saulgonzalez.pro/tools/core-web-vitals',
  description: 'Mide gratis los Core Web Vitals de tu sitio: LCP, CLS, TBT y score de Google PageSpeed para móvil y desktop. Sin registro.',
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
