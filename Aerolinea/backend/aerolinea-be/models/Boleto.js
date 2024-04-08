import mongoose from "mongoose";

const BoletoSchema = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    vueloId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vuelo',
        required: true
    },
    tipoAsiento: {
        type: String,
        enum: ['turista', 'ejecutivo'],
        required: true
    },
    precioFinal: {
        type: Number,
        required: true
    },
    fechaReserva: {
        type: Date,
        default: Date.now
    },
    estadoReserva: {
        type: Boolean,
        default: true // true para reservado, false para cancelado
    },
    ciudad_origen: {
        type: String,
        required: true
    },
    ciudad_destino: {
        type: String,
        required: true
    },
    fecha_salida: {
        type: Date,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Boleto", BoletoSchema);
