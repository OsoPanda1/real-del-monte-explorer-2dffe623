import { db } from "../lib/store.js";

export function getEconomySummary(): string {
  const totalDonations = [...db.donations.values()].reduce((acc, donation) => acc + donation.amount, 0);
  const totalEntries = db.ledger.size;
  const activeMemberships = [...db.memberships.values()].filter((membership) => membership.active).length;

  return [
    `Donaciones registradas: ${db.donations.size}`,
    `Monto acumulado (MXN): ${totalDonations}`,
    `Membresías activas: ${activeMemberships}`,
    `Movimientos de ledger: ${totalEntries}`,
  ].join("\n");
}
