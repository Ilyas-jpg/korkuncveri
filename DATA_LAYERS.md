# 📊 ULAK — VERİ KATMANLARI MASTER DOKÜMANI

> Bu doküman platformda işlenecek TÜM veri katmanlarını tanımlar.
> Her katman: ne verisi, nereden gelecek, nasıl gösterilecek, hangi granülerlikte.
> Mahalle → İlçe → İl → Bölge → Ülke hiyerarşisinde hepsi aggregate edilebilir.

---

## 1. 🗳️ SİYASİ YÖNELİMLER & SEÇİM ANALİZİ

### 1.1 Seçim Sonuçları
| Veri | Granülerlik | Kaynak | Dönem |
|------|------------|--------|-------|
| Sandık bazında oy sayıları | Sandık | YSK açık veri | 2011-2024 |
| Parti oy oranları | Mahalle/İlçe/İl | YSK | 2011-2024 |
| Milletvekili seçim sonuçları | İl | YSK | 2011-2023 |
| Cumhurbaşkanlığı sonuçları | Sandık | YSK | 2014, 2018, 2023 |
| Yerel seçim sonuçları | Sandık | YSK | 2014, 2019, 2024 |
| Referandum sonuçları | Sandık | YSK | 2010, 2017 |
| Katılım oranları | Sandık | YSK | Tüm seçimler |
| Geçersiz oy oranları | Sandık | YSK | Tüm seçimler |

### 1.2 Siyasi Kırılım Analizi
| Metrik | Hesaplama | Gösterim |
|--------|----------|---------|
| **Oy kayması trendi** | Seçimden seçime parti oy değişimi | Çizgi grafik + harita renklendirme |
| **Swing bölge skoru** | Birinci-ikinci fark < %5 olan bölgeler | Heatmap |
| **Blok analizi** | İktidar/muhalefet bloku toplam oy | Pasta grafik |
| **Parçalanmışlık endeksi** | Kaç parti %5 üzeri oy aldı | Sayısal gösterge |
| **Kentsel-kırsal fark** | Aynı ildeki kent vs köy oy farkı | Karşılaştırma bar |
| **Seçmen sadakati** | Aynı partiye oy veren sandık oranı | Yüzde gösterge |
| **Göç-oy korelasyonu** | Göç alan bölgelerde oy kayması | Scatter plot |
| **Eğitim-oy korelasyonu** | Eğitim seviyesi vs parti tercihi | Bubble chart |
| **Gelir-oy korelasyonu** | SES seviyesi vs parti tercihi | Heatmap matrix |
| **Yaş-oy korelasyonu** | Genç nüfus oranı vs oy dağılımı | Scatter plot |

### 1.3 Siyasi Sosyal Medya Nabzı
| Veri | Kaynak | Güncelleme |
|------|--------|-----------|
| Parti/lider mention sayısı | Twitter, Ekşi | Real-time |
| Siyasi duygu analizi (bölge bazlı) | Tüm sosyal medya | Saatlik |
| Politik gündem trending konuları | Twitter, haberler | Real-time |
| Siyasi kutuplaşma endeksi | Sosyal medya sentiment farkı | Günlük |

---

## 2. 👥 DEMOGRAFİ & NÜFUS

### 2.1 Temel Nüfus
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Toplam nüfus | Mahalle | TÜİK ADNKS |
| Cinsiyet dağılımı | Mahalle | TÜİK |
| Yaş grupları (0-4, 5-9, ..., 85+) | Mahalle | TÜİK |
| Medeni durum (evli, bekar, boşanmış, dul) | İlçe | TÜİK |
| Doğum oranı (kaba doğum hızı) | İl | TÜİK |
| Ölüm oranı | İl | TÜİK |
| Bebek ölüm oranı | İl | TÜİK |
| Ortalama yaşam süresi | İl | TÜİK |
| Nüfus artış hızı | İlçe | TÜİK (yıllık hesaplama) |
| Nüfus yoğunluğu (kişi/km²) | Mahalle | TÜİK + alan verisi |
| Medyan yaş | İlçe | TÜİK |
| Bağımlılık oranı (çocuk + yaşlı / çalışma yaşı) | İlçe | TÜİK hesaplama |

