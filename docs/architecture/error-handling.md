# Error Handling

## Unknown Routes and Unsupported Media Types

[app-outlet.tsx](../../src/components/app-outlet.tsx) renders the
not-found UI when no route matches the current path.

It also renders this UI when a route uses `app-details` but its
`mediaType` parameter is neither `movie` nor `tv`.

Both cases display:

```text
Seite nicht gefunden
Die angeforderte Seite existiert nicht.
```

These fallback views do not include a home link.

## Detail Lookup States

[app-details.tsx](../../src/components/pages/app-details/app-details.tsx)
renders the detail view according to `AppState.detailsData`:

- `undefined`: Loading state.
- Valid detail data: The detail content is displayed.
- `null`: The entry-not-found view is displayed.

The entry-not-found view shows:

```text
Eintrag nicht gefunden
Die angeforderte Film- oder Serien-ID existiert nicht.
```

It includes a "Zur Startseite" link with the target `/#/`.

## Failed Detail Lookups

[fetchService.ts](../../src/fetchService.ts) first increments the
detail request ID and validates the supplied ID in `getDetails()`.

An ID that does not match the digits-only pattern `/^\d+$/` sets
`detailsData` to `null` and returns without performing the detail lookup.

For valid IDs, `detailsData` is set to `undefined` before the detail
request starts.

For requests handled by `fetchRequestJSON()`:

- HTTP 404 returns `null` directly.
- Other unsuccessful HTTP responses throw an error that is caught,
  returning `null`.
- Caught fetch or JSON parsing errors also return `null`.

After the lookup, missing detail data or a missing/falsy `details.id`
causes `getDetails()` to set `detailsData` to `null`.

## Current Limitation

The detail error UI does not distinguish between an invalid ID,
a missing TMDB entry, and other caught request failures. These cases
lead to the same entry-not-found view, even when the underlying cause
is not a missing entry.
