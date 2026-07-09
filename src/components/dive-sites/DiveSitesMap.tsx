"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { DiveSite } from "@/lib/data/dive-sites";

function createIcon(selected: boolean) {
  const size = selected ? 22 : 16;
  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;border-radius:9999px;background:${
      selected ? "#e8a93a" : "#0f8b8d"
    };border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], 11, { duration: 0.8 });
  }, [lat, lng, map]);

  return null;
}

interface Props {
  sites: DiveSite[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function DiveSitesMap({ sites, selectedId, onSelect }: Props) {
  const selected = sites.find((site) => site.id === selectedId) ?? sites[0];

  return (
    <MapContainer
      center={[selected.lat, selected.lng]}
      zoom={9}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sites.map((site) => (
        <Marker
          key={site.id}
          position={[site.lat, site.lng]}
          icon={createIcon(site.id === selectedId)}
          eventHandlers={{ click: () => onSelect(site.id) }}
        />
      ))}
      <FlyTo lat={selected.lat} lng={selected.lng} />
    </MapContainer>
  );
}
