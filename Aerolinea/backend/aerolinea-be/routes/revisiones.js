import express from 'express';
import { agregarRevision, obtenerRevisiones, obtenerValoracionPromedio } from '../controllers/revision.js';

const router = express.Router();

router.post('/', agregarRevision);
router.get('/:vueloId', obtenerRevisiones); 
router.get('/valoracion/:vueloId', obtenerValoracionPromedio); 

export default router;
