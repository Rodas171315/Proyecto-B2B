<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Historial de Reservas</h2>
      <div v-if="boletos && boletos.length === 0" class="alert alert-info" role="alert">
        No tienes reservas.
      </div>
      <div v-else class="list-group">
        <a href="#" class="list-group-item list-group-item-action" v-for="boleto in boletos" :key="boleto._id">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ boleto.vueloId.ciudad_origen }} - {{ boleto.vueloId.ciudad_destino }}</h5>
            <small>{{ fechayhoraFormateada(boleto.vueloId.fecha_salida, 'read') }}</small>
          </div>
          <p class="mb-1">Tipo de asiento: {{ boleto.tipoAsiento }}</p>
          <small class="text-muted">Precio final: Q{{ boleto.precioFinal }}</small>
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { fechayhoraFormateada } from '../functions.js';
  
  const boletos = ref([]);
  
  onMounted(async () => {
    try {
      const usuarioId = localStorage.getItem('user_id');
      console.log('Usuario ID:', usuarioId);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/boletos/usuario/${usuarioId}`);
      console.log('Respuesta del servidor:', response.data);
      boletos.value = response.data.map(boleto => {
        // Asegura que cada boleto tenga un objeto vueloId asociado
        boleto.vueloId = boleto.vueloId || {};
        return boleto;
      });
    } catch (error) {
      console.error('Error al cargar el historial de reservas:', error);
    }
  });
  </script>
  

  <style scoped>
.container {
  max-width: 800px;
  margin: auto;
}

.alert-info {
  text-align: center;
}

.list-group-item-action:hover {
  background-color: #f8f9fa;
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