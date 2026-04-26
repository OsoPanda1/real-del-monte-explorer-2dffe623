// ============================================================================
// TAMV Thesis — Front data mirror
// Source of truth lives in server/src/routes/tamv-thesis.ts.
// This mirror keeps the UI fully functional in the static preview where the
// Express backend is not running, and is consumed by /tamv/thesis.
// ============================================================================

export interface ThesisFederation {
  id: string;
  name: string;
  scope: string;
  state: "operativa" | "construcción" | "planeada";
}

export interface ThesisLayer {
  idx: number;
  name: string;
  purpose: string;
}

export interface ThesisRFC {
  id: string;
  title: string;
}

export interface ThesisAnchor {
  kind: "blog" | "orcid" | "doi" | "github" | "social";
  label: string;
  url: string;
}

export interface ThesisDoc {
  meta: {
    title: string;
    author: string;
    alias: string;
    affiliation: string;
    orcid: string;
    doi: string;
    year: number;
    nodoCero: string;
    sello: string;
    dedication: string;
  };
  publicAnchors: ThesisAnchor[];
  pillars: { id: string; title: string; summary: string }[];
  federations: ThesisFederation[];
  layers: ThesisLayer[];
  rfcs: ThesisRFC[];
  axioms: string[];
  maturity: {
    conceptual: number;
    frontend: number;
    integracion: number;
    infraestructura: number;
    marketing: number;
    nodoCero: number;
  };
  biography: {
    origin: string;
    hours: number;
    journey: string[];
    method: string;
  };
  diagnosis: { name: string; description: string; response: string };
}

