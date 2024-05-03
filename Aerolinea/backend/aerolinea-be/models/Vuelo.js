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
  duracion: {
    type: Number,
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
  }, 
  imagenesUrl: [String], // Array de strings para URLs de imágenes
  esDirecto: {
    type: Boolean,
    default: true,
    required: true,
  },
  
  //escala: {
    ciudad_escala: {
      type: String,
      //default: "Washington",
    },
    duracion_escala: {
      type: Number,
      //default: 1,
    },
  //},
},
  { timestamps: true }
);  

export default mongoose.model("Vuelo", VueloSchema);
