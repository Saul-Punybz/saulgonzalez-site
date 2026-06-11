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
    default: 'Saul A. González — Consultor Digital & Vibe Coder | Puerto Rico',
    template: '%s | Saul A. González',
  },
  description: 'Consultor digital y vibe coder en Puerto Rico. COO de Puny.bz (1,303 negocios, 19 países). WebApps, apps iOS/Android e IA. Nearshore US. Consulta gratis.',
  keywords: [
    // ── Identidad ──────────────────────────────
    'Saul González Alonso',
    'Saul A. González',
    'Saul Gonzalez Puerto Rico',
    'consultor digital Puerto Rico',
    'vibe coder Puerto Rico',
    'vibe coder',
    'estratega tecnológico',
    'emprendedor puertorriqueño',
    'Arecibo Puerto Rico entrepreneur',
    // ── Servicios ──────────────────────────────
    'desarrollo web Puerto Rico',
    'apps móviles Puerto Rico',
    'integración inteligencia artificial negocios',
    'consultoría tecnológica',
    'desarrollo aplicaciones móviles',
    'WebApp desarrollo',
    'CTO as a Service',
    'Flutter developer',
    'Next.js developer',
    'AI integration consultant',
    'mobile app developer Puerto Rico',
    // ── Nearshore US Market ────────────────────
    'nearshore software development Puerto Rico',
    'nearshore developer Puerto Rico',
    'hire developer Puerto Rico',
    'Puerto Rico software consultant',
    'Puerto Rico US territory developer',
    'nearshore Latin America',
    // ── Empresas y proyectos ───────────────────
    'Punybz',
    'Puny.bz COO',
    'ALQMY Corp',
    'San Juan Puerto Rico tech',
    // ── Logros y aceleradoras ─────────────────
    'Parallel18 alumni',
    'Parallel18 Gen 13',
    'UPRM electrical engineer',
    'Eagle Scout entrepreneur',
    'startup mentor Puerto Rico',
    'ATO Ventures Puerto Rico',
    'NVIDIA Inception Program',
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
    title: 'Saul A. González — Consultor Digital & Vibe Coder | Puerto Rico',
    description: 'Vibe coder y consultor digital desde Arecibo, Puerto Rico. COO de Puny.bz (1,303 negocios, 19 países). Parallel18 Gen 13. Eagle Scout. UPRM. WebApps, Apps iOS/Android, IA. Nearshore US: Eastern Time, ley federal, sin visa. Consulta gratis.',
    type: 'website',
    url: 'https://saulgonzalez.pro',
    siteName: 'Saul A. González',
    locale: 'es_PR',
    images: [{ url: 'https://saulgonzalez.pro/og.png', width: 1200, height: 630, alt: 'Saul A. González — Consultor Digital y Software Engineer en Puerto Rico' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@buscasaul',
    creator: '@buscasaul',
    title: 'Saul A. González — Consultor Digital | Puerto Rico',
    description: 'Vibe coder & consultor digital desde PR. COO Puny.bz. Parallel18 Gen 13. Eagle Scout. WebApps, Apps, IA. Nearshore US. Consulta gratis.',
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
