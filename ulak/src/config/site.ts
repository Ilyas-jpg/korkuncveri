export const siteConfig = {
  name: "ULAK",
  tagline: "Türkiye'nin Yaşayan Veri Atlası",
  description:
    "Mahalle bazında demografik veri, seçim analizi, sosyal medya nabzı ve canlı haber akışı. Türkiye'yi tanımanın en güçlü yolu.",
  url: "https://ulak.app",
  ogImage: "/og.png",
  creator: "ULAK Veri Teknolojileri",
  keywords: [
    "Türkiye veri",
    "mahalle analizi",
    "demografik veri",
    "seçim analizi",
    "sosyal medya analizi",
    "bölge profili",
    "nüfus istatistikleri",
  ],
} as const;

export const mapConfig = {
  defaultCenter: [35.2433, 38.9637] as [number, number], // Türkiye merkezi
  defaultZoom: 5.8,
  minZoom: 4,
  maxZoom: 18,
  tileUrl: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  // Alternatif: "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
} as const;
