# Integración de gemelos digitales para Real del Monte (RDM·X)

## Objetivo

Elevar la plataforma turística con un núcleo de gemelos digitales operativo, auditable y visualmente inmersivo, adaptando capacidades inspiradas en:

- Azure DTDL
- Azure Digital Twins Explorer
- Eclipse Ditto
- AWSIM
- Autodesk Forge Digital Twin
- FaceChain
- Awesome Digital Twins

## Traducción de capacidades al dominio turístico

1. **Modelado semántico (DTDL)**
   - Se define un modelo turístico `dtmi:rdmx:tourism:heritage.poi;1` con propiedades, telemetría y contexto.
   - Beneficio: contratos consistentes para sitios, comercios y rutas.

2. **Grafo navegable (Digital Twins Explorer)**
   - Cada twin mantiene relaciones `incoming/outgoing` para conectar destino → ruta → negocio.
   - Beneficio: visualización clara de ecosistema y dependencias.

3. **Sincronización desired/reported (Ditto)**
   - El twin guarda estado deseado y reportado, más telemetría operativa.
   - Beneficio: gobernanza de operación y capacidad de auditoría.

4. **Simulación de escenarios (AWSIM)**
   - Endpoint de simulación que considera clima y visitantes proyectados.
   - Beneficio: anticipar saturación y ajustar recomendaciones.

5. **Render inmersivo (Forge Digital Twin)**
   - Perfil de escena por categoría con PBR/HDRI/postprocesado.
   - Beneficio: capa XR/3D preparada para visualización contextual.

6. **Avatar guía personalizable (FaceChain)**
   - Configuración por twin de estilo, localización y voz de guía.
   - Beneficio: experiencias narrativas más humanas para cada sitio.

7. **Catálogo federado (Awesome Digital Twins)**
   - Campo de capacidades en modelo para extender conectores sin romper contratos.
   - Beneficio: evolución modular de la plataforma.

## Cambios implementados en backend

- Nuevo módulo de servicio `digital-twins.service.ts`:
  - catálogo de modelos
  - provisión automática de twin por comercio
  - simulación climática/aforo
  - score operacional para recomendaciones
- Nuevas rutas `/api/digital-twins/*`:
  - `GET /models`
  - `GET /instances`
  - `POST /instances`
  - `POST /simulate`
- Integración con recomendaciones:
  - `recommendBusinesses` incorpora `twinOperationalScore` además de relevancia y plan.

## Contratos operativos recomendados para frontend

- Mostrar badge de estado twin en tarjetas de negocio (`open`, `saturated`).
- Exponer un panel “Gemelo Digital del Sitio” con:
  - aforo
  - tiempo de fila
  - escena XR sugerida
  - justificación de recomendación
- Activar visualización inmersiva usando el perfil `scene` retornado por API.

## Siguiente etapa sugerida

1. Persistir twins en base de datos (actualmente memoria en `store.ts`).
2. Conectar telemetría real (tickets, clima, aforo físico).
3. Implementar vista de grafo en frontend.
4. Añadir policy engine por rol/permiso para edición de estado deseado.
5. Integrar eventos con panel analítico para decisiones operativas diarias.
