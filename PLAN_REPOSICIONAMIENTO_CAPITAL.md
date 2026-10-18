# Plan de Trabajo — Plataforma "Levanta" (capital para founders)

> **v3 · 14 jul 2026** · Autor: Claude Opus 4.8 · Para: Saúl A. González
> Vive en `saulgonzalez.pro`, pero es una **plataforma-producto agnóstica** ("Levanta",
> nombre de trabajo). Saúl aparece como **creador/proponente en la esquina**, no como protagonista.
>
> **Cambio v3 (14 jul):** posicionamiento **GENERAL**, no atado a Puerto Rico. Se removió todo
> lo PR-específico (Act 60, VCAP, Parallel18, "boricua", gobierno de PR) del sitio y de la
> estrategia. El nicho es el **founder de habla hispana** (LatAm, España, US-hispano). El
> diferenciador ya no es "Act 60/diáspora" sino **la capa funcional en español que no existe**.
>
> **Decisiones vigentes:**
> - Reposicionar el homepage hacia capital. Sin bloque de dev consulting. Sin franja de logos.
> - Objetivo: **Autoridad + Herramientas gratis**, con monetización freemium.
> - Nicho: **founder de habla hispana, todo en español**.
> - **Freemium:** generador de SAFE + checklist de dataroom = **GRATIS**. El resto (dataroom
>   pack completo, shareholder agreement, founders agreement, incorporación, asesoría 1:1) = **PAGO**.
> - **MVP:** homepage + hub `/capital` guiado. Prioridad: **lead magnets primero**.

---

## 0. La tesis (el ángulo que distingue)

En el mundo hispano falta **capital inteligente**: mucho inversor no conoce los instrumentos
(SAFE, notas convertibles, sindicatos, VC), se ofrecen términos predatorios (ej. 60% equity por
$70K), y no existe educación *funcional* en español — solo artículos que explican, nada que
*haga*.

**Posicionamiento (una frase):**
> *"No te falta capital. Te falta estructura, el vehículo correcto y saber a quién pedirle —
> y con qué términos. Herramientas que lo hacen por ti, en español."*

**Credibilidad:** el creador **levantó $150K con un SAFE** (cerrado) y hoy **levanta una ronda
pre-seed de $1.2M por equity** ($260K ARR en su startup) — no es teoría, es lo que vive.

**Diferenciador:** **la capa funcional en español que nadie tiene** — generadores y calculadoras
(SAFE, dilución, dataroom) que solo existen en inglés. Explicar está saturado; *hacer*, no.

---

## 1. Concepto de producto: "Capital, de la mano"

Flujo guiado por pasos. El founder entra sin saber nada y sale con instrumento elegido,
documentos generados y dataroom armado. Cada paso educa + entrega algo funcional.

```
Paso 1 · ¿En qué etapa estás?          idea / pre-seed / levantando / con términos en mano
Paso 2 · ¿Qué instrumento te conviene?   SAFE · nota convertible · KISS · priced · no-dilutivo · diáspora
Paso 3 · Genera tu SAFE                 template descargable  o  formulario → SAFE completo  [GRATIS]
Paso 4 · Arma tu dataroom               qué es · qué debe llevar · checklist [GRATIS] · generador [PAGO]
Paso 5 · Incorpórate y protégete        Delaware C-Corp · founders/shareholder agreement · vesting  [PAGO]
Paso 6 · ¿Te acompaño de verdad?        asesoría 1:1 paga
```

---

## 2. Arquitectura de información (destino)

```
saulgonzalez.pro
 ├─ /                       HERO reescrito: capital como tema central (plataforma agnóstica)
 ├─ /en                     espejo inglés (mercado general + capital de diáspora)
 ├─ /capital                HUB GUIADO — el flujo de 6 pasos. Cornerstone SEO/GEO.
 │   ├─ /capital/safe             Qué es un SAFE, qué conlleva (cap/discount/MFN/post-money),
 │   │                            cuándo usarlo. → generador de SAFE [GRATIS]
 │   ├─ /capital/vehiculos        SAFE vs nota convertible vs KISS vs priced vs revenue-based
 │   │                            vs no-dilutivo vs diáspora. Comparación + recomendación.
 │   ├─ /capital/dataroom         Qué es · qué DEBE contener · checklist [GRATIS] ·
 │   │                            generador de documentos del dataroom [PAGO]
 │   ├─ /capital/incorporacion    Dónde incorporarte (Delaware C-Corp vs. entidad local y por qué) ·
 │   │                            Founders Agreement · Shareholder Agreement · IP assignment ·
 │   │                            vesting/cliff · 83(b). Templates + generador [PAGO]
 │   └─ /capital/no-dilutivo       Grants: SBIR/NSF, federales, aceleradoras (con deadlines)
 ├─ /tools                  se quedan los de SEO + nuevos de capital:
 │   ├─ /tools/generador-safe        [GRATIS]  formulario → SAFE (base template YC)
 │   ├─ /tools/checklist-dataroom    [GRATIS]  interactivo, marca ítems, exporta resumen
 │   ├─ /tools/calculadora-dilucion  [GRATIS]  monto + valuación → % y cap table después
 │   └─ /tools/calculadora-safe      [GRATIS]  cap + discount → precio de conversión
 └─ /blog                   serie de capital (ancla = artículo adaptado a mensaje general)
```

---

## 3. Modelo freemium (confirmado)

