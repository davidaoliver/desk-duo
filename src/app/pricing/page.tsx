import { Metadata } from "next";
import Link from "next/link";
import CTA from "@/components/CTA";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Pricing — Simple, Transparent Plans",
  description:
    "Desk Duo pricing: Custom App $60/mo, AI Receptionist $30/mo, Self Check-In Kiosk $20/mo, AI Agents custom pricing. No contracts, cancel anytime.",
  path: "/pricing",
});

const plans = [
  {
    name: "Self Check-In Kiosk",
    price: "$20",
    description: "Modernize your lobby with tablet-based self check-in.",
    features: [
      "Tablet-based client check-in",
      "Real-time queue management",
      "Walk-in support",
      "Service & stylist selection",
      "Staff & client notifications",
      "Custom branding",
    ],
    href: "/self-check-in",
    popular: false,
  },
  {
    name: "AI Receptionist",
    price: "$30",
    description: "Never miss a call. AI answers and books 24/7.",
    features: [
      "24/7 call answering",
      "Appointment booking by phone",
      "Smart call routing",
      "Custom voice & personality",
      "Call transcripts & analytics",
      "Multi-language support",
    ],
    href: "/ai-receptionist",
    popular: true,
  },
  {
    name: "Custom App",
    price: "$60",
    description: "Your own branded mobile app for clients.",
    features: [
      "Fully branded mobile app",
      "Online booking system",
      "Push notifications",
      "Loyalty & rewards program",
      "Client management",
      "Payment integration",
    ],
    href: "/custom-app",
    popular: false,
  },
];

const faqs = [
  {
    q: "Are there any contracts or commitments?",
    a: "No. All plans are month-to-month. Cancel anytime with no fees or penalties.",
  },
  {
    q: "Can I bundle multiple products?",
    a: "Absolutely. Many of our clients use multiple products together. Contact us for bundle pricing.",
  },
  {
    q: "Is there a setup fee?",
    a: "No setup fees for any of our standard products. We handle all the setup and configuration for you.",
  },
  {
    q: "How long does setup take?",
    a: "Most products are up and running within 3-5 business days. Custom apps may take slightly longer depending on complexity.",
  },
  {
    q: "What about AI Agents pricing?",
    a: "AI agents are custom-built for your specific needs, so pricing varies. Most start at $50-100/month. Book a free consultation and we'll give you a clear quote.",
  },
  {
    q: "Do I need to provide any hardware?",
    a: "For the self check-in kiosk, you'll need a tablet (iPad, Android, or Fire tablet). Everything else is cloud-based.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="gradient-bg pt-20 pb-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            No hidden fees. No contracts. No surprises. Pick what you need and cancel anytime.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-2xl border-2 ${
                  plan.popular ? "border-primary shadow-lg" : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-dark">{plan.name}</h3>
                <p className="mt-2 text-gray text-sm">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-dark">{plan.price}</span>
                  <span className="text-gray">/month</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-dark">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-8 block text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "bg-gray-light text-dark hover:bg-gray-200"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* AI Agents card */}
          <div className="mt-12 p-8 rounded-2xl border-2 border-gray-200 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-dark">AI Agents</h3>
            <p className="mt-2 text-gray">Custom-built automations for your specific business needs.</p>
            <p className="mt-4 text-3xl font-extrabold text-dark">Custom Pricing</p>
            <p className="mt-2 text-gray text-sm">Most agents start at $50-100/month</p>
            <Link
              href="/ai-agents"
              className="mt-6 inline-block px-6 py-3 bg-gray-light text-dark font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-light">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-6 bg-white rounded-xl">
                <h3 className="font-bold text-dark">{faq.q}</h3>
                <p className="mt-2 text-gray leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
