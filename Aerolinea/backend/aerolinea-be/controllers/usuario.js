import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.js";

export const createUsuario = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUsuario = new Usuario({
            ...req.body,
            password: hash,
        });

        const savedUsuario = await newUsuario.save();
        res.status(200).json(savedUsuario);
    } catch (err) {
        next(err);
    }
};

// BUG: Actualizar el usuario no hashea el password
export const updateUsuario = async (req,res,next) => {
    try {
        const updatedUsuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUsuario);
    } catch (err) {
        next(err);
    }
};

export const deleteUsuario = async (req,res,next) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.status(200).json("Usuario eliminado.");
    } catch (err) {
        next(err);
    }
};

export const getUsuario = async (req,res,next) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        res.status(200).json(usuario);
    } catch (err) {
        next(err);
    }
};

export const getUsuarios = async (req,res,next) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (err) {
        next(err);
    }
};