### 2.2 Göç Verileri
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Net göç hızı | İl/İlçe | TÜİK |
| Aldığı göç (nereden geliyorlar) | İl | TÜİK |
| Verdiği göç (nereye gidiyorlar) | İl | TÜİK |
| İç göç haritası (il→il akışları) | İl | TÜİK |
| Yabancı uyruklu nüfus | İlçe | GİB/TÜİK |
| Suriyeli geçici koruma altında | İl | GİB |
| Mevsimsel nüfus hareketleri | İlçe | Tahmin modeli |

### 2.3 Hane Yapısı
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Ortalama hane büyüklüğü | İlçe | TÜİK |
| Tek kişilik hane oranı | İlçe | TÜİK |
| Çekirdek aile oranı | İlçe | TÜİK |
| Geniş aile oranı | İlçe | TÜİK |
| Konut sahipliği oranı | İlçe | TÜİK |
| Kiracı oranı | İlçe | TÜİK |

---

## 3. 🎓 EĞİTİM DÜZEYLERİ & EĞİTİM KALİTESİ

### 3.1 Eğitim Seviyesi Dağılımı
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Okuma-yazma bilmeyen | Mahalle | TÜİK |
| İlkokul mezunu | Mahalle | TÜİK |
| Ortaokul mezunu | Mahalle | TÜİK |
| Lise mezunu | Mahalle | TÜİK |
| Üniversite mezunu (ön lisans) | Mahalle | TÜİK |
| Üniversite mezunu (lisans) | Mahalle | TÜİK |
| Yüksek lisans | İlçe | TÜİK |
| Doktora | İlçe | TÜİK |
| Ortalama eğitim yılı | İlçe | TÜİK hesaplama |

### 3.2 Eğitim Altyapısı
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Okul sayısı (ilkokul, ortaokul, lise) | Mahalle | MEB |
| Öğrenci/öğretmen oranı | İlçe | MEB |
| Derslik başına öğrenci | İlçe | MEB |
| Özel okul/dershane sayısı | Mahalle | MEB + Google Maps |
| Üniversite sayısı ve kontenjan | İl | YÖK |
| Kütüphane sayısı | İlçe | Kültür Bakanlığı |
| Kurs/eğitim merkezi yoğunluğu | Mahalle | Google Maps |

### 3.3 Eğitim Başarı
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| LGS ortalama puanı | İlçe | MEB (açık veri varsa) |
| YKS ortalama puanı | İl | ÖSYM |
| Üniversite yerleştirme oranı | İl | ÖSYM |
| PISA benzeri skorlar (varsa) | İl | MEB |
| Okullaşma oranı (yaş grubu bazlı) | İlçe | TÜİK |
| Devamsızlık oranları | İlçe | MEB |

---

## 4. 🔒 ASAYİŞ & GÜVENLİK

### 4.1 Asayiş Verileri
| Veri | Granülerlik | Kaynak | Not |
|------|------------|--------|-----|
| Genel asayiş olay sayısı | İlçe | EGM istatistik | Hassas - aggregate göster |
| Hırsızlık olay yoğunluğu | İlçe | EGM | Kategori bazlı endeks |
| Trafik kaza sayısı | İlçe | EGM/Jandarma | Açık veri |
| Trafik kaza ölüm/yaralanma | İlçe | TÜİK | Yıllık |
| Uyuşturucu olay yoğunluğu | İl | EGM | Sadece il bazı |
| Kadına şiddet ihbar | İl | ASHSP | Çok hassas |
| Dolandırıcılık/siber suç | İl | EGM | Yeni kategori |

