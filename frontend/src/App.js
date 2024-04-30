// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import Home from './pages/Home';
import RecipeList from './components/RecipeList'; // Import the RecipeList component
import RecipeForm from './components/RecipeForm'; // Import the RecipeForm component
import UpdateRecipe from './pages/UpdateRecipe'; // Import the UpdateRecipe component

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Include the Navbar component */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipeList />} /> {/* Add the route for the RecipeList component */}
          <Route path="/recipes/new" element={<RecipeForm />} /> {/* Add the route for the RecipeForm component */}
          <Route path="/recipes/:id/update" element={<UpdateRecipe />} /> {/* Add the route for the UpdateRecipe component */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
