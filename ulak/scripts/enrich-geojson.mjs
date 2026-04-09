/**
 * ULAK — GeoJSON Enrichment Script
 * Türkiye il GeoJSON'ına plaka kodu, slug, nüfus ve demo veri ekler.
 */
import { readFileSync, writeFileSync } from "fs";

const provinces = [
  { plate: 1, name: "Adana", pop: 2274106, region: "akdeniz" },
  { plate: 2, name: "Adıyaman", pop: 635169, region: "guneydogu_anadolu" },
  { plate: 3, name: "Afyonkarahisar", pop: 747555, region: "ege" },
  { plate: 4, name: "Ağrı", pop: 510626, region: "dogu_anadolu" },
  { plate: 5, name: "Amasya", pop: 340266, region: "karadeniz" },
  { plate: 6, name: "Ankara", pop: 5782285, region: "ic_anadolu" },
  { plate: 7, name: "Antalya", pop: 2688004, region: "akdeniz" },
  { plate: 8, name: "Artvin", pop: 172965, region: "karadeniz" },
  { plate: 9, name: "Aydın", pop: 1134031, region: "ege" },
  { plate: 10, name: "Balıkesir", pop: 1240285, region: "marmara" },
  { plate: 11, name: "Bilecik", pop: 228673, region: "marmara" },
  { plate: 12, name: "Bingöl", pop: 283112, region: "dogu_anadolu" },
  { plate: 13, name: "Bitlis", pop: 353988, region: "dogu_anadolu" },
  { plate: 14, name: "Bolu", pop: 320824, region: "karadeniz" },
  { plate: 15, name: "Burdur", pop: 273716, region: "akdeniz" },
  { plate: 16, name: "Bursa", pop: 3194720, region: "marmara" },
  { plate: 17, name: "Çanakkale", pop: 559383, region: "marmara" },
  { plate: 18, name: "Çankırı", pop: 195789, region: "ic_anadolu" },
  { plate: 19, name: "Çorum", pop: 540704, region: "karadeniz" },
  { plate: 20, name: "Denizli", pop: 1056332, region: "ege" },
  { plate: 21, name: "Diyarbakır", pop: 1804880, region: "guneydogu_anadolu" },
  { plate: 22, name: "Edirne", pop: 416428, region: "marmara" },
  { plate: 23, name: "Elazığ", pop: 591098, region: "dogu_anadolu" },
  { plate: 24, name: "Erzincan", pop: 238987, region: "dogu_anadolu" },
  { plate: 25, name: "Erzurum", pop: 749754, region: "dogu_anadolu" },
  { plate: 26, name: "Eskişehir", pop: 906617, region: "ic_anadolu" },
  { plate: 27, name: "Gaziantep", pop: 2154051, region: "guneydogu_anadolu" },
  { plate: 28, name: "Giresun", pop: 453912, region: "karadeniz" },
  { plate: 29, name: "Gümüşhane", pop: 151449, region: "karadeniz" },
  { plate: 30, name: "Hakkari", pop: 280991, region: "dogu_anadolu" },
  { plate: 31, name: "Hatay", pop: 1670712, region: "akdeniz" },
  { plate: 32, name: "Isparta", pop: 451595, region: "akdeniz" },
  { plate: 33, name: "Mersin", pop: 1916432, region: "akdeniz" },
  { plate: 34, name: "İstanbul", pop: 15907951, region: "marmara" },
  { plate: 35, name: "İzmir", pop: 4462056, region: "ege" },
  { plate: 36, name: "Kars", pop: 285410, region: "dogu_anadolu" },
  { plate: 37, name: "Kastamonu", pop: 389220, region: "karadeniz" },
  { plate: 38, name: "Kayseri", pop: 1432052, region: "ic_anadolu" },
  { plate: 39, name: "Kırklareli", pop: 365673, region: "marmara" },
  { plate: 40, name: "Kırşehir", pop: 244519, region: "ic_anadolu" },
  { plate: 41, name: "Kocaeli", pop: 2079072, region: "marmara" },
  { plate: 42, name: "Konya", pop: 2296347, region: "ic_anadolu" },
  { plate: 43, name: "Kütahya", pop: 580701, region: "ege" },
  { plate: 44, name: "Malatya", pop: 812580, region: "dogu_anadolu" },
  { plate: 45, name: "Manisa", pop: 1456626, region: "ege" },
  { plate: 46, name: "Kahramanmaraş", pop: 1177436, region: "akdeniz" },
  { plate: 47, name: "Mardin", pop: 862757, region: "guneydogu_anadolu" },
  { plate: 48, name: "Muğla", pop: 1021141, region: "ege" },
  { plate: 49, name: "Muş", pop: 408728, region: "dogu_anadolu" },
  { plate: 50, name: "Nevşehir", pop: 310011, region: "ic_anadolu" },
  { plate: 51, name: "Niğde", pop: 365419, region: "ic_anadolu" },
  { plate: 52, name: "Ordu", pop: 758590, region: "karadeniz" },
  { plate: 53, name: "Rize", pop: 348608, region: "karadeniz" },
  { plate: 54, name: "Sakarya", pop: 1060876, region: "marmara" },
  { plate: 55, name: "Samsun", pop: 1371632, region: "karadeniz" },
  { plate: 56, name: "Siirt", pop: 335280, region: "guneydogu_anadolu" },
  { plate: 57, name: "Sinop", pop: 220799, region: "karadeniz" },
  { plate: 58, name: "Sivas", pop: 646608, region: "ic_anadolu" },
  { plate: 59, name: "Tekirdağ", pop: 1114617, region: "marmara" },
  { plate: 60, name: "Tokat", pop: 612646, region: "karadeniz" },
  { plate: 61, name: "Trabzon", pop: 818023, region: "karadeniz" },
  { plate: 62, name: "Tunceli", pop: 84660, region: "dogu_anadolu" },
  { plate: 63, name: "Şanlıurfa", pop: 2170110, region: "guneydogu_anadolu" },
  { plate: 64, name: "Uşak", pop: 373886, region: "ege" },
  { plate: 65, name: "Van", pop: 1141015, region: "dogu_anadolu" },
  { plate: 66, name: "Yozgat", pop: 424981, region: "ic_anadolu" },
  { plate: 67, name: "Zonguldak", pop: 596892, region: "karadeniz" },
  { plate: 68, name: "Aksaray", pop: 433347, region: "ic_anadolu" },
  { plate: 69, name: "Bayburt", pop: 84843, region: "karadeniz" },
  { plate: 70, name: "Karaman", pop: 258838, region: "ic_anadolu" },
  { plate: 71, name: "Kırıkkale", pop: 290702, region: "ic_anadolu" },
  { plate: 72, name: "Batman", pop: 634491, region: "guneydogu_anadolu" },
  { plate: 73, name: "Şırnak", pop: 557605, region: "guneydogu_anadolu" },
  { plate: 74, name: "Bartın", pop: 203842, region: "karadeniz" },
  { plate: 75, name: "Ardahan", pop: 97319, region: "dogu_anadolu" },
  { plate: 76, name: "Iğdır", pop: 203159, region: "dogu_anadolu" },
  { plate: 77, name: "Yalova", pop: 296333, region: "marmara" },
  { plate: 78, name: "Karabük", pop: 249287, region: "karadeniz" },
  { plate: 79, name: "Kilis", pop: 147919, region: "guneydogu_anadolu" },
  { plate: 80, name: "Osmaniye", pop: 559405, region: "akdeniz" },
  { plate: 81, name: "Düzce", pop: 400697, region: "karadeniz" },
];

