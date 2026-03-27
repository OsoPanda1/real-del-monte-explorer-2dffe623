// ============================================================================
// RDM Digital OS — Module Manifest
// Registry of all ecosystem repositories and their integration points
// ============================================================================

export interface RepoModule {
  id: string;
  repo: string;
  path: string;
  type: "ui" | "backend" | "infra" | "ai" | "content";
  description: string;
  entryPoints: string[];
  status: "integrated" | "partial" | "planned";
}

export const RDMX_MODULES: RepoModule[] = [
  {
    id: "real-del-monte-explorer",
    repo: "https://github.com/OsoPanda1/real-del-monte-explorer.git",
    path: "packages/real-del-monte-explorer",
    type: "ui",
    description: "Repositorio principal: frontend React + backend Express del ecosistema RDM Digital OS",
    entryPoints: ["src/App.tsx", "server/src/index.ts"],
    status: "integrated",
  },
  {
    id: "real-del-monte-twin",
    repo: "https://github.com/OsoPanda1/real-del-monte-twin.git",
    path: "packages/real-del-monte-twin",
    type: "backend",
    description: "Modelos y lógica específica de gemelo digital de Real del Monte (telemetría, grafo territorial)",
    entryPoints: ["src/models/index.ts", "src/services/twinTelemetry.ts"],
    status: "integrated",
  },
  {
    id: "rdm-digital-2dbd42b0",
    repo: "https://github.com/OsoPanda1/rdm-digital-2dbd42b0.git",
    path: "packages/rdm-digital-core",
    type: "backend",
    description: "Servicios base y APIs legacy de RDM Digital — autenticación, donaciones, economía",
    entryPoints: ["src/routes/index.ts"],
    status: "integrated",
  },
  {
    id: "rdm-smart-city-os",
    repo: "https://github.com/OsoPanda1/rdm-smart-city-os.git",
    path: "packages/rdm-smart-city-os",
    type: "infra",
    description: "Capa de smart city: sensores urbanos, dashboards de gobierno, gestión de destino",
    entryPoints: ["src/index.ts"],
    status: "partial",
  },
  {
    id: "real-del-monte-elevated",
    repo: "https://github.com/OsoPanda1/real-del-monte-elevated.git",
    path: "packages/real-del-monte-elevated",
    type: "ui",
    description: "Sistema de diseño cinematográfico elevated — CinematicIntro, VisualEffects, SectionHeader",
    entryPoints: ["src/components/CinematicIntro.tsx", "src/components/VisualEffects.tsx"],
    status: "integrated",
  },
  {
    id: "citemesh-roots",
    repo: "https://github.com/OsoPanda1/citemesh-roots.git",
    path: "packages/citemesh-roots",
    type: "content",
    description: "Wiki semántica y malla de contenidos territoriales — WikiLayout, WikiSearch, IsabellaChat",
    entryPoints: ["src/components/WikiLayout.tsx", "src/services/wikiSearch.ts"],
    status: "partial",
  },
  {
    id: "genesis-digytamv-nexus",
    repo: "https://github.com/OsoPanda1/genesis-digytamv-nexus.git",
    path: "packages/genesis-digytamv-nexus",
    type: "ai",
    description: "Módulos avanzados TAMV — IsabellaOrb, BancoTAMV, Marketplace, Universidad Digital",
    entryPoints: ["src/modules/isabella/index.ts", "src/modules/banco/index.ts"],
    status: "partial",
  },
  {
    id: "civilizational-core",
    repo: "https://github.com/OsoPanda1/civilizational-core.git",
    path: "packages/civilizational-core",
    type: "infra",
    description: "Núcleo civilizacional — protocolos éticos, BookPI, módulos de gobernanza digital",
    entryPoints: ["src/protocols/index.ts"],
    status: "partial",
  },
];

export const MODULE_ALIASES: Record<string, string> = {
  "@rdm/core": "packages/rdm-digital-core/src",
  "@rdm/twin": "packages/real-del-monte-twin/src",
  "@rdm/elevated": "packages/real-del-monte-elevated/src",
  "@rdm/citemesh": "packages/citemesh-roots/src",
  "@rdm/nexus": "packages/genesis-digytamv-nexus/src",
  "@rdm/smartcity": "packages/rdm-smart-city-os/src",
  "@rdm/civilizational": "packages/civilizational-core/src",
};
