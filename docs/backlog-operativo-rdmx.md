# Backlog operativo RDM·X (conceptual → ejecución)

## Estado base levantado desde documentos

Fuentes consolidadas:
- `docs/rdmx-evolucion-mega-analisis.md`
- `docs/integracion-gemelos-digitales-rdmx.md`

## Épicas y tasks técnicas

### EPIC A — Foundation visual y shell UX (L6)
- [x] Tokenización visual Silver & Mist base.
- [ ] Gota de Mercurio global en navbar/footer/rutas clave.
- [ ] Auditoría de accesibilidad (Lighthouse >= 90 en Home + 3 vistas).
- [ ] Homologación editorial pública (sin lenguaje comercial sensible).

### EPIC B — Backend core operativo (L5)
- [x] Auth básico (`/api/auth/register`, `/api/auth/login`).
- [x] CRUD mínimo de comercios (listado + alta + negocio propio).
- [x] Clima con cache (`/api/weather/mineral-del-monte`).
- [x] Endpoints de contenido vivo (`/api/content/routes`, `/api/content/events`).
- [ ] Persistencia completa Prisma para routes/events/businesses/interactions.

### EPIC C — Realito AI operativo (L5→L6)
- [x] Contrato `POST /api/realito/chat` con `history + context`.
- [x] Integración de recomendaciones + rutas + eventos en respuesta.
- [x] Trazabilidad mínima (`interactionId`) para auditoría de conversación.
- [ ] Integración con proveedor IA externo y grounding documental avanzado.
- [ ] Evaluación de calidad de respuesta (métricas de precisión/satisfacción).

### EPIC D — Gemelos digitales turísticos (L3→L5)
- [x] Modelo semántico y capacidades federadas en servicio de twins.
- [x] API de gemelos (`/api/digital-twins/models|instances|simulate`).
- [x] Score operacional integrado al ranking de recomendaciones.
- [ ] Persistencia de twin/eventos en Prisma (no solo memoria).
- [ ] Sincronización de estado en mapa y fichas públicas en tiempo real.

### EPIC E — Monetización y comercios (L5)
- [ ] Onboarding completo de comercio (perfil/horario/galería/servicios).
- [ ] Stripe subscriptions L1/L2/L3 con webhooks idempotentes.
- [ ] Reglas de visibilidad de catálogo por plan.
- [ ] Panel de comerciante con métricas (impresiones, clics, cómo llegar).

### EPIC F — Seguridad, roles y administración (L5→L6)
- [ ] Roles endurecidos `VISITOR/MERCHANT/ADMIN` con guards por módulo.
- [ ] Panel admin mínimo: aprobar comercios y moderación de contenido.
- [ ] Observabilidad backend (logs estructurados + healthchecks + métricas).

### EPIC G — Arquitectura federada TAMV (L0–L7)
- [ ] Protocol engine y lifecycle con adapters MSR/BookPI/EOCT/Isabella.
- [ ] Guardian de monitoreo y contratos de eventos XR.
- [ ] DreamSpaces service + gateway XR (WS/SSE) para presencia social.
- [ ] Pipeline quant-inspired desacoplado para simulación de escenarios.

## Priorización MVP operativo (90 días)

1. **MVP público**: Home + mapa + catálogo + rutas/eventos con datos API.
2. **MVP conversación**: Realito chat con trazabilidad y recomendaciones reales.
3. **MVP negocio**: registro/login comerciante + alta negocio + visibilidad base.
4. **MVP gemelos**: estado operacional de sitios clave y simulación climática.
5. **MVP operación**: roles, seguridad, panel admin y monitoreo mínimo.

## Entregables de sprint inmediato (S1)

- Conectar `Rutas` y `Eventos` a backend (`/api/content/*`) con fallback local.
- Migrar `RealitoOrb` al contrato `/api/realito/chat` con historial y trace.
- Publicar este backlog como fuente de ejecución y control de avance.

