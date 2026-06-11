import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'
import { schema } from '@/lib/jsonld'

export const metadata: Metadata = {
  alternates: { canonical: 'https://saulgonzalez.pro' },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HomePage />
    </>
  )
}
