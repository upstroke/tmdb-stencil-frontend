# Testing

After a code change, explain exactly how to verify it.

For route changes, include:

- The exact hash-based URL to open
- The expected UI or behavior
- The files changed
- Any edge cases to test

Example:

- URL: http://localhost:3333/#/details/invalid/123
- Expected: “Seite nicht gefunden” / “Die angeforderte Seite existiert nicht.”

## Definition of done

A code change is complete only when the coding agent reports:

1. Files changed
2. Purpose of each change
3. Exact verification steps
4. Expected result
5. Edge cases considered
6. Any known limitations

For route changes, include the exact hash-based URL.
For UI changes, include the visible expected result.
For data changes, include the API response or state that should change.

Do not describe a change as complete without these details.
