// routes/boletos.js
import express from "express";
import { createBoleto, getBoletosPorUsuario, getAllBoletos, cancelarBoleto } from "../controllers/boletos.js";

const router = express.Router();

router.post("/", createBoleto);

router.get("/usuario/:usuarioId", getBoletosPorUsuario);

router.get("/", getAllBoletos);

router.put('/cancelar/:boletoId', cancelarBoleto);


export default router;
