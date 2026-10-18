# SAVE — Levanta (saulgonzalez.pro) · dónde quedamos

> Última sesión: **17 jul 2026**. Para retomar: lee esto + `PLAN_REPOSICIONAMIENTO_CAPITAL.md`.
> Repo real: `~/Desktop/Desktop - Saul's MacBook Pro/Projects/saulgonzalez-site/` (symlink `/tmp/sg-site`).

## Estado: MVP funcional, desplegado en PREVIEW (falta prod)

**Preview en vivo:** https://saulgonzalez-site-ccqbhq38m-example-pages-projects.vercel.app
**Producción (saulgonzalez.pro):** NO actualizada todavía — pendiente `vercel --prod`.

## Qué se hizo (reposicionamiento a "Levanta" — plataforma de capital)

- **Homepage** reescrito (`components/HomePage.tsx`): hero capital, villanos, herramientas, tabla de vehículos (alternativas al SAFE), proceso 6 pasos, asesoría, "quién está detrás", **formulario de contacto `#contacto`**, CTA. Estilo Carta + violeta #7030EF, styled-jsx `lv-`, tema vía next-themes.
- **8 herramientas de capital** (en `app/tools/*` + `components/*`), todas gamificadas con **mascota Lottie de Google que reacciona + confetti**:
  1. `generador-safe` — SAFE completo (Word/PDF, plantilla YC) + 9 cláusulas opcionales con alertas + party/confetti al descargar
  2. `generador-nota-convertible` — nota convertible + party/confetti al descargar
  3. `checklist-dataroom` — checklist interactivo + 🎉 al 100% + export gateado
  4. `calculadora-dilucion` — 😎 sana / 💀 te diluyes demasiado
  5. `calculadora-safe` — reacción al cap/ownership
  6. `simulador-cap-table` — 😎 mandando / 💀 diluido
  7. `calculadora-runway` — 🤑 flujo positivo / 🔥 se acaba la caja
  8. `red-flags-term-sheet` — 💀 calavera + X roja / 😎 limpio + confetti
- **8 tools de SEO viejos ELIMINADOS** (páginas + rutas API).
- **SEO global reescrito** hacia capital: `app/layout.tsx` (title/desc/keywords/OG/twitter), `app/sitemap.ts`, `public/llms.txt`.

## Lead plumbing (TODO conecta a Puny.bz)

- `/api/contact` → **Google Sheets + Google Chat de Puny.bz** (env en Vercel: GOOGLE_SHEET_ID, GOOGLE_CHAT_WEBHOOK_URL, GOOGLE_SERVICE_ACCOUNT_JSON). Confirmado funcionando.
- **Formulario homepage `#contacto`** (`components/ContactForm.tsx`) → /api/contact, confetti al enviar.
- Las 4 calculadoras + generadores + red-flags capturan email vía `components/tools/LeadCTA.tsx` → /api/contact + CTA a `/#contacto`.
- TODOS los CTAs de consulta (tools, footer ToolLayout, blog, hub) → `/#contacto`.

## Componentes/infra nuevos

- `components/tools/Mascot.tsx` — Lottie por nombre (champ/ok/worried/skull/party/starstruck/rocket/fire/thinking/crying/money), con pop-in.
- `components/tools/LeadCTA.tsx` — mascota+confetti+captura email→/api/contact+CTA consulta (`hideMascot`, `burstConfetti()`).
- `components/ContactForm.tsx` — form del homepage.
- `public/lottie/*.json` — 11 emojis animados de Google (fonts.gstatic.com).
- Deps nuevas: `lottie-react`, `canvas-confetti`.

## Estado técnico

- `npm run build` → **OK, 0 errores**. Verificado en navegador (local + preview Vercel).
- Cambios **sin commitear** en `main` (deploy es vía vercel CLI, no git). Los archivos persisten en disco.
- CLI de Vercel autenticado (saul-6081 / saul).

## PENDIENTES (retomar aquí mañana)

1. **`vercel --prod`** para pasar el preview a saulgonzalez.pro en vivo (esperar OK de Saúl).
2. Antes de prod, revisar: `lib/jsonld.ts` (JSON-LD del homepage sigue era-consultor Person/Service — Google lo lee) y `/en` (hoy = español, falta espejo inglés real).
3. Confirmar **nombre** definitivo (hoy "Levanta" = nombre de trabajo; alt: Ronda/Capitaliza/Cierra) → find-replace.
4. Al final: logos reales (Saúl los provee) + **Stripe** (Saúl da acceso) para la capa de pago (dataroom completo, shareholder/founders agreement, incorporación, asesoría).
5. Fases siguientes del plan: subpáginas pilares `/capital/*`, blog (serie de capital), distribución/LinkedIn.

## Cómo levantar el proyecto

```
cd /tmp/sg-site   # o la ruta real del Desktop
npm run dev       # → localhost:3000
npm run build     # verificar
vercel            # preview
vercel --prod     # producción (saulgonzalez.pro)
```
