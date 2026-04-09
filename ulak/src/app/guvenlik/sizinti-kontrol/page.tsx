"use client";

import { useState } from "react";
import {
  Search, FileWarning, Shield, CheckCircle, AlertTriangle,
  Globe, Mail, Server, Clock, ExternalLink,
} from "lucide-react";

const demoResults = [
  { source: "Dark Web Forum", date: "2025-11-14", type: "Veritabanı dump", records: "2.3M kayıt", severity: "critical" },
  { source: "Pastebin", date: "2025-08-22", type: "Email + şifre listesi", records: "45K kayıt", severity: "high" },
  { source: "Telegram Grubu", date: "2025-03-10", type: "Personel listesi", records: "1.2K kayıt", severity: "medium" },
];

export default function LeakCheckPage() {
  const [query, setQuery] = useState("");
  const [queryType, setQueryType] = useState<"domain" | "email">("domain");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearched(true);
    }, 1500);
  };

  return (
    <div className="max-w-[900px] mx-auto px-4 md:px-6 py-6">
      <div className="mb-6">
        <h1
          className="text-xl font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Sızıntı Kontrol
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          Domain veya email adresinin bilinen sızıntılarda geçip geçmediğini kontrol edin.
        </p>
      </div>

      {/* Arama formu */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2 mb-3">
          <button
            type="button"
            onClick={() => setQueryType("domain")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-all"
            style={{
              background: queryType === "domain" ? "var(--color-accent-primary-muted)" : "var(--color-bg-tertiary)",
              color: queryType === "domain" ? "var(--color-accent-primary)" : "var(--color-text-muted)",
              border: `1px solid ${queryType === "domain" ? "rgba(0,212,170,0.3)" : "var(--color-border)"}`,
            }}
          >
            <Globe size={12} /> Domain
          </button>
          <button
            type="button"
            onClick={() => setQueryType("email")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-all"
            style={{
              background: queryType === "email" ? "var(--color-accent-primary-muted)" : "var(--color-bg-tertiary)",
              color: queryType === "email" ? "var(--color-accent-primary)" : "var(--color-text-muted)",
              border: `1px solid ${queryType === "email" ? "rgba(0,212,170,0.3)" : "var(--color-border)"}`,
            }}
          >
            <Mail size={12} /> Email
          </button>
        </div>

        <div className="flex gap-2">
          <div
            className="flex items-center gap-2 flex-1 px-3 py-2.5 rounded-sm"
            style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
          >
            <Search size={16} style={{ color: "var(--color-text-muted)" }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={queryType === "domain" ? "ornek.gov.tr" : "kullanici@ornek.gov.tr"}
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: "var(--color-text-primary)" }}
            />
          </div>
          <button
            type="submit"
            disabled={!query || loading}
            className="px-5 py-2.5 rounded-sm text-sm font-semibold transition-all disabled:opacity-40"
            style={{ background: "var(--color-accent-danger)", color: "white" }}
          >
            {loading ? "Taranıyor..." : "Tara"}
          </button>
        </div>
      </form>

      {/* Sonuçlar */}
      {searched && (
        <div className="space-y-4">
          {/* Özet */}
          <div
            className="flex items-center gap-3 p-4 rounded-sm"
            style={{
              background: "rgba(239,68,68,0.05)",
              border: "1px solid rgba(239,68,68,0.2)",
            }}
          >
            <AlertTriangle size={20} style={{ color: "var(--color-accent-danger)" }} />
            <div>
              <div className="text-sm font-bold" style={{ color: "var(--color-accent-danger)" }}>
                3 sızıntı tespit edildi
              </div>
              <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                &quot;{query}&quot; adresi {demoResults.length} farklı sızıntıda bulundu.
                Bu sonuçlar onay sürecine alınmıştır.
              </div>
            </div>
          </div>

          {/* Sızıntı listesi */}
          <div
            className="rounded-sm overflow-hidden"
            style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
          >
            <div
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-text-muted)", borderBottom: "1px solid var(--color-border)" }}
            >
              Tespit Edilen Sızıntılar
            </div>
            <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
              {demoResults.map((r, i) => {
                const sevColor =
                  r.severity === "critical" ? "#EF4444" :
                  r.severity === "high" ? "#F97316" : "#F59E0B";
                return (
                  <div key={i} className="flex items-center gap-4 px-4 py-3 hover:bg-[var(--color-bg-hover)] transition-colors">
                    <div
                      className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-sm shrink-0"
                      style={{ background: `${sevColor}15`, color: sevColor }}
                    >
                      {r.severity === "critical" ? "KRİTİK" : r.severity === "high" ? "YÜKSEK" : "ORTA"}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{r.type}</div>
                      <div className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                        {r.source} · {r.records}
                      </div>
                    </div>
                    <div className="text-xs" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                      {r.date}
                    </div>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-sm"
                      style={{ background: "rgba(245,158,11,0.1)", color: "var(--color-accent-warn)" }}
                    >
                      onay bekliyor
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[11px] text-center" style={{ color: "var(--color-text-disabled)" }}>
            Bu sonuçlar gerçek zamanlı olarak onaya sunulmuştur. Yetkili onayı olmadan yayınlanmaz.
          </p>
        </div>
      )}
    </div>
  );
}
