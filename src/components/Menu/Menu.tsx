import React from 'react';

import { PAGES } from '../../router';
import { Link, useLocation } from 'react-router-dom';

export const Menu = () => {
  const { pathname } = useLocation();

  return (
    <nav>
      {PAGES.map((link) => (
        <Link key={link} className={pathname === `/${link}` ? 'active' : ''} to={`/${link}`}>
          {link}
        </Link>
      ))}
    </nav>
  );
};
