// controllers/recipeController.js
import { v4 as uuidv4 } from "uuid";
import RecipeModel from "../models/recipesModel.js";
import RecipeIngredientModel from "../models/recipeIngredientModel.js";

export default class RecipeController {
    static async createRecipe(req, res) {
        try {
            const { title, description, steps, image_url, category_id, cooking_time, portions, ingredients } = req.body;

            if (!title || !description || !steps || !category_id) {
                return res.status(400).json({ message: 'Title, description, steps, dan category_id harus diisi' })
            }

            const id = uuidv4();
            const created_at = new Date();

            const recipeData = new RecipeModel(id, title, description, steps, image_url, category_id, cooking_time, portions, created_at);

            await RecipeModel.createRecipe(recipeData);

            // Jika ada ingredients, tambahkan ke recipe_ingredients
            if (ingredients && Array.isArray(ingredients) && ingredients.length > 0) {
                const recipeIngredients = ingredients.map(ingredient => ({
                    id: uuidv4(),
                    recipe_id: id,
                    ingredient_id: ingredient.ingredient_id,
                    quantity: ingredient.quantity,
                    unit: ingredient.unit
                }));

                await RecipeIngredientModel.createMultipleRecipeIngredients(recipeIngredients);
            }

            res.status(200).json({
                message: 'Berhasil menambahkan recipe',
                recipe: recipeData
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }

    static async getRecipes(req, res) {
        try {
            const recipeData = await RecipeModel.getRecipes();

            res.status(200).json({
                message: 'Berhasil mengambil data recipe',
                recipes: recipeData
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }

    static async getRecipeById(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    message: 'ID tidak ditemukan'
                })
            }

            const recipeData = await RecipeModel.getRecipeById(id);
            const ingredients = await RecipeIngredientModel.getIngredientsByRecipeId(id);

            if (recipeData.length === 0) {
                return res.status(404).json({
                    message: 'Recipe tidak ditemukan'
                })
            }

            const recipe = {
                ...recipeData[0],
                ingredients: ingredients
            };

            res.status(200).json({
                message: 'Berhasil mengambil data recipe',
                recipe: recipe
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }

    static async updateRecipe(req, res) {
        try {
            const { id } = req.params;
            const { title, description, steps, image_url, category_id, cooking_time, portions, ingredients } = req.body;

            if (!id) {
                return res.status(400).json({
                    message: 'ID tidak ditemukan'
                })
            }

            if (!title || !description || !steps || !category_id) {
                return res.status(400).json({ message: 'Title, description, steps, dan category_id harus diisi' })
            }

            const recipeData = { title, description, steps, image_url, category_id, cooking_time, portions };

            await RecipeModel.updateRecipe(id, recipeData);

            // Update ingredients jika ada
            if (ingredients && Array.isArray(ingredients)) {
                // Hapus ingredients lama
                await RecipeIngredientModel.deleteIngredientsByRecipeId(id);

                // Tambahkan ingredients baru
                if (ingredients.length > 0) {
                    const recipeIngredients = ingredients.map(ingredient => ({
                        id: uuidv4(),
                        recipe_id: id,
                        ingredient_id: ingredient.ingredient_id,
                        quantity: ingredient.quantity,
                        unit: ingredient.unit
                    }));

                    await RecipeIngredientModel.createMultipleRecipeIngredients(recipeIngredients);
                }
            }

            res.status(200).json({
                message: 'Berhasil mengupdate recipe',
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }

    static async deleteRecipe(req, res) {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({
                    message: 'ID tidak ditemukan'
                })
            }

            // Hapus ingredients terkait terlebih dahulu
            await RecipeIngredientModel.deleteIngredientsByRecipeId(id);

            // Hapus recipe
            await RecipeModel.deleteRecipe(id);

            res.status(200).json({
                message: 'Berhasil menghapus recipe',
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }

    static async getRecipesByCategory(req, res) {
        try {
            const { categoryId } = req.params;

            if (!categoryId) {
                return res.status(400).json({
                    message: 'Category ID tidak ditemukan'
                })
            }

            const recipeData = await RecipeModel.getRecipesByCategory(categoryId);

            res.status(200).json({
                message: 'Berhasil mengambil data recipe berdasarkan kategori',
                recipes: recipeData
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }
}