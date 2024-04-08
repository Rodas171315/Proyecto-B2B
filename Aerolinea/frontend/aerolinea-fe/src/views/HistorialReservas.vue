<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Historial de Reservas</h2>
    <div v-if="boletos && boletos.length === 0" class="alert alert-info" role="alert">
      No tienes reservas.
    </div>
    <div v-else class="list-group">
      <div class="list-group-item list-group-item-action" v-for="boleto in boletos" :key="boleto._id">
        <div class="d-flex w-100 justify-content-between align-items-center">
          <div>
            <h5 class="mb-1">{{ boleto.vueloId.ciudad_origen }} - {{ boleto.vueloId.ciudad_destino }}</h5>
            <small>{{ fechayhoraFormateada(boleto.fecha_salida, 'read') }}</small>
            <p class="mb-1">Tipo de asiento: {{ boleto.tipoAsiento }}</p>
            <p class="mb-1" v-if="!boleto.estadoReserva"><strong>Estado:</strong> Cancelado</p>
            <small class="text-muted">Precio final: Q{{ boleto.precioFinal }}</small>
          </div>
          <button v-if="boleto.estadoReserva" class="btn btn-warning" @click="cancelarBoleto(boleto._id)">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fechayhoraFormateada } from '../functions.js';

const router = useRouter();
const boletos = ref([]);

onMounted(async () => {
  try {
    const usuarioId = localStorage.getItem('user_id');
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/boletos/usuario/${usuarioId}`);
    boletos.value = response.data;
  } catch (error) {
    console.error('Error al cargar el historial de reservas:', error);
  }
});

const cancelarBoleto = async (boletoId) => {
  try {
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/boletos/cancelar/${boletoId}`);
    alert('Reserva cancelada con éxito.');
    const usuarioId = localStorage.getItem('user_id');
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/boletos/usuario/${usuarioId}`);
    boletos.value = response.data;
  } catch (error) {
    console.error('Error al cancelar la reserva:', error);
    alert('No se pudo cancelar la reserva.');
  }
};
</script>
  
  

  <style scoped>
  .container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .alert-info {
    text-align: center;
  }
  
  .list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    border: 1px solid #e9ecef;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
    background-color: white;
  }
  
  .list-group-item-action:hover {
    background-color: #f8f9fa;
  }
  
  .btn-danger {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
  }
  
  .btn-danger:hover {
    background-color: #c82333;
    border-color: #bd2130;
  }
  
  .d-flex {
    align-items: center;
  }
  
  .mb-1 {
    margin-bottom: 0.25rem !important;
  }
  
  .text-muted {
    color: #6c757d !important;
  }
  </style>
  