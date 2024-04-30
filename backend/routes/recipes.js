// routes/recipes.js
const express = require('express');
const router = express.Router();

// Import controller functions for recipes
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipes');

// Define routes
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', createRecipe);
router.put('/:id', updateRecipe); // Add route for updating a recipe
router.delete('/:id', deleteRecipe);

module.exports = router;
