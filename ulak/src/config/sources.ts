/**
 * ULAK — Tüm Veri Kaynakları Konfigürasyonu
 * Her kaynak: platform adı, API/scraping yöntemi, güncelleme sıklığı, aktiflik
 */

// ─── SOSYAL MEDYA KAYNAKLARI ─────────────────────────────────

export const socialSources = [
  // Ana platformlar
  { id: "twitter", name: "X (Twitter)", icon: "𝕏", method: "api", apiVersion: "v2", frequency: "realtime", active: true },
  { id: "eksi", name: "Ekşi Sözlük", icon: "💬", method: "scraping", frequency: "30min", active: true },
  { id: "reddit", name: "Reddit", icon: "🤖", method: "api", frequency: "hourly", active: true },
  { id: "facebook", name: "Facebook", icon: "📘", method: "api", apiVersion: "graph", frequency: "hourly", active: true },
  { id: "instagram", name: "Instagram", icon: "📸", method: "api", apiVersion: "basic_display", frequency: "hourly", active: true },
  { id: "tiktok", name: "TikTok", icon: "🎵", method: "api", frequency: "daily", active: true },
  { id: "youtube", name: "YouTube", icon: "▶️", method: "api", apiVersion: "data_v3", frequency: "daily", active: true },
  { id: "pinterest", name: "Pinterest", icon: "📌", method: "api", frequency: "daily", active: true },
  { id: "snapchat", name: "Snapchat", icon: "👻", method: "limited", frequency: "daily", active: false },
  { id: "tumblr", name: "Tumblr", icon: "📝", method: "api", frequency: "daily", active: true },
  { id: "vk", name: "VK", icon: "🔵", method: "api", frequency: "daily", active: true },
  { id: "lemmy", name: "Lemmy", icon: "🐿️", method: "api", frequency: "hourly", active: true },

  // Yorum / Değerlendirme platformları
  { id: "google_maps", name: "Google Yorumları", icon: "📍", method: "api", apiVersion: "places", frequency: "daily", active: true },
  { id: "tripadvisor", name: "TripAdvisor", icon: "🦉", method: "scraping", frequency: "weekly", active: true },
  { id: "foursquare", name: "Foursquare", icon: "📍", method: "api", frequency: "daily", active: true },
  { id: "sikayetvar", name: "Şikayetvar", icon: "⚠️", method: "scraping", frequency: "hourly", active: true },

  // Forum & Blog
  { id: "donanimhaber", name: "DonanımHaber", icon: "💻", method: "scraping", frequency: "daily", active: true },
  { id: "technopat", name: "Technopat", icon: "🔧", method: "scraping", frequency: "daily", active: true },
  { id: "blogs", name: "Blog Yazıları", icon: "✍️", method: "google_blog_search", frequency: "daily", active: true },
] as const;

// ─── HABER KAYNAKLARI ────────────────────────────────────────

export const newsSources = [
  // Haber Ajansları
  { id: "aa", name: "Anadolu Ajansı", type: "ajans", method: "rss", frequency: "realtime", active: true },
  { id: "iha", name: "İHA", type: "ajans", method: "rss", frequency: "realtime", active: true },
  { id: "dha", name: "DHA", type: "ajans", method: "rss", frequency: "realtime", active: true },

  // Haber Aggregatörleri
  { id: "google_news", name: "Google News TR", type: "aggregator", method: "rss", frequency: "realtime", active: true },
  { id: "yandex_news", name: "Yandex News TR", type: "aggregator", method: "scraping", frequency: "hourly", active: true },
  { id: "bing_news", name: "Bing News TR", type: "aggregator", method: "api", frequency: "hourly", active: true },

  // Ulusal Medya
  { id: "hurriyet", name: "Hürriyet", type: "ulusal", method: "rss", frequency: "realtime", active: true },
  { id: "sozcu", name: "Sözcü", type: "ulusal", method: "rss", frequency: "realtime", active: true },
  { id: "sabah", name: "Sabah", type: "ulusal", method: "rss", frequency: "realtime", active: true },
  { id: "milliyet", name: "Milliyet", type: "ulusal", method: "rss", frequency: "realtime", active: true },
  { id: "haberturk", name: "HaberTürk", type: "ulusal", method: "rss", frequency: "realtime", active: true },
  { id: "ntv", name: "NTV", type: "ulusal", method: "rss", frequency: "realtime", active: true },
  { id: "cnnturk", name: "CNN Türk", type: "ulusal", method: "rss", frequency: "realtime", active: true },
  { id: "bbc_turkce", name: "BBC Türkçe", type: "ulusal", method: "rss", frequency: "realtime", active: true },
  { id: "dw_turkce", name: "DW Türkçe", type: "ulusal", method: "rss", frequency: "realtime", active: true },
  { id: "t24", name: "T24", type: "ulusal", method: "rss", frequency: "realtime", active: true },
  { id: "bianet", name: "Bianet", type: "ulusal", method: "rss", frequency: "realtime", active: true },
  { id: "medyascope", name: "Medyascope", type: "ulusal", method: "rss", frequency: "realtime", active: true },
  { id: "gazeteduvar", name: "Gazete Duvar", type: "ulusal", method: "rss", frequency: "realtime", active: true },

  // Yerel medya (il bazlı — dinamik olarak genişleyecek)
  { id: "yerel_genel", name: "Yerel Gazeteler", type: "yerel", method: "rss+scraping", frequency: "hourly", active: true },
] as const;

