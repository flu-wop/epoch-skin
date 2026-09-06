'use client';
// components/admin/LogoutButton.tsx

export function LogoutButton({ onLogout }: { onLogout?: () => void }) {
  async function handleLogout() {
    await fetch('/api/admin/login', { method: 'DELETE' });
    if (onLogout) onLogout();
    else window.location.href = '/admin';
  }

  return (
    <button
      onClick={handleLogout}
      className="text-[#8C8680] hover:text-[#C4974A] text-xs tracking-wide transition-colors shrink-0"
    >
      Log out
    </button>
  );
}
