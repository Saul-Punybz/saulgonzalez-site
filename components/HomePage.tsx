'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import ContactForm from '@/components/ContactForm'

export default function HomePage() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = resolvedTheme === 'dark'

  return (
    <div className="levanta">
      {/* ─── NAV ─── */}
      <header className="lv-nav">
        <div className="lv-wrap lv-nav-inner">
          <a className="lv-brand" href="#top">
            <span className="lv-dot" />
            <span className="lv-name"><b>Levanta</b><span className="lv-by">por Saúl A. González</span></span>
          </a>
          <nav className="lv-nav-links">
            <a href="#magnets">Herramientas</a>
            <a href="#vehiculos">Vehículos</a>
            <a href="#proceso">Cómo funciona</a>
            <a href="#servicios">Asesoría</a>
            <a href="#behind">Quién está detrás</a>
          </nav>
          <div className="lv-nav-right">
            <button
              className="lv-theme-btn"
              aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
            >
              {mounted && isDark ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
              )}
            </button>
            <Link className="lv-btn lv-btn-primary" href="/tools/generador-safe">Genera tu SAFE gratis</Link>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ─── HERO ─── */}
        <section className="lv-hero">
          <div className="lv-wrap lv-hero-grid">
            <div>
              <span className="lv-eyebrow lv-anim lv-d1">Kit de capital para founders</span>
              <h1 className="lv-anim lv-d2">Levanta capital<br /><em>sin regalar tu empresa.</em></h1>
              <p className="lv-hero-sub lv-anim lv-d3">La plataforma que te lleva de la mano: elige el vehículo correcto —SAFE, no-dilutivo, capital de diáspora—, genera tus documentos y arma un dataroom que cierra la ronda. En español. Gratis para empezar.</p>
              <div className="lv-hero-cta lv-anim lv-d4">
                <Link className="lv-btn lv-btn-primary lv-btn-lg" href="/tools/generador-safe">Genera tu SAFE gratis</Link>
                <a className="lv-btn lv-btn-ghost lv-btn-lg" href="#proceso">Ver cómo funciona</a>
              </div>
              <div className="lv-trust lv-anim lv-d5">
                Creado por un founder que levantó <b className="lv-tnum">$150K</b> con un SAFE — hoy levanta una pre-seed de <b className="lv-tnum">$1.2M</b>
              </div>
            </div>

            <div className="lv-mock-wrap lv-anim lv-d4">
              <div className="lv-mock">
                <div className="lv-mock-bar">
                  <span className="lv-d" style={{ background: '#FF5F57' }} />
                  <span className="lv-d" style={{ background: '#FEBC2E' }} />
                  <span className="lv-d" style={{ background: '#28C840' }} />
                  <span className="lv-mock-url">saulgonzalez.pro/tools/generador-safe</span>
                </div>
                <div className="lv-mock-body">
                  <div className="lv-mock-h">
                    <span className="lv-mock-t">Generador de SAFE</span>
                    <span className="lv-pill lv-pill-good">Gratis</span>
                  </div>
                  <div className="lv-field-row">
                    <div className="lv-field"><label>Monto</label><div className="lv-val lv-tnum">$150,000</div></div>
                    <div className="lv-field"><label>Valuation cap</label><div className="lv-val lv-tnum">$8,000,000</div></div>
                  </div>
                  <div className="lv-field-row">
                    <div className="lv-field"><label>Discount</label><div className="lv-val lv-tnum">20%</div></div>
                    <div className="lv-field"><label>Tipo</label><div className="lv-val">Post-money</div></div>
                  </div>
                  <div className="lv-doc">
                    <span className="lv-k">SAFE</span> — Simple Agreement for Future Equity<br />
                    Inversión: <b className="lv-tnum">$150,000</b> · Cap: <b className="lv-tnum">$8M</b><br />
                    Conversión → <b className="lv-tnum">1.875%</b> en la ronda priced<br />
                    <span className="lv-k">✓</span> Generado sobre plantilla estándar YC
                  </div>
                </div>
              </div>
              <div className="lv-float-badge">
                <span className="lv-fb-ic">↓</span>
                <span><span className="lv-fb-lab">Descarga</span><br /><span className="lv-fb-num">PDF + Word</span></span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── VILLAINS ─── */}
        <section className="lv-band">
          <div className="lv-wrap">
            <div className="lv-sec-head">
              <span className="lv-eyebrow">El problema real</span>
              <h2>No te falta dinero. Te falta capital inteligente.</h2>
              <p>Sobra efectivo — pero el que invierte no conoce los instrumentos, ofrece términos predatorios, y el capital que existe se protege en vez de multiplicarse.</p>
            </div>
            <div className="lv-villain-grid">
              <div className="lv-villain lv-v-violet">
                <div className="lv-ic">🏦</div>
                <h3>El inversor que no sabe qué es un SAFE</h3>
                <p>Tiene el dinero, pero nunca hizo un deal de tech. Te pide un pagaré, o equity directo, o “vamos 50/50”. Y terminas educando a tu propio inversionista.</p>
                <span className="lv-tag">Falta de instrumentos</span>
              </div>
              <div className="lv-villain lv-danger">
                <div className="lv-ic">⚠️</div>
                <h3>El término que te come vivo</h3>
                <p>60% del equity por $70K. Full-ratchet. Un pool del 30%. Suena a inversión, pero es una trampa que te deja sin empresa para la Serie A. Nadie te enseñó a leer el term sheet.</p>
                <span className="lv-tag">Términos predatorios</span>
              </div>
              <div className="lv-villain lv-v-violet">
                <div className="lv-ic">🐷</div>
                <h3>La LLC-alcancía</h3>
                <p>Capital que llegó a proteger dinero, no a construir. Extrae, no multiplica. Mientras el ecosistema tech avanza solo porque el capital privado no apuesta.</p>
                <span className="lv-tag">Capital que no invierte</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── LEAD MAGNETS ─── */}
        <section className="lv-band lv-magnets" id="magnets">
          <div className="lv-wrap">
            <div className="lv-sec-head">
              <span className="lv-eyebrow">Herramientas gratis</span>
              <h2>Los documentos que necesitas — generados, no explicados.</h2>
              <p>Llena un formulario y descarga. Sin jerga, sin abogados caros para empezar. Los primeros son gratis; el paquete completo, cuando lo quieras.</p>
            </div>
            <div className="lv-magnet-grid">
              <Link className="lv-magnet" href="/tools/generador-safe">
                <div className="lv-magnet-vis">
                  <div className="lv-mv-doc">
                    <span className="lv-k">SAFE</span> · post-money<br />
                    cap <b className="lv-tnum">$8M</b> · disc <b className="lv-tnum">20%</b><br />
                    → <b className="lv-tnum">1.875%</b> ownership<br />
                    <span className="lv-k">✓</span> plantilla YC
                  </div>
                </div>
                <div className="lv-magnet-body">
                  <div className="lv-top"><h3>Generador de SAFE</h3><span className="lv-pill lv-pill-good">Gratis</span></div>
                  <p>Formulario → tu SAFE completo en PDF y Word, sobre la plantilla estándar de Y Combinator.</p>
                  <span className="lv-go">Generar mi SAFE →</span>
                </div>
              </Link>
              <div className="lv-magnet">
                <div className="lv-magnet-vis">
                  <div className="lv-mv-check">
                    <div><span className="lv-box lv-on">✓</span> Cap table actualizado</div>
                    <div><span className="lv-box lv-on">✓</span> Métricas &amp; MRR</div>
                    <div><span className="lv-box">·</span> Contratos y legal</div>
                    <div><span className="lv-box">·</span> Proyecciones financieras</div>
                  </div>
                </div>
                <div className="lv-magnet-body">
                  <div className="lv-top"><h3>Checklist de dataroom</h3><span className="lv-pill lv-pill-violet">Pronto</span></div>
                  <p>Todo lo que un inversionista pide antes de firmar. Marca, organiza y exporta tu resumen.</p>
                  <span className="lv-go">Armar mi dataroom →</span>
                </div>
              </div>
              <div className="lv-magnet">
                <div className="lv-magnet-vis">
                  <div className="lv-mv-bar"><span style={{ height: '32%' }} /><span style={{ height: '48%' }} /><span style={{ height: '60%' }} /><span style={{ height: '78%' }} /><span style={{ height: '94%' }} /></div>
                </div>
                <div className="lv-magnet-body">
                  <div className="lv-top"><h3>Calculadora de dilución</h3><span className="lv-pill lv-pill-violet">Pronto</span></div>
                  <p>Monto + valuación → cuánto entregas y cómo queda tu cap table después de la ronda.</p>
                  <span className="lv-go">Calcular dilución →</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── VEHICLES / ALTERNATIVAS AL SAFE ─── */}
        <section className="lv-band" id="vehiculos">
          <div className="lv-wrap">
            <div className="lv-sec-head">
              <span className="lv-eyebrow">Elige tu vehículo</span>
              <h2>El SAFE no es tu única opción.</h2>
              <p>Es el más rápido para etapa temprana — pero según tu etapa, tu tracción y lo que pida el inversor, otro instrumento te conviene más. Aquí los comparas sin jerga.</p>
            </div>
            <div className="lv-vehic-intro">
              <div className="lv-vehic-pill"><div className="lv-vp-k">Convertibles</div><div className="lv-vp-v">SAFE · Nota convertible · KISS — hoy dinero, después equity.</div></div>
              <div className="lv-vehic-pill"><div className="lv-vp-k">Con precio</div><div className="lv-vp-v">Ronda priced — vendes acciones a una valuación fija.</div></div>
              <div className="lv-vehic-pill"><div className="lv-vp-k">No-dilutivo</div><div className="lv-vp-v">Grants y revenue-based — capital sin dar equity.</div></div>
              <div className="lv-vehic-pill"><div className="lv-vp-k">Diáspora</div><div className="lv-vp-v">Inversionistas de tu país/región que viven en el exterior.</div></div>
            </div>
            <div className="lv-vehic-table-wrap">
              <table className="lv-vehic-table">
                <thead>
                  <tr><th>Instrumento</th><th>¿Diluye?</th><th>Velocidad</th><th>Cuándo te conviene</th></tr>
                </thead>
                <tbody>
                  <tr className="lv-hl">
                    <td className="lv-inst">SAFE <small>Post-money (estándar YC)</small></td>
                    <td><span className="lv-badge lv-badge-def">Diferido</span></td>
                    <td>⚡ Rápido</td>
                    <td className="lv-when">Pre-seed y rondas rolling, sin fijar valuación todavía. Lo más simple para empezar.</td>
                  </tr>
                  <tr>
                    <td className="lv-inst">Nota convertible <small>Convertible note</small></td>
                    <td><span className="lv-badge lv-badge-def">Diferido</span></td>
                    <td>Media</td>
                    <td className="lv-when">El inversor quiere protección de deuda: interés + fecha de vencimiento.</td>
                  </tr>
                  <tr>
                    <td className="lv-inst">KISS <small>Keep It Simple Security</small></td>
                    <td><span className="lv-badge lv-badge-def">Diferido</span></td>
                    <td>Media</td>
                    <td className="lv-when">Alternativa a la nota, con términos estandarizados (variante de 500 Startups).</td>
                  </tr>
                  <tr>
                    <td className="lv-inst">Ronda con precio <small>Priced equity</small></td>
                    <td><span className="lv-badge lv-badge-di">Sí, ya</span></td>
                    <td>🐢 Lenta</td>
                    <td className="lv-when">Serie A en adelante: montos grandes y una valuación clara sobre la mesa.</td>
                  </tr>
                  <tr>
                    <td className="lv-inst">Revenue-based <small>Financiamiento por ingresos</small></td>
                    <td><span className="lv-badge lv-badge-no">No diluye</span></td>
                    <td>Media</td>
                    <td className="lv-when">Ya tienes ingresos recurrentes y no quieres entregar equity.</td>
                  </tr>
                  <tr>
                    <td className="lv-inst">Capital no-dilutivo <small>Grants: SBIR, federales, aceleradoras</small></td>
                    <td><span className="lv-badge lv-badge-no">No diluye</span></td>
                    <td>Lenta</td>
                    <td className="lv-when">Tienes R&amp;D o encajas en un programa público. Toma tiempo, pero es gratis.</td>
                  </tr>
                  <tr>
                    <td className="lv-inst">Capital de diáspora <small>Inversionistas de tu país en el exterior</small></td>
                    <td><span className="lv-badge lv-badge-var">Según instrumento</span></td>
                    <td>Media</td>
                    <td className="lv-when">Inversionistas que entienden tu mercado y te apuestan. Tu ventaja injusta.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="lv-vehic-cta">
              <Link className="lv-btn lv-btn-primary" href="/tools/generador-safe">Genera tu SAFE gratis</Link>
              <a className="lv-btn lv-btn-ghost" href="#proceso">¿Cuál me conviene? →</a>
            </div>
          </div>
        </section>

        {/* ─── GUIDED PROCESS ─── */}
        <section className="lv-band" id="proceso">
          <div className="lv-wrap">
            <div className="lv-sec-head">
              <span className="lv-eyebrow">Cómo funciona</span>
              <h2>De la mano — de la idea al cheque.</h2>
              <p>Seis pasos. Entras sin saber nada de fundraising y sales con el instrumento elegido, tus documentos y tu dataroom listo.</p>
            </div>
            <div className="lv-steps">
              <div className="lv-step"><span className="lv-n">1</span><div><h3>¿En qué etapa estás?</h3><p>Idea, pre-seed, levantando ahora o con términos sobre la mesa. La plataforma empieza donde estás.</p></div></div>
              <div className="lv-step"><span className="lv-n">2</span><div><h3>¿Qué instrumento te conviene?</h3><p>SAFE vs. nota convertible vs. equity vs. no-dilutivo vs. diáspora. Comparación y recomendación.</p></div></div>
              <div className="lv-step"><span className="lv-n">3</span><div><h3>Genera tu SAFE<span className="lv-free">Gratis</span></h3><p>Formulario → documento completo, listo para descargar y revisar con tu abogado.</p></div></div>
              <div className="lv-step"><span className="lv-n">4</span><div><h3>Arma tu dataroom<span className="lv-free">Checklist gratis</span></h3><p>Qué debe contener y cómo organizarlo. El pack completo de documentos, cuando lo quieras.</p></div></div>
              <div className="lv-step"><span className="lv-n">5</span><div><h3>Incorpórate y protégete<span className="lv-paid">Pago</span></h3><p>Delaware C-Corp, founders agreement, shareholder agreement, vesting. Estructura que no te truena la ronda.</p></div></div>
              <div className="lv-step"><span className="lv-n">6</span><div><h3>¿Necesitas ayuda experta?<span className="lv-paid">Asesoría</span></h3><p>Orientación 1:1 para tu caso concreto, con alguien que ya levantó su ronda.</p></div></div>
            </div>
          </div>
        </section>

        {/* ─── SERVICES / ASESORÍA ─── */}
        <section className="lv-band lv-services" id="servicios">
          <div className="lv-wrap">
            <div className="lv-sec-head">
              <span className="lv-eyebrow">Cuando necesitas más que herramientas</span>
              <h2>Asesoría experta, no solo plantillas.</h2>
            </div>
            <div className="lv-svc-grid">
              <div className="lv-svc">
                <div className="lv-svc-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M12 20V10M18 20V4M6 20v-4" /></svg></div>
                <h3>Orientación de fundraising</h3>
                <p>En qué etapa estás y qué necesitas de verdad. Estrategia de ronda, a quién pedirle, con qué narrativa y qué términos aceptar.</p>
              </div>
              <div className="lv-svc">
                <div className="lv-svc-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M4 4h16v4H4zM4 12h16v8H4zM8 4v16" /></svg></div>
                <h3>Dataroom listo para inversor</h3>
                <p>Armamos el paquete que cierra: métricas, cap table, legal, modelo. Organizado para que digan que sí.</p>
              </div>
              <div className="lv-svc">
                <div className="lv-svc-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M3 12h4l3 8 4-16 3 8h4" /></svg></div>
                <h3>Elección de vehículo</h3>
                <p>SAFE, no-dilutivo o capital de diáspora — cuál te conviene según tu etapa, sin regalar tu empresa.</p>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <a className="lv-btn lv-btn-primary lv-btn-lg" href="#contacto">Agenda tu consulta gratis →</a>
            </div>
          </div>
        </section>

        {/* ─── PROPONENT / QUIÉN ESTÁ DETRÁS ─── */}
        <section className="lv-band" id="behind">
          <div className="lv-wrap">
            <div className="lv-behind-card">
              <div className="lv-behind-ava">SG</div>
              <div className="lv-behind-txt">
                <div className="lv-behind-lab">Quién está detrás</div>
                <h3>Saúl A. González</h3>
                <p>Founder que levantó $150K con un SAFE y hoy levanta una ronda pre-seed de $1.2M por equity. Construyó Levanta con las herramientas que hubiera querido tener: las que evitan que un founder regale su empresa por no saber pedir capital.</p>
              </div>
              <div className="lv-behind-stats">
                <div><div className="lv-bs-n lv-tnum">$150K</div><div className="lv-bs-l">cerrado con SAFE</div></div>
                <div><div className="lv-bs-n lv-tnum">$1.2M</div><div className="lv-bs-l">pre-seed hoy</div></div>
                <div><div className="lv-bs-n lv-tnum">$260K</div><div className="lv-bs-l">ARR</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CONTACTO ─── */}
        <section className="lv-band lv-contacto" id="contacto">
          <div className="lv-wrap">
            <div className="lv-sec-head" style={{ textAlign: 'center', margin: '0 auto 40px' }}>
              <span className="lv-eyebrow" style={{ justifyContent: 'center' }}>Hablemos de tu ronda</span>
              <h2>Agenda tu orientación de fundraising — gratis.</h2>
              <p>30 minutos 1:1 con alguien que ya levantó su ronda. Te digo en qué etapa estás, qué vehículo te conviene y qué negociar. Sin costo, sin compromiso.</p>
            </div>
            <ContactForm />
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="lv-cta">
          <div className="lv-wrap">
            <h2>Empieza por tu SAFE. Es gratis.</h2>
            <p>Genera tu primer documento en minutos. Cuando lo necesites, hay asesoría experta disponible.</p>
            <Link className="lv-btn lv-btn-primary lv-btn-lg" href="/tools/generador-safe">Genera tu SAFE gratis</Link>
            <p className="lv-disc">Herramientas educativas — no consejo legal ni de inversión. Revisa con un abogado antes de firmar.</p>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="lv-footer">
        <div className="lv-wrap lv-foot-inner">
          <div className="lv-foot-brand">
            <span className="lv-dot" />
            <div><b>Levanta</b> <span>· por Saúl A. González · saulgonzalez.pro</span></div>
          </div>
          <div className="lv-foot-links">
            <a href="#magnets">Herramientas</a>
            <a href="#servicios">Asesoría</a>
            <a href="#behind">Quién está detrás</a>
            <Link href="/blog">Blog</Link>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .levanta {
          --sans: ui-sans-serif, system-ui, -apple-system, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          --mono: ui-monospace, "SF Mono", "SFMono-Regular", Menlo, Consolas, monospace;
          --bg:#FAF9FC; --surface:#FFFFFF; --surface-2:#F4F1FD; --ink:#17102E; --ink-2:#5B5470; --ink-3:#8A8399;
          --line:#E7E1F4; --line-2:#EFEBF9; --violet:#7030EF; --violet-deep:#5A1FD0; --violet-soft:#EDE6FE;
          --violet-glow:rgba(112,48,239,.18); --coral:#FF6F61; --coral-soft:#FFEDEA; --good:#12A386; --good-soft:#E2F5F0;
          --shadow-sm:0 1px 2px rgba(23,16,46,.05),0 1px 3px rgba(23,16,46,.06);
          --shadow-md:0 10px 30px -12px rgba(23,16,46,.18); --shadow-lg:0 40px 80px -24px rgba(112,48,239,.28);
          --radius:16px; --maxw:1140px;
          background: var(--bg); color: var(--ink); font-family: var(--sans); line-height: 1.6; font-size: 17px;
          -webkit-font-smoothing: antialiased;
        }
        :global(html.dark) .levanta {
          --bg:#0E0821; --surface:#160D2E; --surface-2:#1D1339; --ink:#F5F2FF; --ink-2:#B4ACCE; --ink-3:#837AA0;
          --line:rgba(255,255,255,.09); --line-2:rgba(255,255,255,.06); --violet:#9A6BFF; --violet-deep:#7C43F0;
          --violet-soft:rgba(122,60,239,.16); --violet-glow:rgba(122,60,239,.35); --coral:#FF8577; --coral-soft:rgba(255,111,97,.14);
          --good:#2CC6A6; --good-soft:rgba(18,163,134,.16);
          --shadow-sm:0 1px 2px rgba(0,0,0,.3); --shadow-md:0 12px 34px -14px rgba(0,0,0,.6); --shadow-lg:0 40px 90px -24px rgba(0,0,0,.7);
        }
        .levanta :global(h1), .levanta :global(h2), .levanta :global(h3) { text-wrap: balance; margin: 0; letter-spacing: -.02em; line-height: 1.05; }
        .levanta :global(p) { margin: 0; }
        .levanta :global(a) { color: inherit; text-decoration: none; }
        .lv-wrap { max-width: var(--maxw); margin: 0 auto; padding: 0 24px; }
        .lv-eyebrow { font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .16em; color: var(--violet); display: inline-flex; align-items: center; gap: 8px; }
        .lv-eyebrow::before { content:""; width: 22px; height: 1.5px; background: var(--violet); display: inline-block; }
        .lv-tnum { font-variant-numeric: tabular-nums; }

        .lv-nav { position: sticky; top: 0; z-index: 50; backdrop-filter: saturate(180%) blur(14px); background: color-mix(in srgb, var(--bg) 82%, transparent); border-bottom: 1px solid var(--line-2); }
        .lv-nav-inner { display: flex; align-items: center; justify-content: space-between; height: 66px; gap: 24px; }
        .lv-brand { display: flex; align-items: center; gap: 11px; }
        .lv-dot { width: 26px; height: 26px; border-radius: 8px; background: linear-gradient(135deg,var(--violet),var(--violet-deep)); box-shadow: 0 4px 12px var(--violet-glow); flex-shrink: 0; }
        .lv-name { display: flex; flex-direction: column; line-height: 1.05; }
        .lv-name b { font-weight: 800; letter-spacing: -.02em; font-size: 1.06rem; }
        .lv-by { font-size: .64rem; color: var(--ink-3); font-weight: 500; }
        .lv-nav-links { display: flex; gap: 30px; }
        .lv-nav-links a { font-size: .92rem; color: var(--ink-2); font-weight: 500; }
        .lv-nav-links a:hover { color: var(--ink); }
        .lv-nav-right { display: flex; align-items: center; gap: 12px; }
        .lv-theme-btn { width: 38px; height: 38px; border-radius: 10px; border: 1px solid var(--line); background: var(--surface); color: var(--ink-2); cursor: pointer; display: grid; place-items: center; }
        .lv-theme-btn:hover { color: var(--violet); }
        .lv-btn { display: inline-flex; align-items: center; gap: 8px; font-family: var(--sans); font-weight: 650; font-size: .93rem; padding: 11px 20px; border-radius: 11px; border: 1px solid transparent; cursor: pointer; transition: transform .15s, box-shadow .2s, background .2s; }
        .lv-btn-primary { background: linear-gradient(135deg,var(--violet),var(--violet-deep)); color: #fff; box-shadow: 0 8px 22px -6px var(--violet-glow); }
        .lv-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 14px 30px -8px var(--violet-glow); }
        .lv-btn-ghost { background: var(--surface); color: var(--ink); border-color: var(--line); }
        .lv-btn-ghost:hover { border-color: var(--violet); color: var(--violet); }
        .lv-btn-lg { padding: 15px 26px; font-size: 1rem; border-radius: 13px; }

        .lv-hero { position: relative; overflow: hidden; padding: 80px 0 90px; }
        .lv-hero::before { content:""; position: absolute; width: 620px; height: 620px; top: -180px; left: -160px; background: radial-gradient(circle, var(--violet-glow), transparent 70%); filter: blur(20px); pointer-events: none; }
        .lv-hero-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 56px; align-items: center; position: relative; }
        .lv-hero h1 { font-size: clamp(2.5rem, 5vw, 3.9rem); font-weight: 820; margin: 22px 0 20px; }
        .lv-hero h1 em { font-style: normal; color: var(--violet); }
        .lv-hero-sub { font-size: 1.12rem; color: var(--ink-2); max-width: 30em; margin-bottom: 30px; }
        .lv-hero-cta { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 26px; }
        .lv-trust { display: flex; align-items: center; gap: 8px; font-size: .86rem; color: var(--ink-3); flex-wrap: wrap; }
        .lv-trust b { color: var(--ink-2); font-weight: 650; }
        .lv-anim { opacity: 0; transform: translateY(14px); animation: lvRise .7s cubic-bezier(.2,.7,.3,1) forwards; }
        .lv-d1{animation-delay:.05s}.lv-d2{animation-delay:.13s}.lv-d3{animation-delay:.21s}.lv-d4{animation-delay:.29s}.lv-d5{animation-delay:.37s}
        @keyframes lvRise { to { opacity:1; transform: none; } }

        .lv-mock { background: var(--surface); border: 1px solid var(--line); border-radius: 18px; box-shadow: var(--shadow-lg); overflow: hidden; position: relative; }
        .lv-mock-bar { display: flex; align-items: center; gap: 7px; padding: 12px 16px; border-bottom: 1px solid var(--line-2); background: var(--surface-2); }
        .lv-d { width: 10px; height: 10px; border-radius: 50%; }
        .lv-mock-url { margin-left: 10px; font-family: var(--mono); font-size: .72rem; color: var(--ink-3); }
        .lv-mock-body { padding: 20px; display: grid; gap: 14px; }
        .lv-mock-h { display: flex; align-items: center; justify-content: space-between; }
        .lv-mock-t { font-weight: 750; font-size: .98rem; }
        .lv-pill { font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; padding: 4px 9px; border-radius: 999px; }
        .lv-pill-good { background: var(--good-soft); color: var(--good); }
        .lv-pill-violet { background: var(--violet-soft); color: var(--violet); }
        .lv-field { display: grid; gap: 5px; }
        .lv-field label { font-size: .72rem; color: var(--ink-3); font-weight: 600; text-transform: uppercase; letter-spacing: .06em; }
        .lv-val { background: var(--surface-2); border: 1px solid var(--line-2); border-radius: 9px; padding: 9px 12px; font-family: var(--mono); font-size: .82rem; color: var(--ink); display: flex; justify-content: space-between; }
        .lv-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .lv-doc { background: linear-gradient(180deg,var(--violet-soft),transparent); border: 1px solid var(--line); border-radius: 11px; padding: 14px; font-family: var(--mono); font-size: .74rem; color: var(--ink-2); line-height: 1.7; }
        .lv-doc .lv-k, .lv-mv-doc .lv-k { color: var(--violet); font-weight: 700; }
        .lv-float-badge { position: absolute; bottom: -18px; right: -14px; background: var(--surface); border: 1px solid var(--line); border-radius: 13px; box-shadow: var(--shadow-md); padding: 11px 15px; display: flex; align-items: center; gap: 10px; }
        .lv-fb-ic { width: 30px; height: 30px; border-radius: 8px; background: var(--good-soft); color: var(--good); display: grid; place-items: center; font-weight: 800; }
        .lv-fb-lab { font-size: .72rem; color: var(--ink-3); }
        .lv-fb-num { font-weight: 800; font-size: .92rem; }

        .lv-band { padding: 88px 0; }
        .lv-sec-head { max-width: 46rem; margin-bottom: 48px; }
        .lv-sec-head h2 { font-size: clamp(1.9rem, 3.4vw, 2.8rem); font-weight: 800; margin: 16px 0 14px; }
        .lv-sec-head p { font-size: 1.1rem; color: var(--ink-2); }

        .lv-villain-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .lv-villain { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 26px; transition: transform .18s, box-shadow .2s, border-color .2s; }
        .lv-villain:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: color-mix(in srgb, var(--violet) 30%, var(--line)); }
        .lv-villain .lv-ic { width: 46px; height: 46px; border-radius: 12px; display: grid; place-items: center; font-size: 1.4rem; margin-bottom: 16px; background: var(--violet-soft); }
        .lv-villain.lv-danger .lv-ic { background: var(--coral-soft); }
        .lv-villain h3 { font-size: 1.12rem; font-weight: 750; margin-bottom: 10px; line-height: 1.25; }
        .lv-villain p { font-size: .95rem; color: var(--ink-2); }
        .lv-villain .lv-tag { font-size: .7rem; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: var(--coral); margin-top: 14px; display: inline-block; }
        .lv-villain.lv-v-violet .lv-tag { color: var(--violet); }

        .lv-magnets { background: var(--surface-2); }
        .lv-magnet-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; }
        .lv-magnet { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; display: flex; flex-direction: column; transition: transform .18s, box-shadow .2s; color: inherit; }
        .lv-magnet:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }
        .lv-magnet-vis { height: 148px; padding: 18px; background: linear-gradient(150deg, var(--violet-soft), transparent); border-bottom: 1px solid var(--line-2); position: relative; overflow: hidden; }
        .lv-magnet-body { padding: 22px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .lv-top { display: flex; align-items: center; justify-content: space-between; }
        .lv-magnet-body h3 { font-size: 1.1rem; font-weight: 750; }
        .lv-magnet-body p { font-size: .92rem; color: var(--ink-2); flex: 1; }
        .lv-go { font-size: .88rem; font-weight: 650; color: var(--violet); display: inline-flex; align-items: center; gap: 6px; margin-top: 4px; }
        .lv-mv-bar { position: absolute; bottom: 18px; left: 18px; right: 18px; display: flex; gap: 6px; align-items: flex-end; height: 74px; }
        .lv-mv-bar span { flex: 1; background: linear-gradient(180deg,var(--violet),var(--violet-deep)); border-radius: 5px 5px 0 0; opacity: .85; }
        .lv-mv-check { display: grid; gap: 8px; margin-top: 4px; }
        .lv-mv-check div { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: .72rem; color: var(--ink-2); }
        .lv-box { width: 15px; height: 15px; border-radius: 4px; border: 1.5px solid var(--violet); display: grid; place-items: center; color: #fff; font-size: .6rem; }
        .lv-box.lv-on { background: var(--violet); }
        .lv-mv-doc { font-family: var(--mono); font-size: .7rem; line-height: 1.9; color: var(--ink-2); }

        .lv-vehic-intro { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 30px; }
        .lv-vehic-pill { background: var(--surface); border: 1px solid var(--line); border-radius: 13px; padding: 16px 18px; }
        .lv-vp-k { font-weight: 750; font-size: .96rem; margin-bottom: 3px; }
        .lv-vp-v { font-size: .82rem; color: var(--ink-2); }
        .lv-vehic-table-wrap { overflow-x: auto; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); box-shadow: var(--shadow-sm); -webkit-overflow-scrolling: touch; }
        .lv-vehic-table { width: 100%; border-collapse: collapse; min-width: 680px; }
        .lv-vehic-table th, .lv-vehic-table td { text-align: left; padding: 15px 20px; border-bottom: 1px solid var(--line-2); font-size: .92rem; vertical-align: middle; }
        .lv-vehic-table thead th { font-size: .7rem; text-transform: uppercase; letter-spacing: .08em; color: var(--ink-3); font-weight: 700; background: var(--surface-2); }
        .lv-vehic-table tbody tr:last-child td { border-bottom: 0; }
        .lv-vehic-table tbody tr:hover { background: var(--surface-2); }
        .lv-vehic-table tbody tr.lv-hl { background: var(--violet-soft); }
        .lv-vehic-table tbody tr.lv-hl:hover { background: var(--violet-soft); }
        .lv-inst { font-weight: 750; color: var(--ink); }
        .lv-inst small { display: block; font-weight: 500; color: var(--ink-3); font-size: .77rem; margin-top: 2px; }
        .lv-when { color: var(--ink-2); }
        .lv-badge { display: inline-flex; padding: 3px 10px; border-radius: 999px; font-size: .72rem; font-weight: 700; white-space: nowrap; }
        .lv-badge-di { background: var(--coral-soft); color: var(--coral); }
        .lv-badge-no { background: var(--good-soft); color: var(--good); }
        .lv-badge-def { background: var(--violet-soft); color: var(--violet); }
        .lv-badge-var { background: var(--surface-2); color: var(--ink-2); border: 1px solid var(--line); }
        .lv-vehic-cta { margin-top: 22px; display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }

        .lv-steps { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
        .lv-step { display: flex; gap: 18px; padding: 22px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); align-items: flex-start; transition: border-color .2s, transform .18s; }
        .lv-step:hover { border-color: color-mix(in srgb,var(--violet) 35%,var(--line)); transform: translateX(3px); }
        .lv-n { flex-shrink: 0; width: 40px; height: 40px; border-radius: 11px; display: grid; place-items: center; font-weight: 800; font-family: var(--mono); background: var(--violet-soft); color: var(--violet); font-size: .95rem; }
        .lv-step h3 { font-size: 1.04rem; font-weight: 720; margin-bottom: 5px; }
        .lv-step p { font-size: .92rem; color: var(--ink-2); }
        .lv-free { font-size: .66rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--good); margin-left: 8px; }
        .lv-paid { font-size: .66rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--violet); margin-left: 8px; }

        .lv-services { background: var(--surface-2); }
        .lv-contacto { background: var(--surface-2); }
        .lv-svc-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .lv-svc { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 26px; }
        .lv-svc-ic { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg,var(--violet),var(--violet-deep)); display: grid; place-items: center; margin-bottom: 16px; color: #fff; box-shadow: 0 8px 20px -8px var(--violet-glow); }
        .lv-svc h3 { font-size: 1.1rem; font-weight: 750; margin-bottom: 8px; }
        .lv-svc p { font-size: .93rem; color: var(--ink-2); }

        .lv-behind-card { display: grid; grid-template-columns: auto 1fr auto; gap: 28px; align-items: center; background: var(--surface); border: 1px solid var(--line); border-radius: 20px; padding: 30px 34px; box-shadow: var(--shadow-sm); }
        .lv-behind-ava { width: 68px; height: 68px; border-radius: 18px; background: linear-gradient(135deg,var(--violet),var(--violet-deep)); display: grid; place-items: center; color: #fff; font-weight: 800; font-size: 1.5rem; box-shadow: 0 10px 24px -8px var(--violet-glow); }
        .lv-behind-lab { font-size: .7rem; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: var(--violet); margin-bottom: 6px; }
        .lv-behind-txt h3 { font-size: 1.2rem; font-weight: 780; margin-bottom: 6px; }
        .lv-behind-txt p { font-size: .95rem; color: var(--ink-2); max-width: 44em; }
        .lv-behind-stats { display: flex; gap: 26px; text-align: right; }
        .lv-bs-n { font-size: 1.35rem; font-weight: 820; letter-spacing: -.02em; color: var(--violet); }
        .lv-bs-l { font-size: .72rem; color: var(--ink-3); }

        .lv-cta { text-align: center; padding: 88px 0; position: relative; overflow: hidden; background: linear-gradient(135deg, var(--violet), var(--violet-deep)); color: #fff; }
        .lv-cta::before { content:""; position: absolute; inset: 0; background: radial-gradient(circle at 30% 20%, rgba(255,255,255,.15), transparent 55%); }
        .lv-cta h2 { font-size: clamp(1.9rem,3.4vw,2.7rem); font-weight: 820; margin-bottom: 14px; position: relative; }
        .lv-cta p { font-size: 1.12rem; opacity: .92; max-width: 34em; margin: 0 auto 30px; position: relative; }
        .lv-cta .lv-btn-primary { background: #fff; color: var(--violet-deep); box-shadow: 0 14px 40px -10px rgba(0,0,0,.4); position: relative; }
        .lv-cta .lv-btn-primary:hover { background: #fff; }
        .lv-disc { font-size: .82rem; opacity: .8; margin-top: 18px; position: relative; }

        .lv-footer { padding: 46px 0; border-top: 1px solid var(--line-2); }
        .lv-foot-inner { display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
        .lv-foot-brand { display: flex; align-items: center; gap: 10px; }
        .lv-foot-brand b { font-weight: 800; }
        .lv-foot-brand span { font-size: .82rem; color: var(--ink-3); }
        .lv-foot-links { display: flex; gap: 22px; font-size: .88rem; }
        .lv-foot-links a { color: var(--ink-2); }
        .lv-foot-links a:hover { color: var(--violet); }

        @media (max-width: 920px) {
          .lv-hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .lv-mock-wrap { max-width: 460px; }
          .lv-villain-grid, .lv-magnet-grid, .lv-svc-grid, .lv-steps { grid-template-columns: 1fr; }
          .lv-vehic-intro { grid-template-columns: 1fr 1fr; }
          .lv-behind-card { grid-template-columns: 1fr; text-align: center; justify-items: center; gap: 20px; }
          .lv-behind-txt p { margin: 0 auto; }
          .lv-behind-stats { justify-content: center; text-align: center; }
          .lv-nav-links { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lv-anim { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  )
}
