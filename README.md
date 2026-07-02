# Saints Peter & Paul — Website Redesign Mockup

This is a **design mockup**, not the live SSPP website. It's built as static HTML/CSS/JS so the
Communications Committee can browse it like a real site during meetings, and so Claude (or any
contributor) can keep editing it page by page as decisions are made.

🔗 **Live mockup:** once this repo is connected to GitHub Pages, it will be available at: 
`https://<your-username>.github.io/<repo-name>/`

## How to view it locally 

No build step needed — it's plain HTML/CSS/JS.
 
1. Download or clone this repo
2. Open `index.html` directly in a browser, **or**
3. For the most accurate experience (especially mobile nav), run a local server:
   ```
   npx serve .
   ```
   or, with Python:
   ```
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000`

## How to publish on GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Under "Build and deployment," set **Source** to "Deploy from a branch"
4. Choose the `main` branch and `/ (root)` folder
5. Save — your mockup will be live in a minute or two at the URL GitHub provides

## What's built so far

- [x] Homepage (`index.html`)
- [x] Navigation + footer (shared across all pages)
- [ ] Visit page
- [ ] About page
- [ ] Get Involved (ministries hub)
- [ ] Calendar / Events page
- [ ] Contact page
- [ ] Give page
- [ ] Sacraments detail pages

## File structure

```
/
├── index.html              Homepage
├── css/
│   ├── main.css            Shared design tokens, nav, footer, buttons
│   └── home.css            Homepage-only styles
├── js/
│   └── main.js             Mobile nav toggle
├── images/                 Real photos go here once selected
└── PHOTO-SHOTLIST.md        What photos are needed and where
```

## Important — this is a mockup

- **Brown/gold gradient blocks** throughout the site are photo placeholders. Each one has a
  caption describing exactly what photo should go there (see `PHOTO-SHOTLIST.md`).
- **All links currently go to other mockup pages or "#"** — nothing connects to real systems yet
  (no real calendar data, no real giving platform, no real form backend).
- Colors, fonts, and spacing are all controlled from `css/main.css` — change a value there and
  it updates across every page at once.

## Design tokens (current palette)

| Token | Hex | Use |
|---|---|---|
| `--navy-deep` | `#122740` | Header, footer, dark sections |
| `--navy` | `#1B3A5C` | Secondary dark, gradients |
| `--gold` | `#D4AF6A` | Primary accent — buttons, highlights (soft champagne gold) |
| `--gold-deep` | `#A8763E` | Icons, borders |
| `--cream` | `#FBF7EF` | Page background |
| `--offwhite` | `#FAF8F4` | Alternating section background |

## Navigation structure

`Visit · About · Get Involved · Calendar · Contact` + a standalone **Give** button.

Dropdowns are intentionally avoided on top-level nav items — every link is one click from the
homepage to its destination page, per committee feedback on the old site's overly nested menus.
