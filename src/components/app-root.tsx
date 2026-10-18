import { Component, h, Host } from '@stencil/core';
import { AppRoute } from './app-outlet';

const routes: AppRoute[] = [
  {
    path: '/',
    component: 'app-main',
    exact: true,
  },
  {
    path: '/movies',
    component: 'app-movies',
  },
  {
    path: '/tvshows',
    component: 'app-tvshows',
  },
  {
    path: '/details/:mediaType/:id',
    component: 'app-details',
  },
];

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false,
})
export class AppRoot {
  render() {
    return (
      <Host>
        <header class="ui top fixed inverted menu">
          <nav class="ui container" aria-label="Hauptnavigation">
            <app-link href="/" exact>
              <i class="home icon"></i> Home
            </app-link>

            <app-link href="/movies">
              <i class="film icon"></i> Filme
            </app-link>

            <app-link href="/tvshows">
              <i class="tv icon"></i> TV-Shows
            </app-link>

            <div class="item search">
              <typeahead-search class="right menu searchbar" />
            </div>
          </nav>
        </header>

        <app-outlet routes={routes} />

        <main-footer></main-footer>
      </Host>
    );
  }
}
