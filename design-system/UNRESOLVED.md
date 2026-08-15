# Unresolved handoff inconsistencies

Bootstrap audit notes, not approved design decisions. Do not resolve these
without explicit design approval.

- **Typography scale:** `docs/typography.md` documents H1/H2/H3/H4 as
  `clamp(...72px)` / 34 / 25 / 19px, while source section 07 demonstrates
  62 / 48 / 40 / 32px and a 16px body.
- **Logo descriptor:** the source renders dark-background `studio` at
  `#D6D6D6`, but its anatomy note calls it `#8A8A8A`.
- **Logo protection and minimum:** `docs/logo.md` specifies one ring diameter
  of clear space and a 96px minimum; source section 02 describes one ring
  radius, while section 01 labels the horizontal lockup minimum as 140px.
- **Yellow gradient:** `tokens/tokens.css` defines a 135° yellow-to-dark
  gradient. Source section 03 displays a 50° yellow-to-orange gradient.
- **Token coverage/naming:** the source includes `--rv-yellow-100`, which is
  absent from extracted CSS, and calls `#072622` `--rv-teal-200` in its token
  table while the extracted CSS calls it `--rv-teal-100`.
- **Light-mode color drift:** source section 05 uses un-tokenized colors
  including `#7A5A09`, `#FFF4D6`, and `#6FD9CE`, plus `#96204F` where the
  canonical pink-600 token is `#98204F`.
- **Body typography:** the extracted base CSS assigns Plus Jakarta Sans to
  `body`, while the typography guidance assigns Hanken Grotesk to body copy.
- **Action semantics:** pink is described as the only action color, but the
  approved navigation CTA and several default buttons use dark ink surfaces.
  The intended distinction between primary and secondary actions is unstated.
- **State examples:** form examples use pink for valid/error states, while the
  state tokens define teal for valid and red for error.
- **Letter reveal:** the source caption says orange-to-off-white, but its
  keyframe uses pink `#E06A96`.
- **Spacing rule:** the docs prohibit values outside the 4px scale, while
  approved component examples contain many optical values outside that scale.
- **Accessibility review:** the approved pink text `#E06A96` on yellow
  `#FFDA80` badge pair measures about 2.34:1 contrast, below WCAG text
  thresholds. Some source icon/surface pairs are also very low contrast.
- **Motion architecture:** the handoff proposes CSS scroll timelines, but the
  production motion/scroll architecture has not been approved.
- **Reduced motion:** the reference globally disables every animation and
  transition. Production behavior must preserve essential UI state and feedback
  while respecting the reduced-motion preference.
- **Pending content:** photography is placeholder-only and pricing data is not
  approved. CTA treatment on orange-dominant pieces is explicitly unresolved.
