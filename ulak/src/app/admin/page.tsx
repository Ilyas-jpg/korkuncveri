import type { Metadata } from "next";
import Link from "next/link";
import {
  Database, FileEdit, Upload, BarChart3, Users, Settings,
  RefreshCw, AlertTriangle, CheckCircle, Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Paneli",
  description: "ULAK veri yönetimi ve admin paneli.",
};

const menuItems = [
  {
    href: "/admin/veri-girisi",
    icon: FileEdit,
    title: "Manuel Veri Girişi",
    desc: "Saha gözlemi, mülakat, anket ve uzman değerlendirmesi ekle",
    color: "var(--color-accent-primary)",
    count: null,
  },
  {
    href: "/admin/toplu-yukleme",
    icon: Upload,
    title: "Toplu Veri Yükleme",
    desc: "Excel/CSV dosyası ile toplu veri import et",
    color: "var(--color-accent-info)",
    count: null,
  },
  {
    href: "/admin/scraper",
    icon: RefreshCw,
    title: "Scraper Yönetimi",
    desc: "Veri toplama job'larını kontrol et ve zamanla",
    color: "var(--color-accent-warn)",
    count: "3 aktif",
  },
  {
    href: "/admin/dogrulama",
    icon: CheckCircle,
    title: "Veri Doğrulama",
    desc: "Onay bekleyen manuel girişleri incele ve doğrula",
    color: "var(--color-accent-success)",
    count: "12 bekliyor",
  },
  {
    href: "/admin/kullanicilar",
    icon: Users,
    title: "Kullanıcı Yönetimi",
    desc: "Kullanıcılar, abonelikler ve roller",
    color: "var(--color-accent-secondary)",
    count: null,
  },
  {
    href: "/admin/analitik",
    icon: BarChart3,
    title: "Platform Analitik",
    desc: "Kullanım istatistikleri ve performans metrikleri",
    color: "var(--color-accent-primary)",
    count: null,
  },
];

const recentActivity = [
  { action: "Manuel giriş eklendi", detail: "İstanbul / Kadıköy — saha gözlemi", time: "2 saat önce", status: "pending" },
  { action: "Toplu veri yüklendi", detail: "81 il nüfus verileri (2025)", time: "5 saat önce", status: "done" },
  { action: "Scraper hatası", detail: "Ekşi Sözlük scraper timeout", time: "8 saat önce", status: "error" },
  { action: "Veri doğrulandı", detail: "Ankara / Çankaya — anket sonucu", time: "1 gün önce", status: "done" },
  { action: "Yeni kullanıcı", detail: "mehmet@arastirma.com — Profesyonel plan", time: "1 gün önce", status: "done" },
];

export default function AdminPage() {
  return (
    <div style={{ background: "var(--color-bg-primary)" }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
            >
              Admin Paneli
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
              Veri yönetimi, kullanıcılar ve platform ayarları.
            </p>
          </div>
          <Link
            href="/admin/ayarlar"
            className="p-2 rounded-sm hover:bg-[var(--color-bg-hover)] transition-colors"
          >
            <Settings size={18} style={{ color: "var(--color-text-muted)" }} />
          </Link>
        </div>

        {/* Özet kartları */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Toplam Kayıt", value: "2.4M", icon: Database, color: "var(--color-accent-primary)" },
            { label: "Bugün Eklenen", value: "12.847", icon: Clock, color: "var(--color-accent-info)" },
            { label: "Onay Bekleyen", value: "12", icon: AlertTriangle, color: "var(--color-accent-warn)" },
            { label: "Aktif Scraper", value: "3/8", icon: RefreshCw, color: "var(--color-accent-success)" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="p-4 rounded-sm"
                style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} style={{ color: stat.color }} />
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>{stat.label}</span>
                </div>
                <div className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: stat.color }}>
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Menü kartları */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group p-4 rounded-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-sm flex items-center justify-center"
                        style={{ background: `${item.color}15`, color: item.color }}
                      >
                        <Icon size={20} />
                      </div>
                      {item.count && (
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-sm font-medium"
                          style={{ background: "var(--color-bg-hover)", color: "var(--color-text-muted)" }}
                        >
                          {item.count}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Son aktiviteler */}
          <div
            className="p-4 rounded-sm"
            style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
          >
            <h2
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-muted)" }}
            >
              Son Aktiviteler
            </h2>
            <div className="space-y-3">
              {recentActivity.map((act, i) => (
                <div key={i} className="flex gap-3">
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{
                      background:
                        act.status === "done" ? "var(--color-accent-success)" :
                        act.status === "error" ? "var(--color-accent-danger)" :
                        "var(--color-accent-warn)",
                    }}
                  />
                  <div>
                    <div className="text-sm font-medium">{act.action}</div>
                    <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{act.detail}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: "var(--color-text-disabled)" }}>{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
