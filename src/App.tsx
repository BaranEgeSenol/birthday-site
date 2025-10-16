// Built by Baran Ege Şenol — Envelope→Letter + audio fade-out + confetti + gallery (responsive-ready)
import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import LetterModal from "./components/LetterModal";
import Gallery from "./components/Gallery";
import "./styles/responsive.css";

export default function App() {
  const [open, setOpen] = useState(false);
  const forceLetter = false; // önce zarf, kalbe tıklayınca mektup
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // C → konfeti
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

  // Sesi yumuşak kapat
  const stopAudioSoft = () => {
    const a = audioRef.current;
    if (!a) return;
    const step = 0.08;
    const fade = setInterval(() => {
      if (a.volume - step <= 0) {
        a.pause();
        a.currentTime = 0;
        a.volume = 0.85;
        clearInterval(fade);
      } else {
        a.volume = +(a.volume - step).toFixed(3);
      }
    }, 60);
  };

  // “Mektubu Aç”
  const onOpenLetter = () => {
    setOpen(true);
    const a = audioRef.current;
    if (a) {
      a.volume = 0.85;
      a.currentTime = 0;
      a.play().catch(() => {});
    }
  };

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
      <main
        style={{
          flex: 1,
          display: "grid",
          placeItems: "center",
          textAlign: "center",
        }}
      >
        <div>
          <h1 className="hero-title" style={{ fontSize: 48, margin: 0 }}>
            🎂 Happy Birthday! 🎉
          </h1>
          <p className="hero-sub" style={{ opacity: 0.8, marginTop: 8 }}>
            Made with ❤️ by <b>Baran Ege Şenol</b>
          </p>

          <div
            style={{
              marginTop: 18,
              display: "flex",
              gap: 10,
              justifyContent: "center",
            }}
          >
            <button
              className="btn"
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
              aria-label="Celebrate"
            >
              Celebrate 🎊
            </button>

            <button
              className="btn"
              onClick={onOpenLetter}
              style={{
                padding: "12px 20px",
                borderRadius: 14,
                border: "1px solid #3b2a1a",
                background: "#3b2a1a",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
              }}
              aria-label="Mektubu Aç"
            >
              ✉️ Mektubu Aç
            </button>
          </div>
        </div>
      </main>

      {/* Foto galeri */}
      <Gallery />

      {/* Ses (varsa /audio/greeting.mp3) */}
      <audio ref={audioRef} src="/audio/greeting.mp3" preload="auto" />

      {/* Mektup Modal — A4 */}
      <LetterModal
        open={open}
        onClose={() => {
          setOpen(false);
          stopAudioSoft();
        }}
        forceLetter={forceLetter}
        // onEnvelopeOpen={() => audioRef.current?.play().catch(() => {})} // istersen kalpte başlat
      >
        {/* ———— MEKTUP ———— */}
        <p>Merhaba Ahsencim,</p>{" "}
        <p>
          {" "}
          Cümleme öncelikle içten bir <strong>teşekkür</strong> ederek başlamak
          istiyorum. Hayatımda ilk defa domainli bir site yaptım ve bu anı daha
          özel kılmak istedim. Çünkü sen bana tam 00.00’da doğum günümü kutlayacak 
          kadar beni mutlu ettin. Hayatımda bugüne kadar kimse bana bu kadar içten bir
          şekilde doğum günü kutlamamıştı. Bu yüzden, senin bana verdiğin
          değerin karşılığını en az senin kadar özel bir şey yaparak vermek
          istedim.{" "}
        </p>{" "}
        <p>
          {" "}
          İnan o kadar mutluyum ki bunu yaptığım için… Çünkü sana değer
          verdiğimi anlatmanın en güzel yollarından biri buydu. Sitede tam
          senlik bir dil kullanmaya çalıştım. TypeScript ağırlıklı yaptım ama
          sırf sen PHP seviyorsun diye tek bir tane bile kodunu eklemedim
          ahahahah — tam senlik oldu bence!{" "}
        </p>{" "}
        <p>
          {" "}
          Bugün senin günün… İyi ki hayatıma girdin ve bu kadar özel anılar
          biriktirdik. Zaman nasıl geçti anlamadan, birlikte geçirdiğimiz her an
          hafızamda çok kıymetli bir yer edindi. Kahkahalarımız, paylaştığımız o
          küçük ama anlamlı anlar ve birbirimizi gerçekten anladığımız zamanlar
          benim için unutulmaz.{" "}
        </p>{" "}
        <p>
          {" "}
          Birlikte Kajun yapmayı, kahve kaçamaklarımızı ve o Cool Lime
          jestlerini hatırladıkça yüzümde istemsiz bir tebessüm beliriyor. Çünkü
          bu anlar, seninle kurduğumuz dostluğun ne kadar içten ve gerçek
          olduğunun birer kanıtı gibi.{" "}
        </p>{" "}
        <p>
          {" "}
          Her buluştuğumuzda zamanın nasıl geçtiğini anlamadan dakikaları
          saatlere çevirdiğimiz o uzun, derin sohbetleri çok seviyorum. Yeri
          geliyor moralimiz bozuluyor ama bir şekilde birbirimize iyi gelmeyi
          başarıyoruz. Bu da bizim dostluğumuzun ne kadar güçlü ve özel
          olduğunun göstergesi.{" "}
        </p>{" "}
        <p>
          {" "}
          Yeni yaşın sana sağlık, huzur, bol kahkaha ve içten gülümsemeler
          getirsin. Dilerim bu yıl, hayat sana daima senin başkalarına verdiğin
          kadar güzellik sunsun. Çünkü sen gerçekten çok değerli, içten ve özel
          bir insansın. İyi ki varsın, iyi ki doğdun… Ve iyi ki yollarımız
          kesişmiş. Seni Seviyorum ☘️{" "}
        </p>
        <p style={{ textAlign: "right", marginTop: 30 }}>
          Site Admini ve Kurucusu — Baran Ege Şenol 💌
        </p>
      </LetterModal>
    </div>
  );
}
