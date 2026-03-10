---
title: "Build a Personal API"
date: 2025-12-15
tags: [building, identity, technology, meta]
status: mature
description: "What if your personal brand had an API? Structured data about what you're working on, thinking about, and available for — queryable by anyone."
---

Most personal websites are static billboards. What if they were queryable interfaces?

A personal API would expose structured endpoints:
- `/now` — what I'm currently working on (auto-synced from my task manager)
- `/writing` — recent posts with tags and summaries
- `/available` — what kinds of collaborations I'm open to
- `/stack` — current tools, technologies, and workflows
- `/interests` — weighted list of current interests

This isn't just a vanity project. It's a **discoverability** tool. Recruiters, collaborators, and fellow builders could query structured data about me instead of parsing a LinkedIn profile.

**Implementation:** Jekyll already generates JSON feeds. Extend the site with a `/api/` endpoint that serves structured JSON for each collection. Add a simple search endpoint.

**Status:** Partially implemented — this site's collections are essentially the data model. The API layer is the remaining work.

This idea has graduated from "interesting thought" to "thing I'm actually building." See the [Chamomo Site project](/projects/chamomo-site/) for implementation status.
