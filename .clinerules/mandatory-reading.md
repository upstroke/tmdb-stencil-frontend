# Mandatory file reading

Before modifying any file, Cline MUST:

1. Read the exact target file using the read_file tool.
2. For small files, read the file completely.
3. For larger files, locate the relevant section and show it verbatim,
   including enough surrounding context and line numbers.
4. State exactly what will be changed.
5. Make only the minimal approved change.
6. Show the changed section after editing.

Cline must not rely on conversation history, assumptions, or previous tool
results when deciding whether a change is already implemented.

If Cline believes a requested change already exists, it must still read the
target file and show the relevant code or text as proof.

If the target file is not explicitly allowed by the user, stop and ask.


