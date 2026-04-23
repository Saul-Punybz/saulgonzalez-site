import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://saulgonzalez.pro'),
  title: 'Saul A. González — Consultoría Digital',
  description: 'WebApps, Apps Móviles e Integración de IA para negocios que quieren crecer. 15 años de experiencia. Puerto Rico y el mundo.',
  openGraph: {
    title: 'Saul A. González — Consultoría Digital',
    description: 'WebApps, Apps Móviles e Integración de IA. 15 años. Consulta gratis.',
    type: 'website',
    url: 'https://saulgonzalez.pro',
    siteName: 'Saul A. González',
    locale: 'es_PR',
    images: [{ url: 'https://saulgonzalez.pro/og.png', width: 1200, height: 630, alt: 'Saul A. González — Consultoría Digital' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saul A. González — Consultoría Digital',
    description: 'WebApps, Apps Móviles e Integración de IA. 15 años. Consulta gratis.',
    creator: '@buscasaul',
    images: ['https://saulgonzalez.pro/og.png'],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body className="bg-white dark:bg-ink text-slate-900 dark:text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
