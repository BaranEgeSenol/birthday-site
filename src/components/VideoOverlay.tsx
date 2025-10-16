// Built by Baran Ege Şenol — Fullscreen video overlay for the birthday flow
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;   // acil kapatma (ESC/çarpı)
  onEnded: () => void;   // video bitince
  src: string;           // /video/birthday.mp4
  poster?: string;       // /video/poster.jpg
  autoplay?: boolean;    // varsayılan: true
};

export default function VideoOverlay({
  open,
  onClose,
  onEnded,
  src,
  poster,
  autoplay = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Body scroll lock + ESC
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open && autoplay && videoRef.current) {
      // Kullanıcı jestinden sonra açıldığı için sesli oynar
      const v = videoRef.current;
      v.currentTime = 0;
      v.play().catch(() => {
        // Oynatamazsa (tarayıcı politikası), sessize alıp tekrar dene
        v.muted = true;
        v.play().catch(() => {});
      });
    }
  }, [open, autoplay]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.85)",
            zIndex: 70,
            display: "grid",
            placeItems: "center",
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.2 }}
            style={{
              width: "min(96vw, 980px)",
              aspectRatio: "16 / 9",
              background: "#000",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 40px 120px rgba(0,0,0,.5)",
              position: "relative",
            }}
          >
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              controls
              playsInline
              style={{ width: "100%", height: "100%", display: "block" }}
              onEnded={onEnded}
            />
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                padding: "6px 10px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,.25)",
                background: "rgba(0,0,0,.6)",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 700,
              }}
              title="Kapat (Esc)"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
