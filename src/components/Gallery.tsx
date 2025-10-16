// Built by Baran Ege Şenol — Responsive photo gallery + lightbox with captions & keyboard nav
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { photos } from "../lib/photos";

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openAt = (i: number) => setSelectedIndex(i);
  const close = () => setSelectedIndex(null);
  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((i) => (i === null ? null : (i + photos.length - 1) % photos.length));
  };
  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((i) => (i === null ? null : (i + 1) % photos.length));
  };

  // Klavye kısayolları: Esc, ←, →
  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex]);

  return (
    <section style={{ padding: "40px 20px 80px", textAlign: "center" }}>
      <h2 style={{ fontSize: 28, marginBottom: 24 }}>📸 Anılar</h2>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        {photos.map((p, i) => (
          <motion.div
            key={i}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 14,
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => openAt(i)}
          >
            <img
              src={p.src}
              alt={p.caption}
              style={{ width: "100%", height: 260, objectFit: "cover", verticalAlign: "middle" }}
            />
            {p.caption && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "10px 12px",
                  background: "linear-gradient(0deg,rgba(0,0,0,0.7),transparent)",
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "'Dancing Script', cursive",
                }}
              >
                {p.caption}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              display: "grid",
              placeItems: "center",
              zIndex: 100,
              padding: 16,
            }}
            onClick={close}
          >
            <div
              style={{
                maxWidth: "92vw",
                maxHeight: "88vh",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={photos[selectedIndex].src}
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].caption}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                style={{
                  maxWidth: "92vw",
                  maxHeight: "78vh",
                  borderRadius: 12,
                  boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
                  alignSelf: "center",
                }}
              />

              {/* Caption bar */}
              {photos[selectedIndex].caption && (
                <div
                  style={{
                    alignSelf: "center",
                    maxWidth: "92vw",
                    color: "#fff",
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: 20,
                    lineHeight: 1.4,
                    textAlign: "center",
                    padding: "8px 14px",
                    borderRadius: 10,
                    background: "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35))",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
                    backdropFilter: "blur(2px)",
                  }}
                >
                  {photos[selectedIndex].caption}
                </div>
              )}
            </div>

            {/* Controls */}
            <button
              onClick={(e) => prev(e)}
              title="Önceki (←)"
              style={navBtnStyle({ left: 18 })}
            >
              ‹
            </button>
            <button
              onClick={(e) => next(e)}
              title="Sonraki (→)"
              style={navBtnStyle({ right: 18 })}
            >
              ›
            </button>
            <button onClick={close} title="Kapat (Esc)" style={closeBtnStyle}>
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* — UI helpers — */
const navBtnStyle = (pos: { left?: number; right?: number }) => ({
  position: "fixed" as const,
  top: "50%",
  transform: "translateY(-50%)",
  ...pos,
  width: 42,
  height: 42,
  borderRadius: 10,
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.35)",
  color: "#fff",
  fontSize: 22,
  cursor: "pointer",
});

const closeBtnStyle: React.CSSProperties = {
  position: "fixed",
  top: 20,
  right: 20,
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.35)",
  borderRadius: 10,
  color: "#fff",
  fontSize: 18,
  padding: "6px 10px",
  cursor: "pointer",
};
