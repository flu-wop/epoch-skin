// app/news/page.tsx
// Newsletter archive — every sent issue's matching blog post, pulled live
// from Turso. This is the SEO/retainer-pitch payoff of the engine: each
// approved issue becomes a permanent, indexable page.

import Link from 'next/link';
import { getSentIssues } from '@/lib/newsletter-engine/db';
import { newsletterConfig } from '@/lib/newsletter-engine/config';

export const dynamic = 'force-dynamic'; // always reflect the latest sent issue

export const metadata = {
  title: `News | ${newsletterConfig.brandName}`,
  description: 'Skincare and studio news from the Epoch Skin newsletter.',
  alternates: { canonical: `${newsletterConfig.siteUrl}/news` },
};

export default async function NewsPage() {
  const issues = await getSentIssues(newsletterConfig.client);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest uppercase text-[#D4AF77] mb-3">Newsletter Archive</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#111] mb-5">News</h1>
          <p className="text-[#888] max-w-md mx-auto leading-relaxed">
            Past issues of the {newsletterConfig.brandName} newsletter.
          </p>
        </div>

        {issues.length === 0 ? (
          <p className="text-center text-[#999]">No issues yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {issues.map((issue) => (
              <Link key={issue.id} href={`/news/${issue.slug}`} className="group block border-b border-[#E8E0D0] pb-8">
                <span className="text-xs text-[#AAA]">
                  {issue.sent_at ? new Date(issue.sent_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
                </span>
                <h2 className="font-serif text-xl text-[#111] mt-2 mb-2 leading-snug group-hover:text-[#D4AF77] transition-colors">
                  {issue.blog_title}
                </h2>
                <span className="text-xs tracking-widest uppercase text-[#D4AF77] border-b border-[#D4AF77] pb-0.5">
                  Read
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
