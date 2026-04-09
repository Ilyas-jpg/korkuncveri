import {
  Shield, Globe, Search, Camera, FileWarning,
  AlertTriangle, TrendingUp, Activity, Eye, Wifi,
  Server, Lock, AlertCircle, CheckCircle,
} from "lucide-react";
import Link from "next/link";

const threatStats = [
  { label: "Aktif Tehdit", value: "23", icon: AlertTriangle, color: "var(--color-accent-danger)", trend: "+3" },
  { label: "Dark Web Sızıntı", value: "7", icon: Globe, color: "#A855F7", trend: "+1" },
  { label: "Dork Bulgusu", value: "142", icon: Search, color: "var(--color-accent-warn)", trend: "+18" },
  { label: "Açık Kamera", value: "1.247", icon: Camera, color: "var(--color-accent-info)", trend: "stabil" },
  { label: "Exposed Servis", value: "89", icon: Server, color: "#F97316", trend: "-5" },
  { label: "İzlenen Domain", value: "3.410", icon: Eye, color: "var(--color-accent-primary)", trend: "+120" },
];

const recentAlerts = [
  {
    severity: "critical",
    title: "Büyük ölçekli TC kimlik sızıntısı tespit edildi",
    source: "Dark Web Forum",
    province: "Türkiye Geneli",
    time: "14 dk önce",
    status: "onay bekliyor",
  },
  {
    severity: "high",
    title: ".gov.tr uzantılı SQL dump paste edildi",
    source: "Pastebin",
    province: "Ankara",
    time: "2 saat önce",
    status: "inceleniyor",
  },
  {
    severity: "high",
    title: "Belediye admin paneli internete açık",
    source: "Google Dork",
    province: "Bursa",
    time: "4 saat önce",
    status: "bildirildi",
  },
  {
    severity: "medium",
    title: "Kamu kurumu .env dosyası indexed",
    source: "Google Dork",
    province: "İzmir",
    time: "6 saat önce",
    status: "bildirildi",
  },
  {
    severity: "medium",
    title: "Telegram grubunda kurumsal veri satışı ilanı",
    source: "Telegram Monitor",
    province: "İstanbul",
    time: "8 saat önce",
    status: "inceleniyor",
  },
  {
    severity: "low",
    title: "Expired SSL sertifikası — kamu sitesi",
    source: "Censys",
    province: "Konya",
    time: "12 saat önce",
    status: "bildirildi",
  },
];

const severityConfig = {
  critical: { label: "KRİTİK", color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
  high: { label: "YÜKSEK", color: "#F97316", bg: "rgba(249,115,22,0.1)" },
  medium: { label: "ORTA", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  low: { label: "DÜŞÜK", color: "#3B82F6", bg: "rgba(59,130,246,0.1)" },
};

const statusConfig = {
  "onay bekliyor": { color: "var(--color-accent-danger)" },
  "inceleniyor": { color: "var(--color-accent-warn)" },
  "bildirildi": { color: "var(--color-accent-success)" },
};

export default function SecurityDashboard() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
        >
          Güvenlik & İstihbarat Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          Açık kaynak istihbarat, dark web izleme, sızıntı tespiti ve tehdit analizi.
        </p>
      </div>

      {/* Tehdit istatistikleri */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {threatStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-3 rounded-sm"
              style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon size={14} style={{ color: stat.color }} />
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-sm font-mono"
                  style={{
                    background: stat.trend.startsWith("+") ? "rgba(239,68,68,0.1)" : stat.trend.startsWith("-") ? "rgba(16,185,129,0.1)" : "var(--color-bg-hover)",
                    color: stat.trend.startsWith("+") ? "var(--color-accent-danger)" : stat.trend.startsWith("-") ? "var(--color-accent-success)" : "var(--color-text-muted)",
                  }}
                >
                  {stat.trend}
                </span>
              </div>
              <div className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-[10px] mt-0.5 uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Son alarmlar */}
        <div className="lg:col-span-2">
          <div
            className="rounded-sm"
            style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} style={{ color: "var(--color-accent-danger)" }} />
                <span
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-muted)" }}
                >
                  Son Alarmlar
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-sm animate-pulse-glow"
                    style={{ background: "rgba(239,68,68,0.1)", color: "var(--color-accent-danger)" }}>
                CANLI
              </span>
            </div>

            <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
              {recentAlerts.map((alert, i) => {
                const sev = severityConfig[alert.severity as keyof typeof severityConfig];
                const stat = statusConfig[alert.status as keyof typeof statusConfig];
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--color-bg-hover)] transition-colors cursor-pointer"
                  >
                    <div
                      className="px-1.5 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider mt-0.5 shrink-0"
                      style={{ background: sev.bg, color: sev.color }}
                    >
                      {sev.label}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium leading-tight mb-1">{alert.title}</div>
                      <div className="flex items-center gap-3 text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                        <span>{alert.source}</span>
                        <span>·</span>
                        <span>{alert.province}</span>
                        <span>·</span>
                        <span>{alert.time}</span>
                      </div>
                    </div>
                    <div
                      className="text-[10px] px-2 py-0.5 rounded-sm shrink-0 mt-0.5"
                      style={{ background: "var(--color-bg-hover)", color: stat?.color ?? "var(--color-text-muted)" }}
                    >
                      {alert.status}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hızlı erişim */}
        <div className="space-y-3">
          {[
            { href: "/guvenlik/dark-web", icon: Globe, title: "Dark Web İzleme", desc: "Sızıntı ve tehdit takibi", color: "#A855F7", count: "7 aktif bulgu" },
            { href: "/guvenlik/dork-takibi", icon: Search, title: "Dork Takibi", desc: "Google dork sonuçları", color: "var(--color-accent-warn)", count: "142 bulgu" },
            { href: "/guvenlik/kameralar", icon: Camera, title: "Açık Kameralar", desc: "Kamuya açık kamera haritası", color: "var(--color-accent-info)", count: "1.247 kamera" },
            { href: "/guvenlik/sizinti-kontrol", icon: FileWarning, title: "Sızıntı Kontrol", desc: "Domain/email sızıntı sorgula", color: "#F97316", count: "Anlık sorgulama" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
              >
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</div>
                  <div className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>{item.desc}</div>
                </div>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-sm shrink-0"
                  style={{ background: "var(--color-bg-hover)", color: "var(--color-text-muted)" }}
                >
                  {item.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
