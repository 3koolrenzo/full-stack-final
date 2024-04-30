// src/components/RecipeList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipeService from '../services/api';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await recipeService.getAllRecipes();
        setRecipes(data);
        // Initialize comments state with empty comments for each recipe
        const initialComments = {};
        data.forEach(recipe => {
          initialComments[recipe.id] = [];
        });
        setComments(initialComments);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch recipes. Please try again.');
      }
    };
    fetchRecipes();
  }, []);

  const handleDeleteRecipe = async (id) => {
    try {
      await recipeService.deleteRecipe(id);
      // Filter out the deleted recipe from the state
      setRecipes(recipes.filter(recipe => recipe.id !== id));
      alert('Recipe deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to delete recipe. Please try again.');
    }
  };

  const handleUpvote = async (id) => {
    try {
      // Call the API to update the recipe's upvotes
      await recipeService.upvoteRecipe(id);
      // Increment the upvote count locally
      const updatedRecipes = recipes.map(recipe => {
        if (recipe.id === id) {
          return { ...recipe, upvotes: (recipe.upvotes || 0) + 1 };
        }
        return recipe;
      });
      setRecipes(updatedRecipes);
      alert('Recipe upvoted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to upvote recipe. Please try again.');
    }
  };

  const handleCommentChange = (e, recipeId) => {
    const { value } = e.target;
    setCommentText(value);
  };

  const handleAddComment = (recipeId) => {
    try {
      // Add the new comment to the comments state
      const updatedComments = { ...comments };
      updatedComments[recipeId] = [...updatedComments[recipeId], commentText];
      setComments(updatedComments);
      // Clear the comment input field
      setCommentText('');
      alert('Comment added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add comment. Please try again.');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecipes = recipes.filter(recipe => {
    return recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h2>Recipes</h2>
      <input 
        type="text" 
        placeholder="Search by title" 
        value={searchTerm} 
        onChange={handleSearch} 
      />
      <ul>
        {filteredRecipes.map(recipe => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <p>Upvotes: {recipe.upvotes || 0}</p> {/* Display upvote count */}
            <ul>
              <li><strong>Ingredients:</strong></li>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <ul>
              <li><strong>Instructions:</strong></li>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
            <div>
              <input 
                type="text" 
                value={commentText} 
                onChange={(e) => handleCommentChange(e, recipe.id)} 
                placeholder="Add your comment" 
              />
              <button onClick={() => handleAddComment(recipe.id)}>Add Comment</button>
            </div>
            <div>
              <h4>Comments:</h4>
              <ul>
                {comments[recipe.id] && comments[recipe.id].map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
            <button onClick={() => handleUpvote(recipe.id)}>Upvote</button>
            <Link to={`/recipes/${recipe.id}/update`}>Update</Link> {/* Link to UpdateRecipe page */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
