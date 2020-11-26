import { AppState } from './store'

class FetchAPI {
  constructor() {}

  featuredArray = [];

  async fetchRequestJSON(url) {
    try {
      const response = await fetch(url);
      const requestData = await response.json();
      this.handleErrors(response);
      return requestData;

    } catch (err) {
      console.log('Error: ', err);
    }

  }

  handleErrors(response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  showMore(type, amount) {
    if(AppState[type].results.length > AppState[`${type}AmountToShow`]){
      AppState[`${type}AmountToShow`] = AppState[`${type}AmountToShow`] + amount
    }
  }

  getAll(type) {
    switch (type) {
      case 'trending':
        if(!AppState.trending){
          this.fetchRequestJSON(`${AppState.baseUrl}/trending/all/week?api_key=${AppState.apiKey}&language=${AppState.language}`)
            .then((data) => {
              AppState.trending = data
            });
        }
        break;
      case 'movie':
        if(!AppState.movies) {
          this.fetchRequestJSON(`${AppState.baseUrl}/trending/movie/week?api_key=${AppState.apiKey}&language=${AppState.language}&sort_by=popularity.desc`)
            .then((data) => {
              AppState.movies = data
            })
        }
        break;
      case 'tv':
          if(!AppState.tvShows) {
            this.fetchRequestJSON(`${AppState.baseUrl}/trending/tv/week?api_key=${AppState.apiKey}&language=${AppState.language}&sort_by=popularity.desc`)
              .then((data) => {
                AppState.tvShows = data
              })
          }
        break;
    }
  }

  getDetails(type, id) {
    AppState.detailsData = ''; // reset details data
    this.fetchRequestJSON(`${AppState.baseUrl}/${type}/${id}?api_key=${AppState.apiKey}&language=${AppState.language}`)
      .then((data1) => {
        this.fetchRequestJSON(`${AppState.baseUrl}/${type}/${id}/credits?api_key=${AppState.apiKey}`)
          .then((data2) => {
            AppState.detailsData = {...data1,...data2}
            // console.log('detailsData: ',AppState.detailsData);
          })
      });
  }

  getSeachResults(term) {
    this.fetchRequestJSON(`${AppState.baseUrl}/search/movie?api_key=${AppState.apiKey}&language=${AppState.language}&query=${term}`)
      .then((data1) => {
        this.fetchRequestJSON(`${AppState.baseUrl}/search/tv?api_key=${AppState.apiKey}&language=${AppState.language}&query=${term}`)
          .then((data2) => {
            AppState.searchData = {'movies': [...data1.results], 'tvShows': [...data2.results]}
            console.log('searchData: ',AppState.searchData);
          })
      })
  }

}

export const FetchService = new FetchAPI();
