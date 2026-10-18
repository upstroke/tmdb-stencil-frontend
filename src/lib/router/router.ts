export type RouteParams = Record<string, string>;

export function normalizePath(rawPath: string): string {
  const hash = rawPath.startsWith('#') ? rawPath.slice(1) : rawPath;
  const path = hash.split('?')[0];

  if (!path || path === '/') {
    return '/';
  }

  return path.startsWith('/') ? path.replace(/\/+$/, '') || '/' : `/${path}`;
}

export function getCurrentPath(): string {
  return normalizePath(window.location.hash);
}

export function navigate(path: string): void {
  const normalizedPath = normalizePath(path);
  window.location.hash = normalizedPath === '/' ? '/' : normalizedPath;
}

export function subscribeToPath(callback: (path: string) => void): () => void {
  const handleHashChange = () => {
    callback(getCurrentPath());
  };

  window.addEventListener('hashchange', handleHashChange);
  callback(getCurrentPath());

  return () => {
    window.removeEventListener('hashchange', handleHashChange);
  };
}

export function matchRoute(path: string, routePath: string): RouteParams | null {
  const pathSegments = path.split('/').filter(Boolean);
  const routeSegments = routePath.split('/').filter(Boolean);

  if (pathSegments.length !== routeSegments.length) {
    return null;
  }

  const params: RouteParams = {};

  for (let index = 0; index < routeSegments.length; index += 1) {
    const routeSegment = routeSegments[index];
    const pathSegment = pathSegments[index];

    if (routeSegment.startsWith(':')) {
      params[routeSegment.slice(1)] = decodeURIComponent(pathSegment);
      continue;
    }

    if (routeSegment !== pathSegment) {
      return null;
    }
  }

  return params;
}
