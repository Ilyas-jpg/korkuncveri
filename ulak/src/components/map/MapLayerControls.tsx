"use client";

import type { MapLayer } from "./AtlasView";
import {
  Users,
  Vote,
  TrendingUp,
  Shield,
  GraduationCap,
  Heart,
  MessageCircle,
  Car,
} from "lucide-react";
import { cn } from "@/lib/utils";

const layers: { id: MapLayer; label: string; icon: typeof Users; color: string }[] = [
  { id: "demographic", label: "Demografi", icon: Users, color: "var(--color-accent-primary)" },
  { id: "election", label: "Seçim", icon: Vote, color: "var(--color-party-chp)" },
  { id: "economy", label: "Ekonomi", icon: TrendingUp, color: "var(--color-accent-success)" },
  { id: "safety", label: "Güvenlik", icon: Shield, color: "var(--color-accent-info)" },
  { id: "education", label: "Eğitim", icon: GraduationCap, color: "var(--color-accent-secondary)" },
  { id: "health", label: "Sağlık", icon: Heart, color: "var(--color-accent-danger)" },
  { id: "social", label: "Sosyal Nabız", icon: MessageCircle, color: "var(--color-accent-warn)" },
  { id: "traffic", label: "Trafik & Radar", icon: Car, color: "#F97316" },
];

interface MapLayerControlsProps {
  activeLayer: MapLayer;
  onLayerChange: (layer: MapLayer) => void;
}

export function MapLayerControls({ activeLayer, onLayerChange }: MapLayerControlsProps) {
  return (
    <div
      className="flex flex-wrap gap-1.5 p-1.5 rounded-sm"
      style={{
        background: "var(--color-bg-elevated)",
        border: "1px solid var(--color-border)",
      }}
    >
      {layers.map((layer) => {
        const isActive = activeLayer === layer.id;
        const Icon = layer.icon;
        return (
          <button
            key={layer.id}
            onClick={() => onLayerChange(layer.id)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm text-xs font-medium transition-all",
              isActive
                ? "shadow-sm"
                : "hover:bg-[var(--color-bg-hover)]"
            )}
            style={
              isActive
                ? {
                    background: `${layer.color}18`,
                    color: layer.color,
                    border: `1px solid ${layer.color}30`,
                  }
                : { color: "var(--color-text-muted)" }
            }
          >
            <Icon size={13} />
            <span className="hidden sm:inline">{layer.label}</span>
          </button>
        );
      })}
    </div>
  );
}
