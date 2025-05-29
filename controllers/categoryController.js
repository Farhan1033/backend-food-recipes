import { v4 as uuidv4 } from "uuid";
import CategoryModel from "../models/categoryModel.js";

export default class CategoryController {
    static async createCategory(req, res) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ message: 'Semua field harus diisi' })
            }

            const id = uuidv4();

            const categoryData = new CategoryModel(id, name);

            await CategoryModel.createCategory(categoryData);

            res.status(200).json({
                message: 'Berhasil menambahkan category',
                category: categoryData
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }

    static async getCategory(req, res) {
        try {
            const categoryData = await CategoryModel.getCategory();

            res.status(200).json({
                message: 'Berhasil mengambil data kategori',
                category: categoryData
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }

    static async getCategoryId(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    message: 'ID tidak ditemukan'
                })
            }

            const categoryData = await CategoryModel.getCategoryById(id)

            res.status(200).json({
                message: 'Berhasil mengambil data kategori',
                category: categoryData
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }

    static async deleteCategory(req, res) {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({
                    message: 'ID tidak ditemukan'
                })
            }

            await CategoryModel.deleteCategory(id)

            res.status(200).json({
                message: 'Berhasil menghapus kategori',
            })
        } catch (error) {
            res.status(500).json({
                error: error.message,
            })
        }
    }
}