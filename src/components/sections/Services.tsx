"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { fadeUp, staggerParent, VIEWPORT } from "@/lib/motion";

const CARDS = [
  {
    title: "Brand Strategy & Consultancy",
    body: "Positioning, narrative and the decisions that make a brand feel inevitable.",
  },
  {
    title: "Performance Marketing",
    body: "Meta and performance campaigns built to spend smart and bring real results.",
  },
  {
    title: "Content & Social",
    body: "Content systems and social that grow audiences without losing the soul.",
  },
];

export default function Services() {
  const reduced = usePrefersReducedMotion();

  const Card = ({ title, body }: { title: string; body: string }) => (
    <div
      data-cursor="grow"
      className="services-card"
      style={{
        background: "var(--cream)",
        border: "1px solid var(--champagne)",
        borderRadius: 16,
        padding: 32,
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display), serif",
          fontSize: "1.5rem",
          fontWeight: 500,
          color: "var(--charcoal)",
          marginBottom: 12,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>
      <p style={{ color: "var(--charcoal)", opacity: 0.85 }}>{body}</p>
    </div>
  );

  return (
    <section
      id="services"
      className="section"
      style={{ background: "var(--blush)" }}
    >
      <style>{`
        .services-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(43, 37, 34, 0.10);
        }
      `}</style>
      <div className="container">
        <p className="kicker mb-4">Drive Me Social</p>
        <h2 className="h-section" style={{ marginBottom: 16 }}>
          What we do
        </h2>
        <p style={{ maxWidth: 720, marginBottom: 48, color: "var(--charcoal)" }}>
          My agency. We help founders and brands grow with strategy, performance
          and content that actually sounds like them.
        </p>

        {reduced ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CARDS.map((c) => (
              <Card key={c.title} {...c} />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={staggerParent(0.12)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {CARDS.map((c) => (
              <motion.div key={c.title} variants={fadeUp}>
                <Card {...c} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
