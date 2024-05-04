import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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
    },
    fecha_nacimiento: {
        type: Date,
    },
    nacionalidad: {
        type: String,
    },
    pasaporte: {
        type: Number,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    companyName: {
        type: String,
    },
},
    { timestamps: true }
);

export default userSchema;
