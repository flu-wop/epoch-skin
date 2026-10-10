'use client';
// components/admin/useAdminSession.ts — shared login-state check for admin pages.

import { useEffect, useState } from 'react';

export function useAdminSession() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/admin/login', { cache: 'no-store' })
      .then((r) => { if (!cancelled) setAuthed(r.ok); })
      .catch(() => { if (!cancelled) setAuthed(false); })
      .finally(() => { if (!cancelled) setChecking(false); });
    return () => { cancelled = true; };
  }, []);

  return { authed, checking, setAuthed };
}
