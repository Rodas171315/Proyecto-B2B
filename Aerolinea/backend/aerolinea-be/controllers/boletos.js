// controllers/boleto.js
import Boleto from "../models/Boleto.js";
import Vuelo from "../models/Vuelo.js";
import Usuario from "../models/Usuario.js";

export const createBoleto = async (req, res, next) => {
    try {
        const { usuarioId, vueloId, tipoAsiento } = req.body;

        const vuelo = await Vuelo.findById(vueloId);
        if (!vuelo) return res.status(404).json("Vuelo no encontrado.");

        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) return res.status(404).json("Usuario no encontrado.");

        const precioFinal = tipoAsiento === 'ejecutivo' ? vuelo.precio * 1.5 : vuelo.precio;

        const newBoleto = new Boleto({
            usuarioId,
            vueloId,
            tipoAsiento,
            precioFinal,
            ciudad_origen: vuelo.ciudad_origen,
            ciudad_destino: vuelo.ciudad_destino,
            fecha_salida: vuelo.fecha_salida
        });

        const savedBoleto = await newBoleto.save();
        res.status(200).json(savedBoleto);
    } catch (err) {
        next(err);
    }
};


export const getBoletosPorUsuario = async (req, res, next) => {
    try {
        const usuarioId = req.params.usuarioId;
        const boletos = await Boleto.find({ usuarioId }).populate('vueloId'); 
        res.status(200).json(boletos);
    } catch (err) {
        next(err);
    }
};




