// src/pages/Home.js
import React from 'react';
import './Home.css'; // Import your CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Recipe Sharing App</h1>
      <p className="home-description">This website allows you to discover and share your favorite recipes with others. Whether you're a cooking enthusiast or just looking for new ideas, you'll find a wide range of recipes to explore and try out.</p>
      <p className="home-navigation">Please use the navigation in the Navbar above to browse recipes, create new recipes, or update existing ones.</p>
    </div>
  );
};

export default Home;
