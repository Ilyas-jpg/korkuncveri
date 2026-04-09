# 🔒 ULAK — Güvenlik & İstihbarat Modülü (EMNİYET SEVİYE)

> Bu modül yetkili emniyet birimleri ve araştırmacılar için tasarlanmıştır.
> Tüm özellikler yasal çerçevede, KVKK uyumlu ve denetlenebilir şekilde çalışır.
> Erişim: Çok faktörlü kimlik doğrulama + rol bazlı yetkilendirme + audit log

---

## ⚖️ HUKUKİ ÇERÇEVE — ÖNCE BUNU OKU

### Yasal Dayanak
- **5271 sayılı CMK** — Dijital delil toplama usulü
- **5651 sayılı Kanun** — İnternet ortamında yapılan yayınların düzenlenmesi
- **6698 sayılı KVKK** — Kişisel verilerin korunması
- **2559 sayılı PVSK** — Polis Vazife ve Salahiyet Kanunu
- **Araştırmacı Kimliği Yetkisi** — Devlet izniyle veri işleme

### Etik Kurallar
- ❌ Kişisel veri toplamak/saklamak YASAK (sadece aggregate/anonim veri)
- ❌ Özel hayatın gizliliğini ihlal etmek YASAK
- ❌ İzinsiz kamera erişimi YASAK (sadece kamuya açık akışlar)
- ✅ Açık kaynak istihbarat (OSINT) — yasal
- ✅ Kamuya açık veri analizi — yasal
- ✅ Dark web sızıntı taraması (kurumsal koruma amaçlı) — yasal
- ✅ Exposed asset tespiti (güvenlik açığı bildirimi) — yasal

### Erişim Kontrolü
```
Seviye 1 — Temel Kullanıcı: Demografik + seçim + sosyal veri
Seviye 2 — Profesyonel: + Ekonomik detay + karşılaştırma + rapor
Seviye 3 — Araştırmacı: + Derin analiz + API + toplu veri
Seviye 4 — Emniyet/İstihbarat: + Güvenlik modülü (bu doküman)
Seviye 5 — Admin: Tam erişim + sistem yönetimi
```

---

## 🛡️ MODÜL 1: AÇIK KAYNAK İSTİHBARAT (OSINT) DASHBOARD

### 1.1 Açık Kamera Takibi
**Ne yapıyor**: Kamuya açık trafik kameraları, belediye canlı yayınları, hava durumu kameraları

| Kaynak | Tür | Yasal Durum |
|--------|-----|-------------|
| Belediye trafik kameraları | Canlı yayın | ✅ Kamuya açık |
| KGM yol kameraları | Canlı yayın | ✅ Kamuya açık |
| AFAD / meteoroloji kameraları | Canlı yayın | ✅ Kamuya açık |
| Havaalanı/liman canlı yayınları | Canlı yayın | ✅ Kamuya açık |
| Turizm kameraları (sahil, meydan) | Canlı yayın | ✅ Kamuya açık |

**Özellikler**:
- Harita üzerinde kamera lokasyonları (ikon olarak)
- Canlı akış embed (iframe)
- Kamera durumu: online/offline monitoring
- Bölge bazında kamera yoğunluğu haritası
- Zaman bazlı trafik yoğunluğu analizi

**YAPILMAYACAKLAR**:
- ❌ Yüz tanıma veya kişi takibi
- ❌ Özel mülkteki kameraların izinsiz erişimi
- ❌ Shodan/Censys üzerinden güvenliği zayıf kamera taraması
- ❌ Kamera görüntülerinin kaydedilmesi/arşivlenmesi

### 1.2 Sosyal Medya İstihbarat (SOCMINT)
**Ne yapıyor**: Sosyal medyada keyword, hashtag, konum bazlı izleme

| Yetenek | Açıklama |
|---------|---------|
| **Kelime izleme** | Belirli keyword'lerin tüm platformlarda takibi |
| **Hashtag takibi** | Trending ve hedef hashtag'lerin analizi |
| **Konum bazlı** | Geotag'li içeriklerin bölge bazında filtrelenmesi |
| **Ağ analizi** | Belirli konularda aktif hesapların etkileşim haritası |
| **Duygu dalga analizi** | Bir olayın saatler içinde nasıl yayıldığının görselleştirilmesi |
| **Bot/trol tespiti** | Koordineli davranış kalıplarının tespiti |
| **Dil analizi** | Nefret söylemi, tehdit, radikal içerik tespiti (NLP) |

