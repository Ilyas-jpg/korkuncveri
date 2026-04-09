import type { Metadata } from "next";
import { LiveFeed } from "@/components/feed/LiveFeed";

export const metadata: Metadata = {
  title: "Canlı Akış — Sosyal Medya, Haberler & Resmi Duyurular",
  description:
    "Türkiye genelinde il ve ilçe bazında canlı sosyal medya akışı, haberler, resmi kararlar ve duyurular. Kelime arama ve duygu analizi.",
};

export default function FeedPage() {
  return <LiveFeed />;
}
