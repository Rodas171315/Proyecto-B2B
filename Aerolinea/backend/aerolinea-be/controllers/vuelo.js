import Vuelo from "../models/Vuelo.js";
import Boleto from "../models/Boleto.js"; 

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
    const vueloId = req.params.id;
    const vuelo = await Vuelo.findById(vueloId);
    if (!vuelo) {
      return res.status(404).json({ message: "Vuelo no encontrado" });
    }

    // Calcula asientos reservados por tipo de asiento
    const boletos = await Boleto.find({ vueloId: vuelo._id });
    const asientosReservadosTurista = boletos.filter(boleto => boleto.tipoAsiento === 'turista').length;
    const asientosReservadosEjecutivo = boletos.filter(boleto => boleto.tipoAsiento === 'ejecutivo').length;

    // Calcula asientos disponibles
    const asientosTuristaDisponibles = Math.max(0, vuelo.asientosTuristaDisponibles - asientosReservadosTurista);
    const asientosEjecutivosDisponibles = Math.max(0, vuelo.asientosEjecutivosDisponibles - asientosReservadosEjecutivo);

    res.status(200).json({
      asientosTuristaDisponibles,
      asientosEjecutivosDisponibles
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCiudadesDisponibles = async (req, res) => {
    try {
      const vuelos = await Vuelo.find();
      let ciudadesOrigen = new Set();
      let ciudadesDestino = new Set();
      vuelos.forEach(vuelo => {
        ciudadesOrigen.add(vuelo.ciudad_origen);
        ciudadesDestino.add(vuelo.ciudad_destino);
      });
      res.status(200).json({ origen: [...ciudadesOrigen], destino: [...ciudadesDestino] });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las ciudades disponibles", error });
    }
  };
  
  
  export const buscarVuelosConEscala = async (req, res) => {
    const { origen, destino } = req.query;
    console.log("Origen:", origen, "Destino:", destino);  // Debug: imprimir parámetros

    try {
        const vuelosDirectos = await Vuelo.find({ ciudad_origen: origen, ciudad_destino: destino });
        console.log("Vuelos Directos:", vuelosDirectos.length);  // Debug: cantidad de vuelos directos

        const vuelosDesdeOrigen = await Vuelo.find({ ciudad_origen: origen });
        const vuelosHaciaDestino = await Vuelo.find({ ciudad_destino: destino });
        console.log("Vuelos Desde Origen:", vuelosDesdeOrigen.length, "Vuelos Hacia Destino:", vuelosHaciaDestino.length);  // Debug: cantidades

        let combinaciones = [];
        
        vuelosDesdeOrigen.forEach(vuelo1 => {
            vuelosHaciaDestino.forEach(vuelo2 => {
                if (vuelo1.ciudad_destino === vuelo2.ciudad_origen) {
                    let tiempoEscala = new Date(vuelo2.fecha_salida) - new Date(vuelo1.fecha_salida);
                    tiempoEscala = tiempoEscala / (1000 * 60 * 60);  // Convertir a horas

                    if (tiempoEscala >= 2 && tiempoEscala <= 48) {
                        combinaciones.push({ vuelo1, vuelo2, tiempoEscala });
                    }
                }
            });
        });

        console.log("Combinaciones encontradas:", combinaciones.length);  // Debug: cantidad de combinaciones
        res.status(200).json({ directos: vuelosDirectos, conEscala: combinaciones });
    } catch (error) {
        console.error("Error al buscar vuelos", error);
        res.status(500).json({ message: "Error al buscar vuelos", error });
    }
};





  

  // http://localhost:8800/vuelos/filtered?ciudad_origen=valor1&ciudad_destino=valor2&fecha_salida=fecha

  // ejemplo para agencia: http://localhost:8800/vuelos/filtered?ciudad_origen=Guatemala&ciudad_destino=Bogot%C3%A1&fecha_salida=2024-03-23


