# North Point Creative — site build handover

**Last updated:** 12 August 2026 (pass 11)
**Live working file:** `index.html` (134 KB) — presented alongside this document
**Original supplied file:** `index-13-3.html` (117 KB)

---

## 1. Read this first if you're resuming

1. Download `index.html` from the outputs panel. **Do this every session.** The
   sandbox filesystem is wiped between sessions — anything not downloaded is gone,
   regardless of what I say I've built.
2. Open it in a browser before asking for more work. Screenshots taken in my
   sandbox do **not** show the real fonts (Google Fonts is blocked there) or your
   local images (not uploaded). What you see will differ from what I see.
3. Paste this file back to me at the start of a new session, or re-upload
   `index.html`, and say "resume from here".

---

## 2. Standing constraints — these never change

- **Wording is frozen.** Not one word of visible copy may change. Every pass is
  verified with an automated diff of the rendered text against the original file.
  It has come back at **zero differences** on every pass so far.
- **No glassmorphism / liquid glass.** Tried, rejected, removed. Do not reintroduce.
- **No AI-house-style motion.** No floating particles, ambient glow pulses,
  shimmer sweeps, click ripples, hover `scale()` growth, or blend-mode cursor rings.
- **No custom cursor.** Removed deliberately.

---

## 3. What has been built

### Pass 1 — de-AI
Fonts swapped: Cormorant Garamond → **Fraunces** (WONK + SOFT axes on, so the
display face uses drawn irregular alternates); Montserrat → **Archivo** (width
axis narrowed on caps rows). Paper stock changed from #FAFAFA to **#EFEEE9**
uncoated. Uniform 0.32em tracking broken up. Stripped: floating particles,
ambient glow, breathing lamp, glass shimmer, loader-bar shimmer, wordmark sheen,
Material ripple, gold halos, `scale(0.95)` reveals, cursor ring.

### Pass 2–3 — hand-made craft
- Section and cover rules are **drawn SVG lines that waver**, not `1px solid`.
- **Crop marks** at the corners of whole blocks (loader trim, hallmark strip, price rack).
- **Imposition sheets:** the hallmark strip and price rack are single ruled sheets
  with 1px gutters — cards read as guillotined from one sheet, not drawn as boxes.
  Hallmark columns are uneven (1.18 / 1 / 0.82) with stepped top margins.
- **Press-sheet loader:** slug top-left, coordinates top-right, the count set
  enormous bottom-left, gate bottom-right, trim frame and corner marks.
- **Index-driven stagger** (`--s` set by JS on `[data-stagger]` rows) replacing
  nine hand-written delay selectors.
- Plaques and the about mount hung a fraction off true.
- Price rack baselines forced to align across all four cards.

### Pass 7 — typesetting
Masthead runs the full measure with rules flanking the diamond. Wordmark set edge
to edge across the column. CREATIVE spaced across the same measure. Body copy
fitted to a real measure; deck split by a column rule.

### Pass 9 — gallery lighting
Each picture light **warms up as its plate enters the viewport**: lamp brightens,
wall halo opens, the wash across the art follows, plaque takes the light. Room
vignettes. Marginal folios. Letterpress press-in on buttons. Ruled colophon in
the footer. Reduced-motion users get the lights simply on.

### Pass 11 — mobile hero fix
Root cause found and fixed. Below 520px the title switches to `white-space:
normal` so the two words can stack — but every letter is its own inline-block,
so "normal" also allowed a break to fall *inside* a word. The fitting script
then measured an already-wrapped word, read it as too narrow, and scaled the
type **up** to fill the measure, which made the wrap worse. A runaway loop.
Fix: `.cover-title .w { white-space: nowrap }` — a word may break from its
neighbour, never from itself. The fitter also now converges over up to three
passes and refuses any size that overflows the measure, so it cannot run away
again. Result at 390px: NORTH and POINT justified to one measure as two flush
lines, CREATIVE spaced to that same measure. Verified at 320, 390, 768, 1440.

### Pass 10 — back matter
FAQ rebuilt as a **catalogue index**: roman numerals hung in the margin, hairline
rules, a fine plus that turns. Drawn connector through the process steps. Method
cards and statement measure tightened.

### Reverted
Passes 4–5 added glassmorphism across the loader and page. Fully removed in pass 6.
No trace remains.

---

## 4. Open items — in priority order

### 4.1 ✅ RESOLVED — mobile hero
Fixed in pass 11, see above. This also closes the long-standing note that the
hero letters weren't centring consistently on mobile — same root cause.

### 4.2 Unverified in a real browser
- Fraunces / Archivo rendering, including the WONK and SOFT axis settings and the
  variable-width fallback link.
- All frames render empty in my sandbox because the local images aren't uploaded.
  The gallery lighting and the drawn glass shading are tuned blind.
- `backdrop-filter` on the nav bar on low-end Android.

### 4.3 Watch item
A CSS utility class setting `position: relative` silently knocked `nav` out of
`position: sticky` **three separate times** during this build. It is correct now.
If anything ever looks misplaced, check that first.

---

## 5. Working agreement — how we avoid this again

**What I cannot do:** I have no visibility into your usage quota. There is no
counter I can read and no warning before a cutoff — the turn simply terminates
mid-work. I cannot proactively tell you that you're running low, and I should not
have implied otherwise.

**What I will do instead:**

1. **Ship after every pass, not at the end of a turn.** Each completed pass gets
   copied to the outputs folder and presented immediately. Work that exists only
   in my working directory is invisible to you and is what got lost last time.
2. **Keep this file current.** It is updated at the end of every pass, so the most
   recent version is always downloadable regardless of where a turn stops.
3. **Read the working file before touching anything** at the start of a session.
   If you say the work is already done, I check the file first rather than
   reaching for the toolkit.

**What you can do:**

- Download `index.html` **and** `HANDOVER.md` at the end of every session.
- If a turn stops dead, your next message should be: *"the turn cut off — read the
  working file and tell me what state it's in before doing anything."*
- If you want a checkpoint at any moment, say **"ship what you have"** and I will
  stop, copy the current file out, and update this document — finished or not.

---

## 6. Verification status of the current file

| Check | Result |
|---|---|
| Rendered wording vs original | 0 differences |
| JS errors, full scroll, desktop | none |
| JS errors, full scroll, mobile | none |
| Page height | 14,788px |
| Desktop layout 1440px | verified by screenshot |
| Mobile layout 320 / 390 / 768px | verified by screenshot |
| Horizontal page overflow | none at any tested width |
| Real fonts | not verified |
| Real images | not verified |
