# Ta'con Todo — Website UI Kit

High-fidelity, interactive recreation of the Ta'con Todo ordering website. These are
cosmetic, click-through components — not production code — built to be pieced together
into real mocks.

## Run it
Open `index.html`. It boots a small single-page app with working state:
- **Navigate** Home · Menu · Locations from the header.
- **Browse the menu** — filter by category (All / Tacos / Plates / Sides / Drinks).
- **Click a dish** → item customizer drawer (tortilla, chile, extras, quantity).
- **Add to plate** → toast confirmation + cart badge increments.
- **Open the cart** (bag icon) → quantity steppers, remove, live subtotal/tax/total.

## Files
| File | Contents |
|---|---|
| `index.html` | App shell + state (routing, cart, drawers, toast). Loads React 18 + Babel + Lucide. |
| `components.jsx` | Primitives: `Icon` (Lucide), `Button`, `Tag`, `FoodImage`, `TalaveraBand`, `Logo`, `LogoMark`. |
| `chrome.jsx` | `MENU` data + `CATS`, `Header` (sticky, frosts on scroll), `Footer` (Talavera band). |
| `Home.jsx` | `Home` = `Hero` + `ValueProps` + `Featured` + `SpecialsBand` (chalkboard). |
| `Menu.jsx` | `MenuCard` (image-topped, hover-lift) + `MenuPage` (category tabs + grid). |
| `Drawers.jsx` | `ItemDrawer` (customizer) + `CartDrawer` (slide-over) + shared `Overlay`. |
| `Locations.jsx` | `Locations` — three NM storefront cards with open/closed status. |

## Notes & conventions
- **Tokens:** everything reads from `../../colors_and_type.css`. No hard-coded brand hex.
- **Icons:** [Lucide](https://lucide.dev) via CDN, 2px stroke, `currentColor`. Brand marks (sun, Talavera) are bespoke SVG in `assets/`.
- **Food imagery is a placeholder.** `FoodImage` renders a warm gradient tile labelled "photo".
  **Replace with real food photography** — swap the component body for an `<img>` (or an
  `<image-slot>`) pointing at real assets. This is the single biggest upgrade to make it feel real.
- **Style objects:** named per-concern or inline — no shared `const styles` (avoids cross-file collisions).
- Components export to `window` at file end so sibling Babel scripts can use them.

## What's intentionally omitted
Real checkout/payment, search results, account/login, and live maps — the brief covered
menu + food images, so ordering flow is mocked to the cart and stops at a demo checkout button.
