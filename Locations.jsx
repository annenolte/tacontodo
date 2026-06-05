/* global React, Icon, Button, TilePattern, useIsMobile */
// Ta'con Todo — Locations page

const LOCATIONS = [
  { city: "Albuquerque", area: "Nob Hill", addr: "3420 Central Ave SE", hours: "11am – 9pm", wait: "15 min", open: true, tile: "teal" },
  { city: "Santa Fe", area: "Railyard", addr: "500 Market St", hours: "11am – 9pm", wait: "20 min", open: true, tile: "red" },
  { city: "Las Cruces", area: "Mesilla", addr: "2290 Calle de Parian", hours: "Opens 11am", wait: "Closed", open: false, tile: "orange" },
];

function Locations() {
  const isMobile = useIsMobile(760);
  return (
    <div style={{ background: "var(--paper)" }}>
      <div style={{ background: "var(--sand-50)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "32px 20px" : "44px 24px" }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 8 }}>Three spots across New Mexico</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: isMobile ? 32 : 46, letterSpacing: "-.02em", color: "var(--ink)", margin: 0 }}>Find a spot</h1>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "28px 20px 64px" : "36px 24px 80px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 22 }}>
        {LOCATIONS.map((l) => (
          <div key={l.city} style={{ background: "#fff", borderRadius: 18, overflow: "hidden", boxShadow: "var(--shadow-md)", display: "flex", flexDirection: "column" }}>
            <TilePattern palette={l.tile} height={150} />
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
