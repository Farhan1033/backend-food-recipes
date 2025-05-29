import db from "../config/db"

export default class IngredientRepository {
    static createIngredient(id, name) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO ingredients (id, name) VALUES (?, ?)'
            db.query(sql, [id, name], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static getIngredient() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM ingredients'
            db.query(sql, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static deleteIngredient(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM ingredients WHERE id = ?'
            db.query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }
}