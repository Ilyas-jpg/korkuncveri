-- ══════════════════════════════════════════════════════════════
-- ULAK — Çekirdek Veritabanı Şeması
-- Türkiye'nin Yaşayan Veri Atlası
-- PostgreSQL + PostGIS
-- ══════════════════════════════════════════════════════════════

-- PostGIS uzantısını etkinleştir
CREATE EXTENSION IF NOT EXISTS postgis;

-- ─── ENUM TİPLERİ ───────────────────────────────────────────

CREATE TYPE region_type AS ENUM ('province', 'district', 'neighborhood');
CREATE TYPE turkey_region AS ENUM (
  'marmara', 'ege', 'akdeniz', 'ic_anadolu',
  'karadeniz', 'dogu_anadolu', 'guneydogu_anadolu'
);
CREATE TYPE ses_level AS ENUM ('A', 'B', 'C1', 'C2', 'D', 'E');
CREATE TYPE election_type AS ENUM ('genel', 'yerel', 'cumhurbaskanligi', 'referandum');
CREATE TYPE social_platform AS ENUM (
  'twitter', 'eksi', 'google_maps', 'facebook', 'instagram',
  'reddit', 'youtube', 'tiktok', 'sikayetvar', 'tripadvisor',
  'foursquare', 'blog', 'forum'
);
CREATE TYPE sentiment_label AS ENUM ('positive', 'negative', 'neutral');
CREATE TYPE news_category AS ENUM (
  'genel', 'siyaset', 'ekonomi', 'asayis', 'egitim',
  'saglik', 'kultur', 'spor', 'cevre', 'altyapi', 'belediye'
);
CREATE TYPE data_source_type AS ENUM (
  'official', 'scraped', 'manual', 'crowdsource', 'api', 'computed'
);
CREATE TYPE institution_type AS ENUM (
  'tbmm', 'cumhurbaskanligi', 'bakanlik', 'valilik',
  'belediye_buyuksehir', 'belediye_ilce', 'kaymakamlık',
  'ticaret_odasi', 'sanayi_odasi', 'kalkinma_ajansi', 'diger'
);
CREATE TYPE manual_entry_category AS ENUM (
  'saha_gozlemi', 'mulakat', 'anket', 'kurumsal_veri',
  'duzeltme', 'etkinlik', 'fotograf_belge', 'uzman_degerlendirmesi'
);
CREATE TYPE trend_direction AS ENUM ('improving', 'stable', 'declining');

-- ─── COĞRAFİ HİYERARŞİ ──────────────────────────────────────

