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
    default: 50 
},
asientosEjecutivosDisponibles: {
    type: Number,
    required: true,
    default: 20 
}


});

export default mongoose.model("Vuelo", VueloSchema);
