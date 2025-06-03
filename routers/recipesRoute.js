import express from "express";
import RecipeController from "../controllers/recipesController.js";

const recipeRoute = express.Router();

recipeRoute.post('/create-recipe', RecipeController.createRecipe);
recipeRoute.get('/category/:categoryId', RecipeController.getRecipesByCategory);
recipeRoute.get('/:id', RecipeController.getRecipeById);
recipeRoute.get('/', RecipeController.getRecipes);
recipeRoute.put('/:id', RecipeController.updateRecipe);
recipeRoute.delete('/delete-recipe', RecipeController.deleteRecipe);

export default recipeRoute;