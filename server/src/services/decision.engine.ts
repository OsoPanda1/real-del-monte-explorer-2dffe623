// ============================================================================
// RDM Digital OS — Decision Engine & Audit Store
// Stores AI decisions with SHA-256 hash for auditability
// From quantum-system-tamv integration
// ============================================================================

import { createHash } from 'crypto';

export interface DecisionRecommendation {
  recommendation: string;
}

export interface AuditedDecision {
  traceId: string;
  intent: string;
  score: number;
  territory: string;
  hash: string;
  decidedAt: string;
  version: number;
}

/**
 * DecisionEngine stores AI responses and converts them into
 * user-facing recommendations with audit trail.
 */
export class DecisionEngine {
  private aiResponses: string[] = [];

  addResponse(response: string): void {
    this.aiResponses.push(response);
  }

  getRecommendations(): DecisionRecommendation[] {
    return this.aiResponses.map((response) => ({
      recommendation: `Based on your input: ${response}, here are some recommendations.`,
    }));
  }
}

/**
 * DecisionStore provides an append-only ledger of AI decisions
 * with cryptographic hashes for integrity verification.
 */
export class DecisionStore {
  private readonly ledger: AuditedDecision[] = [];
  private lastDecision: AuditedDecision | null = null;

  save(decision: Omit<AuditedDecision, 'hash' | 'decidedAt' | 'version'>): AuditedDecision {
    const version = this.ledger.length + 1;
    const raw = JSON.stringify({
      traceId: decision.traceId,
      intent: decision.intent,
      score: decision.score,
      territory: decision.territory,
      version,
    });

    const hash = createHash('sha256').update(raw).digest('hex');

    const audited: AuditedDecision = {
      ...decision,
      hash,
      decidedAt: new Date().toISOString(),
      version,
    };

    this.ledger.push(audited);
    this.lastDecision = audited;

    return audited;
  }

  getLastDecision(): AuditedDecision | null {
    return this.lastDecision;
  }

  getLedger(limit = 50): AuditedDecision[] {
    return this.ledger.slice(-limit);
  }

  explain(traceId: string): AuditedDecision | null {
    return this.ledger.find((entry) => entry.traceId === traceId) ?? null;
  }
}

export const decisionEngine = new DecisionEngine();
export const decisionStore = new DecisionStore();
