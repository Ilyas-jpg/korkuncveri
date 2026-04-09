# 🧠 ULAK — Platform Beyin Fırtınası & Mimari Dokümanı

> **ULAK** — Türkiye'nin en büyük demografik, sosyal ve analitik veri platformu.
> Mahalle bazında canlı veri, sosyal medya nabzı, haber akışı ve derin analitik.
> "Sanki o mahallede yaşayan biriyle konuşuyormuş gibi bilgi."
> 
> *Ulak: Haberi taşıyan, bilgiyi ulaştıran.*

---

## 📊 ENDEKSA ANALİZİ — Ne Yapıyorlar, Ne Eksik?

### Endeksa'nın Güçlü Yönleri
| Özellik | Detay |
|---------|-------|
| **Atlas AI Asistanı** | Yapay zeka destekli gayrimenkul değerleme |
| **Harita Katmanları** | İl → İlçe → Mahalle hiyerarşik navigasyon |
| **Yatırım Skoru** | Bölge bazında yatırım potansiyeli hesaplama |
| **Demografik Veri** | Nüfus, eğitim seviyesi, SES (Sosyo-Ekonomik Statü) |
| **Trend Takibi** | Gayrimenkul fiyat değişim grafikleri |
| **Çok Dilli** | TR, EN, ES, PT desteği |
| **Mobil Uygulama** | iOS ve Android uygulamalar |

### Endeksa'nın Zayıf Yönleri (Bizim Fırsatlarımız)
| Eksiklik | Bizim Çözümümüz |
|----------|----------------|
| ❌ Sadece gayrimenkul odaklı | ✅ Tüm sektörleri kapsayan 360° veri platformu |
| ❌ Sosyal medya verisi yok | ✅ Twitter, Ekşi Sözlük, Google Yorumları, Facebook, Instagram canlı akışı |
| ❌ Haber akışı entegrasyonu yok | ✅ Mahalle/ilçe bazında canlı haber feed'i |
| ❌ Seçim verileri yok | ✅ Sandık bazında seçim analizi ve trend |
| ❌ Duygu analizi yok | ✅ NLP ile bölge bazında sentiment analizi |
| ❌ Canlı veri akışı sınırlı | ✅ Real-time Supabase WebSocket ile canlı güncelleme |
| ❌ Sektörel derinlik yok | ✅ Perakende, sağlık, eğitim, güvenlik katmanları |
| ❌ Karşılaştırma araçları sınırlı | ✅ İki bölgeyi yan yana karşılaştırma |
| ❌ Kullanıcı katkısı yok | ✅ Mahalle sakinlerinden crowdsource veri toplama |
| ❌ Raporlama kısıtlı | ✅ Özelleştirilebilir PDF/Excel rapor oluşturucu |

---

## 🌍 TÜRKİYE'DEKİ MEVCUT OYUNCULAR

