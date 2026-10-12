// lib/intake-forms.ts
// Single source of truth for the three client intake forms (facial, waxing,
// massage). The same definition drives the on-site form UI, server-side
// validation, and the PDF that gets emailed to Kayla.
//
// Wording follows the PDFs in public/forms/. Differences are noted inline.

export type FormType = 'facial' | 'waxing' | 'massage';

export const FORM_TYPES: FormType[] = ['facial', 'waxing', 'massage'];

export interface TextField {
  kind: 'text';
  id: string;
  label: string;
  type?: 'text' | 'tel' | 'email' | 'date' | 'number';
  required?: boolean;
  hint?: string;
  half?: boolean;
}
export interface TextAreaField {
  kind: 'textarea';
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
}
export interface ChecksField {
  kind: 'checks';
  id: string;
  label: string;
  hint?: string;
  // `detail`, when present, shows a short text box once the box is ticked.
  options: { id: string; label: string; detail?: string }[];
}
export interface RadioField {
  kind: 'radio';
  id: string;
  label: string;
  hint?: string;
  options: string[];
  // Optional follow-up text box, shown only when one of `whenAny` is chosen.
  detail?: { id: string; label: string; whenAny: string[] };
}
export interface ConsentField {
  kind: 'consent';
  id: string;
  paragraphs: string[];
}
export type Field = TextField | TextAreaField | ChecksField | RadioField | ConsentField;

export interface Section {
  id: string;
  title: string;
  intro?: string;
  fields: Field[];
}
export interface FormDef {
  type: FormType;
  title: string;
  sections: Section[];
}

// ── Shared building blocks ───────────────────────────────────────────────

const clientInfo: Section = {
  id: 'client',
  title: 'Client Information',
  fields: [
    { kind: 'text', id: 'fullName', label: 'Full name', required: true, half: true },
    { kind: 'text', id: 'dob', label: 'Date of birth', type: 'date', required: true, half: true },
    { kind: 'text', id: 'pronouns', label: 'Pronouns', half: true },
    { kind: 'text', id: 'address', label: 'Address' },
    { kind: 'text', id: 'phone', label: 'Phone', type: 'tel', required: true, half: true },
    { kind: 'text', id: 'email', label: 'Email', type: 'email', required: true, half: true },
    {
      kind: 'text', id: 'referral', label: 'How did you hear about Epoch Skin?',
      hint: 'e.g., Instagram, referral, website, walk-in',
    },
    { kind: 'text', id: 'ecName', label: 'Emergency contact — name', required: true, half: true },
    { kind: 'text', id: 'ecPhone', label: 'Emergency contact — phone', type: 'tel', required: true, half: true },
    { kind: 'text', id: 'ecRelation', label: 'Relation', half: true },
  ],
};

const recentUse: ChecksField = {
  kind: 'checks',
  id: 'recentUse',
  label: 'Have you used any of the following in the last 6–12 months?',
  hint: 'Check and note last use',
  options: [
    { id: 'retinoids', label: 'Retin-A / Retinol / Tretinoin / Vitamin A derivatives', detail: 'Last use' },
    { id: 'acids', label: 'AHAs / BHAs / chemical exfoliants', detail: 'Last use' },
    { id: 'accutane', label: 'Accutane / isotretinoin', detail: 'Last use' },
    { id: 'antibiotics', label: 'Antibiotics or other prescriptions affecting skin', detail: 'Last use' },
  ],
};

const skinTypes: ChecksField = {
  kind: 'checks',
  id: 'skinType',
  label: 'What best describes your skin type?',
  hint: 'Check all that apply',
  options: [
    { id: 'normal', label: 'Normal' },
    { id: 'dry', label: 'Dry / dehydrated' },
    { id: 'oily', label: 'Oily' },
    { id: 'combo', label: 'Combination' },
    { id: 'sensitive', label: 'Sensitive / reactive' },
    { id: 'mature', label: 'Mature / aging' },
    { id: 'acne', label: 'Acne-prone / congested' },
  ],
};

const concerns = (label: string): Field[] => [
  {
    kind: 'text', id: 'concern1', label: `${label} — #1`,
    hint: 'Examples: glass skin glow, hydration, brightening / even tone, acne / breakouts, redness / sensitivity, fine lines / wrinkles, firmness / lifting, texture / pores, dark spots / hyperpigmentation, post-Mardi Gras recovery, humidity defense',
  },
  { kind: 'text', id: 'concern2', label: `${label} — #2` },
  { kind: 'text', id: 'concern3', label: `${label} — #3` },
];

