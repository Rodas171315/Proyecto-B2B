import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.js";
import usuariosRoute from "./routes/usuarios.js";
import vuelosRoute from "./routes/vuelos.js";
import boletosRoute from "./routes/boletos.js";

const app = express();
dotenv.config();

//CORS
const corsOptions = {
    origin:'http://localhost:5173', 
    credentials:true,   //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.get("/", (req,res) => {
    res.send("Welcome to Express Backend");
});

app.listen(8800, () => {
    connect();
    console.log("Connected to backend on http://localhost:8800.");
});

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.use("/auth", authRoute);
app.use("/usuarios", usuariosRoute);
app.use("/vuelos", vuelosRoute);
app.use("/boletos", boletosRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Algo salio mal!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});
