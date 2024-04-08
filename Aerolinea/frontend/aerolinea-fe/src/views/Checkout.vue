<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Confirmar Reserva</h2>
    <div v-if="vuelo" class="card">
      <div class="card-body">
        <p class="card-text"><strong>Origen:</strong> {{ vuelo.ciudad_origen }}</p>
        <p class="card-text"><strong>Destino:</strong> {{ vuelo.ciudad_destino }}</p>
        <p class="card-text"><strong>Fecha de Salida:</strong> {{ fechayhoraFormateada(vuelo.fecha_salida, 'read') }}</p>
        <p class="card-text"><strong>Precio:</strong> Q{{ vuelo.precio }}</p>
        <div class="mb-3">
          <label for="tipoAsiento" class="form-label"><strong>Tipo de Asiento:</strong></label>
          <select id="tipoAsiento" v-model="tipoAsiento" class="form-select" @change="cargarAsientosDisponibles(vuelo._id)">
            <option value="turista">Turista</option>
            <option value="ejecutivo">Ejecutivo</option>
          </select>
        </div>
        <!-- Mostrar asientos disponibles -->
        <div v-if="asientosDisponibles[tipoAsiento] > 0">
          <p>Asientos disponibles: {{ asientosDisponibles[tipoAsiento] }}</p>
          <input type="number" v-model.number="cantidadSeleccionada" :max="asientosDisponibles[tipoAsiento]" min="1" placeholder="Cantidad de asientos" required>
        </div>
        <button @click="confirmarReserva" class="btn btn-primary w-100">Confirmar Reserva</button>
      </div>
    </div>
    <div v-else>
      <p>Cargando detalles del vuelo...</p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { fechayhoraFormateada } from '../functions.js';

const router = useRouter();
const vuelo = ref(null);
const tipoAsiento = ref('turista');
const asientosDisponibles = ref({ turista: 0, ejecutivo: 0 });
const cantidadSeleccionada = ref(); 

onMounted(() => {
  const vueloSeleccionado = localStorage.getItem('vueloSeleccionado');
  if (vueloSeleccionado) {
    vuelo.value = JSON.parse(vueloSeleccionado);
    cargarAsientosDisponibles(vuelo.value._id);
  } else {
    console.error('No se han proporcionado detalles del vuelo.');
    router.push({ name: 'VuelosDisponibles' });
  }
});

async function cargarAsientosDisponibles(vueloId) {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vuelos/${vueloId}/asientos-disponibles`);
    asientosDisponibles.value = {
      turista: data.asientosTuristaDisponibles,
      ejecutivo: data.asientosEjecutivosDisponibles
    };
  } catch (error) {
    console.error('Error al cargar asientos disponibles:', error);
  }
}

const confirmarReserva = async () => {
  const usuarioId = localStorage.getItem('user_id');
  if (!usuarioId) {
    alert('Por favor, inicia sesi.');

    console.error('Usuario no logueado');
    return;
  }

  const cantidad = parseInt(cantidadSeleccionada.value);
  if (isNaN(cantidad) || cantidad <= 0 || cantidad > asientosDisponibles.value[tipoAsiento.value]) {
    alert('Por favor, selecciona una cantidad válida de asientos dentro del rango disponible.');
    return;
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/boletos`, {
      usuarioId,
      vueloId: vuelo.value._id,
      tipoAsiento: tipoAsiento.value,
      cantidad 
    });
    alert('Reserva confirmada con éxito.');
    cargarAsientosDisponibles(vuelo.value._id); // Recarga la disponibilidad actualizada
    router.push({ name: 'HistorialReservas' });
  } catch (error) {
    alert('Hubo un problema al confirmar tu reserva. Por favor, intenta de nuevo.');
  }
};
</script>



<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card {
  background-color: white;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.card-body {
  padding: 2rem;
}

.card-text {
  margin-bottom: 1rem;
  color: #495057;
}

.btn-primary {
  background-color: #0056b3;
  border-color: #0056b3;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

.btn-primary:hover {
  background-color: #004494;
  border-color: #003d7a;
}

.form-select {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-select:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

input[type="number"] {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

input[type="number"]:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.mb-3 {
  margin-bottom: 1.5rem;
}
</style>
