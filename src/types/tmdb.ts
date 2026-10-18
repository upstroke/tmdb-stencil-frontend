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
