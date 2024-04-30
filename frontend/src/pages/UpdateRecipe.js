// src/pages/UpdateRecipe.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import recipeService from '../services/api';

const UpdateRecipe = () => {
  const { id } = useParams(); // Get recipe ID from URL params
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await recipeService.getRecipeById(id);
        setTitle(data.title);
        setDescription(data.description);
        setIngredients(data.ingredients.join('\n')); // Convert array to string separated by new lines
        setInstructions(data.instructions.join('\n')); // Convert array to string separated by new lines
      } catch (error) {
        console.error(error);
        alert('Failed to fetch recipe details. Please try again.');
      }
    };
    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRecipe = {
        title,
        description,
        ingredients: ingredients.split('\n'), // Convert string to array based on new line
        instructions: instructions.split('\n'), // Convert string to array based on new line
      };
      await recipeService.updateRecipe(id, updatedRecipe);
      alert('Recipe updated successfully!');
      navigate('/recipes'); // Navigate to recipe list after update
    } catch (error) {
      console.error(error);
      alert('Failed to update recipe. Please try again.');
    }
  };

  return (
    <div>
      <h2>Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <textarea placeholder="Ingredients (one ingredient per line)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        <textarea placeholder="Instructions (one step per line)" value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
