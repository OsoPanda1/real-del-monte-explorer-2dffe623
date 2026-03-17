# Backend operativo RDM·X — APIs disponibles

## Núcleo ya operativo

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/businesses`
- `POST /api/businesses`
- `GET /api/businesses/me`
- `GET /api/weather/mineral-del-monte`
- `POST /api/recommendations`
- `POST /api/realito/chat`
- `GET /api/content/routes`
- `GET /api/content/events`
- `GET /api/digital-twins/models`
- `GET /api/digital-twins/instances`
- `POST /api/digital-twins/instances`
- `POST /api/digital-twins/simulate`

## Identidad y perfiles

- `GET /api/users` (ADMIN)
- `GET /api/profiles/me`
- `PATCH /api/profiles/me`

## Social

- `GET /api/social/snapshot`
- `POST /api/social/channels`
- `POST /api/social/channels/join`
- `POST /api/social/posts`
- `POST /api/social/posts/:postId/like`
- `POST /api/social/comments`
- `POST /api/social/dm`

## Streams y videollamadas

- `GET /api/streams`
- `POST /api/streams/live`
- `POST /api/streams/live/:roomId/end`
- `POST /api/streams/calls`
- `POST /api/streams/calls/join`

## Protocolos + guardianía

- `GET /api/protocols`
- `POST /api/protocols/start`
- `POST /api/protocols/state`
- `POST /api/protocols/guardian/alert`

## Economía y membresías

- `GET /api/economy/me`
- `POST /api/economy/membership`
- `POST /api/economy/ledger`

## XR / DreamSpaces

- `GET /api/xr/dreamspaces`
- `POST /api/xr/dreamspaces`
- `POST /api/xr/dreamspaces/join`
- `GET /api/xr/scene/:dreamspaceId`

## Auditoría

- `GET /api/audit/feed`

> Nota: Actualmente todo persiste en memoria para desarrollo y pruebas funcionales.