const routine = (changesLabel: string): Section => ({
  id: 'routine',
  title: 'Current Skincare Routine',
  fields: [
    { kind: 'textarea', id: 'morning', label: 'Morning routine (products & frequency)' },
    { kind: 'textarea', id: 'evening', label: 'Evening routine (products & frequency)' },
    { kind: 'textarea', id: 'weekly', label: 'Weekly treatments (masks, exfoliants, tools, etc.)' },
    { kind: 'textarea', id: 'loveHate', label: 'Products you love or that irritate you' },
    { kind: 'textarea', id: 'recentChanges', label: changesLabel },
  ],
});

const lifestyle: Section = {
  id: 'lifestyle',
  title: 'Lifestyle & Wellness Factors',
  fields: [
    {
      kind: 'textarea', id: 'diet', label: 'Diet & hydration',
      hint: 'e.g., water intake per day, common foods, restrictions',
    },
    { kind: 'text', id: 'sleepHours', label: 'Average hours of sleep', half: true },
    { kind: 'text', id: 'sleepQuality', label: 'Sleep quality', half: true },
    { kind: 'text', id: 'exercise', label: 'Exercise / physical activity' },
    {
      kind: 'textarea', id: 'environment', label: 'Work / environment',
      hint: 'indoor/outdoor, exposure to pollution, AC, sun, masks, etc.',
    },
    { kind: 'text', id: 'smoking', label: 'Smoking / vaping / alcohol' },
    {
      kind: 'textarea', id: 'lifestyleNotes', label: 'Other relevant lifestyle notes',
      hint: 'e.g., frequent travel, events, preferences for facial pressure / scent-free, etc.',
    },
  ],
};

const consentText = (treatment: string, consentLine: string): ConsentField => ({
  kind: 'consent',
  id: 'consent',
  paragraphs: [
    `I certify that the above information is accurate to the best of my knowledge. I understand that ${treatment}. I have disclosed all relevant medical information and allergies.`,
    consentLine,
  ],
});

const signature: TextField = {
  kind: 'text', id: 'signature', label: 'Type your full name as your signature', required: true,
};

// ── Facials ──────────────────────────────────────────────────────────────

const facial: FormDef = {
  type: 'facial',
  title: 'Client Intake Form for Facials',
  sections: [
    clientInfo,
    {
      id: 'medical',
      title: 'Medical History',
      intro: 'Please disclose any information that may affect your facial treatment. All information is confidential.',
      fields: [
        { kind: 'textarea', id: 'meds', label: 'Current medications / supplements / vitamins' },
        {
          kind: 'textarea', id: 'allergies',
          label: 'Allergies',
          hint: 'Including medications, foods, skincare ingredients, latex, essential oils, fragrances, etc.',
        },
        {
          kind: 'checks', id: 'conditions',
          label: 'Do you have any of the following conditions?',
          hint: 'Check all that apply and provide details',
          options: [
            { id: 'pregnant', label: 'Pregnancy or breastfeeding' },
            { id: 'heart', label: 'Heart conditions / high blood pressure' },
            { id: 'diabetes', label: 'Diabetes' },
            { id: 'autoimmune', label: 'Autoimmune disorders (e.g., lupus, psoriasis)' },
            { id: 'cancer', label: 'Cancer / undergoing treatment' },
            { id: 'epilepsy', label: 'Epilepsy / seizures' },
            { id: 'clotting', label: 'Blood clotting disorders / on blood thinners' },
            { id: 'skin', label: 'Skin conditions (eczema, rosacea, psoriasis, dermatitis, melasma, etc.)', detail: 'Details' },
            { id: 'coldsores', label: 'Cold sores / herpes (history or active)' },
            { id: 'keloid', label: 'Keloid scarring or poor wound healing' },
            { id: 'recentProc', label: 'Recent surgery or cosmetic procedures (Botox, fillers, laser, peels, etc.)', detail: 'When?' },
            { id: 'other', label: 'Other', detail: 'Please specify' },
          ],
        },
        recentUse,
        { kind: 'text', id: 'sunExposure', label: 'Recent sun exposure / tanning' },
        {
          kind: 'radio', id: 'sunscreen', label: 'Do you use sunscreen daily?', options: ['Yes', 'No'],
          detail: { id: 'sunscreenDetail', label: 'SPF level and brand / product', whenAny: ['Yes'] },
        },
      ],
    },
    {
      id: 'skin',
      title: 'Skin Profile & Concerns',
      fields: [
        skinTypes,
        ...concerns('Top skin concern / goal for this facial'),
        {
          kind: 'textarea', id: 'reaction', label: 'How does your skin typically react?',
          hint: 'e.g., redness, dryness, breakouts, flaking, itching',
        },
        {
          kind: 'textarea', id: 'specialAreas', label: 'Any areas of special concern on face / neck / chest?',
          hint: 'e.g., forehead, cheeks, jawline',
        },
        {
          kind: 'radio', id: 'priorFacials',
          label: 'Have you had professional facials, peels, microdermabrasion, microneedling, or extractions before?',
          options: ['No', 'Yes'],
          detail: { id: 'priorFacialsDetail', label: 'Describe (type, when, reactions)', whenAny: ['Yes'] },
        },
      ],
    },
    routine('Any changes in skin recently?'),
    lifestyle,
    {
      id: 'prefs',
      title: 'Treatment Preferences',
      fields: [
        {
          kind: 'textarea', id: 'experience', label: 'What type of facial experience are you seeking today?',
          hint: 'e.g., relaxing, results-driven, deep cleansing, hydrating glass skin, anti-aging, calming for sensitivity',
        },
        {
          kind: 'textarea', id: 'avoid', label: 'Any preferences or things to avoid?',
          hint: 'pressure, steam, extractions, specific ingredients / scents, music, lighting, etc.',
        },
        {
          kind: 'textarea', id: 'addons', label: 'Are you interested in add-ons or future recommendations?',
          hint: 'e.g., waxing, product bundles, series packages',
        },
      ],
    },
    {
      id: 'consent',
      title: 'Consent & Agreement',
      fields: [
        consentText(
          'facial treatments involve the application of products and techniques that may cause temporary redness, sensitivity, or purging',
          'I consent to a waxing/facial treatment and any recommended adjustments based on my skin analysis today. I release Epoch Skin and its estheticians from liability for any adverse reactions resulting from undisclosed conditions or non-compliance with aftercare.',
        ),
        signature,
      ],
    },
  ],
};

