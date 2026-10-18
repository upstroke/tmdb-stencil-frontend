# TMDB Stencil Frontend

A Stencil-based frontend for browsing trending movies and TV shows using [The Movie Database (TMDB)](https://www.themoviedb.org/).

TMDB API credentials are handled by a local Node.js proxy. The browser never receives the TMDB API key directly.

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
APP_API_BASE_URL=https://your-proxy-domain.example/api/tmdb
APP_PROXY_ACCESS_TOKEN=your_production_proxy_token
PROXY_ALLOWED_ORIGINS=https://your-frontend-domain.example
```

The production frontend does not need or receive `APP_API_KEY`; the proxy adds it server-side.

## TMDB proxy

The proxy is implemented in `server/tmdb-proxy.mjs`.

It forwards requests such as:

```text
/api/tmdb/trending/all/week
```

to TMDB:

```text
https://api.themoviedb.org/3/trending/all/week
```

and appends your `APP_API_KEY` as the TMDB `api_key` parameter.

For production, deploy the proxy separately and configure `APP_API_KEY`, `PROXY_ACCESS_TOKEN`, and `PROXY_ALLOWED_ORIGINS` as environment variables or secrets in your hosting provider.

# Stencil Component Starter

This project is based on the [Stencil Component Starter](https://github.com/ionic-team/stencil-component-starter).

Stencil is a compiler for building fast web apps using Web Components. It generates standards-based Web Components that work in any major framework or without a framework.

## Naming Components

When creating new component tags, avoid using `stencil` in the component name, for example `<stencil-datepicker>`. Use a project- or company-specific prefix instead.

## Using this component

There are three recommended strategies for using web components built with Stencil.

The first step for all three strategies is to [publish to npm](https://docs.npmjs.com/getting-started/publishing-npm-packages).

### Script tag

Add a script tag to your `index.html`:

```html
<script src="https://unpkg.com/my-component@0.0.1/dist/mycomponent.js"></script>
```

Then use the element anywhere in your template, JSX, or HTML.

### Node modules

Install the package:

```bash
npm install my-component --save
```

Add a script tag:

```html
<script src="node_modules/my-component/dist/mycomponent.js"></script>
```

### In a Stencil app

Install the package:

```bash
npm install my-component --save
```

Import it in your application:

```ts
import 'my-component';
```

Need help? Check out the [Stencil documentation](https://stenciljs.com/docs/my-first-component).
