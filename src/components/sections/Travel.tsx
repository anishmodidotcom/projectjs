"use client";

import { useEffect, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { fadeUp, VIEWPORT } from "@/lib/motion";
import worldData from "world-atlas/countries-110m.json";

type Place = {
  key: string;
  coords: [number, number];
  label: string;
};

const PLACES: Place[] = [
  { key: "mumbai", coords: [72.87, 19.07], label: "Mumbai · home base" },
  { key: "dubai", coords: [55.27, 25.2], label: "Dubai · where it all changed" },
  { key: "singapore", coords: [103.82, 1.35], label: "Singapore · Sentosa, 2024" },
  { key: "danang", coords: [108.21, 16.05], label: "Vietnam · Ba Na Hills, 2024" },
  { key: "taipei", coords: [121.56, 25.03], label: "Taiwan" },
  { key: "goa", coords: [73.76, 15.52], label: "Goa · 2026" },
];

export default function Travel() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [animatedCount, setAnimatedCount] = useState(reduced ? PLACES.length : 0);
  const mapWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced) {
      setAnimatedCount(PLACES.length);
      return;
    }
    const el = mapWrapRef.current;
    if (!el) return;
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !cancelled) {
            cancelled = true;
            PLACES.forEach((_, i) => {
              const t = setTimeout(() => setAnimatedCount(i + 1), i * 150);
              timeouts.push(t);
            });
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, [reduced]);

  return (
    <section
      id="travel"
      className="section"
      style={{ background: "var(--blush)" }}
    >
      <div className="container">
        {reduced ? (
          <>
            <p className="kicker mb-4">Where I&apos;ve been</p>
            <h2 className="h-section" style={{ marginBottom: 32 }}>
              I travel light.
            </h2>
          </>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={fadeUp}
          >
            <p className="kicker mb-4">Where I&apos;ve been</p>
            <h2 className="h-section" style={{ marginBottom: 32 }}>
              I travel light.
            </h2>
          </motion.div>
        )}

        <div
          ref={mapWrapRef}
          style={{
            maxWidth: 1000,
            marginInline: "auto",
            position: "relative",
            aspectRatio: "16 / 9",
          }}
        >
          <ComposableMap
            projectionConfig={{ scale: 150, center: [60, 25] }}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={worldData as object}>
              {({ geographies }: { geographies: Array<{ rsmKey: string }> }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "var(--cream)",
                        stroke: "var(--champagne)",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: "var(--cream)",
                        stroke: "var(--champagne)",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      pressed: {
                        fill: "var(--cream)",
                        stroke: "var(--champagne)",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {PLACES.map((p, i) => {
              const visible = i < animatedCount;
              const isActive = active === p.key;
              return (
                <Marker key={p.key} coordinates={p.coords}>
                  <g
                    tabIndex={0}
                    role="button"
                    aria-label={p.label}
                    onMouseEnter={() => setActive(p.key)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(p.key)}
                    onBlur={() => setActive(null)}
                    onClick={() =>
                      setActive((v) => (v === p.key ? null : p.key))
                    }
                    style={{
                      cursor: "pointer",
                      transform: visible
                        ? "translateY(0px) scale(1)"
                        : "translateY(-16px) scale(0)",
                      transformOrigin: "center",
                      transition: reduced
                        ? "none"
                        : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                      outline: "none",
                    }}
                    data-cursor="grow"
                  >
                    <circle r={7} fill="var(--champagne)" />
                    <circle r={5} fill="var(--berry)" />
                    {isActive && (
                      <g transform="translate(10, -14)">
                        <rect
                          x={0}
                          y={-14}
                          rx={10}
                          ry={10}
                          width={Math.max(80, p.label.length * 6.5)}
                          height={28}
                          fill="var(--cream)"
                          stroke="var(--champagne)"
                          strokeWidth={1}
                        />
                        <text
                          x={10}
                          y={4}
                          style={{
                            fontFamily: "var(--font-display), serif",
                            fontSize: 11,
                            fill: "var(--charcoal)",
                          }}
                        >
                          {p.label}
                        </text>
                      </g>
                    )}
                  </g>
                </Marker>
              );
            })}
          </ComposableMap>
        </div>
      </div>
    </section>
  );
}
