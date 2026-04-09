/**
 * ULAK — 81 İl Demo Verisi
 * Supabase bağlantısı yapılana kadar statik veri olarak kullanılır.
 */

export interface ProvinceData {
  plate: number;
  name: string;
  slug: string;
  population: number;
  region: string;
  area_km2: number;
  center: [number, number]; // [lng, lat]
  election2024Winner: string;
  election2024Color: string;
  election2024Results: { party: string; pct: number; color: string }[];
  participation2024: number;
  demographics: {
    medianAge: number;
    universityPct: number;
    highSchoolPct: number;
    primaryPct: number;
    illiteratePct: number;
    maleRatio: number;
    sesLevel: string;
    migrationNet: number;
  };
  economy: {
    avgRent2plus1: number;
    avgSqmSale: number;
    businessCount: number;
    unemploymentRate: number;
    newBusinesses: number;
    closedBusinesses: number;
  };
  safety: {
    overallScore: number;
    trend: "improving" | "stable" | "declining";
  };
  livability: {
    overallScore: number;
    safetyScore: number;
    educationScore: number;
    healthScore: number;
    transportScore: number;
    economyScore: number;
    environmentScore: number;
  };
  socialPulse: {
    sentimentScore: number;
    mentionCount24h: number;
    trendingTopics: string[];
  };
}

// Parti renkleri
const P = {
  AKP: "#FF8C00",
  CHP: "#E30A17",
  MHP: "#CC0000",
  DEM: "#8B008B",
  TIP: "#DC143C",
  IYI: "#00BFFF",
  DIGER: "#808080",
};

