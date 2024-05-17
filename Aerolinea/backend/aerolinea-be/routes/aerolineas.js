import express from "express";
import { createAerolinea/*, updateAerolinea, deleteAerolinea, getAerolinea, getAerolineas*/ } from "../controllers/aerolinea.js";

const router = express.Router();

//CREATE
router.post("/", createAerolinea);
/*
//UPDATE
router.put("/:id", updateAerolinea);
//DELETE
router.delete("/:id", deleteAerolinea);
//GET UNA Aerolinea POR ID
router.get("/:id", getAerolinea);
//GET TODAS LAS AEROLINEAS
router.get("/", getAerolineas);
*/
export default router;