| GRATIS (gancho + lead capture) | PAGO |
|---|---|
| Generador de SAFE (formulario → doc) | Dataroom **pack completo** (generador de todos los docs) |
| Checklist de dataroom | **Shareholder Agreement** |
| Calculadora de dilución | **Founders Agreement** |
| Calculadora de SAFE | **Paquete de incorporación** (Delaware C-Corp asistido) |
| Contenido/guías de `/capital` | **Asesoría 1:1** ("orientación 30 min" + armado hecho por Saúl) |

Los gratis capturan lead (email) antes de descargar. Los de pago → checkout / lead cualificado.
*(Precios y Stripe: al final, Saúl da acceso — ver §7.)*

---

## 4. ⚠️ Enfoque legal (obligatorio, protege a Saúl)

Generar SAFEs / shareholder / founders agreements puede verse como práctica de derecho. Se maneja
como **Clerky, Stripe Atlas y YC**:
- Usar **templates estándar públicos** (el SAFE post-money de YC es gratis y estándar),
  **rellenando variables** — nunca redactar derecho a medida.
- **Disclaimer** visible en cada generador y en `/capital`: *"Herramienta educativa, no consejo
  legal ni de inversión. Revisa con un abogado antes de firmar."*

---

## 5. Marca, logos, byline

- Marca del producto: **"Levanta"** (nombre de trabajo). Saúl = **byline en la esquina**
  ("por Saúl A. González") + tarjeta discreta "Quién está detrás".
- **Franja de logos ELIMINADA** (decisión 14 jul: plataforma general, no vitrina de credenciales
  personales). Si se reintroduce algún día, con logos neutrales/de partners reales.

---

## 6. Fases de trabajo — **LEAD MAGNETS PRIMERO**

Cada lead magnet = página `/tools/*` autónoma, gateada por email (reusa lead capture existente:
`/api/contact` → Google Sheets + Google Chat), promocionable en LinkedIn de una.

### LEAD MAGNET #1 ⚡ — **Generador de SAFE**  *(recomendado primero)*
Formulario (empresa, monto, cap, discount, MFN) → SAFE relleno sobre template YC, descargable
(PDF + DOCX). Lead capture. Disclaimer. ~1–1.5 días.

### LEAD MAGNET #2 — **Checklist de dataroom**
Interactivo, marca ítems, exporta resumen. Gancho + demo del servicio. ~medio día.

### LEAD MAGNETS #3–4 — Calculadora de dilución + Calculadora de SAFE
Refuerzan autoridad; casi no existen en español. ~medio día c/u.

### FASE A — Homepage reescrito  *(Opus 4.8)*
Copy general aprobado (hero capital, 3 villanos, servicios de asesoría, tarjeta "quién está
detrás", proceso de 6 pasos, tabla de vehículos "Alternativas al SAFE"). ES + espejo EN.

### FASE B — Hub `/capital` guiado  *(Opus copy · Sonnet layout)*
Los 6 pasos en una página larga indexable. Cornerstone SEO. Disclaimer legal.

### FASE C — Subpáginas pilares
`/capital/{safe,vehiculos,dataroom,incorporacion,no-dilutivo}`. Cada una con `layout.tsx` propio
(title/OG/BreadcrumbList schema, patrón de `app/tools/*`).

### FASE D — Capa PAGO / monetización
Dataroom pack, Shareholder/Founders Agreement, incorporación, asesoría. Precios + Stripe (al final).

### FASE E — Contenido / blog
Serie general 1/semana: SAFE para el founder hispano · nota convertible vs SAFE · capital
no-dilutivo · capital de diáspora · cómo armar un dataroom que cierra. Cada post → su generador.

### FASE F — SEO / GEO
`lib/jsonld.ts`: Person `knowsAbout` (venture capital, SAFE, cap tables, non-dilutive). Keywords:
"cómo levantar capital startup", "SAFE explicado español", "generador SAFE", "SAFE vs nota
convertible", "data room qué debe contener", "calculadora dilución", "cláusulas predatorias term
sheet". `sitemap.ts` + `llms.txt` + IndexNow. Malla de enlaces internos.

### FASE G — Distribución  *(manual, Saúl)*
LinkedIn: publicar la serie + herramientas. Backlink desde perfiles. GSC/Bing re-index.

---

## 7. Asignación de modelos

| Trabajo | Modelo |
|---|---|
| Estrategia, hero, copy de villanos, páginas pilares, post ancla, precios | **Opus 4.8** |
| Layouts, componentes repetidos, boilerplate de generadores, meta/schema | **Sonnet** |
| Traducciones EN, CSS, sitemap/llms.txt, posts derivados | **Haiku / Sonnet** |

---

## 8. Orden y esfuerzo
1. **Lead magnet #1** (Generador de SAFE) — ~1–1.5 días. **Empezar aquí.**
2. **Lead magnet #2** (Checklist de dataroom) — ~medio día.
3. **Lead magnets #3–4** (calculadoras) — ~medio día c/u.
4. **Fase A** homepage → **Fase B** hub `/capital` = **MVP visible**.
5. **Fase C** pilares · **Fase D** pago (Stripe al final) · **Fases E–F** contenido+SEO · **Fase G** distribución.

---

## 9. Pendientes / decisiones abiertas
- [ ] Confirmar **nombre** de la plataforma (Levanta / Ronda / Capitaliza / Cierra / otro).
- [ ] **Formato de descarga del SAFE** (recomendado: PDF + DOCX).
- [ ] **Precios** de la capa de pago (Fase D).
- [ ] **Stripe:** Saúl da acceso al final para el checkout.
- [ ] Portar el homepage aprobado a `HomePage.tsx` → preview de Vercel.

---

## 10. Cards de Kanban relacionadas
- "Cambiar página Web de Saul Gonzalez" → este plan.
- "Llenar documentos en website para investment" → lead magnets + dataroom + docs de pago.
