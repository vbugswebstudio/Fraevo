const WEB3FORMS_ACCESS_KEY = "f01918e0-309c-4664-8cb0-2dfdcac44f7a";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export interface LeadPayload {
  name: string;
  email: string;
  company?: string;
  description: string;
  summary?: Record<string, unknown> | null;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const message = payload.summary
    ? `${payload.description}\n\n--- AI conversation summary ---\n${JSON.stringify(
        payload.summary,
        null,
        2
      )}`
    : payload.description;

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New project enquiry from ${payload.name}`,
      from_name: payload.name,
      name: payload.name,
      email: payload.email,
      company: payload.company ?? "",
      message,
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message ?? "Something went wrong. Please try again.");
  }
}