// ─── RESMİ KURUM KAYNAKLARI ─────────────────────────────────

export const officialSources = [
  // Yasama
  { id: "tbmm", name: "TBMM", type: "yasama", url: "https://www.tbmm.gov.tr", data: ["genel kurul tutanakları", "kanun teklifleri", "komisyon kararları", "soru önergeleri"], frequency: "daily", active: true },

  // Yürütme — Bakanlıklar
  { id: "icisleri", name: "İçişleri Bakanlığı", type: "bakanlik", data: ["valilik duyuruları", "dernekler", "muhtarlar"], frequency: "daily", active: true },
  { id: "cevre", name: "Çevre, Şehircilik ve İklim Değişikliği Bakanlığı", type: "bakanlik", data: ["imar planları", "kentsel dönüşüm", "çevre raporları"], frequency: "weekly", active: true },
  { id: "meb", name: "Milli Eğitim Bakanlığı", type: "bakanlik", data: ["okul verileri", "sınav sonuçları", "öğretmen atamaları"], frequency: "monthly", active: true },
  { id: "saglik", name: "Sağlık Bakanlığı", type: "bakanlik", data: ["hastane verileri", "aşılama", "salgın bilgileri"], frequency: "weekly", active: true },
  { id: "ticaret", name: "Ticaret Bakanlığı", type: "bakanlik", data: ["ticaret sicil", "gümrük verileri"], frequency: "daily", active: true },
  { id: "ulastirma", name: "Ulaştırma ve Altyapı Bakanlığı", type: "bakanlik", data: ["yol projeleri", "ulaşım planları"], frequency: "weekly", active: true },
  { id: "tarim", name: "Tarım ve Orman Bakanlığı", type: "bakanlik", data: ["tarım destekleri", "gıda denetimleri"], frequency: "weekly", active: true },
  { id: "aile", name: "Aile ve Sosyal Hizmetler Bakanlığı", type: "bakanlik", data: ["sosyal yardımlar", "çocuk koruma", "engelli hizmetleri"], frequency: "weekly", active: true },

  // Bağımsız Kurumlar
  { id: "tuik", name: "TÜİK", type: "kurum", url: "https://data.tuik.gov.tr", data: ["nüfus", "ekonomi", "tarım", "sanayi", "ticaret"], frequency: "monthly", active: true },
  { id: "ysk", name: "YSK", type: "kurum", data: ["seçim sonuçları", "seçmen kütüğü"], frequency: "election", active: true },
  { id: "afad", name: "AFAD", type: "kurum", data: ["deprem", "sel", "afet uyarıları", "risk haritaları"], frequency: "realtime", active: true },
  { id: "mgm", name: "Meteoroloji", type: "kurum", data: ["hava durumu", "uyarılar", "iklim verileri"], frequency: "hourly", active: true },
  { id: "epdk", name: "EPDK", type: "kurum", data: ["enerji fiyatları", "akaryakıt"], frequency: "monthly", active: true },
  { id: "bddk", name: "BDDK", type: "kurum", data: ["bankacılık istatistikleri", "kredi verileri"], frequency: "monthly", active: true },
  { id: "spk", name: "SPK", type: "kurum", data: ["sermaye piyasası duyuruları"], frequency: "daily", active: true },
  { id: "btk", name: "BTK", type: "kurum", data: ["internet istatistikleri", "telekomünikasyon"], frequency: "quarterly", active: true },
  { id: "sgk", name: "SGK", type: "kurum", data: ["istihdam", "sigortalı sayısı", "emeklilik"], frequency: "monthly", active: true },
  { id: "iskur", name: "İŞKUR", type: "kurum", data: ["iş ilanları", "istihdam kursları", "işsizlik"], frequency: "weekly", active: true },
  { id: "kosgeb", name: "KOSGEB", type: "kurum", data: ["KOBİ destekleri", "hibeler", "girişimcilik"], frequency: "weekly", active: true },
  { id: "tubitak", name: "TÜBİTAK", type: "kurum", data: ["Ar-Ge destekleri", "bilim projeleri"], frequency: "monthly", active: true },
  { id: "toki", name: "TOKİ", type: "kurum", data: ["konut projeleri", "kura sonuçları"], frequency: "weekly", active: true },
  { id: "ekap", name: "EKAP", type: "kurum", url: "https://ekap.kik.gov.tr", data: ["ihale ilanları"], frequency: "daily", active: true },
  { id: "resmi_gazete", name: "Resmi Gazete", type: "kurum", data: ["kanunlar", "KHK", "yönetmelikler", "ilanlar"], frequency: "daily", active: true },
  { id: "sayistay", name: "Sayıştay", type: "kurum", data: ["denetim raporları", "belediye karneleri"], frequency: "annual", active: true },
  { id: "rekabet", name: "Rekabet Kurumu", type: "kurum", data: ["birleşme/devralma", "soruşturmalar"], frequency: "weekly", active: true },

  // Yerel Yönetim
  { id: "belediyeler_buyuksehir", name: "Büyükşehir Belediyeleri (30)", type: "yerel", data: ["meclis kararları", "bütçe", "imar", "projeler", "ihaleler"], frequency: "monthly", active: true },
  { id: "belediyeler_ilce", name: "İlçe Belediyeleri (~973)", type: "yerel", data: ["meclis kararları", "duyurular", "sosyal yardımlar"], frequency: "monthly", active: true },
  { id: "valilikler", name: "Valilikler (81)", type: "yerel", data: ["duyurular", "koordinasyon kararları", "afet planları"], frequency: "daily", active: true },
  { id: "il_ozel_idareleri", name: "İl Özel İdareleri", type: "yerel", data: ["il genel meclisi kararları", "yatırım planları"], frequency: "monthly", active: true },
  { id: "kalkinma_ajanslari", name: "Kalkınma Ajansları (26)", type: "yerel", data: ["bölge raporları", "hibe programları", "strateji planları"], frequency: "quarterly", active: true },

  // Ticaret Odaları & Meslek Kuruluşları
  { id: "ticaret_odalari", name: "Ticaret Odaları (81+)", type: "meslek", data: ["bültenler", "üye istatistikleri", "fiyat endeksleri"], frequency: "weekly", active: true },
  { id: "sanayi_odalari", name: "Sanayi Odaları", type: "meslek", data: ["sanayi raporları", "kapasite kullanımı"], frequency: "monthly", active: true },
  { id: "barolar", name: "Barolar (81)", type: "meslek", data: ["hukuki duyurular", "adalet istatistikleri"], frequency: "weekly", active: true },
  { id: "tabip_odalari", name: "Tabip Odaları", type: "meslek", data: ["sağlık raporları", "hekim istatistikleri"], frequency: "monthly", active: true },

  // STK & Vakıflar
  { id: "kizilay", name: "Kızılay", type: "stk", data: ["kan ihtiyacı", "afet yardımı", "gıda yardımı"], frequency: "daily", active: true },
  { id: "tema", name: "TEMA Vakfı", type: "stk", data: ["çevre raporları", "ağaçlandırma", "erozyon"], frequency: "weekly", active: true },
  { id: "losev", name: "LÖSEV", type: "stk", data: ["sağlık kampanyaları", "çocuk sağlığı"], frequency: "weekly", active: true },
  { id: "akut", name: "AKUT", type: "stk", data: ["arama kurtarma", "afet müdahale"], frequency: "realtime", active: true },
  { id: "unicef_tr", name: "UNICEF Türkiye", type: "stk", data: ["çocuk hakları", "eğitim raporları"], frequency: "monthly", active: true },
  { id: "tegv", name: "TEGV", type: "stk", data: ["eğitim gönüllülüğü", "öğrenci istatistikleri"], frequency: "monthly", active: true },
  { id: "tohum", name: "Tohum Otizm Vakfı", type: "stk", data: ["otizm farkındalığı", "erken tanı"], frequency: "monthly", active: true },
  { id: "cevre_vakfi", name: "Türkiye Çevre Vakfı", type: "stk", data: ["çevre kirliliği", "sürdürülebilirlik"], frequency: "monthly", active: true },
  { id: "ihh", name: "İHH", type: "stk", data: ["insani yardım", "afet müdahale"], frequency: "weekly", active: true },
  { id: "deniz_temiz", name: "TURMEPA / DenizTemiz", type: "stk", data: ["deniz kirliliği", "kıyı temizliği"], frequency: "monthly", active: true },
] as const;

// ─── ÖZET İSTATİSTİKLER ─────────────────────────────────────

export const sourceSummary = {
  socialPlatforms: socialSources.length,
  newsSources: newsSources.length,
  officialSources: officialSources.length,
  totalSources: socialSources.length + newsSources.length + officialSources.length,
  realtimeSources: [...socialSources, ...newsSources, ...officialSources].filter(s => s.frequency === "realtime").length,
} as const;

// Toplam: ~80+ kaynak
