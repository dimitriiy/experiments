import React from 'react';
import { gloabalState } from './mobx';

const useForceUpdate = () => {
  const [state, setState] = React.useState({});
  return () => setState({});
};

export function observer(Comp) {
  return (props) => {
    const reactionTrackingRef = React.useRef(null);
    const forceUpdate = useForceUpdate();

    if (!reactionTrackingRef.current) {
      reactionTrackingRef.current = () => {
        let prev = gloabalState.trackingDerivation;
        gloabalState.trackingDerivation = forceUpdate;
        gloabalState.trackingDerivation();
        gloabalState.trackingDerivation = prev;
      };
    }

    React.useLayoutEffect(() => {
      return () => {};
    }, []);

    let rendering;

    let prev = gloabalState.trackingDerivation;
    gloabalState.trackingDerivation = () => {
      rendering = Comp(props);

      gloabalState.trackingDerivation();
      gloabalState.trackingDerivation = prev;
    };

    console.log(rendering);
    return rendering;
  };
}
