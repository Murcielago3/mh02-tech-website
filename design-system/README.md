# MH02 Dashboard — Design System Kit

A portable, self-contained design system for MH02 Dashboard (tech.studiomh02.com), formatted for Claude Design. Every card is a standalone HTML file that renders the real brand — actual fonts, exact hexes, live components.

## How to use with Claude Design
- **claude.ai/design**: create a design-system project and add this whole folder (keep the structure — cards reference `../ds.css` and `fonts/`).
- **Any Claude session**: attach or point Claude at this folder. `ds.css` holds every token; `DESIGN_SYSTEM.md` (repo root) holds the written spec, voice rules, and Instagram recipes.

## Contents
```
design-system/
├── ds.css                       ← all tokens: colors, fonts, radii, shadows, primitives
├── fonts/
│   ├── Milker.otf               ← display font (headlines)
│   └── Wasted-Vindey.ttf        ← accent italic (the green phrase)
├── foundations/
│   ├── colors.html              ← full palette with hexes and usage
│   └── typography.html          ← 4 type voices + the two-font headline flip
├── components/
│   ├── buttons.html             ← primary gradient / ghost / on-ink pills
│   ├── chips-labels.html        ← eyebrows, badges, tags, metadata, pain→fix
│   ├── cards.html               ← module card + pain card
│   ├── ink-panel.html           ← the deep-green CTA panel w/ ghost wordmark
│   ├── marquee.html             ← the full-bleed marquee band
│   └── dashboard-mock.html      ← fake-UI stats panel
└── templates/                   ← ready 1080×1350 Instagram posts
    ├── ig-statement-white.html
    ├── ig-statement-ink.html
    ├── ig-pain-fix.html
    └── ig-automation-receipt.html
```

## Non-negotiables when designing new material
1. Light mode. White dominates; the `#0D3524` ink panel is the accent, never the default.
2. Every headline uses the two-font flip: MILKER in `#10231A`, closing phrase in Wasted Vindey italic green.
3. Monospace details (eyebrows, timestamps, tags) in small doses — they are seasoning, not the meal.
4. Hairline borders over shadows; shadows stay whisper-quiet and green-tinted.
5. Buttons are always fully-rounded pills.
6. Copy sounds like a founder, not marketing. No "seamless", no "empower", no exclamation marks.

Font substitutes if the custom files can't load: MILKER → Archivo Black · Wasted Vindey → Fraunces Italic (both on Google Fonts, already imported by ds.css as fallbacks).
