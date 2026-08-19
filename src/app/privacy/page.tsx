import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Fraevo collects, uses and protects your information when you use our website and services.",
};

const sections = [
  {
    title: "Information we collect",
    body: "When you contact us or use Fraevo AI, we collect the information you provide: your name, email address, company and a description of your project. Our website may collect standard technical data such as browser type and pages visited, used only to understand how the site performs.",
  },
  {
    title: "How we use it",
    body: "We use your information to respond to enquiries, evaluate project requests, improve our products and services, and where you have agreed, to send relevant updates. We do not sell your personal information.",
  },
  {
    title: "Fraevo AI conversations",
    body: "When you use the AI project consultant, your conversation is processed to provide the service. The conversation summary you submit with an enquiry is treated as confidential and shared only with our engineering team. We may retain conversation data to improve the consultant's quality, with identifiable personal information removed where practical.",
  },
  {
    title: "Data retention",
    body: "We keep personal information only as long as necessary for the purposes described above or as required by law. You may request access to, correction of, or deletion of your personal information at any time by contacting hello@fraevo.com.",
  },
  {
    title: "Third parties",
    body: "We may use third-party services for hosting, email and analytics. These providers process data only on our behalf and in accordance with applicable data protection law.",
  },
  {
    title: "Contact",
    body: "For any privacy questions or requests, email hello@fraevo.com. We aim to respond within a reasonable time.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-bg text-ink">
      <div className="container-x max-w-3xl py-32 md:py-44">
        <Link href="/" className="font-mono text-xs tracking-[0.2em] text-faint hover:text-accent">
          ← Back to Fraevo
        </Link>
        <h1 className="mt-8 font-display text-4xl font-medium tracking-tight md:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-muted">Last updated: 2026</p>
        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl font-medium tracking-tight text-accent">
                {section.title}
              </h2>
              <p className="mt-3 leading-relaxed text-ink-soft">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}