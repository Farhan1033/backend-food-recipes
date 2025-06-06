// repositories/recipeRepository.js
import db from "../config/db.js";

export default class RecipeRepository {
    static addRecipe(id, title, description, steps, image_url, category_id, created_at, cooking_time, portions) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO recipes (id, title, description, steps, image_url, category_id, cooking_time, portions, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
            db.query(sql, [id, title, description, steps, image_url, category_id, created_at, cooking_time, portions], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static getRecipes() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT r.*, c.name as category_name 
                FROM recipes r 
                LEFT JOIN categories c ON r.category_id = c.id
                ORDER BY r.created_at DESC
            `
            db.query(sql, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static getRecipeById(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT r.*, c.name as category_name 
                FROM recipes r 
                LEFT JOIN categories c ON r.category_id = c.id 
                WHERE r.id = ?
            `
            db.query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static updateRecipe(id, title, description, steps, image_url, category_id, cooking_time, portions) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE recipes SET title = ?, description = ?, steps = ?, image_url = ?, category_id = ?, cooking_time = ?, portions = ? WHERE id = ?'
            db.query(sql, [title, description, steps, image_url, category_id, cooking_time, portions, id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static deleteRecipe(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM recipes WHERE id = ?'
            db.query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static getRecipesByCategory(categoryId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT r.*, c.name as category_name 
                FROM recipes r 
                LEFT JOIN categories c ON r.category_id = c.id 
                WHERE r.category_id = ?
                ORDER BY r.created_at DESC
            `
            db.query(sql, [categoryId], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }
}