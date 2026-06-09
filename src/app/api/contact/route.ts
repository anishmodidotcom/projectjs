import { NextRequest, NextResponse } from "next/server";

// In-memory rate limit. NOTE: this is per-instance only and resets on cold
// start. In production this should move to a durable store (Redis, Upstash,
// or a managed rate-limit service) so limits hold across instances.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const buckets: Map<string, number[]> = new Map();

function getIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const arr = buckets.get(ip) || [];
  const recent = arr.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    buckets.set(ip, recent);
    return false;
  }
  recent.push(now);
  buckets.set(ip, recent);
  return true;
}

function nonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: NextRequest) {
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, brand, budget, message, company_website } = payload;

  // Honeypot: bot filled the hidden field — silently succeed without
  // doing anything (no console.log, no rate-limit consumption).
  if (typeof company_website === "string" && company_website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!nonEmptyString(name) || !nonEmptyString(brand) || !nonEmptyString(message)) {
    return NextResponse.json(
      { error: "Name, brand and message are required." },
      { status: 400 }
    );
  }

  const ip = getIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // PLACEHOLDER: wire to email service (Resend/SES) once configured.
  console.log("[contact] submission", {
    name,
    brand,
    budget: typeof budget === "string" ? budget : "",
    message,
    ip,
  });

  return NextResponse.json({ ok: true });
}
