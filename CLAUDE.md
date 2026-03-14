# Agentic Data Stack Website

Community-driven content platform exploring how modern data stacks evolve to serve AI agents. Targeting data engineers and data team leaders.

**Live site**: https://agenticdatastack.org

## Tech Stack

- **Framework**: Next.js 16.1.6 (static export, `output: "export"`)
- **Language**: TypeScript 5, React 19
- **Styling**: Tailwind CSS 4, `@tailwindcss/typography` for prose
- **Content**: Markdown/MDX files in `content/`, parsed with `gray-matter` + `next-mdx-remote`
- **Code highlighting**: `rehype-pretty-code` + `shiki` (theme: `github-dark-dimmed`)
- **Hosting**: Static files (GitHub Pages via CNAME), no server runtime
- **Newsletter backend**: Cloudflare Worker → Buttondown API (key server-side only)

## Build & Dev

```bash
npm run dev          # dev server
npm run build        # static export to out/
npx serve out        # preview static build locally (no `next start` — static export)
```

## Architecture

```
app/                    Next.js App Router pages
  blog/                 Blog listing + [slug] post pages
  newsletter/           Newsletter archive + [slug] issue pages
  resources/            Resource hub + [category] + [category]/[slug]
components/             React components
  blog/                 BlogCard, TableOfContents
  newsletter/           NewsletterCard, SubscribeForm
  resources/            CategoryCard, ToolCard, ToolInfoPanel, AgentBadges, etc.
content/                Markdown/MDX content (source of truth)
  blog/                 Blog posts (.md/.mdx, one file per post)
  newsletter/           Newsletter issues (.md, named by date: 2026-03-14.md)
  resources/            Tool docs organized by category (_index.mdx + tool.mdx per folder)
lib/                    Content loading & utilities
  blog.ts               getAllBlogPosts, getBlogPostBySlug, etc.
  newsletter.ts         getAllNewsletterIssues, getNewsletterBySlug, etc.
  resources.ts          getResourceBySlug, getResourcesByCategory, etc.
  categories.ts         Hardcoded tool registry (name, MCP/CLI support, agent skills)
  mdx.ts                Shared MDX compilation with remark/rehype plugins
  reading-time.ts       Word count based reading time
api/
  subscribe-worker.ts   Cloudflare Worker proxy for Buttondown subscribe API
```

## Three Content Pillars

### 1. Blog (`/blog`, `/blog/[slug]`)
- Deep-dive articles on agentic data architecture
- Content in `content/blog/` — one `.md` or `.mdx` file per post
- Frontmatter: `title`, `description`, `date`, `author`, `keywords`, `tags`, `image`, `draft`
- `.md` files use `format: "md"` in MDXRemote to avoid JSX parsing issues with `<` characters

### 2. Newsletter (`/newsletter`, `/newsletter/[slug]`)
- Curated weekly digest of data infrastructure news
- Content in `content/newsletter/` — files named by date (e.g., `2026-03-14.md`)
- Frontmatter: `title`, `description`, `date`, `issue` (number), `tags`, `draft`
- Body structured in sections: Top Stories, Tools & Releases, Community, Worth Reading
- Crawler integration: crawler writes `draft: true` files, human curates then sets `draft: false`
- Subscription via Cloudflare Worker → Buttondown API. Env: `NEXT_PUBLIC_SUBSCRIBE_API_URL`

### 3. Resources (`/resources`, `/resources/[category]`, `/resources/[category]/[slug]`)
- Living wiki of agentic data stack tooling — 7 categories, 27+ tools
- Tool metadata in `lib/categories.ts` (structured data: MCP support, CLI support, agent skills)
- Tool documentation in `content/resources/[category]/[tool].mdx`
- Category overviews in `content/resources/[category]/_index.mdx`

## Key Patterns

- **Content loading**: `lib/*.ts` files read from `content/` using `fs` + `gray-matter`. Follow `lib/resources.ts` pattern for new content types.
- **Static generation**: All pages use `generateStaticParams()` for static export. No runtime server.
- **SEO**: Each page has `generateMetadata()`. Structured data (JSON-LD) for blog posts (`BlogPosting`) and tools (`SoftwareApplication`). Global OG/Twitter metadata in `app/layout.tsx`.
- **Dark theme**: CSS variables in `globals.css` — `--background: #030712`, `--accent: #7c3aed` (violet). Gradient accents: violet-to-blue.
- **Markdown format detection**: Blog/newsletter track file extension (`.md` vs `.mdx`) via `format` field. Pass to `MDXRemote` options to avoid JSX parsing errors in plain markdown.

## Adding Content

**New blog post**: Create `content/blog/my-post.md` with frontmatter, rebuild.

**New newsletter issue**: Create `content/newsletter/YYYY-MM-DD.md` with frontmatter (`issue: N`, `draft: false`), rebuild.

**New resource tool**: Add to `lib/categories.ts` tools array, optionally create `content/resources/[category]/[tool].mdx`, rebuild.

## Environment Variables

```
NEXT_PUBLIC_SUBSCRIBE_API_URL    # Cloudflare Worker URL for newsletter subscribe
```

Buttondown API key is stored as a Cloudflare Worker secret (`BUTTONDOWN_API_KEY`), never exposed to the client.
