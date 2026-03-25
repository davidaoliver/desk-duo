import { Metadata } from "next";
import CTA from "@/components/CTA";
import { createMetadata, jsonLd } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Self Check-In Kiosk Software for Salons",
  description:
    "Let clients check themselves in on a tablet. Reduce wait times, free up staff, and modernize your lobby for just $20/month.",
  path: "/self-check-in",
});

const features = [
  {
    title: "Tablet-Based Check-In",
    description: "Clients tap their name or scan a QR code when they arrive. Works on any tablet — iPad, Android, or Fire.",
  },
  {
    title: "Real-Time Queue Management",
    description: "See who's waiting, who's next, and estimated wait times. Keep your team informed and clients happy.",
  },
  {
    title: "Custom Branding",
    description: "The kiosk screen matches your brand — your logo, colors, and welcome message. A polished first impression.",
  },
  {
    title: "Walk-In Support",
    description: "Walk-in clients can join the queue and see their estimated wait time. No more guessing.",
  },
  {
    title: "Service Selection",
    description: "Clients pick their service and preferred stylist at check-in. Your team knows exactly what's needed before the client sits down.",
  },
  {
    title: "Notifications",
    description: "Staff get notified when clients check in. Clients get a text when it's their turn. Everyone stays in the loop.",
  },
];

export default function SelfCheckInPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd.softwareApplication(
            "Desk Duo Self Check-In Kiosk",
            "Self check-in kiosk software for salons and barbershops with queue management and notifications",
            "20"
          )),
        }}
      />

      <section className="gradient-bg pt-20 pb-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Self Check-In Kiosk
            <br />
            <span className="text-white/90">for $20/month</span>
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            A sleek, modern check-in experience for your clients. Just set up a tablet in your lobby
            and let clients check themselves in when they arrive.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark">A Better Lobby Experience</h2>
            <p className="mt-4 text-gray text-lg">Modern, efficient, and impressive to every client who walks in.</p>
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

      <CTA
        title="Modernize Your Lobby Today"
        description="Transform your client experience for less than a dollar a day."
        buttonText="Start for $20/month"
      />
    </>
  );
}
