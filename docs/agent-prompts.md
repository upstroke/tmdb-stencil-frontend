# Agent prompt templates

Reusable prompts for Cline and other AI coding agents.

Replace placeholders in angle brackets before using a template.

## General task

```text
TASK: <one-sentence goal>

SCOPE:
- Allowed files: <files>
- Forbidden files: <files>

CONSTRAINTS:
- Make the smallest possible change.
- Do not refactor unrelated code.
- Do not create new files unless explicitly requested.
- Wait for approval before editing.

ACCEPTANCE CRITERIA:
- <verifiable outcome>

OUTPUT:
- Show a short plan first.
- Wait for approval.
- After implementation, show changed files and verification steps.
```

## Bug fix

```text
TASK: Fix <bug description>.

SCOPE:
- Allowed files: <files>
- Forbidden files: <files>

STEPS:
1. Read the relevant files.
2. Identify the root cause.
3. Show the root cause, proposed minimal fix, files to change, and verification steps.
4. Wait for approval.
5. Implement only the approved fix.
6. Show the diff and verification steps.

ACCEPTANCE CRITERIA:
- <expected behavior>
- Existing behavior for valid cases remains unchanged.
```

## Documentation update

```text
TASK: Update <Markdown file>.

SCOPE:
- Allowed files: <Markdown file>
- Forbidden files: all source files

STEPS:
1. Read the target file.
2. Show the relevant section with line numbers.
3. State the exact change.
4. Wait for approval.
5. Make only the approved change.
6. Show the changed section.

CONSTRAINTS:
- Documentation-only task.
- Do not modify source code unless explicitly requested.
```

## Review uncommitted changes

```text
TASK: Review the current uncommitted changes.

CONSTRAINTS:
- Do not modify files.
- Do not run shell commands unless explicitly requested.

STEPS:
1. Run git status --short.
2. Run git diff.
3. For each changed file, explain:
   - Purpose
   - Potential bugs or edge cases
   - Whether it follows existing project patterns
   - Suggested verification steps
4. Ask whether I want a fix or commit message.
```

## Create a Stencil component

```text
TASK: Create a Stencil component for <purpose>.

SCOPE:
- Allowed files: <files or directories>
- Forbidden files: <files>

STEPS:
1. Find a similar existing component.
2. Follow its structure, naming, TypeScript types, styling, and events.
3. Reuse existing helpers and design patterns.
4. Show a short implementation plan.
5. Wait for approval.
6. Implement the component.
7. Explain how to verify it in the browser.

ACCEPTANCE CRITERIA:
- <expected UI or behavior>
- No duplicate component, route, utility, or global state pattern is created.
```
