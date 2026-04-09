"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Save, MapPin, FileText, Camera, Upload,
  AlertCircle, CheckCircle, ChevronDown,
} from "lucide-react";

const categories = [
  { id: "saha_gozlemi", label: "Saha Gözlemi", desc: "Bölgeden canlı gözlem ve notlar" },
  { id: "mulakat", label: "Mülakat", desc: "Kişi veya kurum ile yapılan görüşme" },
  { id: "anket", label: "Anket Sonucu", desc: "Yapılan anket verileri" },
  { id: "kurumsal_veri", label: "Kurumsal Veri", desc: "Müşteri veya ortaktan gelen veri" },
  { id: "duzeltme", label: "Düzeltme", desc: "Mevcut verinin güncellenmesi" },
  { id: "etkinlik", label: "Etkinlik/Olay", desc: "Miting, festival, doğal olay kaydı" },
  { id: "fotograf_belge", label: "Fotoğraf/Belge", desc: "Görsel veya belge ekleme" },
  { id: "uzman_degerlendirmesi", label: "Uzman Değerlendirmesi", desc: "Profesyonel analiz notu" },
];

const provinces = [
  "Adana", "Ankara", "Antalya", "Bursa", "Diyarbakır", "Eskişehir",
  "Gaziantep", "İstanbul", "İzmir", "Kayseri", "Kocaeli", "Konya",
  "Mersin", "Samsun", "Trabzon", "Şanlıurfa", "Van", "Erzurum",
  "Balıkesir", "Denizli",
];

const confidenceLevels = [
  { value: 0.9, label: "Çok Yüksek", desc: "Resmi kaynak, doğrulanmış" },
  { value: 0.7, label: "Yüksek", desc: "Güvenilir kaynak, çapraz kontrol yapılmış" },
  { value: 0.5, label: "Orta", desc: "Tek kaynak, doğrulanmamış" },
  { value: 0.3, label: "Düşük", desc: "Kulaktan dolma, teyit gerekli" },
];

