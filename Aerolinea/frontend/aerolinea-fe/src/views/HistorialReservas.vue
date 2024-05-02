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
          <button class="btn btn-success" @click="downloadPDF(boleto)">Descargar PDF</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { jsPDF } from 'jspdf';
import { fechayhoraFormateada } from '../functions.js';

const boletos = ref([]);

onMounted(async () => {
  const usuarioId = localStorage.getItem('user_id');
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/boletos/usuario/${usuarioId}`);
  boletos.value = response.data;
});

function downloadPDF(boleto) {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Detalle de la Reserva', 105, 20, null, null, 'center');
  
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  let verticalOffset = 40; 

  doc.text(`Origen: ${boleto.vueloId.ciudad_origen}`, 20, verticalOffset);
  verticalOffset += 10;
  doc.text(`Destino: ${boleto.vueloId.ciudad_destino}`, 20, verticalOffset);
  verticalOffset += 10;
  doc.text(`Fecha de Salida: ${fechayhoraFormateada(boleto.fecha_salida, 'read')}`, 20, verticalOffset);
  verticalOffset += 10;
  doc.text(`Tipo de Asiento: ${boleto.tipoAsiento}`, 20, verticalOffset);
  verticalOffset += 10;
  doc.text(`Estado: ${boleto.estadoReserva ? 'Activo' : 'Cancelado'}`, 20, verticalOffset);
  verticalOffset += 10;
  doc.text(`Precio Final: Q${boleto.precioFinal}`, 20, verticalOffset);
  
  verticalOffset += 20;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`UNIS Airlines - ${new Date().toLocaleDateString()}`, 105, verticalOffset, null, null, 'center');

  doc.save(`Reserva_${boleto._id}.pdf`);
}
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
.btn-success {
  margin-left: auto;
}
</style>
