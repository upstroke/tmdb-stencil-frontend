export type MediaType = 'movie' | 'tv';

export type AppRouteComponent =
  | 'app-main'
  | 'app-movies'
  | 'app-tvshows'
  | 'app-details';

export interface AppRoute {
  path: string;
  component: AppRouteComponent;
  exact?: boolean;
}
