import Link from "next/link";
import CTA from "@/components/CTA";
import { jsonLd } from "@/lib/metadata";

const services = [
  {
    title: "Custom App",
    price: "$60",
    description: "A fully branded mobile app for your business. Online booking, push notifications, loyalty programs, and more — all with your logo.",
    href: "/custom-app",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    title: "AI Receptionist",
    price: "$30",
    description: "Never miss a call again. Our AI answers phones, books appointments, and handles inquiries 24/7 — just like a real receptionist.",
    href: "/ai-receptionist",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    title: "Self Check-In Kiosk",
    price: "$20",
    description: "Let clients check themselves in on a tablet when they arrive. Reduces wait times and frees up your front desk staff.",
    href: "/self-check-in",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
      </svg>
    ),
  },
  {
    title: "AI Agents",
    price: "Custom",
    description: "Automate any part of your business with custom AI agents. From follow-up texts to inventory management — we build it for you.",
    href: "/ai-agents",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
];

const industries = [
  "Barbershops",
  "Hair Salons",
  "Massage Therapy",
  "Nail Salons",
  "Med Spas",
  "Tattoo Studios",
  "Beauty Studios",
  "Wellness Centers",
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd.softwareApplication(
            "Desk Duo",
            "All-in-one software platform for salons, barbershops, and wellness businesses",
            "20"
          )),
        }}
      />

      {/* Hero */}
      <section className="gradient-bg pt-20 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Your Front Desk,
            <br />
            <span className="text-white/90">Powered by AI</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Custom apps, AI receptionists, self check-in kiosks, and intelligent agents
            built specifically for salons, barbershops, and wellness businesses.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-light transition-colors text-lg"
            >
              Book a Free Demo
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-lg"
            >
              View Pricing
            </Link>
          </div>
          <p className="mt-6 text-white/60 text-sm">Starting at just $20/month. No contracts. Cancel anytime.</p>
        </div>
      </section>

      {/* Industries */}
      <section className="py-12 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray text-sm font-medium mb-6">TRUSTED BY BUSINESSES ACROSS THE INDUSTRY</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {industries.map((industry) => (
              <span key={industry} className="text-dark font-semibold text-sm sm:text-base">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark">Everything Your Business Needs</h2>
            <p className="mt-4 text-gray text-lg max-w-2xl mx-auto">
              One platform, four powerful products. Mix and match to fit your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group p-8 rounded-2xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-xl font-bold text-dark">{service.title}</h3>
                      <span className="text-primary font-semibold">{service.price}/mo</span>
                    </div>
                    <p className="mt-2 text-gray leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark">Up and Running in Days, Not Months</h2>
            <p className="mt-4 text-gray text-lg">We handle the heavy lifting so you can focus on your clients.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Tell Us About Your Business",
                description: "We learn your services, branding, and workflow. A quick 15-minute call is all it takes.",
              },
              {
                step: "2",
                title: "We Build It For You",
                description: "Our team sets everything up — your app, AI receptionist, kiosk, or agents — customized to your business.",
              },
              {
                step: "3",
                title: "Go Live & Grow",
                description: "Launch in days. We provide ongoing support, updates, and optimization as your business grows.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center p-8">
                <div className="w-14 h-14 gradient-bg rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{item.title}</h3>
                <p className="text-gray leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The AI receptionist has been a game changer. We used to miss 30% of our calls — now we never miss one.",
                name: "Marcus T.",
                role: "Owner, Fresh Cuts Barbershop",
              },
              {
                quote: "Our custom app lets clients book anytime. We've seen a 40% increase in repeat bookings since launching.",
                name: "Jasmine R.",
                role: "Manager, Glow Beauty Studio",
              },
              {
                quote: "The self check-in kiosk freed up our front desk completely. Clients love how smooth it is.",
                name: "David L.",
                role: "Owner, Zen Massage & Wellness",
              },
            ].map((testimonial, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gray-light">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-dark leading-relaxed mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="font-semibold text-dark">{testimonial.name}</p>
                <p className="text-gray text-sm">{testimonial.role}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/reviews" className="text-primary font-semibold hover:underline">
              Read more reviews &rarr;
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
