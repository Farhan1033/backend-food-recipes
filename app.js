import express from "express";
import cors from 'cors';
import categoryRoute from "./routers/categoryRoute.js";
import ingredientRoute from "./routers/ingredientRoute.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/category', categoryRoute)
app.use('/api/ingredient', ingredientRoute)

app.listen(PORT);