### 4.2 Güvenlik Algısı (Sosyal Veri)
| Veri | Kaynak | Yöntem |
|------|--------|--------|
| "Güvenli mi?" sorusuna sosyal medya yanıtları | Twitter, Ekşi, Google | NLP sentiment |
| Mahalle güvenlik yorumları | Google Maps, Foursquare | Yorum analizi |
| Gece yürüyüş güvenliği algısı | Crowdsource puanlama | Kullanıcı girişi |
| Aydınlatma/kamera altyapı algısı | Crowdsource | Kullanıcı girişi |
| Kadın güvenliği algısı | Sosyal medya + crowdsource | NLP + puanlama |

### 4.3 Bileşik Güvenlik Endeksi
```
Güvenlik Skoru (0-100) =
  (Resmi asayiş verisi × 0.4) +
  (Sosyal algı skoru × 0.3) +
  (Crowdsource puanı × 0.2) +
  (Altyapı skoru × 0.1)
```

### ⚠️ GÜVENLİK VERİSİ ETİK KURALLARI
- Mahalle bazında "suç haritası" YAPMA — stigmatizasyona yol açar
- İlçe bazında genel endeks göster, detay verme
- "Güvenlik endeksi" olarak soyutla, spesifik olay sayısı verme
- Negatif damgalama yerine "iyileşme trendi" göster
- Karşılaştırmada "en güvensiz" sıralaması YAPMA

---

## 5. 💰 EKONOMİ & GELİR

### 5.1 Gelir & İstihdam
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Ortalama hane geliri (SES) | Mahalle | Mapaktif/tahmin modeli |
| İşsizlik oranı | İl | TÜİK İşgücü |
| Genç işsizlik (15-24) | İl | TÜİK |
| Kadın istihdamı oranı | İl | TÜİK |
| Kayıt dışı istihdam tahmini | İl | TÜİK |
| Sektörel istihdam dağılımı | İl | SGK |
| Asgari ücretli çalışan oranı | İl | SGK/tahmin |
| İş ilanı sayısı (bölge bazlı) | İlçe | Kariyer.net scraping |
| En çok aranan meslekler | İl | İş ilanı analizi |

### 5.2 Sosyo-Ekonomik Statü (SES)
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| SES sınıflandırması (A, B, C1, C2, D, E) | Mahalle | Mapaktif + kendi modelimiz |
| Araç sahipliği oranı | İlçe | EGM trafik tescil |
| Lüks araç yoğunluğu | İlçe | Tahmin |
| Kredi kartı harcama endeksi | İl | BKM (açık raporlar) |
| Bireysel kredi hacmi | İl | BDDK |
| Tasarruf oranı | İl | BDDK |

### 5.3 İşletme & Ticaret
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Toplam işletme sayısı | Mahalle | Google Maps + Ticaret Odası |
| Sektörel dağılım | Mahalle | Google Maps kategorileri |
| Yeni açılan işletmeler (aylık) | İlçe | Ticaret Sicil Gazetesi |
| Kapanan işletmeler (aylık) | İlçe | Ticaret Sicil Gazetesi |
| Marka yoğunluğu (franchise vs yerel) | Mahalle | Google Maps |
| AVM/market yoğunluğu | Mahalle | Google Maps |
| Restoran/kafe yoğunluğu | Mahalle | Google Maps |
| Google ortalama rating (sektör bazlı) | Mahalle | Google Places API |
| Sektörel doygunluk endeksi | Mahalle | Hesaplama |

### 5.4 Yaşam Maliyeti
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Ortalama kira (1+1, 2+1, 3+1) | Mahalle | Sahibinden scraping |
| m² satış fiyatı | Mahalle | Sahibinden/Endeksa |
| Temel gıda fiyatları | İl | TÜİK TÜFE sepeti |
| Akaryakıt fiyatları | İl | EPDK |
| Doğalgaz/elektrik fiyatları | İl | EPDK/TEDAŞ |
| Su fiyatları | İlçe (belediye) | Belediye tarifeleri |
| Toplu taşıma maliyeti | İl | Belediyeler |
| Bölgesel TÜFE | İl | TÜİK |

---

