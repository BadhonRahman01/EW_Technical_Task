import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <div className="container text-center">

      <h3>Welcome to CRUD Application</h3>
      <p>Click on the links below to manage preferences, subscriptions, and users.</p>
      <Link class="link" to="/subscriptions"><button className="ewbtn">Manage Subscriptions</button></Link>
      <Link class="link" to="/preferences"><button className="ewbtn">Manage Preferences</button></Link>
      <Link class="link" to="/users"><button className="ewbtn">Manage Users</button></Link>
    </div>
  </div>
);

export default HomePage;
