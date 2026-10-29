# TMDB Stencil Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org/)
[![Indexed in XERJ Corpus Hub](https://img.shields.io/badge/XERJ-Corpus%20Hub-blue)](https://hub.xerj.org/contributors/upstroke)

A Stencil-based frontend for browsing trending movies and TV shows using [The Movie Database (TMDB)](https://www.themoviedb.org/).

TMDB API credentials are handled by a local Node.js proxy. The browser never receives the TMDB API key directly.

![TMDB Stencil Frontend – Homepage](src/assets/homepage.png)

## Features

- **Trending overview:** Home page showing current trending movies and TV shows from TMDB.
- **Movies and TV shows:** Dedicated overview pages for movies (`/movies`) and TV shows (`/tvshows`).
- **Detail pages:** Detailed views for individual movies and TV shows via the `/details/:type/:id` route.
- **Typeahead search:** Live search with suggestions while typing.
- **Client-side routing:** Custom `app-link` and `app-outlet` components for navigation and route rendering.
- **Custom error page:** Displays a user-friendly error page when a manually entered movie or TV show ID cannot be resolved through the TMDB API.
- **Reusable card components:** Consistent presentation of movie and TV show posters and search results.
- **Configurable TMDB language:** The TMDB response language can be configured using `APP_LANG`; it defaults to `de-DE`.
- **Secure TMDB access:** A local Node.js proxy keeps the TMDB API key server-side and never exposes it to the browser.
- **Protected proxy:** The proxy validates a Bearer token and only allows configured browser origins.
- **Stencil web components:** The UI is built from standards-based web components and can generally be reused outside this project.
- **Production build:** Generates a static website in the `www/` directory.

## Tech stack

- [Stencil](https://stenciljs.com/) for standards-based Web Components
- Custom client-side routing with `app-link` and `app-outlet`
- Stencil Store for application state
- Node.js reverse proxy for secure TMDB API access
- Sass and Semantic UI CSS for styling

## Agent workflow

See [docs/agent-prompts.md](docs/agent-prompts.md) for reusable prompts for Cline and other AI coding agents.

Use the `/update-docs.md` workflow for documentation-only changes.

## TMDB integration

The application integrates the third-party [TMDB REST API](https://developer.themoviedb.org/docs/getting-started) through a separate Node.js reverse proxy.

The Stencil frontend never communicates directly with TMDB and never receives the TMDB API key. Instead, it sends requests to the proxy endpoint configured through `APP_API_BASE_URL`. The proxy validates the browser origin and Bearer token, forwards approved GET requests to TMDB, replaces any client-provided `api_key` with the server-side `APP_API_KEY`, and returns the TMDB response to the frontend.

### Data flow

```text
Stencil browser app
        |
        |  Authorization: Bearer <proxy token>
        v
Node.js TMDB proxy
        |
        |  api_key=<TMDB_API_KEY>
        v
TMDB REST API
        |
        v
Node.js TMDB proxy
        |
        v
Stencil browser app
```

### Characteristics

- **Client-side Stencil frontend:** The UI is built with Stencil web components and accesses TMDB through the proxy.
- **Separate Node.js reverse proxy:** `server/tmdb-proxy.mjs` forwards browser requests to the TMDB REST API.
- **Third-party REST API integration:** TMDB is consumed over HTTPS using REST endpoints and JSON responses.
- **Server-side API-key handling:** `APP_API_KEY` remains on the proxy and is never exposed to the browser.
- **Basic proxy protection:** The proxy restricts browser origins, requires a Bearer token, and allows only GET requests.
- **Transparent forwarding:** The proxy does not transform, aggregate, or reshape TMDB responses.

## Requirements

- Node.js 20 or newer
- npm
- A TMDB API key: [TMDB API settings](https://www.themoviedb.org/settings/api)

Use the **API Key (v3 auth)** value, not the **Read Access Token (v4 auth)**.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your local environment file:

```bash
cp .env.example .env
```

3. Choose a proxy access token.

For local development, you can choose any non-trivial value yourself. It only has to be long enough and difficult to guess. For example:

```env
PROXY_ACCESS_TOKEN=tmdb-local_a7f3k9x2q8m4v1b6n0p5r8t3w6y9z2c4
APP_PROXY_ACCESS_TOKEN=tmdb-local_a7f3k9x2q8m4v1b6n0p5r8t3w6y9z2c4
```

For a publicly deployed proxy, generate a cryptographically random token instead:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

This creates a 64-character hexadecimal token with high entropy. Do not use short, obvious, or reusable values such as `test`, `123456`, your name, or a timestamp.

4. Add your credentials to `.env`:

```env
APP_API_KEY=your_tmdb_v3_api_key
PROXY_ACCESS_TOKEN=your_proxy_token
APP_PROXY_ACCESS_TOKEN=your_proxy_token
PROXY_ALLOWED_ORIGINS=http://localhost:3333
APP_LANG=de-DE
APP_API_BASE_URL=http://localhost:3001/api/tmdb
PROXY_PORT=3001
```

`PROXY_ACCESS_TOKEN` and `APP_PROXY_ACCESS_TOKEN` must contain exactly the same value.

Never commit your real `.env` file, TMDB API key, or proxy access token.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `APP_API_KEY` | Yes | TMDB API key (`API Key (v3 auth)`). Used only by the Node proxy. |
| `PROXY_ACCESS_TOKEN` | Yes | Token required by the proxy. Used only by the Node proxy. |
| `APP_PROXY_ACCESS_TOKEN` | Yes | The same proxy token, embedded into the frontend build. |
| `PROXY_ALLOWED_ORIGINS` | Yes | Comma-separated browser origins allowed to call the proxy. |
| `APP_LANG` | No | TMDB request language, for example `de-DE` or `en-US`. Defaults to `de-DE`. |
| `APP_API_BASE_URL` | No | API base URL used by the Stencil frontend. Defaults to `http://localhost:3001/api/tmdb`. |
| `PROXY_PORT` | No | Port used by the local TMDB proxy. Defaults to `3001`. |

## Development

Start both the TMDB proxy and the Stencil development server with one command:

```bash
npm run dev
```

This runs:

- `node server/tmdb-proxy.mjs`
- `stencil build --dev --watch --serve`

Press `Ctrl + C` to stop both processes.

You can also run them separately:

```bash
npm run proxy
npm start
```

## Proxy security

The proxy requires this header on every TMDB request:

```http
Authorization: Bearer your_proxy_token
```

It also only allows browser origins listed in `PROXY_ALLOWED_ORIGINS`. For local development, the Stencil dev server normally runs at `http://localhost:3333`.

### What the token protects against

The proxy token prevents other websites from calling your proxy from a browser and stops requests that do not provide the expected token. This protects your TMDB quota from casual or automated third-party use.

### What the token does not do

The proxy token is **not a true server-side secret**. Because the frontend must send it with every request, it is visible in the built frontend bundle and in browser developer tools.

Therefore:

- It is sufficient as a basic protection for a local development proxy.
- It is useful as a first barrier for a public proxy.
- It does not replace real user authentication, sessions, short-lived backend-issued tokens, or rate limiting.
- Anyone who inspects your deployed frontend can extract the token and call the proxy directly.

The TMDB API key itself remains server-side only. It is never included in browser bundles, browser requests, or browser caches.

## Production build

Build the frontend for production:

```bash
npm run build
```

The deployable static website is generated in `www/`.

Before building for production, configure:

```env
APP_API_BASE_URL=[https://your-proxy-domain.example/api/tmdb](https://your-proxy-domain.example/api/tmdb)
APP_PROXY_ACCESS_TOKEN=your_production_proxy_token
PROXY_ALLOWED_ORIGINS=[https://your-frontend-domain.example](https://your-frontend-domain.example)
```

The production frontend does not need or receive `APP_API_KEY`; the proxy adds it server-side.

## Roadmap

See the [project roadmap](./docs/roadmap.md) for the full overview.

Current priorities:

- Add unit, component and end-to-end tests
- Improve accessibility, keyboard navigation and screen-reader support
- Add loading, empty and error states for search and overview pages

## Project origin

This project is based on the [Stencil Component Starter](https://github.com/ionic-team/stencil-component-starter).

## License

[MIT](./LICENSE)