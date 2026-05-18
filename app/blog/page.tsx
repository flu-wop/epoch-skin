// app/blog/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/lib/blog-posts';

export const metadata = {
  title: 'Journal | Epoch Skin',
  description: 'Skincare guides, waxing tips, organic ingredient education, and studio news from Epoch Skin.',
  alternates: { canonical: 'https://epoch-skin.com/blog' },
  openGraph: {
    title: 'Journal | Epoch Skin',
    description: 'Skincare guides, waxing tips, and organic ingredient education.',
    url: 'https://epoch-skin.com/blog',
    siteName: 'Epoch Skin',
    images: [{ url: 'https://epoch-skin.com/og/og-blog.jpg', width: 1200, height: 630 }],
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">The Epoch Journal</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#111] mb-5">Skincare, Simplified</h1>
          <p className="text-[#888] max-w-md mx-auto leading-relaxed">
            Honest guides, studio tips, and organic ingredient education from our licensed estheticians.
          </p>
        </div>

        {/* Featured post */}
        {BLOG_POSTS[0] && (
          <Link href={`/blog/${BLOG_POSTS[0].slug}`} className="group block mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[4/3] bg-[#F5EDD8] overflow-hidden">
                <Image
                  src={BLOG_POSTS[0].image}
                  alt={BLOG_POSTS[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                   // graceful fallback handled by bg color
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs tracking-widest uppercase text-[#D4AF77]">{BLOG_POSTS[0].category}</span>
                  <span className="text-[#DDD]">·</span>
                  <span className="text-xs text-[#AAA]">{BLOG_POSTS[0].readTime}</span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-[#111] mb-4 leading-snug group-hover:text-[#D4AF77] transition-colors">
                  {BLOG_POSTS[0].title}
                </h2>
                <p className="text-[#666] leading-relaxed mb-5">{BLOG_POSTS[0].excerpt}</p>
                <span className="text-xs tracking-widest uppercase text-[#D4AF77] border-b border-[#D4AF77] pb-0.5">
                  Read Article
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Divider */}
        <div className="border-t border-[#E8E0D0] mb-16" />

        {/* Remaining posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {BLOG_POSTS.slice(1).map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="relative aspect-[16/9] bg-[#F5EDD8] overflow-hidden mb-5">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs tracking-widest uppercase text-[#D4AF77]">{post.category}</span>
                <span className="text-[#DDD]">·</span>
                <span className="text-xs text-[#AAA]">{post.readTime}</span>
              </div>
              <h2 className="font-serif text-xl text-[#111] mb-3 leading-snug group-hover:text-[#D4AF77] transition-colors">
                {post.title}
              </h2>
              <p className="text-[#888] text-sm leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
