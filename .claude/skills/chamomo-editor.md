# Chamomo Editor

Use when editing, creating, or refining content for chamomo-site. This is the definitive skill for all site content work — blog posts, projects, ideas, DJ entries, and page copy.

## Voice Guide

Rahil's writing voice has these characteristics — match them precisely:

**Tone**: First person, conversational but precise. Never academic. Never corporate. Confident without being arrogant.

**Structure**:
- Lead with a provocative claim or personal observation, not a definition
- Short paragraphs (2-3 sentences max)
- Use bold for key phrases that carry the argument: "the magic is in the **transform** step"
- Numbered lists for processes/methods, bullet lists for examples
- H2 sections that read like standalone arguments, not chapters

**Signature patterns**:
- Cross-domain connections: "When I apply DJ set structure to blog post pacing, that's a remix."
- Direct address: "Most people stop at copying. The magic is in the transform step."
- Reframing: Take a common concept and show it from an unexpected angle
- Closing with the brand tie-back: connect back to "remix," "building," or "making technology feel human"

**What to avoid**:
- Motivational fluff ("You can do it!", "The possibilities are endless")
- Hedging language ("I think maybe", "it could be argued")
- Generic AI voice (no "in today's fast-paced world", "leverage", "utilize")
- Explaining obvious things — Rahil's audience is smart
- Emojis in body copy (okay in frontmatter tags)

**AI co-creation stance**: Rahil is transparent about using AI as a production partner. The thesis, perspective, and taste are always his. Claude handles structure, prose, transitions. This is "perspective injection" — not prompting.

## Content Creation Workflow

### 1. Branch first
Always work on the `draft` branch. If not already on it:
```
git checkout -b draft || git checkout draft
```

### 2. Create the file
Use the correct path and naming convention:

| Type | Path | Naming |
|------|------|--------|
| Post | `src/content/posts/` | `YYYY-MM-DD-slug-title.md` (or `.mdx` for interactive) |
| Project | `src/content/projects/` | `project-slug.md` |
| Idea | `src/content/ideas/` | `idea-slug.md` |
| DJ | `src/content/dj/` | `entry-slug.md` |

### 3. Frontmatter templates

**Post:**
```yaml
---
title: ""
date: YYYY-MM-DD
categories: []  # ai, creativity, product, music, building, thinking
tags: []        # lowercase, hyphenated, check existing first
description: ""
image: "/images/posts/slug.svg"
draft: false
# series: ""    # optional: series name
# part: 1       # optional: part number
# totalParts: 5 # optional
# nextSlug: ""  # optional
# prevSlug: ""  # optional
---
```

**Project:**
```yaml
---
title: ""
date: YYYY-MM-DD
status: active  # active, completed, paused, archive
featured: false
description: ""
# subtitle: ""
# image: "/images/projects/slug.svg"
# links: { github: "", live: "", demo: "" }
# tech: []
# tags: []
---
```

**Idea:**
```yaml
---
title: ""
date: YYYY-MM-DD
status: seed  # seed, growing, mature
# description: ""
# tags: []
---
```

**DJ:**
```yaml
---
title: ""
date: YYYY-MM-DD
type: set  # set, playlist, recap
# venue: ""
# duration: ""
# description: ""
# image: "/images/dj/slug.svg"
# tags: []
# soundcloud: ""
---
```

### 4. Categories and tags
**Categories** (pick 1-2): ai, creativity, product, music, building, thinking
**Tags**: Always check existing tags first with:
```
grep -rh "^tags:" src/content/posts/ | sort -u
```
Reuse existing tags before inventing new ones. Lowercase, hyphenated.

### 5. Images
- Go in `public/images/<section>/` (posts, projects, dj, ideas)
- SVG preferred, 800x420 viewBox
- Dark theme compatible (use category colors from design system)

### 6. Interactive content (MDX)
If the post needs interactive components (charts, timelines, decision cards):
- Use `.mdx` extension
- Import React islands from `src/components/blog/`
- Wrap in `client:visible` for lazy loading
- Check existing components before building new ones — there are 23+ already

### 7. Preview and ship
```bash
npx astro dev          # preview locally
git add <files>
git commit -m "feat: add post — slug-title"
git push origin draft  # triggers Vercel preview deploy
```
When ready to ship: merge `draft` → `master` (triggers production deploy).

## Editing existing content
- Read the file first, always
- Match the existing voice — don't "improve" prose into generic AI voice
- Preserve frontmatter structure exactly
- If editing a series post, check consistency with other parts (nextSlug, prevSlug, totalParts)

## Content strategy reference
- **Building Series**: Deep project breakdowns (Shard, Ultima, Sophis, Ritmos)
- **Frameworks**: Product thinking, ADHD systems, AI collaboration methods
- **Music**: DJ sets, remix philosophy, attention design
- **Meta**: How the site works, AI transparency, building in public
