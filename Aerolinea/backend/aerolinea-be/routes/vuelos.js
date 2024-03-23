import express from "express";
import { createVuelo, updateVuelo, deleteVuelo, getVuelo, getVuelos } from "../controllers/vuelo.js";

const router = express.Router();

//CREATE
router.post("/", createVuelo);

//UPDATE
router.put("/:id", updateVuelo);

//DELETE
router.delete("/:id", deleteVuelo);

//GET
router.get("/:id", getVuelo);

//GET ALL
router.get("/", getVuelos);

export default router;
