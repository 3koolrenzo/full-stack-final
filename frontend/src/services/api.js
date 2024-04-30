// src/services/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Your backend URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const recipeService = {
  getAllRecipes: async () => {
    try {
      const response = await api.get('/recipes');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching recipes');
    }
  },
  createRecipe: async (recipeData) => {
    try {
      const response = await api.post('/recipes', recipeData);
      return response.data;
    } catch (error) {
      throw new Error('Error creating recipe');
    }
  },
  deleteRecipe: async (recipeId) => {
    try {
      await api.delete(`/recipes/${recipeId}`);
    } catch (error) {
      throw new Error('Error deleting recipe');
    }
  },
};

export default recipeService;
