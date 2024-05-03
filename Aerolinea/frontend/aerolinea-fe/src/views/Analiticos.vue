<template>
  <div class="container">
    <h2>Panel de Análisis</h2>
    <div class="charts-container">
      <div v-if="barChartData">
        <bar-chart ref="barChartRef" :chart-data="barChartData" />
        <button @click="downloadCSV(barChartData, 'bar-chart')">Descargar Datos (CSV)</button>
      </div>
      <div v-if="lineChartData">
        <line-chart ref="lineChartRef" :chart-data="lineChartData" />
        <button @click="downloadCSV(lineChartData, 'line-chart')">Descargar Datos (CSV)</button>
      </div>
      <div v-if="pieChartData">
        <pie-chart ref="pieChartRef" :chart-data="pieChartData" />
        <button @click="downloadCSV(pieChartData, 'pie-chart')">Descargar Datos (CSV)</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BarChart from '@/views/BarChart.vue';
import LineChart from '@/views/LineChart.vue';
import PieChart from '@/views/PieChart.vue';

const barChartRef = ref(null);
const lineChartRef = ref(null);
const pieChartRef = ref(null);
const barChartData = ref(null);
const lineChartData = ref(null);
const pieChartData = ref(null);

onMounted(() => {
  fetchAnalyticsData();
});

const fetchAnalyticsData = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/analiticos/registros`);
    processChartData(data);
  } catch (error) {
    console.error('Failed to fetch analytics data:', error);
  }
};
  
  const processChartData = (data) => {
    const originsCount = data.reduce((acc, item) => {
      const origin = item.parametrosBusqueda.split(';')[0].split('=')[1];
      acc[origin] = (acc[origin] || 0) + 1;
      return acc;
    }, {});
  
    barChartData.value = {
      labels: Object.keys(originsCount),
      datasets: [{
        label: 'Busquedas por Origen',
        backgroundColor: '#42A5F5',
        data: Object.values(originsCount)
      }]
    };
  
    const datesCount = data.reduce((acc, item) => {
      const date = new Date(item.fechaHora).toISOString().slice(0, 10);
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
  
    lineChartData.value = {
      labels: Object.keys(datesCount),
      datasets: [{
        label: 'Busquedas a lo largo del tiempo',
        backgroundColor: '#66BB6A',
        borderColor: '#66BB6A',
        data: Object.values(datesCount),
        fill: false
      }]
    };
  
    const authCount = data.reduce((acc, item) => {
      const key = item.esAutenticado ? 'Autenticado' : 'No Autenticado';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  
    pieChartData.value = {
      labels: Object.keys(authCount),
      datasets: [{
        label: 'Search Distribution',
        backgroundColor: ['#FFCA28', '#EF5350'],
        data: Object.values(authCount)
      }]
    };
  };




  const downloadChart = (chartRef, fileName) => {
  if (!chartRef.value) {
    console.error("Chart reference is not available");
    return;
  }
  const canvas = chartRef.value.$el.querySelector('canvas');
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `${fileName}.png`;
  link.click();
};

const downloadCSV = (chartData, fileName) => {
  if (!chartData) {
    console.error("Chart data is not available");
    return;
  }
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += chartData.labels.join(",") + "\r\n";
  chartData.datasets.forEach((dataset) => {
    csvContent += dataset.data.join(",") + "\r\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${fileName}.csv`);
  link.click();
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.charts-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  margin-top: 10px;
  padding: 6px 10px;
  background-color: #e16f18;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>