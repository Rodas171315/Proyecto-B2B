import mongoose from 'mongoose';

const revisionSchema = new mongoose.Schema({
  vueloId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vuelo',
    required: true
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  valoracion: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  comentario: {
    type: String,
    required: false
  }
}, { timestamps: true });

const Revision = mongoose.model('Revision', revisionSchema);
export default Revision;
