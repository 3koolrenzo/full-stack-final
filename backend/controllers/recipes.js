// controllers/recipeController.js

const { v4: uuidv4 } = require('uuid');
const supabase = require('../supabase');

async function getAllRecipes(req, res) {
  try {
    const { data, error } = await supabase.from('recipes').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recipes' });
  }
}

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

async function updateRecipe(req, res) {
  const { id } = req.params;
  const { title, description, ingredients, instructions, upvotes } = req.body;
  try {
    const { data: updatedRecipe, error: updateError } = await supabase
      .from('recipes')
      .update({ title, description, ingredients, instructions, upvotes })
      .eq('id', id);
    if (updateError) throw updateError;
    res.json(updatedRecipe[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating recipe' });
  }
}

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

async function addComment(req, res) {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([{ recipe_id: id, text: comment }]);
    if (error) throw error;
    res.status(201).json({ comment: data[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding comment' });
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  addComment,
};
