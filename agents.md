# AGENTS.md

## Project

TMDB Stencil Frontend: a Stencil-based frontend for browsing TMDB movies and
TV shows.

## Mandatory startup reading

At the start of every task, read the following files completely, in this
order:

1. `README.md`
2. `package.json`
3. Every Markdown file in `.clinerules/`

Do not begin planning, editing files, creating files, or running commands
until all required files have been read.

After reading, briefly confirm:

- Which files were read
- The project name and relevant scripts from `package.json`
- Any active rules from `.clinerules/` that affect the current task

If a required file does not exist, state that clearly and continue with the
remaining files.

Reading these files does not count as a broad repository analysis.


## Workflow

For every non-trivial task:

1. Understand the requested outcome.
2. If the relevant files are unknown, use XERJ first.
3. Read only the files needed to understand the task.
4. State a short implementation plan.
5. Wait for approval before changing files.
6. Implement the smallest possible change.
7. Report the changed files and behavior.

Do not begin a broad repository analysis unless the user asks for one.

## XERJ

Use XERJ when you do not know where code, a symbol, route, API call, or
documentation lives.

Use `xerj_search` with a simple string query:

```json
{
  "index": "ax-docs",
  "query": "<SEARCH_TERM>",
  "size": 3,
  "max_tokens": 1000
}
```

Rules:

- `query` must be a plain string.
- Do not use a JSON object for `query` unless explicitly requested.
- Use short, concrete terms such as `details route`, `media type`, or
  `invalid id`.
- Perform at most three XERJ searches per normal task.
- Do not repeat an identical search.
- If results are not useful, read the most likely relevant file directly.
- After a search, stop and summarize the relevant file paths and line ranges
  before reading more files.

Do not use XERJ when the user names a specific file or provides the exact
change. Read that file directly instead.

## Routing

Routing is implemented in:

- `src/components/app-root.tsx`
- `src/components/app-outlet.tsx`
- `src/lib/router/router.ts`
- `src/types/router.ts`

The existing invalid-route UI is rendered directly in
`src/components/app-outlet.tsx` when no route matches.

For routing, media-type, or invalid-ID problems, inspect `app-outlet.tsx`
before creating a new component, route, or error page.

## Code generation

Before changing code:

1. Find similar existing implementations.
2. Read the relevant files.
3. Follow existing patterns for structure, TypeScript, naming, comments,
   styling, and error handling.
4. Reuse existing components, helpers, types, and routes.
5. Make the smallest change that fulfills the task.
6. Match the surrounding formatting and quotation style.
7. Do not introduce a new pattern when an existing one fits.

## Restrictions

- Do not modify unrelated files.
- Do not modify `README.md` unless explicitly asked.
- Reading `README.md` during mandatory startup reading is allowed.
- Do not run shell commands, install dependencies, or start servers unless
  explicitly asked.
- Do not create duplicate components, routes, utilities, or error pages.
- Do not present assumptions as facts.

## Reporting

After changing code, provide:

- Changed files
- Purpose of each change
- Relevant line ranges
- Assumptions
- Suggested verification steps

Keep the report short.

## Development server

Do not start, restart, or stop the development server unless the user
explicitly asks for it.

If a port is already in use, assume an existing development server may be
running. Ask the user for the current URL instead of running additional
process or port diagnostics.

## Testing routes

This app uses hash-based routing.

Always test routes using this URL form:

http://localhost:3333/#/<route>

Examples:

- Valid route: `http://localhost:3333/#/details/tv/412341`
- Invalid media type: `http://localhost:3333/#/details/invalid/123`
- Unknown route: `http://localhost:3333/#/does-not-exist`

Do not place a route path before the hash.
Do not append another `#/...` fragment after a test route.
