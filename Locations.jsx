/* global React, Icon, Button, FoodImage */
// Ta'con Todo — Locations page

const LOCATIONS = [
  { city: "Albuquerque", area: "Nob Hill", addr: "3420 Central Ave SE", hours: "11am – 9pm", wait: "15 min", open: true, img: "../../assets/food/carne-asada.jpeg" },
  { city: "Santa Fe", area: "Railyard", addr: "500 Market St", hours: "11am – 9pm", wait: "20 min", open: true, img: "../../assets/food/enchiladas-rojas.jpeg" },
  { city: "Las Cruces", area: "Mesilla", addr: "2290 Calle de Parian", hours: "Opens 11am", wait: "Closed", open: false, img: "../../assets/food/pollo-asado.jpeg" },
];

function Locations() {
  return (
    <div style={{ background: "var(--paper)" }}>
      <div style={{ position: "relative" }}>
        <FoodImage src="../../assets/food/burrito-mojado.jpeg" label="" height={220} radius={0} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(36,28,22,.1), rgba(36,28,22,.62))", display: "flex", alignItems: "flex-end" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 28px", width: "100%" }}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--marigold-400)", marginBottom: 8 }}>Three spots across New Mexico</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 46, letterSpacing: "-.02em", color: "#FFFCF6", margin: 0 }}>Find a spot</h1>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 24px 80px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
        {LOCATIONS.map((l) => (
          <div key={l.city} style={{ background: "#fff", borderRadius: 18, overflow: "hidden", boxShadow: "var(--shadow-md)", display: "flex", flexDirection: "column" }}>
            <FoodImage src={l.img} label={l.city} height={150} />
            <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--ink)", margin: 0 }}>{l.city}</h3>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 999, background: l.open ? "var(--turquoise-100)" : "var(--sand-100)", color: l.open ? "var(--turquoise-700)" : "var(--ink-500)" }}>{l.open ? "Open now" : "Closed"}</span>
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-500)", marginTop: 2 }}>{l.area}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "16px 0 18px" }}>
                <InfoRow icon="map-pin" text={l.addr} />
                <InfoRow icon="clock" text={l.hours} />
                <InfoRow icon="timer" text={l.open ? `~${l.wait} pickup wait` : "Reopens at 11am"} />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
                <Button size="sm" disabled={!l.open} style={{ flex: 1 }}>Order pickup</Button>
                <Button size="sm" variant="secondary" icon="navigation">Directions</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function InfoRow({ icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Icon name={icon} size={17} color="var(--primary)" />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 13.5, color: "var(--ink-700)" }}>{text}</span>
    </div>
  );
}

Object.assign(window, { Locations });
