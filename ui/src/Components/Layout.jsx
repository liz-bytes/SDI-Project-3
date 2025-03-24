import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>Sentinel Division Dashboard</h1>
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
