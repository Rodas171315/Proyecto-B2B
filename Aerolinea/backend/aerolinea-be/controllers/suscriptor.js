import Suscriptor from "../models/Suscriptor.js";
import { enviarCorreo } from "../utils/mailer.js";

export const createSuscriptor = async (req, res, next) => {
    const newSuscriptor = new Suscriptor(req.body);
    try {
        const savedSuscriptor = await newSuscriptor.save();
        enviarCorreo(req.body.email, "Suscrito a UNIS Airlines", "Gracias por suscribirte, pronto más novedades :)");
        res.status(200).json(savedSuscriptor);
    } catch (err) {
        next(err);
    }
};

export const updateSuscriptor = async (req, res, next) => {
    try {
        const updatedSuscriptor = await Suscriptor.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedSuscriptor);
    } catch (err) {
        next(err);
    }
};

export const deleteSuscriptor = async (req, res, next) => {
    try {
        await Suscriptor.findByIdAndDelete(req.params.id);
        res.status(200).json("Suscriptor eliminado.");
    } catch (err) {
        next(err);
    }
};

export const getSuscriptor = async (req, res, next) => {
    try {
        const suscriptor = await Suscriptor.findById(req.params.id);
        res.status(200).json(suscriptor);
    } catch (err) {
        next(err);
    }
};

export const getSuscriptores = async (req, res, next) => {
    try {
        const suscriptores = await Suscriptor.find();
        res.status(200).json(suscriptores);
    } catch (err) {
        next(err);
    }
};
