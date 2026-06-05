/* global React */
// Ta'con Todo — shared UI kit primitives. Exports to window at end.
const { useState, useEffect, useRef } = React;

// ---- Lucide icon (uses lucide UMD global, scans after mount) ----
function Icon({ name, size = 20, color = "currentColor", stroke = 2, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      ref.current.appendChild(i);
      window.lucide.createIcons({
        attrs: { width: size, height: size, stroke: color, "stroke-width": stroke },
        nameAttr: "data-lucide",
      });
    }
  }, [name, size, color, stroke]);
  return <span ref={ref} style={{ display: "inline-flex", lineHeight: 0, ...style }} aria-hidden="true" />;
}

// ---- Button ----
function Button({ children, variant = "primary", size = "md", icon, onClick, type = "button", disabled, style }) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const pad = size === "lg" ? "15px 26px" : size === "sm" ? "8px 14px" : "12px 20px";
  const fs = size === "lg" ? 17 : size === "sm" ? 13 : 15;
  const base = {
    fontFamily: "var(--font-body)", fontWeight: 700, fontSize: fs, borderRadius: 10,
    padding: pad, border: "none", cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center",
    transition: "all var(--dur-fast) var(--ease-out)", whiteSpace: "nowrap", ...style,
  };
  const variants = {
    primary: {
      background: press ? "var(--orange-700)" : hover ? "var(--orange-600)" : "var(--primary)",
      color: "var(--on-primary)",
      boxShadow: hover && !press ? "var(--shadow-md)" : "var(--shadow-sm)",
      transform: press ? "scale(.97)" : hover ? "translateY(-1px)" : "none",
    },
    secondary: {
      background: "#fff", color: "var(--ink)",
      border: `1.5px solid ${hover ? "var(--border-strong)" : "var(--border)"}`,
      transform: press ? "scale(.98)" : "none",
    },
    ghost: { background: hover ? "var(--orange-50)" : "transparent", color: "var(--primary)" },
    ondark: {
      background: press ? "var(--orange-700)" : hover ? "var(--orange-600)" : "var(--primary)",
      color: "var(--on-primary)", transform: press ? "scale(.97)" : "none",
    },
  };
  if (disabled) return <button type={type} disabled style={{ ...base, ...variants[variant], opacity: .45, boxShadow: "none" }}>{icon && <Icon name={icon} size={fs + 2} />}{children}</button>;
  return (
    <button type={type} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{ ...base, ...variants[variant] }}>
      {icon && <Icon name={icon} size={fs + 2} />}{children}
    </button>
  );
}

// ---- Tag / badge ----
const TAG_STYLES = {
  red: { background: "var(--chile-red-500)", color: "#fff" },
  green: { background: "var(--hatch-green-500)", color: "#fff" },
  christmas: { background: "var(--orange-100)", color: "var(--orange-700)" },
  veg: { background: "var(--turquoise-100)", color: "var(--turquoise-700)" },
  new: { background: "var(--orange-100)", color: "var(--orange-700)" },
  pick: { background: "#FDEFCF", color: "#8A6410" },
  outline: { background: "#fff", color: "var(--ink-700)", border: "1.5px solid var(--border-strong)" },
};
function Tag({ tone = "outline", children, style }) {
  return <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, padding: "4px 11px", borderRadius: 999, whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 5, ...TAG_STYLES[tone], ...style }}>{children}</span>;
}

// ---- Food image: real photo when `src` given, warm gradient fallback otherwise ----
function FoodImage({ seed = 0, src, label = "photo", height = 150, radius = 0, style }) {
  if (src) {
    return (
      <div style={{ height, borderRadius: radius, overflow: "hidden", background: "var(--sand-100)", ...style }}>
        <img src={src} alt={label} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    );
  }
  // deterministic warm gradient variations
  const palettes = [
    ["#F8813B", "#ED5A1A", "#CC4711"],
    ["#F6B53C", "#F8813B", "#ED5A1A"],
    ["#ED5A1A", "#CC4711", "#A2360D"],
    ["#FCA46B", "#F8813B", "#CC4711"],
  ];
  const p = palettes[seed % palettes.length];
  return (
    <div style={{
      height, borderRadius: radius, position: "relative", overflow: "hidden",
      background: `radial-gradient(circle at 28% 28%, ${p[0]}, transparent 58%), radial-gradient(circle at 72% 65%, ${p[1]}, transparent 55%), linear-gradient(135deg, ${p[2]}, ${p[1]})`,
      ...style,
    }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFCF6", fontSize: 12, fontWeight: 600, opacity: .82, letterSpacing: ".04em", gap: 6 }}>
        <Icon name="image" size={15} color="#FFFCF6" /> {label}
      </div>
    </div>
  );
}

// ---- Talavera band (thin decorative ribbon) ----
function TalaveraBand({ height = 22 }) {
  return <div style={{ height, background: "url(../../assets/pattern-talavera.svg)", backgroundSize: `${height * 3}px` }} />;
}

// ---- Brand logo (inline, scalable) ----
function Logo({ height = 40, onDark = false }) {
  return <img src="../../assets/logo-horizontal.svg" alt="Ta'con Todo" style={{ height, filter: onDark ? "brightness(0) invert(1)" : "none" }} />;
}
function LogoMark({ size = 44 }) {
  return <img src="../../assets/logo-mark.svg" alt="Ta'con Todo" style={{ width: size, height: size }} />;
}

Object.assign(window, { Icon, Button, Tag, FoodImage, TalaveraBand, Logo, LogoMark });
