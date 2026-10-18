import { Component, h, Host, Method } from '@stencil/core';
import { navigate } from '../../lib/router/router';
import { FetchService } from '../../fetchService';
import { Utils } from '../../utils';
import { AppState } from '../../store';

@Component({
  tag: 'typeahead-search',
  styleUrl: 'typeahead-search.scss',
  shadow: false,
})
export class TypeaheadSearch {
  @Method()
  async onSearchInput(value: string) {
    if (value.length > 3) {
      this.getSearchResult(value);
    }

    if (value.length < 4) {
      AppState.setSearchResultsVisible = false;
    }
  }

  @Method()
  async getSearchResult(term: string) {
    FetchService.getSeachResults(term);

    if (AppState.searchData.movies.length || AppState.searchData.tvShows.length) {
      AppState.setSearchResultsVisible = true;
    } else {
      AppState.setSearchResultsVisible = false;
    }
  }

  @Method()
  async goTo(event: MouseEvent, route: string) {
    event.preventDefault();
    navigate(route);
    AppState.setSearchResultsVisible = false;
  }

  render() {
    return (
      <Host>
        <div class="ui left aligned transparent category search">
          <div class="ui icon transparent inverted input">
            <input
              class="prompt"
              type="text"
              placeholder="Film oder TV-Serie finden"
              onKeyUp={(event) => this.onSearchInput((event.target as HTMLTextAreaElement).value)}
            />
            <i class="search icon"></i>
          </div>

          <div class={`results transition ${AppState.setSearchResultsVisible ? 'show' : 'hidden'}`}>
            {AppState.searchData && AppState.searchData.movies.length > 0 ? (
              <div class="category">
                <div class="name">
                  <p>Movies</p>
                </div>
                <div class="results transition">
                  {AppState.searchData.movies.map((element) => {
                    const detailsRoute = `/details/movie/${element.id}`;

                    return (
                      <a
                        class="result"
                        key={element.id}
                        href={`#${detailsRoute}`}
                        onClick={(event: MouseEvent) => this.goTo(event, detailsRoute)}
                      >
                        <div class="content">
                          <div class="title">{element.title}</div>
                          <small class="ui mini basic label">
                            <i class="yellow star icon"></i>
                            {element.vote_average}
                          </small>
                          <div class="description">
                            <small>{Utils.dateYearOnly(element.release_date)}</small>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : (
              ''
            )}

            {AppState.searchData && AppState.searchData.tvShows.length > 0 ? (
              <div class="category">
                <div class="name">
                  <p>TvShows</p>
                </div>
                <div class="results transition">
                  {AppState.searchData.tvShows.map((element) => {
                    const detailsRoute = `/details/tv/${element.id}`;

                    return (
                      <a
                        class="result"
                        key={element.id}
                        href={`#${detailsRoute}`}
                        onClick={(event: MouseEvent) => this.goTo(event, detailsRoute)}
                      >
                        <div class="content">
                          <div class="title">{element.name}</div>
                          <small class="ui mini basic label">
                            <i class="yellow star icon"></i>
                            {element.vote_average}
                          </small>
                          <div class="description">
                            <small>{element.first_air_date ? Utils.dateYearOnly(element.first_air_date) : '- -'}</small>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </Host>
    );
  }
}
