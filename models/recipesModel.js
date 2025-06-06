// models/recipeModel.js
import RecipeRepository from "../repositories/recipesRepository.js";

export default class RecipeModel {
    constructor(id, title, description, steps, image_url, category_id, cooking_time, portions, created_at) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.steps = steps;
        this.image_url = image_url;
        this.category_id = category_id;
        this.cooking_time = cooking_time;
        this.portions = portions;
        this.created_at = created_at;
    }

    static createRecipe(recipeData) {
        return RecipeRepository.addRecipe(
            recipeData.id,
            recipeData.title,
            recipeData.description,
            recipeData.steps,
            recipeData.image_url,
            recipeData.category_id,
            recipeData.cooking_time,
            recipeData.portions,
            recipeData.created_at
        );
    }

    static getRecipeById(id) {
        return RecipeRepository.getRecipeById(id);
    }

    static getRecipes() {
        return RecipeRepository.getRecipes();
    }

    static updateRecipe(id, recipeData) {
        return RecipeRepository.updateRecipe(
            id,
            recipeData.title,
            recipeData.description,
            recipeData.steps,
            recipeData.image_url,
            recipeData.category_id
        );
    }

    static deleteRecipe(id) {
        return RecipeRepository.deleteRecipe(id);
    }

    static getRecipesByCategory(categoryId) {
        return RecipeRepository.getRecipesByCategory(categoryId);
    }
}