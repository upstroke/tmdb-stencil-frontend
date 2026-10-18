import 'dotenv/config';
import http from 'node:http';

const port = Number(process.env.PROXY_PORT ?? 3001);
const tmdbApiKey = process.env.APP_API_KEY;

if (!tmdbApiKey) {
  throw new Error('APP_API_KEY is missing in your .env file');
}

const server = http.createServer(async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method !== 'GET') {
    response.writeHead(405, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  const url = new URL(request.url, `http://localhost:${port}`);

  if (!url.pathname.startsWith('/api/tmdb/')) {
    response.writeHead(404, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ error: 'Not found' }));
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
    });
    response.end(body);
  } catch (error) {
    console.error('TMDB proxy error:', error);
    response.writeHead(502, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ error: 'Bad gateway' }));
  }
});

server.listen(port, () => {
  console.log(`TMDB proxy listening on http://localhost:${port}`);
});
