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



export const getFilteredVuelos = async (req, res, next) => {
    let query = {};

    const { ciudad_origen, ciudad_destino, fecha_salida } = req.query;

    if (ciudad_origen) query.ciudad_origen = ciudad_origen;
    if (ciudad_destino) query.ciudad_destino = ciudad_destino;
    if (fecha_salida) {
        // Aquí asumimos que quieres buscar vuelos en una fecha específica sin tener en cuenta la hora
        let fechaInicio = new Date(fecha_salida);
        let fechaFin = new Date(fecha_salida);
        fechaFin.setDate(fechaFin.getDate() + 1);

        query.fecha_salida = {
            $gte: fechaInicio,
            $lt: fechaFin
        };
    }

    try {
        const vuelos = await Vuelo.find(query);
        res.status(200).json(vuelos);
    } catch (err) {
        next(err);
    }
};

export const filtrarVuelos = async (req, res) => {
    try {
      const { ciudad_origen, ciudad_destino, fecha_salida } = req.query;
      const query = {};
  
      if (ciudad_origen) query.ciudad_origen = ciudad_origen;
      if (ciudad_destino) query.ciudad_destino = ciudad_destino;
      if (fecha_salida) query.fecha_salida = new Date(fecha_salida);
  
      const vuelos = await Vuelo.find(query);
      res.status(200).json(vuelos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  export const getAsientosDisponibles = async (req, res) => {
    try {
      const vuelo = await Vuelo.findById(req.params.id);
      if (!vuelo) {
        return res.status(404).json({ message: "Vuelo no encontrado" });
      }
      res.status(200).json({
        asientosTuristaDisponibles: vuelo.asientosTuristaDisponibles,
        asientosEjecutivosDisponibles: vuelo.asientosEjecutivosDisponibles
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  // http://localhost:8800/vuelos/filtered?ciudad_origen=valor1&ciudad_destino=valor2&fecha_salida=fecha

  // ejemplo para agencia: http://localhost:8800/vuelos/filtered?ciudad_origen=Guatemala&ciudad_destino=Bogot%C3%A1&fecha_salida=2024-03-23