**YAPILMAYACAKLAR**:
- ❌ Özel hesaplara erişim
- ❌ Kişisel profil oluşturma/fişleme
- ❌ DM/özel mesaj izleme

---

## 🕸️ MODÜL 2: DARK WEB İZLEME & SIZINTI TARAMASI

### 2.1 Dark Web Monitoring
**Ne yapıyor**: .onion siteleri, forumlar ve pazar yerlerinde Türkiye ile ilgili sızıntıları izler

| Kaynak Türü | İzlenen İçerik |
|-------------|---------------|
| **Tor forumları** | Veri satışı ilanları, sızıntı duyuruları |
| **Paste siteleri** | Pastebin, Ghostbin, dpaste — sızıntı dump'ları |
| **Telegram grupları** | Veri satışı, hack grupları (public olanlar) |
| **Breach veritabanları** | HIBP, DeHashed benzeri kontrol |
| **Ransomware blogları** | Fidye saldırı duyuruları (Türk kurumları) |

**Özellikler**:
- 🔴 **Sızıntı Alarm Sistemi**: Türk kurumlarına ait veri sızıntısı tespit edildiğinde anlık bildirim
- 📊 **Sızıntı Dashboard**: Sektörel dağılım, zaman serisi, etkilenen kurum sayısı
- 🔍 **Domain/email kontrol**: Kurumsal domain'in sızıntılarda geçip geçmediğini kontrol
- 📈 **Trend analizi**: Hangi sektörler hedef, artan/azalan tehditler
- 🗺️ **Coğrafi dağılım**: Sızıntıların il bazında dağılımı

### 2.2 Sızıntı Kategorileri
```
├── Kişisel veri sızıntıları (TC kimlik, telefon, adres)
├── Finansal veri sızıntıları (kredi kartı, banka bilgisi)
├── Kurumsal veri sızıntıları (çalışan listesi, müşteri DB)
├── Devlet verisi sızıntıları (resmi belge, yazışma)
├── Sağlık verisi sızıntıları (hasta kayıtları)
├── Eğitim verisi sızıntıları (öğrenci bilgileri)
└── Altyapı sızıntıları (sunucu erişimi, VPN credentials)
```

### 2.3 Teknik Altyapı
```
Python Backend (ayrı servis — Supabase'den bağımsız)
├── Tor proxy rotasyonu (stem kütüphanesi)
├── .onion site crawler (scrapy + tor)
├── Paste site monitör (pastebin API + regex)
├── Telegram bot API (public grup izleme)
├── NLP pipeline (Türkçe entity extraction)
├── Deduplication engine (aynı sızıntıyı tekrar sayma)
└── Alert dispatcher (email + webhook + in-app)
```

---

## 🔍 MODÜL 3: DORK TAKİBİ & EXPOSED ASSET TESPİTİ

### 3.1 Google Dork Monitoring
**Ne yapıyor**: Google, Bing, Yandex üzerinde belirli dork pattern'lerini düzenli olarak tarar

| Dork Kategorisi | Örnek Pattern | Ne Arıyor |
|----------------|---------------|-----------|
| **Belge sızıntısı** | `site:*.gov.tr filetype:pdf "gizli"` | Kamu kurumlarından sızan belgeler |
| **Veritabanı dosyaları** | `filetype:sql "INSERT INTO" site:*.tr` | Açıkta kalmış SQL dump'ları |
| **Konfigürasyon dosyaları** | `filetype:env DB_PASSWORD site:*.tr` | .env dosyası sızıntıları |
| **Login sayfaları** | `intitle:"admin panel" site:*.gov.tr` | Korumasız admin panelleri |
| **Kamera arayüzleri** | `intitle:"webcam" inurl:8080 Turkey` | İnternete açık kameralar |
| **Dizin listeleme** | `intitle:"index of" site:*.edu.tr` | Açık dizin yapıları |
| **Hassas belgeler** | `filetype:xlsx "TC kimlik" site:*.gov.tr` | Kişisel veri içeren dosyalar |
| **Yedek dosyalar** | `filetype:bak OR filetype:old site:*.tr` | Yedek dosya sızıntıları |

