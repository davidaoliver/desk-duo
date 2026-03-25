import Link from "next/link";

export default function CTA({
  title = "Ready to Modernize Your Business?",
  description = "Join hundreds of salons, barbershops, and wellness businesses already using Desk Duo to streamline their operations.",
  buttonText = "Get Started Today",
  buttonHref = "/contact",
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}) {
  return (
    <section className="gradient-bg py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{title}</h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">{description}</p>
        <Link
          href={buttonHref}
          className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-light transition-colors text-lg"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