export default function ManualEntryPage() {
  const [category, setCategory] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [confidence, setConfidence] = useState(0.5);
  const [dataJson, setDataJson] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Supabase bağlantısında gerçek kayıt yapılacak
    console.log({ category, province, district, title, content, sourceUrl, confidence, dataJson });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ background: "var(--color-bg-primary)" }}>
      <div className="max-w-[900px] mx-auto px-4 md:px-6 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin" className="p-1.5 rounded-sm hover:bg-[var(--color-bg-hover)] transition-colors">
            <ArrowLeft size={16} style={{ color: "var(--color-text-muted)" }} />
          </Link>
          <div>
            <h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              Manuel Veri Girişi
            </h1>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              Saha verileri, gözlemler ve uzman değerlendirmeleri ekleyin.
            </p>
          </div>
        </div>

        {/* Başarı mesajı */}
        {saved && (
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-sm mb-4"
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              color: "var(--color-accent-success)",
            }}
          >
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Veri başarıyla kaydedildi. Doğrulama bekliyor.</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Kategori seçimi */}
          <FieldGroup label="Kategori" required>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className="p-3 rounded-sm text-left transition-all"
                  style={{
                    background: category === cat.id ? "var(--color-accent-primary-muted)" : "var(--color-bg-tertiary)",
                    border: `1px solid ${category === cat.id ? "rgba(0, 212, 170, 0.3)" : "var(--color-border)"}`,
                    color: category === cat.id ? "var(--color-accent-primary)" : "var(--color-text-secondary)",
                  }}
                >
                  <div className="text-xs font-semibold">{cat.label}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: "var(--color-text-muted)" }}>{cat.desc}</div>
                </button>
              ))}
            </div>
          </FieldGroup>

          {/* Konum seçimi */}
          <div className="grid md:grid-cols-2 gap-4">
            <FieldGroup label="İl" required>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full px-3 py-2 rounded-sm text-sm outline-none"
                style={{
                  background: "var(--color-bg-tertiary)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                }}
              >
                <option value="">İl seçin...</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </FieldGroup>

            <FieldGroup label="İlçe (opsiyonel)">
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="İlçe adı yazın..."
                className="w-full px-3 py-2 rounded-sm text-sm outline-none"
                style={{
                  background: "var(--color-bg-tertiary)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                }}
              />
            </FieldGroup>
          </div>

          {/* Başlık */}
          <FieldGroup label="Başlık" required>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Veri girişinin kısa başlığı..."
              className="w-full px-3 py-2 rounded-sm text-sm outline-none"
              style={{
                background: "var(--color-bg-tertiary)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            />
          </FieldGroup>

          {/* İçerik */}
          <FieldGroup label="İçerik / Açıklama" required>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder="Detaylı açıklama, gözlem notları, mülakat özeti..."
              className="w-full px-3 py-2 rounded-sm text-sm outline-none resize-y"
              style={{
                background: "var(--color-bg-tertiary)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            />
          </FieldGroup>

          {/* Yapılandırılmış veri (JSON) */}
          <FieldGroup label="Yapılandırılmış Veri (JSON — opsiyonel)">
            <textarea
              value={dataJson}
              onChange={(e) => setDataJson(e.target.value)}
              rows={4}
              placeholder='{"nufus": 12500, "ortalama_yas": 34.2, "universite_orani": 0.28}'
              className="w-full px-3 py-2 rounded-sm text-xs outline-none resize-y"
              style={{
                background: "var(--color-bg-tertiary)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-mono)",
              }}
            />
          </FieldGroup>

          {/* Kaynak URL */}
          <FieldGroup label="Kaynak URL (opsiyonel)">
            <input
              type="url"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-sm text-sm outline-none"
              style={{
                background: "var(--color-bg-tertiary)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            />
          </FieldGroup>

          {/* Güvenilirlik */}
          <FieldGroup label="Güvenilirlik Seviyesi">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {confidenceLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setConfidence(level.value)}
                  className="p-2.5 rounded-sm text-left transition-all"
                  style={{
                    background: confidence === level.value ? "var(--color-accent-primary-muted)" : "var(--color-bg-tertiary)",
                    border: `1px solid ${confidence === level.value ? "rgba(0, 212, 170, 0.3)" : "var(--color-border)"}`,
                    color: confidence === level.value ? "var(--color-accent-primary)" : "var(--color-text-secondary)",
                  }}
                >
                  <div className="text-xs font-semibold">{level.label}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: "var(--color-text-muted)" }}>{level.desc}</div>
                </button>
              ))}
            </div>
          </FieldGroup>

          {/* Dosya ekleme placeholder */}
          <FieldGroup label="Dosya Ekle (opsiyonel)">
            <div
              className="flex items-center justify-center gap-2 py-6 rounded-sm cursor-pointer transition-colors hover:bg-[var(--color-bg-hover)]"
              style={{
                border: "2px dashed var(--color-border)",
                color: "var(--color-text-muted)",
              }}
            >
              <Upload size={16} />
              <span className="text-xs">Fotoğraf, belge veya dosya sürükleyin veya tıklayın</span>
            </div>
          </FieldGroup>

          {/* Submit */}
          <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
              <AlertCircle size={12} />
              <span>Girilen veri admin onayından sonra yayınlanacaktır.</span>
            </div>
            <button
              type="submit"
              disabled={!category || !province || !title || !content}
              className="flex items-center gap-2 px-5 py-2 rounded-sm text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
              style={{
                background: "var(--color-accent-primary)",
                color: "var(--color-bg-primary)",
              }}
            >
              <Save size={14} />
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Yardımcı ────────────────────────────────────────────────

function FieldGroup({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--color-text-muted)" }}>
        {label}
        {required && <span style={{ color: "var(--color-accent-danger)" }}>*</span>}
      </label>
      {children}
    </div>
  );
}
