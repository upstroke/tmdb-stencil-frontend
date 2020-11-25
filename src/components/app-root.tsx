import '@stencil/router';
import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false,
})
export class AppRoot {
  render() {
    return (
      <Host>
        <stencil-router class="ui top fixed inverted menu">
          <div class="ui container" role="navigation">
              <stencil-route-link class="item" url="/" exact>
                <i class="home icon"></i> Home
              </stencil-route-link>
              <stencil-route-link class="item" url="/movies">
                <i class="film icon"></i> Filme
              </stencil-route-link>
              <stencil-route-link class="item" url="/tvshows">
                <i class="tv icon"></i> TV-Shows
              </stencil-route-link>
              <div class="item search">
                <typeahead-search class="right menu searchbar" />
              </div>
            </div>
        </stencil-router>

        <stencil-route-switch scrollTopOffset={0}>
          <stencil-route url='/details:id' component='app-details' />
          <stencil-route url='/movies' component='app-movies' />
          <stencil-route url='/tvshows' component='app-tvshows' />
          <stencil-route url='/' component='app-main' exact />
        </stencil-route-switch>

        <main-footer></main-footer>
      </Host>

    )
  }
}