// 2024 Yerel Seçim Sonuçları (büyükşehir kazanan parti)
const election2024 = {
  "Adana": "CHP", "Adıyaman": "AKP", "Afyonkarahisar": "AKP", "Ağrı": "DEM",
  "Amasya": "MHP", "Ankara": "CHP", "Antalya": "CHP", "Artvin": "CHP",
  "Aydın": "CHP", "Balıkesir": "CHP", "Bilecik": "CHP", "Bingöl": "AKP",
  "Bitlis": "AKP", "Bolu": "CHP", "Burdur": "MHP", "Bursa": "CHP",
  "Çanakkale": "CHP", "Çankırı": "MHP", "Çorum": "AKP", "Denizli": "CHP",
  "Diyarbakır": "DEM", "Edirne": "CHP", "Elazığ": "AKP", "Erzincan": "CHP",
  "Erzurum": "AKP", "Eskişehir": "CHP", "Gaziantep": "AKP", "Giresun": "AKP",
  "Gümüşhane": "AKP", "Hakkari": "DEM", "Hatay": "CHP", "Isparta": "AKP",
  "Mersin": "CHP", "İstanbul": "CHP", "İzmir": "CHP", "Kars": "CHP",
  "Kastamonu": "AKP", "Kayseri": "AKP", "Kırklareli": "CHP", "Kırşehir": "CHP",
  "Kocaeli": "CHP", "Konya": "AKP", "Kütahya": "AKP", "Malatya": "AKP",
  "Manisa": "CHP", "Kahramanmaraş": "AKP", "Mardin": "DEM", "Muğla": "CHP",
  "Muş": "AKP", "Nevşehir": "AKP", "Niğde": "MHP", "Ordu": "AKP",
  "Rize": "AKP", "Sakarya": "AKP", "Samsun": "AKP", "Siirt": "AKP",
  "Sinop": "CHP", "Sivas": "AKP", "Tekirdağ": "CHP", "Tokat": "AKP",
  "Trabzon": "AKP", "Tunceli": "TİP", "Şanlıurfa": "AKP", "Uşak": "CHP",
  "Van": "DEM", "Yozgat": "AKP", "Zonguldak": "CHP", "Aksaray": "AKP",
  "Bayburt": "AKP", "Karaman": "AKP", "Kırıkkale": "AKP", "Batman": "DEM",
  "Şırnak": "DEM", "Bartın": "CHP", "Ardahan": "CHP", "Iğdır": "DEM",
  "Yalova": "CHP", "Karabük": "AKP", "Kilis": "AKP", "Osmaniye": "MHP",
  "Düzce": "AKP",
};

