import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>CRUD App</h1>
    <nav >
      <Link to="/preferences">Preferences</Link>
      <Link to="/subscriptions">Subscriptions</Link>
      <Link to="/users">Users</Link>
    </nav>
  </div>
);

export default HomePage;
