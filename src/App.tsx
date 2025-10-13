// Built by Baran Ege Şenol — Always-open letter version
import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import LetterModal from "./components/LetterModal";
import Gallery from "./components/Gallery";

export default function App() {
  const [open, setOpen] = useState(false);

  // klavyeden C → konfeti
  useEffect(() => {
    const fireKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c") fire();
    };
    window.addEventListener("keydown", fireKey);
    return () => window.removeEventListener("keydown", fireKey);
  }, []);

  const fire = () =>
    confetti({
      particleCount: 160,
      spread: 70,
      origin: { y: 0.6 },
      ticks: 180,
    });

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 600px at 50% -10%, rgba(255,182,193,0.35), transparent), radial-gradient(1200px 600px at 50% 110%, rgba(186,85,211,0.35), transparent)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <main style={{ flex: 1, display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <h1 style={{ fontSize: 48, margin: 0 }}>🎂 Happy Birthday! 🎉</h1>
          <p style={{ opacity: 0.8, marginTop: 8 }}>
            Made with ❤️ by <b>Baran Ege Şenol</b>
          </p>

          <div style={{ marginTop: 18, display: "flex", gap: 10, justifyContent: "center" }}>
            <button
              onClick={fire}
              style={{
                padding: "12px 20px",
                borderRadius: 14,
                border: "1px solid #000",
                background: "#000",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Celebrate 🎊
            </button>

            <button
              onClick={() => setOpen(true)}
              style={{
                padding: "12px 20px",
                borderRadius: 14,
                border: "1px solid #3b2a1a",
                background: "#3b2a1a",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              ✉️ Mektubu Aç
            </button>
          </div>
        </div>
      </main>

      {/* Foto galeri */}
      <Gallery />

      {/* Mektup */}
      <LetterModal open={open} onClose={() => setOpen(false)}>
        <p>Merhaba Ahsencim,</p>

            <p>
                Bugün senin günün… Ama sadece bir doğum günü değil bu.  
                Bence senin varlığının dünyaya kattığı en güzel anlardan biri.  
                Seni tanıdığım günden beri, enerjinle, gülüşünle, düşüncelerinle hep
                farklı bir iz bıraktın bende. Ne zaman moralim bozulsa aklıma gelen
                o küçük anlar bile yüzüme kocaman bir gülümseme konduruyor.
            </p>

            <p>
                Bazen bir mesajınla, bazen sadece bir bakışınla, anlatamadığın
                binlerce şeyi anlatabiliyorsun.  
                Bu kadar doğal, bu kadar içten bir insan tanımak benim için
                gerçekten büyük bir şans.
            </p>

            <p>
                Bu siteyi yaparken düşündüğüm tek şey, senin o anda
                gülümsemeni görmekti.  
                Çünkü her şeyin ötesinde — bu satırların da, bu kodların da ötesinde —
                ben senin yüzünde bir tebessüm görmek istedim sadece.
            </p>

            <p>
                Belki bu sayfa kapanacak, belki zamanı geçecek ama
                burada yazan duygular hep aynı kalacak:  
                “İyi ki doğdun, iyi ki varsın, iyi ki hayatımdasın.”
            </p>

            <p>
                Nice sağlıklı, mutlu, kahkahalarla dolu yılların olsun.
                Dilerim bu yıl senin için yepyeni güzelliklerle dolu olur.
            </p>

            <p style={{ textAlign: "right", marginTop: 30 }}>
                — Baran Ege Şenol 💌
            </p>
                </LetterModal>
    </div>
  );
}
