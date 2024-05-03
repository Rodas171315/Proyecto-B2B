// controllers/revision.js
import Revision from '../models/Revision.js';
import Vuelo from '../models/Vuelo.js';

export async function agregarRevision(req, res) {
    const { vueloId, usuarioId, valoracion, comentario } = req.body;
    try {
        const nuevaRevision = new Revision({
            vueloId,
            usuarioId,
            valoracion,
            comentario
        });

        await nuevaRevision.save();

        // Update the average rating for the flight
        const revisiones = await Revision.find({ vueloId });
        const promedioValoracion = revisiones.reduce((acc, rev) => acc + rev.valoracion, 0) / revisiones.length;

        await Vuelo.findByIdAndUpdate(vueloId, { valuacion: promedioValoracion });

        res.status(201).json(nuevaRevision);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export async function obtenerRevisiones(req, res) {
    const { vueloId } = req.params;
    try {
        const revisiones = await Revision.find({ vueloId }).populate('usuarioId', 'nombre');
        res.status(200).json(revisiones);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export async function obtenerValoracionPromedio(req, res) {
    const { vueloId } = req.params;
    try {
        const vuelo = await Vuelo.findById(vueloId);
        res.status(200).json({ valoracionPromedio: vuelo.valuacion });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};