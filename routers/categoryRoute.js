import express from "express";
import CategoryController from "../controllers/categoryController.js";

const categoryRoute = express.Router();

categoryRoute.post('/create-category', CategoryController.createCategory);
categoryRoute.get('/:id', CategoryController.getCategoryId);
categoryRoute.delete('/delete-category', CategoryController.deleteCategory);

export default categoryRoute;