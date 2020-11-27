import { Component, h, Host, Method, Prop } from '@stencil/core';
import { FetchService } from '../../fetchService';
import { Utils } from '../../utils';
import { AppState } from '../../store';
import { injectHistory, RouterHistory } from '@stencil/router';


@Component({
  tag: 'typeahead-search',
  styleUrl: 'typeahead-search.scss',
  shadow: false,
})
export class TypeaheadSearch {

  @Prop() history: RouterHistory

  @Method()
    async onSearchInput(val: string){
      if(val.length > 3){
        this.getSearchResult(val)
      }

      if(val.length < 4){
        AppState.setSearchResultsVisible = false
      }
    }

  @Method()
    async getSearchResult(term: string){
      FetchService.getSeachResults(term)
      if(AppState.searchData.movies.length || AppState.searchData.tvShows.length){
        AppState.setSearchResultsVisible = true
      }else {
        AppState.setSearchResultsVisible = false
      }
    }

  @Method()
    async goTo(e, route, data) {
      e.preventDefault();
      this.history.push(route, {data})
      AppState.setSearchResultsVisible = false
      window.location.reload()
    }

  render() {
    return (
      <Host>
        <div class="ui left aligned transparent category search">
          <div class="ui icon transparent inverted input">
            <input class="prompt" type="text" placeholder="Film oder TV-Serie finden" onKeyUp={(e)=>{this.onSearchInput((e.target as HTMLTextAreaElement).value)}} />
            <i class="search icon"></i>
          </div>

          <div class={`results transition ${AppState.setSearchResultsVisible ? 'show' : 'hidden'}`}>

            {AppState.searchData  && AppState.searchData.movies.length > 0
              ? <div class="category">
                <div class="name">
                  <p>Movies</p>
                </div>
                <div class="results transition">
                  {AppState.searchData  && AppState.searchData.movies && AppState.searchData.movies.map((element) =>
                    <a class="result" key={element.id} onClick={(e)=>{this.goTo(e,`/details:${element.id}`,{id: element.id, media_type: 'movie'})}}>
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
                  )}
                </div>
              </div>
              : ''
            }

            {AppState.searchData && AppState.searchData.tvShows.length > 0
              ? <div class="category">
                <div class="name">
                  <p>TvShows</p>
                </div>
                <div class="results transition">
                  {AppState.searchData  && AppState.searchData.tvShows && AppState.searchData.tvShows.map((element) =>
                    <a class="result" key={element.id} onClick={(e)=>{this.goTo(e,`/details:${element.id}`,{id: element.id, media_type: 'tv'})}}>
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
                  )}
                </div>
              </div>
              : ''
            }

          </div>
        </div>
      </Host>
    );
  }
}

injectHistory(TypeaheadSearch);
