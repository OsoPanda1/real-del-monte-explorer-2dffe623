import { appendBookpiNarrative } from "../audit.service.js";
import type { ProtocolExecutionResult } from "./protocol.types.js";

export function publishProtocolToBookpi(result: ProtocolExecutionResult) {
  const selectedPath = result.decisionPaths.find((entry) => entry.selected);
  appendBookpiNarrative({
    title: `Protocolo ${result.mode} en estado ${result.state}`,
    narrative: [
      `Run: ${result.runId}`,
      `Riesgo constitucional: ${result.constitution.riskLevel}`,
      `Ruta seleccionada: ${selectedPath?.label ?? "N/A"}`,
      `Overlay XR: ${result.xrDirective.overlays.join(", ")}`,
    ].join(" | "),
    tags: ["protocol", "bookpi", result.mode, result.xrDirective.threatLevel],
  });
}
