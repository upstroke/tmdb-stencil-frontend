import { AppState } from './store';
import { MediaType } from './types/router';

type FeedType = 'trending' | 'movies' | 'tvShows';

type ApiFeedType = 'trending' | 'movie' | 'tv';

const feedEndpoints = {
  trending: 'trending/all/week',
  movies: 'trending/movie/week',
  tvShows: 'trending/tv/week',
} as const;

class FetchAPI {
  private detailsRequestId = 0;
  private searchRequestId = 0;

  constructor() {}

  private getRequestOptions(): RequestInit {
    return {
      headers: {
        Authorization: `Bearer ${process.env.APP_PROXY_ACCESS_TOKEN}`,
      },
    };
  }

  async fetchRequestJSON(url: string) {
    try {
      const response = await fetch(url, this.getRequestOptions());

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

  async showMore(type: FeedType, amount: number) {
    const feed = AppState[type] as any;
    const amountKey = `${type}AmountToShow` as 'trendingAmountToShow' | 'moviesAmountToShow' | 'tvShowsAmountToShow';

    if (!feed) {
      return;
    }

    const nextAmount = AppState[amountKey] + amount;
    AppState[amountKey] = nextAmount;

    if (nextAmount < feed.results.length) {
      return;
    }

    if (feed.page >= feed.total_pages) {
      return;
    }

    const nextPage = feed.page + 1;
    const endpoint = feedEndpoints[type];

    const data = await this.fetchRequestJSON(
      `${AppState.baseUrl}/${endpoint}?language=${AppState.language}&page=${nextPage}`
    );

    if (!data?.results?.length) {
      return;
    }

    AppState[type] = {
      ...feed,
      page: data.page,
      results: [...feed.results, ...data.results],
    };
  }

  getAll(type: ApiFeedType) {
    switch (type) {
      case 'trending':
        if(!AppState.trending){
          this.fetchRequestJSON(`${AppState.baseUrl}/trending/all/week?language=${AppState.language}`)
            .then((data) => {
              AppState.trending = data
            });
        }
        break;
      case 'movie':
        if(!AppState.movies) {
          this.fetchRequestJSON(`${AppState.baseUrl}/trending/movie/week?language=${AppState.language}&sort_by=popularity.desc`)
            .then((data) => {
              AppState.movies = data
            })
        }
        break;
      case 'tv':
          if(!AppState.tvShows) {
            this.fetchRequestJSON(`${AppState.baseUrl}/trending/tv/week?language=${AppState.language}&sort_by=popularity.desc`)
              .then((data) => {
                AppState.tvShows = data
              })
          }
        break;
    }
  }

  async getDetails(type: MediaType, id: string) {
    const requestId = ++this.detailsRequestId;

    if (!/^\d+$/.test(id)) {
      AppState.detailsData = null;
      return;
    }

    AppState.detailsData = undefined;

    const details = await this.fetchRequestJSON(
      `${AppState.baseUrl}/${type}/${id}?language=${AppState.language}`
    );

    if (requestId !== this.detailsRequestId) {
      return;
    }

    if (!details || !details.id) {
      AppState.detailsData = null;
      return;
    }

    const credits = await this.fetchRequestJSON(
      `${AppState.baseUrl}/${type}/${id}/credits`
    );

    if (requestId !== this.detailsRequestId) {
      return;
    }

    AppState.detailsData = credits
      ? { ...details, ...credits }
      : details;
  }

  async getSearchResults(term: string) {
    const requestId = ++this.searchRequestId;

    const movies = await this.fetchRequestJSON(
      `${AppState.baseUrl}/search/movie?language=${AppState.language}&query=${encodeURIComponent(term)}`
    );

    const tvShows = await this.fetchRequestJSON(
      `${AppState.baseUrl}/search/tv?language=${AppState.language}&query=${encodeURIComponent(term)}`
    );

    if (requestId !== this.searchRequestId) {
      return;
    }

    AppState.searchData = {
      movies: movies?.results ?? [],
      tvShows: tvShows?.results ?? [],
    };
  }

}

export const FetchService = new FetchAPI();
