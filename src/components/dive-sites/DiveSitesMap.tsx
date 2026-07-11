"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import DiveSiteCard from "@/components/dive-sites/DiveSiteCard";
import type { DiveSite } from "@/lib/data/dive-sites";
import type { Locale } from "@/lib/api/types";

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

function SiteMarker({
  site,
  selected,
  locale,
  onSelect,
}: {
  site: DiveSite;
  selected: boolean;
  locale: Locale;
  onSelect: (id: string) => void;
}) {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (selected) markerRef.current?.openPopup();
  }, [selected]);

  return (
    <Marker
      ref={markerRef}
      position={[site.lat, site.lng]}
      icon={createIcon(selected)}
      eventHandlers={{ click: () => onSelect(site.id) }}
    >
      <Popup
        className="dive-site-popup"
        closeButton={false}
        closeOnClick={false}
        offset={[0, -6]}
        minWidth={256}
      >
        <DiveSiteCard site={site} locale={locale} />
      </Popup>
    </Marker>
  );
}

interface Props {
  sites: DiveSite[];
  selectedId: string;
  onSelect: (id: string) => void;
  locale: Locale;
}

export default function DiveSitesMap({
  sites,
  selectedId,
  onSelect,
  locale,
}: Props) {
  const selected = sites.find((site) => site.id === selectedId) ?? sites[0];

  return (
    <MapContainer
      center={[selected.lat, selected.lng]}
      zoom={9}
      scrollWheelZoom
      attributionControl={false}
      className="h-full w-full"
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}"
        maxNativeZoom={13}
      />
      {sites.map((site) => (
        <SiteMarker
          key={site.id}
          site={site}
          selected={site.id === selectedId}
          locale={locale}
          onSelect={onSelect}
        />
      ))}
      <FlyTo lat={selected.lat} lng={selected.lng} />
    </MapContainer>
  );
}
