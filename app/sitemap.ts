import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  return [
    {
      url: 'https://saulgonzalez.pro/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...posts.map(p => ({
      url: `https://saulgonzalez.pro/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: 'https://saulgonzalez.pro',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://saulgonzalez.pro/en',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: 'https://saulgonzalez.pro/tools',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...[
      'generador-safe',
      'generador-nota-convertible',
      'checklist-dataroom',
      'calculadora-dilucion',
      'calculadora-safe',
      'simulador-cap-table',
      'calculadora-runway',
      'red-flags-term-sheet',
    ].map(slug => ({
      url: `https://saulgonzalez.pro/tools/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: 'https://saulgonzalez.pro/privacidad',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://saulgonzalez.pro/terminos',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
