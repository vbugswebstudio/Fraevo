export interface ProjectSummary {
  project: string;
  type: string;
  features: string[];
  tech: string[];
  nextStep: string;
}

export const emptySummary: ProjectSummary = {
  project: "Your project",
  type: "Custom Software",
  features: [],
  tech: [],
  nextStep: "Talk to an Engineer",
};

const featureKeywords: Record<string, string[]> = {
  Forecasting: ["forecast", "predict", "demand"],
  Analytics: ["analytics", "insight", "dashboard", "report", "metric"],
  Alerts: ["alert", "notify", "notification", "warning"],
  Chat: ["chat", "assistant", "copilot", "conversation"],
  "RAG Search": ["document", "knowledge", "rag", "search"],
  Automation: ["automate", "workflow", "process", "integration"],
  Scheduling: ["schedule", "booking", "calendar", "dispatch"],
  "Real-time Sync": ["real-time", "realtime", "live", "sync"],
  "User Accounts": ["login", "auth", "account", "users", "multi-tenant"],
  Payments: ["payment", "billing", "invoice", "checkout"],
};

const typeKeywords: Record<string, string[]> = {
  "AI Product": ["ai", "llm", "chatbot", "copilot", "rag", "agent", "predict", "vision", "gpt", "machine learning"],
  "Mobile Application": ["mobile", "ios", "android", "app for"],
  "Web Application": ["web", "website", "portal", "dashboard", "platform", "saas", "marketplace"],
  Automation: ["automate", "workflow", "integration", "process"],
  "Custom Software": ["internal", "crm", "erp", "tool", "backend", "api"],
};

const techKeywords: Record<string, string[]> = {
  Python: ["python"],
  FastAPI: ["fastapi", "fast api"],
  "Node.js": ["node", "node.js"],
  React: ["react"],
  "Next.js": ["next.js", "nextjs"],
  PostgreSQL: ["postgres", "postgresql"],
  MongoDB: ["mongodb", "mongo"],
  "Vector DB": ["vector", "embedding"],
  LLM: ["llm", "gpt", "claude", "openai", "model", "rag"],
  AWS: ["aws"],
  GCP: ["gcp", "google cloud"],
  Docker: ["docker"],
  Kubernetes: ["kubernetes", "k8s"],
};

function collectUserText(messages: { role: string; content: string }[]): string {
  return messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join("\n");
}

function detectTitle(text: string): string {
  const patterns = [
    /(?:i want to|we want to|i need|we need|wanted to|need to|want to) (?:build|create|develop|make|launch) (?:an|a)? ?([a-z][a-z0-9 -]{2,48})/i,
    /(?:an|a|the) ([a-z][a-z0-9 -]{2,48}) (?:platform|system|app|tool|product|dashboard)/i,
    /build (?:an|a)? ?([a-z][a-z0-9 -]{2,40})/i,
    /for (?:our|my) ([a-z][a-z0-9 -]{2,40})/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1]
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }
  }
  return "Your project";
}

export function analyzeProject(
  messages: { role: string; content: string }[]
): ProjectSummary {
  const text = collectUserText(messages);
  const lower = text.toLowerCase();

  const project = detectTitle(text);

  let type = "Custom Software";
  const typeScores = Object.entries(typeKeywords).map(([label, keywords]) => {
    const score = keywords.reduce(
      (acc, kw) => acc + (lower.includes(kw) ? 1 : 0),
      0
    );
    return { label, score };
  });
  typeScores.sort((a, b) => b.score - a.score);
  if (typeScores[0].score > 0) type = typeScores[0].label;

  const features = Object.entries(featureKeywords)
    .filter(([, keywords]) => keywords.some((kw) => lower.includes(kw)))
    .map(([label]) => label)
    .slice(0, 5);

  const tech = Object.entries(techKeywords)
    .filter(([, keywords]) => keywords.some((kw) => lower.includes(kw)))
    .map(([label]) => label)
    .slice(0, 6);

  return {
    project,
    type,
    features,
    tech,
    nextStep: "Talk to an Engineer",
  };
}