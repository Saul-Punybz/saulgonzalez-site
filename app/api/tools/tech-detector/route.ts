import { NextRequest, NextResponse } from 'next/server'
import { fetchPage, getMeta, normalizeUrl } from '@/lib/analyzer'

type Tech = { name: string; category: string; confidence: 'high' | 'medium' | 'low'; icon: string }

function detect(html: string, headers: Record<string, string>, url: string): Tech[] {
  const techs: Tech[] = []
  const h = html.toLowerCase()
  const has = (pattern: string | RegExp) =>
    typeof pattern === 'string' ? h.includes(pattern) : pattern.test(h)

  // ── JS Frameworks ──────────────────────────────────────────────
  if (has('__next_data__') || has('/_next/')) {
    techs.push({ name: 'Next.js', category: 'Framework', confidence: 'high', icon: '▲' })
    techs.push({ name: 'React', category: 'Librería UI', confidence: 'high', icon: '⚛️' })
  } else if (has('__nuxt') || has('/_nuxt/')) {
    techs.push({ name: 'Nuxt.js', category: 'Framework', confidence: 'high', icon: '💚' })
    techs.push({ name: 'Vue.js', category: 'Librería UI', confidence: 'high', icon: '🟩' })
  } else if (has('___gatsby') || has('/gatsby-')) {
    techs.push({ name: 'Gatsby', category: 'Framework', confidence: 'high', icon: '💜' })
    techs.push({ name: 'React', category: 'Librería UI', confidence: 'high', icon: '⚛️' })
  } else if (has('__remixcontext') || has('/__remix')) {
    techs.push({ name: 'Remix', category: 'Framework', confidence: 'high', icon: '💿' })
    techs.push({ name: 'React', category: 'Librería UI', confidence: 'high', icon: '⚛️' })
  } else if (has('astro-island') || has('astro:page-load')) {
    techs.push({ name: 'Astro', category: 'Framework', confidence: 'high', icon: '🚀' })
  } else if (has('react-root') || has('reactroot') || has('_reactfiber')) {
    techs.push({ name: 'React', category: 'Librería UI', confidence: 'medium', icon: '⚛️' })
  } else if (has('__vue_') || has('data-v-') || has('vue.config')) {
    techs.push({ name: 'Vue.js', category: 'Librería UI', confidence: 'high', icon: '🟩' })
  } else if (has('ng-version') || has('[ng-') || has('angular.js')) {
    techs.push({ name: 'Angular', category: 'Framework', confidence: 'high', icon: '🔴' })
  } else if (has('__svelte') || has('svelte-')) {
    techs.push({ name: 'Svelte', category: 'Framework', confidence: 'high', icon: '🧡' })
  }
  if (has('framerusercontent.com') || has('framer.com/m/') || has('framerstatic.com')) {
    techs.push({ name: 'Framer', category: 'No-Code', confidence: 'high', icon: '🎞️' })
  }

  // ── CMS ────────────────────────────────────────────────────────
  if (has('/wp-content/') || has('/wp-includes/') || has('wp-json')) {
    techs.push({ name: 'WordPress', category: 'CMS', confidence: 'high', icon: '🔵' })
    if (has('elementor')) techs.push({ name: 'Elementor', category: 'Page Builder', confidence: 'high', icon: '🧩' })
    else if (has('divi') || has('et_pb_')) techs.push({ name: 'Divi', category: 'Page Builder', confidence: 'high', icon: '🎨' })
    else if (has('wpbakery') || has('vc_row')) techs.push({ name: 'WPBakery', category: 'Page Builder', confidence: 'high', icon: '🧱' })
    if (has('woocommerce') || has('wc-') || has('/shop/')) techs.push({ name: 'WooCommerce', category: 'eCommerce', confidence: 'high', icon: '🛍️' })
  } else if (has('shopify.theme') || has('cdn.shopify.com')) {
    techs.push({ name: 'Shopify', category: 'eCommerce', confidence: 'high', icon: '🛒' })
  } else if (has('squarespace.com') || has('static1.squarespace.com')) {
    techs.push({ name: 'Squarespace', category: 'CMS', confidence: 'high', icon: '⬛' })
  } else if (has('wixstatic.com') || has('wix.com')) {
    techs.push({ name: 'Wix', category: 'CMS', confidence: 'high', icon: '🟨' })
  } else if (has('webflow.com') || has('webflow.js')) {
    techs.push({ name: 'Webflow', category: 'No-Code', confidence: 'high', icon: '🔷' })
  } else if (has('ghost.io') || has('ghost-theme')) {
    techs.push({ name: 'Ghost', category: 'CMS', confidence: 'high', icon: '👻' })
  } else if (has('puny.bz') || has('puny-bz') || has('punybz')) {
    techs.push({ name: 'Puny.bz', category: 'Website Builder', confidence: 'high', icon: '🟦' })
  } else if (has('notion.so') || has('notion.site')) {
    techs.push({ name: 'Notion', category: 'CMS', confidence: 'high', icon: '📓' })
  } else if (has('hubspotusercontent') || has('hs-scripts.com')) {
    techs.push({ name: 'HubSpot CMS', category: 'CMS', confidence: 'high', icon: '🟠' })
  }

  // ── Backend ────────────────────────────────────────────────────
  if ((headers['x-powered-by'] || '').toLowerCase().includes('php') || has('csrftoken') === false && has('.php')) {
    if (!techs.find(t => t.name === 'WordPress')) {
      techs.push({ name: 'PHP', category: 'Backend', confidence: 'medium', icon: '🐘' })
    }
  }
  if (has('csrfmiddlewaretoken') || has('django')) {
    techs.push({ name: 'Django', category: 'Backend', confidence: 'high', icon: '🐍' })
  }
  if ((headers['x-powered-by'] || '').toLowerCase().includes('express')) {
    techs.push({ name: 'Express.js', category: 'Backend', confidence: 'high', icon: '🟢' })
  }
  if ((headers['x-powered-by'] || '').toLowerCase().includes('rails') || has('csrf-token') && has('rails')) {
    techs.push({ name: 'Ruby on Rails', category: 'Backend', confidence: 'high', icon: '💎' })
  }
  if (has('laravel') || has('laravel_session')) {
    techs.push({ name: 'Laravel', category: 'Backend', confidence: 'high', icon: '🔴' })
  }

  // ── CSS Frameworks ─────────────────────────────────────────────
  if (has('tailwindcss') || has('tailwind.min.css') || has('tw-')) {
    techs.push({ name: 'Tailwind CSS', category: 'CSS Framework', confidence: 'medium', icon: '🎨' })
  }
  if (has('bootstrap.min.css') || has('bootstrap.js') || has('class="container"')) {
    techs.push({ name: 'Bootstrap', category: 'CSS Framework', confidence: 'medium', icon: '🅱️' })
  }
  if (has('material-ui') || has('muibox') || has('@mui')) {
    techs.push({ name: 'Material UI', category: 'CSS Framework', confidence: 'high', icon: '🎭' })
  }

  // ── Payments ───────────────────────────────────────────────────
  if (has('js.stripe.com') || has("stripe('") || has('stripe.js')) {
    techs.push({ name: 'Stripe', category: 'Pagos', confidence: 'high', icon: '💳' })
  }
  if (has('paypal.com/sdk') || has('paypalobjects.com')) {
    techs.push({ name: 'PayPal', category: 'Pagos', confidence: 'high', icon: '🅿️' })
  }
  if (has('athmovil') || has('ath.business') || has('evertec')) {
    techs.push({ name: 'ATH Móvil', category: 'Pagos', confidence: 'high', icon: '🇵🇷' })
  }

  // ── Analytics ─────────────────────────────────────────────────
  if (has('googletagmanager.com/gtag') || has("gtag('config'")) {
    techs.push({ name: 'Google Analytics 4', category: 'Analytics', confidence: 'high', icon: '📊' })
  } else if (has('google-analytics.com') || has('ua-')) {
    techs.push({ name: 'Google Analytics', category: 'Analytics', confidence: 'medium', icon: '📊' })
  }
  if (has('googletagmanager.com/gtm')) {
    techs.push({ name: 'Google Tag Manager', category: 'Analytics', confidence: 'high', icon: '🏷️' })
  }
  if (has('connect.facebook.net') || has("fbq('")) {
    techs.push({ name: 'Meta Pixel', category: 'Marketing', confidence: 'high', icon: '👁️' })
  }
  if (has('hotjar.com')) {
    techs.push({ name: 'HotJar', category: 'Analytics', confidence: 'high', icon: '🔥' })
  }
  if (has('clarity.ms')) {
    techs.push({ name: 'Microsoft Clarity', category: 'Analytics', confidence: 'high', icon: '🔍' })
  }
  if (has('plausible.io')) {
    techs.push({ name: 'Plausible', category: 'Analytics', confidence: 'high', icon: '📈' })
  }
  if (has('segment.com') || has('segment.io') || has('analytics.js')) {
    techs.push({ name: 'Segment', category: 'Analytics', confidence: 'high', icon: '🔵' })
  }
  if (has('posthog.com') || has('posthog.js')) {
    techs.push({ name: 'PostHog', category: 'Analytics', confidence: 'high', icon: '🦔' })
  }
  if (has('amplitude.com') || has('amplitude.js')) {
    techs.push({ name: 'Amplitude', category: 'Analytics', confidence: 'high', icon: '📉' })
  }

  // ── CRM / Marketing ────────────────────────────────────────────
  if (has('js.hs-scripts.com') || has('hubspot.com') || has('hbspt.')) {
    techs.push({ name: 'HubSpot', category: 'CRM/Marketing', confidence: 'high', icon: '🟠' })
  }
  if (has('chimpstatic.com') || has('mailchimp.com')) {
    techs.push({ name: 'Mailchimp', category: 'Email Marketing', confidence: 'high', icon: '🐒' })
  }
  if (has('klaviyo.com')) {
    techs.push({ name: 'Klaviyo', category: 'Email Marketing', confidence: 'high', icon: '✉️' })
  }
  if (has('salesforce.com') || has('salesforceliveagent')) {
    techs.push({ name: 'Salesforce', category: 'CRM', confidence: 'high', icon: '☁️' })
  }

  // ── Chat / Support ─────────────────────────────────────────────
  if (has('intercom.io') || has('intercomSettings')) {
    techs.push({ name: 'Intercom', category: 'Chat', confidence: 'high', icon: '💬' })
  }
  if (has('crisp.chat') || has('client.crisp.chat')) {
    techs.push({ name: 'Crisp', category: 'Chat', confidence: 'high', icon: '💬' })
  }
  if (has('tawk.to') || has('embed.tawk.to')) {
    techs.push({ name: 'Tawk.to', category: 'Chat', confidence: 'high', icon: '💬' })
  }
  if (has('zendesk.com') || has('zdassets.com')) {
    techs.push({ name: 'Zendesk', category: 'Soporte', confidence: 'high', icon: '🎧' })
  }

  // ── Media / CDN ────────────────────────────────────────────────
  if (has('res.cloudinary.com') || has('cloudinary.com')) {
    techs.push({ name: 'Cloudinary', category: 'Media/CDN', confidence: 'high', icon: '☁️' })
  }
  if (has('cdn.jsdelivr.net')) {
    techs.push({ name: 'jsDelivr CDN', category: 'CDN', confidence: 'high', icon: '⚡' })
  }
  if (has('cdnjs.cloudflare.com')) {
    techs.push({ name: 'Cloudflare CDN', category: 'CDN', confidence: 'high', icon: '🟠' })
  }

  // ── Hosting (from headers) ─────────────────────────────────────
  if (headers['x-vercel-id'] || headers['x-vercel-cache'] || url.includes('vercel.app')) {
    techs.push({ name: 'Vercel', category: 'Hosting', confidence: 'high', icon: '▲' })
  } else if (headers['x-nf-request-id'] || url.includes('netlify.app')) {
    techs.push({ name: 'Netlify', category: 'Hosting', confidence: 'high', icon: '🟩' })
  } else if (headers['cf-ray']) {
    techs.push({ name: 'Cloudflare', category: 'CDN/Proxy', confidence: 'high', icon: '🟠' })
  } else if (headers['x-amz-cf-id'] || headers['x-amz-request-id']) {
    techs.push({ name: 'Amazon AWS', category: 'Hosting', confidence: 'high', icon: '🟡' })
  } else if (url.includes('github.io')) {
    techs.push({ name: 'GitHub Pages', category: 'Hosting', confidence: 'high', icon: '🐙' })
  } else if (headers['x-kinsta-cache'] || url.includes('kinsta.cloud')) {
    techs.push({ name: 'Kinsta', category: 'Hosting', confidence: 'high', icon: '🟣' })
  } else if (headers['x-cacheable'] && (headers['server'] || '').includes('wpengine')) {
    techs.push({ name: 'WP Engine', category: 'Hosting', confidence: 'high', icon: '🔵' })
  }

  return techs
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('url')
  if (!raw) return NextResponse.json({ error: 'url required' }, { status: 400 })

  try {
    const { html, headers, finalUrl } = await fetchPage(raw)
    const url = normalizeUrl(raw)
    const generator = getMeta(html, 'name', 'generator')
    const poweredBy = headers['x-powered-by'] ?? null
    const server    = headers['server'] ?? null

    const technologies = detect(html, headers, finalUrl || url)

    const security = {
      https: (finalUrl || url).startsWith('https://'),
      hsts: !!(headers['strict-transport-security']),
      xframe: headers['x-frame-options'] ?? null,
      csp: !!(headers['content-security-policy']),
      xcontenttype: headers['x-content-type-options'] ?? null,
    }

    const score = Math.min(100, Math.round(
      (security.https ? 20 : 0) +
      (security.hsts ? 15 : 0) +
      (security.xframe ? 15 : 0) +
      (security.csp ? 15 : 0) +
      Math.min(35, technologies.length * 5)
    ))

    return NextResponse.json({
      url: finalUrl || url,
      technologies,
      generator,
      poweredBy,
      server,
      security,
      score,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error al analizar'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
