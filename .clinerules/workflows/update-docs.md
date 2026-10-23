<task_objective>
Update a Markdown documentation file safely and minimally.
</task_objective>

<detailed_sequence_of_steps>
1. Read `.clinerules/00-reading.md`.
2. Read the target Markdown file using the read_file tool.
3. Show the relevant section verbatim, including line numbers.
4. State the exact intended change.
5. Wait for explicit approval.
6. Make only the approved change.
7. Show the changed section after editing.
8. Report the changed file and line range.

Do not read or modify source code unless the documentation change requires it.
Do not modify files outside the explicitly allowed scope.
Do not rely on conversation history or assumptions when deciding whether a
change already exists.
</detailed_sequence_of_steps>
