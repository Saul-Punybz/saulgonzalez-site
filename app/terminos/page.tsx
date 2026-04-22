import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Términos y Condiciones — Saul A. González',
  description: 'Términos y condiciones de los servicios de consultoría digital de Saul A. González.',
}

const sections = [
  {
    title: '1. Partes del acuerdo',
    content: `Estos Términos y Condiciones ("Términos") regulan la relación entre Saul A. González, consultor digital independiente con base en Bayamón, Puerto Rico, EE.UU. ("el Consultor"), y cualquier persona natural o jurídica que contrate sus servicios ("el Cliente").\n\nAl contratar cualquier servicio o al confirmar un proyecto de forma oral o escrita, el Cliente acepta la totalidad de estos Términos.`,
  },
  {
    title: '2. Descripción de los servicios',
    content: `El Consultor ofrece servicios de:\n• Desarrollo de aplicaciones web (WebApps) y sistemas digitales\n• Desarrollo de aplicaciones móviles para iOS y Android\n• Integración de inteligencia artificial y automatizaciones\n• Consultoría técnica, revisión de arquitectura y CTO as a Service\n\nCada proyecto se delimita en una Propuesta de Trabajo o Contrato de Proyecto escrito que especifica el alcance, entregables, tiempos y costo total acordado. Cualquier trabajo fuera de ese alcance requiere un acuerdo adicional por escrito.`,
  },
  {
    title: '3. Proceso de contratación',
    content: `El proceso estándar es el siguiente:\n\n1. Consulta inicial gratuita de 30 minutos (sin compromiso)\n2. Propuesta de trabajo con alcance, cronograma y presupuesto detallado\n3. Revisión, negociación y aceptación por escrito de ambas partes\n4. Firma de contrato y pago del primer hito antes del inicio del trabajo\n\nNingún trabajo comenzará sin contrato firmado y primer pago recibido.`,
  },
  {
    title: '4. Pagos y estructura de hitos',
    content: `Todos los proyectos se pagan en etapas (hitos), no en su totalidad por adelantado. La estructura típica es:\n\n• 40% al inicio del proyecto (antes de comenzar el trabajo)\n• 40% al completar el 70% del proyecto o la entrega del MVP\n• 20% al cierre, aprobación final y entrega de accesos\n\nLos porcentajes pueden variar según lo acordado en el contrato de cada proyecto.\n\nLos pagos se realizan por transferencia bancaria (ACH), PayPal, Stripe u otro método acordado. Los pagos en criptomonedas se aceptan bajo acuerdo previo.\n\nFacturas no pagadas dentro de los 15 días de su fecha de vencimiento pueden generar un cargo de mora del 1.5% mensual y la suspensión del trabajo activo.`,
  },
  {
    title: '5. Revisiones y cambios de alcance',
    content: `Cada propuesta especifica el número de rondas de revisiones incluidas. Las revisiones adicionales se facturan a $150 USD/hora o según la tarifa acordada en el contrato.\n\nUn cambio de alcance ("scope change") es cualquier solicitud que modifica los entregables originales, añade funcionalidades no especificadas, o cambia la tecnología acordada. Los cambios de alcance requieren aprobación escrita y pueden afectar el precio y el cronograma.`,
  },
  {
    title: '6. Cronograma y entregas',
    content: `Los tiempos de entrega estimados en la propuesta son referenciales y están condicionados a:\n• Recepción oportuna de materiales, contenido e información del Cliente\n• Aprobación de entregables intermedios dentro de los plazos acordados\n• Pago de hitos según el calendario establecido\n\nRetrasos causados por el Cliente, incluyendo demoras en aprobaciones, pagos o entrega de materiales, liberan al Consultor de su responsabilidad sobre el cronograma original. El Consultor notificará al Cliente con anticipación de cualquier retraso de su parte.`,
  },
  {
    title: '7. Propiedad intelectual',
    content: `Al recibir el pago completo del proyecto, el Cliente obtiene la propiedad total del código fuente, diseños y entregables desarrollados específicamente para dicho proyecto.\n\nEl Consultor se reserva el derecho de:\n• Usar herramientas, librerías y frameworks de código abierto (cuyas licencias se respetan)\n• Mencionar el nombre del Cliente y/o el proyecto en su portafolio, a menos que se acuerde confidencialidad por escrito\n• Reutilizar componentes genéricos no específicos al negocio del Cliente\n\nEl código de terceros (librerías, APIs, frameworks) está sujeto a las licencias de sus respectivos autores.`,
  },
  {
    title: '8. Confidencialidad',
    content: `El Consultor mantiene confidencialidad sobre la información de negocio, datos de clientes, estrategias y documentos del Cliente que sean marcados como confidenciales o que por su naturaleza sean claramente sensibles.\n\nCualquier proyecto que requiera un Acuerdo de No Divulgación (NDA) formal puede solicitarlo antes del inicio de la consulta inicial. El Consultor firmará NDAs razonables a solicitud del Cliente.`,
  },
  {
    title: '9. Garantía de trabajo',
    content: `El Consultor garantiza que el trabajo entregado funcionará según las especificaciones acordadas al momento de la entrega.\n\nSe incluye un período de corrección de errores de 30 días naturales después de la entrega final, durante el cual el Consultor corregirá sin costo adicional cualquier fallo que sea resultado directo del trabajo desarrollado.\n\nEsta garantía no cubre:\n• Problemas causados por modificaciones del Cliente o terceros al código entregado\n• Cambios en servicios externos (APIs, plataformas de terceros) fuera del control del Consultor\n• Nuevas funcionalidades no incluidas en el alcance original`,
  },
  {
    title: '10. Limitación de responsabilidad',
    content: `La responsabilidad total del Consultor por cualquier reclamación derivada de un proyecto no excederá el monto total pagado por el Cliente por dicho proyecto.\n\nEl Consultor no es responsable por pérdidas de negocio, ingresos o datos causadas por factores fuera del alcance del trabajo entregado, incluyendo fallas de infraestructura de terceros, decisiones de negocio del Cliente, o el uso del sistema por parte de los usuarios finales.`,
  },
  {
    title: '11. Cancelaciones y terminación',
    content: `Cualquiera de las partes puede terminar el contrato por escrito con 14 días de aviso previo.\n\nEn caso de cancelación por parte del Cliente:\n• Los pagos de hitos ya realizados no son reembolsables\n• El trabajo completado hasta la fecha de cancelación se entrega al Cliente\n• El hito vigente se cobrará en proporción al trabajo completado\n\nEn caso de incumplimiento del Consultor (incluyendo abandono del proyecto sin causa justificada), el Cliente tiene derecho a un reembolso proporcional al trabajo no entregado.`,
  },
  {
    title: '12. Ley aplicable y resolución de disputas',
    content: `Estos Términos se rigen por las leyes del Estado Libre Asociado de Puerto Rico y las leyes federales de los Estados Unidos de América que apliquen.\n\nLas partes acuerdan resolver cualquier disputa primero de buena fe mediante comunicación directa. Si no se llega a un acuerdo dentro de 30 días, se someterán a mediación en Puerto Rico antes de recurrir a cualquier proceso judicial.\n\nEl foro competente para cualquier acción legal será los tribunales de Puerto Rico.`,
  },
  {
    title: '13. Modificaciones a estos Términos',
    content: `El Consultor se reserva el derecho de actualizar estos Términos. Los cambios se publicarán en este sitio web con la fecha de actualización. Los contratos firmados bajo una versión anterior de los Términos se mantienen bajo esa versión hasta su conclusión.`,
  },
  {
    title: '14. Contacto',
    content: `Para cualquier pregunta sobre estos Términos:\n\nSaul A. González\nsaul@puny.bz\n+1 (787) 939-8739\nComplejo Onofre Carballeira, Bayamón, PR 00959`,
  },
]

export default function TerminosPage() {
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
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
            Documento legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Términos y Condiciones</h1>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Estos términos rigen todos los proyectos y servicios contratados con Saul A. González. Están escritos en lenguaje claro — sin letra chica ni trampas.
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
          <p className="text-slate-700 dark:text-slate-300 font-semibold mb-2">¿Tienes preguntas sobre alguno de estos puntos?</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">Escríbeme antes de contratar. Prefiero aclarar todo desde el principio.</p>
          <a href="mailto:saul@puny.bz" className="inline-block btn-gradient text-white font-bold px-8 py-3.5 rounded-xl text-sm">
            Escribir a saul@puny.bz
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 justify-center text-sm">
          <Link href="/" className="text-slate-400 hover:text-violet-500 transition-colors">← Volver al inicio</Link>
          <Link href="/privacidad" className="text-slate-400 hover:text-violet-500 transition-colors">Política de Privacidad →</Link>
        </div>
      </div>
    </main>
  )
}
