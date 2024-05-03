import mongoose from 'mongoose';

const { Schema } = mongoose;

const registroBusquedaSchema = new Schema({
    parametrosBusqueda: String,
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        default: null
    },
    fechaHora: {
        type: Date,
        default: Date.now
    },
    tipoAcceso: {
        type: String,
        default: 'web'
    },
    esAutenticado: {
        type: Boolean,
        default: false
    }
});

const RegistroBusqueda = mongoose.model('RegistroBusqueda', registroBusquedaSchema);

export default RegistroBusqueda;
