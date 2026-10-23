# Mandatory file reading

Before modifying any file, Cline MUST:

1. Read the exact target file completely using the read_file tool.
2. Show the relevant section verbatim, including line numbers.
3. State what will be changed.
4. Make only the minimal approved change.
5. Show the changed section after editing.

Cline must not rely on conversation history, assumptions, or previous tool
results when deciding whether a change is already implemented.

If the target file is not explicitly allowed by the user, stop and ask.
