"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { EASE, staggerParent, wordChild } from "@/lib/motion";

const LINES = ["I build brands.", "I travel light.", "I take people with me."];

function GrainOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.04,
        zIndex: 0,
        mixBlendMode: "multiply",
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();

  const handleScrollToContact = () => {
    const target = "#contact";
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(target);
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="section relative flex items-center"
      style={{ minHeight: "100vh", background: "var(--cream)" }}
    >
      <GrainOverlay />
      <div className="container relative" style={{ zIndex: 1 }}>
        <p className="kicker mb-6">
          Jayna Sippy — Brand Consultant · Marketer · Founder
        </p>

        {reduced ? (
          <h1 className="h-hero">
            {LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        ) : (
          <motion.h1
            className="h-hero"
            initial="hidden"
            animate="visible"
            variants={staggerParent(0.08, 0.2)}
          >
            {LINES.map((line, lineIdx) => (
              <span
                key={lineIdx}
                className="flex flex-wrap"
                style={{ overflow: "hidden" }}
              >
                {line.split(" ").map((word, i) => (
                  <motion.span
                    key={`${lineIdx}-${i}`}
                    variants={wordChild}
                    className="inline-block"
                    style={{ marginRight: "0.25em" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>
        )}

        <div className="mt-10">
          {reduced ? (
            <button
              type="button"
              onClick={handleScrollToContact}
              className="pill-berry"
              data-cursor="grow"
            >
              Work with me
            </button>
          ) : (
            <motion.button
              type="button"
              onClick={handleScrollToContact}
              className="pill-berry"
              data-cursor="grow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
            >
              Work with me
            </motion.button>
          )}
        </div>

        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: 32 }}
          aria-hidden
        >
          <span
            className={reduced ? "" : "scroll-hint"}
            style={{
              display: "block",
              width: 1,
              height: 40,
              background: "var(--champagne)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