// ── Waxing ───────────────────────────────────────────────────────────────
// The waxing PDF titles its skin-type checklist "What areas would you like to
// wax today?" (a copy-paste slip). Here the skin-type list keeps its own
// label and the areas question is a separate free-text field.

const waxing: FormDef = {
  type: 'waxing',
  title: 'Intake Form for Waxing',
  sections: [
    clientInfo,
    {
      id: 'medical',
      title: 'Medical History',
      intro: 'Please disclose any information that may affect your waxing treatment. All information is confidential.',
      fields: [
        { kind: 'textarea', id: 'meds', label: 'Current medications / supplements / vitamins' },
        {
          kind: 'textarea', id: 'allergies',
          label: 'Allergies',
          hint: 'Including medications, foods, skincare ingredients, latex, essential oils, fragrances, rosin, resins, etc.',
        },
        {
          kind: 'checks', id: 'conditions',
          label: 'Do you have any of the following conditions?',
          hint: 'Check all that apply and provide details',
          options: [
            { id: 'pregnant', label: 'Pregnancy or breastfeeding' },
            { id: 'heart', label: 'Heart conditions / high blood pressure' },
            { id: 'diabetes', label: 'Diabetes' },
            { id: 'autoimmune', label: 'Autoimmune disorders (e.g., lupus, psoriasis)' },
            { id: 'cancer', label: 'Cancer / undergoing treatment' },
            { id: 'epilepsy', label: 'Epilepsy / seizures' },
            { id: 'clotting', label: 'Blood clotting disorders / on blood thinners' },
            { id: 'skin', label: 'Skin conditions (eczema, psoriasis, dermatitis, folliculitis, ingrown hairs, etc.)', detail: 'Details' },
            { id: 'coldsores', label: 'Cold sores / herpes (if facial waxing)' },
            { id: 'keloid', label: 'Keloid scarring or poor wound healing' },
            { id: 'recentProc', label: 'Recent surgery, cosmetic procedures, laser hair removal, or chemical peels', detail: 'When?' },
            { id: 'other', label: 'Other', detail: 'Please specify' },
          ],
        },
        recentUse,
        { kind: 'text', id: 'sunExposure', label: 'Recent sun exposure / tanning' },
        {
          kind: 'radio', id: 'sunscreen', label: 'Do you use sunscreen daily on waxed areas?', options: ['Yes', 'No'],
          detail: { id: 'sunscreenDetail', label: 'SPF level', whenAny: ['Yes'] },
        },
      ],
    },
    {
      id: 'skin',
      title: 'Skin Profile & Concerns',
      fields: [
        { kind: 'textarea', id: 'waxAreas', label: 'What areas would you like to wax today?' },
        skinTypes,
        ...concerns('Top skin / hair concern for waxing'),
        {
          kind: 'textarea', id: 'reaction', label: 'How does your skin typically react?',
          hint: 'e.g., redness, dryness, breakouts, flaking, itching',
        },
        {
          kind: 'textarea', id: 'specialAreas', label: 'Any areas of special concern?',
          hint: 'e.g., face, neck, chest, or other areas',
        },
        {
          kind: 'radio', id: 'priorWaxing',
          label: 'Previous waxing experiences',
          hint: 'Reactions, comfort level, favorite techniques, issues with ingrowns, redness, etc.',
          options: ['No', 'Yes'],
          detail: { id: 'priorWaxingDetail', label: 'Describe (type, when, reactions)', whenAny: ['Yes'] },
        },
      ],
    },
    routine('Any recent changes in skin / hair?'),
    lifestyle,
    {
      id: 'prefs',
      title: 'Treatment Preferences',
      fields: [
        {
          kind: 'textarea', id: 'experience', label: 'What type of experience are you seeking today?',
          hint: 'e.g., relaxing, results-driven, calming for sensitivity',
        },
        {
          kind: 'textarea', id: 'avoid', label: 'Any preferences or things to avoid?',
          hint: 'pressure, specific ingredients / scents, music, lighting, etc.',
        },
        {
          kind: 'textarea', id: 'addons', label: 'Are you interested in add-ons or future recommendations?',
          hint: 'e.g., facials, product bundles, series packages',
        },
      ],
    },
    {
      id: 'consent',
      title: 'Consent & Agreement',
      fields: [
        consentText(
          'facial treatments involve the application of products and techniques that may cause temporary redness, sensitivity, or purging',
          'I consent to the waxing/facial treatment and any recommended adjustments based on my skin analysis today. I release Epoch Skin and its estheticians from liability for any adverse reactions resulting from undisclosed conditions or non-compliance with aftercare.',
        ),
        signature,
      ],
    },
  ],
};

