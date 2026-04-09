"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Shield, Eye, Globe, Search, Camera, AlertTriangle,
  Lock, FileWarning, CheckCircle, X,
} from "lucide-react";

const securityNav = [
  { href: "/guvenlik", label: "Dashboard", icon: Shield, exact: true },
  { href: "/guvenlik/dark-web", label: "Dark Web", icon: Globe },
  { href: "/guvenlik/dork-takibi", label: "Dork Takibi", icon: Search },
  { href: "/guvenlik/kameralar", label: "Kameralar", icon: Camera },
  { href: "/guvenlik/sizinti-kontrol", label: "Sızıntı Kontrol", icon: FileWarning },
];

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [accepted, setAccepted] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  // localStorage'dan onay durumunu kontrol et
  useEffect(() => {
    const consent = localStorage.getItem("ulak_security_consent");
    if (consent === "accepted") {
      setAccepted(true);
      setShowDisclaimer(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ulak_security_consent", "accepted");
    setAccepted(true);
    setShowDisclaimer(false);
  };

  // Aydınlatma ve onay ekranı
  if (showDisclaimer && !accepted) {
    return (
      <div
        className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4"
        style={{ background: "var(--color-bg-primary)" }}
      >
        <div
          className="max-w-[640px] w-full p-6 rounded-sm"
          style={{
            background: "var(--color-bg-secondary)",
            border: "2px solid var(--color-accent-danger)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-12 h-12 rounded-sm flex items-center justify-center"
              style={{ background: "rgba(239, 68, 68, 0.15)", color: "var(--color-accent-danger)" }}
            >
              <Shield size={24} />
            </div>
            <div>
              <h1
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-accent-danger)" }}
              >
                GÜVENLİK & İSTİHBARAT MODÜLÜ
              </h1>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Yetkili personel erişim alanı
              </p>
            </div>
          </div>

          {/* Aydınlatma metni */}
          <div
            className="p-4 rounded-sm mb-5 text-sm leading-relaxed space-y-3 max-h-[320px] overflow-y-auto"
            style={{
              background: "var(--color-bg-tertiary)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-secondary)",
            }}
          >
            <p className="font-bold" style={{ color: "var(--color-text-primary)" }}>
              YASAL UYARI VE AYDINLATMA METNİ
            </p>

            <p>
              Bu modül, <b>yetkili emniyet birimleri, araştırmacılar ve güvenlik profesyonelleri</b> için
              tasarlanmıştır. Modülde yer alan veriler açık kaynak istihbarat (OSINT) yöntemleriyle,
              yasal çerçevede toplanmaktadır.
            </p>

            <p className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
              Yasal Dayanak:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>5271 sayılı CMK — Dijital delil toplama usulü</li>
              <li>5651 sayılı Kanun — İnternet ortamında yapılan yayınların düzenlenmesi</li>
              <li>6698 sayılı KVKK — Kişisel verilerin korunması</li>
              <li>2559 sayılı PVSK — Polis Vazife ve Salahiyet Kanunu</li>
            </ul>

            <p className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
              Kullanım Koşulları:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Bu modüle erişim <b>yalnızca yetkili personele</b> açıktır.</li>
              <li>Toplanan tüm veriler <b>hukuki izinle alınmış veya kamuya açık</b> kaynaklardan elde edilmektedir.</li>
              <li>Veriler <b>gerçek zamanlı olarak onaya sunulur</b>, onay alınmadan yayınlanmaz.</li>
              <li>Kişisel veri işleme <b>KVKK md. 28/1 kapsamında</b> (kamu güvenliği) gerçekleştirilir.</li>
              <li>Tüm erişimler <b>audit log ile kayıt altına alınır</b>.</li>
              <li>Verilerin kötüye kullanımı <b>yasal yaptırım</b> gerektirir.</li>
              <li>Platform, veri toplama ve analizde <b>etik kurallara</b> uyar.</li>
            </ul>

            <p className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
              Sorumluluk Reddi:
            </p>
            <p>
              ULAK platformu, bu modüldeki verilerin doğruluğunu garanti etmez. Veriler
              bilgilendirme amaçlıdır ve tek başına hukuki delil niteliği taşımaz.
              Veriler, yetkili makamların resmi onayı alınmadan operasyonel kararlarda
              kullanılamaz.
            </p>
          </div>

          {/* Onay */}
          <div className="space-y-3">
            <label
              className="flex items-start gap-3 p-3 rounded-sm cursor-pointer transition-colors hover:bg-[var(--color-bg-hover)]"
              style={{ border: "1px solid var(--color-border)" }}
            >
              <input
                type="checkbox"
                id="consent"
                className="mt-1 accent-[var(--color-accent-primary)]"
                onChange={(e) => {
                  if (e.target.checked) handleAccept();
                }}
              />
              <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                Yukarıdaki yasal uyarı ve aydınlatma metnini okudum, anladım ve kabul ediyorum.
                Bu modüle yetkili personel olarak eriştiğimi ve tüm işlemlerimin kayıt altına
                alınacağını biliyorum.
              </span>
            </label>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex-1 py-2.5 rounded-sm text-center text-sm font-medium transition-colors hover:bg-[var(--color-bg-hover)]"
                style={{ border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}
              >
                Geri Dön
              </Link>
              <button
                disabled
                className="flex-1 py-2.5 rounded-sm text-center text-sm font-semibold opacity-40 cursor-not-allowed"
                style={{
                  background: "var(--color-accent-danger)",
                  color: "white",
                }}
              >
                Onay Bekleniyor...
              </button>
            </div>

            <p className="text-[10px] text-center" style={{ color: "var(--color-text-disabled)" }}>
              IP adresiniz, erişim zamanınız ve işlemleriniz kayıt altına alınmaktadır.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Güvenlik modülü layout
  return (
    <div style={{ background: "var(--color-bg-primary)" }}>
      {/* Güvenlik üst bar */}
      <div
        className="border-b"
        style={{
          background: "rgba(239, 68, 68, 0.03)",
          borderColor: "rgba(239, 68, 68, 0.15)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Lock size={12} style={{ color: "var(--color-accent-danger)" }} />
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--color-accent-danger)" }}>
                  GÜVENLİK MODÜLÜ
                </span>
              </div>

              <nav className="flex items-center gap-1">
                {securityNav.map((item) => {
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname?.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium rounded-sm transition-all",
                        isActive
                          ? "text-[var(--color-accent-danger)] bg-[rgba(239,68,68,0.1)]"
                          : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]"
                      )}
                    >
                      <Icon size={11} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-2 text-[10px]" style={{ color: "var(--color-text-disabled)" }}>
              <Eye size={10} />
              <span>Tüm işlemler kayıt altında</span>
            </div>
          </div>
        </div>
      </div>

      {/* İçerik */}
      {children}
    </div>
  );
}
