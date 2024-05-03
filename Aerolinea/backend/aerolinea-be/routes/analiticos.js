import express from 'express';
import { obtenerTodosLosRegistros, filtrarBusquedas, registrarBusqueda } from '../controllers/analiticos.js';

const router = express.Router();

// Endpoint to retrieve all search records
router.get('/registros', obtenerTodosLosRegistros);

// Endpoint to filter searches based on certain criteria
router.get('/filtrar', filtrarBusquedas);

// Endpoint to record a new search
router.post('/registro-busqueda', registrarBusqueda);

export default router;
