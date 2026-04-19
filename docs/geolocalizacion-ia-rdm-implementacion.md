# Implementación técnica — Geolocalización en tiempo real con IA (RDM Digital)

## Qué se implementó en código

Este repo ahora incluye un módulo operativo de geolocalización para cubrir el MVP del informe técnico:

- **Registro de lugares con normalización WGS84**.
- **Detección de duplicados** por distancia (<50m) + similitud de texto.
- **Verificación IA simulada** (score de confianza y razón auditable).
- **Ingesta de telemetría en tiempo real** por HTTP y streaming por **SSE**.
- **Endpoints protegidos por JWT** para operaciones sensibles.

> Nota: para WebSocket puro se dejó la arquitectura preparada; en este entorno se implementó SSE para evitar bloqueo por dependencia externa en instalación.

## Endpoints nuevos

Base: `/api/geolocation`

- `POST /places/register`
  - Requiere JWT (`MERCHANT` o `ADMIN`).
  - Registra un lugar y devuelve `duplicateOf` + bloque `verification`.
- `GET /places`
  - Lista lugares registrados en memoria para MVP.
- `POST /verify`
  - Requiere JWT.
  - Ejecuta score de verificación de ubicación.
- `POST /telemetry/ingest`
  - Requiere JWT.
  - Recibe `{ userId, lat, lng, timestamp?, source? }`.
- `GET /telemetry/recent?userId=...&limit=...`
  - Requiere JWT.
  - Retorna histórico reciente.
- `GET /telemetry/stream`
  - Requiere JWT.
  - Entrega stream SSE para clientes en tiempo real.

## Fusión de repos de OsoPanda1 (relacionados)

Se agregó un pipeline para fusionar metadatos de repos relacionados:

- Script: `tools/fuse-osopanda-repos.mjs`
- Salida: `docs/osopanda-related-repos.json`

El script:
1. Consulta la API de GitHub para `OsoPanda1`.
2. Filtra repos por keywords (`rdm`, `digital`, `tamv`, `xr`, `realito`, `isabella`, `geolocation`, `twin`).
3. Limita a **12** repos relacionados.
4. Genera manifiesto JSON listo para alimentar integraciones internas.

## Siguiente paso recomendado

Cuando el entorno tenga acceso a GitHub API:

```bash
node tools/fuse-osopanda-repos.mjs
```

Con eso se llenará automáticamente `docs/osopanda-related-repos.json` con repos reales y actualizados.
