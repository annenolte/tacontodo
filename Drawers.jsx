/* global React, Icon, Button, Tag, FoodImage, fmtPrice */
// Ta'con Todo — Item customizer drawer + Cart drawer

function Overlay({ show, onClose, children, side = "right", width = 440 }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100, pointerEvents: show ? "auto" : "none",
    }}>
      <div onClick={onClose} style={{
        position: "absolute", inset: 0, background: "rgba(36,28,22,.5)",
        opacity: show ? 1 : 0, transition: "opacity var(--dur-mid) var(--ease-out)",
      }} />
      <div style={{
        position: "absolute", top: 0, bottom: 0, [side]: 0, width, maxWidth: "92vw",
        background: "var(--paper)", boxShadow: "var(--shadow-pop)", display: "flex", flexDirection: "column",
        transform: show ? "translateX(0)" : `translateX(${side === "right" ? "100%" : "-100%"})`,
        transition: "transform var(--dur-slow) var(--ease-out)",
      }}>{children}</div>
    </div>
  );
}

function ItemDrawer({ item, show, onClose, onAdd }) {
  const [qty, setQty] = React.useState(1);
  const [tortilla, setTortilla] = React.useState("Blue corn");
  const [chile, setChile] = React.useState("Green");
  const [extras, setExtras] = React.useState([]);
  React.useEffect(() => { if (show) { setQty(1); setTortilla("Blue corn"); setChile("Green"); setExtras([]); } }, [show, item]);
  if (!item) return <Overlay show={show} onClose={onClose} />;
  const EXTRAS = [["Guacamole", 1.5], ["Extra cheese", 1], ["Double meat", 2.5]];
  const extrasTotal = extras.reduce((s, e) => s + EXTRAS.find((x) => x[0] === e)[1], 0);
  const total = (item.price + extrasTotal) * qty;
  const toggle = (name) => setExtras((p) => p.includes(name) ? p.filter((x) => x !== name) : [...p, name]);

  return (
    <Overlay show={show} onClose={onClose}>
      <div style={{ position: "relative" }}>
        <FoodImage src={item.img} label={item.name} height={200} />
        <button onClick={onClose} style={closeBtn}><Icon name="x" size={20} color="var(--ink)" /></button>
      </div>
      <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 27, color: "var(--ink)", margin: 0 }}>{item.name}</h2>
          <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 21, color: "var(--primary)" }}>${fmtPrice(item.price)}</div>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.5, color: "var(--ink-500)", margin: "8px 0 18px" }}>{item.desc}</p>

        <OptGroup label="Tortilla" options={["Blue corn", "Flour", "Crispy"]} value={tortilla} onChange={setTortilla} />
        <OptGroup label="Chile" options={["Green", "Red", "Christmas", "None"]} value={chile} onChange={setChile} />

        <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-500)", margin: "20px 0 10px" }}>Add extras</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {EXTRAS.map(([name, price]) => (
            <button key={name} onClick={() => toggle(name)} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, cursor: "pointer",
              border: `1.5px solid ${extras.includes(name) ? "var(--primary)" : "var(--border)"}`,
              background: extras.includes(name) ? "var(--orange-50)" : "#fff", textAlign: "left",
            }}>
              <span style={{ width: 22, height: 22, borderRadius: 6, border: `1.5px solid ${extras.includes(name) ? "var(--primary)" : "var(--border-strong)"}`, background: extras.includes(name) ? "var(--primary)" : "#fff", display: "grid", placeItems: "center", flex: "none" }}>{extras.includes(name) && <Icon name="check" size={14} color="#fff" />}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, color: "var(--ink)", flex: 1 }}>{name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 14, color: "var(--ink-500)" }}>+${fmtPrice(price)}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", padding: "16px 24px", display: "flex", gap: 14, alignItems: "center", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1.5px solid var(--border-strong)", borderRadius: 10, padding: 3 }}>
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={stepBtn}><Icon name="minus" size={16} color="var(--ink)" /></button>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 16, minWidth: 22, textAlign: "center" }}>{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} style={stepBtn}><Icon name="plus" size={16} color="var(--ink)" /></button>
        </div>
        <Button size="lg" style={{ flex: 1 }} onClick={() => { onAdd(item, qty); onClose(); }}>Add to plate · ${fmtPrice(total)}</Button>
      </div>
    </Overlay>
  );
}