### 1. Veri & Demografik Platformlar
| Platform | Ne Yapıyor | Eksikleri |
|----------|-----------|-----------|
| **[Endeksa](https://www.endeksa.com)** | Gayrimenkul değerleme, SES, demografik | Sadece emlak, sosyal veri yok |
| **[TÜİK Veri Portalı](https://data.tuik.gov.tr)** | Resmi istatistikler | Kullanıcı dostu değil, mahalle bazı sınırlı |
| **[Nufusune.com](https://www.nufusune.com)** | İl/İlçe/Mahalle nüfus | Sadece nüfus, analiz yok |
| **[Nufusu.com](https://www.nufusu.com)** | Nüfus istatistikleri | Tek boyutlu veri |
| **[Mapaktif](https://en.mapaktif.com)** | SES haritaları, mahalle verisi | Sadece B2B, kısıtlı erişim |
| **[ULASAV](https://akillisehirler.csb.gov.tr)** | Akıllı şehir açık veri | Erken aşama, kısıtlı veri |

### 2. Sosyal Medya & Duygu Analizi
| Platform | Ne Yapıyor | Eksikleri |
|----------|-----------|-----------|
| **[BoomSonar](https://www.boomsonar.com)** | Sosyal medya dinleme, sentiment | Coğrafi granülerlik yok |
| **[BoomSocial](https://www.boomsocial.com)** | Marka sosyal medya endeksi | Sadece marka odaklı |
| **[Brandwatch](https://brandwatch.com)** | Global sosyal dinleme | Türkiye özelinde zayıf |

### 3. Seçim & Politik Analiz
| Platform | Ne Yapıyor | Eksikleri |
|----------|-----------|-----------|
| **Hürriyet/CNN Türk Seçim** | Seçim sonuç haritaları | Sadece seçim dönemlerinde aktif |
| **[haritalar.web.tr](https://www.haritalar.web.tr)** | Seçim sonuç haritaları | Statik, analiz yok |

### 4. Coğrafi Veri Kaynakları
| Kaynak | İçerik |
|--------|--------|
| **[Esri Demographics Turkey](https://doc.arcgis.com)** | Michael Bauer Research verisi |
| **[OpenStreetMap Turkey](https://download.geofabrik.de/europe/turkey.html)** | Yol, bina, POI verileri |
| **[NVI UAVT](https://nip.tuik.gov.tr)** | Ulusal Adres Veritabanı |
| **GitHub açık veri** | İl/İlçe/Mahalle GeoJSON, SQL dump'ları |

---

## 🎯 BİZİM FARKIMIZ — "ULAK" DEĞERİ

### Hiçbir Platformun Yapmadığı
```
Endeksa      = Gayrimenkul + Demografi
BoomSonar    = Sosyal Medya (coğrafi yok)
TÜİK         = Resmi istatistik (UX berbat)
Seçim siteleri = Sadece oy sonuçları

ULAK = HEPSİ + Canlı + Mahalle Bazında + Çapraz Analiz
```

---

## 🏗️ PLATFORM MİMARİSİ

### Tech Stack
```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                          │
│  Next.js 15 (App Router) + TypeScript               │
│  Mapbox GL / MapLibre GL (Harita)                    │
│  D3.js + Recharts (Grafik & Visualization)           │
│  Tailwind CSS v4 + Framer Motion                     │
│  Vercel (Deploy)                                     │
├─────────────────────────────────────────────────────┤
│                    BACKEND                           │
│  Supabase (PostgreSQL + PostGIS + Auth + Realtime)   │
│  Supabase Edge Functions (Serverless Logic)           │
│  Vercel Functions (API Routes, Heavy Processing)     │
│  Redis (Upstash — Cache Layer)                       │
├─────────────────────────────────────────────────────┤
│                  VERİ KATMANI                        │
│  PostGIS (Coğrafi sorgular, mahalle sınırları)       │
│  TimescaleDB ext. (Zaman serisi veri)                │
│  Supabase Realtime (WebSocket canlı veri)            │
│  Supabase Storage (Görseller, raporlar)              │
├─────────────────────────────────────────────────────┤
│               VERİ TOPLAMA (ETL)                     │
│  Cron Jobs → Haber scraperları                       │
│  Twitter/X API → Sosyal medya akışı                  │
│  Google Places API → İşletme yorumları               │
│  RSS Feeds → Haber kaynakları                        │
│  TÜİK API → Resmi istatistikler                     │
│  YSK Veri → Seçim sonuçları                          │
│  Manuel veri girişi → Admin paneli                   │
└─────────────────────────────────────────────────────┘
```

### Veritabanı Şeması (Çekirdek)
```
provinces (81 il)
├── districts (ilçeler)
│   ├── neighborhoods (mahalleler)
│   │   ├── demographics (nüfus, yaş, eğitim, SES)
│   │   ├── elections (sandık bazında sonuçlar)
│   │   ├── social_feed (sosyal medya postları)
│   │   ├── news_feed (haber akışları)
│   │   ├── reviews (Google, Foursquare yorumları)
│   │   ├── sentiment_scores (duygu analizi puanları)
│   │   ├── economic_data (işletme sayısı, fiyatlar)
│   │   ├── safety_data (asayiş verileri)
│   │   ├── education_data (okul sayıları, başarı)
│   │   └── health_data (sağlık kuruluşları)
│   └── boundaries (GeoJSON sınırlar)
└── boundaries (il sınırları GeoJSON)

users
├── subscriptions (abonelik planları)
├── saved_reports (kaydedilmiş raporlar)
├── alerts (bölge alarmları)
└── bookmarks (favori bölgeler)
```

---

## 📱 SAYFA & ÖZELLİK HARİTASI

### 1. 🗺️ ATLAS (Ana Harita Sayfası)
**Endeksa'nın Atlas'ının 10x gelişmiş versiyonu**

- **İnteraktif harita**: MapLibre GL ile Türkiye haritası
- **Katman sistemi**:
  - 📊 Demografik (nüfus yoğunluğu, yaş dağılımı, eğitim)
  - 🗳️ Seçim (parti dağılımı, sandık bazında sonuçlar)
  - 💬 Sosyal nabız (sentiment heat map)
  - 💰 Ekonomik (ortalama gelir, işletme yoğunluğu)
  - 🏥 Sağlık (hastane/eczane yoğunluğu)
  - 📚 Eğitim (okul başarı haritası)
  - 🔒 Güvenlik (asayiş endeksi)
  - 🏗️ Gayrimenkul (m² fiyatları, kira endeksi)
- **Zoom seviyeleri**: Ülke → İl → İlçe → Mahalle → Sokak
- **Heatmap modu**: Veri yoğunluğuna göre renk gradyanı
- **Karşılaştırma**: Split-screen ile iki bölgeyi yan yana
- **Zaman çizelgesi**: Slider ile geçmiş verileri göster (2018-2026)

### 2. 📍 BÖLGE PROFİLİ (Mahalle/İlçe/İl Detay Sayfası)
**"Sanki o mahallede yaşayan biriyle konuşuyormuş gibi"**

- **Özet kartı**: Nüfus, alan, yoğunluk, SES seviyesi
- **Demografik dağılım**: Yaş piramidi, eğitim grafiği, cinsiyet dağılımı
- **Canlı sosyal akış**: O bölge hakkında son tweetler, ekşi entry'leri, haberler
- **Duygu barometresi**: Bölge hakkındaki genel algı (pozitif/negatif/nötr)
- **Trend grafikleri**: Son 5 yıllık nüfus, fiyat, eğitim trendleri
- **Seçim profili**: Son 3 seçimin karşılaştırmalı sonuçları
- **En çok konuşulan konular**: Word cloud / tag cloud
- **İşletme profili**: Sektörel dağılım, yeni açılan/kapanan işletmeler
- **Yaşam skoru**: 1-100 arası bileşik yaşanabilirlik endeksi
- **Benzer bölgeler**: Demografik olarak benzeyen diğer mahalleler

### 3. 📰 CANLI AKIŞ (Feed Sayfası)
- **Real-time haber akışı**: İl/ilçe bazında filtrelenebilir
- **Sosyal medya stream'i**: Twitter, Ekşi, Reddit, Facebook
- **Google yorumları**: Mahalle bazında son yorumlar
- **Trend konular**: Bölge bazında trending topic'ler
- **Filtreleme**: Tarih, kaynak, duygu, kategori
- **Bildirim sistemi**: Takip ettiğin bölgede önemli gelişme olursa alert

### 4. 🗳️ SEÇİM ANALİZİ
- **Sandık bazında sonuçlar**: En detaylı seçim haritası
- **Trend analizi**: 2018 → 2023 → 2024 oy kaymaları
- **Demografik korelasyon**: Eğitim-oy, gelir-oy, yaş-oy ilişkileri
- **Swing bölgeler**: Kararsız bölgelerin tespiti
- **Katılım haritası**: Sandık bazında katılım oranları
- **Tahmin modeli**: (İleride AI ile) demografik veriden oy tahmini

### 5. 📊 KARŞILAŞTIRMA ARACI
- **2, 3 veya 4 bölgeyi yan yana**
- **Radar chart**: Çoklu metrik karşılaştırma
- **Tablo görünümü**: Satır satır metrik karşılaştırma
- **Zaman karşılaştırma**: Aynı bölgenin farklı yıllardaki hali

### 6. 📋 RAPOR OLUŞTURUCU
- **Sürükle-bırak rapor tasarımcısı**
- **Şablon kütüphanesi**: Seçim raporu, demografik profil, pazar analizi
- **PDF/Excel/PNG export**
- **Otomatik güncellenen raporlar**: Haftalık/aylık periyodik
- **Paylaşılabilir link**: Raporu link ile paylaş

### 7. 🔔 ALARM SİSTEMİ
- **Bölge alarmı**: "X mahallesinde önemli değişiklik olursa bildir"
- **Konu alarmı**: "İstanbul'da deprem haberi olursa bildir"
- **Eşik alarmı**: "Nüfus %5 artarsa bildir"
- **Email + Push notification + In-app**

### 8. 👤 KULLANICI PANELİ
- **Dashboard**: Kişiselleştirilmiş özet
- **Favori bölgeler**: Hızlı erişim
- **Kaydedilen raporlar**: Geçmiş raporlar
- **API erişimi**: Developer'lar için REST API
- **Abonelik yönetimi**

### 9. 🛠️ ADMİN PANELİ
- **Veri girişi**: Manuel veri yükleme/düzenleme
- **Scraper yönetimi**: Veri toplama job'larının kontrolü
- **Kullanıcı yönetimi**: Abonelik, rol, izinler
- **Veri kalitesi**: Eksik/hatalı veri tespiti
- **Analytics**: Platform kullanım istatistikleri

---

## 💰 GELİR MODELİ

### Freemium Yapı
```
┌─────────────────────────────────────────────┐
│  🆓 ÜCRETSİZ (Keşif Planı)                 │
│  • 3 il bazında temel demografik veri        │
│  • Günlük 5 bölge profili görüntüleme        │
│  • Temel harita katmanları                   │
│  • Son 1 yıllık veri                         │
├─────────────────────────────────────────────┤
│  💼 PROFESYONEL (₺499/ay)                   │
│  • Tüm iller + ilçeler                       │
│  • Sınırsız bölge profili                    │
│  • Sosyal medya akışı                        │
│  • Seçim verileri                            │
│  • Karşılaştırma aracı                       │
│  • Aylık 10 PDF rapor                        │
│  • Son 5 yıllık veri                         │
├─────────────────────────────────────────────┤
│  🏢 KURUMSAL (₺1.999/ay)                    │
│  • Mahalle bazında tüm veri                  │
│  • Canlı sosyal medya + haber akışı          │
│  • Sınırsız rapor                            │
│  • API erişimi (10.000 istek/ay)             │
│  • Özel alarm kuralları                      │
│  • White-label rapor                         │
│  • Tüm geçmiş veri                           │
│  • Öncelikli destek                          │
├─────────────────────────────────────────────┤
│  🏛️ DEVLET / ARAŞTIRMA (Özel Fiyat)         │
│  • Sınırsız API                              │
│  • Ham veri erişimi                          │
│  • Özel veri entegrasyonu                    │
│  • Dedicated account manager                 │
│  • SLA garantisi                             │
│  • On-premise seçeneği                       │
└─────────────────────────────────────────────┘
```

### Ek Gelir Kanalları
- **API Marketplace**: Veri API'si satışı (diğer platformlara)
- **Özel rapor siparişi**: Kurumsal müşteriye özel analiz
- **Reklam**: Bölge bazında hedefli reklam alanı
- **Danışmanlık**: Seçim kampanyası stratejisi, pazar araştırması

---

## 🎯 HEDEF KİTLELER

| Segment | Kullanım Senaryosu | Ödeme Kapasitesi |
|---------|-------------------|-----------------|
| **Seçim araştırma firmaları** | Sandık analizi, demografik profilleme, swing bölge tespiti | ⭐⭐⭐⭐⭐ |
| **Siyasi partiler** | Seçmen profili, kampanya stratejisi | ⭐⭐⭐⭐⭐ |
| **Belediyeler** | Hizmet planlaması, vatandaş memnuniyeti | ⭐⭐⭐⭐ |
| **Gayrimenkul firmaları** | Bölge analizi, yatırım kararı | ⭐⭐⭐⭐ |
| **Perakende zincirleri** | Mağaza yer seçimi, pazar analizi | ⭐⭐⭐⭐⭐ |
| **Bankalar & Finans** | Kredi risk analizi, şube planlaması | ⭐⭐⭐⭐⭐ |
| **Medya kuruluşları** | Haber analizi, bölge raporları | ⭐⭐⭐ |
| **Akademisyenler** | Araştırma verisi | ⭐⭐ |
| **Bireysel kullanıcılar** | Taşınma kararı, merak | ⭐ |
| **STK'lar** | Sosyal proje planlaması | ⭐⭐ |

---

## 📡 VERİ KAYNAKLARI & TOPLAMA STRATEJİSİ

### Resmi / Yapılandırılmış Veriler
| Kaynak | Veri | Güncelleme | Erişim |
|--------|------|-----------|--------|
| TÜİK ADNKS | Nüfus, yaş, eğitim, medeni hal | Yıllık | API/Web scrape |
| YSK | Seçim sonuçları (sandık bazı) | Seçim sonrası | Veri seti |
| NVI UAVT | Adres veritabanı, mahalle sınırları | Sürekli | API |
| MEB | Okul verileri, başarı oranları | Yıllık | Açık veri |
| Sağlık Bakanlığı | Sağlık kuruluşları, kapasite | Yıllık | Açık veri |
| SGK | İstihdam verileri | Aylık | Açık veri |
| Tapu Kadastro | Gayrimenkul verileri | Sürekli | API (araştırmacı yetkisi) |

### Sosyal & Yapılandırılmamış Veriler
| Kaynak | Veri | Güncelleme | Yöntem |
|--------|------|-----------|--------|
| Twitter/X | Bölge bazında tweetler | Real-time | API v2 |
| Ekşi Sözlük | Mahalle/ilçe entry'leri | Saatlik | Web scraping |
| Google Maps/Places | İşletme yorumları, rating | Günlük | Places API |
| Facebook | Grup postları, sayfa yorumları | Saatlik | Graph API |
| Instagram | Location-tagged postlar | Saatlik | Basic Display API |
| Haber siteleri | Bölge haberleri | Dakikalık | RSS + scraping |
| Reddit (r/Turkey) | Tartışmalar | Saatlik | Reddit API |
| Foursquare/Swarm | Mekan yorumları | Günlük | API |

### Türetilmiş / Hesaplanan Veriler
| Metrik | Açıklama | Kaynaklar |
|--------|---------|-----------|
| **Yaşanabilirlik Endeksi** | 0-100 bileşik skor | Tüm veriler |
| **Sosyal Nabız Skoru** | Bölge algısı (+/-/nötr) | Sosyal medya + haberler |
| **Yatırım Potansiyeli** | Ekonomik büyüme tahmini | Demografik + ekonomik |
| **Güvenlik Endeksi** | Asayiş değerlendirmesi | Resmi veri + haberler |
| **Eğitim Kalitesi Skoru** | Okul başarı + erişim | MEB + veliler |
| **Sağlık Erişim Skoru** | Hastane/eczane yakınlığı | Sağlık Bak. + harita |

---

## ⚠️ YAPMAMAMIZ GEREKENLER

### Hukuki Riskler
- ❌ Kişisel veri toplamak/saklamak (KVKK ihlali)
- ❌ İzinsiz scraping (robots.txt'e uyma ZORUNLU)
- ❌ Seçim manipülasyonu algısı yaratacak özellikler
- ❌ Güvenlik verilerini detaylı paylaşmak (suç haritası değiliz)
- ❌ Sağlık verisini bireysel düzeyde işlemek

### Teknik Tuzaklar
- ❌ Tüm veriyi aynı anda toplamaya çalışmak (önceliklendir)
- ❌ Haritayı sıfırdan yazmak (MapLibre kullan)
- ❌ Kendi NLP modelini eğitmek (önce API, sonra fine-tune)
- ❌ Real-time her şey (çoğu veri batch güncellenebilir)
- ❌ Mobile app ile başlamak (önce web, sonra PWA, sonra native)

### UX Tuzakları
- ❌ Veri overload — kullanıcıyı bilgiyle boğma
- ❌ Dashboard'u Endeksa gibi karmaşık yapma
- ❌ Sadece B2B düşünmek — bireysel kullanıcılar viral growth sağlar
- ❌ Kayıt duvarı — temel veriler ücretsiz olmalı (SEO + growth)

---

## 🚀 LANSMAN AŞAMALARI

### FAZA 1 — MVP (8-10 Hafta)
```
✅ Harita + İl/İlçe/Mahalle navigasyon
✅ Temel demografik veri (TÜİK — nüfus, yaş, eğitim)
✅ Seçim sonuçları (2023 + 2024)
✅ Bölge profil sayfaları
✅ Basit karşılaştırma aracı
✅ Kullanıcı auth (Supabase Auth)
✅ Responsive tasarım
✅ SEO-optimized landing page
```

### FAZA 2 — Sosyal Katman (4-6 Hafta)
```
✅ Haber akışı entegrasyonu (RSS)
✅ Twitter/X entegrasyonu
✅ Ekşi Sözlük scraping
✅ Google yorumları
✅ Temel sentiment analizi
✅ Canlı akış sayfası
✅ Alarm sistemi (email)
```

### FAZA 3 — Analitik Derinlik (4-6 Hafta)
```
✅ Gelişmiş karşılaştırma aracı
✅ Rapor oluşturucu
✅ Zaman serisi grafikleri
✅ Yaşanabilirlik endeksi
✅ Ekonomik veriler (işletme, fiyat)
✅ API (developer erişimi)
✅ Ödeme sistemi (Stripe/iyzico)
```

### FAZA 4 — Ölçeklendirme
```
✅ PWA (Progressive Web App)
✅ Gelişmiş NLP / duygu analizi
✅ Yapay zeka entegrasyonu (Claude API)
✅ White-label çözüm
✅ Mobil uygulama (React Native)
✅ Uluslararası genişleme
```

---

## 🎨 TASARIM VİZYONU

### Renk Paleti Önerisi
```css
/* Korkunç Veri — Dark Mode First */
--color-bg-primary: #0A0A0F;        /* Koyu lacivert-siyah */
--color-bg-secondary: #12121A;      /* Kart arka planı */
--color-bg-tertiary: #1A1A25;       /* Hover/aktif */
--color-accent-primary: #00D4AA;    /* Turkuaz-yeşil (ana vurgu) */
--color-accent-secondary: #6366F1;  /* İndigo (ikincil vurgu) */
--color-accent-warn: #F59E0B;       /* Amber (uyarı) */
--color-accent-danger: #EF4444;     /* Kırmızı (negatif) */
--color-accent-success: #10B981;    /* Yeşil (pozitif) */
--color-text-primary: #F1F5F9;      /* Ana metin */
--color-text-secondary: #94A3B8;    /* İkincil metin */
--color-text-muted: #64748B;        /* Soluk metin */
--color-border: #1E293B;            /* Çizgi/sınır */
```

**Gerekçe**: Veri platformları dark-mode'da daha profesyonel ve okunabilir. Turkuaz-yeşil accent, hem güven (finans) hem de teknoloji (data) hissi verir. Endeksa'nın pembe-kırmızısından tamamen farklılaşır.

### Font Önerisi
- **Heading**: Space Grotesk — Teknik, modern, veri platformuna uygun
- **Body**: Be Vietnam Pro — Okunabilir, temiz, Türkçe karakter desteği mükemmel
- **Mono/Data**: JetBrains Mono — Tablolar ve sayısal veriler için

### UI Referansları (İlham Kaynakları)
- **Harita**: Mapbox Studio style, Uber Movement
- **Dashboard**: Linear.app, Vercel Dashboard
- **Data viz**: Observable, The Pudding
- **Genel estetik**: Stripe Radar, Plausible Analytics

---

## 🔐 GÜVENLİK & KVKK

### Veri Sınıflandırması
| Seviye | Örnek | Depolama |
|--------|-------|---------|
| **Açık veri** | TÜİK nüfus, seçim sonuçları | Supabase public |
| **Türetilmiş veri** | Endeksler, skorlar, analizler | Supabase protected |
| **Kullanıcı verisi** | Email, abonelik, tercihler | Supabase encrypted |
| **Hassas veri** | Araştırmacı kimlik bilgileri | Ayrı encrypted store |

### Güvenlik Önlemleri
- Row Level Security (RLS) — Supabase'in güçlü yönü
- Rate limiting — Tüm API endpoint'leri
- CORS — Sadece izin verilen origin'ler
- Input validation — Backend'de MUTLAKA
- SQL injection koruması — PostGIS sorguları dahil
- Supabase Auth — JWT tabanlı, MFA destekli
- Audit log — Kim ne zaman neye erişti

---

## 📐 TEKNİK KARARLAR

### Neden Supabase?
| Avantaj | Açıklama |
|---------|---------|
| PostGIS | Coğrafi sorgular native |
| Realtime | WebSocket ile canlı veri |
| Auth | Hazır kullanıcı yönetimi |
| Storage | Rapor/görsel depolama |
| Edge Functions | Serverless hesaplama |
| Row Level Security | Granüler erişim kontrolü |
| Ücretsiz başlangıç | MVP için yeterli |

### Neden Vercel?
| Avantaj | Açıklama |
|---------|---------|
| Next.js native | SSR + SSG + ISR desteği |
| Edge Network | Düşük latency |
| Serverless Functions | API route'ları |
| Analytics | Kullanım metrikleri |
| Preview Deployments | PR bazında önizleme |
| Cron Jobs | Veri toplama zamanlaması |

### Neden MapLibre (Mapbox değil)?
| MapLibre | Mapbox |
|----------|--------|
| ✅ Açık kaynak, ücretsiz | ❌ Kullanım bazlı ücretli |
| ✅ Self-host tile server | ❌ Vendor lock-in |
| ✅ Mapbox GL JS fork'u | — |
| ✅ Türkiye tile'ları hazır | — |

---

## 🤝 İŞ BİRLİĞİ FIRSATLARI

- **TÜİK**: Resmi veri ortaklığı
- **YSK**: Seçim verisi API erişimi
- **Belediyeler**: Veri paylaşım protokolü
- **Üniversiteler**: Araştırma ortaklığı, veri erişimi
- **STK'lar**: Sosyal etki projeleri
- **Medya**: Veri gazeteciliği ortaklığı

---

## SON SÖZ

Bu platform, Endeksa'nın yaptığını 10x büyütüp tüm sektörlere yaymak değil — **tamamen yeni bir kategori** yaratmak. Türkiye'nin ilk "Yaşayan Veri Atlası". Her mahalle bir canlı organizma gibi izlenebilir, anlaşılabilir, karşılaştırılabilir olacak.

Şimdi yapacağımız ilk şey: **FAZA 1 — MVP'yi inşa etmek.**

---

*Bu doküman, proje boyunca güncellenecek yaşayan bir dokümandır.*
