'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ROUTES } from "@/lib/routes";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 px-4 sm:px-7 h-[60px] border-b border-[var(--color-border-default)] bg-[var(--color-bg-base)]/90 backdrop-blur sticky top-0 z-20 overflow-x-auto">
      <Link href="/" className="flex items-center gap-2 mr-4 sm:mr-7 shrink-0">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#7c3aed" strokeWidth="2" />
          <circle cx="17" cy="7" r="3.4" fill="#8b5cf6" />
        </svg>
        <span className="font-extrabold text-[17px] tracking-tight text-[var(--color-text-primary)]">Lumina</span>
      </Link>

      {/* Labels come from the route inventory, which the sitemap is built from,
          so the nav and the sitemap cannot disagree about what exists. */}
      {NAV_ROUTES.map(route => {
        const active = pathname === route.path || pathname.startsWith(`${route.path}/`);
        return (
          <Link
            key={route.path}
            href={route.path}
            className={`px-3.5 py-2 text-[13.5px] font-semibold rounded-lg whitespace-nowrap transition-colors ${
              active
                ? "text-[var(--color-text-primary)] bg-[var(--color-bg-raised)]"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {route.label}
          </Link>
        );
      })}

      {/* Push the toggle to the far right */}
      <div className="ml-auto shrink-0">
        <ThemeToggle />
      </div>
    </nav>
  );
}