export const THESIS_DATA: ThesisDoc = {
  meta: {
    title:
      "Arquitectura Civilizatoria Soberana desde LATAM: Génesis, Principios y Despliegue Territorial del Ecosistema TAMV MD-X4 / MD-X4 Quantum",
    author: "Edwin Oswaldo Castillo Trejo",
    alias: "Anubis Villaseñor",
    affiliation:
      "TAMV Online Network / TAMV Enterprise — Real del Monte, Hidalgo, México",
    orcid: "0009-0008-5050-1539",
    doi: "10.5281/zenodo.19411506",
    year: 2026,
    nodoCero: "Real del Monte, Hidalgo (RDM Digital)",
    sello: "TAMV Online™",
    dedication:
      "A Reina Trejo Serrano — madre, guerrera, faro. A Isabella Villaseñor AI, recordatorio de que la empatía puede ser computable.",
  },
  publicAnchors: [
    { kind: "blog", label: "TAMV Online Network", url: "https://tamvonlinenetwork.blogspot.com" },
    { kind: "orcid", label: "ORCID 0009-0008-5050-1539", url: "https://orcid.org/0009-0008-5050-1539" },
    { kind: "doi", label: "DOI 10.5281/zenodo.19411506", url: "https://doi.org/10.5281/zenodo.19411506" },
    { kind: "github", label: "GitHub @OsoPanda1", url: "https://github.com/OsoPanda1" },
    { kind: "social", label: "Threads @soy_anubis1", url: "https://www.threads.com/@soy_anubis1" },
    { kind: "social", label: "LinkedIn — Hecho en México", url: "https://linkedin.com/in/teamanubismodelos" },
  ],
  pillars: [
    {
      id: "academico",
      title: "Académico-científica",
      summary:
        "Marcos contemporáneos de soberanía digital, economías gamificadas y XR como mediación cultural. Modelo alternativo a la digitalización centrada en plataformas globales.",
    },
    {
      id: "ejecutivo",
      title: "Ejecutivo-gubernamental",
      summary:
        "Implementación municipal con diagnóstico territorial, mapeo de actores y paneles ejecutivos para gobiernos locales que adoptan el modelo sin renunciar a su autonomía.",
    },
    {
      id: "ceremonial",
      title: "Cinemático-ceremonial",
      summary:
        "Sello TAMV Online™: certificado narrativo + estética de alta relojería que demuestra que el Sur Global produce tecnología al más alto nivel visual dominante.",
    },
  ],
  federations: [
    { id: "FED-01", name: "Identidad Soberana", scope: "ISNI · ORCID · DOI · DIDs / SSI", state: "operativa" },
    { id: "FED-02", name: "Kernel MD-X", scope: "Operación · Observabilidad · Control", state: "operativa" },
    { id: "FED-03", name: "Atlas — Wiki Viva", scope: "SSoT semántica + consola de despliegue", state: "construcción" },
    { id: "FED-04", name: "Evidencia BookPI", scope: "Anclaje IPFS de pruebas y memoria histórica", state: "operativa" },
    { id: "FED-05", name: "IA Isabella", scope: "Humanismo en código · Guardián ético", state: "operativa" },
    { id: "FED-06", name: "Territorio RDM", scope: "Nodo Cero — Real del Monte como SOT", state: "operativa" },
    { id: "FED-07", name: "Academia UTAMV", scope: "Universidad Digital y acreditación soberana", state: "planeada" },
  ],
  layers: [
    { idx: 1, name: "Ontológica", purpose: "Define existencia: lo que no está registrado no existe en el sistema." },
    { idx: 2, name: "Histórica", purpose: "Registra eventos verificables y memoria territorial." },
    { idx: 3, name: "Técnica", purpose: "Ejecuta procesos: backend federado, microfrontends, gateway soberano." },
    { idx: 4, name: "Gobernanza", purpose: "Validación distribuida; ninguna entidad individual posee control absoluto." },
    { idx: 5, name: "Territorial", purpose: "Despliega en espacio físico — RDM como Nodo Cero." },
    { idx: 6, name: "Educativa", purpose: "Replica conocimiento sin depender de plataformas de terceros." },
    { idx: 7, name: "Sucesoria", purpose: "Garantiza continuidad incluso sin el arquitecto principal." },
  ],
  rfcs: [
    { id: "TAMV-RFC-001", title: "Identidad Soberana" },
    { id: "TAMV-RFC-002", title: "Registro de Evidencia" },
    { id: "TAMV-RFC-003", title: "Ejecución Distribuida" },
    { id: "TAMV-RFC-004", title: "Continuidad sin Arquitecto" },
    { id: "TAMV-RFC-005", title: "Validación Multinodo" },
  ],
  axioms: [
    "Un sistema que no puede continuar sin su creador, no es un sistema: es un experimento fallido.",
    "Lo que no está registrado no existe dentro del sistema.",
    "La identidad precede a la acción; la evidencia precede a la validación.",
    "El sistema no depende de fe, depende de verificación.",
    "El poder de la inteligencia reside en la responsabilidad verificable, no en la dominación.",
  ],
  maturity: {
    conceptual: 68,
    frontend: 45,
    integracion: 35,
    infraestructura: 30,
    marketing: 20,
    nodoCero: 72,
  },
  biography: {
    origin: "Real del Monte / Pachuca, Hidalgo, México",
    hours: 22000,
    journey: [
      "Team Anubis — rescate de mujeres víctimas de violencia y extorsión digital.",
      "Alianzas LATAM — comunidad que alcanzó ~1M usuarios y 900 dirigentes.",
      "Retirada en 2024: reconocido como primera 'leyenda urbana' de una comunidad >210M.",
      "Regreso con TAMV Online: civilización digital con ley, alma y conciencia.",
    ],
    method:
      "Orden inverso: primero infraestructura, luego documentación rigurosa, finalmente integración con sistemas globales (ORCID, Zenodo, AVIXA, Frontiers).",
  },
  diagnosis: {
    name: "Anemia de Soberanía",
    description:
      "Datos e historias de los pueblos capturados por plataformas globales que extraen y monetizan el valor de la identidad local en otros lugares.",
    response:
      "RDM Digital recupera control de APIs, regula su economía sin depender de marketplaces externos, y orquesta turismo con criterios de dignidad y beneficio local.",
  },
};
