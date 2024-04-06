<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Confirmar Reserva</h2>
    <div v-if="vuelo" class="card">
      <div class="card-body">
        <p class="card-text"><strong>Origen:</strong> {{ vuelo.ciudad_origen }}</p>
        <p class="card-text"><strong>Destino:</strong> {{ vuelo.ciudad_destino }}</p>
        <p class="card-text"><strong>Fecha de Salida:</strong> {{ formatFechaSalida(vuelo.fecha_salida) }}</p>
        <p class="card-text"><strong>Precio:</strong> Q{{ vuelo.precio }}</p>
        <div class="mb-3">
          <label for="tipoAsiento" class="form-label"><strong>Tipo de Asiento:</strong></label>
          <select id="tipoAsiento" v-model="tipoAsiento" class="form-select">
            <option value="turista">Turista</option>
            <option value="ejecutivo">Ejecutivo</option>
          </select>
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
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment';

const router = useRouter();
const vuelo = ref(null);
const tipoAsiento = ref('turista');

onMounted(() => {
  const vueloSeleccionado = localStorage.getItem('vueloSeleccionado');
  if (vueloSeleccionado) {
    vuelo.value = JSON.parse(vueloSeleccionado);
  } else {
    console.error('No se han proporcionado detalles del vuelo.');
    router.push({ name: 'VuelosDisponibles' });
  }
});

// Añadimos esta función para formatear la fecha
function formatFechaSalida(fecha) {
  return moment(fecha).format('YYYY-MM-DD HH:mm');
}

const confirmarReserva = async () => {
  const usuarioId = localStorage.getItem('user_id');
  if (!usuarioId) {
    console.error('Usuario no logueado');
    return;
  }

  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/boletos`, {
      usuarioId,
      vueloId: vuelo.value._id,
      tipoAsiento: tipoAsiento.value
    });
    alert('Reserva confirmada con éxito.');
    router.push({ name: 'HistorialReservas' });
  } catch (error) {
    console.error('Error al confirmar la reserva:', error);
    alert('Hubo un problema al confirmar tu reserva. Por favor, intenta de nuevo.');
  }
};
</script>
  
<style scoped>
.container {
  max-width: 500px;
  margin: auto;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,.075);
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.form-select {
  display: block;
  width: 100%;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  -moz-padding-start: calc(0.75rem - 3px);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
</style>