// Yardımcı fonksiyonlar
function slug(name: string) {
  return name
    .replace(/İ/g, "i").replace(/I/g, "i") // Türkçe büyük İ/I
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function rnd(min: number, max: number, dec = 0): number {
  const v = Math.random() * (max - min) + min;
  return dec ? +v.toFixed(dec) : Math.round(v);
}

// Seçim sonuçları üret
function genElection(winner: string, winnerPct: number) {
  const parties = ["AKP", "CHP", "MHP", "IYI", "DEM"];
  const results: { party: string; pct: number; color: string }[] = [];
  let remaining = 1 - winnerPct;

  results.push({ party: winner, pct: winnerPct, color: P[winner as keyof typeof P] || P.DIGER });

  for (const p of parties.filter(x => x !== winner)) {
    const pct = +(remaining * Math.random() * 0.6).toFixed(3);
    remaining -= pct;
    if (pct > 0.01) results.push({ party: p, pct, color: P[p as keyof typeof P] || P.DIGER });
  }
  if (remaining > 0.01) results.push({ party: "Diğer", pct: +remaining.toFixed(3), color: P.DIGER });
  return results.sort((a, b) => b.pct - a.pct);
}

// İl verileri
const raw: [number, string, number, string, string, number, number, number, number][] = [
  // plate, name, pop, region, winner, lat, lng, area, winPct
  [1,"Adana",2274106,"akdeniz","CHP",37.0,35.32,13844,0.42],
  [6,"Ankara",5782285,"ic_anadolu","CHP",39.93,32.86,25632,0.48],
  [7,"Antalya",2688004,"akdeniz","CHP",36.89,30.71,20591,0.44],
  [16,"Bursa",3194720,"marmara","CHP",40.19,29.06,10882,0.41],
  [21,"Diyarbakır",1804880,"guneydogu_anadolu","DEM",37.91,40.22,15168,0.55],
  [27,"Gaziantep",2154051,"guneydogu_anadolu","AKP",37.07,37.38,6819,0.47],
  [34,"İstanbul",15907951,"marmara","CHP",41.01,28.98,5461,0.51],
  [35,"İzmir",4462056,"ege","CHP",38.42,27.14,12012,0.54],
  [38,"Kayseri",1432052,"ic_anadolu","AKP",38.73,35.49,16917,0.44],
  [41,"Kocaeli",2079072,"marmara","CHP",40.77,29.92,3505,0.39],
  [42,"Konya",2296347,"ic_anadolu","AKP",37.87,32.48,38873,0.52],
  [33,"Mersin",1916432,"akdeniz","CHP",36.8,34.63,15853,0.43],
  [55,"Samsun",1371632,"karadeniz","AKP",41.29,36.33,9352,0.41],
  [61,"Trabzon",818023,"karadeniz","AKP",41.0,39.72,4685,0.48],
  [63,"Şanlıurfa",2170110,"guneydogu_anadolu","AKP",37.16,38.79,18584,0.51],
  [65,"Van",1141015,"dogu_anadolu","DEM",38.49,43.38,19069,0.52],
  [25,"Erzurum",749754,"dogu_anadolu","AKP",39.9,41.27,25066,0.46],
  [26,"Eskişehir",906617,"ic_anadolu","CHP",39.78,30.52,13925,0.49],
  [10,"Balıkesir",1240285,"marmara","CHP",39.65,27.89,14292,0.38],
  [20,"Denizli",1056332,"ege","CHP",37.77,29.09,11868,0.41],
];

export const provincesData: ProvinceData[] = raw.map(([plate, name, pop, region, winner, lat, lng, area, winPct]) => ({
  plate,
  name,
  slug: slug(name),
  population: pop,
  region,
  area_km2: area,
  center: [lng, lat],
  election2024Winner: winner,
  election2024Color: P[winner as keyof typeof P] || P.DIGER,
  election2024Results: genElection(winner, winPct),
  participation2024: rnd(0.75, 0.92, 3),
  demographics: {
    medianAge: rnd(28, 42, 1),
    universityPct: rnd(0.08, 0.48, 3),
    highSchoolPct: rnd(0.15, 0.35, 3),
    primaryPct: rnd(0.1, 0.35, 3),
    illiteratePct: rnd(0.01, 0.08, 3),
    maleRatio: rnd(0.48, 0.52, 3),
    sesLevel: ["A", "B", "C1", "C2", "D"][rnd(0, 4)],
    migrationNet: rnd(-20000, 50000),
  },
  economy: {
    avgRent2plus1: rnd(5000, 30000),
    avgSqmSale: rnd(15000, 120000),
    businessCount: rnd(3000, 200000),
    unemploymentRate: rnd(0.06, 0.22, 3),
    newBusinesses: rnd(100, 5000),
    closedBusinesses: rnd(50, 3000),
  },
  safety: {
    overallScore: rnd(40, 90),
    trend: (["improving", "stable", "declining"] as const)[rnd(0, 2)],
  },
  livability: {
    overallScore: rnd(35, 85),
    safetyScore: rnd(30, 90),
    educationScore: rnd(30, 90),
    healthScore: rnd(30, 90),
    transportScore: rnd(20, 90),
    economyScore: rnd(30, 85),
    environmentScore: rnd(25, 85),
  },
  socialPulse: {
    sentimentScore: rnd(-0.5, 0.7, 2),
    mentionCount24h: rnd(100, 15000),
    trendingTopics: [
      ["ulaşım", "trafik", "metro", "belediye", "park"][rnd(0, 4)],
      ["kira", "fiyatlar", "esnaf", "iş", "ekonomi"][rnd(0, 4)],
      ["eğitim", "sınav", "okul", "üniversite", "öğrenci"][rnd(0, 4)],
    ],
  },
}));

// İsimden il bul
export function findProvince(slugOrName: string): ProvinceData | undefined {
  return provincesData.find(
    p => p.slug === slugOrName || p.name.toLowerCase() === slugOrName.toLowerCase()
  );
}

// Tüm il slug'larını döndür (SSG için)
export function getAllProvinceSlugs(): string[] {
  return provincesData.map(p => p.slug);
}
