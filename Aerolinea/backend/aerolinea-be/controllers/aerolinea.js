import switchDB from "../services/mongo.switch.js";
import getDBModel from "../services/mongo.getmodel.js";
import airlineSchema from "../models/airlineSchema.js";
import userSchema from "../models/userSchema.js";
import Usuario from "../models/Usuario.js";
import { enviarCorreo } from "../utils/mailer.js";

const AirlineSchemas = new Map([['aerolinea', airlineSchema]]);
const CompanySchemas = new Map([['usuario', userSchema]]);

export const createAerolinea = async (req, res, next) => {
    const airlineDB = await switchDB('AppAerolineas', AirlineSchemas);
    const airlineModel = await getDBModel(airlineDB, 'aerolinea');
    const savedAirline = await airlineModel.create({
        companyName: req.body.companyName,
    });
    const companyDB = await switchDB(req.body.companyName, CompanySchemas);
    const userModel = await getDBModel(companyDB, 'usuario');
    const savedUser = await userModel.create({
        email: req.body.email,
        password: req.body.password,
        nombre: req.body.nombre,
        isAdmin: true,
    });
    enviarCorreo(req.body.email, "Registro exitoso!", "Nueva Aerolinea: "+req.body.companyName+" registrada en el sistema.");
    res.status(200).json(savedAirline);
    /*
    const newUsuario = new Usuario({
        email: req.body.email,
        password: req.body.password,
        nombre: req.body.name,
        apellido: "Rodas",
        fecha_nacimiento: "05-12-1998",
        nacionalidad: "Guatemalteco",
        pasaporte: "123456789",
        isAdmin: true,
    });
    const savedUsuario = await newUsuario.save();
    res.status(200).json(savedUsuario);
    */
};
/*
export const updateAerolinea = async (req, res, next) => {
    try {
        const updatedAerolinea = await Aerolinea.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedAerolinea);
    } catch (err) {
        next(err);
    }
};
export const deleteAerolinea = async (req, res, next) => {
    try {
        await Aerolinea.findByIdAndDelete(req.params.id);
        res.status(200).json("Aerolinea eliminada.");
    } catch (err) {
        next(err);
    }
};
export const getAerolinea = async (req, res, next) => {
    try {
        const aerolinea = await Aerolinea.findById(req.params.id);
        res.status(200).json(aerolinea);
    } catch (err) {
        next(err);
    }
};
export const getAerolineas = async (req, res, next) => {
    try {
        const aerolineas = await Aerolinea.find();
        res.status(200).json(aerolineas);
    } catch (err) {
        next(err);
    }
};
*/