### 3.2 Sürekli Tarama Sistemi
```
Cron Job (her 6 saatte bir)
├── Dork kütüphanesini çalıştır (500+ pattern)
├── Sonuçları önceki taramayla karşılaştır
├── Yeni bulgular varsa → severity sınıflandır
│   ├── KRİTİK: Kişisel veri / credentials
│   ├── YÜKSEK: Konfigürasyon / admin panel
│   ├── ORTA: Belge / dizin
│   └── DÜŞÜK: Bilgi ifşası
├── Bildirimleri gönder
└── Dashboard'u güncelle
```

### 3.3 Exposed Asset Discovery
| Kaynak | Ne Taranıyor |
|--------|-------------|
| **Shodan** | Türkiye IP aralığında açık portlar, servisler |
| **Censys** | SSL sertifika analizi, expired sertifikalar |
| **crt.sh** | Subdomain keşfi (Certificate Transparency) |
| **SecurityTrails** | DNS geçmişi, IP değişiklikleri |
| **URLScan.io** | URL analizi, phishing tespiti |
| **VirusTotal** | Domain/IP reputation kontrolü |
| **Wayback Machine** | Silinen sayfaların arşiv kontrolü |

---

## 📡 MODÜL 4: CANLI TEHDİT HARİTASI

### 4.1 Real-time Threat Map
Harita üzerinde canlı olarak gösterilen tehdit katmanları:

| Katman | Veri Kaynağı | Güncelleme |
|--------|-------------|-----------|
| 🔴 **Siber saldırılar** | Honeypot verileri, tehdit feed'leri | Real-time |
| 🟡 **Sızıntı alarmları** | Dark web monitoring | Saatlik |
| 🟠 **Dork bulguları** | Google dork taraması | 6 saatlik |
| 🔵 **Exposed servisler** | Shodan/Censys taraması | Günlük |
| 🟢 **Kamera durumu** | Belediye kamera API'leri | Real-time |
| ⚪ **Asayiş olayları** | Haber + sosyal medya NLP | Real-time |

### 4.2 Threat Intelligence Feed
- **MISP** entegrasyonu (Malware Information Sharing Platform)
- **STIX/TAXII** formatında tehdit verisi alışverişi
- **AbuseIPDB** entegrasyonu (kötü niyetli IP tespiti)
- **AlienVault OTX** (Open Threat Exchange)
- **PhishTank** (phishing URL veritabanı)

---

## 🏗️ TEKNİK MİMARİ

