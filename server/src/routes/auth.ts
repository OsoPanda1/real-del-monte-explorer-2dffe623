import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { config } from "../config.js";
import { db } from "../lib/store.js";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = registerSchema;

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { email, password } = parsed.data;
  if (db.usersByEmail.has(email)) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const id = crypto.randomUUID();
  const passwordHash = await bcrypt.hash(password, 10);

  db.users.set(id, { id, email, passwordHash, role: "MERCHANT" });
  db.usersByEmail.set(email, id);

  const token = jwt.sign({ sub: id, role: "MERCHANT" }, config.jwtSecret, { expiresIn: "7d" });
  return res.status(201).json({ token, user: { id, email, role: "MERCHANT" } });
});

authRouter.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { email, password } = parsed.data;
  const userId = db.usersByEmail.get(email);

  if (!userId) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const user = db.users.get(userId);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ sub: user.id, role: user.role }, config.jwtSecret, { expiresIn: "7d" });
  return res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

export default authRouter;
