/* global React, Icon, Button, Tag, FoodImage, Logo, LogoMark, TalaveraBand */
// Ta'con Todo — menu data + page chrome (Header, Footer)

const IMG = (f) => `../../assets/food/${f}`;
const MENU = [
  // ---------- Tacos & Bowls ----------
  { id: "pescado", cat: "Tacos & Bowls", name: "Pescado Baja", desc: "Two crispy beer-battered fish tacos, red-cabbage slaw, chipotle crema, pico, lime — with Spanish rice.", price: 13, tags: [["new", "New"]], img: IMG("pescado-baja.jpeg") },
  { id: "bowl", cat: "Tacos & Bowls", name: "Sonora chicken bowl", desc: "Grilled adobo chicken over rice, black beans, fire-roasted corn, tomato, guac, crema.", price: 11, tags: [["green", "Green chile"]], img: IMG("burrito-bowl.jpeg") },
  { id: "flautas", cat: "Tacos & Bowls", name: "Flautas doradas", desc: "Crispy rolled flautas, shredded lettuce, queso fresco, crema, pickled onion.", price: 10, tags: [["pick", "Chef's pick"]], img: IMG("flautas.jpeg") },

  // ---------- Plates ----------
  { id: "pozole", cat: "Plates", name: "Pozole rojo", desc: "Red chile and hominy stew, slow-cooked pork, cabbage, radish, dried chile, lime.", price: 12, tags: [["red", "Red chile"], ["pick", "Chef's pick"]], img: IMG("pozole.jpeg") },
  { id: "verde", cat: "Plates", name: "Chile verde", desc: "Pork simmered in roasted green chile and tomatillo, refried beans, Spanish rice, tortillas.", price: 13, tags: [["green", "Green chile"]], img: IMG("chile-verde.jpeg") },
  { id: "enchiladas", cat: "Plates", name: "Enchiladas rojas", desc: "Stacked chicken enchiladas under red chile and melted cheese over Spanish rice.", price: 12, tags: [["christmas", "Make it Christmas"]], img: IMG("enchiladas-rojas.jpeg") },
  { id: "asada", cat: "Plates", name: "Carne asada", desc: "Grilled steak, charro beans, rice, roasted jalapeño, pico, guacamole, crema.", price: 16, tags: [["pick", "Chef's pick"]], img: IMG("carne-asada.jpeg") },
  { id: "pollo", cat: "Plates", name: "Pollo asado", desc: "Flame-grilled adobo chicken, black beans, rice, charred spring onion.", price: 14, tags: [["green", "Green chile"]], img: IMG("pollo-asado.jpeg") },

  // ---------- Burritos ----------
  { id: "suizo", cat: "Burritos", name: "Burrito suizo", desc: "Smothered in green chile-suiza cream sauce, rice and beans on the side.", price: 12, tags: [["green", "Green chile"]], img: IMG("burrito-suizo.jpeg") },
  { id: "mojado", cat: "Burritos", name: "Burrito mojado", desc: "Wet burrito drowned in red chile and melted jack — comes with chips and salsa.", price: 13, tags: [["red", "Red chile"]], img: IMG("burrito-mojado.jpeg") },
  { id: "familia", cat: "Burritos", name: "Familia enchilada pack", desc: "A dozen rolled enchiladas, rice, beans, chips and salsa. Feeds four, hungry.", price: 38, tags: [["red", "Feeds 4"]], img: IMG("family-enchiladas.jpeg") },

  // ---------- Postres ----------
  { id: "churros", cat: "Postres", name: "Churros", desc: "Fresh-fried, rolled in cinnamon sugar. Order them by the dozen.", price: 6, tags: [["pick", "Chef's pick"]], img: IMG("churros.jpeg") },
  { id: "friedice", cat: "Postres", name: "Fried ice cream", desc: "Crisp-coated vanilla in a cinnamon shell, chocolate drizzle, whipped cream.", price: 7, tags: [], img: IMG("fried-ice-cream.jpeg") },
  { id: "platanos", cat: "Postres", name: "Plátanos calientes", desc: "Caramelized sweet plantains, walnuts, vanilla ice cream, cajeta.", price: 7, tags: [], img: IMG("platanos.jpeg") },
];
const CATS = ["Tacos & Bowls", "Plates", "Burritos", "Postres"];

