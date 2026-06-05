/* global React */
// Ta'con Todo — shared UI kit primitives. Exports to window at end.
const { useState, useEffect, useRef } = React;

// ---- Responsive helper: true when viewport is at/below `bp` px ----
// Inline styles can't use media queries, so components read this hook and
// swap layout-critical values (grid columns, font sizes, paddings).
function useIsMobile(bp = 760) {
  const [m, setM] = useState(typeof window !== "undefined" && window.innerWidth <= bp);
  useEffect(() => {
    const onResize = () => setM(window.innerWidth <= bp);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [bp]);
  return m;
}

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

// ---- Food image: real photo when `src` given & loads, warm gradient fallback otherwise ----
function FoodImage({ seed = 0, src, label = "photo", height = 150, radius = 0, style }) {
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    return (
      <div style={{ height, borderRadius: radius, overflow: "hidden", background: "var(--sand-100)", ...style }}>
        <img src={src} alt={label} loading="lazy" onError={() => setFailed(true)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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

// ---- Talavera band (thin decorative ribbon, inline tile pattern) ----
function TalaveraBand({ height = 22 }) {
  const tile = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'>` +
    `<rect width='60' height='60' fill='#1F7A6E'/>` +
    `<circle cx='30' cy='30' r='11' fill='none' stroke='#F6B33D' stroke-width='3'/>` +
    `<circle cx='30' cy='30' r='4' fill='#E8602C'/>` +
    `<path d='M0 0h30v30H0z' fill='none' stroke='#8FD6CE' stroke-width='2'/>` +
    `<path d='M30 30h30v30H30z' fill='none' stroke='#8FD6CE' stroke-width='2'/>` +
    `</svg>`
  );
  return <div style={{ height, background: `url("data:image/svg+xml,${tile}")`, backgroundSize: `${height * 2.7}px` }} />;
}

// ---- Talavera tile fill: seamless ceramic-tile pattern in a named colorway ----
const TILE_PALETTES = {
  teal:   { bg: "#1F7A6E", line: "#8FD6CE", ring: "#F6B33D", dot: "#E8602C" },
  red:    { bg: "#C8442C", line: "#F2E9DA", ring: "#F6B33D", dot: "#FFFCF6" },
  orange: { bg: "#E8602C", line: "#FFE3CE", ring: "#F6B33D", dot: "#1F7A6E" },
};
function talaveraTileUri({ bg, line, ring, dot }) {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'>` +
      `<rect width='72' height='72' fill='${bg}'/>` +
      `<g fill='none' stroke='${line}' stroke-width='2.5'>` +
        `<circle cx='0' cy='0' r='13'/><circle cx='72' cy='0' r='13'/>` +
        `<circle cx='0' cy='72' r='13'/><circle cx='72' cy='72' r='13'/>` +
      `</g>` +
      `<g fill='${line}'>` +
        `<circle cx='36' cy='0' r='3'/><circle cx='0' cy='36' r='3'/>` +
        `<circle cx='72' cy='36' r='3'/><circle cx='36' cy='72' r='3'/>` +
      `</g>` +
      `<circle cx='36' cy='36' r='15' fill='none' stroke='${ring}' stroke-width='3'/>` +
      `<g fill='${ring}'>` +
        `<circle cx='36' cy='18' r='3.4'/><circle cx='36' cy='54' r='3.4'/>` +
        `<circle cx='18' cy='36' r='3.4'/><circle cx='54' cy='36' r='3.4'/>` +
      `</g>` +
      `<circle cx='36' cy='36' r='6.5' fill='${dot}'/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
function TilePattern({ palette = "teal", height = 150, size = 72, radius = 0, style, children }) {
  const p = typeof palette === "string" ? (TILE_PALETTES[palette] || TILE_PALETTES.teal) : palette;
  return (
    <div style={{ height, borderRadius: radius, background: talaveraTileUri(p), backgroundColor: p.bg, backgroundSize: `${size}px ${size}px`, ...style }}>
      {children}
    </div>
  );
}

// ---- Sun mark + brand wordmark (inline SVG, no external assets) ----
function SunMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden="true" style={{ display: "block", flex: "none" }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x="21" y="1.5" width="2" height="7" rx="1" fill="var(--marigold-400)"
          transform={`rotate(${i * 30} 22 22)`} />
      ))}
      <circle cx="22" cy="22" r="11.5" fill="var(--primary)" />
      <circle cx="22" cy="22" r="11.5" fill="none" stroke="var(--marigold-400)" strokeWidth="2" />
    </svg>
  );
}
function Logo({ height = 40, onDark = false }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: height * 0.22, height, lineHeight: 1 }}>
      <SunMark size={height * 0.92} />
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: height * 0.6, letterSpacing: "-.01em", whiteSpace: "nowrap", color: onDark ? "#FFFCF6" : "var(--ink)" }}>
        Ta<span style={{ color: "var(--primary)" }}>’</span>con&nbsp;Todo
      </span>
    </span>
  );
}
function LogoMark({ size = 44 }) {
  return <SunMark size={size} />;
}

Object.assign(window, { Icon, Button, Tag, FoodImage, TalaveraBand, TilePattern, Logo, LogoMark, useIsMobile });
