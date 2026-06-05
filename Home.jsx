/* global React, Icon, Button, Tag, FoodImage, MENU, MenuCard, TalaveraBand, useIsMobile */
// Ta'con Todo — Home page

// Hero photo carousel — cross-fades through every menu dish (~10s each) with a captioned name.
function HeroCarousel({ height = 420, interval = 10000 }) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % MENU.length), interval);
    return () => clearInterval(t);
  }, [interval]);
  return (
    <div style={{ position: "relative", height, background: "var(--sand-100)" }}>
      {MENU.map((m, i) => (
        <img key={m.id} src={m.img} alt={m.name} loading={i === 0 ? "eager" : "lazy"}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", display: "block",
            opacity: i === idx ? 1 : 0, transition: "opacity 900ms var(--ease-out)",
          }} />
      ))}
      <div key={idx} style={{
        position: "absolute", left: 16, top: 16, zIndex: 2, maxWidth: "calc(100% - 32px)",
        display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px",
        borderRadius: 999, background: "rgba(42,33,27,.72)", backdropFilter: "blur(6px)",
        boxShadow: "var(--shadow-md)", animation: "heroCaptionIn .7s var(--ease-out)",
      }}>
        <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--marigold-400)", flex: "none" }} />
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "#FFFCF6", letterSpacing: "-.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {MENU[idx].name}
        </span>
      </div>
    </div>
  );
}

// 18-pointed decorative star — slowly-rotating backdrop behind the hero photo.
function StarBurst({ size = 320, color = "#F8813B", points = 18, ratio = 0.74, style }) {
  const c = 100, outer = 98, inner = outer * ratio;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / points) * i - Math.PI / 2;
    d += (i === 0 ? "M" : "L") + (c + r * Math.cos(a)).toFixed(2) + " " + (c + r * Math.sin(a)).toFixed(2);
  }
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} aria-hidden="true" style={{ display: "block", ...style }}>
      <path d={d + "Z"} fill={color} />
    </svg>
  );
}

function Hero({ onNav }) {
  const isMobile = useIsMobile(760);
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--paper)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "36px 20px 44px" : "64px 24px 72px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 36 : 48, alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 14 }}>Albuquerque · Santa Fe · Las Cruces</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: isMobile ? 38 : 64, lineHeight: 1.04, letterSpacing: "-.02em", color: "var(--ink)", margin: 0 }}>
            Tacos <span style={{ color: "var(--primary)" }}>con todo.</span><br />New Mexico on a plate.
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: isMobile ? 16 : 19, lineHeight: 1.55, color: "var(--ink-500)", maxWidth: 440, marginTop: 18 }}>
            Hatch green chile, blue-corn tortillas, salsa roasted in-house. Pick it up, or we'll bring it.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
            <Button size="lg" icon="utensils" onClick={() => onNav("menu")}>See the menu</Button>
            <Button size="lg" variant="secondary" icon="map-pin" onClick={() => onNav("locations")}>Find a spot</Button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 16 : 22, marginTop: 30, alignItems: "center" }}>
            <Stat n="4.9" l="2,100+ reviews" />
            <div style={{ width: 1, height: 34, background: "var(--border)" }} />
            <Stat n="3" l="NM locations" />
            <div style={{ width: 1, height: 34, background: "var(--border)" }} />
            <Stat n="15min" l="avg. pickup" />
          </div>
        </div>
        <div style={{ position: "relative" }}>
          {!isMobile && <StarBurst size={320} style={{ position: "absolute", top: -64, left: -30, zIndex: 0, animation: "heroSpin 55s linear infinite" }} />}
          {!isMobile && <StarBurst size={380} style={{ position: "absolute", bottom: -80, right: -54, zIndex: 0, animation: "heroSpin 75s linear infinite reverse" }} />}
          <div style={{ position: "relative", zIndex: 1, borderRadius: isMobile ? 20 : 28, overflow: "hidden", boxShadow: "var(--shadow-pop)" }}>
            <HeroCarousel height={isMobile ? 300 : 420} interval={6000} />
          </div>
          {!isMobile && (
            <div style={{ position: "absolute", left: -18, bottom: 28, zIndex: 2, background: "#fff", borderRadius: 16, boxShadow: "var(--shadow-lg)", padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--hatch-green-500)", display: "grid", placeItems: "center" }}><Icon name="flame" size={22} color="#fff" /></div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--ink)" }}>Roasted in-house</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-500)" }}>Hatch chile, every morning</div>
              </div>
            </div>
          )}
          <div style={{ position: "absolute", right: isMobile ? 10 : -10, top: isMobile ? 12 : 24, zIndex: 2, background: "var(--ink)", color: "#fff", borderRadius: 14, padding: "10px 16px", transform: "rotate(4deg)", boxShadow: "var(--shadow-md)" }}>
            <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: 24, color: "var(--marigold-400)" }}>¡con todo!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
