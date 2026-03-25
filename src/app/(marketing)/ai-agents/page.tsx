import { Metadata } from "next";
import CTA from "@/components/CTA";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Custom AI Agents for Your Business",
  description:
    "Automate any part of your salon or barbershop with custom AI agents. Follow-up texts, review requests, inventory alerts, and more.",
  path: "/ai-agents",
});

const useCases = [
  {
    title: "Automated Follow-Ups",
    description: "AI sends personalized follow-up texts after appointments — thank you messages, feedback requests, and rebooking reminders.",
  },
  {
    title: "Review Generation",
    description: "Automatically ask happy clients to leave reviews on Google, Yelp, or your platform of choice. Boost your online reputation on autopilot.",
  },
  {
    title: "No-Show Recovery",
    description: "When a client misses an appointment, the AI reaches out to reschedule — politely and automatically.",
  },
  {
    title: "Inventory Alerts",
    description: "Track product usage and get alerts when supplies run low. Never run out of color, product, or essentials again.",
  },
  {
    title: "Social Media Content",
    description: "AI generates post ideas, captions, and scheduling suggestions based on your services and seasonal trends.",
  },
  {
    title: "Client Re-Engagement",
    description: "Automatically identify clients who haven't visited in a while and send them personalized offers to come back.",
  },
];

export default function AIAgentsPage() {
  return (
    <>
      <section className="gradient-bg pt-20 pb-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Custom AI Agents
            <br />
            <span className="text-white/90">Built for Your Business</span>
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            Tell us what you want automated, and we&apos;ll build an AI agent to do it.
            From follow-up texts to inventory management — if it can be automated, we can build it.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark">What Can AI Agents Do?</h2>
            <p className="mt-4 text-gray text-lg">Here are some of the most popular automations our clients use.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-dark mb-2">{useCase.title}</h3>
                <p className="text-gray leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dark mb-6">Custom Pricing for Custom Solutions</h2>
          <p className="text-gray text-lg max-w-2xl mx-auto mb-8">
            Every AI agent is different because every business is different. We&apos;ll scope your automation
            needs and give you a clear, fair price. Most agents start at $50-100/month depending on complexity.
          </p>
          <div className="inline-flex items-center gap-2 text-primary font-semibold">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            No setup fees
          </div>
          <span className="mx-4 text-gray">|</span>
          <div className="inline-flex items-center gap-2 text-primary font-semibold">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Cancel anytime
          </div>
          <span className="mx-4 text-gray">|</span>
          <div className="inline-flex items-center gap-2 text-primary font-semibold">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Free consultation
          </div>
        </div>
      </section>

      <CTA
        title="Let's Automate Your Business"
        description="Book a free consultation and we'll show you exactly how AI agents can save you time and money."
        buttonText="Book a Free Consultation"
      />
    </>
  );
}
