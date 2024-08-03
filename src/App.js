import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PreferencesPage from './pages/PreferencesPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import UsersPage from './pages/UsersPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => (
  
  <Router>
        <header>
          <Link class="link" to="/"><h1>Easy Waste Oy Test App</h1></Link>
      
    </header>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/preferences" element={<PreferencesPage />} />
      <Route path="/subscriptions" element={<SubscriptionsPage />} />
      <Route path="/users" element={<UsersPage />} />
    </Routes>
  </Router>
);

export default App;