// ---------- Header ----------
function Header({ page, onNav, cartCount, onCart }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const root = document.getElementById("scrollroot") || window;
    const handler = () => setScrolled((root.scrollTop || window.scrollY) > 12);
    root.addEventListener("scroll", handler);
    return () => root.removeEventListener("scroll", handler);
  }, []);
  const links = [["Home", "home"], ["Menu", "menu"], ["Locations", "locations"]];
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "rgba(255,252,246,.82)" : "var(--paper)",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
      transition: "all var(--dur-mid) var(--ease-out)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", gap: 24 }}>
        <button onClick={() => onNav("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <Logo height={38} />
        </button>
        <nav style={{ display: "flex", gap: 4, marginLeft: 12 }}>
          {links.map(([label, key]) => (
            <button key={key} onClick={() => onNav(key)} style={{
              fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, cursor: "pointer",
              padding: "8px 14px", borderRadius: 8, border: "none", background: "transparent",
              color: page === key ? "var(--primary)" : "var(--ink-700)",
            }}>{label}</button>
          ))}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <button aria-label="Search" style={iconBtn}><Icon name="search" size={20} color="var(--ink-700)" /></button>
          <button aria-label="Cart" onClick={onCart} style={{ ...iconBtn, position: "relative" }}>
            <Icon name="shopping-bag" size={20} color="var(--ink-700)" />
            {cartCount > 0 && <span style={cartBadge}>{cartCount}</span>}
          </button>
          <Button size="sm" icon="map-pin" onClick={() => onNav("locations")}>Order pickup</Button>
        </div>
      </div>
    </header>
  );
}
const iconBtn = { width: 40, height: 40, borderRadius: 10, border: "none", background: "transparent", cursor: "pointer", display: "grid", placeItems: "center" };
const cartBadge = { position: "absolute", top: 4, right: 4, minWidth: 17, height: 17, padding: "0 4px", borderRadius: 999, background: "var(--primary)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: 10.5, fontWeight: 700, display: "grid", placeItems: "center", boxSizing: "border-box" };

// ---------- Footer ----------
function Footer({ onNav }) {
  const cols = [
    ["Menu", ["Tacos", "Plates", "Sides", "Drinks"]],
    ["Visit", ["Locations", "Hours", "Catering", "Order pickup"]],
    ["About", ["Our chile", "Careers", "Press", "Contact"]],
  ];
  return (
    <footer style={{ background: "var(--ink)", color: "#FFFCF6", marginTop: 0 }}>
      <TalaveraBand height={20} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "52px 24px 30px", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 32 }}>
        <div>
          <Logo height={40} onDark />
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6, color: "rgba(255,252,246,.7)", maxWidth: 240, marginTop: 14 }}>
            New Mexico on a plate. Red &amp; green chile roasted in-house, blue-corn tortillas pressed daily.
          </p>
          <div style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: 26, color: "var(--turquoise-300)", marginTop: 8 }}>¡con todo!</div>
        </div>
        {cols.map(([h, items]) => (
          <div key={h}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--marigold-400)", marginBottom: 14 }}>{h}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((it) => <a key={it} onClick={() => onNav("menu")} style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,252,246,.8)", cursor: "pointer", textDecoration: "none" }}>{it}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 24px", borderTop: "1px solid rgba(255,252,246,.14)", display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,252,246,.55)" }}>
        <span>© 2026 Ta'con Todo · Albuquerque, NM</span>
        <span style={{ display: "flex", gap: 16 }}><a style={{ color: "inherit", textDecoration: "none" }}>Privacy</a><a style={{ color: "inherit", textDecoration: "none" }}>Terms</a></span>
      </div>
    </footer>
  );
}

Object.assign(window, { MENU, CATS, Header, Footer });
