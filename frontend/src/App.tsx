import { Navbar } from './components/Navbar';

import type React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

import './App.css';

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

function App() {
  return (
    <>
      <Layout>
        <RouterProvider router={router} />;
      </Layout>
    </>
  );
}

export default App;
