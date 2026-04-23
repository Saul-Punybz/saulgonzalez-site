'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { useTheme } from 'next-themes'
import Quiz from '@/components/Quiz'

/* ─── LANG ────────────────────────────────────────── */
type Lang = 'es' | 'en'

const T = {
  es: {
    hero_badge: 'Para founders y equipos con proyectos digitales serios',
    hero_title1: 'Tu competencia ya lanzó.',
    hero_title2: '¿Cuándo lo haces tú?',
    hero_sub: 'WebApps, apps móviles e IA — entregadas en semanas, no en meses. Sin agencias lentas, sin freelancers que desaparecen.',
    hero_cta: 'Reserva tu llamada gratis — 30 min',
    hero_services: 'Ver servicios →',
    hero_disclaimer: 'Sin compromiso · Si no soy el indicado, te conecto con quien puede ayudarte',
    hero_bottom: 'Co-fundador de Puny.bz · PR · US · Chile · Argentina · 29 países',
    clients_heading: 'Han confiado en nosotros',
    puny_sub: 'Co-fundador · 1,303 negocios · 29 países',
    results: [
      { n: '400',    label: 'Leads en 1 día',        sub: 'Dnuevo Coffee' },
      { n: '40/sem', label: 'Leads de alto valor',   sub: 'Reciclaje del Norte' },
      { n: '15+',    label: 'Años de experiencia',   sub: 'PR · US · Chile · Argentina' },
      { n: '2,000+', label: 'Proyectos impactados',  sub: 'en 15 años de trabajo' },
    ],
    villain_tag: 'El problema real',
    villain_title1: 'Ellos cobran por el proceso.',
    villain_title2: 'Yo cobro por el resultado.',
    villain_sub: 'Las agencias facturan horas. Los freelancers facturan tareas. Nadie factura por lo que realmente importa: que funcione, que venda, que dure.',
    villains: [
      {
        icon: '⏳',
        title: 'El proyecto que nunca se termina',
        desc: 'Llevan 6 meses "casi listos". Cada semana hay un nuevo problema. Cada problema tiene un costo extra. Y cuando preguntas cuándo va a estar listo, la respuesta es siempre la misma: "pronto". El tiempo pasa, el dinero se va, y tu negocio sigue esperando.',
      },
      {
        icon: '👻',
        title: 'El freelancer que desaparece',
        desc: 'El primer mes: energía, promesas, updates diarios. El segundo: respuestas lentas. El tercero: silencio total. El código a medias es tuyo, el dinero es de ellos, y tú volviste a cero — con menos tiempo y más frustración que antes de empezar.',
      },
      {
        icon: '🏦',
        title: 'La agencia que te ve como banco',
        desc: 'Te proponen lo más caro antes de entender tu negocio. La presentación impresiona, el diseño es bonito — y al final te entregan algo que tu equipo no sabe usar, que no funciona sin ellos, y que tienes que seguirles pagando para mantener. No te vendieron tecnología. Te vendieron dependencia.',
      },
    ],
    villain_quote: '"Cuando algo no funciona, no mando un reporte.',
    villain_quote_hl: ' Lo arreglo.',
    villain_quote_end: '"',
    villain_quote_pre: 'Así es como trabajo.',
    villain_cta: 'Cuéntame tu proyecto →',
    services_tag: 'Servicios',
    services_title: 'En qué puedo ayudarte',
    services: [
      { label: 'WebApp, iOS & Android', desc: 'CRMs, portales, dashboards y marketplaces — más apps nativas para iPhone y Android. Integraciones con Stripe, ATH Móvil y MercadoPago. Un solo equipo que cubre web y móvil completo.', result: 'Web y móvil bajo un mismo equipo', tags: ['Next.js','React','Node.js','Go','Swift','Kotlin','React Native','Flutter'], showBadges: true },
      { label: 'IA para tu Negocio',    desc: 'Agentes inteligentes, automatizaciones y chatbots que se integran a lo que ya tienes. IA que trabaja para tu operación, no que la reemplaza.', result: 'Automatiza lo repetitivo, escala lo importante', tags: ['Claude API','GPT-4','LangChain','RAG'], showBadges: false },
      { label: 'Consultoría Técnica',   desc: '¿Tienes un equipo pero necesitas dirección? CTO as a Service, revisión de arquitectura, decisiones de stack. Un experto sin contratarlo full-time.', result: 'Decisiones técnicas sin adivinanzas', tags: ['Arquitectura','Code Review','CTO as a Service'], showBadges: false },
    ],
    about_tag: 'Quién soy',
    about_title: 'Soy Saul A. González —',
    about_sub: 'builder & estratega de negocios.',
    about_bio: [
      'La mayoría de proyectos digitales fallan porque el desarrollador entiende código — pero no tu negocio. Eso me obsesiona. 15 años construyendo con equipos en <b>Puerto Rico, EE.UU., Chile y Argentina</b>. Co-fundador de <b>Puny.bz</b>, que hoy sirve a 1,303 negocios activos — incluyendo el gobierno de Puerto Rico.',
      'Mi trabajo es hacer que la tecnología funcione <i>para</i> tu negocio. No que tu negocio tenga que girar alrededor de la tecnología. Cuando llegas con una idea, me siento a entenderla antes de proponer cualquier solución.',
    ],
    about_stats: [
      { n: '15+',    l: 'años de experiencia' },
      { n: '2,000+', l: 'proyectos impactados' },
      { n: '29',     l: 'países alcanzados' },
      { n: '1,303', l: 'usuarios en Puny.bz' },
    ],
    process_tag: 'El proceso',
    process_title: 'Empezar es simple — 3 pasos',
    steps: [
      { n: '01', title: 'Conversación de 30 min — gratis', desc: 'Cuéntame tu idea, tu negocio y qué quieres lograr. No te vendo nada en la primera llamada. Solo escucho y hago preguntas.' },
      { n: '02', title: 'Plan técnico personalizado',      desc: 'Te entrego una hoja de ruta honesta: tecnología recomendada, tiempos reales y rango de costos. Todo antes de comprometerte a nada.' },
      { n: '03', title: 'Construimos juntos — o te conecto', desc: 'Si soy el indicado, construimos. Si hay alguien mejor para tu caso específico, te lo digo directamente y te presento con esa persona. Sin costo, sin rodeos.' },
    ],
    quiz_tag: 'Empecemos',
    quiz_title: 'Cuéntame tu proyecto',
    quiz_sub: 'Toma 2 minutos. Me ayuda a preparar algo útil antes de hablar — y si no sé exactamente qué necesitas, lo descubrimos juntos.',
    cases_tag: 'Resultados reales',
    cases_title: 'Proyectos que hablan por sí solos',
    cases: [
      {
        tag: 'Case Study · Programa de Lealtad Digital',
        company: 'Dnuevo Coffee Specialty',
        logo: '/logos/dnuevo.webp',
        logoInvertLight: true,
        industry: 'Food & Beverage · Puerto Rico',
        gradient: 'from-amber-500/20 to-orange-500/5',
        accent: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-500/25',
        metrics: [
          { value: '400+',  label: 'clientes activados', sub: 'en el día del lanzamiento' },
          { value: '$0',    label: 'costo de alcance',   sub: 'canal directo sin publicidad' },
        ],
        challenge: 'Dnuevo Coffee quería dar más valor a sus clientes y poder contactarlos directamente sin depender de redes sociales ni pagar publicidad cada vez.',
        solution:   'Diseñamos y lanzamos una experiencia digital de lealtad integrada con Apple Wallet y Google Wallet — disponible como módulo para todos los usuarios de Puny.bz, pero estrenada primero con Dnuevo.',
        result:     'Más de 400 personas se unieron el día del lanzamiento. Al otro día ya estaban reclamando sus puntos. Hoy Dnuevo tiene un canal directo con sus clientes, sin costos adicionales.',
        quote:      'Al otro día ya la gente estaba usando el sistema y reclamando sus puntos. Fue un éxito total.',
        name: 'Gilberto Calderón', role: 'Co-fundador · Dnuevo Coffee', initials: 'GC', avatarColor: 'bg-amber-600', avatar: '/gilberto.jpg',
      },
      {
        tag: 'Case Study · Plataforma Web & Lead Generation',
        company: 'Reciclaje del Norte',
        logo: '/logos/rdn.avif',
        industry: 'Industria Ambiental · Puerto Rico',
        gradient: 'from-emerald-500/20 to-teal-500/5',
        accent: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-500/25',
        metrics: [
          { value: '0→40', label: 'leads por semana', sub: 'municipios y empresas' },
          { value: 'Gov+', label: 'perfil de cliente', sub: 'gobierno y sector privado' },
        ],
        challenge: 'Su presencia web era un folleto digital que no generaba negocio. Necesitaban que municipios, agencias de gobierno y empresas los contactaran directamente.',
        solution:   'Reconstruimos la plataforma con SEO técnico, landing pages segmentadas por tipo de cliente, y un sistema de cotización automatizado.',
        result:     'En semanas pasaron de 0 a 40 solicitudes semanales de alto valor. El ROI fue inmediato y el canal se convirtió en su principal fuente de clientes.',
        quote:      'Saul lo convirtió en nuestra mejor fuente de clientes.',
        name: 'Luis Ángel Sánchez Rodríguez', role: 'Director · Reciclaje del Norte', initials: 'LS', avatarColor: 'bg-emerald-700', avatar: '/luis-sanchez.jpg',
      },
      {
        tag: 'Case Study · SaaS Platform · Co-fundador',
        company: 'Puny.bz',
        logo: '/puny-logo.svg',
        industry: 'SaaS · No-Code · Puerto Rico',
        gradient: 'from-[#55a6e6]/20 to-[#4cd0b6]/10',
        accent: 'text-[#55a6e6] dark:text-[#69afc9]',
        border: 'border-[#55a6e6]/25',
        metrics: [
          { value: '$260K', label: 'ARR',                    sub: 'ingresos anuales recurrentes' },
          { value: '1,303', label: 'negocios activos',       sub: 'en 19 países' },
        ],
        challenge: 'Puerto Rico no tenía una plataforma que permitiera a micro y pequeñas empresas lanzar su presencia digital en minutos — sin agencias, sin código, sin costos prohibitivos.',
        solution:   'Co-fundé Puny.bz y lideré el desarrollo técnico completo: arquitectura multi-tenant, builder no-code, integraciones de pago locales (ATH Móvil, Stripe) y módulos enterprise para concesionarios.',
        result:     '$260K ARR. 1,303 negocios activos en 19 países. 8 concesionarios de autos en alianza con Inv360. El gobierno de Puerto Rico como cliente. Parallel18 alumni.',
        quote:      'Construimos algo que nunca había existido en Puerto Rico. Lo que más me sorprende es la tracción — y apenas estamos comenzando.',
        name: 'Jonathan Díaz', role: 'CEO · Co-fundador · Puny.bz', initials: 'JD', avatarColor: 'bg-[#292f56]', avatar: null,
      },
    ],
    contact_tag: 'Contacto directo',
    contact_title: 'Estamos en Puerto Rico. Servimos al mundo.',
    contact_wa_label: 'WhatsApp',
    contact_wa_cta: 'Escríbenos ahora →',
    contact_email_label: 'Correo electrónico',
    contact_email_cta: 'Respuesta en ≤ 24h →',
    contact_office_label: 'Oficina',
    contact_office_name: 'Complejo Onofre Carballeira',
    contact_office_addr: 'Esq. PR-2 con Int. PR-5',
    contact_office_city: 'Bayamón, PR 00959',
    contact_office_tag: '🇵🇷 Puerto Rico · Servicio remoto global',
    faq_tag: 'Preguntas frecuentes',
    faq_title: 'Las dudas más comunes',
    cta_title: '6 semanas. 3 mercados. Un equipo que no desaparece después del deploy.',
    cta_sub: 'Eso pasa cuando la tecnología está bien construida. Sin sorpresas de presupuesto, sin desapariciones. 30 minutos, sin costo, sin compromiso.',
    cta_btn: 'Agenda tu consulta gratis',
    cta_email: 'saul@puny.bz · Hecho en Puerto Rico 🇵🇷',
    footer_loc: 'Bayamón, Puerto Rico 🇵🇷',
    footer_rights: '© 2026 · Todos los derechos reservados',
  },
  en: {
    hero_badge: 'For founders and teams with serious digital projects',
    hero_title1: 'Build software that',
    hero_title2: 'actually ships',
    hero_sub: 'WebApps, mobile apps, and AI — built to your exact specs. No agencies marking up junior devs, no freelancers who ghost. Just a senior builder who treats your budget like it\'s his own.',
    hero_cta: 'Get your free 30-min call',
    hero_services: 'What I build →',
    hero_disclaimer: 'Zero commitment · If I\'m not your best option, I\'ll tell you who is',
    hero_bottom: 'Co-founder of Puny.bz · PR · US · Chile · Argentina · 29 countries',
    clients_heading: 'Trusted by',
    puny_sub: 'Co-founder · 1,303 businesses · 29 countries',
    results: [
      { n: '400',    label: 'Signups in day one',      sub: 'Dnuevo Coffee' },
      { n: '40/wk',  label: 'Qualified leads/week',    sub: 'Reciclaje del Norte' },
      { n: '15+',    label: 'Years shipping software',  sub: 'PR · US · Chile · Argentina' },
      { n: '2,000+', label: 'Projects delivered',       sub: 'across 15 years' },
    ],
    villain_tag: 'The real problem',
    villain_title1: 'They charge for the process.',
    villain_title2: 'I charge for the result.',
    villain_sub: 'Agencies bill hours. Freelancers bill tasks. Nobody bills for what actually matters: that it works, that it sells, that it lasts.',
    villains: [
      {
        icon: '⏳',
        title: 'The project that never ships',
        desc: 'Six months in and they\'re still "almost done." Every week, a new blocker. Every blocker, a new invoice. And when you ask for a real date, the answer is always "soon." Meanwhile, your window is closing.',
      },
      {
        icon: '👻',
        title: 'The freelancer who disappears',
        desc: 'Week one: fast replies, big energy. Week four: excuses. Week eight: nothing. The code is half-done, the money is gone, and you\'re back to square one — except now you\'re behind, broke, and burned.',
      },
      {
        icon: '🏦',
        title: 'The agency that sells you lock-in',
        desc: 'Beautiful deck. Impressive proposal. Then they deliver something your team can\'t touch, that breaks without their support, and that you keep paying to maintain. They didn\'t build you software. They built you a subscription to themselves.',
      },
    ],
    villain_quote: '"When something breaks, I don\'t send a report.',
    villain_quote_hl: ' I fix it.',
    villain_quote_end: '"',
    villain_quote_pre: 'That\'s how I work.',
    villain_cta: 'Tell me what you\'re building →',
    services_tag: 'What I build',
    services_title: 'Pick your problem. I\'ll solve it.',
    services: [
      { label: 'WebApp, iOS & Android', desc: 'Custom CRMs, portals, dashboards, marketplaces — plus native apps for iPhone and Android. Stripe, your APIs, every payment gateway your market needs. One team that covers web and mobile end to end.', result: 'Web and mobile under one roof', tags: ['Next.js','React','Node.js','Go','Swift','Kotlin','React Native','Flutter'], showBadges: true },
      { label: 'AI That Earns Its Keep', desc: 'Agents, automations, and chatbots that plug into what you already run. AI that cuts your team\'s grunt work in half — without replacing the people who matter.', result: 'Less repetitive work. More output.', tags: ['Claude API','GPT-4','LangChain','RAG'], showBadges: false },
      { label: 'Fractional CTO',        desc: 'Got engineers but no technical north star? I\'ll set the architecture, vet your vendors, make the hard stack calls, and give you the clarity that\'s been missing.', result: 'Technical leadership, on demand', tags: ['Architecture','Code Review','CTO as a Service'], showBadges: false },
    ],
    about_tag: 'Who I am',
    about_title: 'I\'m Saul González —',
    about_sub: 'I build software. I understand business.',
    about_bio: [
      'Most software fails because the developer only speaks code. I speak both. 15+ years shipping products with teams across <b>Puerto Rico, the US, Chile, and Argentina</b>. Co-founder of <b>Puny.bz</b> — 1,303 active businesses, including the Puerto Rico government, run on what we built.',
      'I don\'t start with a tech recommendation. I start by figuring out what success actually looks like for your business. Then I build backwards from there — no fluff, no padding, no features you\'ll never use.',
    ],
    about_stats: [
      { n: '15+',    l: 'years shipping software' },
      { n: '2,000+', l: 'projects delivered' },
      { n: '29',     l: 'countries reached' },
      { n: '1,303',  l: 'businesses on Puny.bz' },
    ],
    process_tag: 'How it works',
    process_title: 'From idea to running — 3 steps',
    steps: [
      { n: '01', title: 'Free 30-min call — no pitch', desc: 'You talk, I listen. No deck, no sales script. I ask the questions that help me give you a straight answer: what this actually takes and whether I\'m the right person to build it.' },
      { n: '02', title: 'A plan that makes sense',      desc: 'I send you a clear roadmap: right tech stack, honest timeline, real cost range. Everything you need to make a decision — before you spend a dollar.' },
      { n: '03', title: 'We build — or I find who should', desc: 'If I\'m your best option, we ship. If someone else is a better fit, I\'ll say so and make the intro myself. No strings, no runaround.' },
    ],
    quiz_tag: 'Start here',
    quiz_title: 'What are you building?',
    quiz_sub: '2 minutes. Helps me show up to our call with something useful — not a list of generic questions.',
    cases_tag: 'Track record',
    cases_title: 'Results that actually happened',
    cases: [
      {
        tag: 'Case Study · Digital Loyalty Program',
        company: 'Dnuevo Coffee Specialty',
        logo: '/logos/dnuevo.webp',
        logoInvertLight: true,
        industry: 'Food & Beverage · Puerto Rico',
        gradient: 'from-amber-500/20 to-orange-500/5',
        accent: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-500/25',
        metrics: [
          { value: '400+',  label: 'signups on launch day',  sub: 'zero paid acquisition' },
          { value: '$0',    label: 'ongoing reach cost',     sub: 'own channel, no ad spend' },
        ],
        challenge: 'Dnuevo wanted to stop renting their audience from Instagram and own a direct line to their best customers — without paying for reach every single time.',
        solution:   'We built a digital loyalty experience that lives in Apple Wallet and Google Wallet. No app download required. Launched first with Dnuevo, then rolled out to all Puny.bz merchants.',
        result:     '400+ customers signed up the day it went live. By the next morning they were already redeeming points. Dnuevo now owns their customer channel — permanently, at zero cost.',
        quote:      'The next day people were already using it and claiming their points. It was a complete success.',
        name: 'Gilberto Calderón', role: 'Co-founder · Dnuevo Coffee', initials: 'GC', avatarColor: 'bg-amber-600', avatar: '/gilberto.jpg',
      },
      {
        tag: 'Case Study · Web Platform & Lead Generation',
        company: 'Reciclaje del Norte',
        logo: '/logos/rdn.avif',
        industry: 'Environmental Industry · Puerto Rico',
        gradient: 'from-emerald-500/20 to-teal-500/5',
        accent: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-500/25',
        metrics: [
          { value: '0→40', label: 'qualified leads/week',  sub: 'municipalities & enterprise' },
          { value: 'Gov+', label: 'new client tier',        sub: 'government & private sector' },
        ],
        challenge: 'Their website was a digital brochure — no leads, no conversions, no way to track ROI. They needed government agencies and enterprise buyers to come to them.',
        solution:   'Rebuilt the platform ground-up: technical SEO, segment-specific landing pages for each buyer type, and an automated quote request system tied to their sales workflow.',
        result:     'Zero to 40 high-value inbound leads per week in under a month. The channel paid for itself immediately and is now their single biggest source of new business.',
        quote:      'Saul turned it into our best source of clients.',
        name: 'Luis Ángel Sánchez Rodríguez', role: 'Director · Reciclaje del Norte', initials: 'LS', avatarColor: 'bg-emerald-700', avatar: '/luis-sanchez.jpg',
      },
      {
        tag: 'Case Study · SaaS Platform · Co-founder',
        company: 'Puny.bz',
        logo: '/puny-logo.svg',
        industry: 'SaaS · No-Code · Puerto Rico',
        gradient: 'from-[#55a6e6]/20 to-[#4cd0b6]/10',
        accent: 'text-[#55a6e6] dark:text-[#69afc9]',
        border: 'border-[#55a6e6]/25',
        metrics: [
          { value: '$260K', label: 'ARR',              sub: 'annual recurring revenue' },
          { value: '1,303', label: 'active businesses', sub: 'across 19 countries' },
        ],
        challenge: 'Puerto Rico had no platform that let micro and small businesses launch their digital presence in minutes — without agencies, without code, without prohibitive costs.',
        solution:   'I co-founded Puny.bz and led the full technical build: multi-tenant architecture, no-code builder, local payment integrations (ATH Móvil, Stripe), and enterprise modules for auto dealerships.',
        result:     '$260K ARR. 1,303 active businesses in 19 countries. 8 auto dealerships through an Inv360 partnership. Puerto Rico\'s government as a client. Parallel18 alumni.',
        quote:      'We built something that had never existed in Puerto Rico. What surprises me most is the traction — and we\'re just getting started.',
        name: 'Jonathan Díaz', role: 'CEO · Co-founder · Puny.bz', initials: 'JD', avatarColor: 'bg-[#292f56]', avatar: null,
      },
    ],
    contact_tag: 'Let\'s talk',
    contact_title: 'Based in Puerto Rico. Available anywhere.',
    contact_wa_label: 'WhatsApp',
    contact_wa_cta: 'Send a message →',
    contact_email_label: 'Email',
    contact_email_cta: 'Reply within 24h →',
    contact_office_label: 'Office',
    contact_office_name: 'Complejo Onofre Carballeira',
    contact_office_addr: 'Esq. PR-2 con Int. PR-5',
    contact_office_city: 'Bayamón, PR 00959',
    contact_office_tag: '🇵🇷 Puerto Rico · Remote-first, worldwide',
    faq_tag: 'FAQ',
    faq_title: 'Questions I get a lot',
    cta_title: '6 weeks. 3 markets. A team that doesn\'t vanish after the deploy.',
    cta_sub: 'That\'s what happens when software is built right. No budget surprises, no ghosting, no lock-in. 30 minutes, no cost, no obligation.',
    cta_btn: 'Start with a free call',
    cta_email: 'saul@puny.bz · Built in Puerto Rico 🇵🇷',
    footer_loc: 'Bayamón, Puerto Rico 🇵🇷',
    footer_rights: '© 2026 · All rights reserved',
  },
}

