import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import cors from "cors";


const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/carts", cartRoutes);
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.send("¡Hola Mundo!");
});

const PORT = process.env.PORT;
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