```
┌─────────────────────────────────────────────────────┐
│              ULAK ANA PLATFORM (Next.js)             │
│  Landing / Atlas / Profil / Akış / Karşılaştır      │
├─────────────────────────────────────────────────────┤
│          GÜVENLİK MODÜLÜ (Ayrı Route Group)         │
│  /guvenlik/dashboard                                 │
│  /guvenlik/dark-web                                  │
│  /guvenlik/dork-takibi                               │
│  /guvenlik/kameralar                                 │
│  /guvenlik/tehdit-haritasi                           │
│  /guvenlik/sizinti-kontrol                           │
├─────────────────────────────────────────────────────┤
│              PYTHON BACKEND SERVİSİ                  │
│  (FastAPI — ayrı servis, Vercel'den bağımsız)        │
│                                                      │
│  ├── dark_web_crawler/     (Tor + scrapy)            │
│  ├── dork_scanner/         (Google/Bing API)         │
│  ├── paste_monitor/        (Pastebin API)            │
│  ├── telegram_monitor/     (Telethon)                │
│  ├── shodan_scanner/       (Shodan API)              │
│  ├── nlp_pipeline/         (spaCy + transformers)    │
│  ├── threat_feed/          (MISP + STIX/TAXII)      │
│  └── alert_engine/         (email + webhook)         │
│                                                      │
│  Deploy: Railway / Fly.io / VPS (Tor gerektirir)     │
├─────────────────────────────────────────────────────┤
│                 VERİTABANI                            │
│  Supabase (ana veri) + Redis (cache + queue)         │
│  + Elasticsearch (full-text arama, sızıntı indeksi) │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 BENİM ÖNERİLERİM (EKSTRA)

### Öneri 1: Anomali Tespit Sistemi
Normal pattern'den sapma olduğunda otomatik alarm:
- "Bu mahallede sosyal medya aktivitesi normalin 5 katı" → olay mı var?
- "Bu ilde son 24 saatte 3 farklı sızıntı" → koordineli saldırı mı?
- "Bu bölgede ani nüfus hareketi" → göç dalgası mı?

### Öneri 2: HUMINT Entegrasyonu
Saha ekibinden gelen istihbaratı dijital verilerle çaprazlama:
- Manuel giriş modülü zaten var → güvenlik kategorisi ekle
- GPS lokasyonlu saha raporu
- Fotoğraf + zaman damgası
- Güvenilirlik skoru otomatik hesaplama

### Öneri 3: Trend Tahmin Modeli
Geçmiş veriden gelecek tahmini:
- Asayiş olay yoğunluğu tahmini (bölge + zaman)
- Sosyal gerilim endeksi (sentiment + mention + olay korelasyonu)
- Risk haritası (gelecek 7 gün tahmini)

### Öneri 4: Kurumsal Savunma Skoru
Her il için "dijital savunma olgunluğu" endeksi:
- Kaç kamu kurumu SSL kullanıyor?
- Kaç .gov.tr sitesi güncel?
- Exposed asset sayısı
- Sızıntı geçmişi
- Ortalama yama süresi

### Öneri 5: İlişki Ağı Grafiği (Link Analysis)
Neo4j veya D3 force graph ile:
- Sızıntılarda geçen kurumlar arası ilişki
- Sosyal medyada koordineli hesap ağları
- Olay-konum-zaman ilişki haritası

### Öneri 6: Encrypted Raporlama
Güvenlik modülünden çıkan raporlar:
- End-to-end encrypted PDF
- Watermark'lı (kim indirdi belli olsun)
- Erişim log'u tutulur
- Otomatik süresi dolunca silinir

---

## 🚀 GELİŞTİRME AŞAMALARI

### Faz A — Frontend Dashboard (1-2 gün)
```
✅ /guvenlik route group oluştur
✅ Güvenlik dashboard (özet kartlar + tehdit haritası)
✅ Kamera haritası sayfası (placeholder verilerle)
✅ Sızıntı kontrol sayfası (domain arama formu)
✅ Dork sonuçları listesi sayfası
```

### Faz B — Python Backend (3-5 gün)
```
✅ FastAPI proje scaffold
✅ Paste monitor (Pastebin API)
✅ Google dork scanner (Custom Search API)
✅ Shodan entegrasyonu
✅ Alert engine (email bildirim)
✅ Supabase bağlantısı (sonuçları kaydet)
```

### Faz C — Dark Web Crawler (5-7 gün)
```
✅ Tor proxy kurulumu
✅ .onion site crawler
✅ NLP pipeline (Türkçe entity extraction)
✅ Deduplication
✅ Telegram public grup monitörü
```

### Faz D — Gelişmiş Analitik
```
✅ Anomali tespit algoritması
✅ İlişki ağı grafiği
✅ Trend tahmin modeli
✅ Kurumsal savunma skoru
```

---

## 🔑 GEREKLİ API ANAHTARLARI

| Servis | Amaç | Fiyat |
|--------|------|-------|
| Shodan API | Port/servis tarama | $59/ay (developer) |
| Google Custom Search | Dork tarama | Ücretsiz (100/gün) + ücretli |
| VirusTotal API | Domain/IP analiz | Ücretsiz (500/gün) |
| Pastebin PRO | Paste monitoring | $50/yıl |
| SecurityTrails | DNS istihbarat | Ücretsiz tier var |
| AbuseIPDB | IP reputation | Ücretsiz tier var |
| Have I Been Pwned | Sızıntı kontrol | API key gerekli |
| Telegram API | Grup izleme | Ücretsiz |
| crt.sh | Sertifika analiz | Ücretsiz |
| URLScan.io | URL analiz | Ücretsiz tier var |

---

*Bu doküman gizli bilgi içerir. Sadece yetkili personel erişebilir.*
