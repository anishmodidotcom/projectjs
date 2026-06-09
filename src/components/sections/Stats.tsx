"use client";

import { useCountUp } from "@/hooks/useCountUp";

function VerifiedBadge({ size = 36 }: { size?: number }) {
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

const numberStyle: React.CSSProperties = {
  fontFamily: "var(--font-display), serif",
  fontWeight: 400,
  fontSize: "clamp(2.5rem, 5vw, 4rem)",
  color: "var(--berry)",
  lineHeight: 1,
  marginBottom: 8,
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body), system-ui, sans-serif",
  color: "var(--charcoal)",
  fontSize: "0.95rem",
};

function CountStat({
  target,
  decimals,
  suffix,
  label,
}: {
  target: number;
  decimals: number;
  suffix: string;
  label: string;
}) {
  const { value, ref } = useCountUp(target);
  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={numberStyle}>
        {display}
        {suffix}
      </div>
      <div style={labelStyle}>{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section
      id="stats"
      className="section"
      style={{ background: "var(--blush)" }}
    >
      <div className="container">
        <p className="kicker mb-8" style={{ textAlign: "center" }}>
          By the numbers
        </p>
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: 32, alignItems: "start" }}
        >
          <CountStat target={25.9} decimals={1} suffix="k" label="Community on Instagram" />
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                ...numberStyle,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                justifyContent: "center",
              }}
            >
              Verified
              <VerifiedBadge size={36} />
            </div>
            <div style={labelStyle}>Creator on Instagram</div>
          </div>
          <CountStat target={6} decimals={0} suffix="+" label="Countries & counting" />
          <CountStat target={12} decimals={0} suffix="k" label="Views on a single reel" />
        </div>
      </div>
    </section>
  );
}
