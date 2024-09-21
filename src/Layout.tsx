import React from 'react';
import img from './images/lab-experiment-4-kpruzdbdrsiyb02d6s8gh.webp';
import { Menu } from './components/Menu';

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="wrapper">
      <img src={img} alt="" className="logo" />
      <Menu />
      <main>{children} </main>
    </div>
  );
};
