// Built by Baran Ege Şenol — Minimal birthday app
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function App() {
  const fire = () =>
    confetti({
      particleCount: 160,
      spread: 70,
      origin: { y: 0.6 },
      ticks: 180,
    });

  // Klavyeden "C" basınca konfeti
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c") fire();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        background:
          "radial-gradient(1200px 600px at 50% -10%, rgba(255,182,193,0.35), transparent), radial-gradient(1200px 600px at 50% 110%, rgba(186,85,211,0.35), transparent)",
      }}
    >
      <main>
        <h1 style={{ fontSize: "48px", margin: 0 }}>🎂 Happy Birthday! 🎉</h1>
        <p style={{ opacity: 0.8, marginTop: 8 }}>
          Made with ❤️ by <strong>Baran Ege Şenol</strong>
        </p>
        <button
          onClick={fire}
          style={{
            marginTop: 20,
            padding: "12px 20px",
            borderRadius: 14,
            border: "1px solid #000",
            background: "#000",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Celebrate 🎊 (press C)
        </button>
      </main>
    </div>
  );
}
