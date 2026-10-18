import { AppState } from './store'

type FeedType = 'trending' | 'movies' | 'tvShows';

type ApiFeedType = 'trending' | 'movie' | 'tv';

class FetchAPI {
  private detailsRequestId = 0;

  constructor() {}

  async fetchRequestJSON(url: string) {
    try {
      const response = await fetch(url);

      if (response.status === 404) {
        return null;
      }

      this.handleErrors(response);
      return await response.json();
    } catch (err) {
      console.log('Error: ', err);
      return null;
    }
  }

  handleErrors(response: Response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  showMore(type: FeedType, amount: number) {
    const feed = AppState[type] as { results: any[] } | undefined;

    if (!feed || feed.results.length <= AppState[`${type}AmountToShow`]) {
      return;
    }

    AppState[`${type}AmountToShow`] = AppState[`${type}AmountToShow`] + amount;
  }

  getAll(type: ApiFeedType) {
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

  async getDetails(type: string, id: string) {
    const requestId = ++this.detailsRequestId;

    if (!/^\d+$/.test(id)) {
      AppState.detailsData = null;
      return;
    }

    AppState.detailsData = undefined;

    const details = await this.fetchRequestJSON(
      `${AppState.baseUrl}/${type}/${id}?api_key=${AppState.apiKey}&language=${AppState.language}`
    );

    if (requestId !== this.detailsRequestId) {
      return;
    }

    if (!details || !details.id) {
      AppState.detailsData = null;
      return;
    }

    const credits = await this.fetchRequestJSON(
      `${AppState.baseUrl}/${type}/${id}/credits?api_key=${AppState.apiKey}`
    );

    if (requestId !== this.detailsRequestId) {
      return;
    }

    AppState.detailsData = credits
      ? { ...details, ...credits }
      : details;
  }

  getSearchResults(term: string) {
    this.fetchRequestJSON(`${AppState.baseUrl}/search/movie?api_key=${AppState.apiKey}&language=${AppState.language}&query=${term}`)
      .then((data1) => {
        this.fetchRequestJSON(`${AppState.baseUrl}/search/tv?api_key=${AppState.apiKey}&language=${AppState.language}&query=${term}`)
          .then((data2) => {
            AppState.searchData = {'movies': [...data1.results], 'tvShows': [...data2.results]}
          })
      })
  }

}

export const FetchService = new FetchAPI();
