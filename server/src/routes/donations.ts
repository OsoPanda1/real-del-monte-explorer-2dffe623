import { Router } from "express";
import { z } from "zod";
import Stripe from "stripe";
import { config } from "../config.js";
import { db } from "../lib/store.js";

const checkoutSchema = z.object({
  amount: z.number().min(10),
});

const donationsRouter = Router();

const stripe = config.stripeSecretKey ? new Stripe(config.stripeSecretKey) : null;

donationsRouter.post("/checkout", async (req, res) => {
  const parsed = checkoutSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const cents = Math.round(parsed.data.amount * 100);

  if (!stripe) {
    const id = crypto.randomUUID();
    db.donations.set(id, {
      id,
      amount: cents,
      currency: "mxn",
      providerId: `local_${id}`,
      createdAt: new Date().toISOString(),
    });

    return res.json({ url: `${config.publicBaseUrl}/gracias-donativo?source=local` });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${config.publicBaseUrl}/gracias-donativo?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.publicBaseUrl}/donar`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "mxn",
          unit_amount: cents,
          product_data: {
            name: "Donativo RDM Digital",
          },
        },
      },
    ],
    metadata: {
      purpose: "rdm_donation",
    },
  });

  return res.json({ url: session.url });
});

export default donationsRouter;
