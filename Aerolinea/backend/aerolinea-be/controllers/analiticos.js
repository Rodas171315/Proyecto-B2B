import RegistroBusqueda from '../models/RegistroBusqueda.js';

export const obtenerTodosLosRegistros = async (req, res, next) => {
    try {
        const registros = await RegistroBusqueda.find();
        res.status(200).json(registros);
    } catch (err) {
        next(err);
    }
};

export const filtrarBusquedas = async (req, res, next) => {
    const { parametrosBusqueda, usuarioId, tipoAcceso, esAutenticado } = req.query;
    let query = {};

    if (parametrosBusqueda) query.parametrosBusqueda = new RegExp(parametrosBusqueda, 'i');
    if (usuarioId) query.usuarioId = usuarioId;
    if (tipoAcceso) query.tipoAcceso = tipoAcceso;
    if (esAutenticado !== undefined) query.esAutenticado = esAutenticado === 'true';

    try {
        const busquedas = await RegistroBusqueda.find(query);
        res.status(200).json(busquedas);
    } catch (err) {
        next(err);
    }
};

export const registrarBusqueda = async (req, res, next) => {
    const { origen, destino, fecha, usuarioId, tipoAcceso, esAutenticado } = req.body;
    try {
        const nuevoRegistro = new RegistroBusqueda({
            parametrosBusqueda: `origen=${origen}; destino=${destino}; fecha=${fecha}`,
            usuarioId: usuarioId || null,
            tipoAcceso: tipoAcceso || 'web',
            esAutenticado: esAutenticado || false
        });
        const savedRegistro = await nuevoRegistro.save();
        res.status(201).json(savedRegistro);
    } catch (err) {
        next(err);
    }
};
