// lib/newsletter-engine/config.ts
// Per-client config for the newsletter engine. One object per site — copy this
// file's shape when rolling the engine out to another client (fluhaul, MCS, etc).

export const newsletterConfig = {
  client: 'epoch-skin',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://epoch-skin.com',
  brandName: 'Epoch Skin',
  founderFirstName: 'Kayla', // surname stays off-site per brand rule

  niche: 'organic skincare and premium waxing (New Orleans)',
  audience:
    "Epoch Skin's newsletter subscribers — clients and prospective clients of a premium waxing studio and organic skincare line in New Orleans.",

  tone:
    'Warm, elevated, unfussy. Confident expertise without being clinical. Never salesy or listicle-filler. Write like a knowledgeable esthetician talking to someone she respects.',

  bannedTopics: [
    'medical claims of any kind (no "cures", "treats", "clinically proven" language)',
    'financial or legal advice',
    'competitor names',
    'anything about specific customers or their appointments',
  ],

  // Brand colors reused from the site (June 2026 palette) for the email template.
  brand: {
    sage: '#2E3A2C',
    sageLight: '#3E4A3C',
    beige: '#F5F0E8',
    gold: '#C4974A',
  },

  approverEmail: process.env.APPROVER_EMAIL ?? 'flu.wop@gmail.com',
  fromEmail: process.env.RESEND_FROM_EMAIL ?? 'hello@epoch-skin.com',

  // Content guardrails (hard rules — see newsletter-engine skill/spec)
  guardrails: {
    everyClaimNeedsSource: true,
    maxItems: 4,
    minItems: 2, // fewer than this → skip recommendation instead of padding
  },
} as const;

export type NewsletterConfig = typeof newsletterConfig;
