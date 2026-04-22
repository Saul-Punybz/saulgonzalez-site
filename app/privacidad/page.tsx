import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Saul A. González',
  description: 'Política de privacidad y manejo de datos de los servicios de consultoría digital de Saul A. González.',
}

const sections = [
  {
    title: '1. Quién recopila tus datos',
    content: `Saul A. González, consultor digital independiente, con correo de contacto saul@puny.bz y con sede en Bayamón, Puerto Rico, es el responsable del tratamiento de los datos personales que se recopilan a través de este sitio web y en el contexto de los servicios contratados.`,
  },
  {
    title: '2. Qué datos recopilamos',
    content: `Recopilamos únicamente los datos necesarios para prestar los servicios y comunicarnos contigo:\n\n• Información de contacto: nombre, correo electrónico, número de teléfono\n• Información del proyecto: descripción del negocio, objetivos, presupuesto estimado\n• Datos de facturación: nombre o razón social, dirección (cuando aplique para facturación)\n• Comunicaciones: mensajes enviados por formularios, WhatsApp o correo electrónico\n\nNo recopilamos datos bancarios, contraseñas ni información financiera sensible a través de este sitio.`,
  },
  {
    title: '3. Cómo usamos tus datos',
    content: `Usamos tu información exclusivamente para:\n\n• Responder a consultas y evaluar si podemos ayudarte\n• Preparar propuestas y contratos de proyecto\n• Ejecutar y administrar los proyectos contratados\n• Enviarte información relevante sobre el proyecto en curso\n• Cumplir con obligaciones legales y fiscales\n\nNo usamos tus datos para publicidad de terceros, ni los vendemos, cedemos o compartimos con empresas externas salvo lo indicado en la sección 5.`,
  },
  {
    title: '4. Base legal del tratamiento',
    content: `El tratamiento de tus datos se basa en:\n\n• Tu consentimiento explícito al enviar el formulario de contacto o quiz de proyecto\n• La ejecución de un contrato cuando ya existe una relación profesional activa\n• Interés legítimo para el seguimiento de consultas y propuestas\n• Obligaciones legales de conservación de documentos fiscales`,
  },
  {
    title: '5. Con quién compartimos tus datos',
    content: `Para operar los servicios, podemos usar los siguientes proveedores que actúan como encargados del tratamiento:\n\n• Google Workspace (correo electrónico, videoconferencias, documentos)\n• WhatsApp Business (comunicación directa)\n• Stripe o PayPal (procesamiento de pagos — solo acceden a los datos de facturación necesarios)\n• Vercel (hosting de este sitio web — no tiene acceso a datos personales de clientes)\n\nTodos estos proveedores cumplen con estándares de privacidad reconocidos (GDPR, CCPA o equivalentes).`,
  },
  {
    title: '6. Por cuánto tiempo guardamos tus datos',
    content: `• Datos de clientes con proyectos activos: durante la duración del proyecto y 5 años posteriores (para cumplimiento fiscal y legal en Puerto Rico)\n• Consultas sin proyecto contratado: máximo 2 años desde el último contacto\n• Datos de facturación: 7 años según requerimientos fiscales de Puerto Rico y EE.UU.\n\nPuedes solicitar la eliminación anticipada de tus datos cuando la ley lo permita.`,
  },
  {
    title: '7. Tus derechos',
    content: `Tienes derecho a:\n\n• Acceso: solicitar una copia de los datos que tenemos sobre ti\n• Rectificación: corregir datos incorrectos o desactualizados\n• Eliminación: solicitar que borremos tus datos (sujeto a obligaciones legales)\n• Portabilidad: recibir tus datos en un formato estructurado y legible\n• Oposición: oponerte al uso de tus datos para comunicaciones que no sean parte de un contrato activo\n\nPara ejercer cualquiera de estos derechos, escríbenos a saul@puny.bz con el asunto "Privacidad – [tu derecho]". Responderemos dentro de 30 días hábiles.`,
  },
  {
    title: '8. Cookies y tecnologías de rastreo',
    content: `Este sitio web utiliza únicamente cookies técnicas necesarias para el funcionamiento básico (como la preferencia de idioma y tema). No utilizamos cookies de rastreo publicitario, pixels de Facebook, ni herramientas de análisis de comportamiento de terceros que identifiquen usuarios individuales.\n\nSi en el futuro se añade alguna herramienta de análisis, esta Política se actualizará y se informará al usuario.`,
  },
  {
    title: '9. Seguridad de los datos',
    content: `Implementamos medidas razonables para proteger tu información:\n\n• Comunicaciones cifradas mediante TLS/SSL\n• Acceso restringido a los datos (solo Saul A. González y colaboradores directos bajo NDA)\n• Almacenamiento en servicios con certificaciones de seguridad reconocidas\n\nNingún sistema es 100% seguro. En caso de una brecha de seguridad que afecte tus datos, te notificaremos dentro de 72 horas de detectada.`,
  },
  {
    title: '10. Menores de edad',
    content: `Este sitio y los servicios ofrecidos están dirigidos exclusivamente a personas mayores de 18 años o a empresas representadas por adultos. No recopilamos intencionalmente información de menores. Si crees que un menor ha enviado datos a través de este sitio, comunícate con nosotros para eliminarlos.`,
  },
  {
    title: '11. Actualizaciones a esta política',
    content: `Esta política puede actualizarse periódicamente para reflejar cambios en nuestras prácticas o en la legislación aplicable. Publicaremos la versión actualizada en esta página con la fecha de modificación. Para cambios significativos, notificaremos a los clientes activos por correo electrónico.`,
  },
  {
    title: '12. Contacto y reclamaciones',
    content: `Para cualquier consulta, solicitud o reclamación relacionada con la privacidad de tus datos:\n\nSaul A. González\nsaul@puny.bz\n+1 (787) 939-8739\nBayamón, Puerto Rico 00959\n\nSi no recibes respuesta satisfactoria, tienes derecho a presentar una reclamación ante la autoridad de protección de datos competente en tu jurisdicción.`,
  },
]

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#090820] text-slate-900 dark:text-white">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-white/[0.07] bg-slate-50/80 dark:bg-white/[0.02] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
            Saul A. González
          </Link>
          <span className="text-xs text-slate-400">Última actualización: Abril 2026</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Title */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
            Documento legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Política de Privacidad</h1>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Tu privacidad es importante. Esta política explica en lenguaje claro qué datos recopilamos, por qué y cómo los protegemos.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map(s => (
            <div key={s.title} className="border-b border-slate-100 dark:border-white/[0.06] pb-12 last:border-0">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{s.title}</h2>
              <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                {s.content}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-7 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 rounded-2xl text-center">
          <p className="text-slate-700 dark:text-slate-300 font-semibold mb-2">¿Quieres ejercer alguno de tus derechos?</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">Respondo personalmente. Sin formularios intermediarios, sin burocracia.</p>
          <a href="mailto:saul@puny.bz?subject=Privacidad" className="inline-block btn-gradient text-white font-bold px-8 py-3.5 rounded-xl text-sm">
            Escribir a saul@puny.bz
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 justify-center text-sm">
          <Link href="/" className="text-slate-400 hover:text-violet-500 transition-colors">← Volver al inicio</Link>
          <Link href="/terminos" className="text-slate-400 hover:text-violet-500 transition-colors">Términos y Condiciones →</Link>
        </div>
      </div>
    </main>
  )
}
