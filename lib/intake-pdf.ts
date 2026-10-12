// lib/intake-pdf.ts
// Renders a completed intake form to a PDF for Kayla. Pure JS (pdf-lib), safe
// for Vercel serverless.
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import type { FormDef } from '@/lib/intake-forms';

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 54;
const CONTENT_W = PAGE_W - MARGIN * 2;

const INK = rgb(0.11, 0.11, 0.1);
const MUTED = rgb(0.35, 0.33, 0.31);
const GOLD = rgb(0.79, 0.66, 0.43);
const RULE = rgb(0.9, 0.86, 0.81);

export interface IntakePdfMeta {
  clientName: string;
  service: string;
  appointment: string; // e.g. "2026-10-20 at 2:00 PM"
  submittedAt: Date;
}

function ageFromDob(dob: string, now: Date): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob);
  if (!m) return '';
  const y = Number(m[1]), mo = Number(m[2]), d = Number(m[3]);
  let age = now.getFullYear() - y;
  if (now.getMonth() + 1 < mo || (now.getMonth() + 1 === mo && now.getDate() < d)) age -= 1;
  return age >= 0 && age < 130 ? String(age) : '';
}

function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export async function buildIntakePdf(
  def: FormDef,
  answers: Record<string, string>,
  meta: IntakePdfMeta,
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const serifBold = await pdf.embedFont(StandardFonts.TimesRomanBold);

  // Standard fonts only cover WinAnsi — anything else (emoji, CJK) would throw.
  const supported = new Set(regular.getCharacterSet());
  const safe = (s: string) =>
    s
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[\r\t]/g, ' ')
      .replace(/[\uFE0E\uFE0F\u200B-\u200D]/g, '')
      .split(/(?:)/u)
      .map((ch) => (ch === '\n' || supported.has(ch.codePointAt(0)!) ? ch : '?'))
      .join('');

  let page: PDFPage = pdf.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - MARGIN;

  const ensure = (needed: number) => {
    if (y - needed < MARGIN + 18) {
      page = pdf.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - MARGIN;
    }
  };

  const wrap = (text: string, font: PDFFont, size: number, width: number): string[] => {
    const lines: string[] = [];
    for (const para of safe(text).split('\n')) {
      const words = para.split(/\s+/).filter(Boolean);
      if (words.length === 0) { lines.push(''); continue; }
      let line = '';
      for (const w of words) {
        const trial = line ? `${line} ${w}` : w;
        if (font.widthOfTextAtSize(trial, size) <= width) {
          line = trial;
        } else {
          if (line) lines.push(line);
          // Hard-split very long unbroken tokens.
          let rest = w;
          while (font.widthOfTextAtSize(rest, size) > width) {
            let cut = rest.length - 1;
            while (cut > 1 && font.widthOfTextAtSize(rest.slice(0, cut), size) > width) cut -= 1;
            lines.push(rest.slice(0, cut));
            rest = rest.slice(cut);
          }
          line = rest;
        }
      }
      lines.push(line);
    }
    return lines;
  };

  const para = (
    text: string, font: PDFFont, size: number, color = INK, indent = 0, gap = 3,
  ) => {
    const lh = size * 1.35;
    for (const ln of wrap(text, font, size, CONTENT_W - indent)) {
      ensure(lh);
      page.drawText(ln, { x: MARGIN + indent, y: y - size, size, font, color });
      y -= lh;
    }
    y -= gap;
  };

  // ── Header ──
  page.drawText('EPOCH SKIN', { x: MARGIN, y: y - 20, size: 22, font: serifBold, color: INK });
  y -= 28;
  page.drawText('Premium Organic Skincare & Waxing Studio  |  New Orleans, LA', {
    x: MARGIN, y: y - 9, size: 9, font: regular, color: MUTED,
  });
  y -= 18;
  page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y }, thickness: 1.5, color: GOLD });
  y -= 18;
  para(def.title, serifBold, 16, INK, 0, 4);
  para(`Client: ${meta.clientName}`, bold, 10, INK, 0, 1);
  para(`Appointment: ${meta.service} — ${meta.appointment}`, regular, 10, MUTED, 0, 1);
  para(
    `Submitted online: ${meta.submittedAt.toLocaleString('en-US', {
      timeZone: 'America/Chicago', dateStyle: 'long', timeStyle: 'short',
    })} (Central)`,
    regular, 10, MUTED, 0, 10,
  );

  // ── Body ──
  for (const section of def.sections) {
    ensure(40);
    y -= 6;
    page.drawText(safe(section.title.toUpperCase()), {
      x: MARGIN, y: y - 11, size: 11, font: bold, color: INK,
    });
    y -= 16;
    page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y }, thickness: 0.6, color: RULE });
    y -= 8;
    if (section.intro) para(section.intro, regular, 9, MUTED, 0, 6);

    for (const f of section.fields) {
      switch (f.kind) {
        case 'text':
        case 'textarea': {
          let v = answers[f.id] ?? '';
          if (f.kind === 'text' && f.type === 'date' && v) v = formatDate(v);
          para(f.label, bold, 9, MUTED, 0, 1);
          para(v || '—', regular, 10.5, INK, 6, 6);
          if (f.id === 'dob' && answers.dob) {
            const age = ageFromDob(answers.dob, meta.submittedAt);
            if (age) para(`Age: ${age}`, regular, 10.5, INK, 6, 6);
          }
          break;
        }
        case 'checks': {
          ensure(54);
          para(f.label, bold, 9, MUTED, 0, 2);
          let any = false;
          for (const o of f.options) {
            const key = `${f.id}.${o.id}`;
            const on = answers[key] === '1';
            if (on) any = true;
            const detail = on ? answers[`${key}.detail`] : '';
            para(
              `${on ? '[X]' : '[  ]'}  ${o.label}${detail ? ` — ${o.detail ?? 'Details'}: ${detail}` : ''}`,
              on ? bold : regular, 10, INK, 6, 1,
            );
          }
          if (!any) para('None selected', regular, 9, MUTED, 6, 1);
          y -= 5;
          break;
        }
        case 'radio': {
          const v = answers[f.id];
          const detail = f.detail ? answers[f.detail.id] : '';
          para(f.label, bold, 9, MUTED, 0, 1);
          para(
            `${v || '—'}${detail && f.detail ? `  (${f.detail.label}: ${detail})` : ''}`,
            regular, 10.5, INK, 6, 6,
          );
          break;
        }
        case 'consent': {
          for (const p of f.paragraphs) para(p, regular, 9.5, INK, 0, 5);
          para(
            `Agreed: ${answers[f.id] === '1' ? 'Yes — client ticked the consent box' : 'No'}`,
            bold, 10, INK, 0, 6,
          );
          break;
        }
      }
    }
  }

  // ── Signature block ──
  ensure(60);
  y -= 4;
  para(
    `Signed electronically by: ${answers.signature || '—'}`,
    serifBold, 13, INK, 0, 2,
  );
  para(
    `${meta.submittedAt.toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'long', timeStyle: 'short' })} (Central)`,
    regular, 9, MUTED, 0, 10,
  );

  // Practitioner notes box (left blank for in-studio use, like the paper form)
  ensure(90);
  para('Practitioner notes (internal use)', bold, 9, MUTED, 0, 3);
  page.drawRectangle({
    x: MARGIN, y: y - 70, width: CONTENT_W, height: 70,
    borderColor: RULE, borderWidth: 0.8,
  });
  y -= 78;

  // ── Footer / page numbers ──
  const pages = pdf.getPages();
  pages.forEach((p, i) => {
    p.drawText(`Epoch Skin · Confidential client intake · Page ${i + 1} of ${pages.length}`, {
      x: MARGIN, y: 28, size: 8, font: regular, color: MUTED,
    });
  });

  return pdf.save();
}
