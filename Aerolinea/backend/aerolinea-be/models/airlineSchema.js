import mongoose from "mongoose";

const airlineSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true,
    },
    logo: {
        type: String,
    },
    telefono: {
        type: String,
    },
    direccion: {
        type: String,
    }
},
    { timestamps: true }
);

export default airlineSchema;
