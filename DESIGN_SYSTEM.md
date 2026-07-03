# MH02 Dashboard — Brand & Design System
Extracted from the live site (tech.studiomh02.com). Use this as the single source of truth for any off-site design work (social posts, decks, ads) so everything reflects the website 1:1.

---

## 1. Brand in one sentence
A calm, confident operations platform for creative studios — **premium light design, paper-white with deep editorial greens**, heavy squared headlines flipped with a luxury italic accent, and small technical monospace details that make it feel engineered, not decorated.

## 2. Color palette

### Core greens
| Token | Hex | Use |
|---|---|---|
| Green (primary) | `#217A52` | Accent text, icons, links, primary fills |
| Green bright | `#2C9663` | Gradients (top), hover states, small glowing dots |
| Green deep | `#175C3C` | Gradients (bottom), emphasis text on white |
| Green ink | `#0D3524` | **Dark panels** — the signature contrast surface |

### Light surfaces
| Token | Hex / value | Use |
|---|---|---|
| Background | `#FFFFFF` | Default canvas |
| Background 2 | `#F3F8F5` | Alternate section tint (faint green paper) |
| Surface tint | `rgba(33,122,82,0.03)` | Subtle card fills |
| Border | `rgba(16,35,26,0.10)` | Hairlines everywhere (1px) |
| Border strong | `rgba(16,35,26,0.16)` | Emphasized outlines |

### Text on white
| Token | Hex |
|---|---|
| Text (near-black green) | `#10231A` |
| Text secondary | `#47594F` |
| Text muted | `#6F8076` |
| Text faint | `#A9B6AE` |

### Text on green-ink panels
| Token | Hex / value |
|---|---|
| Ink text | `#F2F8F4` |
| Ink text secondary | `#B9CFC2` |
| Ink accent (mint) | `#6FE0AC` |
| Ink border | `rgba(242,248,244,0.16)` |

### Rules
- **Light mode only.** White dominates; green ink panels are the exception, never the default.
- Never pure black — the darkest value is `#10231A` (green-tinted).
- Red appears once, tiny: a small `✕` glyph in `#C25454` marking "pain points."

## 3. Typography

Four voices, always in this hierarchy:

| Role | Font (site) | Free substitute | Character |
|---|---|---|---|
| **Display** | MILKER (custom OTF) | Archivo Black / Integral CF | Heavy, squared, uppercase-friendly slab. All big headlines. |
| **Accent** | Wasted Vindey (custom TTF) | Fraunces Italic (400–600) | Luxury italic serif. ONLY for the green emphasized phrase. |
| **Body / UI** | Archivo (100–900) | Archivo | Clean grotesque. Paragraphs, buttons, labels. |
| **Technical** | JetBrains Mono (400–700) | JetBrains Mono | Eyebrows, chips, timestamps, metadata. |

### The signature headline pattern
Every headline is a two-part flip:
1. First line(s): **display font, near-black `#10231A`**, tight leading (~1.05), slight negative tracking.
2. Final phrase: *accent italic serif in green `#217A52`* (mint `#6FE0AC` on ink panels), ~1.05× larger than the display text so the two fonts feel optically equal.

Real examples from the site:
- "Run your studio, *not your software.*"
- "Your team is fine. *Your tools are the problem.*"
- "Six modules. *One source of truth.*"
- "Set it up once. *It handles the rest.*"
- "Ready to stop *winging it?*"

### Supporting type specs
- **Eyebrow label** (above headlines): JetBrains Mono, uppercase, ~0.7rem, letter-spacing `0.22em`, color `#2C9663`, prefixed by a 22px thin line — e.g. `[ 01 - PLATFORM ]`
- **Body**: Archivo 400, `#47594F`, line-height 1.7
- **Chips/tags**: mono, uppercase, tiny (0.66rem), green text on `rgba(33,122,82,0.07)` fill with `rgba(33,122,82,0.22)` border, 0.5rem radius — e.g. `LIVE STATS` `AUTO-NUDGE` `TDS-AWARE`
- **Metadata rows**: mono, muted, dot-separated — e.g. `SUN · 12:00`, `crm · org · hr`, `#management`

## 4. Signature motifs (what makes it "us")

