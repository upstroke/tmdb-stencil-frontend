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
