# Local CLI tools

Local CLI tools are optional and complement XERJ.

Use XERJ first when the location of code, a symbol, route, API call, or
documentation is unknown.

After XERJ identifies likely files, use local tools for precise inspection:

- `rg` for exact text, symbol, route, and error-message searches
- `fd` for file and directory lookup
- `fzf` for interactive filtering
- `bat` for readable file output
- `delta` for readable Git diffs
- `sd` only for narrowly scoped, approved text replacements

If these tools are unavailable, use `grep`, `find`, `cat`, `less`, and
`git diff` instead.

Do not install optional tools unless explicitly asked.
Do not treat the absence of an optional tool as an error.
