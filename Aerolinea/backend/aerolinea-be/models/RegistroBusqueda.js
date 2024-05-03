import mongoose from "mongoose";


const RegistroBusqueda = require('../models/RegistroBusqueda');

exports.registrarBusqueda = async (req, res) => {
    const { origen, destino, fecha } = req.body;
    try {
        const nuevoRegistro = new RegistroBusqueda({
            parametrosBusqueda: `origen=${origen}; destino=${destino}; fecha=${fecha}`,
            // Add other fields like usuarioId, tipoAcceso, esAutenticado as needed
        });

        await nuevoRegistro.save();
        res.status(201).json({ message: "Busqueda registrada" });
    } catch (error) {
        res.status(500).json({ message: "Error registrando la busqueda", error: error });
    }
};



export default mongoose.model("RegistroBusqueda", RegistroBusqeudaSchema);