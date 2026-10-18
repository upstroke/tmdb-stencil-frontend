import { Component, h, Host, State } from '@stencil/core';
import { routes } from '../../lib/router/routes';
import { AppState } from '../../store';

@Component({
  tag: 'app-outlet',
  styleUrl: 'app-outlet.scss',
  shadow: false,
})
export class AppOutlet {
  @State() private currentPath: string = '/';

  connectedCallback() {
    window.addEventListener('hashchange', this.handleRouteChange);
    this.handleRouteChange();
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this.handleRouteChange);
  }

  private handleRouteChange = () => {
    const hash = window.location.hash.replace(/^#/, '');
    this.currentPath = hash || '/';
  };

  render() {
    for (const route of routes) {
      const params = route.match(this.currentPath);

      if (params) {
        const ComponentTag = route.component as any;

        return (
          <Host>
            <ComponentTag key={this.currentPath} {...params} />
          </Host>
        );
      }
    }

    return (
      <Host>
        <app-not-found />
      </Host>
    );
  }
}