## 6. 🏥 SAĞLIK

### 6.1 Sağlık Altyapısı
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Hastane sayısı (devlet + özel) | İlçe | Sağlık Bakanlığı |
| Aile sağlığı merkezi (ASM) sayısı | Mahalle | Sağlık Bakanlığı |
| Eczane sayısı | Mahalle | TEİS + Google Maps |
| Yatak sayısı / 10.000 kişi | İlçe | Sağlık Bakanlığı |
| Hekim sayısı / 10.000 kişi | İlçe | Sağlık Bakanlığı |
| Ambulans erişim süresi tahmini | Mahalle | Mesafe hesaplama |
| Acil servis yoğunluğu | İlçe | Sağlık Bakanlığı |
| Özel klinik/muayenehane yoğunluğu | Mahalle | Google Maps |

### 6.2 Sağlık Göstergeleri
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Obezite oranı tahmini | İl | Sağlık Bakanlığı |
| Aşılama oranı | İl | Sağlık Bakanlığı |
| Kronik hastalık prevalansı | İl | Sağlık Bakanlığı |
| Engelli nüfus oranı | İlçe | ASHSP/TÜİK |
| Yaşlı bakım hizmeti erişimi | İlçe | ASHSP |
| Hava kalitesi (PM2.5, PM10) | İl/İlçe | ÇŞB + sensör verileri |

---

## 7. 🏗️ ALTYAPI & ULAŞIM

### 7.1 Ulaşım
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Metro/tramvay istasyonu mesafesi | Mahalle | Google Maps/OSM |
| Otobüs hattı yoğunluğu | Mahalle | Belediye + GTFS |
| Havaalanı mesafesi | İlçe | Hesaplama |
| Otopark kapasitesi | Mahalle | Belediye + Google |
| Bisiklet yolu uzunluğu | İlçe | Belediye + OSM |
| Trafik yoğunluğu endeksi | Mahalle | Google Traffic API |
| Ortalama ev-iş commute süresi | İlçe | Tahmin modeli |

### 7.2 Dijital Altyapı
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Fiber internet erişimi | Mahalle | Türk Telekom + kullanıcı raporu |
| Ortalama internet hızı | İlçe | Speedtest open data |
| 5G kapsama alanı | Mahalle | Operatör haritaları |
| WiFi hotspot yoğunluğu | Mahalle | Wigle.net / OSM |

### 7.3 Kentsel Altyapı
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Yeşil alan m²/kişi | İlçe | Belediye + OSM |
| Park/bahçe sayısı | Mahalle | Google Maps + OSM |
| Spor tesisi sayısı | Mahalle | Google Maps |
| Çocuk oyun alanı | Mahalle | OSM + crowdsource |
| Aydınlatma kalitesi algısı | Mahalle | Crowdsource |
| Altyapı yaşı (bina ortalama yaşı) | Mahalle | Tapu/Belediye |
| Deprem risk bölgesi | Mahalle | AFAD |
| Sel/heyelan riski | İlçe | AFAD |

---

## 8. 🕌 KÜLTÜREL & SOSYAL YAPI

### 8.1 Dini & Kültürel
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Cami sayısı | Mahalle | Diyanet + Google Maps |
| Kilise/Sinagog/Cemevi | İlçe | Google Maps |
| Türbe/ziyaret yeri | Mahalle | Google Maps + OSM |
| Kültür merkezi/tiyatro/sinema | İlçe | Google Maps |
| Müze/galeri sayısı | İlçe | Kültür Bakanlığı |
| Festival/etkinlik yoğunluğu | İl | Belediye + sosyal medya |

### 8.2 Sosyal Doku
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Dernek/vakıf sayısı | İlçe | İçişleri Bakanlığı |
| Hemşehri derneği yoğunluğu | İlçe | İçişleri |
| Etnik çeşitlilik endeksi (dolaylı) | İlçe | Göç + nüfus analizi |
| Memleket dağılımı (nereden gelmişler) | İlçe | TÜİK doğum yeri |
| Yaşlı nüfus oranı → bakım ihtiyacı | Mahalle | TÜİK |
| Genç nüfus oranı → sosyal dinamizm | Mahalle | TÜİK |

