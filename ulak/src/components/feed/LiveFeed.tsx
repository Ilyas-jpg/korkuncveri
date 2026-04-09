"use client";

import { useState, useMemo } from "react";
import {
  Search, Filter, RefreshCw, TrendingUp, ChevronDown,
  MessageCircle, Newspaper, Building2, Heart, AlertTriangle,
  ExternalLink, ThumbsUp, ThumbsDown, Minus, Clock,
  Hash, MapPin, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── TİPLER ──────────────────────────────────────────────────

type FeedCategory = "all" | "social" | "news" | "official" | "stk";
type SentimentFilter = "all" | "positive" | "negative" | "neutral";

interface FeedItem {
  id: string;
  type: "social" | "news" | "official" | "stk";
  platform: string;
  platformIcon: string;
  author: string;
  content: string;
  url: string;
  province: string;
  district?: string;
  sentiment: number; // -1 to 1
  sentimentLabel: "positive" | "negative" | "neutral";
  topics: string[];
  engagement: number;
  publishedAt: string; // relative time
  timestamp: number;
}

// ─── DEMO VERİ ───────────────────────────────────────────────

const demoFeed: FeedItem[] = [
  {
    id: "1", type: "social", platform: "Twitter/X", platformIcon: "𝕏",
    author: "@istanbulhaberleri", content: "Kadıköy'de yeni tramvay hattı için çalışmalar başladı. Moda-Fikirtepe güzergahı 2027'de tamamlanacak. #İstanbul #Ulaşım",
    url: "#", province: "İstanbul", district: "Kadıköy", sentiment: 0.6, sentimentLabel: "positive",
    topics: ["ulaşım", "metro", "kadıköy"], engagement: 2847, publishedAt: "3 dk önce", timestamp: Date.now() - 180000,
  },
  {
    id: "2", type: "news", platform: "Hürriyet", platformIcon: "📰",
    author: "Hürriyet", content: "Ankara Büyükşehir Belediyesi, 2026 bütçesini açıkladı. Ulaşım yatırımlarına ayrılan pay %35'e çıkarıldı.",
    url: "#", province: "Ankara", sentiment: 0.3, sentimentLabel: "positive",
    topics: ["belediye", "bütçe", "ulaşım"], engagement: 1523, publishedAt: "12 dk önce", timestamp: Date.now() - 720000,
  },
  {
    id: "3", type: "social", platform: "Ekşi Sözlük", platformIcon: "💬",
    author: "sansen_sansen", content: "izmir konak'ta kiralar artık yaşanmaz seviyede. geçen sene 8000 olan daire 18000 olmuş. ne işe gidiyor bu asgari ücret?",
    url: "#", province: "İzmir", district: "Konak", sentiment: -0.7, sentimentLabel: "negative",
    topics: ["kira", "ekonomi", "konak"], engagement: 456, publishedAt: "28 dk önce", timestamp: Date.now() - 1680000,
  },
  {
    id: "4", type: "official", platform: "TBMM", platformIcon: "🏛️",
    author: "TBMM Genel Kurul", content: "Deprem bölgelerindeki yeniden yapılanma için ek bütçe kanun teklifi komisyondan geçti. Hatay, Kahramanmaraş ve Adıyaman öncelikli.",
    url: "#", province: "Hatay", sentiment: 0.4, sentimentLabel: "positive",
    topics: ["deprem", "yeniden yapılanma", "tbmm"], engagement: 8923, publishedAt: "1 saat önce", timestamp: Date.now() - 3600000,
  },
  {
    id: "5", type: "social", platform: "Google Yorumları", platformIcon: "📍",
    author: "Mehmet K.", content: "Antalya Konyaaltı sahili gerçekten güzelleşmiş. Belediye iyi iş çıkarmış, bisiklet yolları ve oturma alanları mükemmel.",
    url: "#", province: "Antalya", district: "Konyaaltı", sentiment: 0.8, sentimentLabel: "positive",
    topics: ["sahil", "belediye", "bisiklet"], engagement: 34, publishedAt: "2 saat önce", timestamp: Date.now() - 7200000,
  },
  {
    id: "6", type: "stk", platform: "AFAD", platformIcon: "🚨",
    author: "AFAD", content: "Bolu Düzce hattında 4.2 büyüklüğünde deprem meydana geldi. Can ve mal kaybı bulunmamaktadır.",
    url: "#", province: "Bolu", sentiment: -0.2, sentimentLabel: "neutral",
    topics: ["deprem", "afad", "bolu"], engagement: 15420, publishedAt: "3 saat önce", timestamp: Date.now() - 10800000,
  },
  {
    id: "7", type: "social", platform: "Reddit", platformIcon: "🤖",
    author: "u/ankara_life", content: "Çankaya'da yeni açılan co-working space'ler hakkında bilgisi olan var mı? Evden çalışmak artık çekilmez oldu.",
    url: "#", province: "Ankara", district: "Çankaya", sentiment: 0.1, sentimentLabel: "neutral",
    topics: ["coworking", "uzaktan çalışma", "çankaya"], engagement: 89, publishedAt: "4 saat önce", timestamp: Date.now() - 14400000,
  },
  {
    id: "8", type: "official", platform: "İBB Meclis", platformIcon: "🏢",
    author: "İstanbul Büyükşehir Belediye Meclisi", content: "Kartal-Pendik metro hattı için 2.8 milyar TL'lik yatırım kararı meclisten geçti. Yapım 2027 Q1'de başlayacak.",
    url: "#", province: "İstanbul", district: "Kartal", sentiment: 0.5, sentimentLabel: "positive",
    topics: ["metro", "yatırım", "belediye meclisi"], engagement: 3241, publishedAt: "5 saat önce", timestamp: Date.now() - 18000000,
  },
  {
    id: "9", type: "social", platform: "Şikayetvar", platformIcon: "⚠️",
    author: "Ayşe T.", content: "Bursa Nilüfer'de 3 gündür su kesintisi var. BUSKI'ye defalarca aradım cevap yok. Rezalet!",
    url: "#", province: "Bursa", district: "Nilüfer", sentiment: -0.9, sentimentLabel: "negative",
    topics: ["su kesintisi", "altyapı", "şikayet"], engagement: 127, publishedAt: "6 saat önce", timestamp: Date.now() - 21600000,
  },
  {
    id: "10", type: "stk", platform: "TEMA", platformIcon: "🌿",
    author: "TEMA Vakfı", content: "Karadeniz bölgesinde başlatılan ağaçlandırma projesi kapsamında 500.000 fidan dikildi. Trabzon, Rize ve Artvin'de çalışmalar sürüyor.",
    url: "#", province: "Trabzon", sentiment: 0.7, sentimentLabel: "positive",
    topics: ["ağaçlandırma", "çevre", "tema"], engagement: 2156, publishedAt: "8 saat önce", timestamp: Date.now() - 28800000,
  },
  {
    id: "11", type: "news", platform: "BBC Türkçe", platformIcon: "📰",
    author: "BBC Türkçe", content: "Diyarbakır Sur ilçesinde restorasyon çalışmaları tamamlandı. UNESCO Dünya Mirası listesindeki surlar yenilendi.",
    url: "#", province: "Diyarbakır", district: "Sur", sentiment: 0.6, sentimentLabel: "positive",
    topics: ["restorasyon", "kültür", "unesco"], engagement: 4521, publishedAt: "10 saat önce", timestamp: Date.now() - 36000000,
  },
  {
    id: "12", type: "social", platform: "TikTok", platformIcon: "🎵",
    author: "@gezginadam", content: "Van Gölü'nde gün batımı 🌅 Hayatımda gördüğüm en güzel manzara! #Van #Türkiye #Gezi",
    url: "#", province: "Van", sentiment: 0.9, sentimentLabel: "positive",
    topics: ["gezi", "turizm", "van gölü"], engagement: 45000, publishedAt: "12 saat önce", timestamp: Date.now() - 43200000,
  },
];

// ─── PLATFORM FİLTRELERİ ─────────────────────────────────────

const platforms = [
  { id: "all", label: "Tümü", icon: "🌐" },
  { id: "twitter", label: "X", icon: "𝕏" },
  { id: "eksi", label: "Ekşi", icon: "💬" },
  { id: "reddit", label: "Reddit", icon: "🤖" },
  { id: "google", label: "Google", icon: "📍" },
  { id: "tiktok", label: "TikTok", icon: "🎵" },
  { id: "sikayetvar", label: "Şikayetvar", icon: "⚠️" },
  { id: "haber", label: "Haberler", icon: "📰" },
  { id: "resmi", label: "Resmi", icon: "🏛️" },
  { id: "stk", label: "STK", icon: "🌿" },
];

// ─── ANA COMPONENT ───────────────────────────────────────────

export function LiveFeed() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<FeedCategory>("all");
  const [sentimentFilter, setSentimentFilter] = useState<SentimentFilter>("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [provinceFilter, setProvinceFilter] = useState("");

  const filteredFeed = useMemo(() => {
    return demoFeed.filter((item) => {
      // Kategori filtresi
      if (categoryFilter !== "all" && item.type !== categoryFilter) return false;

      // Sentiment filtresi
      if (sentimentFilter !== "all" && item.sentimentLabel !== sentimentFilter) return false;

      // Platform filtresi
      if (platformFilter !== "all") {
        const pMap: Record<string, string[]> = {
          twitter: ["Twitter/X"],
          eksi: ["Ekşi Sözlük"],
          reddit: ["Reddit"],
          google: ["Google Yorumları"],
          tiktok: ["TikTok"],
          sikayetvar: ["Şikayetvar"],
          haber: ["Hürriyet", "BBC Türkçe", "NTV", "CNN Türk"],
          resmi: ["TBMM", "İBB Meclis"],
          stk: ["AFAD", "TEMA"],
        };
        if (pMap[platformFilter] && !pMap[platformFilter].includes(item.platform)) return false;
      }

      // İl filtresi
      if (provinceFilter && !item.province.toLowerCase().includes(provinceFilter.toLowerCase())) return false;

      // Kelime arama
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          item.content.toLowerCase().includes(q) ||
          item.author.toLowerCase().includes(q) ||
          item.topics.some((t) => t.toLowerCase().includes(q)) ||
          item.province.toLowerCase().includes(q) ||
          (item.district?.toLowerCase().includes(q) ?? false)
        );
      }
      return true;
    });
  }, [searchQuery, categoryFilter, sentimentFilter, platformFilter, provinceFilter]);

  return (
    <div style={{ background: "var(--color-bg-primary)" }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-6">

        {/* ─── HEADER ─── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
            >
              Canlı Akış
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
              Tüm sosyal medya, haberler, resmi kararlar ve STK duyuruları — tek ekranda.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="flex items-center gap-1.5 px-2 py-1 text-xs rounded-sm animate-pulse-glow"
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                color: "var(--color-accent-success)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-success)]" />
              CANLI
            </span>
            <button
              className="p-2 rounded-sm hover:bg-[var(--color-bg-hover)] transition-colors"
              style={{ color: "var(--color-text-muted)" }}
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* ─── ARAMA & FİLTRELER ─── */}
        <div className="space-y-3 mb-6">
          {/* Arama kutusu */}
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-sm"
            style={{
              background: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <Search size={16} style={{ color: "var(--color-text-muted)" }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Kelime, konu, il, ilçe veya kullanıcı ara... (ör: deprem, kadıköy, kira)"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-text-muted)]"
              style={{ color: "var(--color-text-primary)" }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <X size={14} style={{ color: "var(--color-text-muted)" }} />
              </button>
            )}
          </div>

          {/* Filtre satırı */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Platform filtreleri */}
            <div className="flex flex-wrap gap-1">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatformFilter(p.id)}
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-sm transition-all",
                    platformFilter === p.id
                      ? "shadow-sm"
                      : "hover:bg-[var(--color-bg-hover)]"
                  )}
                  style={
                    platformFilter === p.id
                      ? {
                          background: "var(--color-accent-primary-muted)",
                          color: "var(--color-accent-primary)",
                          border: "1px solid rgba(0, 212, 170, 0.3)",
                        }
                      : {
                          color: "var(--color-text-muted)",
                          border: "1px solid var(--color-border)",
                        }
                  }
                >
                  <span>{p.icon}</span>
                  <span className="hidden sm:inline">{p.label}</span>
                </button>
              ))}
            </div>

            {/* Duygu filtresi */}
            <div className="flex gap-1 ml-2">
              {([
                { id: "all", label: "Tümü", icon: Filter },
                { id: "positive", label: "Pozitif", icon: ThumbsUp },
                { id: "negative", label: "Negatif", icon: ThumbsDown },
                { id: "neutral", label: "Nötr", icon: Minus },
              ] as const).map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSentimentFilter(s.id)}
                    className={cn(
                      "flex items-center gap-1 px-2 py-1 text-xs rounded-sm transition-all",
                      sentimentFilter === s.id
                        ? "bg-[var(--color-bg-hover)]"
                        : ""
                    )}
                    style={{
                      color: sentimentFilter === s.id
                        ? "var(--color-text-primary)"
                        : "var(--color-text-muted)",
                      border: `1px solid ${sentimentFilter === s.id ? "var(--color-border-hover)" : "transparent"}`,
                    }}
                  >
                    <Icon size={11} />
                    <span className="hidden md:inline">{s.label}</span>
                  </button>
                );
              })}
            </div>

            {/* İl filtresi */}
            <div className="ml-auto">
              <div
                className="flex items-center gap-1.5 px-2 py-1 rounded-sm"
                style={{ border: "1px solid var(--color-border)" }}
              >
                <MapPin size={12} style={{ color: "var(--color-text-muted)" }} />
                <input
                  type="text"
                  value={provinceFilter}
                  onChange={(e) => setProvinceFilter(e.target.value)}
                  placeholder="İl filtrele..."
                  className="w-24 bg-transparent text-xs outline-none placeholder:text-[var(--color-text-muted)]"
                  style={{ color: "var(--color-text-primary)" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ─── SONUÇ SAYISI ─── */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            {filteredFeed.length} sonuç
            {searchQuery && <> — &quot;<b style={{ color: "var(--color-accent-primary)" }}>{searchQuery}</b>&quot; araması</>}
          </span>
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Son güncelleme: şimdi
          </span>
        </div>

        {/* ─── FEED LİSTESİ ─── */}
        <div className="space-y-2">
          {filteredFeed.length === 0 ? (
            <div className="text-center py-12">
              <Search size={32} className="mx-auto mb-3" style={{ color: "var(--color-text-muted)" }} />
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Bu filtrelerle eşleşen sonuç bulunamadı.
              </p>
            </div>
          ) : (
            filteredFeed.map((item) => <FeedCard key={item.id} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
}

// ─── FEED KARTI ──────────────────────────────────────────────

function FeedCard({ item }: { item: FeedItem }) {
  const sentimentColor =
    item.sentiment > 0.2 ? "var(--color-accent-success)" :
    item.sentiment < -0.2 ? "var(--color-accent-danger)" :
    "var(--color-accent-warn)";

  const typeColor =
    item.type === "social" ? "var(--color-accent-primary)" :
    item.type === "news" ? "var(--color-accent-info)" :
    item.type === "official" ? "var(--color-accent-secondary)" :
    "var(--color-accent-success)";

  const typeLabel =
    item.type === "social" ? "Sosyal" :
    item.type === "news" ? "Haber" :
    item.type === "official" ? "Resmi" : "STK";

  return (
    <article
      className="p-4 rounded-sm transition-all hover:bg-[var(--color-bg-hover)] group cursor-pointer"
      style={{
        background: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-start gap-3">
        {/* Platform icon */}
        <div
          className="w-10 h-10 rounded-sm flex items-center justify-center text-lg shrink-0"
          style={{ background: "var(--color-bg-tertiary)" }}
        >
          {item.platformIcon}
        </div>

        {/* İçerik */}
        <div className="flex-1 min-w-0">
          {/* Üst bilgi satırı */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm"
              style={{ background: `${typeColor}18`, color: typeColor }}
            >
              {typeLabel}
            </span>
            <span className="text-xs font-semibold" style={{ color: "var(--color-text-primary)" }}>
              {item.platform}
            </span>
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>·</span>
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              {item.author}
            </span>
            <span className="text-xs ml-auto flex items-center gap-1" style={{ color: "var(--color-text-muted)" }}>
              <Clock size={10} /> {item.publishedAt}
            </span>
          </div>

          {/* Metin içeriği */}
          <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--color-text-secondary)" }}>
            {item.content}
          </p>

          {/* Alt bilgi satırı */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Konum */}
            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
              <MapPin size={10} />
              {item.province}{item.district ? ` / ${item.district}` : ""}
            </span>

            {/* Konular */}
            {item.topics.map((topic) => (
              <span
                key={topic}
                className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-sm"
                style={{ background: "var(--color-bg-hover)", color: "var(--color-text-muted)" }}
              >
                <Hash size={8} />{topic}
              </span>
            ))}

            {/* Sağ: engagement + sentiment */}
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                {item.engagement > 1000 ? `${(item.engagement / 1000).toFixed(1)}K` : item.engagement} etkileşim
              </span>
              <span
                className="flex items-center gap-0.5 text-xs font-mono font-bold px-1.5 py-0.5 rounded-sm"
                style={{ background: `${sentimentColor}15`, color: sentimentColor }}
              >
                {item.sentiment > 0 ? "+" : ""}{item.sentiment.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
