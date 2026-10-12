'use client';
// components/intake/IntakeSection.tsx
// Shown on the booking confirmation page. Waits for the Stripe webhook to
// record the booking, then shows whichever intake form(s) the booking owes.
import { useCallback, useEffect, useState } from 'react';
import IntakeForm from '@/components/intake/IntakeForm';
import { FORMS, type FormType } from '@/lib/intake-forms';

interface FormStatus { type: FormType; label: string; submitted: boolean }
interface State {
  phase: 'loading' | 'none' | 'forms' | 'timeout' | 'error';
  name: string;
  email: string;
  forms: FormStatus[];
}

const MAX_TRIES = 8;

export default function IntakeSection({ sessionId }: { sessionId: string }) {
  const [state, setState] = useState<State>({ phase: 'loading', name: '', email: '', forms: [] });
  const [active, setActive] = useState<FormType | null>(null);

  const load = useCallback(async (tries = 0): Promise<void> => {
    try {
      const res = await fetch(`/api/intake?session_id=${encodeURIComponent(sessionId)}`, { cache: 'no-store' });
      if (!res.ok) { setState((s) => ({ ...s, phase: 'error' })); return; }
      const data = await res.json();
      if (!data.ready) {
        if (tries >= MAX_TRIES) { setState((s) => ({ ...s, phase: 'timeout' })); return; }
        setTimeout(() => { void load(tries + 1); }, 2000);
        return;
      }
      const forms: FormStatus[] = data.forms ?? [];
      setState({ phase: forms.length === 0 ? 'none' : 'forms', name: data.name, email: data.email, forms });
      setActive((cur) => cur ?? forms.find((f) => !f.submitted)?.type ?? null);
    } catch {
      setState((s) => ({ ...s, phase: 'error' }));
    }
  }, [sessionId]);

  useEffect(() => {
    // Kick off the initial fetch; state is only set after the awaited request.
    void load();
  }, [load]);

  const markDone = (type: FormType) => {
    setState((s) => {
      const forms = s.forms.map((f) => (f.type === type ? { ...f, submitted: true } : f));
      return { ...s, forms };
    });
    setActive((cur) => {
      const next = state.forms.find((f) => f.type !== type && !f.submitted)?.type ?? null;
      return cur === type ? next : cur;
    });
    document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (state.phase === 'none') return null;

  return (
    <section id="intake" className="mt-14 pt-10 border-t border-[#E5DCCF] w-full max-w-2xl mx-auto">
      {state.phase === 'loading' && (
        <p className="text-center text-[13px] font-sans text-[#8C8680]">Checking if your visit needs an intake form…</p>
      )}
      {state.phase === 'timeout' && (
        <p className="text-center text-[13px] font-sans text-[#5A5550]">
          We&apos;re still finalizing your booking. Refresh this page in a minute, or use the intake link in your
          confirmation email.
        </p>
      )}
      {state.phase === 'error' && (
        <p className="text-center text-[13px] font-sans text-[#5A5550]">
          We couldn&apos;t load your intake form. Use the link in your confirmation email, or email{' '}
          <a href="mailto:kayla@epoch-skin.com" className="font-semibold">kayla@epoch-skin.com</a>.
        </p>
      )}

      {state.phase === 'forms' && (
        <div>
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#C9A96E] font-sans mb-3 text-center">One more step</p>
          <h2 className="font-serif text-3xl text-[#1C1C1A] mb-2 text-center">Your intake form</h2>
          <p className="text-[#5A5550] font-sans text-sm leading-relaxed mb-8 text-center">
            Please complete this before your visit so we can tailor your treatment. It takes about 5 minutes.
          </p>

          {state.forms.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center mb-8" role="tablist">
              {state.forms.map((f) => (
                <button
                  key={f.type}
                  role="tab"
                  aria-selected={active === f.type}
                  onClick={() => setActive(f.type)}
                  className={`px-5 py-2 text-[11px] tracking-[0.2em] uppercase font-sans border transition-colors ${
                    active === f.type
                      ? 'bg-[#1C1C1A] text-[#C9A96E] border-[#1C1C1A]'
                      : 'border-[#E5DCCF] text-[#5A5550] hover:border-[#C9A96E]'
                  }`}
                >
                  {f.label}{f.submitted ? ' ✓' : ''}
                </button>
              ))}
            </div>
          )}

          {state.forms.every((f) => f.submitted) ? (
            <div className="text-center bg-[#F5EDD8] p-8">
              <p className="font-serif text-2xl text-[#1C1C1A] mb-2">Thank you.</p>
              <p className="text-sm font-sans text-[#5A5550]">
                Your intake {state.forms.length > 1 ? 'forms were' : 'form was'} sent to Kayla. See you soon.
              </p>
            </div>
          ) : (
            state.forms.map((f) =>
              f.type === active ? (
                f.submitted ? (
                  <div key={f.type} className="text-center bg-[#F5EDD8] p-8">
                    <p className="font-serif text-xl text-[#1C1C1A]">{f.label} form received ✓</p>
                  </div>
                ) : (
                  <IntakeForm
                    key={f.type}
                    def={FORMS[f.type]}
                    sessionId={sessionId}
                    prefill={{ fullName: state.name, email: state.email }}
                    onSubmitted={() => markDone(f.type)}
                  />
                )
              ) : null,
            )
          )}
        </div>
      )}
    </section>
  );
}
