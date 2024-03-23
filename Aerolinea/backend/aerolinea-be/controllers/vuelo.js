import Vuelo from "../models/Vuelo.js";

export const createVuelo = async (req, res, next) => {
    const newVuelo = new Vuelo(req.body);
    try {
        const savedVuelo = await newVuelo.save();
        res.status(200).json(savedVuelo);
    } catch (err) {
        next(err);
    }
};

export const updateVuelo = async (req, res, next) => {
    try {
        const updatedVuelo = await Vuelo.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedVuelo);
    } catch (err) {
        next(err);
    }
};

export const deleteVuelo = async (req, res, next) => {
    try {
        await Vuelo.findByIdAndDelete(req.params.id);
        res.status(200).json("Vuelo eliminado.");
    } catch (err) {
        next(err);
    }
};

export const getVuelo = async (req, res, next) => {
    try {
        const vuelo = await Vuelo.findById(req.params.id);
        res.status(200).json(vuelo);
    } catch (err) {
        next(err);
    }
};

export const getVuelos = async (req, res, next) => {
    try {
        const vuelos = await Vuelo.find();
        res.status(200).json(vuelos);
    } catch (err) {
        next(err);
    }
};
