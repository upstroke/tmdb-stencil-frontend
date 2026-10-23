import { Component, h, Host, Prop, State } from '@stencil/core';
import { matchRoute, RouteParams, subscribeToPath } from '../lib/router/router';
import { AppRoute, MediaType } from '../types/router';

function isMediaType(value: string): value is MediaType {
  return value === 'movie' || value === 'tv';
}

@Component({
  tag: 'app-outlet',
  shadow: false,
})
export class AppOutlet {
  @Prop() routes: AppRoute[] = [];

  @State() currentPath: string = '/';

  private unsubscribe: (() => void) | undefined;

  connectedCallback() {
    this.unsubscribe = subscribeToPath((path) => {
      this.currentPath = path;
    });
  }

  disconnectedCallback() {
    this.unsubscribe?.();
  }

  private findRoute(): { route: AppRoute; params: RouteParams } | null {
    for (const route of this.routes) {
      if (route.exact && route.path !== this.currentPath) {
        continue;
      }

      const params = matchRoute(this.currentPath, route.path);

      if (params) {
        return { route, params };
      }
    }

    return null;
  }

  render() {
    const matchedRoute = this.findRoute();

    if (!matchedRoute) {
      return (
        <Host>
          <main class="ui container">
            <h1>Seite nicht gefunden</h1>
            <p>Die angeforderte Seite existiert nicht.</p>
          </main>
        </Host>
      );
    }

    const { route, params } = matchedRoute;

    // Show not-found page for unsupported media types in detail routes
    if (route.component === 'app-details' && !isMediaType(params.mediaType)) {
      return (
        <Host>
          <main class="ui container">
            <h1>Seite nicht gefunden</h1>
            <p>Die angeforderte Seite existiert nicht.</p>
          </main>
        </Host>
      );
    }

    return (
      <Host>
        {route.component === 'app-main' && <app-main key={this.currentPath} />}
        {route.component === 'app-movies' && <app-movies key={this.currentPath} />}
        {route.component === 'app-tvshows' && <app-tvshows key={this.currentPath} />}
        {route.component === 'app-details' && isMediaType(params.mediaType) && (
          <app-details
            key={this.currentPath}
            mediaType={params.mediaType}
            elementId={params.elementId}
          />
        )}
      </Host>
    );
  }
}