function Stat({ n, l }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 25, color: "var(--ink)", lineHeight: 1 }}>{n}</div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--ink-500)", marginTop: 3 }}>{l}</div>
    </div>
  );
}

function ValueProps() {
  const isMobile = useIsMobile(760);
  const items = [
    ["leaf", "Roasted in-house", "Red & green chile, fire-roasted and peeled by hand every morning."],
    ["wheat", "Pressed daily", "Blue-corn and flour tortillas pressed fresh — never from a bag."],
    ["clock", "Ready in 15", "Order ahead online and skip the line. Most pickups in 15 minutes."],
  ];
  return (
    <section style={{ background: "var(--sand-50)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "32px 20px" : "44px 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? 22 : 28 }}>
        {items.map(([icon, h, p]) => (
          <div key={h} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--orange-100)", display: "grid", placeItems: "center", flex: "none" }}><Icon name={icon} size={24} color="var(--orange-600)" /></div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, color: "var(--ink)" }}>{h}</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.5, color: "var(--ink-500)", margin: "5px 0 0" }}>{p}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Featured({ onNav, onAdd, onOpen }) {
  const isMobile = useIsMobile(760);
  const picks = MENU.filter((m) => ["asada", "enchiladas", "pescado", "pozole"].includes(m.id));
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "44px 20px" : "72px 24px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: isMobile ? 22 : 28 }}>
        <div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 8 }}>The favorites</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: isMobile ? 28 : 39, letterSpacing: "-.02em", color: "var(--ink)", margin: 0 }}>Start with these</h2>
        </div>
        <Button variant="ghost" icon="arrow-right" onClick={() => onNav("menu")} style={{ flexDirection: "row-reverse" }}>Full menu</Button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? 14 : 20 }}>
        {picks.map((m) => <MenuCard key={m.id} item={m} onAdd={onAdd} onOpen={onOpen} compact />)}
      </div>
    </section>
  );
}

function SpecialsBand() {
  const isMobile = useIsMobile(760);
  return (
    <section style={{ background: "var(--ink)", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "40px 20px" : "56px 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 28 : 40, alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--marigold-400)", marginBottom: 10 }}>This week's specials</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: isMobile ? 28 : 38, lineHeight: 1.05, margin: "0 0 18px" }}>The chalkboard</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[["Pozole Sundays", "Red chile pozole, all day, ¡con todo!", "$9"], ["Green chile Friday", "Free Hatch upgrade on any plate.", "Free"], ["Churro happy hour", "3–5pm, every weekday.", "$3"]].map(([t, d, p]) => (
              <div key={t} style={{ display: "flex", alignItems: isMobile ? "baseline" : "center", flexWrap: isMobile ? "wrap" : "nowrap", gap: isMobile ? "2px 12px" : 16 }}>
                <div style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: 30, color: "var(--turquoise-300)", minWidth: isMobile ? 0 : 200 }}>{t}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "rgba(255,252,246,.78)", flex: 1, order: isMobile ? 3 : 0, flexBasis: isMobile ? "100%" : "auto" }}>{d}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 17, color: "var(--marigold-400)" }}>{p}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "var(--shadow-pop)" }}>
          <FoodImage src="assets/food/pozole.jpeg" label="Pozole rojo" height={isMobile ? 220 : 320} />
        </div>
      </div>
    </section>
  );
}

function Home({ onNav, onAdd, onOpen }) {
  return (
    <div>
      <Hero onNav={onNav} />
      <ValueProps />
      <Featured onNav={onNav} onAdd={onAdd} onOpen={onOpen} />
      <SpecialsBand />
    </div>
  );
}

Object.assign(window, { Home });
