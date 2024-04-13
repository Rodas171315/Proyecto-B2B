// Select the database to use.
use('prueba');

/* Crea un documento de prueba en la coleccion products
db.products.insertOne({
    name: 'Iphone',
    price: '1000',
    description: 'Iphone is a smartphone',
    category: 'smartphone'
})
*/

db.getCollection('vuelos').aggregate([
    // Encontrar todos los vuelos con origen tal y destino tal.
  { $match: { 
      ciudad_origen: "Tokyo", 
      ciudad_destino: "Madrid"
    } 
  },
  { $group: {
      //_id: { dia: { $dayOfMonth: "$fecha_salida"}, mes: { $month: "$fecha_salida"}, anio: { $year: "$fecha_salida" } },
      _id : { $dateToString: { format: "%Y-%m-%d", date: "$fecha_salida" } },
      totalDuracion: { $sum: { $sum: ["$duracion", "$duracion_escala"] } },
      precio: { $last: "$precio" }
    } 
  },
  { $sort: {
      totalDuration: 1,
      precio: 1
    }
  }
]);
