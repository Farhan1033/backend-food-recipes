import express from "express";
import cors from 'cors';
import categoryRoute from "./routers/categoryRoute.js";
import ingredientRoute from "./routers/ingredientRoute.js";
import recipeRoute from "./routers/recipesRoute.js";
import recipeIngredientRoute from "./routers/recipeIngredientRoute.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/category', categoryRoute);
app.use('/api/ingredient', ingredientRoute);
app.use('/api/recipes', recipeRoute);
app.use('/api/recipe-ingredient', recipeIngredientRoute);

// ✅ Route untuk healthcheck
app.get('/kaithheathcheck', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
