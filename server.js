import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import rollRoutes from "./routes/rollRoutes.js";
import cors from "cors";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rolls", rollRoutes);


app.get("/", (req, res) => {
  res.send("¡Hola Mundo!");
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log('Error al iniciar el servidor: ', error );
  }
};

start();