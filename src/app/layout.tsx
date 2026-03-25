import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { jsonLd } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Desk Duo — Software for Salons, Barbershops & Wellness",
    template: "%s | Desk Duo",
  },
  description:
    "All-in-one software platform for salons, barbershops, and massage therapy businesses. Custom apps, AI receptionists, self check-in kiosks, and AI agents starting at $20/mo.",
  metadataBase: new URL("https://getdeskduo.com"),
  keywords: [
    "salon software",
    "barbershop software",
    "AI receptionist",
    "self check-in kiosk",
    "appointment booking app",
    "massage therapy software",
    "beauty salon management",
    "barber shop app",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://getdeskduo.com" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://getdeskduo.com",
    siteName: "Desk Duo",
    title: "Desk Duo — Software for Salons, Barbershops & Wellness",
    description:
      "Custom apps, AI receptionists, self check-in kiosks, and AI agents for your business. Starting at $20/mo.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.organization) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
