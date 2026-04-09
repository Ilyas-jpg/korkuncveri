"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { mapConfig } from "@/config/site";
import { MapSidebar } from "./MapSidebar";
import { MapLayerControls } from "./MapLayerControls";
import { Layers, Maximize2, Minus, Plus, Locate } from "lucide-react";

export type MapLayer =
  | "demographic"
  | "election"
  | "economy"
  | "safety"
  | "education"
  | "health"
  | "social"
  | "traffic";

export function AtlasView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [activeLayer, setActiveLayer] = useState<MapLayer>("demographic");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(mapConfig.defaultZoom);

  // Haritayı başlat
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          "dark-tiles": {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
              "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
              "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution: "&copy; <a href='https://www.openstreetmap.org/'>OSM</a> &copy; <a href='https://carto.com/'>CARTO</a>",
          },
        },
        layers: [
          {
            id: "dark-base",
            type: "raster",
            source: "dark-tiles",
          },
        ],
      },
      center: mapConfig.defaultCenter,
      zoom: mapConfig.defaultZoom,
      minZoom: mapConfig.minZoom,
      maxZoom: mapConfig.maxZoom,
      attributionControl: false,
      maxBounds: [
        [25.5, 35.5], // SW
        [45.5, 42.5], // NE — Türkiye sınırları
      ],
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");

    map.on("zoom", () => {
      setZoomLevel(map.getZoom());
    });

    // Türkiye il sınırlarını yükle
    map.on("load", async () => {
      // GeoJSON'ı fetch et
      const res = await fetch("/geo/turkey-provinces-v2.json");
      const geojson = await res.json();

      map.addSource("provinces", {
        type: "geojson",
        data: geojson,
      });

      // İl dolgu — seçim kazanan partiye göre renklendir
      map.addLayer({
        id: "province-fill",
        type: "fill",
        source: "provinces",
        paint: {
          "fill-color": ["get", "election_2024_color"],
          "fill-opacity": 0.2,
        },
      });

      // İl sınır dış glow — derinlik hissi
      map.addLayer({
        id: "province-border-glow",
        type: "line",
        source: "provinces",
        paint: {
          "line-color": "#00D4AA",
          "line-width": [
            "interpolate", ["linear"], ["zoom"],
            4, 3,
            7, 5,
            10, 7,
          ],
          "line-opacity": 0.08,
          "line-blur": 3,
        },
      });

      // İl sınır çizgileri — keskin, sert, net
      map.addLayer({
        id: "province-border",
        type: "line",
        source: "provinces",
        paint: {
          "line-color": "#00D4AA",
          "line-width": [
            "interpolate", ["linear"], ["zoom"],
            4, 1.2,
            7, 2,
            10, 3,
            14, 4,
          ],
          "line-opacity": 0.85,
        },
      });

      // Hover sınır — parlak, kalın, dikkat çekici
      map.addLayer({
        id: "province-border-hover",
        type: "line",
        source: "provinces",
        paint: {
          "line-color": "#00FFCC",
          "line-width": [
            "interpolate", ["linear"], ["zoom"],
            4, 2.5,
            7, 4,
            10, 5,
          ],
          "line-opacity": 1,
        },
        filter: ["==", ["get", "name"], ""],
      });

      // Hover dolgu
      map.addLayer({
        id: "province-fill-hover",
        type: "fill",
        source: "provinces",
        paint: {
          "fill-color": "#00D4AA",
          "fill-opacity": 0.15,
        },
        filter: ["==", ["get", "name"], ""],
      });

      // Popup referansı
      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 12,
      });

      // İl hover efekti
      map.on("mousemove", "province-fill", (e) => {
        if (e.features?.[0]) {
          map.getCanvas().style.cursor = "pointer";
          const props = e.features[0].properties;
          const name = props?.name ?? "";

          map.setFilter("province-border-hover", ["==", ["get", "name"], name]);
          map.setFilter("province-fill-hover", ["==", ["get", "name"], name]);

          // Popup göster — MapLibre properties'leri string olabilir
          const pop = Number(props?.population) || 0;
          const popStr = pop.toLocaleString("tr-TR");
          const winner = String(props?.election_2024_winner ?? "");
          const winnerColor = String(props?.election_2024_color ?? "#fff");
          const medAge = props?.median_age ? Number(props.median_age).toFixed(1) : "—";
          const plate = String(props?.plate_code ?? "");

          popup
            .setLngLat(e.lngLat)
            .setHTML(`
              <div style="font-size: 14px; font-weight: 600; margin-bottom: 6px;">
                ${name}
                <span style="opacity: 0.4; font-size: 11px; font-weight: 400; margin-left: 4px;">${plate}</span>
              </div>
              <div style="font-size: 12px; display: flex; flex-direction: column; gap: 3px; color: #94A3B8;">
                <span>👥 Nüfus: <b style="color: #F1F5F9;">${popStr}</b></span>
                <span>🗳️ 2024: <b style="color: ${winnerColor};">${winner}</b></span>
                <span>📊 Medyan yaş: <b style="color: #F1F5F9;">${medAge}</b></span>
              </div>
            `)
            .addTo(map);
        }
      });

      map.on("mouseleave", "province-fill", () => {
        map.getCanvas().style.cursor = "";
        map.setFilter("province-border-hover", ["==", ["get", "name"], ""]);
        map.setFilter("province-fill-hover", ["==", ["get", "name"], ""]);
        popup.remove();
      });

      // İl tıklama → sidebar aç
      map.on("click", "province-fill", (e) => {
        if (e.features?.[0]) {
          const props = e.features[0].properties;
          if (props?.slug) {
            setSelectedRegion(props.slug);
            setSidebarOpen(true);

            // Tıklanan ile zoom
            const bounds = new maplibregl.LngLatBounds();
            const geom = e.features[0].geometry;
            if (geom.type === "MultiPolygon") {
              for (const poly of (geom as GeoJSON.MultiPolygon).coordinates) {
                for (const ring of poly) {
                  for (const coord of ring) {
                    bounds.extend(coord as [number, number]);
                  }
                }
              }
            } else if (geom.type === "Polygon") {
              for (const ring of (geom as GeoJSON.Polygon).coordinates) {
                for (const coord of ring) {
                  bounds.extend(coord as [number, number]);
                }
              }
            }
            map.fitBounds(bounds, { padding: 60, duration: 800 });
          }
        }
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const handleZoomIn = useCallback(() => {
    mapRef.current?.zoomIn({ duration: 300 });
  }, []);

  const handleZoomOut = useCallback(() => {
    mapRef.current?.zoomOut({ duration: 300 });
  }, []);

  const handleResetView = useCallback(() => {
    mapRef.current?.flyTo({
      center: mapConfig.defaultCenter,
      zoom: mapConfig.defaultZoom,
      duration: 1000,
    });
  }, []);

  // Zoom seviyesine göre label
  const zoomLabel =
    zoomLevel < 7 ? "Ülke" : zoomLevel < 10 ? "İl" : zoomLevel < 13 ? "İlçe" : "Mahalle";

  return (
    <div className="relative flex overflow-hidden" style={{ height: "calc(100vh - 56px)" }}>
      {/* Harita */}
      <div className="flex-1 relative">
        <div ref={mapContainer} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" }} />

        {/* Üst kontroller */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none z-10">
          {/* Sol: Katman kontrolleri */}
          <div className="pointer-events-auto">
            <MapLayerControls
              activeLayer={activeLayer}
              onLayerChange={setActiveLayer}
            />
          </div>

          {/* Sağ: Arama */}
          <div className="pointer-events-auto">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-sm w-64"
              style={{
                background: "var(--color-bg-elevated)",
                border: "1px solid var(--color-border)",
              }}
            >
              <input
                type="text"
                placeholder="İl, ilçe veya mahalle ara..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-text-muted)]"
                style={{ color: "var(--color-text-primary)" }}
              />
            </div>
          </div>
        </div>

        {/* Alt sol: Zoom kontrolleri */}
        <div className="absolute bottom-6 left-4 flex flex-col gap-2 z-10">
          <div
            className="flex flex-col rounded-sm overflow-hidden"
            style={{
              background: "var(--color-bg-elevated)",
              border: "1px solid var(--color-border)",
            }}
          >
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-[var(--color-bg-hover)] transition-colors"
              aria-label="Yakınlaştır"
            >
              <Plus size={16} style={{ color: "var(--color-text-secondary)" }} />
            </button>
            <div className="h-px" style={{ background: "var(--color-border)" }} />
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-[var(--color-bg-hover)] transition-colors"
              aria-label="Uzaklaştır"
            >
              <Minus size={16} style={{ color: "var(--color-text-secondary)" }} />
            </button>
          </div>

          <button
            onClick={handleResetView}
            className="p-2 rounded-sm hover:bg-[var(--color-bg-hover)] transition-colors"
            style={{
              background: "var(--color-bg-elevated)",
              border: "1px solid var(--color-border)",
            }}
            aria-label="Sıfırla"
          >
            <Maximize2 size={16} style={{ color: "var(--color-text-secondary)" }} />
          </button>
        </div>

        {/* Alt sağ: Zoom seviyesi */}
        <div
          className="absolute bottom-6 right-4 px-3 py-1.5 rounded-sm text-xs font-medium z-10"
          style={{
            background: "var(--color-bg-elevated)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <Locate size={12} className="inline mr-1.5" style={{ color: "var(--color-accent-primary)" }} />
          {zoomLabel} · z{zoomLevel.toFixed(1)}
        </div>

        {/* Sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 right-[17rem] p-2 rounded-sm z-10 transition-all"
          style={{
            background: "var(--color-bg-elevated)",
            border: "1px solid var(--color-border)",
            right: sidebarOpen ? "21rem" : "1rem",
          }}
          aria-label="Sidebar aç/kapat"
        >
          <Layers size={16} style={{ color: "var(--color-accent-primary)" }} />
        </button>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <MapSidebar
          selectedRegion={selectedRegion}
          onClose={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
