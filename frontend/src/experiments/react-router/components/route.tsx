import React from 'react';
import type { RouteMatch } from '../types';
import { useRouter } from '../lib';

interface RoutePropsBase {
  path: string;
  exact?: boolean;
}

export interface RouteComponentProps {
  match: RouteMatch;
}

type RouteProps =
  | (RoutePropsBase & { component: React.ComponentType<RouteComponentProps> })
  | (RoutePropsBase & { render: React.ComponentType<RouteComponentProps> });

const isRenderFn = (
  props: RouteProps
): props is RoutePropsBase & { render: React.ComponentType<RouteComponentProps> } => {
  return 'render' in props;
};

export const Route = (props: RouteProps) => {
  const router = useRouter();

  React.useEffect(() => {}, []);

  const match = router.routeMatcher.match(router.pathname, props);

  if (!match) return null;

  const Component = isRenderFn(props) ? props.render : props.component;

  return <Component match={match} />;
};
