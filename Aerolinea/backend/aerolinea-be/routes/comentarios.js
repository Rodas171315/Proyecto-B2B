// routes/comentarios.js
import express from "express";
import { getComentariosPorVuelo, crearComentario } from "../controllers/comentarios.js";

const router = express.Router();

router.get("/vuelo/:vueloId", getComentariosPorVuelo);
router.post("/", crearComentario);

export default router;
