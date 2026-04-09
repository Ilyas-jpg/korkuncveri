"use client";

import { X, MapPin, Users, GraduationCap, Vote, TrendingUp, ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatNumber, formatPercent } from "@/lib/utils";

interface MapSidebarProps {
  selectedRegion: string | null;
  onClose: () => void;
}

// Demo veri — gerçek Supabase bağlantısında dinamik olacak
const demoRegion = {
  name: "Kadıköy",
  parent: "İstanbul",
  type: "İlçe" as const,
  slug: "istanbul/kadikoy",
  population: 484_957,
  area: 25.2,
  density: 19_244,
  medianAge: 36.2,
  ses: "A" as const,
  education: {
    university: 0.48,
    highSchool: 0.28,
    primary: 0.18,
    illiterate: 0.01,
  },
  election2024: {
    winner: "CHP",
    winnerPct: 0.658,
    results: [
      { party: "CHP", pct: 0.658, color: "var(--color-party-chp)" },
      { party: "AKP", pct: 0.172, color: "var(--color-party-akp)" },
      { party: "DEM", pct: 0.068, color: "var(--color-party-dem)" },
      { party: "İYİ", pct: 0.041, color: "var(--color-party-iyi)" },
      { party: "Diğer", pct: 0.061, color: "var(--color-party-diger)" },
    ],
    participation: 0.842,
  },
  economy: {
    avgRent2plus1: 22_500,
    avgSqmSale: 95_000,
    businessCount: 14_200,
  },
  sentimentScore: 0.42,
  mentionCount24h: 1_847,
};

export function MapSidebar({ selectedRegion, onClose }: MapSidebarProps) {
  const region = selectedRegion ? demoRegion : null;

  return (
    <aside
      className="w-80 shrink-0 overflow-y-auto border-l"
      style={{
        background: "var(--color-bg-secondary)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b"
        style={{
          background: "var(--color-bg-secondary)",
          borderColor: "var(--color-border)",
        }}
      >
        <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
          {region ? "Bölge Profili" : "Bölge Seçin"}
        </span>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-[var(--color-bg-hover)] transition-colors"
        >
          <X size={16} style={{ color: "var(--color-text-muted)" }} />
        </button>
      </div>

      {!region ? (
        <div className="p-6 text-center">
          <MapPin
            size={32}
            className="mx-auto mb-3"
            style={{ color: "var(--color-text-muted)" }}
          />
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Haritadan bir il, ilçe veya mahalle seçin.
          </p>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {/* Bölge başlık */}
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className="text-xs px-1.5 py-0.5 rounded"
                style={{
                  background: "var(--color-accent-primary-muted)",
                  color: "var(--color-accent-primary)",
                  fontSize: "10px",
                }}
              >
                {region.type}
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                {region.parent}
              </span>
            </div>
            <h2
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {region.name}
            </h2>
            <Link
              href={`/bolge/${region.slug}`}
              className="inline-flex items-center gap-1 text-xs mt-1 hover:underline"
              style={{ color: "var(--color-accent-primary)" }}
            >
              Detaylı profil <ExternalLink size={10} />
            </Link>
          </div>

          {/* Özet kartları */}
          <div className="grid grid-cols-2 gap-2">
            <StatCard
              icon={Users}
              label="Nüfus"
              value={formatNumber(region.population)}
              sub={`${formatNumber(region.density)} kişi/km²`}
            />
            <StatCard
              icon={GraduationCap}
              label="Üniversite"
              value={formatPercent(region.education.university)}
              sub={`Medyan yaş: ${region.medianAge}`}
            />
            <StatCard
              icon={Vote}
              label="Son Seçim"
              value={region.election2024.winner}
              sub={formatPercent(region.election2024.winnerPct)}
              valueColor="var(--color-party-chp)"
            />
            <StatCard
              icon={TrendingUp}
              label="Ort. Kira"
              value={`₺${formatNumber(region.economy.avgRent2plus1)}`}
              sub="2+1 aylık"
            />
          </div>

          {/* Seçim sonuçları */}
          <Section title="Seçim Sonuçları (2024 Yerel)">
            <div className="space-y-2">
              {region.election2024.results.map((r) => (
                <div key={r.party} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ background: r.color }}
                  />
                  <span className="text-xs flex-1" style={{ color: "var(--color-text-secondary)" }}>
                    {r.party}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-bg-hover)" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${r.pct * 100}%`, background: r.color }}
                    />
                  </div>
                  <span
                    className="text-xs font-medium w-12 text-right"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-primary)" }}
                  >
                    {formatPercent(r.pct)}
                  </span>
                </div>
              ))}
              <div className="text-xs pt-1" style={{ color: "var(--color-text-muted)" }}>
                Katılım: {formatPercent(region.election2024.participation)}
              </div>
            </div>
          </Section>

          {/* Eğitim dağılımı */}
          <Section title="Eğitim Dağılımı">
            <div className="space-y-1.5">
              {[
                { label: "Üniversite+", value: region.education.university, color: "var(--color-accent-primary)" },
                { label: "Lise", value: region.education.highSchool, color: "var(--color-accent-secondary)" },
                { label: "İlköğretim", value: region.education.primary, color: "var(--color-accent-warn)" },
              ].map((e) => (
                <div key={e.label} className="flex items-center gap-2">
                  <span className="text-xs w-20" style={{ color: "var(--color-text-muted)" }}>
                    {e.label}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-bg-hover)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${e.value * 100}%`, background: e.color }}
                    />
                  </div>
                  <span className="text-xs font-medium w-10 text-right" style={{ fontFamily: "var(--font-mono)" }}>
                    {formatPercent(e.value)}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          {/* Sosyal Nabız */}
          <Section title="Sosyal Nabız (24s)">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                  Mention sayısı
                </div>
                <div className="text-lg font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                  {formatNumber(region.mentionCount24h)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                  Duygu skoru
                </div>
                <div
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: region.sentimentScore > 0.2
                      ? "var(--color-accent-success)"
                      : region.sentimentScore < -0.2
                        ? "var(--color-accent-danger)"
                        : "var(--color-accent-warn)",
                  }}
                >
                  {region.sentimentScore > 0 ? "+" : ""}
                  {region.sentimentScore.toFixed(2)}
                </div>
              </div>
            </div>
          </Section>
        </div>
      )}
    </aside>
  );
}

// ─── Yardımcı component'ler ─────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  valueColor,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  sub: string;
  valueColor?: string;
}) {
  return (
    <div
      className="p-3 rounded-lg"
      style={{
        background: "var(--color-bg-tertiary)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon size={12} style={{ color: "var(--color-text-muted)" }} />
        <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
          {label}
        </span>
      </div>
      <div
        className="text-base font-bold"
        style={{ fontFamily: "var(--font-heading)", color: valueColor ?? "var(--color-text-primary)" }}
      >
        {value}
      </div>
      <div className="text-[10px] mt-0.5" style={{ color: "var(--color-text-muted)" }}>
        {sub}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="p-3 rounded-lg"
      style={{
        background: "var(--color-bg-tertiary)",
        border: "1px solid var(--color-border)",
      }}
    >
      <h3
        className="text-xs font-semibold mb-2.5 uppercase tracking-wider"
        style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
