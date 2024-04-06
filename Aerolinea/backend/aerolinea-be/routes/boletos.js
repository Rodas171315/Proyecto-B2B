// routes/boletos.js
import express from "express";
import { createBoleto, getBoletosPorUsuario} from "../controllers/boletos.js";

const router = express.Router();

router.post("/", createBoleto);

router.get("/usuario/:usuarioId", getBoletosPorUsuario);

export default router;
