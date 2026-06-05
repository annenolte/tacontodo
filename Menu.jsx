/* global React, Icon, Button, Tag, FoodImage, MENU, CATS, useIsMobile */
// Ta'con Todo — Menu page + MenuCard

function MenuCard({ item, onAdd, onOpen, compact }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(item)}
      style={{
        background: "#fff", borderRadius: 18, overflow: "hidden", cursor: "pointer",
        boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-md)",
        transform: hover ? "translateY(-4px)" : "none",
        transition: "all var(--dur-mid) var(--ease-out)", display: "flex", flexDirection: "column",
      }}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ transform: hover ? "scale(1.04)" : "none", transition: "transform var(--dur-slow) var(--ease-out)" }}>
          <FoodImage src={item.img} label={item.name} height={compact ? 130 : 150} />
        </div>
        <div style={{ position: "absolute", top: 12, right: 12, background: "#fff", color: "var(--ink)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 14, padding: "5px 11px", borderRadius: 999, boxShadow: "var(--shadow-sm)" }}>${fmt(item.price)}</div>
      </div>
      <div style={{ padding: compact ? "14px 16px" : "16px 18px", display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: compact ? 18 : 21, color: "var(--ink)", margin: "0 0 4px" }}>{item.name}</h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.45, color: "var(--ink-500)", margin: "0 0 12px", flex: 1 }}>{item.desc}</p>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {item.tags[0] && <Tag tone={item.tags[0][0]}>{item.tags[0][1]}</Tag>}
          <button onClick={(e) => { e.stopPropagation(); onAdd(item); }} style={{
            marginLeft: "auto", background: "var(--primary)", color: "var(--on-primary)", border: "none",
            borderRadius: 10, fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13, padding: "8px 14px",
            cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
          }}><Icon name="plus" size={15} color="#fff" />Add</button>
        </div>
      </div>
    </div>
  );
}
function fmt(n) { return Number.isInteger(n) ? n : n.toFixed(2); }

function MenuPage({ onAdd, onOpen }) {
  const [active, setActive] = React.useState("All");
  const isMobile = useIsMobile(760);
  const tabs = ["All", ...CATS];
  const shown = active === "All" ? MENU : MENU.filter((m) => m.cat === active);
  const grid = { display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: isMobile ? 14 : 20 };
  return (
    <div style={{ background: "var(--paper)" }}>
      <div style={{ background: "var(--sand-50)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "32px 20px 0" : "44px 24px 0" }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 8 }}>¡Provecho!</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: isMobile ? 32 : 46, letterSpacing: "-.02em", color: "var(--ink)", margin: "0 0 6px" }}>The menu</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--ink-500)", maxWidth: 520, margin: "0 0 22px" }}>Build your plate. Every taco comes con todo unless you tell us otherwise.</p>
          <div style={{ display: "flex", gap: 6, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            {tabs.map((t) => (
              <button key={t} onClick={() => setActive(t)} style={{
                fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
                padding: "11px 18px", border: "none", background: "transparent",
                color: active === t ? "var(--primary)" : "var(--ink-500)",
                borderBottom: `3px solid ${active === t ? "var(--primary)" : "transparent"}`,
                marginBottom: -1,
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "24px 20px 64px" : "32px 24px 80px" }}>
        {active === "All" ? CATS.map((c) => (
          <div key={c} style={{ marginBottom: 44 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: isMobile ? 23 : 28, color: "var(--ink)", margin: "0 0 18px", display: "flex", alignItems: "center", gap: 12 }}>
              {c}<span style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </h2>
            <div style={grid}>
              {MENU.filter((m) => m.cat === c).map((m) => <MenuCard key={m.id} item={m} onAdd={onAdd} onOpen={onOpen} />)}
            </div>
          </div>
        )) : (
          <div style={grid}>
            {shown.map((m) => <MenuCard key={m.id} item={m} onAdd={onAdd} onOpen={onOpen} />)}
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { MenuCard, MenuPage, fmtPrice: fmt });