function OptGroup({ label, options, value, onChange }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-500)", margin: "16px 0 10px" }}>{label}</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {options.map((o) => (
          <button key={o} onClick={() => onChange(o)} style={{
            fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, padding: "9px 16px", borderRadius: 999, cursor: "pointer",
            border: `1.5px solid ${value === o ? "var(--primary)" : "var(--border)"}`,
            background: value === o ? "var(--primary)" : "#fff",
            color: value === o ? "var(--on-primary)" : "var(--ink-700)",
          }}>{o}</button>
        ))}
      </div>
    </div>
  );
}

function CartDrawer({ show, onClose, cart, setCart }) {
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const tax = subtotal * 0.07875;
  const total = subtotal + tax;
  const setQty = (i, d) => setCart((p) => p.map((c, idx) => idx === i ? { ...c, qty: Math.max(1, c.qty + d) } : c));
  const remove = (i) => setCart((p) => p.filter((_, idx) => idx !== i));
  return (
    <Overlay show={show} onClose={onClose}>
      <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--ink)", margin: 0 }}>Your plate</h2>
        <button onClick={onClose} style={{ ...closeBtn, position: "static" }}><Icon name="x" size={20} color="var(--ink)" /></button>
      </div>
      {cart.length === 0 ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 40, textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "var(--sand-100)", display: "grid", placeItems: "center" }}><Icon name="shopping-bag" size={30} color="var(--ink-300)" /></div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--ink)" }}>Your plate's empty</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-500)" }}>Let's fix that.</div>
        </div>
      ) : (
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {cart.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 14, padding: "14px 24px", alignItems: "center" }}>
              <div style={{ width: 60, height: 60, borderRadius: 12, overflow: "hidden", flex: "none" }}><FoodImage src={c.img} label={c.name} height={60} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>{c.name}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink-500)" }}>${fmtPrice(c.price)} each</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, border: "1.5px solid var(--border)", borderRadius: 8, padding: 2, width: "fit-content" }}>
                  <button onClick={() => setQty(i, -1)} style={stepBtnSm}><Icon name="minus" size={13} color="var(--ink)" /></button>
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 14, minWidth: 18, textAlign: "center" }}>{c.qty}</span>
                  <button onClick={() => setQty(i, 1)} style={stepBtnSm}><Icon name="plus" size={13} color="var(--ink)" /></button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>${fmtPrice(+(c.price * c.qty).toFixed(2))}</div>
                <button onClick={() => remove(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}><Icon name="trash-2" size={16} color="var(--ink-300)" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "18px 24px", background: "#fff" }}>
          <Row l="Subtotal" v={subtotal} />
          <Row l="Tax (NM GRT)" v={tax} />
          <div style={{ height: 1, background: "var(--border)", margin: "10px 0" }} />
          <Row l="Total" v={total} bold />
          <Button size="lg" icon="arrow-right" style={{ width: "100%", marginTop: 14, flexDirection: "row-reverse" }} onClick={() => alert("Demo only — checkout not wired up")}>Checkout pickup</Button>
        </div>
      )}
    </Overlay>
  );
}
function Row({ l, v, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
      <span style={{ fontFamily: "var(--font-body)", fontSize: bold ? 17 : 14, fontWeight: bold ? 700 : 500, color: bold ? "var(--ink)" : "var(--ink-500)" }}>{l}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: bold ? 19 : 14, fontWeight: bold ? 700 : 500, color: "var(--ink)" }}>${fmtPrice(+v.toFixed(2))}</span>
    </div>
  );
}

const closeBtn = { position: "absolute", top: 14, right: 14, width: 36, height: 36, borderRadius: 999, border: "none", background: "rgba(255,252,246,.92)", cursor: "pointer", display: "grid", placeItems: "center", boxShadow: "var(--shadow-sm)" };
const stepBtn = { width: 34, height: 34, borderRadius: 8, border: "none", background: "var(--sand-50)", cursor: "pointer", display: "grid", placeItems: "center" };
const stepBtnSm = { width: 26, height: 26, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer", display: "grid", placeItems: "center" };

Object.assign(window, { ItemDrawer, CartDrawer });
