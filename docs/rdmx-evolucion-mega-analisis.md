# RDM·X — Mega análisis técnico–estratégico para su evolución

## 0) Resumen ejecutivo

RDM·X ya tiene una base frontend sólida para narrativa turística (múltiples páginas, navegación por secciones, catálogo, comunidad y un primer Realito visual). El salto crítico ahora no es “más UI”, sino **pasar de experiencia estática a plataforma operacional** con 4 pilares:

1. **Sistema visual soberano** (`Silver & Mist`) con estado dinámico por hora y clima.
2. **Backend productivo real** (auth, comercios, donativos, paneles y métricas).
3. **Motor de recomendación Realito v1** conectado a datos y eventos.
4. **Gobernanza de producto** (KPIs, seguridad, observabilidad, roadmap por entregables).

Este documento propone una hoja de ejecución pragmática y acoplada al stack actual (**React + Vite + TS + Tailwind + Node/Prisma planificado**) sin reescribir desde cero.

---

## 1) Diagnóstico del estado actual (repo)

### 1.1 Fortalezas ya existentes

- **Arquitectura frontend modular**: rutas lazy para páginas principales, React Query base, shell con router listo para escalar.【F:src/App.tsx†L1-L60】
- **Cobertura narrativa turística amplia**: páginas para Historia, Cultura, Arte, Gastronomía, Ecoturismo, Rutas, Dichos, Eventos, Comunidad, Catálogo, etc., ya cableadas por rutas públicas.【F:src/App.tsx†L8-L55】
- **Identidad visual avanzada ya iniciada**: tokens y utilidades glass/glow, tipografías y capas de diseño premium que facilitan migrar a `Silver & Mist` sin ruptura visual completa.【F:src/index.css†L6-L176】
- **NavBar con IA y registro comercial en UX**: ya existe “Registrar Negocio” y estructura de secciones para crecimiento de features B2B/B2C.【F:src/components/NavBar.tsx†L60-L132】
- **Realito en UI**: orbe flotante + panel de conversación para prototipar transición hacia chat real con backend IA.【F:src/components/RealitoOrb.tsx†L1-L148】

### 1.2 Brechas principales

- **No hay backend conectado en este repo**: la app actual es frontend; faltan entidades persistentes para auth, negocios, donativos, interacciones.
- **Tema horario/clima no está modelado globalmente**: hay tokens, pero no `timeTheme`/`visualState` orquestado de forma sistémica.
- **Realito aún es simulado**: respuestas placeholder, sin ranking de recomendaciones ni trazabilidad.
- **Oferta comercial y analítica no existen como producto**: falta `/comercios/panel`, promoción inteligente privada y KPI data model.

---

## 2) Norte de producto (RDM·X 0.9 → 2.0)

### Objetivo macro
Transformar RDM·X en una plataforma turístico-informativa viva: experiencia pública inmersiva + operación privada para comercios + inteligencia contextual (clima/hora/IA) + base multi-destino.

### Principios de implementación

- **No romper lo existente**: evolución por capas incrementales.
- **Privado vs público claro**: “promoción/planes” solo en zona autenticada.
- **Trazabilidad por eventos**: cada acción relevante produce eventos analíticos.
- **Primero datos, luego IA sofisticada**: sin telemetría fiable, no hay “Realito premium” sostenible.

---

## 3) Fase 0.9 — Cierre frontend + Silver & Mist (2–3 semanas)

### 3.1 Entregables obligatorios

- **Diseño tokens unificados**: migrar variables visuales a paleta plata/obsidiana/cristal y retirar dorados dominantes.
- **`timeTheme` global** (`day/evening/night`) con resolución cada 5 min.
- **“Gota de Mercurio”** global en Navbar + Footer + página/flujo donativo.
- **Normalización de copy y consistencia editorial** en las páginas públicas.
- **Depuración pública de lenguaje comercial sensible** (ocultar “federados” al público).

### 3.2 Criterios de aceptación

- 100% de páginas públicas renderizan correctamente en mobile/tablet/desktop.
- El fondo global cambia por horario sin saltos visuales bruscos.
- El botón de donativo está visible en todas las rutas públicas.
- Lighthouse accesibilidad >= 90 en Home y 3 páginas de alto tráfico.

### 3.3 Riesgos y mitigación

- **Riesgo**: inconsistencia visual por mezcla de tokens históricos.
- **Mitigación**: tabla de equivalencias token viejo → token nuevo y refactor progresivo por componente.

---

## 4) Fase 1.0 — Backend real + auth + comercios + donativos (4–6 semanas)

### 4.1 Arquitectura mínima recomendada

- **Backend Node/Express + Prisma + PostgreSQL**.
- Módulos iniciales:
  - `auth`
  - `businesses`
  - `events`
  - `routes/destinations`
  - `donations`
  - `interactions`
- Seguridad:
  - JWT de corta duración + refresh token.
  - Rate limit por IP/email en login/register.
  - Validación con Zod (request contracts).

### 4.2 Modelo de datos inicial

Mantener como núcleo:
- `User` (roles `visitor|merchant|admin`)
- `Business`
- `Event`
- `Route`
- `Destination`
- `Donation`
- `Interaction`

### 4.3 Flujos críticos

1. **Registro de comerciante**: CTA → auth → alta negocio → panel privado.
2. **Donativo**: botón global → modal/monto → checkout → webhook → persistencia.
3. **Catálogo público**: consulta de negocios activos con filtros por categoría/zona.

### 4.4 KPIs fase 1.0

