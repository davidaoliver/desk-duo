import Link from "next/link";

const footerLinks = {
  Products: [
    { href: "/custom-app", label: "Custom App" },
    { href: "/ai-receptionist", label: "AI Receptionist" },
    { href: "/self-check-in", label: "Self Check-In" },
    { href: "/ai-agents", label: "AI Agents" },
  ],
  Company: [
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold">
              Desk Duo
            </Link>
            <p className="mt-4 text-gray max-w-md">
              The all-in-one software platform for salons, barbershops, and wellness businesses.
              Modernize your front desk with AI-powered tools.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray hover:text-white transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-dark-light mt-12 pt-8 text-center text-gray text-sm">
          &copy; {new Date().getFullYear()} Desk Duo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
