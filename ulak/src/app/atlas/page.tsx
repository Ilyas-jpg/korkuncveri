import type { Metadata } from "next";
import { AtlasView } from "@/components/map/AtlasView";

export const metadata: Metadata = {
  title: "Atlas — İnteraktif Türkiye Haritası",
  description:
    "İl, ilçe ve mahalle bazında demografik veri, seçim sonuçları, ekonomik göstergeler ve sosyal nabız haritası.",
};

export default function AtlasPage() {
  return <AtlasView />;
}