---

## 9. 🌐 SOSYAL MEDYA & ALGI

### 9.1 Platform Bazlı Takip
| Platform | Toplanan Veri | Lokasyon Eşleştirme |
|----------|--------------|-------------------|
| **Twitter/X** | Tweet, RT, like, reply | Geotag + metin analizi ("Kadıköy'de...") |
| **Ekşi Sözlük** | Entry'ler, başlıklar | Başlık adı eşleştirme (il/ilçe/mahalle) |
| **Google Maps** | Yorumlar, rating, fotoğraflar | Direkt lokasyon |
| **Facebook** | Grup postları (public) | Grup adı eşleştirme |
| **Instagram** | Location-tagged postlar | Geotag |
| **YouTube** | Video başlık/açıklama | Metin analizi |
| **Reddit** | r/Turkey, şehir subreddit'leri | Flair + metin analizi |
| **Şikayetvar** | Şikayetler, çözüm oranı | Firma lokasyonu |
| **TripAdvisor** | Turist yorumları | Direkt lokasyon |
| **Foursquare** | Mekan yorumları, check-in | Direkt lokasyon |

### 9.2 NLP / Duygu Analizi Metrikleri
| Metrik | Açıklama |
|--------|---------|
| **Sentiment skoru** | -1 (çok negatif) → +1 (çok pozitif) |
| **Konu sınıflandırma** | Güvenlik, ulaşım, gürültü, temizlik, komşuluk, fiyat, siyaset... |
| **Duygu yoğunluğu** | Nötr mü yoksa güçlü mü (öfke, sevinç, korku, şaşkınlık) |
| **Mention hacmi** | Bölge hakkında ne kadar konuşuluyor |
| **Trend yönü** | Algı iyileşiyor mu kötüleşiyor mu |
| **Word cloud** | En çok geçen kelimeler (bölge bazlı) |
| **Influencer etkisi** | Yüksek takipçili hesapların bölge hakkındaki yorumları |

---

## 10. 🏠 GAYRİMENKUL & KONUT

### 10.1 Fiyat Verileri
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Ortalama m² satış fiyatı | Mahalle | Sahibinden + Hepsiemlak |
| Ortalama kira fiyatı (oda sayısına göre) | Mahalle | Sahibinden |
| Fiyat değişim trendi (aylık) | Mahalle | Zaman serisi |
| Kira/satış oranı (getiri) | Mahalle | Hesaplama |
| İlan sayısı (arz göstergesi) | Mahalle | Sahibinden |
| Satılık/kiralık oranı | Mahalle | Sahibinden |
| Yeni konut projeleri | İlçe | Sahibinden + haberler |

### 10.2 Yapı Stoku
| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Ortalama bina yaşı | Mahalle | Belediye/Tapu |
| Yapı tipi dağılımı (apartman/müstakil/rezidans) | Mahalle | Sahibinden analizi |
| Deprem yönetmeliğine uygunluk | İlçe | Belediye |
| Kentsel dönüşüm alanları | İlçe | ÇŞB |
| İmar planı değişiklikleri | İlçe | Belediye |
| Ruhsatlı inşaat sayısı | İlçe | TÜİK yapı izin |

---

## 11. 🌿 ÇEVRE & İKLİM

| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| Hava kalitesi endeksi (AQI) | İl/İlçe | ÇŞB + IQAir |
| PM2.5 / PM10 seviyeleri | İl/İlçe | ÇŞB |
| Gürültü kirliliği tahmini | Mahalle | OSM + trafik yoğunluğu |
| Yeşil alan oranı | Mahalle | Uydu görüntüsü + OSM |
| Ağaç yoğunluğu | Mahalle | Uydu analizi |
| Deprem risk derecesi | Mahalle | AFAD |
| Sel/taşkın riski | İlçe | DSİ/AFAD |
| Heyelan riski | İlçe | MTA |
| Ortalama sıcaklık/yağış | İl | MGM |
| Güneş enerjisi potansiyeli | İl | YEGM |

