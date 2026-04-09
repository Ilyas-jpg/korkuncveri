"use client";

import { useState, useMemo } from "react";
import { provincesData, type ProvinceData } from "@/data/provinces";
import { formatNumber, formatPercent, formatCompact } from "@/lib/utils";
import {
  GitCompare, ChevronDown, Users, Vote, TrendingUp, Shield,
  GraduationCap, Heart, Activity, ArrowUpRight, ArrowDownRight, Minus,
} from "lucide-react";

export function CompareView() {
  const [leftSlug, setLeftSlug] = useState("istanbul");
  const [rightSlug, setRightSlug] = useState("ankara");

  const left = useMemo(() => provincesData.find(p => p.slug === leftSlug), [leftSlug]);
  const right = useMemo(() => provincesData.find(p => p.slug === rightSlug), [rightSlug]);

  if (!left || !right) return null;

  return (
    <div style={{ background: "var(--color-bg-primary)" }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
          >
            Karşılaştır
          </h1>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            İki ili yan yana karşılaştır — demografik, siyasi, ekonomik ve sosyal farkları gör.
          </p>
        </div>

        {/* İl seçici */}
        <div className="flex items-center gap-3 mb-6">
          <ProvinceSelect value={leftSlug} onChange={setLeftSlug} label="Sol" color="var(--color-accent-primary)" />
          <div
            className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
            style={{ background: "var(--color-bg-tertiary)", border: "1px solid var(--color-border)" }}
          >
            <GitCompare size={16} style={{ color: "var(--color-text-muted)" }} />
          </div>
          <ProvinceSelect value={rightSlug} onChange={setRightSlug} label="Sağ" color="var(--color-accent-secondary)" />
        </div>

        {/* Karşılaştırma tablosu */}
        <div className="space-y-3">
          <CompareSection title="Genel" icon={Users}>
            <CompareRow label="Nüfus" left={formatNumber(left.population)} right={formatNumber(right.population)} winner={left.population > right.population ? "left" : "right"} />
            <CompareRow label="Alan (km²)" left={formatNumber(left.area_km2)} right={formatNumber(right.area_km2)} />
            <CompareRow label="Yoğunluk (kişi/km²)" left={formatNumber(Math.round(left.population / left.area_km2))} right={formatNumber(Math.round(right.population / right.area_km2))} />
            <CompareRow label="Bölge" left={left.region.replace("_", " ").toUpperCase()} right={right.region.replace("_", " ").toUpperCase()} />
          </CompareSection>

          <CompareSection title="Demografi" icon={Users}>
            <CompareRow label="Medyan Yaş" left={String(left.demographics.medianAge)} right={String(right.demographics.medianAge)} />
            <CompareRow label="SES Seviyesi" left={left.demographics.sesLevel} right={right.demographics.sesLevel} />
            <CompareRow label="Üniversite Mezunu" left={formatPercent(left.demographics.universityPct)} right={formatPercent(right.demographics.universityPct)} winner={left.demographics.universityPct > right.demographics.universityPct ? "left" : "right"} />
            <CompareRow label="Net Göç" left={`${left.demographics.migrationNet > 0 ? "+" : ""}${formatNumber(left.demographics.migrationNet)}`} right={`${right.demographics.migrationNet > 0 ? "+" : ""}${formatNumber(right.demographics.migrationNet)}`} leftColor={left.demographics.migrationNet > 0 ? "var(--color-accent-success)" : "var(--color-accent-danger)"} rightColor={right.demographics.migrationNet > 0 ? "var(--color-accent-success)" : "var(--color-accent-danger)"} />
          </CompareSection>

          <CompareSection title="Seçim (2024)" icon={Vote}>
            <CompareRow label="Kazanan Parti" left={left.election2024Winner} right={right.election2024Winner} leftColor={left.election2024Color} rightColor={right.election2024Color} />
            <CompareRow label="Kazanan Oy Oranı" left={formatPercent(left.election2024Results[0]?.pct ?? 0)} right={formatPercent(right.election2024Results[0]?.pct ?? 0)} />
            <CompareRow label="Katılım" left={formatPercent(left.participation2024)} right={formatPercent(right.participation2024)} winner={left.participation2024 > right.participation2024 ? "left" : "right"} />
          </CompareSection>

          <CompareSection title="Ekonomi" icon={TrendingUp}>
            <CompareRow label="Ort. Kira (2+1)" left={`₺${formatNumber(left.economy.avgRent2plus1)}`} right={`₺${formatNumber(right.economy.avgRent2plus1)}`} />
            <CompareRow label="m² Satış Fiyatı" left={`₺${formatNumber(left.economy.avgSqmSale)}`} right={`₺${formatNumber(right.economy.avgSqmSale)}`} />
            <CompareRow label="İşletme Sayısı" left={formatNumber(left.economy.businessCount)} right={formatNumber(right.economy.businessCount)} winner={left.economy.businessCount > right.economy.businessCount ? "left" : "right"} />
            <CompareRow label="İşsizlik" left={formatPercent(left.economy.unemploymentRate)} right={formatPercent(right.economy.unemploymentRate)} winner={left.economy.unemploymentRate < right.economy.unemploymentRate ? "left" : "right"} leftColor={left.economy.unemploymentRate > 0.12 ? "var(--color-accent-danger)" : undefined} rightColor={right.economy.unemploymentRate > 0.12 ? "var(--color-accent-danger)" : undefined} />
          </CompareSection>

          <CompareSection title="Güvenlik & Yaşanabilirlik" icon={Shield}>
            <CompareRow label="Güvenlik Skoru" left={`${left.safety.overallScore}/100`} right={`${right.safety.overallScore}/100`} winner={left.safety.overallScore > right.safety.overallScore ? "left" : "right"} />
            <CompareRow label="Güvenlik Trendi" left={left.safety.trend} right={right.safety.trend} leftColor={left.safety.trend === "improving" ? "var(--color-accent-success)" : left.safety.trend === "declining" ? "var(--color-accent-danger)" : "var(--color-accent-warn)"} rightColor={right.safety.trend === "improving" ? "var(--color-accent-success)" : right.safety.trend === "declining" ? "var(--color-accent-danger)" : "var(--color-accent-warn)"} />
            <CompareRow label="Yaşanabilirlik" left={`${left.livability.overallScore}/100`} right={`${right.livability.overallScore}/100`} winner={left.livability.overallScore > right.livability.overallScore ? "left" : "right"} />
            <CompareRow label="Eğitim Skoru" left={`${left.livability.educationScore}/100`} right={`${right.livability.educationScore}/100`} winner={left.livability.educationScore > right.livability.educationScore ? "left" : "right"} />
            <CompareRow label="Sağlık Skoru" left={`${left.livability.healthScore}/100`} right={`${right.livability.healthScore}/100`} winner={left.livability.healthScore > right.livability.healthScore ? "left" : "right"} />
            <CompareRow label="Ulaşım Skoru" left={`${left.livability.transportScore}/100`} right={`${right.livability.transportScore}/100`} winner={left.livability.transportScore > right.livability.transportScore ? "left" : "right"} />
          </CompareSection>

          <CompareSection title="Sosyal Nabız" icon={Activity}>
            <CompareRow label="Duygu Skoru" left={`${left.socialPulse.sentimentScore > 0 ? "+" : ""}${left.socialPulse.sentimentScore.toFixed(2)}`} right={`${right.socialPulse.sentimentScore > 0 ? "+" : ""}${right.socialPulse.sentimentScore.toFixed(2)}`} leftColor={left.socialPulse.sentimentScore > 0.2 ? "var(--color-accent-success)" : left.socialPulse.sentimentScore < -0.2 ? "var(--color-accent-danger)" : "var(--color-accent-warn)"} rightColor={right.socialPulse.sentimentScore > 0.2 ? "var(--color-accent-success)" : right.socialPulse.sentimentScore < -0.2 ? "var(--color-accent-danger)" : "var(--color-accent-warn)"} />
            <CompareRow label="24s Mention" left={formatCompact(left.socialPulse.mentionCount24h)} right={formatCompact(right.socialPulse.mentionCount24h)} winner={left.socialPulse.mentionCount24h > right.socialPulse.mentionCount24h ? "left" : "right"} />
          </CompareSection>
        </div>
      </div>
    </div>
  );
}

// ─── YARDIMCI COMPONENT'LER ──────────────────────────────────

function ProvinceSelect({ value, onChange, label, color }: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  color: string;
}) {
  return (
    <div className="flex-1">
      <div className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "var(--color-text-muted)" }}>{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-sm text-sm font-semibold outline-none appearance-none cursor-pointer"
        style={{
          background: "var(--color-bg-secondary)",
          border: `2px solid ${color}40`,
          color,
          fontFamily: "var(--font-heading)",
        }}
      >
        {provincesData.map((p) => (
          <option key={p.slug} value={p.slug}>{p.name} ({String(p.plate).padStart(2, "0")})</option>
        ))}
      </select>
    </div>
  );
}

