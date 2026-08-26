# The Wonderists Website Plan

## Goal

Launch a distinctive, responsive single-page website that introduces The Wonderists, makes the adventures easy to explore, positions Wondercards as the everyday expression of the brand, and explains Wonderism without making the experience feel corporate.

## Page flow

1. Header and hero — core proposition and two primary paths.
2. Manifesto — the tension between being alive and feeling alive.
3. Adventures — Uganda, New Zealand, Mentawai Islands, and WILD IDEAS.
4. Adventure philosophy — the people and outcomes behind the experiences.
5. Wondercards — product story and worldwide shipping.
6. Wonderism — philosophy and definitions.
7. Closing call to action — “Your life is happening now.”

## Design system

- Typography: Outfit, bundled locally in weights 300–700.
- Palette: Black `#111111`, Mild Ocean `#12586E`, Reef `#3C9CA8`, Ember `#E3592A`, Sand `#F5F1E8`.
- Layout: editorial, open, asymmetrical, image-led; deliberately avoids repetitive card grids.
- Brand marks: supplied primary logo in the header and supplied script variation as an expressive accent.
- Motion: restrained scroll reveals, image scale on hover, and an accessible mobile menu; motion disables when reduced motion is preferred.

## Content decisions

- Public-facing copy from pages 1–4 is used as the source of truth.
- The public WILD IDEAS summary and dedicated experience page are included.
- Internal or drafting material is not published, including the “WIP - Next Gen” itinerary, personal follow-up notes, and planning commentary.
- Obvious source typo “curisosity” is corrected to “curiosity.”
- Public copy is stored in structured JSON and exposed through Pages CMS for Git-backed editing.

## Build and QA

- Vite-powered semantic HTML, CSS, and JavaScript.
- Responsive checks at desktop, tablet, and mobile widths.
- Keyboard focus, dialog behavior, reduced motion, image loading, and contrast checks.
- Production build validation and browser screenshot comparison against the approved concepts.
