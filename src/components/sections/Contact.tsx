"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { fadeUp, VIEWPORT } from "@/lib/motion";

const BUDGETS = [
  "Under ₹50k",
  "₹50k–₹2L",
  "₹2L–₹5L",
  "₹5L+",
  "Let's discuss",
];

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const reduced = usePrefersReducedMotion();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          brand,
          budget,
          message,
          company_website: honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setName("");
      setBrand("");
      setMessage("");
      setBudget(BUDGETS[0]);
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  const formInvalid =
    !name.trim() || !brand.trim() || !message.trim() || status === "sending";

  const wrap = (children: React.ReactNode) =>
    reduced ? (
      <div>{children}</div>
    ) : (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={fadeUp}
      >
        {children}
      </motion.div>
    );

  return (
    <section
      id="contact"
      className="section"
      style={{ background: "var(--cream)" }}
    >
      <div className="container">
        {wrap(
          <>
            <p className="kicker mb-4">Work with me</p>
            <h2 className="h-section" style={{ marginBottom: 16 }}>
              Let&apos;s build something.
            </h2>
            <p style={{ marginBottom: 48, maxWidth: 640, color: "var(--charcoal)" }}>
              Collabs, campaigns, consulting. Tell me about your brand.
            </p>
          </>
        )}

        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 48, alignItems: "start" }}
        >
          <div>
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="c-name" className="form-label">
                Name
              </label>
              <input
                id="c-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="c-brand" className="form-label">
                Brand / Company
              </label>
              <input
                id="c-brand"
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="form-input"
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="c-budget" className="form-label">
                Budget
              </label>
              <select
                id="c-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="form-input"
              >
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="c-message" className="form-label">
                Message
              </label>
              <textarea
                id="c-message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-input"
                style={{ resize: "vertical" }}
              />
            </div>

            <input
              type="text"
              name="company_website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              aria-hidden
              autoComplete="off"
              className="visually-hidden"
            />

            <button
              type="button"
              data-cursor="grow"
              className="pill-berry"
              disabled={formInvalid}
              onClick={handleSubmit}
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>

            <div style={{ minHeight: 28, marginTop: 16 }} aria-live="polite">
              {status === "success" && (
                <p style={{ color: "var(--berry)" }}>
                  Thank you. I&apos;ll be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p style={{ color: "var(--berry)" }}>{errorMsg}</p>
              )}
            </div>
          </div>

          <div>
            <div style={{ marginBottom: 28 }}>
              <p className="form-label">Email</p>
              <a
                href="mailto:jaynasippy@gmail.com"
                data-cursor="grow"
                style={{
                  color: "var(--berry)",
                  fontFamily: "var(--font-display), serif",
                  fontSize: "1.4rem",
                }}
              >
                jaynasippy@gmail.com
              </a>
            </div>
            <div style={{ marginBottom: 28 }}>
              <p className="form-label">Instagram</p>
              <a
                href="https://www.instagram.com/jaynasippy/"
                target="_blank"
                rel="noopener"
                data-cursor="grow"
                style={{
                  color: "var(--berry)",
                  fontFamily: "var(--font-display), serif",
                  fontSize: "1.4rem",
                }}
              >
                @jaynasippy
              </a>
            </div>
            <div>
              <p className="form-label">My agency</p>
              <a
                href="https://www.instagram.com/drive_me_social/"
                target="_blank"
                rel="noopener"
                data-cursor="grow"
                style={{
                  color: "var(--berry)",
                  fontFamily: "var(--font-display), serif",
                  fontSize: "1.4rem",
                }}
              >
                @drive_me_social
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
