import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface LeadPayload {
  name?: string;
  email?: string;
  company?: string;
  description?: string;
  summary?: Record<string, unknown>;
}

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 160);
  const company = String(body.company ?? "").trim().slice(0, 120);
  const description = String(body.description ?? "").trim().slice(0, 4000);

  if (!name || !email || !description) {
    return Response.json(
      { error: "Name, email and project description are required." },
      { status: 422 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Please provide a valid email." }, { status: 422 });
  }

  const record = {
    name,
    email,
    company: company || null,
    description,
    summary: body.summary ?? null,
    source: "fraevo.com",
    createdAt: new Date().toISOString(),
  };

  // Persist the lead. Wrapped in try/catch so a storage failure never
  // breaks the conversion flow — replace with your CRM / email service.
  try {
    const dir = path.join(process.cwd(), "data", "leads");
    await mkdir(dir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const safe = email.replace(/[^a-z0-9]+/gi, "_");
    await writeFile(
      path.join(dir, `${stamp}-${safe}.json`),
      JSON.stringify(record, null, 2),
      "utf-8"
    );
    console.log(`[lead] ${email} — ${record.company ?? "no company"}`);
  } catch (err) {
    console.error("[lead] storage failed", err);
  }

  return Response.json({ ok: true }, { status: 200 });
}