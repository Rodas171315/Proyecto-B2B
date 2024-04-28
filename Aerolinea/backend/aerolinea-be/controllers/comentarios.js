import Usuario from "../models/Usuario.js";
import Comentario from "../models/Comentario.js";

export const getComentariosPorVuelo = async (req, res) => {
    try {
        const comentarios = await Comentario.find({ vueloId: req.params.vueloId })
            .populate('usuarioId', 'nombre')  // Simplified population
            .lean();  // Use lean() to get plain JavaScript objects

        const comentariosConNombreUsuario = comentarios.map(comentario => ({
            ...comentario,
            usuario: comentario.usuarioId ? comentario.usuarioId.nombre : 'Usuario desconocido'
        }));
        
        res.status(200).json(comentariosConNombreUsuario);
    } catch (error) {
        console.error("Error al obtener comentarios:", error);
        res.status(500).json({ message: "Error al recuperar los comentarios: " + error.message });
    }
};




export const crearComentario = async (req, res) => {
    const { contenido, usuarioId, vueloId, parentId } = req.body;

    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const comentario = new Comentario({
            contenido: contenido,
            usuarioId: usuarioId,
            vueloId: vueloId,
            parentId: parentId || null
        });

        const savedComentario = await comentario.save();
        res.status(201).json(savedComentario);
    } catch (error) {
        console.error("Error al crear comentario:", error);
        res.status(500).json({ message: error.message });
    }
};

// Similarly adjust crearRespuesta




export const crearRespuesta = async (req, res) => {
    console.log(req.body);  // Log to see what is being received

    const { contenido, usuarioId, vueloId, parentId } = req.body;
    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const respuesta = new Comentario({
            contenido,
            usuarioId,
            vueloId,
            parentId  // Check this is not undefined
        });

        const savedRespuesta = await respuesta.save();
        res.status(201).json(savedRespuesta);
    } catch (error) {
        console.error("Error al crear respuesta:", error);
        res.status(400).json({ message: error.message });
    }
};
