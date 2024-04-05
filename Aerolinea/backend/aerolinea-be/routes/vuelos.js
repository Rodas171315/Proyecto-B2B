import express from "express";
import { createVuelo, updateVuelo, deleteVuelo, getVuelo, getVuelos, getFilteredVuelos } from "../controllers/vuelo.js";

const router = express.Router();

//CREATE
router.post("/", createVuelo);

//UPDATE
router.put("/:id", updateVuelo);

//DELETE
router.delete("/:id", deleteVuelo);

//GET FILTROS
router.get('/filtered', getFilteredVuelos); // Mover esta línea aquí

//GET UN VUELO POR ID
router.get("/:id", getVuelo);

//GET TODOS LOS VUELOS
router.get("/", getVuelos);

export default router;
