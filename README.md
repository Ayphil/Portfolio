# Emmanuel Cyr — Game design portfolio

The bilingual portfolio for Emmanuel Cyr, focused on UX, systems, and
technical design for games.

## Project layout

- `app/` contains the portfolio pages, case studies, language switcher, and
  shared styles.
- `public/` contains the source media and downloadable portfolio assets.
- `scripts/build-github-pages.mjs` rebuilds the static GitHub Pages output.
- `tests/` contains the rendered-page checks used by `npm test`.

## Local development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run build
npm test
npm run lint
```

To refresh the static files used by GitHub Pages:

```bash
npm run build:github-pages
```

The site is intentionally public and does not include an account or admin
surface.
