"use client";

import type { ProvinceData } from "@/data/provinces";
import { formatNumber, formatPercent, formatCompact } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowLeft, Users, GraduationCap, Vote, TrendingUp, Shield,
  Heart, MapPin, Building2, Home, Briefcase, AlertTriangle,
  ThumbsUp, ThumbsDown, Minus, ArrowUpRight, ArrowDownRight,
  MessageCircle, Newspaper, BarChart3, Activity,
} from "lucide-react";

interface Props {
  province: ProvinceData;
}

export function ProvinceProfile({ province: p }: Props) {
  const sentimentColor =
    p.socialPulse.sentimentScore > 0.2 ? "var(--color-accent-success)" :
    p.socialPulse.sentimentScore < -0.2 ? "var(--color-accent-danger)" :
    "var(--color-accent-warn)";

  const trendIcon = p.safety.trend === "improving" ? ArrowUpRight :
    p.safety.trend === "declining" ? ArrowDownRight : Minus;
  const TrendIcon = trendIcon;
  const trendColor = p.safety.trend === "improving" ? "var(--color-accent-success)" :
    p.safety.trend === "declining" ? "var(--color-accent-danger)" : "var(--color-accent-warn)";

  return (
    <div style={{ background: "var(--color-bg-primary)" }}>
      {/* ═══ HEADER ═══ */}
      <div style={{ background: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center gap-2 mb-3">
            <Link
              href="/atlas"
              className="p-1.5 rounded-sm hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              <ArrowLeft size={16} style={{ color: "var(--color-text-muted)" }} />
            </Link>
            <span className="text-xs uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
              Bölge Profili
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1
                  className="text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
                >
                  {p.name}
                </h1>
                <span
                  className="px-2 py-0.5 text-xs font-mono font-bold rounded-sm"
                  style={{
                    background: "var(--color-accent-primary-muted)",
                    color: "var(--color-accent-primary)",
                  }}
                >
                  {String(p.plate).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
                <span className="flex items-center gap-1"><MapPin size={13} /> {p.region.replace("_", " ").toUpperCase()}</span>
                <span className="flex items-center gap-1"><Users size={13} /> {formatNumber(p.population)} kişi</span>
                <span className="flex items-center gap-1"><Home size={13} /> {formatNumber(p.area_km2)} km²</span>
              </div>
            </div>

            {/* Hızlı aksiyonlar */}
            <div className="flex items-center gap-2">
              <Link
                href={`/atlas?focus=${p.slug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors hover:bg-[var(--color-bg-hover)]"
                style={{ border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}
              >
                <MapPin size={12} /> Haritada Göster
              </Link>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors"
                style={{
                  background: "var(--color-accent-primary)",
                  color: "var(--color-bg-primary)",
                }}
              >
                <BarChart3 size={12} /> Karşılaştır
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ İÇERİK ═══ */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-6">

        {/* ─── ÖZET KARTLARI ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
          <MetricCard icon={Users} label="Nüfus" value={formatCompact(p.population)} sub={`${formatNumber(Math.round(p.population / p.area_km2))} kişi/km²`} />
          <MetricCard icon={GraduationCap} label="Üniversite" value={formatPercent(p.demographics.universityPct)} sub={`Medyan yaş: ${p.demographics.medianAge}`} />
          <MetricCard icon={Vote} label="2024 Kazanan" value={p.election2024Winner} valueColor={p.election2024Color} sub={formatPercent(p.election2024Results[0]?.pct ?? 0)} />
          <MetricCard icon={Home} label="Ort. Kira" value={`₺${formatCompact(p.economy.avgRent2plus1)}`} sub="2+1 aylık" />
          <MetricCard icon={Shield} label="Güvenlik" value={`${p.safety.overallScore}/100`} sub={<span className="flex items-center gap-0.5" style={{ color: trendColor }}><TrendIcon size={10} />{p.safety.trend}</span>} />
          <MetricCard icon={Activity} label="Sosyal Nabız" value={formatCompact(p.socialPulse.mentionCount24h)} valueColor={sentimentColor} sub="24s mention" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ─── SOL KOLON: SEÇİM + DEMOGRAFİ ─── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Seçim Sonuçları */}
            <Card title="Seçim Sonuçları — 2024 Yerel" icon={Vote}>
              <div className="space-y-3">
                {p.election2024Results.map((r) => (
                  <div key={r.party} className="flex items-center gap-3">
                    <div className="w-3 h-8 rounded-sm" style={{ background: r.color }} />
                    <span className="w-14 text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                      {r.party}
                    </span>
                    <div className="flex-1 h-6 rounded-sm overflow-hidden" style={{ background: "var(--color-bg-hover)" }}>
                      <div
                        className="h-full rounded-sm transition-all duration-700"
                        style={{ width: `${r.pct * 100}%`, background: r.color }}
                      />
                    </div>
                    <span className="w-16 text-right text-sm font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                      {formatPercent(r.pct)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 flex items-center justify-between text-xs"
                   style={{ borderTop: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
                <span>Katılım oranı: <b style={{ color: "var(--color-text-primary)" }}>{formatPercent(p.participation2024)}</b></span>
                <span>Kazanan: <b style={{ color: p.election2024Color }}>{p.election2024Winner}</b></span>
              </div>
            </Card>

            {/* Ekonomi */}
            <Card title="Ekonomik Göstergeler" icon={TrendingUp}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <MiniStat label="Ort. Kira (2+1)" value={`₺${formatNumber(p.economy.avgRent2plus1)}`} />
                <MiniStat label="m² Satış Fiyatı" value={`₺${formatNumber(p.economy.avgSqmSale)}`} />
                <MiniStat label="İşletme Sayısı" value={formatNumber(p.economy.businessCount)} />
                <MiniStat label="İşsizlik" value={formatPercent(p.economy.unemploymentRate)} color="var(--color-accent-danger)" />
                <MiniStat label="Yeni Açılan" value={`+${formatNumber(p.economy.newBusinesses)}`} color="var(--color-accent-success)" />
                <MiniStat label="Kapanan" value={`-${formatNumber(p.economy.closedBusinesses)}`} color="var(--color-accent-danger)" />
              </div>
            </Card>

            {/* Yaşanabilirlik Radar (bar chart olarak) */}
            <Card title="Yaşanabilirlik Endeksi" icon={Heart}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="text-3xl font-bold"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent-primary)" }}
                >
                  {p.livability.overallScore}
                </div>
                <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>/ 100 puan</span>
              </div>
              <div className="space-y-2">
                {([
                  ["Güvenlik", p.livability.safetyScore],
                  ["Eğitim", p.livability.educationScore],
                  ["Sağlık", p.livability.healthScore],
                  ["Ulaşım", p.livability.transportScore],
                  ["Ekonomi", p.livability.economyScore],
                  ["Çevre", p.livability.environmentScore],
                ] as const).map(([label, score]) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="w-16 text-xs" style={{ color: "var(--color-text-muted)" }}>{label}</span>
                    <div className="flex-1 h-2 rounded-sm" style={{ background: "var(--color-bg-hover)" }}>
                      <div
                        className="h-full rounded-sm"
                        style={{
                          width: `${score}%`,
                          background: score >= 70 ? "var(--color-accent-success)" :
                            score >= 40 ? "var(--color-accent-warn)" : "var(--color-accent-danger)",
                        }}
                      />
                    </div>
                    <span className="w-8 text-xs text-right font-mono" style={{ color: "var(--color-text-primary)" }}>{score}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* ─── SAĞ KOLON: DEMOGRAFİ + SOSYAL ─── */}
          <div className="space-y-6">

            {/* Demografik Profil */}
            <Card title="Demografik Profil" icon={Users}>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--color-text-muted)" }}>Medyan Yaş</span>
                  <span className="font-bold" style={{ fontFamily: "var(--font-mono)" }}>{p.demographics.medianAge}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--color-text-muted)" }}>SES Seviyesi</span>
                  <span className="font-bold px-2 py-0.5 rounded-sm text-xs"
                        style={{ background: "var(--color-accent-primary-muted)", color: "var(--color-accent-primary)" }}>
                    {p.demographics.sesLevel}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--color-text-muted)" }}>Net Göç</span>
                  <span className="font-bold" style={{
                    fontFamily: "var(--font-mono)",
                    color: p.demographics.migrationNet > 0 ? "var(--color-accent-success)" : "var(--color-accent-danger)"
                  }}>
                    {p.demographics.migrationNet > 0 ? "+" : ""}{formatNumber(p.demographics.migrationNet)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--color-text-muted)" }}>Erkek / Kadın</span>
                  <span className="font-mono text-xs">{formatPercent(p.demographics.maleRatio)} / {formatPercent(1 - p.demographics.maleRatio)}</span>
                </div>

                <div className="pt-2" style={{ borderTop: "1px solid var(--color-border)" }}>
                  <div className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--color-text-muted)" }}>Eğitim Dağılımı</div>
                  {([
                    ["Üniversite+", p.demographics.universityPct, "var(--color-accent-primary)"],
                    ["Lise", p.demographics.highSchoolPct, "var(--color-accent-secondary)"],
                    ["İlköğretim", p.demographics.primaryPct, "var(--color-accent-warn)"],
                    ["Okuma-yazma yok", p.demographics.illiteratePct, "var(--color-accent-danger)"],
                  ] as const).map(([label, val, color]) => (
                    <div key={label} className="flex items-center gap-2 mb-1.5">
                      <span className="w-24 text-xs" style={{ color: "var(--color-text-muted)" }}>{label}</span>
                      <div className="flex-1 h-1.5 rounded-sm" style={{ background: "var(--color-bg-hover)" }}>
                        <div className="h-full rounded-sm" style={{ width: `${(val as number) * 100}%`, background: color as string }} />
                      </div>
                      <span className="w-10 text-xs text-right font-mono">{formatPercent(val as number)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Sosyal Nabız */}
            <Card title="Sosyal Nabız (24 saat)" icon={MessageCircle}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>Duygu Skoru</div>
                  <div className="flex items-center gap-1.5">
                    {p.socialPulse.sentimentScore > 0.1 ? <ThumbsUp size={16} style={{ color: sentimentColor }} /> :
                     p.socialPulse.sentimentScore < -0.1 ? <ThumbsDown size={16} style={{ color: sentimentColor }} /> :
                     <Minus size={16} style={{ color: sentimentColor }} />}
                    <span className="text-xl font-bold" style={{ fontFamily: "var(--font-mono)", color: sentimentColor }}>
                      {p.socialPulse.sentimentScore > 0 ? "+" : ""}{p.socialPulse.sentimentScore.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>Mention</div>
                  <div className="text-xl font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                    {formatCompact(p.socialPulse.mentionCount24h)}
                  </div>
                </div>
              </div>

              <div className="pt-3" style={{ borderTop: "1px solid var(--color-border)" }}>
                <div className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--color-text-muted)" }}>Trend Konular</div>
                <div className="flex flex-wrap gap-1.5">
                  {p.socialPulse.trendingTopics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-0.5 text-xs rounded-sm"
                      style={{ background: "var(--color-bg-hover)", color: "var(--color-text-secondary)" }}
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            {/* Son Haberler placeholder */}
            <Card title="Son Haberler" icon={Newspaper}>
              <div className="space-y-3">
                {[
                  { title: `${p.name}'de yeni metro hattı için ihale açıldı`, time: "2 saat önce", cat: "altyapi" },
                  { title: `${p.name} Belediye Meclisi bütçe kararlarını açıkladı`, time: "5 saat önce", cat: "belediye" },
                  { title: `${p.name}'de konut fiyatları son 6 ayda %12 arttı`, time: "1 gün önce", cat: "ekonomi" },
                ].map((news, i) => (
                  <div key={i} className="flex gap-3 p-2 rounded-sm hover:bg-[var(--color-bg-hover)] transition-colors cursor-pointer">
                    <div className="flex-1">
                      <div className="text-sm font-medium leading-tight mb-1">{news.title}</div>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
                        <span className="px-1.5 py-0.5 rounded-sm" style={{ background: "var(--color-bg-hover)" }}>{news.cat}</span>
                        <span>{news.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Yardımcı component'ler ──────────────────────────────────

function Card({ title, icon: Icon, children }: { title: string; icon: typeof Users; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-sm" style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
      <div className="flex items-center gap-2 mb-4">
        <Icon size={14} style={{ color: "var(--color-accent-primary)" }} />
        <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-muted)" }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, sub, valueColor }: {
  icon: typeof Users;
  label: string;
  value: string;
  sub: React.ReactNode;
  valueColor?: string;
}) {
  return (
    <div className="p-3 rounded-sm" style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}>
      <div className="flex items-center gap-1.5 mb-2">
        <Icon size={12} style={{ color: "var(--color-text-muted)" }} />
        <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>{label}</span>
      </div>
      <div className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: valueColor ?? "var(--color-text-primary)" }}>
        {value}
      </div>
      <div className="text-[11px] mt-0.5" style={{ color: "var(--color-text-muted)" }}>{sub}</div>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="p-2.5 rounded-sm" style={{ background: "var(--color-bg-tertiary)", border: "1px solid var(--color-border)" }}>
      <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--color-text-muted)" }}>{label}</div>
      <div className="text-sm font-bold" style={{ fontFamily: "var(--font-mono)", color: color ?? "var(--color-text-primary)" }}>{value}</div>
    </div>
  );
}
