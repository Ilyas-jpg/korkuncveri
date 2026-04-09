import type { Metadata } from "next";
import { CompareView } from "@/components/profile/CompareView";

export const metadata: Metadata = {
  title: "Karşılaştır — İki Bölgeyi Yan Yana Analiz Et",
  description: "İki ili yan yana karşılaştır: nüfus, seçim, ekonomi, güvenlik, eğitim ve yaşanabilirlik.",
};

export default function ComparePage() {
  return <CompareView />;
}
