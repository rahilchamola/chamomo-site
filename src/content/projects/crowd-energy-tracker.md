---
title: "Crowd Energy Tracker"
subtitle: "Real-time crowd response measurement"
date: 2025-11-01
status: archive
featured: false
image: "/images/projects/crowd-energy-tracker.svg"
description: "An experiment in measuring crowd energy during DJ sets using audio levels, movement detection, and post-set surveys. Promising concept, impractical execution."
links:
  github: https://github.com/chamomo/energy-tracker
tech: [python, opencv, audio-analysis]
tags: [ai, djing, data, experiment]
---

## The Idea

What if you could quantify crowd energy in real-time during a DJ set? Audio levels (cheering, singing along), visual movement (dancing intensity via camera), and self-reported energy (post-set surveys) could create a composite energy score.

## What Happened

Built a prototype that analyzed audio levels and crowd movement from a webcam feed. The audio analysis worked surprisingly well — crowd noise levels correlate strongly with engagement. The video analysis was too noisy in club lighting conditions to be useful.

## Why It's Archived

The practical barriers killed it: setting up cameras at a venue is awkward, the audio analysis requires a dedicated mic pointed at the crowd (not the speakers), and the whole thing adds complexity to what should be a flow state.

The insight survives even if the tool doesn't — I now pay much more attention to crowd audio feedback as a real-time signal, I just do it with my ears instead of a computer.

## Lessons

Not every problem needs a technical solution. Sometimes the best tool is refined human perception.
