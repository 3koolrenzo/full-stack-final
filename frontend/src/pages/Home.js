// src/pages/Home.js
import React from 'react';
import RecipeForm from '../components/RecipeForm';
import RecipeList from '../components/RecipeList';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Recipe Sharing App</h1>
      <RecipeForm />
      <RecipeList />
    </div>
  );
};

export default Home;
