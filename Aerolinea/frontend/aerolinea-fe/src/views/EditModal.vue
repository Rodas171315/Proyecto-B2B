<template>
    <div class="modal">
      <div class="modal-content">
        <span @click="$emit('close')">Close &times;</span>
        <h4>Edit Ticket: {{ boleto._id }}</h4>
        <select v-model="selectedTipoAsiento">
          <option value="turista">Turista - Disponibles: {{ asientosDisponibles.turista }}</option>
          <option value="ejecutivo">Ejecutivo - Disponibles: {{ asientosDisponibles.ejecutivo }}</option>
        </select>
        <button @click="submitChange">Confirm Change</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    boleto: Object
  });
  
  const selectedTipoAsiento = ref(props.boleto.tipoAsiento);
  const asientosDisponibles = ref({ turista: 0, ejecutivo: 0 });
  
  watch(() => props.boleto.vueloId._id, async (newVueloId) => {
    // Fetch seat availability when the modal opens or the vueloId changes
    if (newVueloId) {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vuelos/${newVueloId}/asientos-disponibles`);
      asientosDisponibles.value = data;
    }
  });
  
  const submitChange = async () => {
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/boletos/actualizar/${props.boleto._id}`, {
      nuevoTipoAsiento: selectedTipoAsiento.value
    });
    $emit('refresh');
    $emit('close');
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  </style>
  