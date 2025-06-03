// repositories/recipeIngredientRepository.js
import db from "../config/db.js";

export default class RecipeIngredientRepository {
    static addRecipeIngredient(id, recipe_id, ingredient_id, quantity, unit) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO recipe_ingredients (id, recipe_id, ingredient_id, quantity, unit) VALUES (?, ?, ?, ?, ?)'
            db.query(sql, [id, recipe_id, ingredient_id, quantity, unit], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static getRecipeIngredients() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT ri.*, r.title as recipe_title, i.name as ingredient_name 
                FROM recipe_ingredients ri 
                LEFT JOIN recipes r ON ri.recipe_id = r.id 
                LEFT JOIN ingredients i ON ri.ingredient_id = i.id
            `
            db.query(sql, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static getRecipeIngredientById(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT ri.*, r.title as recipe_title, i.name as ingredient_name 
                FROM recipe_ingredients ri 
                LEFT JOIN recipes r ON ri.recipe_id = r.id 
                LEFT JOIN ingredients i ON ri.ingredient_id = i.id 
                WHERE ri.id = ?
            `
            db.query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static getIngredientsByRecipeId(recipeId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT ri.*, i.name as ingredient_name 
                FROM recipe_ingredients ri 
                LEFT JOIN ingredients i ON ri.ingredient_id = i.id 
                WHERE ri.recipe_id = ?
            `
            db.query(sql, [recipeId], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static updateRecipeIngredient(id, recipe_id, ingredient_id, quantity, unit) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE recipe_ingredients SET recipe_id = ?, ingredient_id = ?, quantity = ?, unit = ? WHERE id = ?'
            db.query(sql, [recipe_id, ingredient_id, quantity, unit, id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static deleteRecipeIngredient(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM recipe_ingredients WHERE id = ?'
            db.query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static deleteIngredientsByRecipeId(recipeId) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM recipe_ingredients WHERE recipe_id = ?'
            db.query(sql, [recipeId], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static addMultipleRecipeIngredients(recipeIngredients) {
        return new Promise((resolve, reject) => {
            if (!recipeIngredients || recipeIngredients.length === 0) {
                return resolve([]);
            }

            const sql = 'INSERT INTO recipe_ingredients (id, recipe_id, ingredient_id, quantity, unit) VALUES ?'
            const values = recipeIngredients.map(ingredient => [
                ingredient.id,
                ingredient.recipe_id,
                ingredient.ingredient_id,
                ingredient.quantity,
                ingredient.unit
            ]);

            db.query(sql, [values], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }
}