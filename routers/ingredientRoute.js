import express from "express";
import IngredientController from "../controllers/ingredientController.js";

const ingredientRoute = express.Router();

ingredientRoute.post('/create-ingredient', IngredientController.createIngredient)

export default ingredientRoute;