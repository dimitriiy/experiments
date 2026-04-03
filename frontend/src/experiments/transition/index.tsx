import React from 'react';
import cx from 'classnames';

import classes from './styles.module.css';

export const Anim = () => {
  const [isShow, toggle] = React.useState(false);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => toggle(!isShow)}>{isShow ? 'Hide' : 'Show'}</button>

      <Transition open={isShow} />
    </div>
  );
};

const Transition = ({ open }: React.PropsWithChildren<{ open: boolean }>) => {
  const [isShow, toggle] = React.useState(open);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fadeOut = () => {
      toggle(false);
    };

    if (open) {
      toggle(true);
    } else {
      ref.current?.classList.add(classes.hide);
      ref.current?.addEventListener('animationend', fadeOut);
    }

    return () => {
      ref.current?.removeEventListener('animationend', fadeOut);
    };
  }, [open]);

  if (!isShow) {
    return null;
  }

  return (
    <div className={cx(classes.root, isShow && classes.show)} ref={ref}>
      Sub
    </div>
  );
};
