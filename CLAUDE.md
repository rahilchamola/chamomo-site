# CLAUDE.md — Chamomo Site

> Instant context for any Claude session editing this site.

## Project Setup
- **Dev:** `npx astro dev`
- **Build:** `npx astro build`
- **Preview:** `npx astro preview`
- **Docs:** `../docs/` (decisions, learnings, devlogs, specs, prompts, research, retros)

## What This Is
Personal website for Rahil Chamola (Chamomo). Built with **Astro 5.7** + React 19 islands. Deployed on **Vercel**. Covers writing (essays + series), projects, ideas, DJ content.

**URL:** chamomo.vercel.app
**Repo:** github.com/rahilchamola/chamomo-site
**Branch workflow:** Edit on `draft` → preview → merge to `master` to ship

## Brand in One Line
"Remix artist across domains — AI, music, product, building. Makes technology feel human."

## Editing Skill
If the `chamomo-editor` skill is available, USE IT. It has the full voice guide, site structure reference, and the draft-branch workflow baked in. It's the right way to edit this site.

## Quick Reference

### New blog post
`src/content/posts/YYYY-MM-DD-slug-title.md` (or `.mdx` for interactive components)

Required frontmatter: title, date, categories, tags, description, image
Optional: series, part, totalParts, nextSlug, prevSlug, draft

### New project
`src/content/projects/project-slug.md`

Required: title, date
Optional: subtitle, status (active/completed/paused/archive), featured, image, description, links, tech, tags

### New idea
`src/content/ideas/idea-slug.md`

Required: title, date
Optional: tags, status (seed/growing/mature), description

### New DJ entry
`src/content/dj/entry-slug.md`

Required: title, date
Optional: type (set/playlist/recap), venue, duration, description, image, tags, soundcloud

## Content Conventions
- Categories: ai, creativity, product, music, building, thinking
- Tags: lowercase, hyphenated. Check existing tags before inventing new ones.
- Images: `public/images/<section>/` — SVG preferred, 800x420 viewBox
- File names: lowercase, hyphenated, date-prefixed for posts

## Architecture
```
src/
├── content/           # Collections: posts, projects, ideas, dj
├── content.config.ts  # Collection schemas (Zod)
├── pages/             # Routes (.astro files, [...id] for dynamic)
├── layouts/           # BaseLayout.astro (master wrapper)
├── components/
│   ├── astro/         # Card, Nav, Footer
│   ├── blog/          # 20+ React islands for interactive post content
│   └── react/         # HeroScene homepage animation
├── styles/
│   └── global.css     # Design system (CSS custom properties, 937 lines)
└── data/              # JSON data files (timeline, growth metrics)
```

## Build & Deploy
- **Build:** `npx astro build` (static output)
- **Dev:** `npx astro dev`
- **Platform:** Vercel (auto-deploys from master, preview deploys from branches)
- **Build workaround:** rsync to /tmp, npm install, build there (avoids Vite EPERM on mounted FS)

## Design System
- Dark theme: `--bg-primary: #0a0b10`
- Category colors: ai=#a855f7, creativity=#f472b6, product=#06b6d4, music=#fb923c, building=#34d399, thinking=#818cf8
- Fluid typography: clamp() scale from --text-xs to --text-5xl
- Fonts: Inter (body), JetBrains Mono (code)

## Don't Touch Without Asking
- `astro.config.mjs` — build configuration
- `src/content.config.ts` — collection schemas
- `src/layouts/BaseLayout.astro` — master layout
- Routing patterns in `[...id].astro` files
- `package.json` dependencies

## File Organization
This project follows the Vibe Coder OS standard:
- Code lives in this folder (src/, public/, config files)
- Private docs live in ../docs/ (not committed to git)
- Assets for the site go in public/images/<section>/
- Temporary work and drafts go in ../docs/specs/ or ../docs/devlogs/

## Skills Available
- /decode — Explain code, commands, and architecture decisions
- Custom skills in .claude/skills/ if created

## Session Discipline
- /clear between unrelated tasks
- /compact at ~80% context usage
- Commit after every logical unit (conventional commits)
- Save learnings to ../docs/learnings/ when something non-obvious comes up
