# Tidy Docs

Scan `../docs/` for files that don't follow the naming convention (`YYYY-MM-DD-type-descriptive-title.md`) and rename them correctly.

Use when docs have been added externally (e.g., from Claude Cowork) and need to be organized.

## Steps

1. **Scan** all markdown files in `../docs/` subdirectories:
   ```bash
   find ../docs -name "*.md" -not -name "README.md" | sort
   ```

2. **Flag** any file that doesn't match the pattern: `YYYY-MM-DD-<type>-<descriptive-title>.md`
   - Valid types by folder:
     - `docs/decisions/` → `decision`
     - `docs/devlog/` → `devlog`
     - `docs/roadmap/` → `roadmap`
     - `docs/research/` → `research`
     - `docs/diagrams/` → `diagram`
     - `docs/learnings/` → `learning`
     - `docs/specs/` → `prd`, `spec`, `data-model`
     - `docs/architecture/` → `architecture`, `prompt-arch`
   - The regex to check: `^\d{4}-\d{2}-\d{2}-.+\.md$`

3. **For each misnamed file**, read it to determine:
   - What type it is (from content, not just folder)
   - A good descriptive slug (from title/content)
   - The correct date (check file content for a date field, fall back to file modification date via `stat`, fall back to today)

4. **Show the user a rename plan** before executing:
   ```
   RENAME PLAN:
   docs/specs/auth-middleware.md → docs/specs/2026-03-13-prd-auth-middleware.md
   docs/learnings/supabase-rls.md → docs/learnings/2026-03-10-learning-supabase-rls-gotchas.md
   ```

5. **Wait for confirmation**, then rename with `git mv` (if tracked) or `mv`.

6. **Update** `docs/README.md` index if it exists.

## Rules
- NEVER rename `README.md` or `MEMORY.md`
- NEVER move files between folders — only rename within the same folder
- If a file already follows the convention, skip it
- Always show the plan before executing — never auto-rename
- Use `date +%Y-%m-%d` for today's date when no date can be inferred
