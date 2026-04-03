export interface HistoryStrategy {
  getPathName(): string;

  push(path: string): void;
  listen(callback: (pathname: string) => void): () => void;
}

export type RouteMatch = {
  path: string | null;
  url: string;
  isExact: boolean;
};

export interface RouteMatcherStrategy {
  match(pathname: string, options: { path: string; exact?: boolean }): RouteMatch | null;
}
