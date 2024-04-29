import express from "express";
import { getComentariosPorVuelo, crearComentario, crearRespuesta } from "../controllers/comentarios.js";

const router = express.Router();

router.get("/vuelo/:vueloId", getComentariosPorVuelo);
router.post("/", crearComentario);
router.post("/respuestas", crearRespuesta); 

export default router;
