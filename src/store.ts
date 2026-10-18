import { createStore } from '@stencil/store';
import { DetailsData, SearchData } from './types/tmdb';

const store = createStore({
  baseUrl: process.env.APP_API_BASE_URL,
  language: process.env.APP_LANG,

  trending: undefined,
  trendingAmountToShow: 4,

  movies: undefined,
  moviesAmountToShow: 4,

  tvShows: undefined,
  tvShowsAmountToShow: 4,

  detailsData: undefined as DetailsData | null | undefined,

  featuredData: undefined,

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

store.onChange('featuredData', (value) => {
  AppState.featuredData = value;
});

store.onChange('searchData', (value) => {
  AppState.searchData = value;
});

store.onChange('setSearchResultsVisible', (value) => {
  AppState.setSearchResultsVisible = value;
});

export const AppState = store.state;
