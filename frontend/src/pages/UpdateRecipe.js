// src/pages/UpdateRecipe.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipeService from '../services/api';
import './UpdateRecipe.css'; // Import your CSS file for styling

const UpdateRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
        setIngredients(data.ingredients.join('\n'));
        setInstructions(data.instructions.join('\n'));
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
        ingredients: ingredients.split('\n'),
        instructions: instructions.split('\n'),
      };
      await recipeService.updateRecipe(id, updatedRecipe);
      alert('Recipe updated successfully!');
      navigate('/recipes');
    } catch (error) {
      console.error(error);
      alert('Failed to update recipe. Please try again.');
    }
  };

  return (
    <div className="update-recipe-container">
      <h2 className="update-recipe-title">Update Recipe</h2>
      <form onSubmit={handleSubmit} className="update-recipe-form">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="update-input" />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className="update-textarea" />
        <textarea placeholder="Ingredients (one ingredient per line)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required className="update-textarea" />
        <textarea placeholder="Instructions (one step per line)" value={instructions} onChange={(e) => setInstructions(e.target.value)} required className="update-textarea" />
        <button type="submit" className="update-button">Update Recipe</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
