import mongoose from "mongoose";

const SuscriptorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
},
    { timestamps: true }
);

export default mongoose.model("Suscriptor", SuscriptorSchema);
