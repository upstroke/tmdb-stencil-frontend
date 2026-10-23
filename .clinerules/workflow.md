# Workflow rules

## Task scope
- Treat each user request as a narrowly scoped task.
- Do not modify files outside the explicitly allowed scope.
- If a request is ambiguous, ask one clarifying question before acting.

## Code changes
- Make the smallest possible change.
- Do not refactor unrelated code.
- Do not add comments unless asked.
- Do not create new components, routes, or utilities unless explicitly requested.

## Verification
- After a code change, state exactly how to test it.
- Include the exact URL, expected result, and files changed.

## Documentation tasks
- If the user asks to update README, AGENTS.md, or another Markdown file,
  treat it as documentation-only.
- Do not read or modify source code unless explicitly asked.

## Stencil project
- This app uses hash-based routing.
- Test routes as: http://localhost:3333/#/<route>
- Do not place routes before the hash.
