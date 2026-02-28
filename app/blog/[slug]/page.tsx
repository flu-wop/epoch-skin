import { Container } from "@/components/layout/Container";
import { blogPosts } from "@/data/blog-posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-20">
      <Container>
        <article className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center text-clay-600 hover:text-clay-700 mb-8"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
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

            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 text-sm text-gray-600 pb-6 border-b border-sage-200">
              <span>By {post.author}</span>
            </div>
          </header>

          {/* Featured Image Placeholder */}
          <div className="relative aspect-[16/9] overflow-hidden bg-sand-100 rounded-lg mb-12">
            <div className="absolute inset-0 bg-gradient-to-br from-sand-200 to-sage-100 flex items-center justify-center">
              <span className="text-gray-500">Featured Image</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div
              className="text-gray-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .split('\n')
                  .map(line => {
                    if (line.startsWith('# ')) {
                      return `<h1 class="text-4xl font-serif text-gray-900 mb-4 mt-8">${line.slice(2)}</h1>`;
                    } else if (line.startsWith('## ')) {
                      return `<h2 class="text-3xl font-serif text-clay-600 mb-3 mt-6">${line.slice(3)}</h2>`;
                    } else if (line.startsWith('### ')) {
                      return `<h3 class="text-2xl font-serif text-gray-800 mb-2 mt-4">${line.slice(4)}</h3>`;
                    } else if (line.trim() === '') {
                      return '<br />';
                    } else {
                      return `<p>${line}</p>`;
                    }
                  })
                  .join('')
              }}
            />
          </div>

          {/* Share & CTA */}
          <div className="mt-12 pt-8 border-t border-sage-200">
            <div className="bg-sand-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-serif text-gray-900 mb-4">
                Ready to Transform Your Skin?
              </h3>
              <p className="text-gray-600 mb-6">
                Explore our collection of Organic Skincare products and book your waxing appointment today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/shop"
                  className="px-6 py-3 bg-clay-500 hover:bg-clay-600 text-white font-medium rounded transition-colors"
                >
                  Shop Organic Skincare
                </Link>
                <Link
                  href="/book"
                  className="px-6 py-3 border-2 border-clay-500 text-clay-600 hover:bg-clay-50 font-medium rounded transition-colors"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-12">
            <h3 className="text-2xl font-serif text-gray-900 mb-6">Related Posts</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts
                .filter((p) => p.slug !== post.slug)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group border border-sage-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <h4 className="font-serif text-lg font-semibold text-gray-900 mb-2 group-hover:text-clay-600">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}
