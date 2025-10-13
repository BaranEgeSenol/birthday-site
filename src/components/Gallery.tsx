// Built by Baran Ege Şenol — Simple responsive gallery
import React from "react";

const photos = [
  { src: "/photos/1.jpg", alt: "Memory 1", caption: "İlk anımız ✨" },
  { src: "/photos/2.jpg", alt: "Memory 2", caption: "Gülüşler 🌞" },
  // public/photos/ içine ekledikçe buraya ekle
];

export default function Gallery() {
  return (
    <section style={{ padding: "24px 12px", maxWidth: 960, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 12, textAlign: "center" }}>Anılar</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 10,
        }}
      >
        {photos.map((p) => (
          <figure
            key={p.src}
            style={{
              overflow: "hidden",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.06)",
              background: "#fff",
            }}
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              style={{ width: "100%", height: 180, objectFit: "cover" }}
            />
            {p.caption && (
              <figcaption
                style={{ padding: "6px 10px", fontSize: 13, opacity: 0.8 }}
              >
                {p.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
