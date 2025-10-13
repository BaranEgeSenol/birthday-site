// Built by Baran Ege Şenol — White envelope with heart seal → quick flap open → letter reveal + confetti burst
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode; // letter content
};

export default function LetterModal({ open, onClose, children }: Props) {
  const [opened, setOpened] = useState(false); // flap opened?

  // 🔹 Konfeti: zarf açıldığında otomatik patla
  useEffect(() => {
    if (!opened) return;

    const burst = (opts = {}) =>
      confetti({
        particleCount: 140,
        spread: 70,
        origin: { y: 0.6 },
        ticks: 180,
        ...opts,
      });

    burst();
    setTimeout(() => burst({ angle: 60, spread: 55, origin: { x: 0 } }), 120);
    setTimeout(() => burst({ angle: 120, spread: 55, origin: { x: 1 } }), 200);
  }, [opened]);

  const resetAndClose = () => {
    setOpened(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "grid",
            placeItems: "center",
            zIndex: 50,
            padding: 16,
          }}
        >
          <motion.div
            key="envelopeWrap"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", width: 360, height: 260 }}
          >
            {/* ENVELOPE */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                filter: "drop-shadow(0 18px 50px rgba(0,0,0,.35))",
              }}
            >
              {/* Base (body) */}
              <div
                style={{
                  position: "absolute",
                  inset: "40px 0 0 0",
                  background:
                    "linear-gradient(180deg, #fff, #f6f7f9 40%, #eef0f4 100%)",
                  border: "1px solid #e2e6ee",
                  borderRadius: 12,
                }}
              />

              {/* Bottom triangle (envelope fold) */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 160,
                  clipPath: "polygon(0% 0%, 50% 100%, 100% 0%)",
                  background:
                    "linear-gradient(180deg, #fff, #f2f4f8 70%, #e9edf5 100%)",
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                  borderLeft: "1px solid #e2e6ee",
                  borderRight: "1px solid #e2e6ee",
                  borderBottom: "1px solid #d8deea",
                }}
              />

              {/* FLAP (top triangle) — click to open */}
              <motion.div
                onClick={() => setOpened(true)}
                initial={false}
                animate={{ rotateX: opened ? -178 : 0 }}
                transition={{ type: "tween", duration: 0.28 }} // hızlı açılış
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  height: 160,
                  transformOrigin: "top",
                  clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
                  background:
                    "linear-gradient(180deg, #ffffff, #f3f5f9 70%, #e9edf5 100%)",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  border: "1px solid #e2e6ee",
                  cursor: opened ? "default" : "pointer",
                  display: "grid",
                  placeItems: "center",
                }}
                title={opened ? "" : "Açmak için tıkla"}
              >
                {/* HEART SEAL */}
                {!opened && (
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "999px",
                      background:
                        "radial-gradient(circle at 30% 30%, #ff8da1, #ff2d55)",
                      boxShadow:
                        "0 4px 10px rgba(255,45,85,.35), inset 0 2px 6px rgba(255,255,255,.6)",
                      display: "grid",
                      placeItems: "center",
                      border: "1px solid rgba(0,0,0,.06)",
                    }}
                  >
                    <span style={{ fontSize: 22, lineHeight: 1 }}>❤️</span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* LETTER (paper) — slides up after flap opens */}
            <motion.div
              initial={false}
              animate={{
                y: opened ? -80 : 80, // yukarı çıkar
                opacity: opened ? 1 : 0,
              }}
              transition={{ duration: 0.45, delay: opened ? 0.05 : 0 }}
              style={{
                position: "absolute",
                left: 18,
                right: 18,
                top: 70,
                height: 0,
                pointerEvents: opened ? "auto" : "none",
              }}
            >
              <div
                style={{
                  maxWidth: 740,
                  width: "calc(100% - 0px)",
                  margin: "0 auto",
                  background:
                    "linear-gradient(0deg, rgba(255,255,255,0.98), rgba(248,250,253,0.98))",
                  border: "1px solid #e5e9f2",
                  borderRadius: 10,
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,.25), inset 0 0 0 1px rgba(255,255,255,.6)",
                  color: "#1c2330",
                  lineHeight: 1.7,
                  fontSize: 16,
                  padding: "20px 18px",
                }}
              >
                <div
                  style={{ textAlign: "center", marginBottom: 8, fontWeight: 700 }}
                >
                  ✉️ Mektup
                </div>
                <div style={{ fontSize: 16 }}>{children}</div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={resetAndClose}
                    style={{
                      marginTop: 14,
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1px solid #d0d6e3",
                      background: "#0f172a",
                      color: "#fff",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
