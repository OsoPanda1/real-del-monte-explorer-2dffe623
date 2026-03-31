// ============================================================================
// RDM Digital OS — Chronus Engine
// Motor de cálculo de saturación zonal en tiempo real
// From quantum-system-tamv integration
// ============================================================================

export interface ContextoCivilizatorio {
  clima: 'despejado' | 'lluvia' | 'niebla_densa';
  eventos_activos: string[];
  turistas_concurrentes: number;
}

export interface SaturationResult {
  polygonId: string;
  presion: number;
  alerta: boolean;
  timestamp: string;
}

/**
 * ChronusEngine calculates zonal saturation pressure in real-time
 * combining physical density, weather multipliers, event tensors,
 * and concurrency factors.
 */
export class ChronusEngine {
  /**
   * Calculate saturation for a given zone polygon
   * Returns normalized pressure 0.0 - 1.0
   */
  public calcularSaturacionZonal(
    polygonId: string,
    contexto: ContextoCivilizatorio,
    activosEnZona: number = 0,
  ): SaturationResult {
    const densidadFisica = activosEnZona / 1000;

    const multiplicadorClima =
      contexto.clima === 'niebla_densa' ? 1.4
        : contexto.clima === 'lluvia' ? 1.2
          : 1.0;

    const tensorEventos = contexto.eventos_activos.length > 0 ? 0.15 : 0;
    const tensorConcurrencia = Math.min(0.25, contexto.turistas_concurrentes / 10000);

    const cargaBase = densidadFisica * multiplicadorClima;
    const cargaFinal = cargaBase + tensorEventos + tensorConcurrencia;
    const presion = Math.min(1.0, Math.max(0.0, cargaFinal));

    const alerta = presion > 0.85;

    if (alerta) {
      console.warn(
        `[CHRONUS] ALERTA: Saturación crítica (${(presion * 100).toFixed(1)}%) en Zona ${polygonId}`,
      );
    }

    return {
      polygonId,
      presion,
      alerta,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Calculate saturation for multiple zones at once
   */
  public calcularSaturacionMultiple(
    zonas: Array<{ id: string; activos: number }>,
    contexto: ContextoCivilizatorio,
  ): SaturationResult[] {
    return zonas.map(z => this.calcularSaturacionZonal(z.id, contexto, z.activos));
  }
}

export const chronusEngine = new ChronusEngine();
