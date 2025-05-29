import IngredientRepository from "../repositories/ingredientRepository.js";

export default class IngredientModel {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static createIngredient(ingredientData) {
        return IngredientRepository.createIngredient(
            ingredientData.id,
            ingredientData.name
        )
    }

    static getIngredient() {
        return IngredientRepository.getIngredient();
    }

    static deleteIngredient(id) {
        return IngredientRepository.deleteIngredient(id);
    }
}