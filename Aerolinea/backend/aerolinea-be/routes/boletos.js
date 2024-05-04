// routes/boletos.js
import express from "express";
import { createBoleto, getBoletosPorUsuario, getAllBoletos, cancelarBoleto, updateBoleto, createBoletoCombinacion } from "../controllers/boletos.js";

const router = express.Router();

router.post("/", createBoleto);
router.get("/usuario/:usuarioId", getBoletosPorUsuario);
router.get("/", getAllBoletos);
router.put('/cancelar/:boletoId', cancelarBoleto);
router.put('/actualizar/:boletoId', updateBoleto); 
router.post("/reservar-combinacion", createBoletoCombinacion);


export default router;
