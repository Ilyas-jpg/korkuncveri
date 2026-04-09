/**
 * ULAK — Veritabanı tip tanımları
 * Supabase PostgreSQL + PostGIS şemasını yansıtır.
 */

// ─── COĞRAFİ HİYERARŞİ ──────────────────────────────────

export interface Province {
  id: number;
  name: string;
  slug: string;
  plate_code: number; // 01-81
  region: TurkeyRegion;
  population: number;
  area_km2: number;
  center_lat: number;
  center_lng: number;
  geojson?: GeoJSON.Feature;
}

export interface District {
  id: number;
  province_id: number;
  name: string;
  slug: string;
  population: number;
  area_km2: number;
  center_lat: number;
  center_lng: number;
  geojson?: GeoJSON.Feature;
  province?: Province;
}

export interface Neighborhood {
  id: number;
  district_id: number;
  name: string;
  slug: string;
  population: number;
  center_lat: number;
  center_lng: number;
  geojson?: GeoJSON.Feature;
  district?: District;
}

// ─── DEMOGRAFİ ───────────────────────────────────────────

export interface Demographics {
  id: number;
  region_type: RegionType;
  region_id: number;
  year: number;
  population_total: number;
  population_male: number;
  population_female: number;
  median_age: number | null;
  age_0_14: number;
  age_15_24: number;
  age_25_34: number;
  age_35_44: number;
  age_45_54: number;
  age_55_64: number;
  age_65_plus: number;
  education_illiterate: number;
  education_primary: number;
  education_secondary: number;
  education_high_school: number;
  education_university: number;
  education_masters: number | null;
  education_phd: number | null;
  ses_level: SESLevel | null;
  migration_net: number | null;
}

// ─── SEÇİM ──────────────────────────────────────────────

export interface ElectionResult {
  id: number;
  region_type: RegionType;
  region_id: number;
  election_type: ElectionType;
  election_date: string; // ISO date
  party_code: string; // AKP, CHP, MHP, IYI, vb.
  party_name: string;
  votes: number;
  vote_percentage: number;
  is_winner: boolean;
}

export interface ElectionSummary {
  election_type: ElectionType;
  election_date: string;
  total_voters: number;
  total_votes: number;
  valid_votes: number;
  invalid_votes: number;
  participation_rate: number;
  results: ElectionResult[];
}

// ─── SOSYAL MEDYA & HABER ────────────────────────────────

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  region_type: RegionType;
  region_id: number;
  content: string;
  author: string;
  author_followers: number | null;
  url: string;
  sentiment_score: number; // -1 to +1
  sentiment_label: SentimentLabel;
  topics: string[];
  engagement_count: number;
  published_at: string;
  collected_at: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  source_url: string;
  url: string;
  region_type: RegionType;
  region_id: number;
  category: NewsCategory;
  sentiment_score: number;
  published_at: string;
  collected_at: string;
  image_url: string | null;
}

// ─── EKONOMİ & TİCARET ──────────────────────────────────

export interface EconomicData {
  id: number;
  region_type: RegionType;
  region_id: number;
  year: number;
  month: number | null;
  avg_household_income: number | null;
  unemployment_rate: number | null;
  business_count: number | null;
  new_businesses: number | null;
  closed_businesses: number | null;
  avg_rent_1plus1: number | null;
  avg_rent_2plus1: number | null;
  avg_rent_3plus1: number | null;
  avg_sqm_price_sale: number | null;
  avg_sqm_price_rent: number | null;
}

// ─── GÜVENLİK ENDEKSİ ──────────────────────────────────

export interface SafetyIndex {
  id: number;
  region_type: RegionType;
  region_id: number;
  year: number;
  overall_score: number; // 0-100
  official_data_score: number;
  social_perception_score: number;
  crowdsource_score: number | null;
  infrastructure_score: number;
  trend: "improving" | "stable" | "declining";
}

// ─── YAŞAM KALİTESİ ─────────────────────────────────────

