# Documento Maestro Operativo — RDM Digital / TAMV DM-X4

Este documento consolida la implementación ejecutable ya integrada en el repositorio para las capas L1-L5 del sistema:

## 1) Estado operativo actual

- **Geolocalización en tiempo real**
  - Registro de lugares con verificación y deduplicación.
  - Ingesta de telemetría y stream SSE.
- **Protocolos federados**
  - Motor de orquestación con chequeo constitucional y rutas de decisión.
  - Adaptadores MSR + BookPI.
  - Señales guardian y traducción a directiva XR.
- **XR Gateway**
  - Bus de eventos con replay corto y stream SSE para shell XR.
- **Sistema**
  - Endpoint `/api/master-report` para trazabilidad ejecutiva de arquitectura + roadmap.

## 2) Endpoints clave

### Geolocalización
- `POST /api/geolocation/places/register`
- `GET /api/geolocation/places`
- `POST /api/geolocation/verify`
- `POST /api/geolocation/telemetry/ingest`
- `GET /api/geolocation/telemetry/recent`
- `GET /api/geolocation/telemetry/stream`

### Protocolos
- `POST /api/protocols/orchestrate`

### XR Gateway
- `GET /api/xr/gateway/events`
- `GET /api/xr/gateway/stream`

### Sistema
- `GET /api/master-report`

## 3) Fusión de repos OsoPanda1

- Script: `tools/fuse-osopanda-repos.mjs`
- Comando: `npm run fuse:osopanda`
- Artefacto: `docs/osopanda-related-repos.json`

> Si el entorno bloquea GitHub API, el manifiesto queda en estado `pending_remote_fetch`.

## 4) Diseño quant(um)-inspired aplicado

La orquestación de protocolos evalúa varias rutas de decisión (`conservative`, `balanced`, `exploratory`) y colapsa a una decisión final con peso ético superior a utilidad. Esto habilita un backend híbrido futuro sin acoplar el dominio a una implementación específica de cómputo.