/* ─── CLIENT LOGOS ───────────────────────────────── */
const clientLogos = [
  { name: 'Buena Vibra',            initials: 'BV',     logo: '/logos/buena-vibra.webp', domain: null, accent: '#a855f7', invertDark: true },
  { name: 'VMLY&R',                 initials: 'VML',    logo: '/logos/vml.jpg',          domain: null, accent: '#ef4444' },
  { name: 'PR Public Health Trust', initials: 'PRPHT',  logo: '/logos/prphi.svg',        domain: null, accent: '#3b82f6' },
  { name: 'Comisión Electoral PR',  initials: 'CEPR',   logo: '/logos/ceepur.png',       domain: null, accent: '#0ea5e9' },
  { name: 'P2P Marketing',          initials: 'P2P',    logo: '/logos/p2p.webp',         domain: null, accent: '#6366f1', invertLight: true },
  { name: 'RDN',                    initials: 'RDN',    logo: '/logos/rdn.avif',         domain: null, accent: '#8b5cf6' },
  { name: 'ReCreo',                 initials: 'RC',     logo: '/logos/recreo.avif',      domain: null, accent: '#ec4899' },
  { name: 'Dnuevo Coffee',          initials: 'DNUEVO', logo: '/logos/dnuevo.webp',      domain: null, accent: '#d97706', invertLight: true },
  { name: 'Felcon Group',           initials: 'FC',     logo: '/logos/felcon.jpg',        domain: null, accent: '#1d4ed8' },
]