---

## 12. 📰 HABER, GÜNDEM & RESMİ KARARLAR

### 12.1 Ulusal Düzey — Devlet & TBMM
| Veri | Kaynak | Güncelleme |
|------|--------|-----------|
| TBMM genel kurul tutanakları | TBMM açık veri | Oturum sonrası |
| Kanun teklifleri & tasarıları | TBMM | Haftalık |
| Meclis komisyon kararları | TBMM | Haftalık |
| Milletvekili soru önergeleri (il bazlı) | TBMM | Haftalık |
| Cumhurbaşkanlığı kararnameleri | Resmi Gazete | Günlük |
| Bakanlık genelgeleri | İlgili bakanlık siteleri | Günlük |
| Resmi Gazete ilanları | RG | Günlük |
| KHK ve yönetmelik değişiklikleri | RG | Günlük |
| Sayıştay denetim raporları | Sayıştay | Yıllık |
| Kalkınma ajansı raporları | 26 kalkınma ajansı | Çeyreklik |

### 12.2 İl Düzeyi — Valilik & İl Kurumları
| Veri | Kaynak | Güncelleme |
|------|--------|-----------|
| Valilik duyuruları | 81 valilik sitesi | Günlük |
| İl genel meclisi kararları | İl özel idareleri | Aylık |
| İl koordinasyon kurulu kararları | Valilik | Aylık |
| İl afet planları & güncellemeleri | AFAD il müdürlükleri | Periyodik |
| İl milli eğitim müdürlüğü duyuruları | MEM siteleri | Günlük |
| İl sağlık müdürlüğü duyuruları | İSM siteleri | Günlük |
| İl emniyet müdürlüğü duyuruları | EGM | Günlük |
| Ticaret odası bültenleri | 81 ticaret odası | Haftalık |
| Sanayi odası raporları | Sanayi odaları | Aylık |

### 12.3 Belediye Düzeyi — Büyükşehir & İlçe
| Veri | Kaynak | Güncelleme |
|------|--------|-----------|
| Büyükşehir belediye meclisi kararları | 30 büyükşehir sitesi | Aylık |
| İlçe belediye meclisi kararları | ~973 ilçe belediyesi | Aylık |
| Belediye bütçe raporları | Belediye siteleri | Yıllık |
| İmar planı değişiklikleri | Belediye | Periyodik |
| Kentsel dönüşüm projeleri | Belediye + ÇŞB | Periyodik |
| Belediye ihale ilanları | EKAP + belediye siteleri | Günlük |
| Belediye başkanı açıklamaları | Sosyal medya + basın | Real-time |
| Belediye sosyal medya hesapları | Twitter, Instagram, Facebook | Real-time |
| Halk günü / meclis gündemleri | Belediye siteleri | Haftalık |
| Su kesintisi / altyapı çalışmaları | Belediye + su idareleri | Real-time |
| Toplu taşıma değişiklikleri | Belediye ulaşım | Periyodik |
| Çevre düzenlemesi projeleri | Belediye park bahçeler | Periyodik |

### 12.4 Haber & Medya Akışı
| Veri | Kaynak | Güncelleme |
|------|--------|-----------|
| Ulusal haber akışı | RSS 50+ ana akım kaynak | ⚡ Dakikalık |
| Yerel haber akışı | İl/ilçe bazlı yerel gazeteler | ⚡ Dakikalık |
| Bölgesel TV haberleri | Yerel TV kanalları web siteleri | Saatlik |
| Haber ajansları (AA, İHA, DHA) | RSS/API | ⚡ Dakikalık |
| Köşe yazarları (bölge hakkında) | RSS + scraping | Günlük |
| Doğal afet uyarıları | AFAD | ⚡ Real-time |
| Meteoroloji uyarıları | MGM | ⚡ Real-time |
| Deprem bildirimleri | AFAD/Kandilli | ⚡ Real-time |

