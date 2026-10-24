export interface Movie {
  id: number;
  title?: string;
  vote_average: number;
  release_date?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
}

export interface TvShow {
  id: number;
  name?: string;
  vote_average: number;
  first_air_date?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
}

export interface MovieResult extends Movie {
  media_type: 'movie';
}

export interface TvResult extends TvShow {
  media_type: 'tv';
}

export type TrendingResult = MovieResult | TvResult;

export interface TmdbPage<T> {
  page: number;
  results: T[];
  total_pages: number;
}

export function isTrendingResult(value: unknown): value is TrendingResult {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'media_type' in value &&
    typeof (value as { id: unknown }).id === 'number' &&
    ((value as { media_type: unknown }).media_type === 'movie' ||
      (value as { media_type: unknown }).media_type === 'tv')
  );
}

export interface SearchData {
  movies: Movie[];
  tvShows: TvShow[];
}

export interface ProductionCompany {
  name?: string;
}

export interface Genre {
  name?: string;
}

export interface Person {
  name?: string;
  original_name?: string;
  character?: string;
  job?: string;
}

export interface DetailsData {
  id: number;
  backdrop_path?: string | null;
  poster_path?: string | null;
  title?: string;
  name?: string;
  vote_average: number;
  production_companies?: ProductionCompany[];
  networks?: ProductionCompany[];
  genres?: Genre[];
  overview?: string;
  homepage?: string;
  release_date?: string;
  first_air_date?: string;
  runtime?: number;
  status?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];
  cast?: Person[];
  crew?: Person[];
  original_title?: string;
  original_name?: string;
}
