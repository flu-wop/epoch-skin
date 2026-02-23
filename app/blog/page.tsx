import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Skincare tips, waxing advice, and beauty insights from Epoch Skin.",
};

const dummyPosts = [
  {
    id: 1,
    title: "5 Tips for Post-Wax Skin Care",
    excerpt: "Learn how to care for your skin after waxing to prevent irritation and achieve the best results.",
    date: "February 15, 2026",
    slug: "post-wax-skin-care-tips",
  },
  {
    id: 2,
    title: "The Benefits of Organic Skincare",
    excerpt: "Discover why organic ingredients are better for your skin and the environment.",
    date: "February 10, 2026",
    slug: "benefits-organic-skincare",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen py-20 bg-sand/10">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Skincare tips, waxing advice, and beauty insights from our experts.
            </p>
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-clay-50 border border-clay-200 rounded-lg p-8 text-center mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              Coming Soon!
            </h2>
            <p className="text-gray-600">
              We're working on bringing you valuable content about skincare, waxing, and wellness. 
              Check back soon for our latest articles.
            </p>
          </div>

          {/* Dummy Posts Preview */}
          <div className="space-y-8">
            <h3 className="text-2xl font-serif font-bold text-gray-900">
              Recent Articles (Preview)
            </h3>
            
            {dummyPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow"
              >
                <time className="text-sm text-gray-500">{post.date}</time>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mt-2 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <span className="text-clay-600 font-medium hover:text-clay-700 cursor-not-allowed opacity-50">
                  Read More →
                </span>
              </article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-12 bg-sage-50 border border-sage-200 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              Get Notified
            </h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter to be the first to know when we publish new articles.
            </p>
            <Link
              href="/#newsletter"
              className="inline-block px-6 py-3 bg-clay-500 text-white rounded-lg font-semibold hover:bg-clay-600 transition-colors"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
