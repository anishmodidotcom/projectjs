"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { fadeUp, staggerParent, VIEWPORT } from "@/lib/motion";

const CAPTIONS = [
  "Dubai you'll always have my heart",
  "120kg → 75kg",
  "Goa OOTD",
  "Inside Drive Me Social",
  "Matcha @ Concu",
  "Ba Na Hills, Vietnam",
];

function VerifiedBadge({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <path
        d="M12 1.5l2.6 1.9 3.2-.4 1.4 2.9 2.9 1.4-.4 3.2L23.6 13l-1.9 2.6.4 3.2-2.9 1.4-1.4 2.9-3.2-.4L12 24.6l-2.6-1.9-3.2.4-1.4-2.9-2.9-1.4.4-3.2L.5 13l1.9-2.6-.4-3.2 2.9-1.4 1.4-2.9 3.2.4L12 1.5z"
        fill="#1DA1F2"
      />
      <path
        d="M10.7 15.4l-3-3 1.3-1.3 1.7 1.7 4.3-4.3 1.3 1.3-5.6 5.6z"
        fill="#fff"
      />
    </svg>
  );
}

function IGGlyph({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <rect
        x={3}
        y={3}
        width={18}
        height={18}
        rx={5}
        stroke="var(--champagne)"
        strokeWidth={1.5}
      />
      <circle cx={12} cy={12} r={4} stroke="var(--champagne)" strokeWidth={1.5} />
      <circle cx={17} cy={7} r={1} fill="var(--champagne)" />
    </svg>
  );
}

function Tile({ caption }: { caption: string }) {
  return (
    <div
      className="ig-tile"
      style={{
        background: "var(--blush)",
        borderRadius: 14,
        aspectRatio: "1 / 1",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.4s ease",
      }}
    >
      <IGGlyph />
      <span
        className="ig-overlay"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--berry)",
          opacity: 0,
          transition: "opacity 0.4s ease",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: 12,
          right: 12,
          bottom: 10,
          fontFamily: "var(--font-body), system-ui, sans-serif",
          fontSize: "0.85rem",
          color: "var(--charcoal)",
          lineHeight: 1.3,
        }}
      >
        {caption}
      </span>
    </div>
  );
}

export default function Instagram() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="instagram"
      className="section"
      style={{ background: "var(--cream)" }}
    >
      <style>{`
        .ig-tile:hover { transform: scale(1.03); }
        .ig-tile:hover .ig-overlay { opacity: 0.08; }
      `}</style>
      <div className="container">
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between"
          style={{ gap: 24, marginBottom: 40 }}
        >
          <div>
            <p className="kicker mb-3">On Instagram</p>
            <h2 className="h-section">@jaynasippy</h2>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "var(--charcoal)",
              }}
            >
              <VerifiedBadge />
              <span style={{ fontWeight: 500 }}>25.9k followers</span>
            </span>
            <a
              href="https://www.instagram.com/jaynasippy/"
              target="_blank"
              rel="noopener"
              data-cursor="grow"
              className="pill-berry"
            >
              Follow
            </a>
          </div>
        </div>

        {/* PLACEHOLDER: replace these 6 tiles with a live Instagram feed (Behold.so or IG Graph API) once account access is available. Keep grid markup identical. */}
        {reduced ? (
          <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: 12 }}>
            {CAPTIONS.map((c) => (
              <Tile key={c} caption={c} />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={staggerParent(0.08)}
            className="grid grid-cols-2 md:grid-cols-3"
            style={{ gap: 12 }}
          >
            {CAPTIONS.map((c) => (
              <motion.div key={c} variants={fadeUp}>
                <Tile caption={c} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
