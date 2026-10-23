# Project rules

- This is a Stencil web-components project for browsing TMDB movies and TV shows.
- The app uses hash-based routing.
- Test routes using: http://localhost:3333/#/<route>
- Do not place route paths before the hash.
- Do not append another `#/...` fragment after a test route.
- Make the smallest possible change.
- Do not modify files outside the explicitly allowed scope.
- Do not create duplicate components, routes, utilities, or error pages.
- Do not run shell commands, install dependencies, or start servers unless explicitly requested.

## Task scope

- Treat each user request as a narrowly scoped task.
- If a request is ambiguous, ask one clarifying question before acting.

## Documentation tasks

- If the user asks to update README.md, AGENTS.md, or another Markdown file,
  treat it as documentation-only.
- Do not read or modify source code unless explicitly asked.
