import mongoose from "mongoose";

const AerolineaSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true,
    },
    logo: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
);

export default mongoose.model("Aerolinea", AerolineaSchema);
