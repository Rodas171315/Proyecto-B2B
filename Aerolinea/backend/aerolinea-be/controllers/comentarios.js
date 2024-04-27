import Usuario from "../models/Usuario.js";
import Comentario from "../models/Comentario.js";

export const getComentariosPorVuelo = async (req, res) => {
    try {
        const comentarios = await Comentario.find({ vueloId: req.params.vueloId })
            .populate({
                path: 'usuarioId',
                select: 'nombre', // Selecciona solo el campo 'nombre' del usuario
            })
            .exec();

        // Mapea los comentarios para incluir el nombre del usuario en lugar del ID
        const comentariosConNombreUsuario = comentarios.map(comentario => ({
            ...comentario.toObject(),
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
        // Obtener el usuario asociado al comentario
        const usuario = await Usuario.findById(usuarioId);

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Crear el comentario con el nombre del usuario
        const comentario = new Comentario({
            contenido: contenido,
            usuarioId: usuarioId,
            vueloId: vueloId,
            parentId: parentId || null,
            usuario: { nombre: usuario.nombre } // Asignar el nombre del usuario al comentario
        });

        // Guardar el comentario
        const savedComentario = await comentario.save();

        res.status(201).json(savedComentario);
    } catch (error) {
        console.error("Error al crear comentario:", error);
        res.status(400).json({ message: error.message });
    }
};