/* ─── NAVBAR ─────────────────────────────────────── */
function Navbar({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  if (!mounted) return null
  const isDark = resolvedTheme === 'dark'

  const navLinks = lang === 'es'
    ? [
        { label: 'Servicios', href: '#servicios' },
        { label: 'Proyectos', href: '#proyectos' },
        { label: 'Proceso',   href: '#proceso' },
        { label: 'Contacto',  href: '#contacto' },
      ]
    : [
        { label: 'Services', href: '#servicios' },
        { label: 'Projects', href: '#proyectos' },
        { label: 'Process',  href: '#proceso' },
        { label: 'Contact',  href: '#contacto' },
      ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 dark:bg-[#090820]/90 backdrop-blur-md border-b border-slate-200/70 dark:border-white/[0.07] shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

        {/* Name */}
        <a href="#" onClick={() => setMobileOpen(false)}
          className="font-black text-slate-800 dark:text-white text-[11px] tracking-widest uppercase shrink-0 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
          Saul A. González
        </a>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Lang toggle */}
          <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-white/20 shadow-sm">
            {(['es','en'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-colors ${
                  lang === l
                    ? 'btn-gradient text-white'
                    : 'bg-white dark:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}>
                {l}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Light mode' : 'Dark mode'}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white dark:bg-white/10 border border-slate-200 dark:border-white/20 text-slate-600 dark:text-slate-300 shadow-sm hover:scale-105 transition-all">
            {isDark
              ? <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="4"/><path strokeLinecap="round" d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              : <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            }
          </button>

          {/* CTA — desktop */}
          <a href="#quiz"
            className="hidden md:inline-flex items-center btn-gradient text-white text-xs font-bold px-4 py-2 rounded-xl transition-all hover:opacity-90 whitespace-nowrap">
            {lang === 'es' ? 'Agenda gratis →' : 'Book free call →'}
          </a>

          {/* Hamburger — mobile */}
          <button onClick={() => setMobileOpen(o => !o)}
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center bg-white dark:bg-white/10 border border-slate-200 dark:border-white/20 text-slate-600 dark:text-slate-300">
            {mobileOpen
              ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#090820]/95 backdrop-blur-md border-b border-slate-200/70 dark:border-white/[0.07] px-6 pb-5 pt-2 flex flex-col gap-1">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              className="text-sm text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 font-medium py-2.5 border-b border-slate-100 dark:border-white/[0.05] last:border-0 transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#quiz" onClick={() => setMobileOpen(false)}
            className="mt-3 btn-gradient text-white text-sm font-bold px-6 py-3 rounded-xl text-center transition-all">
            {lang === 'es' ? 'Agenda tu consulta gratis →' : 'Book your free call →'}
          </a>
        </div>
      )}
    </header>
  )
}

/* ─── LOGO CHIP ──────────────────────────────────── */
function LogoChip({ c }: { c: typeof clientLogos[0] }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const isLocal = !!c.logo
  const src = c.logo ?? (c.domain ? `https://logo.clearbit.com/${c.domain}` : null)

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) setImgLoaded(true)
  }, [])
  return (
    <div
      title={c.name}
      className="flex items-center justify-center px-7 py-4 mx-3 rounded-xl border border-slate-200/60 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] hover:border-violet-300/60 dark:hover:border-violet-500/20 hover:shadow-sm transition-all cursor-default whitespace-nowrap flex-shrink-0 group"
    >
      {src && !imgError ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={src}
            alt={c.name}
            className={`h-9 w-auto max-w-[130px] object-contain transition-opacity ${
              imgLoaded
                ? isLocal
                  ? `opacity-100 ${c.invertLight ? 'invert dark:invert-0' : ''} ${c.invertDark ? 'dark:invert' : ''}`
                  : 'grayscale opacity-60 group-hover:opacity-80'
                : 'opacity-0 w-0'
            }`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
          {!imgLoaded && (
            <span className="text-[10px] font-black tracking-[0.15em] uppercase" style={{ color: c.accent + 'cc' }}>
              {c.initials}
            </span>
          )}
        </>
      ) : (
        <span className="text-[10px] font-black tracking-[0.15em] uppercase" style={{ color: c.accent + 'cc' }}>
          {c.initials}
        </span>
      )}
    </div>
  )
}


/* ─── TECH LOGO MAP ──────────────────────────────── */
const techLogos: Record<string, string> = {
  'Next.js':      '/logos/tech/nextjs.svg',
  'React':        '/logos/tech/react.svg',
  'React Native': '/logos/tech/react.svg',
  'Node':         '/logos/tech/nodejs.svg',
  'Go':           '/logos/tech/go.svg',
  'Swift':        '/logos/tech/swift.svg',
  'Flutter':      '/logos/tech/flutter.svg',
  'Kotlin':       '/logos/tech/kotlin.svg',
  'TypeScript':   '/logos/tech/typescript.svg',
  'Tailwind':     '/logos/tech/tailwind.svg',
  'Claude API':   '/logos/tech/anthropic.svg',
  'Claude AI':    '/logos/tech/anthropic.svg',
  'LangChain':    '/logos/tech/langchain.svg',
  'Node.js':      '/logos/tech/nodejs.svg',
  'GPT-4':        '/logos/tech/openai.svg',
}

function TechTag({ label }: { label: string }) {
  const logo = techLogos[label]
  return (
    <span className="inline-flex items-center gap-2 text-xs bg-violet-50 dark:bg-white/[0.05] text-violet-600 dark:text-slate-400 border border-violet-100 dark:border-white/[0.06] px-3 py-1.5 rounded-full font-medium">
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt={label} className="w-5 h-5 object-contain dark:invert flex-shrink-0" />
      )}
      {label}
    </span>
  )
}

