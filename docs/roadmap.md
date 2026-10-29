# Roadmap

This roadmap tracks planned improvements for the TMDB Stencil Frontend.

Completed items are kept for context. New work should be added as focused, testable tasks.

## Completed

### Architecture and maintenance

- [x] Add type-safe route definitions, route parameters, and route rendering.
- [x] Show the not-found page when a detail route contains an unsupported media type.
- [x] Improve TypeScript type safety for TMDB API responses, store state, and media details.
- [x] Remove remaining `any` types and introduce discriminated movie and TV show types.
- [x] Deduplicate paginated TMDB results by media type and TMDB ID to prevent duplicate cards when trending data changes between page requests.
- [x] Show the existing `not-available.png` placeholder in `default-card` when no poster path is provided.

## In progress

_No active work items._

## Planned

### Architecture and maintenance

- [ ] Review the Stencil migration guide and migrate the project to the current Stencil release.
- [ ] Improve error handling for network failures and unexpected API responses.
- [ ] Preserve loaded trending, movie, and TV show results when navigating between routes.

### Testing and quality

- [ ] Add unit tests for utility functions, the fetch service, and store logic.
- [ ] Add component tests for search, cards, routing, and the custom error page.
- [ ] Add end-to-end tests for browsing trending content, searching, opening details, and handling invalid IDs.
- [ ] Improve accessibility, including keyboard navigation, focus management, ARIA attributes, and screen-reader announcements.

### User experience

- [ ] Add loading and empty states for search results, overview pages, and detail pages.
- [ ] Add responsive design improvements and test common screen sizes, including a mobile navigation menu.
- [ ] Add internationalization support beyond the TMDB request language, including UI labels and date and number formatting.

### Documentation

- [ ] Document the component API, project architecture, and local development workflow in more detail.