import express from 'express';
import { obtenerTodosLosRegistros, filtrarBusquedas, registrarBusqueda } from '../controllers/analiticos.js';

const router = express.Router();

router.get('/registros', obtenerTodosLosRegistros);
router.get('/filtrar', filtrarBusquedas);
router.post('/registro-busqueda', registrarBusqueda);

export default router;
