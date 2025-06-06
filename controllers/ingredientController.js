import { v4 as uuidv4 } from "uuid";
import IngredientModel from "../models/ingredientModel.js";

export default class IngredientController {
    static async createIngredient(req, res) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ error: 'Isi semua field' });
            }

            const id = uuidv4();
            const ingredientData = new IngredientModel(id, name);

            await IngredientModel.createIngredient(ingredientData);

            res.status(200).json({
                message: 'Berhasil membuat data',
                ingredient: ingredientData
            })
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }

    static async getIngredient(req, res) {
        try {
            const ingredientData = await IngredientModel.getIngredient();

            res.status(200).json({
                message: 'Berhasil menampilkan data',
                ingredient: ingredientData
            })
        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }
    }

    static async deleteIngredient(req, res) {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({
                    error: 'Gagal menampilkan data'
                })
            }

            await IngredientModel.deleteIngredient(id);

            res.status(200).json({
                message: 'Data berhasil dihapus'
            })
        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }
    }
}