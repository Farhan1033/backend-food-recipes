// models/recipeIngredientModel.js
import RecipeIngredientRepository from "../repositories/recipeIngredientRepository.js";

export default class RecipeIngredientModel {
    constructor(id, recipe_id, ingredient_id, quantity, unit) {
        this.id = id;
        this.recipe_id = recipe_id;
        this.ingredient_id = ingredient_id;
        this.quantity = quantity;
        this.unit = unit;
    }

    static createRecipeIngredient(recipeIngredientData) {
        return RecipeIngredientRepository.addRecipeIngredient(
            recipeIngredientData.id,
            recipeIngredientData.recipe_id,
            recipeIngredientData.ingredient_id,
            recipeIngredientData.quantity,
            recipeIngredientData.unit
        );
    }

    static getRecipeIngredientById(id) {
        return RecipeIngredientRepository.getRecipeIngredientById(id);
    }

    static getRecipeIngredients() {
        return RecipeIngredientRepository.getRecipeIngredients();
    }

    static getIngredientsByRecipeId(recipeId) {
        return RecipeIngredientRepository.getIngredientsByRecipeId(recipeId);
    }

    static updateRecipeIngredient(id, recipeIngredientData) {
        return RecipeIngredientRepository.updateRecipeIngredient(
            id,
            recipeIngredientData.recipe_id,
            recipeIngredientData.ingredient_id,
            recipeIngredientData.quantity,
            recipeIngredientData.unit
        );
    }

    static deleteRecipeIngredient(id) {
        return RecipeIngredientRepository.deleteRecipeIngredient(id);
    }

    static deleteIngredientsByRecipeId(recipeId) {
        return RecipeIngredientRepository.deleteIngredientsByRecipeId(recipeId);
    }

    static createMultipleRecipeIngredients(recipeIngredients) {
        return RecipeIngredientRepository.addMultipleRecipeIngredients(recipeIngredients);
    }
}