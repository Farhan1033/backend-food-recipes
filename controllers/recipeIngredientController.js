// controllers/recipeIngredientController.js
import { v4 as uuidv4 } from "uuid";
import RecipeIngredientModel from "../models/recipeIngredientModel.js";

export default class RecipeIngredientController {
    static async createRecipeIngredient(req, res) {
        try {
            const { recipe_id, ingredient_id, quantity, unit } = req.body;

            if (!recipe_id || !ingredient_id || !quantity) {
                return res.status(400).json({ message: 'Recipe ID, Ingredient ID, dan quantity harus diisi' })
            }

            const id = uuidv4();

            const recipeIngredientData = new RecipeIngredientModel(id, recipe_id, ingredient_id, quantity, unit);

            await RecipeIngredientModel.createRecipeIngredient(recipeIngredientData);

            res.status(200).json({
                message: 'Berhasil menambahkan recipe ingredient',
                recipeIngredient: recipeIngredientData
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }

    static async getRecipeIngredients(req, res) {
        try {
            const recipeIngredientData = await RecipeIngredientModel.getRecipeIngredients();

            res.status(200).json({
                message: 'Berhasil mengambil data recipe ingredients',
                recipeIngredients: recipeIngredientData
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }

    static async getRecipeIngredientById(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    message: 'ID tidak ditemukan'
                })
            }

            const recipeIngredientData = await RecipeIngredientModel.getRecipeIngredientById(id);

            if (recipeIngredientData.length === 0) {
                return res.status(404).json({
                    message: 'Recipe ingredient tidak ditemukan'
                })
            }

            res.status(200).json({
                message: 'Berhasil mengambil data recipe ingredient',
                recipeIngredient: recipeIngredientData[0]
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }

    static async getIngredientsByRecipeId(req, res) {
        try {
            const { recipeId } = req.params;

            if (!recipeId) {
                return res.status(400).json({
                    message: 'Recipe ID tidak ditemukan'
                })
            }

            const ingredientsData = await RecipeIngredientModel.getIngredientsByRecipeId(recipeId);

            res.status(200).json({
                message: 'Berhasil mengambil data ingredients berdasarkan recipe',
                ingredients: ingredientsData
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }

    static async updateRecipeIngredient(req, res) {
        try {
            const { id } = req.params;
            const { recipe_id, ingredient_id, quantity, unit } = req.body;

            if (!id) {
                return res.status(400).json({
                    message: 'ID tidak ditemukan'
                })
            }

            if (!recipe_id || !ingredient_id || !quantity) {
                return res.status(400).json({ message: 'Recipe ID, Ingredient ID, dan quantity harus diisi' })
            }

            const recipeIngredientData = { recipe_id, ingredient_id, quantity, unit };

            await RecipeIngredientModel.updateRecipeIngredient(id, recipeIngredientData);

            res.status(200).json({
                message: 'Berhasil mengupdate recipe ingredient',
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }

    static async deleteRecipeIngredient(req, res) {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({
                    message: 'ID tidak ditemukan'
                })
            }

            await RecipeIngredientModel.deleteRecipeIngredient(id);

            res.status(200).json({
                message: 'Berhasil menghapus recipe ingredient',
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }

    static async addMultipleRecipeIngredients(req, res) {
        try {
            const { recipe_id, ingredients } = req.body;

            if (!recipe_id) {
                return res.status(400).json({
                    message: 'Recipe ID harus diisi'
                })
            }

            if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
                return res.status(400).json({
                    message: 'Ingredients harus berupa array dan tidak boleh kosong'
                })
            }

            // Validasi setiap ingredient
            for (let ingredient of ingredients) {
                if (!ingredient.ingredient_id || !ingredient.quantity) {
                    return res.status(400).json({
                        message: 'Setiap ingredient harus memiliki ingredient_id dan quantity'
                    })
                }
            }

            // Generate ID untuk setiap ingredient
            const recipeIngredients = ingredients.map(ingredient => ({
                id: uuidv4(),
                recipe_id: recipe_id,
                ingredient_id: ingredient.ingredient_id,
                quantity: ingredient.quantity,
                unit: ingredient.unit || null
            }));

            await RecipeIngredientModel.createMultipleRecipeIngredients(recipeIngredients);

            res.status(200).json({
                message: 'Berhasil menambahkan multiple recipe ingredients',
                recipeIngredients: recipeIngredients
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }

    static async replaceRecipeIngredients(req, res) {
        try {
            const { recipe_id, ingredients } = req.body;

            if (!recipe_id) {
                return res.status(400).json({
                    message: 'Recipe ID harus diisi'
                })
            }

            if (!ingredients || !Array.isArray(ingredients)) {
                return res.status(400).json({
                    message: 'Ingredients harus berupa array'
                })
            }

            // Hapus semua ingredients lama untuk recipe ini
            await RecipeIngredientModel.deleteIngredientsByRecipeId(recipe_id);

            // Jika ada ingredients baru, tambahkan
            if (ingredients.length > 0) {
                // Validasi setiap ingredient
                for (let ingredient of ingredients) {
                    if (!ingredient.ingredient_id || !ingredient.quantity) {
                        return res.status(400).json({
                            message: 'Setiap ingredient harus memiliki ingredient_id dan quantity'
                        })
                    }
                }

                // Generate ID untuk setiap ingredient
                const recipeIngredients = ingredients.map(ingredient => ({
                    id: uuidv4(),
                    recipe_id: recipe_id,
                    ingredient_id: ingredient.ingredient_id,
                    quantity: ingredient.quantity,
                    unit: ingredient.unit || null
                }));

                await RecipeIngredientModel.createMultipleRecipeIngredients(recipeIngredients);

                res.status(200).json({
                    message: 'Berhasil mengganti recipe ingredients',
                    recipeIngredients: recipeIngredients
                })
            } else {
                res.status(200).json({
                    message: 'Berhasil menghapus semua recipe ingredients',
                })
            }
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }
}