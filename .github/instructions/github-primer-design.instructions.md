---
description: "Use when editing web HTML/CSS to keep GitHub Primer design consistency. Enforce Primer CSS patterns, Octicons usage, and avoid non-GitHub icon frameworks."
name: "GitHub Primer Web Design Rules"
applyTo: **/*.html, **/*.css
---
# GitHub Primer Web Design Rules

- Keep visual design aligned with GitHub style and Primer principles.
- Prefer Primer-compatible UI patterns (spacing, typography, borders, cards, buttons, labels).
- Keep dark theme variables and styling coherent with GitHub palette already used in this repo.

## Icons and assets

- Use Octicons and font awesome icons that match GitHub's style and are accessible.
- Do not introduce Font Awesome or other icon frameworks.
- Prefer SVG-based Octicons with accessible `alt` text.

## Component and layout consistency

- Maintain visual consistency between sections (same paddings, radii, borders, shadows, and tag styles).
- Keep left sidebar and right content behavior responsive and stable.
- On desktop, preserve sticky sidebar behavior unless explicitly requested otherwise.

## Content structure and storytelling

- Keep section order optimized for quick profile scanning:
  1. About
  2. Skills
  3. Experience
  4. Talks / Projects / Education / Contact
- Preserve concise, scannable headings and call-to-action buttons.

## Change safety

- Avoid broad visual rewrites unless explicitly requested.
- Make small, targeted UI changes and keep existing style tokens/classes when possible.
- If a new pattern is needed, reuse existing CSS conventions before creating new variants.
