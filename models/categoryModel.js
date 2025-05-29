import CategoryRepository from "../repositories/categoryRepository.js";

export default class CategoryModel {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }


    static createCategory(categoryData) {
        return CategoryRepository.addCategory(
            categoryData.id,
            categoryData.name
        );
    }

    static getCategoryById(id) {
        return CategoryRepository.getCategorybById(id);
    }

    static getCategory() {
        return CategoryRepository.getCategory();
    }

    static deleteCategory(id) {
        return CategoryRepository.deleteCategory(id);
    }
}