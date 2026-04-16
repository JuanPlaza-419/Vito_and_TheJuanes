import { useRef } from "react";


const fmt = (p) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(p);

const furnish = ["Sin amueblar", "Semi amueblado", "Amueblado"];

const furnishColor = [
  "#f3f4f6,#6b7280",
  "#fef3c7,#92400e",
  "#dcfce7,#166534",
];

let HOUSE_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600596542815-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80",

  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1499955085172-a104c9463ece?auto=format&fit=crop&w=800&q=80",
];

/* =========================
   IMAGE DECK (NO REPEATS)
========================= */

let imageDeck = [];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const getUniqueImage = () => {
  if (imageDeck.length === 0) {
    imageDeck = shuffle(HOUSE_IMAGES);
  }
  return imageDeck.pop();
};

/* =========================
   COMPONENT
========================= */

export default function HouseCard({ house, delay = 0 }) {
  const imageRef = useRef(getUniqueImage());

  const [bg, text] =
    (furnishColor[house.furnishingstatus] || furnishColor[0]).split(",");

  return (
    <div
      style={{ ...styles.card, animationDelay: `${delay}ms` }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.06)";
      }}
    >
      {/* IMAGE */}
      <div style={styles.img}>
        <img
          src={imageRef.current}
          alt="house"
          style={styles.image}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80";
          }}
        />

        <div style={styles.overlay} />

        <span style={styles.badge}>
          {house.area.toLocaleString("es-ES")} m²
        </span>
      </div>

      {/* BODY */}
      <div style={styles.body}>
        <div style={styles.price}>
          {fmt(house.price)}{" "}
          <span style={styles.priceSub}>
            ·{" "}
            {Math.round(house.price / house.area).toLocaleString("es-ES")} €/m²
          </span>
        </div>

        <p style={styles.desc}>
          {house.description || "Vivienda disponible en excelente estado."}
        </p>

        <div style={styles.specs}>
          {[
            ["🛏", `${house.bedrooms} hab.`],
            ["🚿", `${house.bathrooms} baños`],
            ["📐", `${house.stories} plantas`],
            ["🚗", `${house.parking} plaza${house.parking !== 1 ? "s" : ""}`],
          ].map(([ic, lb]) => (
            <span key={lb} style={styles.chip}>
              {ic} {lb}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          <span
            style={{
              ...styles.fBadge,
              background: bg,
              color: text,
            }}
          >
            {furnish[house.furnishingstatus]}
          </span>

          {!!house.airconditioning && <span style={styles.tagOn}>❄️ A/A</span>}
          {!!house.basement && <span style={styles.tagOn}>⬇️ Sótano</span>}
          {!!house.guestroom && <span style={styles.tagOn}>🛋️ Invitados</span>}
          {!!house.prefarea && <span style={styles.tagOn}>⭐ Zona pref.</span>}
        </div>
      </div>
    </div>
  );
}

/* =========================
   STYLES
========================= */

const styles = {
  card: {
    background: "#fff",
    border: "1px solid #f0f0f0",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,.06)",
    cursor: "pointer",
    transition: "box-shadow .25s, transform .25s",
  },

  img: {
    height: 180,
    position: "relative",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)",
  },

  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    background: "rgba(255,255,255,.92)",
    fontSize: 11,
    fontWeight: 700,
    color: "#FF6B35",
    padding: "4px 10px",
    borderRadius: 20,
  },

  body: {
    padding: "20px 22px",
  },

  price: {
    fontSize: 24,
    fontWeight: 800,
    color: "#FF6B35",
  },

  priceSub: {
    fontSize: 13,
    color: "#9ca3af",
  },

  desc: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 16,
  },

  specs: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },

  chip: {
    background: "#fafafa",
    border: "1px solid #f0f0f0",
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12,
  },

  fBadge: {
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 20,
  },

  tagOn: {
    fontSize: 11,
    color: "#FF6B35",
    background: "#fff2ec",
    padding: "3px 8px",
    borderRadius: 6,
  },
};