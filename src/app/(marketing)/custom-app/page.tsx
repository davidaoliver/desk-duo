import { Metadata } from "next";
import CTA from "@/components/CTA";
import { createMetadata, jsonLd } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Custom App for Salons & Barbershops",
  description:
    "Get a fully branded mobile app for your salon or barbershop. Online booking, push notifications, loyalty programs, and client management — $60/month.",
  path: "/custom-app",
});

const features = [
  {
    title: "Your Brand, Your App",
    description: "Fully customized with your logo, colors, and branding. Your clients will think you spent thousands on development.",
  },
  {
    title: "Online Booking",
    description: "Clients can browse your services, see availability, and book appointments 24/7 — right from their phone.",
  },
  {
    title: "Push Notifications",
    description: "Send appointment reminders, promotions, and updates directly to your clients' phones. No more no-shows.",
  },
  {
    title: "Loyalty Programs",
    description: "Built-in reward systems to keep clients coming back. Punch cards, points, referral bonuses — all digital.",
  },
  {
    title: "Client Management",
    description: "Track client history, preferences, notes, and contact info all in one place. Know your clients inside and out.",
  },
  {
    title: "Payment Integration",
    description: "Accept payments, tips, and deposits right through the app. Seamless checkout experience for your clients.",
  },
];

export default function CustomAppPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd.softwareApplication(
            "Desk Duo Custom App",
            "Fully branded mobile app for salons and barbershops with online booking, push notifications, and loyalty programs",
            "60"
          )),
        }}
      />

      <section className="gradient-bg pt-20 pb-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Your Own Branded App
            <br />
            <span className="text-white/90">for $60/month</span>
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            A custom mobile app built for your business. We handle everything — design, development, and updates.
            All you do is watch your bookings grow.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark">Everything You Need in an App</h2>
            <p className="mt-4 text-gray text-lg">No development skills required. We build and maintain it for you.</p>
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
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dark mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">1</div>
              <h3 className="font-bold text-dark mb-2">Share Your Vision</h3>
              <p className="text-gray">Tell us about your brand, services, and what you want your app to do.</p>
            </div>
            <div>
              <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">2</div>
              <h3 className="font-bold text-dark mb-2">We Build It</h3>
              <p className="text-gray">Our team designs and develops your custom app in just a few days.</p>
            </div>
            <div>
              <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">3</div>
              <h3 className="font-bold text-dark mb-2">Launch & Grow</h3>
              <p className="text-gray">We publish your app and provide ongoing updates and support.</p>
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Get Your Custom App Today"
        description="Join businesses already growing with their own branded app. Setup takes just days."
        buttonText="Start for $60/month"
      />
    </>
  );
}
