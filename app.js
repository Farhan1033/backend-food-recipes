import express from "express";
import cors from 'cors';
import categoryRoute from "./routers/categoryRoute";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/category', categoryRoute)

app.listen(PORT);