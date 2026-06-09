"use client";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/jaynasippy/" },
  { label: "Agency", href: "https://www.instagram.com/drive_me_social/" },
  { label: "Threads", href: "https://www.threads.net/@jaynasippy" },
  { label: "Snapchat", href: "https://www.snapchat.com/@jaynasippy" },
  { label: "Email", href: "mailto:jaynasippy@gmail.com" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--charcoal)",
        color: "var(--cream)",
        paddingBlock: 64,
      }}
    >
      <style>{`
        .heart-group .bow, .heart-group .bee {
          opacity: 0;
          transform: scale(0.6) translateX(-4px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .heart-group:hover .bow,
        .heart-group:focus-within .bow {
          opacity: 1;
          transform: scale(1) translateX(0);
        }
        .heart-group:hover .bee,
        .heart-group:focus-within .bee {
          opacity: 1;
          transform: scale(1) translateX(0);
          transition-delay: 0.1s;
        }
        .footer-link {
          color: var(--cream);
          transition: color 0.25s ease;
        }
        .footer-link:hover {
          color: var(--berry);
        }
      `}</style>
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              color: "var(--cream)",
              lineHeight: 1.2,
            }}
          >
            Made with intention. Mumbai · Dubai.
          </p>
          <span
            className="heart-group"
            tabIndex={0}
            aria-label="Made with love"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              cursor: "default",
              padding: 4,
              borderRadius: 8,
            }}
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              aria-hidden
              style={{ display: "block" }}
            >
              <path
                d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 8-2.83A4.5 4.5 0 0 1 19 11c0 5.65-7 10-7 10z"
                fill="var(--berry)"
              />
            </svg>
            {/* original ribbon-bow motif: two soft triangles + center knot */}
            <svg
              className="bow"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                d="M3 12 L10 7 L10 17 Z"
                fill="var(--champagne)"
              />
              <path
                d="M21 12 L14 7 L14 17 Z"
                fill="var(--champagne)"
              />
              <circle cx={12} cy={12} r={2.5} fill="var(--berry)" />
            </svg>
            {/* original tiny bee motif: striped oval + simple wings */}
            <svg
              className="bee"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              aria-hidden
            >
              <ellipse cx={12} cy={14} rx={6} ry={4.5} fill="var(--champagne)" />
              <rect x={9} y={10.5} width={1.5} height={7} fill="var(--berry)" />
              <rect x={13.5} y={10.5} width={1.5} height={7} fill="var(--berry)" />
              <ellipse cx={8} cy={9} rx={2.5} ry={1.5} fill="var(--cream)" opacity={0.85} />
              <ellipse cx={16} cy={9} rx={2.5} ry={1.5} fill="var(--cream)" opacity={0.85} />
            </svg>
          </span>
        </div>

        <nav
          aria-label="Social links"
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 32,
          }}
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener" : undefined}
              data-cursor="grow"
              className="footer-link"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--cream)",
            opacity: 0.7,
          }}
        >
          © 2026 Jayna Sippy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
