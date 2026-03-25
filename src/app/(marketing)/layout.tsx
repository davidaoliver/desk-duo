import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { jsonLd } from "@/lib/metadata";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.organization) }}
      />
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
