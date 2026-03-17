import type { NextFunction, Request, Response } from "express";
import { sendError } from "./http.js";

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export function createRateLimiter(maxRequests: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = `${req.ip}:${req.baseUrl}${req.path}`;
    const now = Date.now();
    const existing = buckets.get(key);

    if (!existing || existing.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (existing.count >= maxRequests) {
      res.setHeader("Retry-After", Math.ceil((existing.resetAt - now) / 1000));
      return sendError(res, 429, "RATE_LIMITED", "Too many requests", {
        maxRequests,
        windowMs,
      });
    }

    existing.count += 1;
    buckets.set(key, existing);
    return next();
  };
}
