import { Container } from "@/components/layout/Container";
import { blogPosts } from "@/data/blog-posts";
import Link from "next/link";
import Image from "next/image";

// Map blog post slugs to their images.
// Adjust these paths if your blog-posts data uses different slugs.
const postImages: Record<string, string> = {
  "botanical-ingredients-skincare": "/images/blog/botanical-lay.png",
  "glass-skin-routine":             "/images/blog/glass-skin.png",
  "brazilian-wax-guide":            "/images/blog/brazilian-wax.png",
};

// Fallback: assign images in order if slugs don't match exactly
const orderedImages = [
  "/images/blog/botanical-lay.png",
  "/images/blog/glass-skin.png",
  "/images/blog/brazilian-wax.png",
];

export default function BlogPage() {
  return (
    <main className="min-h-screen py-20">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
            Skincare & Wellness Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert tips, organic skincare insights, and waxing advice from our licensed estheticians
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => {
            const imageSrc =
              postImages[post.slug] || orderedImages[index] || orderedImages[0];

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Featured Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-sand-100">
                  <Image
                    src={imageSrc}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                    <span className="px-3 py-1 bg-clay-100 text-clay-700 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>

                  <h2 className="text-xl font-serif font-semibold text-gray-900 mb-3 group-hover:text-clay-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center text-clay-600 font-medium group-hover:text-clay-700">
                    Read More
                    <svg
                      className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>

                  <div className="mt-4 pt-4 border-t border-sage-100 text-sm text-gray-500">
                    By {post.author}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 max-w-2xl mx-auto text-center bg-sand-50 rounded-lg p-8">
          <h3 className="text-2xl font-serif text-gray-900 mb-4">
            Get Skincare Tips Delivered
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for organic skincare advice, exclusive offers, and new product launches.
          </p>
          <Link
            href="/#newsletter"
            className="inline-block px-6 py-3 bg-clay-500 hover:bg-clay-600 text-white font-medium rounded transition-colors"
          >
            Subscribe Now
          </Link>
        </div>
      </Container>
    </main>
  );
}
