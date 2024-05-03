import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.js";
import usuariosRoute from "./routes/usuarios.js";
import vuelosRoute from "./routes/vuelos.js";
import boletosRoute from "./routes/boletos.js";
import comentariosRouter from './routes/comentarios.js'; 
import respuestasRouter from './routes/comentarios.js'; 
import suscriptoresRoute from './routes/suscriptores.js';
import analiticos from './routes/analiticos.js';  
import revisiones from './routes/revisiones.js';


const app = express();
dotenv.config();

var whitelist = [process.env.FRONTEND_URL, process.env.AGENCY_FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            // Permite el origen si está en la lista blanca o es una solicitud sin origen (como las solicitudes de tipo POSTMAN, etc.)
            callback(null, true);
        } else {
            // Rechaza cualquier otro origen
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200
};

app.get("/", (req,res) => {
    res.send("Welcome to Express Backend");
});

app.listen(process.env.BACKEND_PORT, () => {
    connect();
    console.log("Connected to backend on "+process.env.BACKEND_URL);
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
    connect();
});

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.use("/auth", authRoute);
app.use("/usuarios", usuariosRoute);
app.use("/vuelos", vuelosRoute);
app.use("/boletos", boletosRoute);
app.use('/comentarios', comentariosRouter); 
app.use('/respuestas', respuestasRouter); 
app.use('/suscriptores', suscriptoresRoute);
app.use('/analiticos', analiticos);
app.use('/revisiones', revisiones);



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
