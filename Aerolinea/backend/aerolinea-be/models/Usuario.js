import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    fecha_nacimiento: {
        type: Date,
        required: true,
    },
    nacionalidad: {
        type: String,
        required: true,
    },
    pasaporte: {
        type: Number,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
);

export default mongoose.model("Usuario", UsuarioSchema);
