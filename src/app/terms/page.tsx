import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use the Fraevo website and engage Fraevo for software engineering services.",
};

const sections = [
  {
    title: "1. Agreement",
    body: "By using the Fraevo website or contacting us, you agree to these terms. Detailed terms of service for paid work are set out in a separate engagement agreement signed by both parties.",
  },
  {
    title: "2. Our services",
    body: "Fraevo provides software engineering, AI product development, custom software, mobile and web application development, and automation services. Proposals are always provided in writing before any paid work begins.",
  },
  {
    title: "3. Proposals and estimates",
    body: "Any complexity assessments or indicative timelines discussed in Fraevo AI or during discovery are estimates, not guarantees. Final scope, price and schedule are confirmed in a written proposal.",
  },
  {
    title: "4. Intellectual property",
    body: "Unless otherwise agreed in writing, deliverables built for you under a paid engagement are assigned to you on full payment. Fraevo may retain the right to use non-confidential information about the work for portfolio purposes, subject to a written non-disclosure agreement where requested.",
  },
  {
    title: "5. Confidentiality",
    body: "We treat your business information as confidential. Project details, data and conversations shared with us are used only to deliver our services, except where disclosure is required by law.",
  },
  {
    title: "6. Limitation of liability",
    body: "Fraevo is not liable for indirect, incidental or consequential damages arising from use of this website. Our total liability under any engagement is limited to the amount paid for the specific service, as set out in the engagement agreement.",
  },
  {
    title: "7. Contact",
    body: "Questions about these terms can be sent to hello@fraevo.com.",
  },
];

export default function TermsPage() {
  return (
    <main className="bg-bg text-ink">
      <div className="container-x max-w-3xl py-32 md:py-44">
        <Link href="/" className="font-mono text-xs tracking-[0.2em] text-faint hover:text-accent">
          ← Back to Fraevo
        </Link>
        <h1 className="mt-8 font-display text-4xl font-medium tracking-tight md:text-6xl">
          Terms of Service
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