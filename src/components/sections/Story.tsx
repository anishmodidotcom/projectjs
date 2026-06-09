"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { fadeUp, staggerParent, VIEWPORT } from "@/lib/motion";

const LINES = [
  "I grew up middle-class, in a city that doesn't hand anything to you.",
  "In 2023 I booked my first flight abroad with my own money. Dubai. You'll always have my heart. Everything changed there.",
  "Somewhere along the way I lost 45 kilos, from 120 down to 75. Not for anyone else. For me.",
  "I learned to build brands the same way I rebuilt myself: patiently, honestly, and out loud.",
];

export default function Story() {
  const reduced = usePrefersReducedMotion();

  const wrap = (children: React.ReactNode) =>
    reduced ? (
      <div>{children}</div>
    ) : (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerParent(0.12)}
      >
        {children}
      </motion.div>
    );

  const item = (children: React.ReactNode, key: string | number) =>
    reduced ? (
      <div key={key}>{children}</div>
    ) : (
      <motion.div key={key} variants={fadeUp}>
        {children}
      </motion.div>
    );

  return (
    <section
      id="story"
      className="section"
      style={{ background: "var(--cream)" }}
    >
      <div className="container">
        <div style={{ maxWidth: 760, marginInline: "auto" }}>
          {wrap(
            <>
              {item(<p className="kicker mb-6">My story</p>, "kicker")}
              {item(
                <h2 className="h-section mb-8">I didn&apos;t start here.</h2>,
                "h2"
              )}
              {LINES.map((line, i) =>
                item(
                  <p
                    style={{
                      marginBottom: 24,
                      color: "var(--charcoal)",
                    }}
                  >
                    {line}
                  </p>,
                  i
                )
              )}
              {item(
                <p
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontStyle: "italic",
                    color: "var(--berry)",
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    lineHeight: 1.2,
                    marginTop: 32,
                  }}
                >
                  My life, my way.
                </p>,
                "emphasis"
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
