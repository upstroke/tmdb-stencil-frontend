import { createStore } from '@stencil/store';

const store = createStore({
  baseUrl: 'https://api.themoviedb.org/3',
  apiKey: process.env.APP_API_KEY,
  language: process.env.APP_LANG,

  trending: undefined,
  trendingAmountToShow: 4,

  movies: undefined,
  moviesAmountToShow: 4,

  tvShows: undefined,
  tvShowsAmountToShow: 4,

  detailsData: undefined,

  featuredData: undefined,

  searchData: {'movies':[], 'tvShows':[]},
  setSearchResultsVisible: false
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
export const getStateProp = store.get;
export const setStateProp = store.set;
export const resetAppState = store.reset;
