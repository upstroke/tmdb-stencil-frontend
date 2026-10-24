/**
 * A movie entry returned by the TMDB API.
 */
export interface Movie {
  id: number;
  title?: string;
  vote_average: number;
  release_date?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
}

/**
 * A TV show entry returned by the TMDB API.
 */
export interface TvShow {
  id: number;
  name?: string;
  vote_average: number;
  first_air_date?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
}

/**
 * A movie result from the mixed TMDB trending endpoint.
 *
 * `media_type` discriminates this type from `TvResult`.
 */
export interface MovieResult extends Movie {
  media_type: 'movie';
}

/**
 * A TV show result from the mixed TMDB trending endpoint.
 *
 * `media_type` discriminates this type from `MovieResult`.
 */
export interface TvResult extends TvShow {
  media_type: 'tv';
}

/**
 * A result from the mixed trending endpoint.
 *
 * Person entries are intentionally excluded; use `isTrendingResult`
 * to narrow an untyped API result to this union.
 */
export type TrendingResult = MovieResult | TvResult;

/**
 * A paginated TMDB API response.
 *
 * `page` and `total_pages` are TMDB pagination metadata and must be
 * preserved when filtering or merging results.
 */
export interface TmdbPage<T> {
  page: number;
  results: T[];
  total_pages: number;
}

/**
 * Checks whether an untyped TMDB result is a movie or TV show entry.
 *
 * Person entries do not satisfy this guard and can therefore be
 * filtered out of mixed trending results.
 */
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

/**
 * Results of a TMDB search, separated by media type.
 */
export interface SearchData {
  movies: Movie[];
  tvShows: TvShow[];
}

/**
 * A company credited for a movie or TV show.
 */
export interface ProductionCompany {
  name?: string;
}

/**
 * A genre assigned to a movie or TV show.
 */
export interface Genre {
  name?: string;
}

/**
 * A cast member or crew member on a movie or TV show detail page.
 */
export interface Person {
  name?: string;
  original_name?: string;
  character?: string;
  job?: string;
}

/**
 * Details for a movie or TV show.
 *
 * The optional `title`/`release_date` fields apply to movies, while
 * `name`/`first_air_date` apply to TV shows. `cast` and `crew` come
 * from the separate TMDB credits response and are merged into this
 * object by the fetch service.
 */
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
