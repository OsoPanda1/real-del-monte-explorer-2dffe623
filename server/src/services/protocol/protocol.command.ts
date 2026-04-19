import { z } from "zod";

export const protocolCommandSchema = z.object({
  type: z.enum(["START", "TRANSITION", "HALT"]),
  mode: z.enum(["hoyo-negro", "fenix", "futuros"]),
  context: z.string().min(8),
  actorId: z.string().min(1),
  tags: z.array(z.string().min(2)).optional(),
});

export type ProtocolCommandPayload = z.infer<typeof protocolCommandSchema>;
