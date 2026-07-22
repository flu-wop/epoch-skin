// app/api/newsletter-engine/approve/route.ts
// Hit from the two buttons in the draft review email. GET only (email-link
// friendly) but protected by a signed, expiring, single-purpose token — not
// a bare guessable URL. Approve renders the final subscriber email from the
// stored items and batch-sends via Resend; reject just marks the issue.

import { NextRequest, NextResponse } from 'next/server';
import { verifyIssueToken, signUnsubscribeToken } from '@/lib/newsletter-engine/tokens';
import { getIssueById, markIssueStatus, claimIssueForApproval, claimIssueForRejection, getActiveSubscribers } from '@/lib/newsletter-engine/db';
import { renderSubscriberEmail } from '@/lib/newsletter-engine/template';
import { newsletterConfig } from '@/lib/newsletter-engine/config';
import { getResend } from '@/lib/email';

function page(title: string, body: string) {
  return `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:480px;margin:80px auto;text-align:center;color:#222">
    <h2>${title}</h2><p>${body}</p></body></html>`;
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token') ?? '';
  const verified = verifyIssueToken(token);
  if (!verified) {
    return new NextResponse(page('Link expired or invalid', 'Approve/reject links are single-purpose and expire after 7 days.'), {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  const { issueId, action } = verified;
  const issue = await getIssueById(issueId);
  if (!issue) {
    return new NextResponse(page('Issue not found', `#${issueId} doesn't exist.`), { status: 404, headers: { 'Content-Type': 'text/html' } });
  }

  if (action === 'reject') {
    // Atomic claim: only transitions draft → rejected. If this issue was
    // already approved/rejected/sent (including by a concurrent request —
    // e.g. an email link-scanner prefetching this same link), the claim
    // fails harmlessly instead of racing a plain check-then-write.
    const claimed = await claimIssueForRejection(issueId);
    if (!claimed) {
      return new NextResponse(
        page('Already handled', `Issue #${issueId} is already marked "${issue.status}".`),
        { headers: { 'Content-Type': 'text/html' } }
      );
    }
    return new NextResponse(page('Rejected', `Issue #${issueId} won't be sent.`), { headers: { 'Content-Type': 'text/html' } });
  }

  // action === 'approve'
  const items = issue.sources_json ? JSON.parse(issue.sources_json) : [];
  if (!items.length || !issue.subject) {
    return new NextResponse(page('Nothing to send', `Issue #${issueId} has no items — was it a skip?`), {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // Atomic claim: only one concurrent request can win this (draft →
  // approved) transition. Whoever doesn't win sees "already handled"
  // instead of both proceeding to send to the whole list.
  const claimed = await claimIssueForApproval(issueId);
  if (!claimed) {
    return new NextResponse(
      page('Already handled', `Issue #${issueId} is already marked "${issue.status}".`),
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  const subscribers = await getActiveSubscribers();
  const resend = getResend();
  const BATCH_SIZE = 100; // Resend batch send limit

  let sentCount = 0;
  const failures: string[] = [];

  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const chunk = subscribers.slice(i, i + BATCH_SIZE);
    const emails = chunk.map((sub) => {
      const unsubToken = signUnsubscribeToken(sub.email);
      const unsubscribeUrl = `${newsletterConfig.siteUrl}/api/newsletter-engine/unsubscribe?token=${unsubToken}`;
      const rendered = renderSubscriberEmail(issue.subject!, items, unsubscribeUrl);
      return {
        from: newsletterConfig.fromEmail,
        to: sub.email,
        subject: issue.subject!,
        html: rendered.html,
        text: rendered.text,
        headers: {
          'List-Unsubscribe': `<${unsubscribeUrl}>, <mailto:${newsletterConfig.fromEmail}?subject=unsubscribe>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      };
    });

    try {
      await resend.batch.send(emails);
      sentCount += emails.length;
    } catch (err) {
      console.error('[newsletter-engine] batch send failed:', err);
      failures.push(`batch starting at ${i}`);
    }
  }

  await markIssueStatus(issueId, 'sent');

  return new NextResponse(
    page(
      'Sent',
      `Issue #${issueId} went out to ${sentCount} subscriber${sentCount === 1 ? '' : 's'}.${
        failures.length ? ` ${failures.length} batch(es) failed — check logs.` : ''
      }`
    ),
    { headers: { 'Content-Type': 'text/html' } }
  );
}
