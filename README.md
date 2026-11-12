Sponsored by [Datus.ai](https://datus.ai)

## Designer theme integration (2026-11-12)

`npm run build` exports the current Next.js content, then applies the supplied designer theme and audits internal links. Requires Python 3.9+ (standard library only) in addition to Node. The deployable output remains `out/`; the GitHub Pages workflow is unchanged.

- `npm run dev`: build the designer version and serve it on port 8001.
- `npm run dev:prototype`: original Next.js development view on port 8002, for editing the content/components before rebuilding the designer version.
- Theme source: `scripts/designer-theme/`. Never edit `out/` or `.designer-source/` directly.
- See `docs/DESIGN-MERGE-REVIEW.md` for unresolved event content decisions.
