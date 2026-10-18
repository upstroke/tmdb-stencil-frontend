import { Component, h, Host, Prop, State } from '@stencil/core';
import { matchRoute, RouteParams, subscribeToPath } from '../lib/router/router';

export interface AppRoute {
  path: string;
  component: string;
  exact?: boolean;
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
    const componentTag = route.component;
    const ComponentTag = componentTag as any;

    return (
      <Host>
        <ComponentTag key={this.currentPath} {...params} />
      </Host>
    );
  }
}
