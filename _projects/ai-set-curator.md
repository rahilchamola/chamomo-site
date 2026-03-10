---
layout: project
title: "AI Set Curator"
subtitle: "AI-powered DJ set planning tool"
date: 2026-02-01
status: active
featured: true
image: "/assets/images/projects/ai-set-curator.svg"
description: "A tool that connects to BPM Supreme, analyzes track metadata, and suggests energy-curve-optimized setlists. Built with Python and Claude API."
links:
  github: https://github.com/chamomo/ai-set-curator
tech: [python, claude-api, flask, bpm-supreme]
tags: [ai, djing, tools, building]
---

## The Problem

Planning a DJ set takes 2-3 hours of crate digging, key matching, energy mapping, and transition planning. Most of this is mechanical work that follows patterns.

## The Approach

Build a tool that handles the mechanical parts — BPM analysis, key compatibility, energy curve suggestions — so I can focus on the creative decisions: which songs *feel* right together, where to take risks, when to play it safe.

## Current State

Working prototype that:
- Pulls my BPM Supreme crate via browser automation
- Analyzes tracks for key, BPM, energy rating
- Generates energy curve templates based on venue/timeslot input
- Suggests track sequences that follow the energy curve
- Exports to a planning view I can edit

## What's Next

- Real-time crowd feedback integration (pipe audio levels as a proxy for energy)
- Historical set analysis — what worked at similar gigs
- Integration with rekordbox for direct playlist export