/* ─── PAGE ───────────────────────────────────────── */
export default function HomePage() {
  const [lang, setLang] = useState<Lang>('es')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved) { setLang(saved); return }
    const browser = navigator.language?.toLowerCase() || ''
    setLang(browser.startsWith('en') ? 'en' : 'es')
  }, [])

  useEffect(() => { localStorage.setItem('lang', lang) }, [lang])

  const tx = T[lang]

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <main>

        {/* ── HERO ── */}
        <section className="hero-grid min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-32 relative overflow-hidden bg-white dark:bg-[#090820]">
          {/* Ambient glow orbs */}
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-500/10 dark:bg-violet-500/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-fuchsia-500/8 dark:bg-fuchsia-500/6 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-6xl mx-auto w-full relative z-10">
            <div className="grid lg:grid-cols-[1fr_460px] gap-12 xl:gap-20 items-center">

              {/* Left — text */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2.5 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/25 text-violet-600 dark:text-violet-400 text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                  {tx.hero_badge}
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-black leading-[0.93] tracking-tight mb-7 text-slate-900 dark:text-white">
                  {tx.hero_title1}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500">
                    {tx.hero_title2}
                  </span>
                </h1>

                <p className="text-slate-500 dark:text-slate-400 text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
                  {tx.hero_sub}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <a href="#quiz" className="btn-glow btn-gradient text-white font-bold px-10 py-5 rounded-2xl text-base">
                    {tx.hero_cta}
                  </a>
                  <a href="#servicios" className="border border-slate-300 dark:border-white/20 hover:border-violet-400 dark:hover:border-violet-500/50 text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 font-medium px-8 py-5 rounded-2xl text-base transition-all">
                    {tx.hero_services}
                  </a>
                </div>

                <p className="text-slate-400 dark:text-slate-600 text-sm">{tx.hero_disclaimer}</p>

                {/* Urgency + mini testimonial */}
                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mt-6">
                  <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    {lang === 'es' ? 'Solo 2 proyectos disponibles este mes' : 'Only 2 project slots open this month'}
                  </div>
                </div>

                {/* Mini testimonial */}
                <div className="mt-5 flex items-start gap-3 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-2xl px-4 py-3 max-w-sm mx-auto lg:mx-0">
                  <img src="/gilberto.jpg" alt="Gilberto" className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug italic">&ldquo;{lang === 'es' ? 'Al otro día ya la gente usaba el sistema. Fue un éxito total.' : 'The next day people were already using it. Total success.'}&rdquo;</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-medium">Gilberto C. · Dnuevo Coffee</p>
                  </div>
                </div>

                {/* Social proof pill row */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-8">
                  {(lang === 'es'
                    ? [{ icon: '⭐', text: '15+ años de experiencia' }, { icon: '🇵🇷', text: '29 países' }, { icon: '🚀', text: '1,303 negocios' }]
                    : [{ icon: '⭐', text: '15+ years shipping' }, { icon: '🇵🇷', text: '29 countries' }, { icon: '🚀', text: '1,303 businesses' }]
                  ).map(p => (
                    <span key={p.text} className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 rounded-full px-3 py-1.5">
                      {p.icon} {p.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — Code terminal mockup */}
              <div className="hidden lg:block relative">
                {/* Glow behind terminal */}
                <div className="absolute -inset-6 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 rounded-3xl blur-2xl" />

                <div className="relative rounded-2xl overflow-hidden border border-white/10 dark:border-white/[0.08] shadow-[0_30px_80px_rgba(112,48,239,0.25)]">
                  {/* Terminal bar */}
                  <div className="px-5 py-3.5 bg-slate-800 dark:bg-[#0f0e1f] border-b border-white/5 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/90" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/90" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
                    <span className="ml-auto text-xs text-slate-500 font-mono tracking-wide">proyecto.tsx</span>
                  </div>

                  {/* Code */}
                  <div className="bg-slate-900 dark:bg-[#0a0920] p-7 font-mono text-[13px] leading-7">
                    <p><span className="text-fuchsia-400">const</span> <span className="text-white font-semibold">{lang === 'es' ? 'resultado' : 'result'}</span> <span className="text-slate-500">=</span> <span className="text-violet-400">await</span> <span className="text-yellow-300">{lang === 'es' ? 'construir' : 'build'}</span>(<span className="text-slate-400">{"{"}</span></p>
                    <p className="pl-6"><span className="text-sky-400">{lang === 'es' ? 'idea' : 'idea'}</span><span className="text-slate-500">:</span>      <span className="text-emerald-300">'{lang === 'es' ? 'tu negocio' : 'your business'}'</span><span className="text-slate-500">,</span></p>
                    <p className="pl-6"><span className="text-sky-400">{lang === 'es' ? 'entrega' : 'delivery'}</span><span className="text-slate-500">:</span>   <span className="text-emerald-300">'{lang === 'es' ? '4 semanas' : '4 weeks'}'</span><span className="text-slate-500">,</span></p>
                    <p className="pl-6"><span className="text-sky-400">stack</span><span className="text-slate-500">:</span>     <span className="text-slate-400">[</span><span className="text-emerald-300">'Next.js'</span><span className="text-slate-500">,</span> <span className="text-emerald-300">'Go'</span><span className="text-slate-500">,</span> <span className="text-emerald-300">'AI'</span><span className="text-slate-400">]</span><span className="text-slate-500">,</span></p>
                    <p className="pl-6"><span className="text-sky-400">{lang === 'es' ? 'sorpresas' : 'surprises'}</span><span className="text-slate-500">:</span>  <span className="text-red-400">false</span><span className="text-slate-500">,</span></p>
                    <p className="pl-6"><span className="text-sky-400">{lang === 'es' ? 'garantía' : 'warranty'}</span><span className="text-slate-500">:</span>   <span className="text-emerald-400">true</span><span className="text-slate-500">,</span></p>
                    <p><span className="text-slate-400">{"}"}</span>)<span className="text-slate-500">;</span></p>

                    <div className="mt-5 pt-5 border-t border-white/[0.06] space-y-2">
                      <p><span className="text-emerald-400">✓</span> <span className="text-slate-400">{lang === 'es' ? 'usuarios activos:' : 'active users:'}</span> <span className="text-white font-semibold">400+</span> <span className="text-amber-300">{lang === 'es' ? 'día 1' : 'day one'}</span></p>
                      <p><span className="text-emerald-400">✓</span> <span className="text-slate-400">{lang === 'es' ? 'leads semanales:' : 'weekly leads:'}</span> <span className="text-white font-semibold">0 → 40</span></p>
                      <p><span className="text-emerald-400">✓</span> <span className="text-slate-400">{lang === 'es' ? 'costo publicitario:' : 'ad spend:'}</span> <span className="text-white font-semibold">$0</span></p>
                    </div>
                  </div>
                </div>

                {/* Floating proof badges */}
                <div className="absolute -top-5 -right-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 animate-[float_4s_ease-in-out_infinite]">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-white">{lang === 'es' ? '400+ activados' : '400+ signups'}</p>
                    <p className="text-[11px] text-slate-400">Dnuevo · {lang === 'es' ? 'día 1' : 'day one'}</p>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 animate-[float_5s_ease-in-out_infinite_1s]">
                  <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center text-base flex-shrink-0">🌍</div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-white">{lang === 'es' ? '29 países' : '29 countries'}</p>
                    <p className="text-[11px] text-slate-400">Puny.bz · {lang === 'es' ? '1,300+ negocios' : '1,300+ businesses'}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom status bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-100/80 dark:bg-white/[0.05] backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-full px-4 py-2.5 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap z-10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            {tx.hero_bottom}
          </div>
        </section>

        {/* ── CLIENT LOGOS ── */}
        <section className="py-20 border-y border-slate-100 dark:border-white/[0.06] bg-slate-50/80 dark:bg-surface/50 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-600">{tx.clients_heading}</p>
              <a href="https://puny.bz" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#55a6e6]/30 bg-[#55a6e6]/5 hover:bg-[#55a6e6]/10 transition-colors group flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/puny-logo.svg" alt="Puny.bz" className="h-7 w-auto" />
                <span className="text-xs text-slate-500 dark:text-slate-400">{tx.puny_sub}</span>
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 dark:from-[#0a0a14] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 dark:from-[#0a0a14] to-transparent z-10 pointer-events-none" />
            <div className="marquee-wrapper py-2">
              <div className="marquee-strip">
                {[...clientLogos, ...clientLogos].map((c, i) => (
                  <LogoChip key={`${c.name}-${i}`} c={c} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-20 px-6 bg-slate-900 dark:bg-[#07071a] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(112,48,239,0.15)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute top-0 left-1/3 w-64 h-64 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-fuchsia-600/6 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
              {tx.results.map((r, i) => (
                <div key={r.n} className="text-center group">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-fuchsia-400 mb-2 transition-all duration-300 group-hover:from-violet-300 group-hover:to-pink-400">
                    {r.n}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-white/80 mb-0.5">{r.label}</div>
                  <div className="text-xs text-white/35">{r.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VILLAIN ── */}
        <section className="py-28 px-6 bg-slate-900 dark:bg-[#040410] relative overflow-hidden">
          {/* Background atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-orange-950/15 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-red-600/[0.06] rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {tx.villain_tag}
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
                {tx.villain_title1}<br /><span className="text-red-400/70">{tx.villain_title2}</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-base">{tx.villain_sub}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
              {tx.villains.map(v => (
                <div key={v.title} className="villain-card rounded-2xl p-8 transition-all group hover:scale-[1.02]">
                  <div className="text-4xl mb-5">{v.icon}</div>
                  <h3 className="font-bold text-white mb-3 leading-snug text-lg">{v.title}</h3>
                  <p className="text-slate-400 text-[15px] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center border-t border-white/[0.08] pt-14">
              <p className="text-slate-500 text-sm mb-4">{tx.villain_quote_pre}</p>
              <p className="text-white text-2xl font-bold max-w-2xl mx-auto leading-snug">
                {tx.villain_quote}{' '}<span className="text-violet-400">{tx.villain_quote_hl}</span>{tx.villain_quote_end}
              </p>
              <a href="#quiz" className="inline-block mt-12 btn-glow btn-gradient text-white font-bold px-14 py-5 rounded-2xl transition-all text-base">
                {tx.villain_cta}
              </a>
              <p className="text-slate-600 text-xs mt-3">{lang === 'es' ? 'Sin compromiso · Respuesta en menos de 24 horas' : 'Zero commitment · Reply in under 24 hours'}</p>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="servicios" className="py-24 px-6 bg-white dark:bg-[#090820] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-violet-500/[0.04] rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-14">
              <p className="text-violet-600 dark:text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">{tx.services_tag}</p>
              <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">{tx.services_title}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-5">
              {tx.services.map((s, i) => (
                <div key={s.label} className={`group relative bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.07] hover:border-violet-300 dark:hover:border-violet-500/40 rounded-2xl p-8 transition-all hover:shadow-[0_8px_40px_rgba(112,48,239,0.12)] overflow-hidden flex flex-col${i === 0 ? ' lg:row-span-2' : ''}`}>
                  {/* Hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-50/0 to-fuchsia-50/0 group-hover:from-violet-50/80 group-hover:to-fuchsia-50/40 dark:group-hover:from-violet-500/[0.04] dark:group-hover:to-fuchsia-500/[0.02] transition-all rounded-2xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Service icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-violet-50 dark:from-violet-500/20 dark:to-violet-500/5 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-6 group-hover:from-violet-200 dark:group-hover:from-violet-500/30 transition-all shadow-sm flex-shrink-0">
                      {i === 0 && (
                        /* Web+Mobile — Globe+Phone combined */
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                      )}
                      {i === 1 && (
                        /* AI — Sparkles icon */
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>
                      )}
                      {i === 2 && (
                        /* Consulting — Lightning icon */
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{s.label}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">{s.desc}</p>
                    <p className="text-violet-600 dark:text-violet-400 text-xs font-semibold mb-4 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      {s.result}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-auto">
                      {s.tags.map(t => <TechTag key={t} label={t} />)}
                    </div>

                    {/* Platform brand badges — only for the web+mobile card */}
                    {s.showBadges && (
                      <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100 dark:border-white/[0.05]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/badge-appstore.svg" alt="Download on the App Store" className="h-9 w-auto" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/badge-googleplay.png" alt="Get it on Google Play" className="h-[43px] w-auto" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="sobre-mi" className="py-24 px-6 bg-white dark:bg-[#090820] relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-violet-500/[0.05] rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Photo column */}
            <div className="relative flex flex-col items-center lg:items-start gap-5">
              <div className="relative self-center">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-violet-500/25 to-fuchsia-500/15 blur-xl" />
                <Image src="/saul.jpg" alt="Saul A. González" width={360} height={430} className="relative rounded-3xl object-cover shadow-2xl shadow-violet-500/10" priority />

                {/* Puny badge */}
                <div className="absolute -bottom-5 -right-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 shadow-xl flex items-center gap-3">
                  <span className="text-2xl">🇵🇷</span>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Puny.bz</p>
                    <p className="text-xs text-slate-400">{lang === 'es' ? 'Co-fundador' : 'Co-founder'}</p>
                  </div>
                </div>

                {/* Experience badge */}
                <div className="absolute -top-5 -left-5 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl px-4 py-3.5 shadow-xl shadow-violet-500/30">
                  <p className="text-xs font-black text-white">15+</p>
                  <p className="text-[10px] text-white/80">{lang === 'es' ? 'años' : 'years'}</p>
                </div>
              </div>

              {/* Tech stack strip */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mt-4">
                {['Next.js', 'Go', 'Swift', 'Claude AI', 'React', 'Node.js'].map(tech => (
                  <TechTag key={tech} label={tech} />
                ))}
              </div>
            </div>

            {/* Text column */}
            <div>
              <p className="text-violet-600 dark:text-violet-400 text-sm font-semibold tracking-widest uppercase mb-4">{tx.about_tag}</p>
              <h2 className="text-3xl sm:text-4xl font-black mb-5 leading-tight text-slate-900 dark:text-white">
                {tx.about_title}<br />
                <span className="text-slate-400 dark:text-slate-500 font-normal text-2xl sm:text-3xl">{tx.about_sub}</span>
              </h2>
              <div className="space-y-4 text-slate-500 dark:text-slate-400 leading-relaxed text-sm mb-10">
                {tx.about_bio.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/<b>/g, '<span class="text-slate-700 dark:text-white font-semibold">').replace(/<\/b>/g, '</span>').replace(/<i>/g, '<em>').replace(/<\/i>/g, '</em>') }} />)}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {tx.about_stats.map(s => (
                  <div key={s.l} className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-5 group hover:border-violet-300 dark:hover:border-violet-500/30 transition-all">
                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-600 to-fuchsia-500">{s.n}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section id="proceso" className="py-24 px-6 bg-white dark:bg-[#090820]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-violet-600 dark:text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">{tx.process_tag}</p>
              <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">{tx.process_title}</h2>
            </div>
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-[22px] top-10 bottom-10 w-px bg-gradient-to-b from-violet-400 via-fuchsia-400 to-violet-400/20 hidden sm:block" />
              <div className="space-y-5">
                {tx.steps.map((step, i) => (
                  <div key={step.n} className="relative flex gap-6 items-start p-7 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.07] rounded-2xl hover:border-violet-300 dark:hover:border-violet-500/30 hover:shadow-[0_4px_30px_rgba(112,48,239,0.08)] transition-all group">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-md shadow-violet-500/25 relative z-10">
                      <span className="text-white text-xs font-black">{step.n}</span>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">{step.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                    {i === 2 && (
                      <div className="absolute -right-2 -top-2 bg-violet-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                        {lang === 'es' ? 'Sin costo' : 'No cost'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-center gap-2.5 text-sm text-slate-400 dark:text-slate-500">
                <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>{lang === 'es' ? 'Plan de trabajo por escrito antes de comprometerte · Sin cláusulas trampa' : 'Written work plan before you commit · No gotcha clauses'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── QUIZ ── */}
        <section id="quiz" className="py-24 px-6 bg-slate-50 dark:bg-[#0b0b1e] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-500/[0.06] rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <p className="text-violet-600 dark:text-violet-400 text-xs font-bold tracking-widest uppercase mb-4">{tx.quiz_tag}</p>
              <h2 className="text-4xl sm:text-5xl font-black mb-5 text-slate-900 dark:text-white">{tx.quiz_title}</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">{tx.quiz_sub}</p>
            </div>
            <Quiz />
          </div>
        </section>

        {/* ── CASE STUDIES ── */}
        <section id="proyectos" className="py-24 px-6 bg-white dark:bg-[#090820]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-violet-600 dark:text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">{tx.cases_tag}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{tx.cases_title}</h2>
            </div>
            <div className="flex flex-col gap-10">
              {tx.cases.map(cs => (
                <div key={cs.company} className={`rounded-3xl border ${cs.border} overflow-hidden bg-white dark:bg-white/[0.02] shadow-sm hover:shadow-lg transition-shadow`}>
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${cs.gradient} px-8 pt-8 pb-7 border-b ${cs.border}`}>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <span className={`text-xs font-bold uppercase tracking-widest ${cs.accent}`}>{cs.tag}</span>
                      {cs.logo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cs.logo} alt={cs.company}
                          className={`h-8 w-auto object-contain flex-shrink-0 ${cs.logoInvertLight ? 'invert dark:invert-0' : ''}`} />
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">{cs.company}</h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{cs.industry}</p>
                      </div>
                      <div className="flex gap-8">
                        {cs.metrics.map(m => (
                          <div key={m.label} className="text-right sm:text-right">
                            <p className={`text-3xl font-black ${cs.accent}`}>{m.value}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-0.5">{m.label}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-600">{m.sub}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-8 py-8 grid grid-cols-1 sm:grid-cols-3 gap-7">
                    {[
                      { label: lang === 'es' ? 'El reto' : 'The challenge', text: cs.challenge },
                      { label: lang === 'es' ? 'Lo que hicimos' : 'What we did', text: cs.solution },
                      { label: lang === 'es' ? 'El resultado' : 'The result', text: cs.result },
                    ].map(col => (
                      <div key={col.label}>
                        <p className={`text-xs font-bold uppercase tracking-widest ${cs.accent} mb-2.5`}>{col.label}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{col.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <div className={`px-8 py-6 border-t ${cs.border} bg-slate-50/60 dark:bg-white/[0.015]`}>
                    <div className="flex items-center gap-4">
                      {cs.avatar
                        ? <img src={cs.avatar} alt={cs.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0 ring-2 ring-white dark:ring-white/10 shadow-md" />
                        : <div className={`w-16 h-16 rounded-full ${cs.avatarColor} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ring-2 ring-white dark:ring-white/10`}>{cs.initials}</div>
                      }
                      <div>
                        <p className="text-slate-700 dark:text-slate-200 text-sm font-medium italic">"{cs.quote}"</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 font-semibold">{cs.name} · <span className="font-normal">{cs.role}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contacto" className="py-24 px-6 bg-slate-900 dark:bg-[#04040f] relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(112,48,239,0.12)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto relative z-10">

            {/* Header */}
            <div className="text-center mb-14">
              <p className="text-violet-400 text-xs font-bold tracking-widest uppercase mb-4">{tx.contact_tag}</p>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">{tx.contact_title}</h2>
              <div className="inline-flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-5 py-2.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                {lang === 'es' ? 'Disponible ahora · Respuesta en menos de 24 horas' : 'Available now · Response in under 24 hours'}
              </div>
            </div>

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              <a href="https://wa.me/17879398739" target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-4 p-6 bg-white/[0.03] border border-white/[0.07] hover:border-emerald-500/40 hover:bg-emerald-500/[0.05] rounded-2xl transition-all hover:shadow-[0_4px_30px_rgba(52,211,153,0.1)]">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.852L.057 23.25a.75.75 0 00.916.927l5.578-1.463A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.696 9.696 0 01-4.946-1.353l-.355-.211-3.674.964.983-3.584-.232-.369A9.7 9.7 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">{tx.contact_wa_label}</p>
                  <p className="text-white font-bold text-sm">+1 (787) 939-8739</p>
                  <p className="text-xs text-emerald-400 mt-1 font-medium group-hover:underline">{tx.contact_wa_cta}</p>
                </div>
              </a>

              <a href="mailto:saul@puny.bz"
                className="group flex items-start gap-4 p-6 bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/40 hover:bg-violet-500/[0.05] rounded-2xl transition-all hover:shadow-[0_4px_30px_rgba(112,48,239,0.1)]">
                <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 transition-colors">
                  <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">{tx.contact_email_label}</p>
                  <p className="text-white font-bold text-sm">saul@puny.bz</p>
                  <p className="text-xs text-violet-400 mt-1 font-medium group-hover:underline">{tx.contact_email_cta}</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-6 bg-white/[0.03] border border-white/[0.07] rounded-2xl">
                <div className="w-11 h-11 rounded-xl bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">{tx.contact_office_label}</p>
                  <p className="text-white font-bold text-sm leading-snug">{tx.contact_office_name}</p>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{tx.contact_office_addr}<br />{tx.contact_office_city}</p>
                  <p className="text-xs text-slate-600 mt-1">{tx.contact_office_tag}</p>
                </div>
              </div>
            </div>

            {/* Social media row */}
            <div className="border-t border-white/[0.07] pt-10">
              <p className="text-center text-xs font-bold tracking-widest uppercase text-slate-600 mb-7">
                {lang === 'es' ? 'Encuéntrame en' : 'Find me on'}
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">

                {/* LinkedIn */}
                <a href="https://linkedin.com/in/saulgonzalez11" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-5 py-3.5 bg-[#0a66c2]/10 hover:bg-[#0a66c2]/20 border border-[#0a66c2]/25 hover:border-[#0a66c2]/50 rounded-2xl transition-all hover:shadow-[0_4px_20px_rgba(10,102,194,0.2)]">
                  <svg className="w-5 h-5 text-[#0a66c2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <div>
                    <p className="text-[#4d9fe8] font-bold text-sm leading-none">LinkedIn</p>
                    <p className="text-slate-500 text-xs mt-0.5">@saulgonzalez11</p>
                  </div>
                </a>

                {/* GitHub */}
                <a href="https://github.com/Saul-Punybz" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-5 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/25 rounded-2xl transition-all">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  <div>
                    <p className="text-white font-bold text-sm leading-none">GitHub</p>
                    <p className="text-slate-500 text-xs mt-0.5">@Saul-Punybz</p>
                  </div>
                </a>

                {/* Instagram */}
                <a href="https://instagram.com/BUSCASAUL" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-5 py-3.5 bg-[#e1306c]/[0.08] hover:bg-[#e1306c]/15 border border-[#e1306c]/20 hover:border-[#e1306c]/40 rounded-2xl transition-all hover:shadow-[0_4px_20px_rgba(225,48,108,0.15)]">
                  <svg className="w-5 h-5 text-[#e1306c]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  <div>
                    <p className="text-[#e1306c] font-bold text-sm leading-none">Instagram</p>
                    <p className="text-slate-500 text-xs mt-0.5">@BUSCASAUL</p>
                  </div>
                </a>

                {/* Facebook */}
                <a href="https://facebook.com/buscasaul" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-5 py-3.5 bg-[#1877f2]/[0.08] hover:bg-[#1877f2]/15 border border-[#1877f2]/20 hover:border-[#1877f2]/40 rounded-2xl transition-all hover:shadow-[0_4px_20px_rgba(24,119,242,0.15)]">
                  <svg className="w-5 h-5 text-[#1877f2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  <div>
                    <p className="text-[#1877f2] font-bold text-sm leading-none">Facebook</p>
                    <p className="text-slate-500 text-xs mt-0.5">@buscasaul</p>
                  </div>
                </a>

                {/* Puny.bz */}
                <a href="https://puny.bz" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-5 py-3.5 bg-[#55a6e6]/[0.08] hover:bg-[#55a6e6]/15 border border-[#55a6e6]/20 hover:border-[#55a6e6]/40 rounded-2xl transition-all hover:shadow-[0_4px_20px_rgba(85,166,230,0.15)]">
                  {/* Puny.bz glyph — 3 colored blocks */}
                  <svg viewBox="0 0 58 62" className="h-5 w-auto flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="29.2" y="36.6" width="25.3" height="25.3" rx="6.7" fill="#4CD0B6"/>
                    <rect x="29.2" y="7.3" width="25.3" height="25.3" rx="6.7" fill="#FF6F61"/>
                    <rect x="0" y="7.3" width="25.3" height="54.6" rx="6.7" fill="#55A6E6"/>
                  </svg>
                  <div>
                    <p className="text-[#55a6e6] font-bold text-sm leading-none">Puny.bz</p>
                    <p className="text-slate-500 text-xs mt-0.5">Co-fundador & COO</p>
                  </div>
                </a>

                {/* Puny.bz Saga */}
                <a href="https://puny.bz/saga" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-5 py-3.5 bg-violet-500/[0.08] hover:bg-violet-500/15 border border-violet-500/20 hover:border-violet-500/40 rounded-2xl transition-all hover:shadow-[0_4px_20px_rgba(112,48,239,0.15)]">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-violet-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="3"/>
                    <path strokeLinecap="round" d="M8 10h8M8 14h5"/>
                  </svg>
                  <div>
                    <p className="text-violet-400 font-bold text-sm leading-none">Agenda conmigo</p>
                    <p className="text-slate-500 text-xs mt-0.5">puny.bz/saga</p>
                  </div>
                </a>

              </div>
            </div>

          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="relative overflow-hidden py-32 px-6">
          {/* Full gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,255,255,0.15)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(0,0,0,0.15)_0%,transparent_60%)]" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {lang === 'es' ? 'Disponible ahora · Puerto Rico & remoto' : 'Available now · Puerto Rico & remote'}
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight">{tx.cta_title}</h2>
            <p className="text-white/75 text-lg mb-10 leading-relaxed max-w-xl mx-auto">{tx.cta_sub}</p>
            <a href="#quiz" className="inline-block bg-white text-violet-700 hover:bg-white/95 font-bold px-12 py-5 rounded-2xl text-base transition-all hover:shadow-2xl hover:scale-105 hover:-translate-y-0.5">
              {tx.cta_btn}
            </a>
            <p className="text-white/40 text-sm mt-4">
              {lang === 'es' ? 'Proyectos desde $3,500 · Pago por etapas · Sin compromisos al inicio' : 'Projects from $3,500 · Milestone payments · No upfront commitment'}
            </p>
            <p className="text-white/50 text-sm mt-6">{tx.cta_email}</p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-10 px-6 border-t border-slate-100 dark:border-white/[0.06] bg-white dark:bg-[#090820]">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 dark:text-slate-600 text-sm mb-6">
              <div>
                <p className="font-black text-slate-700 dark:text-slate-300 tracking-widest text-sm">SAUL A. GONZÁLEZ</p>
                <p className="text-xs mt-0.5">{tx.footer_loc}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-5">
                <a href="https://wa.me/17879398739" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">WhatsApp</a>
                <a href="mailto:saul@puny.bz" className="hover:text-violet-500 transition-colors">saul@puny.bz</a>
                <a href="https://puny.bz" target="_blank" rel="noopener noreferrer" className="hover:text-violet-500 transition-colors">Puny.bz</a>
                <a href="https://linkedin.com/in/saulgonzalez11" target="_blank" rel="noopener noreferrer" className="hover:text-violet-500 transition-colors">LinkedIn</a>
              </div>
              <p className="text-xs">{tx.footer_rights}</p>
            </div>
            <div className="border-t border-slate-100 dark:border-white/[0.04] pt-5 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400 dark:text-slate-600">
              <a href="/terminos" className="hover:text-violet-500 dark:hover:text-violet-400 transition-colors">{lang === 'es' ? 'Términos y Condiciones' : 'Terms & Conditions'}</a>
              <span>·</span>
              <a href="/privacidad" className="hover:text-violet-500 dark:hover:text-violet-400 transition-colors">{lang === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}</a>
              <span>·</span>
              <span>saul@puny.bz</span>
              <span>·</span>
              <span>Bayamón, Puerto Rico 🇵🇷</span>
            </div>
          </div>
        </footer>

      </main>
    </>
  )
}
