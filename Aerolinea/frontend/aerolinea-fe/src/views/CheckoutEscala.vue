<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Confirmar Reserva de Vuelos con Escala</h2>
      <div v-if="combinacion">
        <!-- Detalles del primer vuelo -->
        <div class="card mb-3">
          <div class="card-header">
            Vuelo 1: {{ combinacion.vuelo1.ciudad_origen }} a {{ combinacion.vuelo1.ciudad_destino }}
          </div>
          <div class="card-body">
            <p><strong>Fecha de Salida:</strong> {{ fechayhoraFormateada(combinacion.vuelo1.fecha_salida, 'read') }}</p>
            <p><strong>Fecha Estimada de Llegada:</strong> {{ fechayhoraFormateada(calculaHoraLlegada(combinacion.vuelo1.fecha_salida, combinacion.vuelo1.duracion), 'read') }}</p>
            <p><strong>Precio:</strong> Q{{ combinacion.vuelo1.precio }}</p>
            <label for="tipoAsiento1" class="form-label"><strong>Tipo de Asiento:</strong></label>
            <select id="tipoAsiento1" v-model="tipoAsiento1" class="form-select">
              <option value="turista">Turista</option>
              <option value="ejecutivo">Ejecutivo</option>
            </select>
            <p>Asientos disponibles: {{ asientosDisponibles1[tipoAsiento1] }}</p>
            <input type="number" v-model="cantidad1" :max="asientosDisponibles1[tipoAsiento1]" min="1" placeholder="Cantidad de asientos" required>
          </div>
        </div>
        <!-- Detalles del segundo vuelo -->
        <div class="card mb-3">
          <div class="card-header">
            Vuelo 2: {{ combinacion.vuelo2.ciudad_origen }} a {{ combinacion.vuelo2.ciudad_destino }}
          </div>
          <div class="card-body">
            <p><strong>Fecha de Salida:</strong> {{ fechayhoraFormateada(combinacion.vuelo2.fecha_salida, 'read') }}</p>
            <p><strong>Fecha Estimada de Llegada:</strong> {{ fechayhoraFormateada(calculaHoraLlegada(combinacion.vuelo2.fecha_salida, combinacion.vuelo2.duracion), 'read') }}</p>
            <p><strong>Precio:</strong> Q{{ combinacion.vuelo2.precio }}</p>
            <label for="tipoAsiento2" class="form-label"><strong>Tipo de Asiento:</strong></label>
            <select id="tipoAsiento2" v-model="tipoAsiento2" class="form-select">
              <option value="turista">Turista</option>
              <option value="ejecutivo">Ejecutivo</option>
            </select>
            <p>Asientos disponibles: {{ asientosDisponibles2[tipoAsiento2] }}</p>
            <input type="number" v-model="cantidad2" :max="asientosDisponibles2[tipoAsiento2]" min="1" placeholder="Cantidad de asientos" required>
          </div>
        </div>
        <button @click="confirmarReservaCombinacion" class="btn btn-primary w-100">Confirmar Reserva de Combinación</button>
      </div>
      <div v-else>
        <p>Cargando detalles de la combinación...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { fechayhoraFormateada } from '../functions.js';
  
  const router = useRouter();
  const combinacion = ref(null);
  const tipoAsiento1 = ref('turista');
  const tipoAsiento2 = ref('turista');
  const asientosDisponibles1 = ref({ turista: 0, ejecutivo: 0 });
  const asientosDisponibles2 = ref({ turista: 0, ejecutivo: 0 });
  const cantidad1 = ref(1);
  const cantidad2 = ref(1);
  
  onMounted(async () => {
    const combinacionSeleccionada = localStorage.getItem('combinacionSeleccionada');
    if (combinacionSeleccionada) {
      combinacion.value = JSON.parse(combinacionSeleccionada);
      await cargarAsientosDisponibles(combinacion.value.vuelo1._id, asientosDisponibles1);
      await cargarAsientosDisponibles(combinacion.value.vuelo2._id, asientosDisponibles2);
    } else {
      console.error('No se han proporcionado detalles de la combinación.');
      router.push({ name: 'VuelosDisponibles' });
    }
  });
  
  const cargarAsientosDisponibles = async (vueloId, asientos) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vuelos/${vueloId}/asientos-disponibles`);
      asientos.value = {
        turista: data.asientosTuristaDisponibles,
        ejecutivo: data.asientosEjecutivosDisponibles
      };
    } catch (error) {
      console.error('Error al cargar asientos disponibles:', error);
      asientos.value = { turista: 0, ejecutivo: 0 };
    }
  };
  
  const calculaHoraLlegada = (fechaSalida, duracion) => {
    const fechaInicio = new Date(fechaSalida);
    const tiempoTotalMs = fechaInicio.getTime() + duracion * 3600000;
    return new Date(tiempoTotalMs);
  };
  
  const confirmarReservaCombinacion = async () => {
  const usuarioId = localStorage.getItem('user_id');
  if (!usuarioId) {
    alert('Por favor, inicia sesión.');
    return;
  }

  const payload = {
    usuarioId,
    vuelos: [{
      vueloId: combinacion.value.vuelo1._id,
      tipoAsiento: tipoAsiento1.value,
      cantidad: parseInt(cantidad1.value),
      ciudad_origen: combinacion.value.vuelo1.ciudad_origen,
      ciudad_destino: combinacion.value.vuelo1.ciudad_destino,
      fecha_salida: combinacion.value.vuelo1.fecha_salida,
      precio: combinacion.value.vuelo1.precio
    }, {
      vueloId: combinacion.value.vuelo2._id,
      tipoAsiento: tipoAsiento2.value,
      cantidad: parseInt(cantidad2.value),
      ciudad_origen: combinacion.value.vuelo2.ciudad_origen,
      ciudad_destino: combinacion.value.vuelo2.ciudad_destino,
      fecha_salida: combinacion.value.vuelo2.fecha_salida,
      precio: combinacion.value.vuelo2.precio
    }]
  };

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/boletos/reservar-combinacion`, payload);
    alert('Reserva de combinación confirmada con éxito.');
    router.push({ name: 'historialreservas' });
  } catch (error) {
    console.error('Error al confirmar la reserva de la combinación:', error);
    alert('Hubo un problema al confirmar tu reserva. Por favor, intenta de nuevo.');
  }
};

  </script>
  