const partyColors = {
  "AKP": "#FF8C00", "CHP": "#E30A17", "MHP": "#CC0000",
  "DEM": "#8B008B", "TİP": "#DC143C", "İYİ": "#00BFFF",
};

function slugify(text) {
  return text.toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// GeoJSON oku
const geo = JSON.parse(readFileSync("public/geo/turkey-provinces.json", "utf8"));

// Eşleştir ve zenginleştir
let matched = 0;
for (const feature of geo.features) {
  const geoName = feature.properties.name;

  // İsim eşleştirme (GeoJSON'daki isimlerle veri setindeki isimler farklı olabilir)
  const prov = provinces.find(p => {
    const a = p.name.toLowerCase();
    const b = geoName.toLowerCase();
    return a === b || slugify(a) === slugify(b) || a.startsWith(b) || b.startsWith(a);
  });

  if (prov) {
    matched++;
    const winner = election2024[prov.name] || "AKP";
    feature.properties = {
      ...feature.properties,
      plate_code: prov.plate,
      slug: slugify(prov.name),
      population: prov.pop,
      region: prov.region,
      election_2024_winner: winner,
      election_2024_color: partyColors[winner] || "#808080",
      // Demo: rastgele eğitim ve SES verileri
      university_pct: +(Math.random() * 0.35 + 0.08).toFixed(3),
      median_age: +(Math.random() * 12 + 28).toFixed(1),
      ses_level: ["A","B","C1","C2","D"][Math.floor(Math.random() * 5)],
    };
  } else {
    console.warn("Eşleşmeyen:", geoName);
  }
}

console.log(`Eşleşen: ${matched}/81`);

writeFileSync("public/geo/turkey-provinces.json", JSON.stringify(geo));
console.log("GeoJSON zenginleştirildi ve kaydedildi.");
