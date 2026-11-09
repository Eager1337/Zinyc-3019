# Zincy's design direction

Approved: editorial luxury salon website, web only.
Revision approved by direct user request: use first attached logo as the actual header/footer identity, second attached October post as the landing-page visual (explicit archive label), other attachments and relevant Instagram archive photographs in services, products, team and gallery. Do not import or execute archived Instagram JS/CSS or publish unrelated avatar/icon downloads. Replace stock imagery in visible UI. Keep previews/no confirmed reservations safeguards.
Brand update: warm ivory and espresso retained; replace olive tones with deep gold-brown #514129 and blush #f4e2e6 to echo the supplied pink-and-gold branding. Bold Cormorant 600 headings and real Poppins 600 controls/navigation, body copy enlarged for readability. Logo original is 150px, display only at 58–70px; no invented recreation.
Palette: warm ivory #f7f5ef, espresso #28251e, olive gold #85774d, pale sand #ece8de.
Typography: Cormorant Garamond for expressive oversized headings; Poppins for navigation, body and form UI. Self-host font assets if available.
Layout: restrained editorial asymmetry, split portrait hero, thin rules, generous 96px section spacing, image-led service tiles, dark olive conversion band. Minimal corner rounding, no generic SaaS gradients.
UX: sticky navigation and mobile menu, direct contact links, filterable inspiration gallery and keyboard-accessible image dialog, service-specific booking dialog, validated appointment request stored by oRPC/Drizzle followed by explicit WhatsApp handoff. No confirmed inventory or prices. Clear pending state, retry support, consent, privacy modal, reduced motion and visible focus. Bridal/group requests are enquiries, not claimed packages.
Truth: address and phone from supplied Google listing and indexed Facebook; nails/hair/lashes/massages from indexed Facebook. Review uses exactly the provided rating and services, not a fabricated quote. Illustrative images explicitly labeled, no fabricated team, client count, hours, awards or prices. Page is a proposed website, not yet the authorized live salon channel.
Files: web pages/salon.tsx, components/booking.tsx, data/salon.ts, queries/bookings.ts, global styles; API routes/bookings.ts and database schema. No mobile/desktop changes.
API: bookings.create; table appointment_requests. No public request listing or customer data exposure.
# <App Name> — Design

> Starter design brief. Replace this content with the app you're building before writing any UI.
> Keep it short and concrete — it's the single source of truth for palette, typography, pages,
> screens, and flows across web, mobile, and desktop.

One-line description of the app, the platforms it ships on, the visual direction (style, feel), and the core job it does for the user.

## Brand & Colors

One token set, consumed per platform:

- **Web & desktop**: CSS variables in `packages/web/src/web/styles.css` (desktop loads the web UI).
- **Mobile**: `Colors.light` / `Colors.dark` in `packages/mobile/constants/theme.ts`, read via `useColors()`; `userInterfaceStyle: "automatic"` follows the system light/dark setting.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| primary | #1F1F1F | #E5E5E5 | Buttons, active tab, accents |
| background | #FFFFFF | #0A0A0A | Page/screen background |
| card | #FFFFFF | #1A1A1A | Cards, surfaces |
| foreground | #171717 | #FAFAFA | Primary text |
| mutedForeground | #737373 | #A3A3A3 | Secondary text |
| border | #E5E5E5 | #262626 | Hairlines |
| destructive | #DC2626 | #EF4444 | Delete / errors |

## Typography

Name the display + body pairing here. Web: set font families in `styles.css` (self-hosted files go in `packages/web/public/fonts/`). Mobile: system font by default; load custom fonts with `useFonts` from `expo-font` and reference them via `Fonts` in `constants/theme.ts`.

## Pages & Screens

List each page/screen, its route file, and what it shows. Example:

- **Web — Home** (`packages/web/src/web/pages/index.tsx`) — what the user sees first.
- **Mobile — Home** (`packages/mobile/app/(tabs)/index.tsx`) — main tab.
- Add web pages under `src/web/pages/` (+ route in `app.tsx`); mobile tabs under `app/(tabs)/`, stack/modal screens under `app/`.

## Key User Flows

1. Describe the primary flow end to end (open → action → result).
2. ...

## Architecture

- **API**: typed oRPC client (`lib/api.ts` in each package) → the backend in `@template/web`. Query/mutation hooks live in `queries/` (one file per feature); pages/screens call them with `@tanstack/react-query`.
- **State/sync**: TanStack Query with optimistic updates for instant-feel interactions.
- **Auth / payments / uploads**: see `skills/app/references/` when those features are needed.
