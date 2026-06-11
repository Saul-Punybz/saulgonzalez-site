import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'

export const metadata: Metadata = {
  title: 'Nearshore Software Development in Puerto Rico — Act 60 Ready',
  description: 'US-based nearshore development from San Juan, PR. Eastern Time, US law, no visa. WebApps, mobile apps & AI integration for US and Act 60 companies.',
  alternates: {
    canonical: 'https://saulgonzalez.pro/en',
    languages: {
      'x-default': 'https://saulgonzalez.pro',
      es: 'https://saulgonzalez.pro',
      en: 'https://saulgonzalez.pro/en',
    },
  },
  openGraph: {
    title: 'Nearshore Software Development in Puerto Rico — Act 60 Ready',
    description: 'US territory, Eastern Time, US law, no visa required. Senior WebApp, mobile and AI development at nearshore rates. Free 30-min consult.',
    url: 'https://saulgonzalez.pro/en',
    locale: 'en_US',
  },
}

const schemaEn = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://saulgonzalez.pro/en#webpage',
      url: 'https://saulgonzalez.pro/en',
      name: 'Nearshore Software Development in Puerto Rico — Saul A. González',
      inLanguage: 'en-US',
      about: { '@id': 'https://saulgonzalez.pro/#person' },
      isPartOf: { '@id': 'https://saulgonzalez.pro/#website' },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://saulgonzalez.pro/en#faq',
      inLanguage: 'en-US',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Why hire a software developer in Puerto Rico instead of offshore?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Puerto Rico is a U.S. territory: contracts under U.S. law, full IP protection, USD, no visa or work permit, and Eastern Time overlap with your whole business day. You get nearshore rates (30-50% below mainland senior engineers) with none of the legal or timezone friction of India or Eastern Europe.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you work with Act 60 companies and decree holders?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Saul González is himself an Act 60 beneficiary and co-founded Puny.bz, an Act 60 + Parallel18 success case. He builds WebApps, mobile apps, AI automations and internal tools for Act 60 businesses operating from Puerto Rico — and understands the export-services compliance context (bona fide residency, PR-sourced services) that mainland vendors don’t.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does an engagement look like and what does it cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A free 30-minute discovery call, then a fixed proposal with scope, milestones and timeline. MVPs and small WebApps from $3,000-$10,000; mid-complexity platforms $10,000-$35,000; enterprise and complex mobile apps $35,000+. AI integration projects from $3,000, often in production within 2-4 weeks. Fractional CTO retainers from 10 hours/month.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you meet on-site in the continental US or in Puerto Rico?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. As a Puerto Rico resident, Saul travels freely to any U.S. state — no visa needed — for kickoffs and key milestones, and meets Act 60 clients in person in San Juan. Day-to-day work runs on your stack: Slack, Linear or Notion, GitHub, Zoom or Meet, Monday-Friday 8am-6pm Eastern.',
          },
        },
        {
          '@type': 'Question',
          name: 'What do you build?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WebApps and web systems (CRMs, portals, dashboards, marketplaces, SaaS), iOS/Android apps (Flutter, Swift, Kotlin), and AI integration (agents, LLM automations, chatbots with Claude, GPT and Gemini). Stack: Next.js, React, TypeScript, Go, Node.js, PostgreSQL, Vercel, AWS.',
          },
        },
      ],
    },
  ],
}

export default function HomeEn() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaEn) }}
      />
      <HomePage initialLang="en" />
    </>
  )
}
