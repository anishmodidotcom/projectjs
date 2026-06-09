"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { fadeUp, VIEWPORT } from "@/lib/motion";

const BRANDS = [
  "Novotel",
  "Accor",
  "Klook",
  "Grab",
  "Nalanda Retreat",
  "Concu",
  "Foo",
  "Blue Tokai",
  "Bioderma",
];

function Chip({ name }: { name: string }) {
  return (
    <span
      style={{
        border: "1px solid var(--champagne)",
        borderRadius: 999,
        padding: "12px 24px",
        fontFamily: "var(--font-display), serif",
        fontSize: "1.1rem",
        color: "var(--charcoal)",
        background: "var(--cream)",
        whiteSpace: "nowrap",
        display: "inline-block",
      }}
    >
      {name}
    </span>
  );
}

export default function Brands() {
  const reduced = usePrefersReducedMotion();

  const Header = () => (
    <>
      <p className="kicker mb-4">Selected partners</p>
      <h2 className="h-section" style={{ marginBottom: 16 }}>
        Brands &amp; places I&apos;ve worked with
      </h2>
      <p style={{ maxWidth: 720, marginBottom: 48, color: "var(--charcoal)" }}>
        Across hospitality, travel, beauty and lifestyle.
      </p>
    </>
  );

  return (
    <section
      id="brands"
      className="section"
      style={{ background: "var(--cream)" }}
    >
      <div className="container">
        {reduced ? (
          <Header />
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={fadeUp}
          >
            <Header />
          </motion.div>
        )}
      </div>

      {/* PLACEHOLDER: swap text chips for real brand logos once provided */}
      <div
        className="marquee-wrap"
        style={{
          position: "relative",
          overflow: "hidden",
          marginTop: 24,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 80,
            height: "100%",
            background:
              "linear-gradient(to right, var(--cream), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 80,
            height: "100%",
            background:
              "linear-gradient(to left, var(--cream), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          className="marquee-track flex"
          style={{
            gap: 16,
            width: "max-content",
            paddingBlock: 24,
          }}
        >
          {BRANDS.map((b, i) => (
            <Chip key={`a-${i}`} name={b} />
          ))}
          {BRANDS.map((b, i) => (
            <Chip key={`b-${i}`} name={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