export interface LivabilityIndex {
  id: number;
  region_type: RegionType;
  region_id: number;
  year: number;
  overall_score: number; // 0-100
  safety_score: number;
  education_score: number;
  health_score: number;
  transport_score: number;
  economy_score: number;
  environment_score: number;
  social_score: number;
  infrastructure_score: number;
  digital_score: number;
}

// ─── MANUEL VERİ GİRİŞİ ─────────────────────────────────

export interface ManualEntry {
  id: string;
  region_type: RegionType;
  region_id: number;
  category: ManualEntryCategory;
  title: string;
  content: string;
  data_json: Record<string, unknown> | null;
  source_type: DataSourceType;
  source_url: string | null;
  entered_by: string; // user id
  verified: boolean;
  verified_by: string | null;
  confidence: number; // 0-1
  attachments: string[]; // storage URLs
  created_at: string;
  updated_at: string;
}

// ─── RESMİ KARARLAR & DUYURULAR ─────────────────────────

export interface OfficialDecision {
  id: string;
  institution_type: InstitutionType;
  institution_name: string;
  region_type: RegionType;
  region_id: number;
  title: string;
  summary: string;
  url: string;
  decision_type: DecisionType;
  published_at: string;
  collected_at: string;
  tags: string[];
}

// ─── ENUM TİPLERİ ───────────────────────────────────────

export type RegionType = "province" | "district" | "neighborhood";

export type TurkeyRegion =
  | "marmara"
  | "ege"
  | "akdeniz"
  | "ic_anadolu"
  | "karadeniz"
  | "dogu_anadolu"
  | "guneydogu_anadolu";

export type SESLevel = "A" | "B" | "C1" | "C2" | "D" | "E";

export type ElectionType =
  | "genel"
  | "yerel"
  | "cumhurbaskanligi"
  | "referandum";

export type SocialPlatform =
  | "twitter"
  | "eksi"
  | "google_maps"
  | "facebook"
  | "instagram"
  | "reddit"
  | "youtube"
  | "tiktok"
  | "sikayetvar"
  | "tripadvisor"
  | "foursquare"
  | "blog"
  | "forum";

export type SentimentLabel = "positive" | "negative" | "neutral";

export type NewsCategory =
  | "genel"
  | "siyaset"
  | "ekonomi"
  | "asayis"
  | "egitim"
  | "saglik"
  | "kultur"
  | "spor"
  | "cevre"
  | "altyapi"
  | "belediye";

export type ManualEntryCategory =
  | "saha_gozlemi"
  | "mulakat"
  | "anket"
  | "kurumsal_veri"
  | "duzeltme"
  | "etkinlik"
  | "fotograf_belge"
  | "uzman_degerlendirmesi";

export type DataSourceType =
  | "official"
  | "scraped"
  | "manual"
  | "crowdsource"
  | "api"
  | "computed";

export type InstitutionType =
  | "tbmm"
  | "cumhurbaskanligi"
  | "bakanlik"
  | "valilik"
  | "belediye_buyuksehir"
  | "belediye_ilce"
  | "kaymakamlık"
  | "ticaret_odasi"
  | "sanayi_odasi"
  | "kalkinma_ajansi"
  | "diger";

export type DecisionType =
  | "meclis_karari"
  | "genelge"
  | "duyuru"
  | "imar_degisikligi"
  | "ihale"
  | "bütce"
  | "kentsel_donusum"
  | "sosyal_yardim"
  | "altyapi_projesi"
  | "diger";

// ─── BİRLEŞİK BÖLGE PROFİLİ ────────────────────────────

export interface RegionProfile {
  type: RegionType;
  id: number;
  name: string;
  slug: string;
  parent_name: string | null;
  parent_slug: string | null;
  center: [number, number];
  demographics: Demographics | null;
  election_summary: ElectionSummary | null;
  economic: EconomicData | null;
  safety: SafetyIndex | null;
  livability: LivabilityIndex | null;
  recent_news: NewsArticle[];
  recent_social: SocialPost[];
  recent_decisions: OfficialDecision[];
  sentiment_avg: number;
  mention_count_24h: number;
  trending_topics: string[];
}
