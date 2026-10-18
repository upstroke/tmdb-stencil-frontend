import 'dotenv/config';
import http from 'node:http';
import crypto from 'node:crypto';

const port = Number(process.env.PROXY_PORT ?? 3001);
const tmdbApiKey = process.env.APP_API_KEY;
const proxyAccessToken = process.env.PROXY_ACCESS_TOKEN;
const allowedOrigins = (process.env.PROXY_ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!tmdbApiKey) {
  throw new Error('APP_API_KEY is missing in your .env file');
}

if (!proxyAccessToken) {
  throw new Error('PROXY_ACCESS_TOKEN is missing in your .env file');
}

function isOriginAllowed(origin) {
  if (!origin) {
    // Non-browser clients, curl, server-to-server requests.
    return true;
  }

  return allowedOrigins.includes(origin);
}

function timingSafeEqual(a, b) {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);

  if (bufferA.length !== bufferB.length) {
    return false;
  }

  return crypto.timingSafeEqual(bufferA, bufferB);
}

function sendJson(response, statusCode, body, extraHeaders = {}) {
  response.writeHead(statusCode, {
    'content-type': 'application/json',
    ...extraHeaders,
  });
  response.end(JSON.stringify(body));
}

const server = http.createServer(async (request, response) => {
  const origin = request.headers.origin;
  const corsHeaders = {};

  if (origin && isOriginAllowed(origin)) {
    corsHeaders['Access-Control-Allow-Origin'] = origin;
    corsHeaders['Vary'] = 'Origin';
    corsHeaders['Access-Control-Allow-Methods'] = 'GET, OPTIONS';
    corsHeaders['Access-Control-Allow-Headers'] = 'Authorization, Content-Type';
  }

  if (request.method === 'OPTIONS') {
    if (origin && !isOriginAllowed(origin)) {
      sendJson(response, 403, { error: 'Origin not allowed' });
      return;
    }

    response.writeHead(204, corsHeaders);
    response.end();
    return;
  }

  if (request.method !== 'GET') {
    sendJson(response, 405, { error: 'Method not allowed' }, corsHeaders);
    return;
  }

  if (origin && !isOriginAllowed(origin)) {
    sendJson(response, 403, { error: 'Origin not allowed' }, corsHeaders);
    return;
  }

  const authorization = request.headers.authorization ?? '';
  const expectedAuthorization = `Bearer ${proxyAccessToken}`;

  if (!timingSafeEqual(authorization, expectedAuthorization)) {
    sendJson(response, 401, { error: 'Unauthorized' }, corsHeaders);
    return;
  }

  const url = new URL(request.url, `http://localhost:${port}`);

  if (!url.pathname.startsWith('/api/tmdb/')) {
    sendJson(response, 404, { error: 'Not found' }, corsHeaders);
    return;
  }

  const tmdbPath = url.pathname.replace('/api/tmdb/', '');
  const tmdbUrl = new URL(`https://api.themoviedb.org/3/${tmdbPath}`);

  url.searchParams.forEach((value, key) => {
    if (key !== 'api_key') {
      tmdbUrl.searchParams.set(key, value);
    }
  });

  tmdbUrl.searchParams.set('api_key', tmdbApiKey);

  try {
    const tmdbResponse = await fetch(tmdbUrl);
    const body = Buffer.from(await tmdbResponse.arrayBuffer());

    response.writeHead(tmdbResponse.status, {
      'content-type': tmdbResponse.headers.get('content-type') ?? 'application/json',
      ...corsHeaders,
    });
    response.end(body);
  } catch (error) {
    console.error('TMDB proxy error:', error);
    sendJson(response, 502, { error: 'Bad gateway' }, corsHeaders);
  }
});

server.listen(port, () => {
  console.log(`TMDB proxy listening on http://localhost:${port}`);
  console.log(`Allowed origins: ${allowedOrigins.length ? allowedOrigins.join(', ') : 'none'}`);
});
