import { Metadata } from "next";
import CTA from "@/components/CTA";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Customer Reviews — What Our Clients Say",
  description:
    "Read reviews from real salon owners, barbers, and wellness professionals who use Desk Duo to run their businesses.",
  path: "/reviews",
});

const reviews = [
  {
    quote: "The AI receptionist has been a game changer. We used to miss 30% of our calls — now we never miss one. Our bookings are up and we didn't have to hire anyone.",
    name: "Marcus T.",
    business: "Fresh Cuts Barbershop",
    product: "AI Receptionist",
    rating: 5,
  },
  {
    quote: "Our custom app lets clients book anytime. We've seen a 40% increase in repeat bookings since launching. Clients love the loyalty rewards too.",
    name: "Jasmine R.",
    business: "Glow Beauty Studio",
    product: "Custom App",
    rating: 5,
  },
  {
    quote: "The self check-in kiosk freed up our front desk completely. Clients love how smooth it is. We just put an iPad on a stand and it works perfectly.",
    name: "David L.",
    business: "Zen Massage & Wellness",
    product: "Self Check-In Kiosk",
    rating: 5,
  },
  {
    quote: "We were spending hours every week sending follow-up texts manually. Now our AI agent handles all of it — rebooking reminders, review requests, birthday messages. It's like having an extra employee.",
    name: "Angela M.",
    business: "Studio 54 Hair",
    product: "AI Agents",
    rating: 5,
  },
  {
    quote: "I was skeptical about the AI receptionist at first, but it sounds so natural. Clients have told me they didn't even realize it wasn't a real person. Best $30 I spend each month.",
    name: "Carlos D.",
    business: "The Gentlemen's Quarter",
    product: "AI Receptionist",
    rating: 5,
  },
  {
    quote: "Having our own app with our logo on it makes us look way more professional than the competition. Clients open it to book instead of going to Google. That's huge for us.",
    name: "Brittany S.",
    business: "Luxe Nails & Spa",
    product: "Custom App",
    rating: 5,
  },
  {
    quote: "We run a busy shop — 8 chairs, walk-ins all day. The check-in kiosk keeps everything organized. No more shouting names across the shop. Everyone knows who's next.",
    name: "Ray J.",
    business: "King's Barbershop",
    product: "Self Check-In Kiosk",
    rating: 5,
  },
  {
    quote: "Desk Duo built us an AI agent that sends a text to no-shows asking them to rebook. We've recovered about $2,000 in lost revenue in the first month alone.",
    name: "Sarah K.",
    business: "Bliss Massage Therapy",
    product: "AI Agents",
    rating: 5,
  },
  {
    quote: "The team at Desk Duo actually understands our industry. They're not some generic software company — they know what barbershops and salons need. Setup was painless.",
    name: "Terrence W.",
    business: "T's Fade Factory",
    product: "AI Receptionist + Custom App",
    rating: 5,
  },
];

export default function ReviewsPage() {
  return (
    <>
      <section className="gradient-bg pt-20 pb-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Real Reviews from Real Businesses
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Hear what salon owners, barbers, and wellness
            professionals have to say about Desk Duo.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-light">
                <div className="flex gap-1 text-yellow-400 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-dark leading-relaxed mb-4">&ldquo;{review.quote}&rdquo;</p>
                <div className="border-t border-gray-200 pt-3">
                  <p className="font-semibold text-dark">{review.name}</p>
                  <p className="text-gray text-sm">{review.business}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {review.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Join These Happy Businesses"
        description="See why businesses across the industry are switching to Desk Duo."
      />
    </>
  );
}
