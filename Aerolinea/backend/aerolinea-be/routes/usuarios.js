import express from "express";
import { createUsuario, updateUsuario, deleteUsuario, getUsuario, getUsuarios } from "../controllers/usuario.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", createUsuario);

//UPDATE
router.put("/:id", updateUsuario);

//DELETE
router.delete("/:id", deleteUsuario);

//GET
router.get("/:id", getUsuario);

//GET ALL
router.get("/", getUsuarios);

router.get("/checkauthentication", verifyToken, (req,res,next)=>{
    res.send("Hola usuario, has iniciado sesión");
});

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("Hola usuario, has iniciado sesión y puedes eliminar tu cuenta");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("Hola administrador, has iniciado sesión y puedes eliminar todas las cuentas");
// });

export default router;
