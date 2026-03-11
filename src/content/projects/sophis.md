---
title: "Sophis"
subtitle: "Signal intelligence, not information overload"
date: 2026-02-24
status: active
featured: true
image: "/images/projects/sophis.svg"
description: "A personal signal intelligence tool that separates browsing from interpreting. Two-pass AI architecture: one model retrieves, another classifies into ALERT / SIGNAL / INSIGHT. Named after the Greek word for wisdom because tracking was never the point — understanding is."
links: {}
tech:
  - node.js
  - express
  - openai-api
  - prisma
  - sqlite
tags:
  - ai
  - signal-intelligence
---

## What Sophis Is

Sophis is a personal intelligence tool that monitors domains you care about and classifies what it finds into three tiers: ALERT (stop what you're doing), SIGNAL (note this, it's building), and INSIGHT (the pattern is visible now).

The core unit is a Listener — a named piece of structured curiosity with a learning goal attached. Not "track fintech" but "what developments should change how I think about credit product design?"

## The Two-Pass Architecture

Browsing and interpreting are different cognitive tasks that conflict. Sophis runs two AI passes: one retrieves grounded, source-aware facts. The other classifies against your Listener's context. The separation is what makes the output trustworthy.

## The Naming

σοφία — Greek for wisdom. Not knowledge, not data. The tool is named for what you're supposed to walk away with: practical understanding that demands a decision, not just acknowledgment.

## Writing

I wrote a 3-part series documenting the philosophy, architecture, and PM lessons from building Sophis:

- [Part 1: Why Sophis](/writing/2026-02-24-building-sophis-why/)
- [Part 2: How Sophis Thinks](/writing/2026-02-24-building-sophis-how-it-thinks/)
- [Part 3: What Building Sophis Taught Me About PM](/writing/2026-02-24-building-sophis-pm-lessons/)
