"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-on");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let grow = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target as HTMLElement | null;
      const growEl = target?.closest?.("[data-cursor='grow']");
      grow = !!growEl;
    };

    const loop = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      const el = dotRef.current;
      if (el) {
        el.style.transform = `translate3d(${cx - 10}px, ${cy - 10}px, 0) scale(${
          grow ? 2.2 : 1
        })`;
        el.dataset.grow = grow ? "true" : "false";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("custom-cursor-on");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderRadius: "9999px",
        background: "var(--blush)",
        mixBlendMode: "multiply",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "background 0.25s ease, border 0.25s ease",
        willChange: "transform",
      }}
      className="data-[grow=true]:!bg-transparent data-[grow=true]:border data-[grow=true]:border-berry"
    />
  );
}