// ── Massage ──────────────────────────────────────────────────────────────

const massage: FormDef = {
  type: 'massage',
  title: 'Intake Form for Massage',
  sections: [
    clientInfo,
    {
      id: 'medical',
      title: 'Medical History',
      intro: 'Please disclose any information that may affect your massage treatment. All information is confidential.',
      fields: [
        { kind: 'textarea', id: 'meds', label: 'Current medications / supplements / vitamins' },
        {
          kind: 'textarea', id: 'allergies',
          label: 'Allergies',
          hint: 'Including massage oils / lotions, essential oils, nuts, latex, fragrances, etc.',
        },
        {
          kind: 'checks', id: 'conditions',
          label: 'Do you have any of the following conditions?',
          hint: 'Check all that apply and provide details',
          options: [
            { id: 'pregnant', label: 'Pregnancy or breastfeeding' },
            { id: 'heart', label: 'Heart conditions / high or low blood pressure' },
            { id: 'dvt', label: 'Blood clots / DVT / varicose veins' },
            { id: 'diabetes', label: 'Diabetes' },
            { id: 'autoimmune', label: 'Autoimmune disorders (e.g., lupus, psoriasis)' },
            { id: 'cancer', label: 'Cancer / undergoing treatment' },
            { id: 'epilepsy', label: 'Epilepsy / seizures' },
            { id: 'clotting', label: 'Blood clotting disorders / on blood thinners' },
            { id: 'skin', label: 'Skin conditions (eczema, psoriasis, dermatitis, open wounds, rashes)', detail: 'Details' },
            { id: 'recentInjury', label: 'Recent surgery, injury, or fracture', detail: 'When / where?' },
            { id: 'osteo', label: 'Osteoporosis or fragile bones' },
            { id: 'nerve', label: 'Nerve conditions / numbness / neuropathy' },
            { id: 'chronicPain', label: 'Chronic pain conditions (fibromyalgia, arthritis, etc.)' },
            { id: 'other', label: 'Other', detail: 'Please specify' },
          ],
        },
        {
          kind: 'textarea', id: 'injuries',
          label: 'Recent injuries, surgeries, or areas of current pain / inflammation',
        },
      ],
    },
    {
      id: 'massagePrefs',
      title: 'Massage Preferences',
      fields: [
        { kind: 'radio', id: 'pressure', label: 'Pressure preference', options: ['Light', 'Medium', 'Firm', 'Deep tissue'] },
        { kind: 'textarea', id: 'focusAreas', label: 'Areas to focus on' },
        {
          kind: 'textarea', id: 'avoidAreas', label: 'Areas to avoid',
          hint: 'Injuries, ticklish spots, sensitive areas, etc.',
        },
        {
          kind: 'radio', id: 'priorMassage', label: 'Have you had a professional massage before?',
          options: ['No', 'Yes'],
          detail: { id: 'priorMassageDetail', label: 'Describe (type, when, reactions)', whenAny: ['Yes'] },
        },
        {
          kind: 'textarea', id: 'comfort',
          label: 'Any preferences regarding scent, music, conversation, or room temperature?',
        },
        {
          kind: 'textarea', id: 'addons', label: 'Are you interested in add-ons or future recommendations?',
          hint: 'e.g., aromatherapy, series packages',
        },
      ],
    },
    {
      id: 'consent',
      title: 'Consent & Agreement',
      fields: [
        {
          kind: 'consent',
          id: 'consent',
          paragraphs: [
            'I certify that the above information is accurate to the best of my knowledge. I understand that massage therapy involves manual manipulation of soft tissue and may cause temporary soreness, redness, or sensitivity. I have disclosed all relevant medical information and allergies.',
            'I consent to the massage treatment described above and any recommended adjustments based on my needs today. I understand I may request that pressure or technique be adjusted, or that the session be stopped, at any time. I release Epoch Skin and its practitioners from liability for any adverse reactions resulting from undisclosed conditions or non-compliance with aftercare.',
          ],
        },
        signature,
      ],
    },
  ],
};

