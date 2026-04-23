import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── saulgonzalez.pro ──────────────────────────────────
    {
      url: 'https://saulgonzalez.pro',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
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

    // ── blogs.saulgonzalez.pro ────────────────────────────
    {
      url: 'https://blogs.saulgonzalez.pro',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://blogs.saulgonzalez.pro/de-arecibo-a-parallel18',
      lastModified: new Date('2026-04-23'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://blogs.saulgonzalez.pro/construyendo-sobre-el-hype',
      lastModified: new Date('2026-03-27'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://blogs.saulgonzalez.pro/lo-que-las-pequenas-empresas-necesitan',
      lastModified: new Date('2026-03-25'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
