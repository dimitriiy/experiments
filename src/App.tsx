import './styles.css';

import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
