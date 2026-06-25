# Photo Shot List — Homepage

This is the list of real photos needed to replace the brown/gold placeholder blocks on the
homepage. As photos come in, save them to `/images/` with the suggested filename, then swap the
`.photo-placeholder` div for a real `<img>` tag (see "How to swap in a real photo" below).

---

## 1. Hero background (video or photo)
**Where:** top of homepage, full-width dark section
**What:** Wide shot from inside the church mid-Liturgy with the congregation visible — not an
empty sanctuary. People sitting/standing, candles lit, ideally during a well-attended service
like Pascha or a feast day.
**Why it matters most:** this is the single highest-impact image on the site. It should look
full and alive, not staged.
**Suggested filename:** `hero-liturgy.mp4` or `hero-liturgy.jpg`

## 2. "Who We Are" section — 3 photos
**Where:** homepage, just under the service-times bar

- **Large vertical (tall):** Coffee hour / fellowship hour — candid shot of people talking,
  ideally someone clearly being welcomed/introduced to someone else.
  `images/welcome-fellowship.jpg`
- **Small (top right):** Close detail shot — hands lighting a candle, an icon corner, something
  intimate and textural.
  `images/welcome-candle.jpg`
- **Small (bottom right):** Kids at Church School or a festival — shows children present and
  engaged.
  `images/welcome-kids.jpg`

## 3. Quote band — 1 photo (circular avatar)
**Where:** gold band below "Who We Are"
**What:** Headshot of a real parishioner, ideally someone who joined relatively recently (the
quote is written from a newcomer's point of view). A casual phone photo is fine — it reads as
authentic.
**Suggested filename:** `images/quote-parishioner.jpg`
**Note:** get this person's permission before using their name/photo, and confirm the quote
wording with them.

## 4. Events — Greek Festival card (large/featured)
**Where:** "What's Happening" section, left/large card
**What:** Best shot from last year's festival — wide crowd shot with food, dancing, or grounds
full of people. Highest-energy image on the page after the hero.
**Suggested filename:** `images/event-festival.jpg`

## 5. Events — Planning Meeting card (small)
**Where:** "What's Happening" section, middle card
**What:** Casual shot of a committee/planning group around a table. Doesn't need to be posed.
**Suggested filename:** `images/event-planning.jpg`

## 6. Events — Youth Sunday card (small)
**Where:** "What's Happening" section, right card
**What:** GOYA or youth group together, ideally mid-activity rather than a lineup photo.
**Suggested filename:** `images/event-youth.jpg`

## 7. Ministries — Youth & GOYA featured card (large)
**Where:** "Ministries & Programs" section, wide card
**What:** Strongest youth group photo available — a real GOYA event, sports, or service
project. Genuine smiles over posed group shots.
**Suggested filename:** `images/ministry-goya.jpg`

---

## Priority order
If only a couple of photos are ready before the next meeting, prioritize:
1. **Hero** (#1) — sets the tone for the entire site
2. **Greek Festival** (#4) — best proof that this is a thriving, current community

---

## How to swap in a real photo

Find the matching `<div class="photo-placeholder ...">...</div>` block in `index.html` and
replace it with an `<img>` tag, for example:

**Before:**
```html
<div class="photo-placeholder photo-placeholder--rust">
  <i class="ti ti-camera ph-icon" aria-hidden="true"></i>
  <div class="ph-label">PHOTO: last year's festival — crowd, food, dancing</div>
  <span class="ev-date-pill">Jun 14–16</span>
</div>
```

**After:**
```html
<div style="position: relative;">
  <img src="images/event-festival.jpg" alt="Crowd enjoying food and dancing at last year's Greek Festival" style="width:100%; height:100%; object-fit:cover; min-height:110px;" />
  <span class="ev-date-pill">Jun 14–16</span>
</div>
```

For the hero video, replace the `.hero-bg-note` div with a `<video>` tag:
```html
<video class="hero-video-bg" autoplay muted loop playsinline poster="images/hero-poster.jpg">
  <source src="images/hero-liturgy.mp4" type="video/mp4">
</video>
```
