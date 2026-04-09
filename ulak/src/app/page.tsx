import Link from "next/link";
import {
  Map,
  BarChart3,
  Newspaper,
  GitCompare,
  TrendingUp,
  Shield,
  GraduationCap,
  Building2,
  Users,
  Vote,
  Zap,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Map,
    title: "İnteraktif Atlas",
    desc: "İl, ilçe ve mahalle bazında katmanlı harita. Demografik, siyasi, ekonomik tüm veriler tek ekranda.",
    color: "var(--color-accent-primary)",
  },
  {
    icon: Vote,
    title: "Seçim Analizi",
    desc: "Sandık bazında sonuçlar, oy kayması trendleri, demografik korelasyonlar ve swing bölge tespiti.",
    color: "var(--color-party-chp)",
  },
  {
    icon: Newspaper,
    title: "Canlı Sosyal Nabız",
    desc: "Twitter, Ekşi Sözlük, Google Yorumları ve haberler — bölge bazında anlık duygu analizi.",
    color: "var(--color-accent-warn)",
  },
  {
    icon: TrendingUp,
    title: "Ekonomik Profil",
    desc: "İşletme yoğunluğu, kira endeksi, batan/açılan şirketler ve sektörel doygunluk analizi.",
    color: "var(--color-accent-success)",
  },
  {
    icon: Shield,
    title: "Güvenlik Endeksi",
    desc: "Resmi veri, sosyal algı ve kullanıcı puanlamalarından oluşan bileşik güvenlik skoru.",
    color: "var(--color-accent-info)",
  },
  {
    icon: GraduationCap,
    title: "Eğitim Kalitesi",
    desc: "Okul başarıları, öğretmen oranları, üniversite verileri ve eğitim altyapısı haritası.",
    color: "var(--color-accent-secondary)",
  },
  {
    icon: Building2,
    title: "Resmi Kararlar",
    desc: "TBMM, belediye meclisi, valilik ve tüm resmi kurum kararları — bölge bazında filtrelenebilir.",
    color: "var(--color-accent-primary)",
  },
  {
    icon: GitCompare,
    title: "Karşılaştırma",
    desc: "İki bölgeyi yan yana getir. Radar grafik, tablo ve zaman serisi ile derinlemesine analiz.",
    color: "var(--color-accent-warn)",
  },
];

const stats = [
  { value: "81", label: "İl" },
  { value: "973", label: "İlçe" },
  { value: "32.000+", label: "Mahalle" },
  { value: "200+", label: "Veri Metriği" },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]"
          style={{ background: "var(--color-accent-primary)" }}
        />

        <div className="relative max-w-[1280px] mx-auto px-4 md:px-6 py-20 md:py-32">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6 animate-fade-in-up"
              style={{
                background: "var(--color-accent-primary-muted)",
                color: "var(--color-accent-primary)",
                border: "1px solid rgba(0, 212, 170, 0.2)",
              }}
            >
              <Zap size={12} />
              Türkiye&apos;nin İlk Yaşayan Veri Atlası
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up"
              style={{
                fontFamily: "var(--font-heading)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                animationDelay: "100ms",
              }}
            >
              Türkiye&apos;yi mahalle mahalle
              <br />
              <span className="text-gradient">tanı, analiz et, anla.</span>
            </h1>

            <p
              className="text-lg md:text-xl max-w-2xl mb-8 animate-fade-in-up"
              style={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                animationDelay: "200ms",
              }}
            >
              Demografik veri, seçim analizi, sosyal medya nabzı, ekonomik
              göstergeler ve canlı haber akışı — hepsi tek platformda,
              mahalle hassasiyetinde.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <Link
                href="/atlas"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "var(--color-accent-primary)",
                  color: "var(--color-bg-primary)",
                  boxShadow: "var(--shadow-glow)",
                }}
              >
                Haritayı Keşfet
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/analiz"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all hover:bg-[var(--color-bg-hover)]"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                }}
              >
                Veri Analizi
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl text-center"
                style={{
                  background: "var(--color-bg-secondary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="text-2xl md:text-3xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-accent-primary)",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="max-w-2xl mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
            >
              Her veri katmanı, bir bakış açısı.
            </h2>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "1.125rem" }}>
              Türkiye&apos;nin tamamını — siyasetten ekonomiye, güvenlikten
              eğitime — mahalle bazında analiz ediyoruz.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group p-5 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg cursor-default"
                  style={{
                    background: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                    style={{ background: `${f.color}15`, color: f.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ HEDEF KİTLE ═══ */}
      <section className="py-20 md:py-28" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
            >
              Kimler kullanıyor?
            </h2>
            <p style={{ color: "var(--color-text-secondary)" }}>
              Araştırma firmalarından belediyelere, perakendecilerden
              akademisyenlere — veriyle karar veren herkes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Vote, title: "Seçim Araştırma Firmaları", desc: "Sandık analizi, seçmen profili, swing bölge tespiti" },
              { icon: Building2, title: "Belediyeler & Kamu", desc: "Hizmet planlaması, vatandaş memnuniyeti takibi" },
              { icon: TrendingUp, title: "Perakende & Yatırım", desc: "Mağaza yer seçimi, pazar analizi, yatırım kararı" },
              { icon: Shield, title: "Bankalar & Finans", desc: "Kredi risk analizi, şube planlaması, bölge değerlendirme" },
              { icon: Users, title: "Medya & Gazeteciler", desc: "Veri gazeteciliği, bölge raporları, trend analizi" },
              { icon: GraduationCap, title: "Akademisyenler", desc: "Araştırma verisi, demografik çalışmalar, korelasyon analizi" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-5 rounded-xl"
                  style={{
                    background: "var(--color-bg-tertiary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: "var(--color-accent-primary-muted)",
                      color: "var(--color-accent-primary)",
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div
            className="relative overflow-hidden rounded-2xl p-8 md:p-12 text-center"
            style={{
              background: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full blur-[100px] opacity-20"
              style={{ background: "var(--color-accent-primary)" }}
            />
            <div className="relative">
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
              >
                Türkiye&apos;yi veriyle keşfetmeye hazır mısın?
              </h2>
              <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
                Ücretsiz hesap oluştur, temel verilere hemen eriş.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/kayit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all hover:scale-[1.02]"
                  style={{
                    background: "var(--color-accent-primary)",
                    color: "var(--color-bg-primary)",
                    boxShadow: "var(--shadow-glow)",
                  }}
                >
                  Ücretsiz Başla
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/fiyatlar"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all hover:bg-[var(--color-bg-hover)]"
                  style={{
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Planları İncele
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer
        className="py-10 border-t"
        style={{ borderColor: "var(--color-border)", background: "var(--color-bg-secondary)" }}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center"
                style={{ background: "var(--color-accent-primary)" }}
              >
                <span className="text-xs font-bold" style={{ color: "var(--color-bg-primary)", fontFamily: "var(--font-heading)" }}>U</span>
              </div>
              <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-heading)" }}>ULAK</span>
              <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                — Türkiye&apos;nin Yaşayan Veri Atlası
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm" style={{ color: "var(--color-text-muted)" }}>
              <Link href="/hakkinda" className="hover:text-[var(--color-text-primary)] transition-colors">Hakkında</Link>
              <Link href="/gizlilik" className="hover:text-[var(--color-text-primary)] transition-colors">Gizlilik</Link>
              <Link href="/kvkk" className="hover:text-[var(--color-text-primary)] transition-colors">KVKK</Link>
              <Link href="/iletisim" className="hover:text-[var(--color-text-primary)] transition-colors">İletişim</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
