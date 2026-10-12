'use client';
// components/intake/IntakeForm.tsx
// Renders one intake form from its definition (lib/intake-forms.ts) and posts
// it to /api/intake. Answers are held in memory only — nothing health-related
// is written to browser storage.
import { useMemo, useState } from 'react';
import type { Field, FormDef } from '@/lib/intake-forms';

const INPUT =
  'w-full border border-[#E5DCCF] bg-white px-3 py-2.5 text-sm font-sans text-[#1C1C1A] ' +
  'placeholder:text-[#C0BAB4] focus:outline-none focus:border-[#C9A96E] transition-colors';
const LABEL = 'block text-[12px] font-sans font-medium text-[#1C1C1A] mb-1.5';
const HINT = 'block text-[11px] font-sans text-[#8C8680] mb-1.5 leading-snug';

interface Props {
  def: FormDef;
  sessionId: string;
  prefill: { fullName: string; email: string };
  onSubmitted: () => void;
}

export default function IntakeForm({ def, sessionId, prefill, onSubmitted }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({
    fullName: prefill.fullName,
    email: prefill.email,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [missing, setMissing] = useState<string[]>([]);

  const set = (key: string, value: string) =>
    setAnswers((a) => ({ ...a, [key]: value }));
  const toggle = (key: string, on: boolean) =>
    setAnswers((a) => {
      const next = { ...a };
      if (on) next[key] = '1';
      else { delete next[key]; delete next[`${key}.detail`]; }
      return next;
    });

  const requiredIds = useMemo(() => {
    const ids: { id: string; label: string }[] = [];
    for (const s of def.sections) {
      for (const f of s.fields) {
        if ((f.kind === 'text' || f.kind === 'textarea') && f.required) ids.push({ id: f.id, label: f.label });
        if (f.kind === 'consent') ids.push({ id: f.id, label: 'Consent & Agreement' });
      }
    }
    return ids;
  }, [def]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const gaps = requiredIds.filter((r) => !(answers[r.id] ?? '').trim()).map((r) => r.label);
    if (gaps.length > 0) {
      setMissing(gaps);
      setError('Please complete the highlighted required fields.');
      document.getElementById('intake-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setMissing([]);
    setBusy(true);
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, form_type: def.type, answers }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (Array.isArray(data.fields)) setMissing(data.fields);
        setError(data.error ?? 'Something went wrong. Please try again.');
        document.getElementById('intake-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      onSubmitted();
    } catch {
      setError('Network error — please check your connection and try again.');
    } finally {
      setBusy(false);
    }
  }

  const isMissing = (id: string, label: string) =>
    missing.some((m) => m.startsWith(label)) && !(answers[id] ?? '').trim();

  function renderField(f: Field) {
    switch (f.kind) {
      case 'text':
        return (
          <div key={f.id} className={f.half ? 'sm:col-span-1' : 'sm:col-span-2'}>
            <label htmlFor={`f-${f.id}`} className={LABEL}>
              {f.label}{f.required && <span className="text-[#C9A96E]"> *</span>}
            </label>
            {f.hint && <span className={HINT}>{f.hint}</span>}
            <input
              id={`f-${f.id}`}
              type={f.type ?? 'text'}
              value={answers[f.id] ?? ''}
              onChange={(e) => set(f.id, e.target.value)}
              maxLength={300}
              autoComplete={
                f.id === 'fullName' ? 'name' : f.id === 'email' ? 'email' : f.id === 'phone' ? 'tel' : 'off'
              }
              className={`${INPUT} ${isMissing(f.id, f.label) ? 'border-red-400' : ''}`}
              aria-required={f.required || undefined}
            />
          </div>
        );
      case 'textarea':
        return (
          <div key={f.id} className="sm:col-span-2">
            <label htmlFor={`f-${f.id}`} className={LABEL}>
              {f.label}{f.required && <span className="text-[#C9A96E]"> *</span>}
            </label>
            {f.hint && <span className={HINT}>{f.hint}</span>}
            <textarea
              id={`f-${f.id}`}
              rows={3}
              value={answers[f.id] ?? ''}
              onChange={(e) => set(f.id, e.target.value)}
              maxLength={2000}
              className={INPUT}
            />
          </div>
        );
      case 'checks':
        return (
          <fieldset key={f.id} className="sm:col-span-2">
            <legend className={LABEL}>{f.label}</legend>
            {f.hint && <span className={HINT}>{f.hint}</span>}
            <div className="space-y-2">
              {f.options.map((o) => {
                const key = `${f.id}.${o.id}`;
                const on = answers[key] === '1';
                return (
                  <div key={o.id}>
                    <label className="flex items-start gap-3 text-sm font-sans text-[#1C1C1A] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={(e) => toggle(key, e.target.checked)}
                        className="mt-1 h-4 w-4 accent-[#C9A96E]"
                      />
                      <span>{o.label}</span>
                    </label>
                    {on && o.detail && (
                      <input
                        type="text"
                        aria-label={`${o.label} — ${o.detail}`}
                        placeholder={o.detail}
                        value={answers[`${key}.detail`] ?? ''}
                        onChange={(e) => set(`${key}.detail`, e.target.value)}
                        maxLength={300}
                        className={`${INPUT} mt-2 ml-7 w-[calc(100%-1.75rem)]`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </fieldset>
        );
      case 'radio': {
        const chosen = answers[f.id];
        return (
          <fieldset key={f.id} className="sm:col-span-2">
            <legend className={LABEL}>{f.label}</legend>
            {f.hint && <span className={HINT}>{f.hint}</span>}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {f.options.map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm font-sans text-[#1C1C1A] cursor-pointer">
                  <input
                    type="radio"
                    name={`f-${f.id}`}
                    checked={chosen === opt}
                    onChange={() => set(f.id, opt)}
                    className="h-4 w-4 accent-[#C9A96E]"
                  />
                  {opt}
                </label>
              ))}
            </div>
            {f.detail && chosen && f.detail.whenAny.includes(chosen) && (
              <input
                type="text"
                aria-label={f.detail.label}
                placeholder={f.detail.label}
                value={answers[f.detail.id] ?? ''}
                onChange={(e) => set(f.detail!.id, e.target.value)}
                maxLength={300}
                className={`${INPUT} mt-2`}
              />
            )}
          </fieldset>
        );
      }
      case 'consent':
        return (
          <div key={f.id} className="sm:col-span-2 bg-[#FAF7F2] border border-[#E5DCCF] p-4">
            {f.paragraphs.map((p, i) => (
              <p key={i} className="text-[13px] font-sans text-[#5A5550] leading-relaxed mb-3">{p}</p>
            ))}
            <label className="flex items-start gap-3 text-sm font-sans text-[#1C1C1A] cursor-pointer">
              <input
                type="checkbox"
                checked={answers[f.id] === '1'}
                onChange={(e) => toggle(f.id, e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#C9A96E]"
              />
              <span>I have read and agree to the above.<span className="text-[#C9A96E]"> *</span></span>
            </label>
          </div>
        );
    }
  }

  return (
    <form onSubmit={submit} noValidate className="text-left">
      {def.sections.map((s) => (
        <section key={s.id} className="mb-9">
          <h3 className="font-serif text-xl text-[#1C1C1A] mb-1">{s.title}</h3>
          <div className="h-px bg-[#E5DCCF] mb-4" />
          {s.intro && <p className="text-[13px] font-sans text-[#5A5550] mb-4">{s.intro}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
            {s.fields.map(renderField)}
          </div>
        </section>
      ))}

      <div id="intake-error" aria-live="polite">
        {error && (
          <div className="mb-5 border border-red-300 bg-red-50 text-red-800 text-[13px] font-sans p-3">
            {error}
            {missing.length > 0 && (
              <ul className="mt-1 list-disc pl-5">
                {missing.map((m) => <li key={m}>{m}</li>)}
              </ul>
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={busy}
        className="w-full sm:w-auto px-10 py-3.5 bg-[#1C1C1A] text-[#C9A96E] text-[11px] tracking-[0.22em]
                   uppercase font-sans font-medium hover:bg-[#2E3A2C] disabled:opacity-60 transition-all duration-300"
      >
        {busy ? 'Sending…' : 'Send to Epoch Skin'}
      </button>
      <p className="text-[11px] font-sans text-[#8C8680] mt-3">
        Your answers go straight to Kayla and are kept confidential.
      </p>
    </form>
  );
}
