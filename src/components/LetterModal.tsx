// Built by Baran Ege Şenol — Envelope → centered A4-like letter + confetti + body scroll lock
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onEnvelopeOpen?: () => void; // kalbe tıklanınca (ses vb.)
  forceLetter?: boolean;       // true ise direkt mektup görünür
};

export default function LetterModal({
  open,
  onClose,
  children,
  onEnvelopeOpen,
  forceLetter = false,
}: Props) {
  const [opened, setOpened] = useState<boolean>(forceLetter);
  const [paperW, setPaperW] = useState(900);
  const [paperH, setPaperH] = useState(1273);

  // forceLetter değişirse eşitle
  useEffect(() => {
    setOpened(forceLetter);
  }, [forceLetter]);

  // Viewport’a göre A4 benzeri boyut
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = Math.min(Math.max(420, Math.floor(vw * 0.95)), 1000);
      const a4h = Math.floor(w * 1.414);
      const h = Math.min(Math.floor(vh * 0.92), a4h);
      setPaperW(w);
      setPaperH(h);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Modal açıkken body scroll kilidi + ESC
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", esc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Mektup açılınca konfeti
  useEffect(() => {
    if (!opened) return;
    const burst = (opts = {}) =>
      confetti({ particleCount: 160, spread: 70, origin: { y: 0.6 }, ticks: 180, ...opts });
    burst();
    setTimeout(() => burst({ angle: 60, spread: 55, origin: { x: 0 } }), 120);
    setTimeout(() => burst({ angle: 120, spread: 55, origin: { x: 1 } }), 200);
  }, [opened]);

  const handleClose = () => {
    setOpened(false);
    onClose();
  };

  // 🔧 FIX: Kalbe tıklayınca hem callback (ses) çağrılsın hem mektup AÇILSIN
  const handleEnvelopeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEnvelopeOpen?.();
    setOpened(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            background:
              "radial-gradient(1200px 800px at 50% 40%, rgba(0,0,0,.68), rgba(0,0,0,.58))",
            backdropFilter: "blur(2px)",
            display: "grid",
            placeItems: "center",
            zIndex: 50,
            padding: 16,
          }}
        >
          {/* Zarf sahnesi — forceLetter=false ve opened=false iken */}
          <AnimatePresence>
            {!opened && !forceLetter && (
              <motion.div
                key="envelope"
                initial={{ scale: 0.88, opacity: 0, y: 8 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
                onClick={handleEnvelopeClick}
                title="Açmak için tıkla"
                style={{ position: "relative", width: 440, height: 300, cursor: "pointer" }}
              >
                <div style={{ position: "absolute", inset: 0, filter: "drop-shadow(0 20px 55px rgba(0,0,0,.38))" }}>
                  {/* gövde */}
                  <div
                    style={{
                      position: "absolute",
                      inset: "48px 0 0 0",
                      background: "linear-gradient(180deg,#fff,#f4f6fa 50%,#e9edf5 100%)",
                      border: "1px solid #e0e6ef",
                      borderRadius: 14,
                    }}
                  />
                  {/* alt üçgen */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: 200,
                      clipPath: "polygon(0% 0%, 50% 100%, 100% 0%)",
                      background: "linear-gradient(180deg,#fff,#f2f4f8 70%,#e9edf5 100%)",
                      borderBottomLeftRadius: 14,
                      borderBottomRightRadius: 14,
                      borderLeft: "1px solid #e0e6ef",
                      borderRight: "1px solid #e0e6ef",
                      borderBottom: "1px solid #d7deea",
                    }}
                  />
                  {/* üst kapak + kalp */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: 0,
                      height: 190,
                      clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
                      background: "linear-gradient(180deg,#ffffff,#f3f5f9 70%,#e9edf5 100%)",
                      borderTopLeftRadius: 14,
                      borderTopRightRadius: 14,
                      border: "1px solid #e0e6ef",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 999,
                        background: "radial-gradient(circle at 30% 30%,#ff8da1,#ff2d55)",
                        boxShadow: "0 6px 14px rgba(255,45,85,.35), inset 0 2px 6px rgba(255,255,255,.6)",
                        display: "grid",
                        placeItems: "center",
                        border: "1px solid rgba(0,0,0,.06)",
                      }}
                    >
                      <span style={{ fontSize: 24, lineHeight: 1 }}>❤️</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* A4 mektup */}
          <AnimatePresence>
            {(opened || forceLetter) && (
              <motion.div
                key="paper"
                initial={{ scale: 0.96, opacity: 0, y: 6 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", duration: 0.55, bounce: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: paperW,
                  height: paperH,
                  background: "linear-gradient(0deg,rgba(255,255,255,.98),rgba(248,250,253,.98))",
                  border: "1px solid #dfe6f1",
                  borderRadius: 14,
                  boxShadow: "0 42px 120px rgba(0,0,0,.4), inset 0 0 0 1px rgba(255,255,255,.7)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Sticky başlık */}
                <div
                  className="letter-header"
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    padding: "16px 20px",
                    background: "linear-gradient(180deg,#ffffff,#f7f9fc)",
                    borderBottom: "1px solid rgba(0,0,0,.06)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ opacity: 0.85 }}>✉️</span>
                  <strong style={{ fontSize: 20, opacity: 0.92 }}>Dünyanın En Harika Diyetisyenine</strong>
                  <div style={{ marginLeft: "auto" }}>
                    <button
                      onClick={handleClose}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 10,
                        border: "1px solid #cfd6e3",
                        background: "#0f172a",
                        color: "#fff",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Kapat (Esc)
                    </button>
                  </div>
                </div>

                {/* İçerik */}
                <div
                  className="letter-content"
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "26px 30px 34px",
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: 22,
                    lineHeight: 2.0,
                    color: "#131a29",
                    scrollBehavior: "smooth",
                  }}
                >
                  {children}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
