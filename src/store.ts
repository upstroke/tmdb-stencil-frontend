import { createStore } from '@stencil/store';
import { DetailsData, SearchData, TmdbPage, TrendingResult } from './types/tmdb';

const store = createStore({
  baseUrl: process.env.APP_API_BASE_URL,
  language: process.env.APP_LANG,

  /**
   * Mixed TMDB trending feed containing movies and TV shows.
   * Person entries are filtered out before this state is set.
   */
  trending: undefined as TmdbPage<TrendingResult> | undefined,
  trendingAmountToShow: 4,

  /**
   * Movie-only trending feed.
   */
  movies: undefined as TmdbPage<TrendingResult> | undefined,
  moviesAmountToShow: 4,

  /**
   * TV-show-only trending feed.
   */
  tvShows: undefined as TmdbPage<TrendingResult> | undefined,
  tvShowsAmountToShow: 4,

  /**
   * Details for the currently selected movie or TV show.
   *
   * - `undefined`: details are being loaded.
   * - `null`: no valid details could be loaded.
   * - `DetailsData`: details and credits were loaded successfully.
   */
  detailsData: undefined as DetailsData | null | undefined,

  /**
   * Search results, separated into movies and TV shows.
   */
  searchData: {
    movies: [],
    tvShows: [],
  } as SearchData,

  setSearchResultsVisible: false,
});


store.onChange('trending', (value) => {
  AppState.trending = value;
});
store.onChange('trendingAmountToShow', (value) => {
  AppState.trendingAmountToShow = value;
});

store.onChange('movies', (value) => {
  AppState.movies = value;
});
store.onChange('moviesAmountToShow', (value) => {
  AppState.moviesAmountToShow = value;
});

store.onChange('tvShows', (value) => {
  AppState.tvShows = value;
});
store.onChange('tvShowsAmountToShow', (value) => {
  AppState.tvShowsAmountToShow = value;
});

store.onChange('detailsData', (value) => {
  AppState.detailsData = value;
});

store.onChange('searchData', (value) => {
  AppState.searchData = value;
});

store.onChange('setSearchResultsVisible', (value) => {
  AppState.setSearchResultsVisible = value;
});

export const AppState = store.state;
