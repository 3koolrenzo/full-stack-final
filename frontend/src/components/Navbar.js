// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/recipes" className="navbar-link">Recipes</Link>
        </li>
        <li className="navbar-item">
          <Link to="/recipes/new" className="navbar-link">Create New Recipe</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
