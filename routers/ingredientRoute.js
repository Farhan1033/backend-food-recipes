import express from "express";
import IngredientController from "../controllers/ingredientController.js";

const ingredientRoute = express.Router();

ingredientRoute.post('/create-ingredient', IngredientController.createIngredient)
ingredientRoute.get('/', IngredientController.getIngredient)
ingredientRoute.post('/delete-ingredient', IngredientController.deleteIngredient)

export default ingredientRoute;