import { db } from "../../lib/store.js";
import { publishProtocolToBookpi } from "./protocol.bookpi.adapter.js";
import { protocolCommandSchema } from "./protocol.command.js";
import { executeProtocolCommand } from "./protocol.engine.js";
import { transitionState } from "./protocol.lifecycle.js";
import { publishProtocolToMsr } from "./protocol.msr.adapter.js";

export function runProtocolOrchestration(rawInput: unknown) {
  const parsed = protocolCommandSchema.safeParse(rawInput);
  if (!parsed.success) {
    throw new Error(`INVALID_PROTOCOL_COMMAND:${parsed.error.issues.map((issue) => issue.path.join(".")).join(",")}`);
  }

  const { result, guardianSignal } = executeProtocolCommand(parsed.data);

  const existing = db.protocolRuns.get(result.runId);
  const state = existing
    ? transitionState(existing.state, result.state === "running" ? "completed" : "halted")
    : result.state;

  db.protocolRuns.set(result.runId, {
    id: result.runId,
    protocolType: result.mode,
    state,
    ethicalCheck: result.constitution.allowed ? "pass" : "review",
    context: parsed.data.context,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  db.guardianAlerts.set(guardianSignal.id, {
    id: guardianSignal.id,
    level: guardianSignal.severity,
    source: guardianSignal.source,
    message: guardianSignal.summary,
    createdAt: guardianSignal.createdAt,
  });

  publishProtocolToMsr(result);
  publishProtocolToBookpi(result);

  return { result, guardianSignal };
}
