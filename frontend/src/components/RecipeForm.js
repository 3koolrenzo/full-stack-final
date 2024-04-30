import React, { useState } from 'react';
import recipeService from '../services/api';
import './RecipeForm.css'; // Import your CSS file for styling

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const recipeData = {
        title,
        description,
        ingredients: ingredients.split('\n'), // Convert string to array based on new line
        instructions: instructions.split('\n'), // Convert string to array based on new line
      };
      await recipeService.createRecipe(recipeData);
      // Reset the form fields after successful submission
      setTitle('');
      setDescription('');
      setIngredients('');
      setInstructions('');
      alert('Recipe added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add recipe. Please try again.');
    }
  };

  return (
    <div className="recipe-form-container">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" className="recipe-input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="recipe-textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <textarea className="recipe-textarea" placeholder="Ingredients (one ingredient per line)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        <textarea className="recipe-textarea" placeholder="Instructions (one step per line)" value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        <button type="submit" className="recipe-submit-btn">Add Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
