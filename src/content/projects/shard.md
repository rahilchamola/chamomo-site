---
title: "Shard"
subtitle: "AI-powered narrative RPG engine where the LLM is the game engine, not the game"
date: 2026-03-10
status: active
featured: true
image: "/images/projects/shard.svg"
description: "A solo-built narrative RPG where AI generates every character, relationship, quest, and consequence in real-time. 134K+ lines of TypeScript, 21 worlds, 14 versions. Designed first, generated second."
links:
  live: https://playshard.app
tech: [typescript, next.js, multi-model-ai, vercel]
tags: [ai, gaming, product, vibe-coding, building]
---

## What Shard Is

Shard is a narrative RPG where the AI isn't a chatbot you talk to. It's the engine that runs the game. Every NPC has memory, relationships evolve across six axes, quests emerge from context, and consequences cascade through a unified effect system. No scripted dialogue trees. No hardcoded loot tables. The AI generates it all, governed by pure functions that keep it coherent.

## The Core Bet

The AI storytelling space is stuck between two bad poles: rigid visual novels where every path is pre-written, and open-ended chatbots where nothing matters. Shard is the third option. Structure without scripting. Freedom without chaos.

The bet: design the entire game system in TypeScript interfaces before writing a single AI prompt. Strip the LLM and you should still understand what the game is. 33 interfaces defined every relationship axis, every effect type, every world structure before a line of AI code existed.

## Architecture (High Level)

A multi-model architecture where different AI models handle different jobs. One model makes game design decisions (cold, structured). Another writes the narrative (warm, creative). A coherence stack of five layers ensures the AI can't contradict itself, forget deaths, or hallucinate NPCs into the wrong room.

Everything that happens in the game is an effect. A sword swing and a love confession use the same pipeline. This means any new game mechanic is just a new effect type, not new architecture.

## The Build

12 design sessions before the first git commit. Then an 8-day sprint taking the engine from v0.9 to v0.12.3. 125 commits. 21 worlds (10 developer-built, 11 user templates). 54+ effect types. Director personas that shape narrative style. An identity engine that tracks who you're becoming, not just what you've done.

## Writing

I wrote a 5-part series documenting how Shard was built, the architecture decisions, what I killed, and what I learned about vibe-coding a real product as a solo builder.

- [Part 1: The Bet](/writing/2026-03-10-building-shard-the-bet/)
- [Part 2: Brain and Body](/writing/2026-03-10-building-shard-architecture/)
- [Part 3: The Sprint Log](/writing/2026-03-10-building-shard-timeline/)
- [Part 4: What I Killed](/writing/2026-03-10-building-shard-decisions/)
- [Part 5: 10 Lessons](/writing/2026-03-10-building-shard-lessons/)
