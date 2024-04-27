// En models/Comentario.js
import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema({
  contenido: {
    type: String,
    required: true,
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  vueloId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vuelo',
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comentario',
    default: null,
  },
}, { timestamps: true });

export default mongoose.model("Comentario", comentarioSchema);