### 12.5 Sosyal Medya & Toplumsal Tartışmalar
| Veri | Platform | Toplama Yöntemi | Güncelleme |
|------|----------|----------------|-----------|
| Bölge hakkında tweetler | Twitter/X | API v2 + keyword + geotag | ⚡ Real-time |
| Mahalle/ilçe Ekşi entry'leri | Ekşi Sözlük | Scraping (başlık eşleştirme) | Her 30 dk |
| Mahalle Facebook grupları (public) | Facebook | Graph API (public gruplar) | Saatlik |
| Bölge Instagram postları | Instagram | Location tag + hashtag | Saatlik |
| Reddit tartışmaları | Reddit | API (r/Turkey + şehir sub'ları) | Saatlik |
| YouTube şehir/mahalle videoları | YouTube | Data API v3 + keyword | Günlük |
| TikTok bölge içerikleri | TikTok | Hashtag + location | Günlük |
| Şikayetvar şikayetleri | Şikayetvar | Scraping (firma/kurum bazlı) | Saatlik |
| Google Maps yorumları | Google | Places API | Günlük |
| Foursquare/Swarm yorumları | Foursquare | API | Günlük |
| TripAdvisor yorumları | TripAdvisor | Scraping | Haftalık |
| Blog yazıları (bölge hakkında) | Bloglar | Google Blog Search + RSS | Günlük |
| Forum tartışmaları | DonanımHaber, Technopat vb. | Scraping | Günlük |
| Whatsapp/Telegram public gruplar | İlgili platformlar | Sadece public, izinli | Periyodik |

### 12.6 Resmi Kurum Duyuruları
| Kurum | Veri | Güncelleme |
|-------|------|-----------|
| AFAD | Afet uyarıları, tatbikat duyuruları | Real-time |
| SGK | Prim/emeklilik değişiklikleri | Haftalık |
| GİB (Gelir İdaresi) | Vergi duyuruları, matrah | Periyodik |
| EPDK | Enerji fiyat güncellemeleri | Aylık |
| SPK | Sermaye piyasası duyuruları | Günlük |
| BDDK | Bankacılık düzenlemeleri | Periyodik |
| Rekabet Kurumu | Birleşme/devralma kararları | Periyodik |
| RTÜK | Medya düzenlemeleri | Periyodik |
| BTK | Telekomünikasyon kararları | Periyodik |
| Kızılay | Kan ihtiyacı, afet yardım | Real-time |
| İŞKUR | İstihdam kampanyaları, kurslar | Haftalık |
| KOSGEB | KOBİ destekleri, hibeler | Periyodik |
| TÜBİTAK | Ar-Ge destekleri | Periyodik |
| TOKİ | Yeni konut projeleri | Periyodik |
| Karayolları | Yol çalışmaları, güzergah değişiklikleri | Günlük |
| TCDD | Tren hattı değişiklikleri | Periyodik |

---

## 13. 📱 TEKNOLOJİ & DİJİTAL

| Veri | Granülerlik | Kaynak |
|------|------------|--------|
| E-devlet kullanım oranı | İl | E-devlet istatistikleri |
| İnternet penetrasyonu | İl | BTK |
| Mobil abone sayısı | İl | BTK |
| E-ticaret harcama endeksi | İl | BKM/Webrazzi |
| Startup/teknoloji şirketi yoğunluğu | İlçe | Google Maps + Crunchbase |
| Coworking space sayısı | İlçe | Google Maps |

---

## 14. 🎭 YAŞAM KALİTESİ & YAŞANILIRLIK

### Bileşik Yaşanabilirlik Endeksi (0-100)
```
Yaşanabilirlik = 
  Güvenlik       × 0.15 +
  Eğitim         × 0.12 +
  Sağlık         × 0.10 +
  Ulaşım         × 0.12 +
  Ekonomi        × 0.10 +
  Çevre          × 0.08 +
  Sosyal yaşam   × 0.08 +
  Altyapı        × 0.08 +
  Gayrimenkul    × 0.07 +
  Dijital        × 0.05 +
  Sosyal algı    × 0.05
  ─────────────────────
  Toplam = 1.00
```

### Alt Endeksler
| Endeks | Bileşenler |
|--------|-----------|
| **Aile Dostu Skoru** | Okul kalitesi + park sayısı + güvenlik + oyun alanı |
| **Genç Yaşam Skoru** | Kafe/bar + ulaşım + iş imkanı + kira uygunluğu |
| **Emekli Skoru** | Sağlık erişimi + yeşil alan + sessizlik + maliyet |
| **Yatırım Skoru** | Fiyat trendi + nüfus artışı + altyapı yatırımları |
| **İş Kurma Skoru** | Nüfus yoğunluğu + SES + sektörel boşluk + kira |

---

## 15. 📋 MANUEL VERİ GİRİŞİ KATEGORİLERİ

Sizin (araştırmacı ekibin) sahadan gireceği veriler:

| Kategori | Örnek Veri |
|----------|-----------|
| **Saha gözlemi** | "Bu mahallede gece aydınlatma yetersiz" |
| **Mülakat notları** | "Muhtar: son 2 yılda 500 aile taşındı" |
| **Özel anket sonuçları** | Sizin yaptığınız anket verileri |
| **Kurumsal veri** | Müşteriden/ortaktan gelen özel veri seti |
| **Düzeltme/güncelleme** | Otomatik verinin manuel düzeltilmesi |
| **Etkinlik/olay kaydı** | "15 Mart'ta miting yapıldı, 5000 katılım" |
| **Fotoğraf/belge** | Saha fotoğrafı, resmi belge taraması |
| **Uzman değerlendirmesi** | Analistin bölge hakkındaki profesyonel notu |

---

## 🔢 VERİ BÜYÜKLÜĞÜ TAHMİNİ

| Veri Tipi | Kayıt Sayısı (Tahmini) |
|-----------|----------------------|
| İl kayıtları | 81 |
| İlçe kayıtları | ~973 |
| Mahalle kayıtları | ~32.000 |
| Seçim sandık verileri | ~200.000 sandık × 6 seçim = ~1.2M |
| Sosyal medya postları | Günlük ~50.000 → yılda ~18M |
| Haber kayıtları | Günlük ~5.000 → yılda ~1.8M |
| Google yorumları | ~5M (başlangıç) + günlük ~10.000 |
| İşletme kayıtları | ~3M |
| Demografik zaman serisi | ~32.000 × 10 yıl × 20 metrik = ~6.4M |
| **Toplam (yıl 1 sonu)** | **~30-40M kayıt** |

### Depolama Tahmini
- PostgreSQL (yapılandırılmış veri): ~50-100 GB
- PostGIS (coğrafi veri): ~10-20 GB
- Sosyal medya arşivi: ~200-500 GB (metin ağırlıklı)
- Medya/görseller: ~50 GB
- **Toplam: ~500 GB - 1 TB (Yıl 1)** → Supabase Pro yeterli

---

## ⚖️ HUKUKİ ÇERÇEVE

| Konu | Yaklaşım |
|------|---------|
| **KVKK** | Kişisel veri TOPLAMIYORUZ, aggregate veri işliyoruz |
| **Scraping hukuku** | robots.txt'e uyum, makul hız limiti, sadece public veri |
| **Telif hakkı** | Haber içeriğini özetleme, direkt kopyalamama |
| **Seçim kanunu** | Seçim yasaklarında yayın kısıtlamasına uyum |
| **Araştırmacı yetkisi** | Devlet izni ile alınan verilerin güvenli saklanması |
| **API ToS** | Her platformun API kullanım koşullarına uyum |
| **Veri lisanslama** | TÜİK Creative Commons, OSM ODbL |

---

*Bu doküman, her yeni veri kaynağı keşfedildikçe güncellenecektir.*
