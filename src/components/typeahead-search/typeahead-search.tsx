import { Component, Element, h, Host, Listen, Method } from '@stencil/core';
import { navigate } from '../../lib/router/router';
import { FetchService } from '../../fetchService';
import { Utils } from '../../utils';
import { AppState } from '../../store';
import { Movie, TvShow } from '../../types/tmdb';

@Component({
  tag: 'typeahead-search',
  styleUrl: 'typeahead-search.scss',
  shadow: false,
})
export class TypeaheadSearch {
  @Element() host!: HTMLElement;

  private static readonly MIN_SEARCH_LENGTH = 3;

  private searchInput!: HTMLInputElement;

  @Listen('keydown', { target: 'document' })
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      AppState.setSearchResultsVisible = false;
    }
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (!this.host.contains(event.target as Node)) {
      AppState.setSearchResultsVisible = false;
    }
  }

  @Method()
  async onSearchInput(value: string) {
    if (value.length >= TypeaheadSearch.MIN_SEARCH_LENGTH) {
      void this.getSearchResult(value);
    } else {
      AppState.setSearchResultsVisible = false;
    }
  }

  @Method()
  async getSearchResult(term: string) {
    FetchService.getSearchResults(term);

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

  private handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onSearchInput(value);
  }

  private handleFocus() {
    const inputValue = this.searchInput?.value ?? '';

    if (
      inputValue.length > 0 &&
      (AppState.searchData.movies.length > 0 || AppState.searchData.tvShows.length > 0)
    ) {
      AppState.setSearchResultsVisible = true;
    }
  }

  render() {
    return (
      <Host>
        <div class="ui left aligned transparent category search">
          <div class="ui icon transparent inverted input">
            <input
              class="prompt"
              type="search"
              placeholder="Film oder TV-Serie finden"
              ref={(element) => (this.searchInput = element as HTMLInputElement)}
              onInput={(event) => this.handleInput(event)}
              onFocus={() => this.handleFocus()}
            />
            <i class="search icon"></i>
          </div>

          <div
            class={`results transition ${AppState.setSearchResultsVisible ? 'show' : 'hidden'}`}
            tabindex={AppState.setSearchResultsVisible ? 0 : -1}
            aria-hidden={!AppState.setSearchResultsVisible}
          >
            {AppState.searchData && AppState.searchData.movies.length > 0 ? (
              <div class="category">
                <div class="name">
                  <p>Movies</p>
                </div>
                <div class="results transition">
                  {AppState.searchData.movies.map((element: Movie) => {
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
                            <small>{Utils.dateYearOnly(element.release_date as string)}</small>
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
                  {AppState.searchData.tvShows.map((element: TvShow) => {
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
