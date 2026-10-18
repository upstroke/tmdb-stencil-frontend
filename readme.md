![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# TMDB Stencil Frontend

A Stencil-based frontend for browsing trending movies and TV shows using [The Movie Database (TMDB)](https://www.themoviedb.org/).

TMDB API credentials are handled by a local Node.js proxy. The browser never receives the API key directly.

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

3. Add your TMDB API key to `.env`:

```env
APP_API_KEY=your_tmdb_v3_api_key
APP_LANG=de-DE
APP_API_BASE_URL=http://localhost:3001/api/tmdb
PROXY_PORT=3001
```

Never commit your real `.env` file or TMDB API key.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `APP_API_KEY` | Yes | TMDB API key (`API Key (v3 auth)`). Used only by the Node proxy. |
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

## Production build

Build the frontend for production:

```bash
npm run build
```

The deployable static website is generated in `www/`.

Before building for production, set `APP_API_BASE_URL` to the publicly deployed URL of your TMDB proxy, for example:

```env
APP_API_BASE_URL=https://your-proxy-domain.example/api/tmdb
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

For production, deploy the proxy separately and configure `APP_API_KEY` as a secret environment variable in your hosting provider.

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
