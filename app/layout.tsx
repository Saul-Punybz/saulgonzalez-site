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
  title: {
    default: 'Saul A. González — Consultor Digital & Software Engineer | Puerto Rico',
    template: '%s | Saul A. González',
  },
  description: 'Consultor digital y software engineer con 15+ años de experiencia. Desarrollo WebApps, Apps Móviles e integración de Inteligencia Artificial para negocios en Puerto Rico y el mundo. Consulta gratis.',
  keywords: [
    'consultor digital Puerto Rico',
    'desarrollo web Puerto Rico',
    'apps móviles Puerto Rico',
    'integración inteligencia artificial negocios',
    'software engineer Puerto Rico',
    'consultoría tecnológica',
    'desarrollo aplicaciones móviles',
    'WebApp desarrollo',
    'CTO as a Service',
    'Flutter developer',
    'Next.js developer',
    'Saul González consultor',
    'Punybz',
    'San Juan Puerto Rico tech',
  ],
  authors: [{ name: 'Saul A. González', url: 'https://saulgonzalez.pro' }],
  creator: 'Saul A. González',
  publisher: 'Saul A. González',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://saulgonzalez.pro',
    languages: {
      'es-PR': 'https://saulgonzalez.pro',
      'en-US': 'https://saulgonzalez.pro',
    },
  },
  openGraph: {
    title: 'Saul A. González — Consultor Digital | WebApps, Apps Móviles, IA',
    description: 'Software engineer con 15+ años construyendo productos digitales para 29 países. WebApps, Apps iOS/Android e integración de IA. Consulta gratis en 24h.',
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
    description: 'Software engineer con 15+ años. WebApps, Apps Móviles e IA para tu negocio. Consulta gratis.',
    images: ['https://saulgonzalez.pro/og.png'],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  category: 'technology',
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    // ── Person ─────────────────────────────────────────────────────
    {
      '@type': 'Person',
      '@id': 'https://saulgonzalez.pro/#person',
      name: 'Saul A. González',
      alternateName: 'Saul Gonzalez',
      url: 'https://saulgonzalez.pro',
      image: {
        '@type': 'ImageObject',
        url: 'https://saulgonzalez.pro/saul.jpg',
        width: 800,
        height: 800,
      },
      sameAs: [
        'https://twitter.com/buscasaul',
        'https://linkedin.com/in/saulgonzalez',
        'https://github.com/Saul-Punybz',
        'https://puny.bz',
      ],
      jobTitle: 'Consultor Digital & Software Engineer',
      description: 'Saul A. González es un consultor digital y software engineer con sede en San Juan, Puerto Rico, con más de 15 años de experiencia construyendo WebApps, aplicaciones móviles iOS y Android, e integraciones de Inteligencia Artificial para negocios en más de 29 países.',
      knowsAbout: [
        'Desarrollo Web', 'WebApps', 'Aplicaciones Móviles', 'Flutter', 'Swift', 'Kotlin',
        'Inteligencia Artificial', 'Agentes de IA', 'Next.js', 'React', 'Go', 'TypeScript',
        'Node.js', 'CTO as a Service', 'Consultoría Técnica', 'Arquitectura de Software',
        'Puerto Rico Tech', 'Startups', 'SaaS',
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Software Engineer & Digital Consultant',
        occupationalCategory: '15-1252.00',
        skills: 'WebApps, Mobile Apps, AI Integration, Software Architecture',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Punybz',
        url: 'https://puny.bz',
        description: 'Plataforma SaaS no-code para negocios y concesionarios de autos.',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'San Juan',
        addressRegion: 'PR',
        addressCountry: 'US',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'saul@puny.bz',
        contactType: 'customer service',
        availableLanguage: ['Spanish', 'English'],
        areaServed: 'Worldwide',
      },
    },

    // ── ProfessionalService ────────────────────────────────────────
    {
      '@type': 'ProfessionalService',
      '@id': 'https://saulgonzalez.pro/#service',
      name: 'Consultoría Digital — Saul A. González',
      url: 'https://saulgonzalez.pro',
      image: 'https://saulgonzalez.pro/og.png',
      logo: 'https://saulgonzalez.pro/icon.svg',
      description: 'Consultoría digital especializada en desarrollo de WebApps, aplicaciones móviles iOS y Android, e integración de Inteligencia Artificial para empresas y startups en Puerto Rico y el mundo.',
      provider: { '@id': 'https://saulgonzalez.pro/#person' },
      areaServed: [
        { '@type': 'Country', name: 'United States' },
        { '@type': 'AdministrativeArea', name: 'Puerto Rico' },
        { '@type': 'Country', name: 'Worldwide' },
      ],
      serviceType: [
        'Desarrollo de WebApps',
        'Apps iOS y Android',
        'Integración de Inteligencia Artificial',
        'Consultoría Técnica',
        'CTO as a Service',
        'Automatización con IA',
        'Agentes de IA',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de Consultoría Digital',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'WebApp / Sistema Web', description: 'CRM, portal, dashboard, marketplace a medida.' },
            priceRange: '$3,000 - $50,000+',
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'App iOS o Android', description: 'Aplicaciones móviles nativas o multiplataforma con Flutter.' },
            priceRange: '$5,000 - $50,000+',
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Integración de IA', description: 'Agentes, automatizaciones, chatbots y pipelines de IA para tu negocio.' },
            priceRange: '$3,000 - $35,000+',
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Consulta Gratis', description: 'Sesión inicial gratuita de 30 minutos para evaluar tu proyecto.' },
            price: '0',
            priceCurrency: 'USD',
          },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '15',
        bestRating: '5',
        worstRating: '1',
      },
    },

    // ── WebSite ────────────────────────────────────────────────────
    {
      '@type': 'WebSite',
      '@id': 'https://saulgonzalez.pro/#website',
      url: 'https://saulgonzalez.pro',
      name: 'Saul A. González — Consultor Digital',
      description: 'Portafolio y consultoría digital de Saul A. González, software engineer con 15+ años en Puerto Rico.',
      publisher: { '@id': 'https://saulgonzalez.pro/#person' },
      inLanguage: ['es-PR', 'en-US'],
      potentialAction: [
        {
          '@type': 'ContactAction',
          target: 'https://saulgonzalez.pro/#quiz',
          name: 'Agendar consulta gratis',
        },
        {
          '@type': 'CommunicateAction',
          target: 'mailto:saul@puny.bz',
          name: 'Enviar email',
        },
      ],
    },

    // ── FAQPage — gold for AI extraction ──────────────────────────
    {
      '@type': 'FAQPage',
      '@id': 'https://saulgonzalez.pro/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Quién es Saul A. González?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Saul A. González es un consultor digital y software engineer puertorriqueño con más de 15 años de experiencia. Ha construido productos digitales para más de 29 países, incluyendo WebApps, aplicaciones móviles iOS y Android, e integraciones de Inteligencia Artificial. Es COO y cofundador de Punybz, plataforma SaaS con más de 1,300 usuarios activos.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto cuesta desarrollar una WebApp o app móvil con Saul González?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Los proyectos de WebApp comienzan desde $3,000 para MVPs y pueden llegar a $50,000+ para sistemas empresariales complejos. Las apps móviles iOS/Android van desde $5,000. Ofrece una consulta inicial gratuita de 30 minutos para estimar el costo exacto de tu proyecto.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Trabaja con negocios fuera de Puerto Rico?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí. Saul González trabaja de forma remota con clientes en más de 29 países. Sus clientes incluyen negocios en Estados Unidos, América Latina, Europa y el Caribe. Habla español e inglés con fluidez.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué tecnologías usa Saul González para desarrollar aplicaciones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Saul González usa Next.js y React para WebApps, Flutter para aplicaciones móviles iOS y Android multiplataforma, Swift para apps nativas iOS, Go para backend de alto rendimiento, TypeScript, Node.js, y modelos de IA como Claude (Anthropic), GPT-4 (OpenAI) y Gemini para integraciones de Inteligencia Artificial.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cómo funciona el proceso de trabajo con Saul González?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'El proceso inicia con una consulta gratuita de 30 minutos para entender el proyecto. Luego se elabora una propuesta detallada con scope, timeline y presupuesto. El desarrollo sigue metodologías ágiles con entregas incrementales. El cliente recibe actualizaciones semanales y acceso a demos en tiempo real.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Puede integrar Inteligencia Artificial en mi negocio?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí. Saul González diseña e implementa agentes de IA, automatizaciones con LLMs, chatbots inteligentes, sistemas de análisis de datos con IA, y flujos de trabajo automatizados usando Claude, GPT-4, Gemini y LangChain. Los proyectos de IA comienzan desde $3,000.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Ofrece servicios de CTO as a Service?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí. Saul González ofrece consultoría técnica y CTO as a Service para startups y empresas que necesitan liderazgo técnico sin contratar un CTO full-time. Esto incluye definición de arquitectura, selección de tecnología, revisión de código, y mentoría del equipo de desarrollo.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto tiempo tarda en desarrollar un proyecto?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Un MVP básico puede estar listo en 4-8 semanas. Una WebApp de mediana complejidad tarda 2-4 meses. Una app móvil completa puede tomar 3-6 meses. Los timelines exactos se definen en la propuesta inicial basados en el scope del proyecto.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="bg-white dark:bg-ink text-slate-900 dark:text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
