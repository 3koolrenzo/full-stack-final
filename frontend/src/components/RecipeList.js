// RecipeList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipeService from '../services/api';
import './RecipeList.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState({});
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await recipeService.getAllRecipes();
        setRecipes(data);
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

  const handleUpvote = async (recipeId) => {
    try {
      const recipeToUpdate = recipes.find(recipe => recipe.id === recipeId);
      const updatedRecipe = { ...recipeToUpdate, upvotes: recipeToUpdate.upvotes + 1 };
      await recipeService.updateRecipe(recipeId, updatedRecipe);
      setRecipes(recipes.map(recipe => recipe.id === recipeId ? updatedRecipe : recipe));
    } catch (error) {
      console.error(error);
      alert('Failed to upvote recipe. Please try again.');
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      await recipeService.deleteRecipe(id);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
      alert('Recipe deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to delete recipe. Please try again.');
    }
  };

  const handleCommentChange = (e) => {
    const { value } = e.target;
    setCommentText(value);
  };

  const handleAddComment = async (recipeId) => {
    try {
      const response = await recipeService.addComment(recipeId, commentText);
      const updatedComments = { ...comments };
      updatedComments[recipeId] = [...updatedComments[recipeId], response.comment.text];
      setComments(updatedComments);
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

  const handleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const sortedRecipes = recipes.slice().sort((a, b) => {
    if (sortOrder === 'desc') {
      return b.upvotes - a.upvotes;
    } else {
      return a.upvotes - b.upvotes;
    }
  });

  const filteredRecipes = sortedRecipes.filter(recipe => {
    return recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="recipe-list-container">
      <h2>Recipe List</h2>
      <input 
        type="text" 
        placeholder="Search by title" 
        value={searchTerm} 
        onChange={handleSearch} 
        className="search-input"
      />
      <button onClick={handleSort} className="sort-btn">Sort by Upvotes ({sortOrder === 'desc' ? 'Descending' : 'Ascending'})</button>
      <ul className="recipe-list">
        {filteredRecipes.map(recipe => (
          <li key={recipe.id} className="recipe-item">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <ul className="ingredient-list">
              <li><strong>Ingredients:</strong></li>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <ul className="instruction-list">
              <li><strong>Instructions:</strong></li>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
            <div>
              <input 
                type="text" 
                value={commentText} 
                onChange={handleCommentChange} 
                placeholder="Add your comment" 
                className="comment-input"
              />
              <button onClick={() => handleAddComment(recipe.id)} className="add-comment-btn">Add Comment</button>
            </div>
            <div>
              <h4>Comments:</h4>
              <ul className="comment-list">
                {comments[recipe.id] && comments[recipe.id].map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            </div>
            <div>
              <button onClick={() => handleUpvote(recipe.id)} className="upvote-btn">Upvote</button>
              <span className="upvote-count">{recipe.upvotes}</span>
            </div>
            <button onClick={() => handleDeleteRecipe(recipe.id)} className="delete-btn">Delete</button>
            <Link to={`/recipes/${recipe.id}/update`} className="update-link">Update</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
