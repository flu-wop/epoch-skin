// components/admin/insights/content.ts
// Kayla's content playbook (from her original dashboard), kept in one place.

export const PILLARS = [
  { id: 0, label: 'No post',               short: '—',          tip: '' },
  { id: 1, label: 'Before / After',        short: 'B/A',        tip: 'Film often' },
  { id: 2, label: 'Client Transformation', short: 'Client',     tip: 'Consent first' },
  { id: 3, label: 'Behind the Scenes',     short: 'BTS',        tip: 'Room, products, hands' },
  { id: 4, label: 'Tips & Care',           short: 'Tip',        tip: '20–30 sec' },
  { id: 5, label: 'Offer',                 short: 'Offer',      tip: 'Sparingly — 1 in 5 max' },
] as const;

export const OFFER_ID = 5;

export const CLIP_CHECKLIST = [
  'Written consent saved for any client footage',
  'Trimmed to 15–40 sec',
  '9:16 with blur fill if needed',
  'Serif caption in lower third',
  'Music from CapCut library',
  'Exported 1080p / 30fps',
  'Caption + hashtag block ready',
  'Moved to Epoch Clips/Posted',
];

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const POST_TARGET = { min: 4, max: 6 };

export const HASHTAGS = [
  { label: 'Skin & glow', tags: ['#glassskin', '#skincareroutine', '#organicskincare', '#neworleansesthetician', '#nolaskincare', '#facialtreatment', '#skintips'] },
  { label: 'Waxing', tags: ['#waxingstudio', '#brazilianwax', '#browwax', '#smoothskin', '#neworleansbeauty', '#nolawaxing', '#estheticianlife'] },
];

// Current site palette (app/globals.css + June 2026 conversion).
export const BRAND_COLORS = [
  { name: 'Parchment', hex: '#FAF7F2', ink: '#1C1C1A' },
  { name: 'Warm beige', hex: '#F2EBE0', ink: '#1C1C1A' },
  { name: 'Amber gold', hex: '#C4974A', ink: '#1C1C1A' },
  { name: 'Deep sage', hex: '#3E4A3C', ink: '#FFFFFF' },
  { name: 'Ink', hex: '#1C1C1A', ink: '#FFFFFF' },
];
