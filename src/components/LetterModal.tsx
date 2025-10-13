// Built by Baran Ege Şenol — Parchment Letter Modal
import React from "react";

type Props = { open: boolean; onClose: () => void; children: React.ReactNode };

export default function LetterModal({ open, onClose, children }: Props) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
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
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 720,
          width: "100%",
          padding: "28px 24px",
          // Parchment / ferman kağıdı efekti (pure CSS)
          background:
            "linear-gradient(0deg, rgba(255,248,220,0.95), rgba(250,240,200,0.95))",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.35), inset 0 0 40px rgba(139, 69, 19, 0.15)",
          borderRadius: 8,
          border: "1px solid rgba(139,69,19,0.25)",
          color: "#2b2113",
          lineHeight: 1.7,
          fontSize: 18,
          position: "relative",
        }}
      >
        {/* yıpranmış kenar efekti */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(120px 80px at 0 0, rgba(0,0,0,0.12), transparent 60%), radial-gradient(120px 80px at 100% 0, rgba(0,0,0,0.12), transparent 60%), radial-gradient(120px 80px at 0 100%, rgba(0,0,0,0.12), transparent 60%), radial-gradient(120px 80px at 100% 100%, rgba(0,0,0,0.12), transparent 60%)",
            borderRadius: 8,
          }}
        />
        <div style={{ textAlign: "center", marginBottom: 12, fontSize: 22 }}>
          ✉️ <b>Mektup</b>
        </div>
        <div>{children}</div>
        <button
          onClick={onClose}
          style={{
            marginTop: 18,
            display: "block",
            marginLeft: "auto",
            padding: "10px 16px",
            borderRadius: 10,
            border: "1px solid #3b2a1a",
            background: "#3b2a1a",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Kapat
        </button>
      </div>
    </div>
  );
}
