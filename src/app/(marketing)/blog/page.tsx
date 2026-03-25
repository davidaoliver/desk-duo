import { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = createMetadata({
  title: "Blog — Tips for Salons, Barbershops & Wellness",
  description:
    "Expert tips, guides, and industry insights for salon owners, barbers, and wellness professionals. Learn how to grow your business with technology.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <section className="gradient-bg pt-20 pb-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            The Desk Duo Blog
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            Tips, guides, and insights to help you grow your salon, barbershop, or wellness business.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-8 rounded-2xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray text-sm">{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>
                <h2 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-gray leading-relaxed">{post.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