export const FORMS: Record<FormType, FormDef> = { facial, waxing, massage };

export const FORM_LABELS: Record<FormType, string> = {
  facial: 'Facial',
  waxing: 'Waxing',
  massage: 'Massage',
};

export function isFormType(v: unknown): v is FormType {
  return v === 'facial' || v === 'waxing' || v === 'massage';
}

// ── Validation ───────────────────────────────────────────────────────────

const MAX_TEXT = 300;
const MAX_AREA = 2000;

export interface ValidationResult {
  clean: Record<string, string>;
  errors: string[];
}

/**
 * Whitelists answers against the form definition (unknown keys are dropped,
 * lengths capped, radio values must be one of the options) and checks the
 * required fields. Never trust the client's shape.
 */
export function validateAnswers(def: FormDef, raw: unknown): ValidationResult {
  const input = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const clean: Record<string, string> = {};
  const errors: string[] = [];

  const read = (key: string, max: number): string => {
    const v = input[key];
    return typeof v === 'string' ? v.trim().slice(0, max) : '';
  };

  for (const section of def.sections) {
    for (const f of section.fields) {
      switch (f.kind) {
        case 'text': {
          const v = read(f.id, MAX_TEXT);
          if (v) clean[f.id] = v;
          if (f.required && !v) errors.push(f.label);
          if (v && f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errors.push(`${f.label} (invalid)`);
          if (v && f.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(v)) errors.push(`${f.label} (invalid)`);
          break;
        }
        case 'textarea': {
          const v = read(f.id, MAX_AREA);
          if (v) clean[f.id] = v;
          if (f.required && !v) errors.push(f.label);
          break;
        }
        case 'checks': {
          for (const o of f.options) {
            const key = `${f.id}.${o.id}`;
            if (input[key] === '1') {
              clean[key] = '1';
              if (o.detail) {
                const d = read(`${key}.detail`, MAX_TEXT);
                if (d) clean[`${key}.detail`] = d;
              }
            }
          }
          break;
        }
        case 'radio': {
          const v = read(f.id, 60);
          if (v && f.options.includes(v)) {
            clean[f.id] = v;
            if (f.detail && f.detail.whenAny.includes(v)) {
              const d = read(f.detail.id, MAX_TEXT);
              if (d) clean[f.detail.id] = d;
            }
          }
          break;
        }
        case 'consent': {
          if (input[f.id] === '1') clean[f.id] = '1';
          else errors.push('Consent & Agreement (please tick the box)');
          break;
        }
      }
    }
  }
  return { clean, errors };
}
