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
          <button v-if="boleto.estadoReserva" class="btn btn-primary" @click="openEditModal(boleto)">Editar</button>
          <button v-if="boleto.estadoReserva" class="btn btn-warning" @click="cancelarBoleto(boleto._id)">Cancelar</button>
        </div>
      </div>
    </div>
    <!-- Edit Modal -->
    <div v-if="selectedBoleto" class="modal">
      <div class="modal-content">
        <h4>Edit Ticket: {{ selectedBoleto._id }}</h4>
        <select v-model="selectedBoleto.tipoAsiento">
          <option value="turista">Turista</option>
          <option value="ejecutivo">Ejecutivo</option>
        </select>
        <button @click="submitEdit">Submit Changes</button>
        <button @click="closeEditModal">Close</button>
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
const selectedBoleto = ref(null);

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

const openEditModal = (boleto) => {
  selectedBoleto.value = {...boleto};
};

const closeEditModal = () => {
  selectedBoleto.value = null;
};

const submitEdit = async () => {
  try {
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/boletos/actualizar/${selectedBoleto.value._id}`, {
      tipoAsiento: selectedBoleto.value.tipoAsiento
    });
    alert('Edición completada con éxito.');
    closeEditModal();
    // Reload the updated list of tickets
    const usuarioId = localStorage.getItem('user_id');
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/boletos/usuario/${usuarioId}`);
    boletos.value = response.data;
  } catch (error) {
    console.error('Error updating the ticket:', error);
    alert('Failed to update the ticket.');
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

.btn-primary, .btn-warning {
  margin-right: 10px;
}

.btn-primary:hover, .btn-warning:hover {
  opacity: 0.85;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 300px;
}

.modal-content h4 {
  margin-bottom: 20px;
}

.modal-content select, .modal-content button {
  margin-top: 10px;
  width: 100%;
  padding: 8px 12px;
  box-sizing: border-box; /* Fixes padding and border widths */
}
</style>