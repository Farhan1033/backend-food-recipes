import db from "../config/db.js";

export default class CategoryRepository {
    static addCategory(id, name) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO categories (id, name) VALUES (?, ?)'
            db.query(sql, [id, name], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static getCategory() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM categories'
            db.query(sql, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static getCategorybById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM categories WHERE id = ?'
            db.query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        })
    }

    static deleteCategory(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM categories WHERE id = ?'
            db.query(sql, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result[0]);
            })
        })
    }
}