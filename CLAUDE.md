# CLAUDE.md — Chamomo Astro Site

> This file gives Claude instant context about this site.

## What This Is
Personal website for Rahil Chamola (Chamomo). Built with Jekyll. Covers writing, projects, DJ content, ideas/notes.

## Brand in One Line
"Remix artist across domains — AI, music, product, building. Makes technology feel human."

## Quick Reference

### To create a new blog post:
```
_posts/YYYY-MM-DD-slug-title.md
```
Front matter: layout, title, date, categories, tags, description, image

### To create a new project:
```
_projects/project-name.md
```
Front matter: layout, title, subtitle, date, status, featured, image, links, tech

### To create a new idea:
```
_ideas/idea-slug.md
```
Front matter: layout, title, date, tags, status (seed/growing/mature)

### To create new DJ content:
```
_dj/set-name.md
```
Front matter: layout, title, date, type (set/playlist/recap), venue, duration, soundcloud

## Content Conventions
- Tags: lowercase, hyphenated. Check existing tags before creating new ones.
- Categories: ai, creativity, product, music, building, thinking
- Images: `assets/images/<section>/` — 1200x630 for heroes
- File names: lowercase, hyphenated, descriptive

## Architecture
- `_config.yml` — site settings, collections, defaults
- `_layouts/` — page templates
- `_includes/` — reusable components
- `_data/` — structured data (navigation.yml, social.yml)
- `_sass/` → `assets/css/` — styles
- `pages/` — standalone pages (about, now, contact)

## Deployment
[TODO: Fill in when deployment is configured]
- Platform:
- Repo:
- Build command:
- Domain:

## When Editing
- Always run `bundle exec jekyll serve --livereload` to test locally
- Check front matter syntax (spaces not tabs, quoted strings with colons)
- Update `_data/navigation.yml` if adding new top-level pages
- Update `references/site-context.md` if changing structure

## Don't Touch Without Asking
- `_config.yml` collection definitions
- Layout inheritance chain
- Permalink patterns (breaks existing URLs)
