const sections = [
  { id: "hero", label: "Hero" },
  { id: "story", label: "Story" },
  { id: "services", label: "Services" },
  { id: "brands", label: "Brands" },
  { id: "travel", label: "Travel" },
  { id: "instagram", label: "Instagram" },
  { id: "stats", label: "Stats" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <main>
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className="section flex items-center justify-center"
          style={{
            minHeight: "60vh",
            background: index % 2 === 0 ? "var(--cream)" : "var(--blush)",
          }}
        >
          <div className="container">
            <h2
              className="text-center text-charcoal"
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
              }}
            >
              {section.label}
            </h2>
          </div>
        </section>
      ))}
      <footer
        className="section"
        style={{ background: "var(--charcoal)", color: "var(--cream)" }}
      >
        <div className="container">
          <p
            className="text-center"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Footer
          </p>
        </div>
      </footer>
    </main>
  );
}
