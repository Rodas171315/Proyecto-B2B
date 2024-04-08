import mongoose from "mongoose";

const VueloSchema = new mongoose.Schema({
    ciudad_origen: {
        type: String,
        required: true,
    },
    ciudad_destino: {
        type: String,
        required: true,
    },
    fecha_salida: {
        type: Date,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    valuacion: {
        type: Number,
        min: 0,
        max: 5,
    },



asientosTuristaDisponibles: {
    type: Number,
    required: true,
},
asientosEjecutivosDisponibles: {
    type: Number,
    required: true,
}


});

export default mongoose.model("Vuelo", VueloSchema);