1. **The italic green flip** — the two-font headline described above. The single most recognizable element.
2. **Green-ink panels** — deep `#0D3524` rounded panels (24px radius) dropped into the white page for contrast moments (automation, final CTA, footer). White/mint text, subtle mint radial glow from an edge, tiny white particle dots.
3. **Monospace engineering details** — bracketed eyebrows `[ LIKE THIS ]`, timestamps, channel tags, dot separators `·`. Sprinkled small; never a whole paragraph.
4. **Pulsing status dot** — a 6px green dot with a soft glow, next to eyebrows/badges. Signals "live."
5. **Giant marquee band** — a full-width `#0D3524` strip with huge display-font words alternating roman/italic-accent, separated by mint dots: `Projects · *Clients* · Timesheets · *Invoicing*`.
6. **Cards** — white, 1px hairline border, 16px radius, whisper shadow `0 12px 32px -16px rgba(16,35,26,0.14)`. Numbered `01`–`06` in faint mono, green icon in a pale-green rounded chip.
7. **Pain → fix pattern** — red `✕` + problem in secondary text, then a dashed divider, then `→` + the fix in deep green medium-weight.
8. **Pill buttons** — fully rounded. Primary: vertical gradient `#2C9663 → #175C3C`, white text, soft green shadow. Secondary: white, hairline border, mono font label.
9. **Ghost outline wordmark** — huge display-font text with 1px light stroke and transparent fill, peeking from a corner of ink panels (`MH02`).
10. **Line icons** — 1.5px stroke, 24px grid, geometric, always green. No filled or emoji-style icons.

## 5. Spacing, radius, shadow
- Spacing scale: 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px — generous; whitespace is a feature.
- Radius: cards 16px, panels 24px, buttons/chips fully rounded (9999px), small elements 8px.
- Shadows are barely-there green-tinted: `0 1px 2px rgba(16,35,26,0.05), 0 12px 32px -16px rgba(16,35,26,0.14)`. Never harsh drop shadows.
- Hairline (1px) borders do most of the separation work, not shadows.

## 6. Voice & copy rules
- Plain, human, lightly wry. Written like a founder who built the thing, not marketing.
- Short declaratives. Contractions always. Questions are fine ("Ready to stop winging it?").
- Concrete over abstract: "Every Friday someone's chasing timesheets" not "streamline your workflows."
- Indian-market grounding when relevant: ₹, PAN, Aadhaar, TDS, "your CA."
- Banned: synergy-speak, "empower," "seamless," "revolutionize," exclamation marks, em-dash-heavy AI cadence.
- CTAs: "Book a demo" (primary), "Try the live tour" (secondary). Email: hello.tech@studiomh02.com.

## 7. Instagram post recipes (1080×1350 preferred, 1080×1080 ok)
Keep ≥96px side margins; headline zone in the upper two-thirds; one idea per post.

1. **Statement post (white)** — eyebrow `[ MH02 DASHBOARD ]` top-left with pulse dot → giant two-font headline ("Run your studio, *not your software.*") → one line of body → small green pill button graphic "Book a demo →". Optional faint green top-corner light rays.
2. **Statement post (ink)** — same skeleton on `#0D3524` with white + mint `#6FE0AC` accent, tiny white particle dots, ghost `MH02` outline in a corner.
3. **Pain/fix card** — white card centered on `#F3F8F5`: red `✕`, "Half the week is spent nagging people", body, dashed divider, `→ Slack handles the reminders now.` in deep green.
4. **Fake-UI stat post** — a dashboard card mock: mono header bar `ops · your studio today` with green dot, then big display-font numbers (3 pending timesheets · 7 open claims · 0 reports compiled by hand) with tiny mono labels.
5. **Marquee slice** — full-bleed ink band with two huge marquee lines running edge-to-edge, roman/italic alternating, mint dot separators. Caption-free, pure brand.
6. **Automation receipt** — mono "log" rows on white: `[SUN 12:00] timesheet reminder → sent`, `[1st 09:00] monthly report → #management`, closing line in accent italic: *you did nothing.*

**Carousel rhythm:** alternate white → ink → white; end on an ink CTA slide with "Book a demo" pill and the email in mono.

---
*Fonts live in `src/assets/fonts/` (Milker.otf, Wasted-Vindey.ttf). Tokens in `src/index.css`.*
