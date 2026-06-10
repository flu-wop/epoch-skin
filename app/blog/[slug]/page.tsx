// app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS, getPost } from '@/lib/blog-posts';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Epoch Skin Journal`,
    description: post.excerpt,
    alternates: { canonical: `https://epoch-skin.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://epoch-skin.com/blog/${slug}`,
      siteName: 'Epoch Skin',
      images: [{ url: `https://epoch-skin.com${post.image}`, width: 1200, height: 630 }],
      type: 'article',
      publishedTime: post.date,
    },
  };
}

// Minimal markdown renderer (no external dep needed for this content)
function renderContent(content: string) {
  return content
    .split('\n\n')
    .map((para, i) => {
      if (para.startsWith('## ')) {
        return <h2 key={i} className="font-serif text-2xl text-[#111] mt-10 mb-4">{para.slice(3)}</h2>;
      }
      if (para.startsWith('### ')) {
        return <h3 key={i} className="font-serif text-xl text-[#111] mt-8 mb-3">{para.slice(4)}</h3>;
      }
      if (para.startsWith('**') && para.endsWith('**')) {
        return <p key={i} className="font-semibold text-[#333] mb-4">{para.slice(2, -2)}</p>;
      }
      // List items
      if (para.includes('\n- ')) {
        const lines = para.split('\n').filter(Boolean);
        const intro = lines[0].startsWith('- ') ? null : lines[0];
        const items = lines.filter(l => l.startsWith('- ')).map(l => l.slice(2));
        return (
          <div key={i} className="mb-6">
            {intro && <p className="text-[#444] leading-relaxed mb-2">{processInline(intro)}</p>}
            <ul className="list-disc list-inside space-y-1.5 text-[#555]">
              {items.map((item, j) => <li key={j}>{processInline(item)}</li>)}
            </ul>
          </div>
        );
      }
      if (para.startsWith('- ')) {
        const items = para.split('\n').filter(l => l.startsWith('- ')).map(l => l.slice(2));
        return (
          <ul key={i} className="list-disc list-inside space-y-1.5 text-[#555] mb-6">
            {items.map((item, j) => <li key={j}>{processInline(item)}</li>)}
          </ul>
        );
      }
      if (para.startsWith('*') && para.endsWith('*')) {
        return <p key={i} className="italic text-[#888] text-sm border-l-2 border-[#D4AF77] pl-4 mb-6">{para.slice(1, -1)}</p>;
      }
      return <p key={i} className="text-[#444] leading-relaxed mb-5">{processInline(para)}</p>;
    });
}

// Bold/italic inline processing
function processInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Hero */}
      <div className="relative h-64 md:h-96 bg-[#F5EDD8] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 max-w-3xl mx-auto">
          <span className="text-xs tracking-widest uppercase text-[#D4AF77]">{post.category}</span>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-2xl mx-auto px-6 py-12">
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-[#AAA] mb-6">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-[#111] mb-8 leading-tight">
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-3 mb-10 pb-10 border-b border-[#E8E0D0]">
          <div className="w-10 h-10 rounded-full bg-[#D4AF77]/20 flex items-center justify-center">
            <span className="text-[#D4AF77] font-serif text-sm">K</span>
          </div>
          <div>
            <p className="text-sm font-medium text-[#111]">Kayla Ford</p>
            <p className="text-xs text-[#AAA]">Founder & Licensed Esthetician</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose-custom">
          {renderContent(post.content)}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-[#F5EDD8] border border-[#D4AF77]/20 text-center">
          <p className="font-serif text-xl text-[#111] mb-3">Ready to experience it in the studio?</p>
          <p className="text-[#888] text-sm mb-6">Our licensed estheticians are here for you.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/book" className="px-8 py-3 bg-[#3E4A3C] text-[#C4974A] text-xs tracking-widest uppercase hover:bg-[#C4974A] hover:text-white transition-colors">
              Book Appointment
            </Link>
            <Link href="/shop" className="px-8 py-3 border border-[#3E4A3C] text-[#3E4A3C] text-xs tracking-widest uppercase hover:border-[#D4AF77] hover:text-[#D4AF77] transition-colors">
              Shop Skincare
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <div className="max-w-3xl mx-auto px-6 py-12 border-t border-[#E8E0D0]">
          <h2 className="font-serif text-2xl text-[#111] mb-8">More from the Journal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {related.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                <div className="relative aspect-[16/9] bg-[#F5EDD8] overflow-hidden mb-4">
                  <Image src={p.image} alt={p.title} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-500" sizes="50vw" />
                </div>
                <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-2">{p.category}</p>
                <h3 className="font-serif text-lg text-[#111] group-hover:text-[#D4AF77] transition-colors leading-snug">{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back */}
      <div className="text-center py-8">
        <Link href="/blog" className="text-xs tracking-widest uppercase text-[#888] hover:text-[#D4AF77] transition-colors">
          ← Back to Journal
        </Link>
      </div>
    </div>
  );
}