CREATE TABLE provinces (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL UNIQUE,
  slug          TEXT NOT NULL UNIQUE,
  plate_code    SMALLINT NOT NULL UNIQUE CHECK (plate_code BETWEEN 1 AND 81),
  region        turkey_region NOT NULL,
  population    INTEGER NOT NULL DEFAULT 0,
  area_km2      REAL,
  center        GEOMETRY(Point, 4326),
  boundary      GEOMETRY(MultiPolygon, 4326),
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE districts (
  id            SERIAL PRIMARY KEY,
  province_id   INTEGER NOT NULL REFERENCES provinces(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL,
  population    INTEGER NOT NULL DEFAULT 0,
  area_km2      REAL,
  center        GEOMETRY(Point, 4326),
  boundary      GEOMETRY(MultiPolygon, 4326),
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE (province_id, slug)
);

CREATE TABLE neighborhoods (
  id            SERIAL PRIMARY KEY,
  district_id   INTEGER NOT NULL REFERENCES districts(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL,
  population    INTEGER NOT NULL DEFAULT 0,
  center        GEOMETRY(Point, 4326),
  boundary      GEOMETRY(MultiPolygon, 4326),
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE (district_id, slug)
);

-- Coğrafi indeksler
CREATE INDEX idx_provinces_boundary ON provinces USING GIST (boundary);
CREATE INDEX idx_districts_boundary ON districts USING GIST (boundary);
CREATE INDEX idx_neighborhoods_boundary ON neighborhoods USING GIST (boundary);
CREATE INDEX idx_districts_province ON districts (province_id);
CREATE INDEX idx_neighborhoods_district ON neighborhoods (district_id);

-- ─── DEMOGRAFİ ───────────────────────────────────────────────

CREATE TABLE demographics (
  id                    SERIAL PRIMARY KEY,
  region_type           region_type NOT NULL,
  region_id             INTEGER NOT NULL,
  year                  SMALLINT NOT NULL,
  population_total      INTEGER,
  population_male       INTEGER,
  population_female     INTEGER,
  median_age            REAL,
  age_0_14              INTEGER,
  age_15_24             INTEGER,
  age_25_34             INTEGER,
  age_35_44             INTEGER,
  age_45_54             INTEGER,
  age_55_64             INTEGER,
  age_65_plus           INTEGER,
  education_illiterate  REAL, -- yüzde (0-1)
  education_primary     REAL,
  education_secondary   REAL,
  education_high_school REAL,
  education_university  REAL,
  education_masters     REAL,
  education_phd         REAL,
  ses_level             ses_level,
  migration_net         INTEGER,
  avg_household_size    REAL,
  source_type           data_source_type DEFAULT 'official',
  created_at            TIMESTAMPTZ DEFAULT now(),
  updated_at            TIMESTAMPTZ DEFAULT now(),
  UNIQUE (region_type, region_id, year)
);

CREATE INDEX idx_demographics_region ON demographics (region_type, region_id);
CREATE INDEX idx_demographics_year ON demographics (year);

-- ─── SEÇİM SONUÇLARI ────────────────────────────────────────

CREATE TABLE elections (
  id                SERIAL PRIMARY KEY,
  election_type     election_type NOT NULL,
  election_date     DATE NOT NULL,
  name              TEXT NOT NULL, -- "2024 Yerel Seçim" gibi
  created_at        TIMESTAMPTZ DEFAULT now(),
  UNIQUE (election_type, election_date)
);

CREATE TABLE election_results (
  id                SERIAL PRIMARY KEY,
  election_id       INTEGER NOT NULL REFERENCES elections(id) ON DELETE CASCADE,
  region_type       region_type NOT NULL,
  region_id         INTEGER NOT NULL,
  party_code        TEXT NOT NULL, -- AKP, CHP, MHP vb.
  party_name        TEXT NOT NULL,
  party_color       TEXT, -- hex renk kodu
  votes             INTEGER NOT NULL DEFAULT 0,
  vote_percentage   REAL NOT NULL DEFAULT 0,
  is_winner         BOOLEAN DEFAULT false,
  created_at        TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE election_summaries (
  id                  SERIAL PRIMARY KEY,
  election_id         INTEGER NOT NULL REFERENCES elections(id) ON DELETE CASCADE,
  region_type         region_type NOT NULL,
  region_id           INTEGER NOT NULL,
  total_registered    INTEGER,
  total_votes         INTEGER,
  valid_votes         INTEGER,
  invalid_votes       INTEGER,
  participation_rate  REAL,
  created_at          TIMESTAMPTZ DEFAULT now(),
  UNIQUE (election_id, region_type, region_id)
);

CREATE INDEX idx_election_results_region ON election_results (region_type, region_id);
CREATE INDEX idx_election_results_election ON election_results (election_id);
CREATE INDEX idx_election_results_party ON election_results (party_code);

-- ─── SOSYAL MEDYA & HABER ────────────────────────────────────

CREATE TABLE social_posts (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  platform          social_platform NOT NULL,
  region_type       region_type,
  region_id         INTEGER,
  content           TEXT NOT NULL,
  author            TEXT,
  author_followers  INTEGER,
  url               TEXT,
  sentiment_score   REAL CHECK (sentiment_score BETWEEN -1 AND 1),
  sentiment_label   sentiment_label,
  topics            TEXT[],
  engagement_count  INTEGER DEFAULT 0,
  published_at      TIMESTAMPTZ NOT NULL,
  collected_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE news_articles (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title             TEXT NOT NULL,
  summary           TEXT,
  source            TEXT NOT NULL,
  source_url        TEXT,
  url               TEXT NOT NULL,
  region_type       region_type,
  region_id         INTEGER,
  category          news_category DEFAULT 'genel',
  sentiment_score   REAL CHECK (sentiment_score BETWEEN -1 AND 1),
  published_at      TIMESTAMPTZ NOT NULL,
  collected_at      TIMESTAMPTZ DEFAULT now(),
  image_url         TEXT
);

CREATE INDEX idx_social_posts_region ON social_posts (region_type, region_id);
CREATE INDEX idx_social_posts_platform ON social_posts (platform);
CREATE INDEX idx_social_posts_published ON social_posts (published_at DESC);
CREATE INDEX idx_social_posts_sentiment ON social_posts (sentiment_score);
CREATE INDEX idx_news_region ON news_articles (region_type, region_id);
CREATE INDEX idx_news_published ON news_articles (published_at DESC);
CREATE INDEX idx_news_category ON news_articles (category);

-- ─── EKONOMİ & TİCARET ──────────────────────────────────────

CREATE TABLE economic_data (
  id                    SERIAL PRIMARY KEY,
  region_type           region_type NOT NULL,
  region_id             INTEGER NOT NULL,
  year                  SMALLINT NOT NULL,
  month                 SMALLINT CHECK (month BETWEEN 1 AND 12),
  avg_household_income  INTEGER,
  unemployment_rate     REAL,
  business_count        INTEGER,
  new_businesses        INTEGER,
  closed_businesses     INTEGER,
  bankruptcies          INTEGER,
  avg_rent_1plus1       INTEGER,
  avg_rent_2plus1       INTEGER,
  avg_rent_3plus1       INTEGER,
  avg_sqm_price_sale    INTEGER,
  avg_sqm_price_rent    INTEGER,
  source_type           data_source_type DEFAULT 'official',
  created_at            TIMESTAMPTZ DEFAULT now(),
  updated_at            TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_economic_region ON economic_data (region_type, region_id);

-- ─── GÜVENLİK ENDEKSİ ──────────────────────────────────────

CREATE TABLE safety_index (
  id                      SERIAL PRIMARY KEY,
  region_type             region_type NOT NULL,
  region_id               INTEGER NOT NULL,
  year                    SMALLINT NOT NULL,
  overall_score           REAL CHECK (overall_score BETWEEN 0 AND 100),
  official_data_score     REAL,
  social_perception_score REAL,
  crowdsource_score       REAL,
  infrastructure_score    REAL,
  trend                   trend_direction DEFAULT 'stable',
  created_at              TIMESTAMPTZ DEFAULT now(),
  UNIQUE (region_type, region_id, year)
);

-- ─── YAŞAM KALİTESİ ENDEKSİ ─────────────────────────────────

CREATE TABLE livability_index (
  id                  SERIAL PRIMARY KEY,
  region_type         region_type NOT NULL,
  region_id           INTEGER NOT NULL,
  year                SMALLINT NOT NULL,
  overall_score       REAL CHECK (overall_score BETWEEN 0 AND 100),
  safety_score        REAL,
  education_score     REAL,
  health_score        REAL,
  transport_score     REAL,
  economy_score       REAL,
  environment_score   REAL,
  social_score        REAL,
  infrastructure_score REAL,
  digital_score       REAL,
  created_at          TIMESTAMPTZ DEFAULT now(),
  UNIQUE (region_type, region_id, year)
);

-- ─── RESMİ KARARLAR & DUYURULAR ─────────────────────────────

CREATE TABLE official_decisions (
  id                  TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  institution_type    institution_type NOT NULL,
  institution_name    TEXT NOT NULL,
  region_type         region_type,
  region_id           INTEGER,
  title               TEXT NOT NULL,
  summary             TEXT,
  url                 TEXT,
  decision_date       DATE,
  tags                TEXT[],
  published_at        TIMESTAMPTZ NOT NULL,
  collected_at        TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_decisions_region ON official_decisions (region_type, region_id);
CREATE INDEX idx_decisions_institution ON official_decisions (institution_type);
CREATE INDEX idx_decisions_published ON official_decisions (published_at DESC);

-- ─── MANUEL VERİ GİRİŞİ ─────────────────────────────────────

CREATE TABLE manual_entries (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  region_type     region_type NOT NULL,
  region_id       INTEGER NOT NULL,
  category        manual_entry_category NOT NULL,
  title           TEXT NOT NULL,
  content         TEXT,
  data_json       JSONB,
  source_type     data_source_type DEFAULT 'manual',
  source_url      TEXT,
  entered_by      UUID NOT NULL REFERENCES auth.users(id),
  verified        BOOLEAN DEFAULT false,
  verified_by     UUID REFERENCES auth.users(id),
  confidence      REAL DEFAULT 0.5 CHECK (confidence BETWEEN 0 AND 1),
  attachments     TEXT[], -- Supabase Storage URL'leri
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_manual_region ON manual_entries (region_type, region_id);
CREATE INDEX idx_manual_category ON manual_entries (category);
CREATE INDEX idx_manual_verified ON manual_entries (verified);

-- ─── TRAFİK & RADAR ─────────────────────────────────────────

CREATE TABLE traffic_cameras (
  id              SERIAL PRIMARY KEY,
  name            TEXT,
  location        GEOMETRY(Point, 4326) NOT NULL,
  camera_type     TEXT, -- 'radar', 'kgys', 'ets'
  speed_limit     SMALLINT,
  road_name       TEXT,
  direction       TEXT,
  province_id     INTEGER REFERENCES provinces(id),
  district_id     INTEGER REFERENCES districts(id),
  active          BOOLEAN DEFAULT true,
  source_type     data_source_type DEFAULT 'official',
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_traffic_cameras_location ON traffic_cameras USING GIST (location);

-- ─── KULLANICI ALARMLARI ─────────────────────────────────────

CREATE TABLE user_alerts (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  region_type     region_type NOT NULL,
  region_id       INTEGER NOT NULL,
  alert_type      TEXT NOT NULL, -- 'news', 'social', 'election', 'economic', 'safety'
  conditions      JSONB, -- {"sentiment_below": -0.3, "mention_above": 100}
  enabled         BOOLEAN DEFAULT true,
  last_triggered  TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_alerts_user ON user_alerts (user_id);

-- ─── KULLANICI FAVORİLERİ ───────────────────────────────────

CREATE TABLE user_bookmarks (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  region_type     region_type NOT NULL,
  region_id       INTEGER NOT NULL,
  note            TEXT,
  created_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, region_type, region_id)
);

-- ─── ROW LEVEL SECURITY ─────────────────────────────────────

-- Herkes okuyabilir (public veri)
ALTER TABLE provinces ENABLE ROW LEVEL SECURITY;
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE demographics ENABLE ROW LEVEL SECURITY;
ALTER TABLE elections ENABLE ROW LEVEL SECURITY;
ALTER TABLE election_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE election_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE economic_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_index ENABLE ROW LEVEL SECURITY;
ALTER TABLE livability_index ENABLE ROW LEVEL SECURITY;
ALTER TABLE official_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE traffic_cameras ENABLE ROW LEVEL SECURITY;

-- Public okuma politikaları
CREATE POLICY "public_read" ON provinces FOR SELECT USING (true);
CREATE POLICY "public_read" ON districts FOR SELECT USING (true);
CREATE POLICY "public_read" ON neighborhoods FOR SELECT USING (true);
CREATE POLICY "public_read" ON demographics FOR SELECT USING (true);
CREATE POLICY "public_read" ON elections FOR SELECT USING (true);
CREATE POLICY "public_read" ON election_results FOR SELECT USING (true);
CREATE POLICY "public_read" ON election_summaries FOR SELECT USING (true);
CREATE POLICY "public_read" ON social_posts FOR SELECT USING (true);
CREATE POLICY "public_read" ON news_articles FOR SELECT USING (true);
CREATE POLICY "public_read" ON economic_data FOR SELECT USING (true);
CREATE POLICY "public_read" ON safety_index FOR SELECT USING (true);
CREATE POLICY "public_read" ON livability_index FOR SELECT USING (true);
CREATE POLICY "public_read" ON official_decisions FOR SELECT USING (true);
CREATE POLICY "public_read" ON traffic_cameras FOR SELECT USING (true);

-- Manuel giriş: sadece kendi kaydını yönetebilir
ALTER TABLE manual_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_read_own" ON manual_entries FOR SELECT
  USING (auth.uid() = entered_by OR verified = true);
CREATE POLICY "users_insert_own" ON manual_entries FOR INSERT
  WITH CHECK (auth.uid() = entered_by);
CREATE POLICY "users_update_own" ON manual_entries FOR UPDATE
  USING (auth.uid() = entered_by);

-- Alarmlar: sadece kendi alarmlarını yönetebilir
ALTER TABLE user_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_alerts" ON user_alerts FOR ALL
  USING (auth.uid() = user_id);

-- Favoriler: sadece kendi favorilerini yönetebilir
ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_bookmarks" ON user_bookmarks FOR ALL
  USING (auth.uid() = user_id);

-- ─── UPDATED_AT TRİGGER ─────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON provinces
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON districts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON neighborhoods
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON demographics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON economic_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON manual_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
