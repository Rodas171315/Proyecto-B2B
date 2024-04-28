import express from "express";
import { createSuscriptor, updateSuscriptor, deleteSuscriptor, getSuscriptor, getSuscriptores } from "../controllers/suscriptor.js";

const router = express.Router();

//CREATE
router.post("/", createSuscriptor);

//UPDATE
router.put("/:id", updateSuscriptor);

//DELETE
router.delete("/:id", deleteSuscriptor);

//GET UN SUSCRIPTOR POR ID
router.get("/:id", getSuscriptor);

//GET TODOS LOS SUSCRIPTORES
router.get("/", getSuscriptores);

export default router;
