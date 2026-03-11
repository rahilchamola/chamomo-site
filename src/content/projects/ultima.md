---
title: "Ultima"
subtitle: "The last productivity app"
date: 2026-02-23
status: active
featured: true
image: "/images/projects/ultima.svg"
description: "A unified productivity system built for ADHD — four native modules (todo, habits, journal, calendar) sharing one database so an AI layer has complete context. The thesis: one system with full context beats ten systems with perfect features."
links: {}
tech:
  - next.js
  - supabase
  - claude-api
  - prisma
tags:
  - ai
  - productivity
  - adhd
---

## What Ultima Is

Ultima is a single productivity app with four native modules — todo engine, habit tracker, journal, and calendar — all running on one database. An AI context assembler reads your state across all four modules and answers one question: *what should I do right now?*

## The Thesis

Every productivity app I've tried has failed for the same structural reason: they're federated, not unified. Todoist doesn't know about your journal. Day One doesn't know about your calendar gaps. No integration layer can synthesize across data it can't read.

Ultima bets that one system with complete context beats ten systems with perfect features. Each module is deliberately simpler than its dedicated competitor — because the value is in what happens when all four share a database.

## ADHD-First Design

Every design decision has an ADHD reason. One active task (not an infinite list). Frequency over streaks (71% consistency, no reset). AI-generated journal prompts (no blank page paralysis). Calendar as context lens (not a replacement for Google Calendar).

The system is designed for worst-self, not best-self. The version of you that's depleted, scattered, and has twelve browser tabs open — that's who Ultima is for.

## Writing

I wrote a 3-part series documenting the thesis, architecture, and PM lessons from building Ultima:

- [Part 1: The Last One](/writing/2026-02-23-building-ultima-the-last-one/)
- [Part 2: Four Engines, One Brain](/writing/2026-02-23-building-ultima-four-engines/)
- [Part 3: Lessons from Building Your Own OS](/writing/2026-02-23-building-ultima-lessons/)
