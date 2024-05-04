// controllers/boleto.js
import Boleto from "../models/Boleto.js";
import Vuelo from "../models/Vuelo.js";
import Usuario from "../models/Usuario.js";

export const createBoleto = async (req, res, next) => {
    try {
        const { usuarioId, vueloId, tipoAsiento, cantidad } = req.body;
        console.log(`Inicio de creación de boleto: Usuario ${usuarioId}, Vuelo ${vueloId}, Tipo ${tipoAsiento}, Cantidad ${cantidad}`);

        const vuelo = await Vuelo.findById(vueloId);
        if (!vuelo) {
            console.error("Vuelo no encontrado.");
            return res.status(404).json("Vuelo no encontrado.");
        }

        
        if (tipoAsiento === 'turista') {
            if (vuelo.asientosTuristaDisponibles >= cantidad) {
                vuelo.asientosTuristaDisponibles -= cantidad;
            } else {
                return res.status(400).json({ message: "No hay suficientes asientos disponibles en turista." });
            }
        } else if (tipoAsiento === 'ejecutivo') {
            if (vuelo.asientosEjecutivosDisponibles >= cantidad) {
                vuelo.asientosEjecutivosDisponibles -= cantidad;
            } else {
                return res.status(400).json({ message: "No hay suficientes asientos disponibles en ejecutivo." });
            }
        } else {
            return res.status(400).json({ message: "Tipo de asiento no válido." });
        }

        await vuelo.save(); 

        let boletosCreados = [];
        for (let i = 0; i < cantidad; i++) {
            const nuevoBoleto = new Boleto({
                usuarioId,
                vueloId,
                tipoAsiento,
                precioFinal: tipoAsiento === 'ejecutivo' ? vuelo.precio * 1.5 : vuelo.precio,
                ciudad_origen: vuelo.ciudad_origen,
                ciudad_destino: vuelo.ciudad_destino,
                fecha_salida: vuelo.fecha_salida
            });

            const boletoGuardado = await nuevoBoleto.save();
            boletosCreados.push(boletoGuardado);
        }

        console.log(`${cantidad} boleto(s) creado(s) exitosamente.`);
        res.status(201).json(boletosCreados);
    } catch (err) {
        console.error("Error creando boleto:", err);
        next(err);
    }
};





export const getBoletosPorUsuario = async (req, res, next) => {
    try {
        const usuarioId = req.params.usuarioId;
        const boletos = await Boleto.find({ usuarioId }).populate('vueloId'); 
        res.status(200).json(boletos);
    } catch (err) {
        next(err);
    }
};



export const getAllBoletos = async (req, res, next) => {
    try {
        const boletos = await Boleto.find().populate('vueloId').populate('usuarioId');
        res.status(200).json(boletos);
    } catch (err) {
        console.error("Error obteniendo todos los boletos:", err);
        next(err);
    }
};





export const cancelarBoleto = async (req, res) => {
    try {
        const boleto = await Boleto.findById(req.params.boletoId);
        if (!boleto) {
            return res.status(404).send('Boleto no encontrado');
        }

        // Marcar el boleto como cancelado
        boleto.estadoReserva = false;
        await boleto.save();

        const vuelo = await Vuelo.findById(boleto.vueloId);
        if (!vuelo) {
            return res.status(404).send('Vuelo no encontrado');
        }

        // Incrementar los asientos disponibles según el tipo de asiento del boleto
        if (boleto.tipoAsiento === 'turista') {
            vuelo.asientosTuristaDisponibles += 1;
        } else if (boleto.tipoAsiento === 'ejecutivo') {
            vuelo.asientosEjecutivosDisponibles += 1;
        }

        await vuelo.save();

        res.send('Boleto cancelado y vuelo actualizado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cancelar el boleto');
    }
};





/*

createBoleto = async (req, res, next) => {
    try {
        const { usuarioId, vueloId, tipoAsiento, cantidad } = req.body;
        console.log(`Inicio de creación de boleto: Usuario ${usuarioId}, Vuelo ${vueloId}, Tipo ${tipoAsiento}, Cantidad ${cantidad}`);

        const vuelo = await Vuelo.findById(vueloId);
        if (!vuelo) {
            console.error("Vuelo no encontrado.");
            return res.status(404).json("Vuelo no encontrado.");
        }

        console.log(`Asientos antes de la reserva: Turista ${vuelo.asientosTuristaDisponibles}, Ejecutivo ${vuelo.asientosEjecutivosDisponibles}`);

        if (tipoAsiento === 'turista' && vuelo.asientosTuristaDisponibles >= cantidad) {
            vuelo.asientosTuristaDisponibles -= cantidad;
        } else if (tipoAsiento === 'ejecutivo' && vuelo.asientosEjecutivosDisponibles >= cantidad) {
            vuelo.asientosEjecutivosDisponibles -= cantidad;
        } else {
            console.error("No hay suficientes asientos disponibles.");
            return res.status(400).json({ message: "No hay suficientes asientos disponibles para el tipo seleccionado." });
        }

        console.log(`Asientos después de la reserva: Turista ${vuelo.asientosTuristaDisponibles}, Ejecutivo ${vuelo.asientosEjecutivosDisponibles}`);

        // Guarda los cambios en el documento del vuelo
        await vuelo.save();

        // Crea y guarda los boletos
        let boletosCreados = [];
        for (let i = 0; i < cantidad; i++) {
            const nuevoBoleto = new Boleto({
                usuarioId,
                vueloId,
                tipoAsiento,
                precioFinal: tipoAsiento === 'ejecutivo' ? vuelo.precio * 1.5 : vuelo.precio,
                ciudad_origen: vuelo.ciudad_origen,
                ciudad_destino: vuelo.ciudad_destino,
                fecha_salida: vuelo.fecha_salida
            });

            const boletoGuardado = await nuevoBoleto.save();
            boletosCreados.push(boletoGuardado);
        }

        console.log(`${cantidad} boleto(s) creado(s) exitosamente.`);
        res.status(201).json(boletosCreados);
    } catch (err) {
        console.error("Error creando boleto:", err);
        next(err);
    }
}; */