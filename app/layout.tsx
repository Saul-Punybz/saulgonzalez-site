import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://saulgonzalez.pro'),
  title: {
    default: 'Levanta — Kit para levantar capital sin regalar tu empresa',
    template: '%s · Levanta',
  },
  description: 'Herramientas gratis en español para levantar capital: genera tu SAFE y nota convertible, calcula tu dilución, arma tu dataroom y detecta cláusulas predatorias. Creado por un founder que lo vive.',
  keywords: [
    // ── Instrumentos ───────────────────────────
    'qué es un SAFE',
    'SAFE explicado español',
    'generador de SAFE',
    'plantilla SAFE español',
    'SAFE vs nota convertible',
    'nota convertible startup',
    'valuation cap discount SAFE',
    // ── Levantar capital ───────────────────────
    'cómo levantar capital startup',
    'levantar capital etapa temprana',
    'fundraising founders español',
    'ronda pre-seed seed',
    'capital no dilutivo',
    'capital de diáspora',
    // ── Herramientas ───────────────────────────
    'calculadora de dilución',
    'calculadora de SAFE',
    'simulador de cap table',
    'calculadora de runway startup',
    // ── Dataroom & términos ────────────────────
    'data room startup qué contiene',
    'checklist dataroom inversores',
    'term sheet cláusulas predatorias',
    'red flags term sheet',
    'liquidation preference participating',
    // ── Estructura ─────────────────────────────
    'Delaware C-Corp startup',
    'founders agreement shareholder agreement',
  ],
  authors: [{ name: 'Saul A. González', url: 'https://saulgonzalez.pro' }],
  creator: 'Saul A. González',
  publisher: 'Saul A. González',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    other: { 'msvalidate.01': 'A55D0ABE58E66961B21F784DD7BEEC31' },
  },
  openGraph: {
    title: 'Levanta — Kit para levantar capital sin regalar tu empresa',
    description: 'Herramientas gratis en español para levantar capital: genera tu SAFE y nota convertible, calcula tu dilución, arma tu dataroom y detecta cláusulas predatorias. Creado por un founder que lo vive.',
    type: 'website',
    url: 'https://saulgonzalez.pro',
    siteName: 'Levanta · Saúl A. González',
    locale: 'es',
    images: [{ url: 'https://saulgonzalez.pro/og.png', width: 1200, height: 630, alt: 'Levanta — Kit para levantar capital' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@buscasaul',
    creator: '@buscasaul',
    title: 'Levanta — Kit para levantar capital',
    description: 'Herramientas gratis en español: genera tu SAFE, calcula tu dilución, arma tu dataroom y detecta cláusulas predatorias.',
    images: ['https://saulgonzalez.pro/og.png'],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
      </head>
      <body className="bg-white dark:bg-ink text-slate-900 dark:text-white">
        <Providers>
          {children}
        </Providers>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-97K7WKN9VT" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-97K7WKN9VT');
        `}</Script>
        <Script id="clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "wga80r1gg6");
        `}</Script>
      </body>
    </html>
  )
}
