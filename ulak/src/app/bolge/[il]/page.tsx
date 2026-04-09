import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findProvince, getAllProvinceSlugs } from "@/data/provinces";
import { ProvinceProfile } from "@/components/profile/ProvinceProfile";

interface PageProps {
  params: Promise<{ il: string }>;
}

export async function generateStaticParams() {
  return getAllProvinceSlugs().map((il) => ({ il }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { il } = await params;
  const province = findProvince(il);
  if (!province) return { title: "Bulunamadı" };
  return {
    title: `${province.name} — Bölge Profili`,
    description: `${province.name} ili demografik veri, seçim sonuçları, ekonomik göstergeler ve sosyal nabız analizi.`,
  };
}

export default async function ProvincePage({ params }: PageProps) {
  const { il } = await params;
  const province = findProvince(il);
  if (!province) notFound();
  return <ProvinceProfile province={province} />;
}
