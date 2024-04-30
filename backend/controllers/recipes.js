// controllers/recipes.js
const { v4: uuidv4 } = require('uuid');
const supabase = require('../supabase');

// Get all recipes
async function getAllRecipes(req, res) {
  try {
    const { data, error } = await supabase.from('recipes').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recipes' });
  }
}

// Get recipe by ID
async function getRecipeById(req, res) {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Recipe not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recipe' });
  }
}

// Create a new recipe
async function createRecipe(req, res) {
  const { title, description, ingredients, instructions } = req.body;
  try {
    const { data, error } = await supabase.from('recipes').insert([
      { id: uuidv4(), title, description, ingredients, instructions },
    ]);
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error creating recipe' });
  }
}

// Update recipe by ID (including upvote)
async function updateRecipe(req, res) {
  const { id } = req.params;
  try {
    // Get the existing recipe
    const { data: existingRecipe, error: fetchError } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();
    if (fetchError) throw fetchError;
    if (!existingRecipe) return res.status(404).json({ error: 'Recipe not found' });

    // Increment the upvote count
    const upvoteCount = (existingRecipe.upvotes || 0) + 1;

    // Update the recipe with the new upvote count
    const { data: updatedRecipe, error: updateError } = await supabase
      .from('recipes')
      .update({ upvotes: upvoteCount })
      .eq('id', id);

    if (updateError) throw updateError;
    res.json(updatedRecipe[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating recipe' });
  }
}

// Delete recipe by ID
async function deleteRecipe(req, res) {
  const { id } = req.params;
  try {
    const { error } = await supabase.from('recipes').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting recipe' });
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
