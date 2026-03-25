import { Metadata } from "next";
import CTA from "@/components/CTA";
import { createMetadata, jsonLd } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "AI Receptionist for Salons & Barbershops",
  description:
    "Never miss a call again. AI receptionist answers phones, books appointments, and handles client inquiries 24/7 for just $30/month.",
  path: "/ai-receptionist",
});

const features = [
  {
    title: "24/7 Call Answering",
    description: "Your AI receptionist answers every call — nights, weekends, holidays. No more missed bookings.",
  },
  {
    title: "Appointment Booking",
    description: "Callers can book, reschedule, or cancel appointments through natural conversation. It syncs with your calendar in real time.",
  },
  {
    title: "Smart Call Routing",
    description: "The AI knows when to handle a call itself and when to transfer to you. You stay in control.",
  },
  {
    title: "Custom Voice & Personality",
    description: "We train the AI on your business — your services, prices, hours, and FAQs. It sounds like part of your team.",
  },
  {
    title: "Call Transcripts & Analytics",
    description: "Get a summary of every call. See what clients are asking about, peak call times, and booking patterns.",
  },
  {
    title: "Multi-Language Support",
    description: "Serve clients in their preferred language. The AI handles conversations in English, Spanish, and more.",
  },
];

export default function AIReceptionistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd.softwareApplication(
            "Desk Duo AI Receptionist",
            "AI-powered phone receptionist that answers calls, books appointments, and handles inquiries 24/7",
            "30"
          )),
        }}
      />

      <section className="gradient-bg pt-20 pb-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            AI Receptionist
            <br />
            <span className="text-white/90">for $30/month</span>
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            Never miss a call again. Our AI receptionist answers phones, books appointments, and handles client
            inquiries around the clock — so you can focus on your craft.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark">A Receptionist That Never Calls in Sick</h2>
            <p className="mt-4 text-gray text-lg">Professional, reliable, and available 24/7.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-dark mb-2">{feature.title}</h3>
                <p className="text-gray leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-light">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">The Cost of Missed Calls</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <p className="text-4xl font-extrabold text-primary">62%</p>
              <p className="mt-2 text-gray">of calls to small businesses go unanswered</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-extrabold text-primary">85%</p>
              <p className="mt-2 text-gray">of callers who can&apos;t reach you won&apos;t call back</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-extrabold text-primary">$1,200+</p>
              <p className="mt-2 text-gray">average monthly revenue lost to missed calls</p>
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Stop Missing Calls Today"
        description="For less than the cost of a single missed appointment, get an AI receptionist that works 24/7."
        buttonText="Start for $30/month"
      />
    </>
  );
}
