import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'typeahead-search',
  styleUrl: 'typeahead-search.scss',
  shadow: false,
})
export class TypeaheadSearch {

  render() {
    return (
      <Host>
        <div class="ui left aligned transparent category search">
          <div class="ui icon transparent inverted input">
            <input class="prompt" type="text" placeholder="Film oder TV-Serie finden"/>
            <i class="search icon"></i>
          </div>

          <div class="results transition hidden">

            <div class="category">
              <div class="name">
                <p>Movies</p>
                <small class="ui blue mini label">12</small>
              </div>

              <div class="results transition">
                <router-link class="result">
                  <div class="content">
                    <div class="title">Titel</div>
                    <small class="ui mini basic label">
                      <i class="yellow star icon"></i>
                      6
                    </small>
                  </div>
                  <div class="description">
                    <small>10.10.2020</small>
                  </div>
                </router-link>
              </div>
            </div>

            <div class="category">
              <div class="name">
                <p>TV-Shows</p>
                <small class="ui blue mini label">10</small>
              </div>

              <div class="results transition">
                <router-link class="result">
                  <div class="content">
                    <div class="title">Titel</div>
                    <small class="ui mini basic label">
                      <i class="yellow star icon"></i>
                      7
                    </small>
                  </div>
                  <div class="description">
                    <small>10.10.2020</small>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
