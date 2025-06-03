import express from "express";
import RecipeIngredientController from "../controllers/recipeIngredientController.js";

const recipeIngredientRoute = express.Router();

recipeIngredientRoute.post('/create-recipe-ingredient', RecipeIngredientController.createRecipeIngredient);
recipeIngredientRoute.get('/recipe/:recipeId', RecipeIngredientController.getIngredientsByRecipeId);
recipeIngredientRoute.get('/:id', RecipeIngredientController.getRecipeIngredientById);
recipeIngredientRoute.get('/', RecipeIngredientController.getRecipeIngredients);
recipeIngredientRoute.put('/:id', RecipeIngredientController.updateRecipeIngredient);
recipeIngredientRoute.delete('/delete-recipe-ingredient', RecipeIngredientController.deleteRecipeIngredient);

export default recipeIngredientRoute;
