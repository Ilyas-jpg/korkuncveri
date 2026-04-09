"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Map, BarChart3, Newspaper, GitCompare, Bell, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/atlas", label: "Atlas", icon: Map, description: "İnteraktif harita" },
  { href: "/analiz", label: "Analiz", icon: BarChart3, description: "Veri analizi" },
  { href: "/akis", label: "Canlı Akış", icon: Newspaper, description: "Haberler & sosyal" },
  { href: "/karsilastir", label: "Karşılaştır", icon: GitCompare, description: "Bölge karşılaştırma" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] glass">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between h-14 px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
        >
          <div className="relative w-8 h-8 rounded-sm flex items-center justify-center overflow-hidden"
               style={{ background: "var(--color-accent-primary)" }}>
            <span className="text-sm font-bold" style={{ color: "var(--color-bg-primary)", fontFamily: "var(--font-heading)" }}>
              U
            </span>
          </div>
          <span
            className="text-lg font-bold tracking-tight hidden sm:block"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}
          >
            ULAK
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-sm text-sm font-medium transition-all",
                  isActive
                    ? "text-[var(--color-accent-primary)] bg-[var(--color-accent-primary-muted)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]"
                )}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            className="relative p-2 rounded-sm transition-all text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]"
            aria-label="Bildirimler"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-accent-danger)]" />
          </button>

          <Link
            href="/giris"
            className="hidden sm:flex items-center px-4 py-1.5 rounded-sm text-sm font-semibold transition-all"
            style={{
              background: "var(--color-accent-primary)",
              color: "var(--color-bg-primary)",
            }}
          >
            Giriş Yap
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] px-4 pb-4 pt-2 space-y-1"
             style={{ background: "var(--color-bg-secondary)" }}>
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all",
                  isActive
                    ? "text-[var(--color-accent-primary)] bg-[var(--color-accent-primary-muted)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]"
                )}
              >
                <Icon size={18} />
                <div>
                  <div>{item.label}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{item.description}</div>
                </div>
              </Link>
            );
          })}
          <Link
            href="/giris"
            className="flex items-center justify-center mt-2 px-4 py-2.5 rounded-sm text-sm font-semibold"
            style={{ background: "var(--color-accent-primary)", color: "var(--color-bg-primary)" }}
          >
            Giriş Yap
          </Link>
        </div>
      )}
    </header>
  );
}
