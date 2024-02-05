// library imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// middleware imports
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// routes improt
import productRoutes from "./routes/productRoutes.js";

// data import
import connectDB from "./config/db.js";

const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// passing /api/products to the productRoutes.js file and use the router middleware
// whenever we hit /api/products it will go the productRoutes.js file
app.use("/api/products", productRoutes);

// using the error handler middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
