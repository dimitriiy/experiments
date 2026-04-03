import React, { createContext, useCallback, useContext, useState } from 'react';
import type { RouteMatch, HistoryStrategy, RouteMatcherStrategy } from './types';
import { BrowserRouter, MatchRouter } from './browser-router';

interface RouterDependencies {
  historyStrategy: HistoryStrategy;
  routeMatcher: RouteMatcherStrategy;
}

interface RouterContextValue extends RouterDependencies {
  pathname: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export const RouterProvider: React.FC<{
  children: React.ReactNode;
  historyStrategy?: HistoryStrategy;
  routeMatcher?: RouteMatcherStrategy;
}> = ({ children, historyStrategy = new BrowserRouter(), routeMatcher = new MatchRouter() }) => {
  const [pathname, setPathname] = useState(historyStrategy.getPathName());

  const navigate = useCallback(
    (path: string) => {
      setPathname(path);
      historyStrategy.push(path);
    },
    [historyStrategy]
  );

  React.useEffect(() => {
    const unsubscribe = historyStrategy.listen((newPathname) => {
      setPathname(newPathname);
    });

    return unsubscribe;
  }, [historyStrategy]);

  return (
    <RouterContext.Provider
      value={{
        pathname,
        navigate,
        historyStrategy,
        routeMatcher,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);

  if (!context) {
    throw new Error('useRouter must be used within RouterProvider');
  }

  return context;
};

export const useNavigate = () => {
  const { navigate } = useRouter();

  return navigate;
};
