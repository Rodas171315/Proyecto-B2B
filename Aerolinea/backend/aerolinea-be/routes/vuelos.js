import express from "express";
import { createVuelo,
    updateVuelo, 
    deleteVuelo, 
    getVuelo, 
    getVuelos, 
    getFilteredVuelos, 
    getAsientosDisponibles, 
    getCiudadesDisponibles,   
    buscarVuelosConEscala 
} from "../controllers/vuelo.js";

const router = express.Router();


router.get('/ciudades-disponibles', getCiudadesDisponibles);

router.get('/buscar-con-escala', buscarVuelosConEscala);




router.post("/", createVuelo);

router.put("/:id", updateVuelo);

router.delete("/:id", deleteVuelo);

router.get('/filtered', getFilteredVuelos); // Mover esta línea aquí

router.get("/:id", getVuelo);

router.get("/", getVuelos);


router.get('/:id/asientos-disponibles', getAsientosDisponibles);


export default router;
