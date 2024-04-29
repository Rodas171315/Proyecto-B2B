import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUsuario = new Usuario({
            ...req.body,
            password: hash,
        });

        await newUsuario.save();
        res.status(200).send("Usuario creado.");
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const usuario = await Usuario.findOne({ email: req.body.email });
        if (!usuario) return next(createError(404, "Usuario no encontrado!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            usuario.password
        );
        if (!isPasswordCorrect)
        return next(createError(400, "Contraseña o correo incorrectos!"));

        const token = jwt.sign(
            { id: usuario._id, isAdmin: usuario.isAdmin },
            process.env.JWT
        );

        const { password, isAdmin, ...otherDetails } = usuario._doc;
        res
            .cookie("access_token", token, {
                httpOnly: true,
                //secure: false,
            })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        next(err);
    }
};
