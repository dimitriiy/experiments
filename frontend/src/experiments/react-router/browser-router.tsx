import type { HistoryStrategy, RouteMatch, RouteMatcherStrategy } from './types';

export class BrowserRouter implements HistoryStrategy {
  getPathName(): string {
    return window.location.pathname;
  }
  push(path: string): void {
    history.pushState({}, '', path);
  }

  listen(callback: (pathname: string) => void): () => void {
    const handlePopState = () => {
      callback(this.getPathName());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }
}

export class MatchRouter implements RouteMatcherStrategy {
  match(pathname: string, options: { path: string; exact?: boolean }): RouteMatch | null {
    const { exact = false, path } = options;

    if (!path) {
      return {
        path: null,
        url: pathname,
        isExact: true,
      };
    }

    const match = new RegExp(`^${path}`).exec(pathname);

    if (!match) {
      return null;
    }

    const url = match[0];
    const isExact = pathname === url;

    if (exact && !isExact) {
      return null;
    }

    return {
      path,
      url,
      isExact,
    };
  }
}
