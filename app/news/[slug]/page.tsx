// app/news/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { getSentIssueBySlug } from '@/lib/newsletter-engine/db';
import { newsletterConfig } from '@/lib/newsletter-engine/config';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issue = await getSentIssueBySlug(newsletterConfig.client, slug);
  if (!issue) return {};
  return {
    title: `${issue.blog_title} | ${newsletterConfig.brandName}`,
    alternates: { canonical: `${newsletterConfig.siteUrl}/news/${slug}` },
  };
}

export default async function NewsIssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issue = await getSentIssueBySlug(newsletterConfig.client, slug);
  if (!issue || !issue.blog_md) notFound();

  // The blog body comes from model output (research + drafting, reviewed at
  // the headline/subject level via the approval email — not word-by-word).
  // Strip any raw HTML before handing it to marked so nothing embedded in
  // the markdown (accidental or from a prompt-injected source page) can
  // render as live HTML on this public page. Legitimate content never needs
  // raw HTML tags in markdown, so this only removes attack surface.
  const safeMd = issue.blog_md.replace(/<[^>]*>/g, '');
  const html = await marked.parse(safeMd);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <span className="text-xs text-[#AAA]">
          {issue.sent_at ? new Date(issue.sent_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
        </span>
        <h1 className="font-serif text-3xl md:text-4xl text-[#111] mt-3 mb-8 leading-tight">{issue.blog_title}</h1>
        <div className="newsletter-content" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  );
}