- Tasa conversión “Registrar negocio” > 5% de sesiones en Catálogo.
- 95% de checkouts exitosos medidos por webhook.
- p95 API pública < 350ms en `/businesses` y `/events`.

---

## 5) Fase 1.1 — Panel de Promoción Inteligente (privado)

### 5.1 Decisiones de producto

- Rebranding interno de publicidad hacia **visibilidad recomendada**.
- Educación del comerciante: “cómo funciona la recomendación”, no caja negra opaca.
- Diferenciación de planes por **presencia contextual**, no por “spam visual”.

### 5.2 Componentes del módulo privado

- `Resumen de visibilidad`
- `Recomendaciones recibidas`
- `Posicionamiento por categorías`
- `FAQ de ranking y transparencia`

### 5.3 Métricas mínimas mostrables

- impresiones en resultados de Realito
- clics a ficha
- clics “cómo llegar”
- guardados en planes de viaje

---

## 6) Fase 1.2 — Clima + fondos dinámicos (2–3 semanas)

### 6.1 Diseño técnico

- Backend expone `/api/weather/mineral-del-monte` con caché 5–10 min.
- Frontend transforma `condition + timeTheme => visualState`.
- Mapeo de `visualState` a:
  - fondo global
  - intensidad de glass/reflejos
  - hero contextual “Así se ve hoy”.

### 6.2 Matriz visual recomendada

- `clear_day`, `clear_evening`, `clear_night`
- `cloudy_day`, `cloudy_evening`, `cloudy_night`
- `rain_day`, `rain_evening`, `rain_night`

### 6.3 Reglas UX

- transición visual 500–900ms (sin flicker)
- fallback local por horario si API clima falla
- modo accesible: reducir animaciones cuando `prefers-reduced-motion`

---

## 7) Fase 1.3 — Realito AI v1 (3–5 semanas)

### 7.1 Arquitectura funcional

- `/api/recommendations`: ranking inicial por intención + categoría + plan + cercanía.
- `/api/ai/realito`: orquesta respuesta conversacional + invoca recomendaciones.
- Persistencia en `Interaction` para trazabilidad y panel.

### 7.2 Estrategia de ranking (v1)

`score = w1*relevancia_intencion + w2*cercania + w3*calidad_ficha + w4*plan`

Donde:
- `plan` existe pero no domina por completo la relevancia.
- `calidad_ficha` evita premiar fichas incompletas.

### 7.3 Guardrails de producto

- Realito debe **explicar por qué recomienda** (“cerca de ti”, “abierto ahora”, “ruta gastronómica”).
- Registro de cada recomendación mostrada/clicada para auditoría interna.

---

## 8) Fase 1.4–1.5 — Experiencia inmersiva avanzada

### 8.1 “Eco de Plata” (mitos y leyendas)

- Evento ocasional, max 1 vez por sesión.
- Respeta `prefers-reduced-motion` y control de audio del usuario.
- Debe ser “atmósfera narrativa”, no jump-scare.

### 8.2 Chat premium

- Panel de 3 columnas (contexto, conversación, exploración).
- Acciones estructuradas: guardar plan, ver mapa, compartir.
- Estado de “pensamiento” del orbe conectado a requests reales.

---

## 9) Fase 2.0 — Escalado, analítica y multi-destino

### 9.1 Analítica comerciante

- Embudo: impresión → clic ficha → clic cómo llegar → acción de contacto.
- Cortes temporales semanal/mensual.

### 9.2 Analítica operador

- negocios activos
- donativos
- uso de Realito por intención
- rutas/temas más consultados

### 9.3 Diseño multi-tenant (multi-destino)

Añadir `Destination` como entidad transversal:
- branding/paleta
- clima base y assets
- catálogo y rutas por destino
- feature flags por municipio

---

## 10) Backlog técnico priorizado (orden de ejecución real)

1. **Foundation**: tema Silver & Mist + `VisualContext` + botón donativo global.
2. **Core backend**: auth + business CRUD + catálogo público.
3. **Payments**: checkout + webhook + registro `Donation`.
4. **Weather**: endpoint + cache + integración frontend.
5. **Realito v1**: recommendations endpoint + chat orchestration.
6. **Merchant panel**: métricas base + promoción inteligente.
7. **Admin analytics**: dashboards operador.
8. **Multi-destination**: tenantización progresiva.

---

## 11) Gobierno de calidad (Definition of Done por fase)

Cada fase se considera cerrada solo si cumple:

- **Código**: lint y test passing.
- **Producto**: criterios UX definidos y validados en responsive.
- **Datos**: eventos analíticos mínimos emitidos.
- **Operación**: logs estructurados, manejo de errores y healthchecks.
- **Seguridad**: validación de inputs y control básico de abuso.

---

## 12) Recomendaciones inmediatas para este repo

1. **Crear carpeta `docs/` como fuente de verdad de roadmap técnico** (este documento).
2. **Agregar mapa de rutas públicas/privadas** antes de implementar backend para evitar deuda de navegación.
3. **Definir contrato de APIs en OpenAPI temprano** para desacoplar frontend/backend desde fase 1.0.
4. **Implementar feature flags** para activar clima, Realito y panel sin bloquear releases.
5. **Establecer tablero de KPIs de producto** desde el día 1 del backend (aunque sea simple).

---

## 13) Conclusión

RDM·X tiene una base narrativa y visual muy fuerte; su evolución depende de ejecutar con disciplina la transición a plataforma operativa. Si se respeta el orden de fases (0.9 → 1.0 → 1.3) y se instrumenta telemetría desde el inicio, el proyecto puede convertirse en un caso de referencia de turismo inteligente soberano para Real del Monte y un blueprint replicable multi-destino.