function CompareSection({ title, icon: Icon, children }: {
  title: string;
  icon: typeof Users;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-sm overflow-hidden"
      style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <Icon size={13} style={{ color: "var(--color-accent-primary)" }} />
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-heading)" }}
        >
          {title}
        </span>
      </div>
      <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
        {children}
      </div>
    </div>
  );
}

function CompareRow({ label, left, right, winner, leftColor, rightColor }: {
  label: string;
  left: string;
  right: string;
  winner?: "left" | "right";
  leftColor?: string;
  rightColor?: string;
}) {
  return (
    <div className="grid grid-cols-3 items-center px-4 py-2.5 hover:bg-[var(--color-bg-hover)] transition-colors"
         style={{ borderColor: "var(--color-border)" }}>
      <div
        className="text-sm font-bold text-right pr-4"
        style={{
          fontFamily: "var(--font-mono)",
          color: leftColor ?? (winner === "left" ? "var(--color-accent-primary)" : "var(--color-text-primary)"),
        }}
      >
        {winner === "left" && <span className="text-[10px] mr-1">▲</span>}
        {left}
      </div>
      <div className="text-center text-xs" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </div>
      <div
        className="text-sm font-bold pl-4"
        style={{
          fontFamily: "var(--font-mono)",
          color: rightColor ?? (winner === "right" ? "var(--color-accent-secondary)" : "var(--color-text-primary)"),
        }}
      >
        {right}
        {winner === "right" && <span className="text-[10px] ml-1">▲</span>}
      </div>
    </div>
  );
}
