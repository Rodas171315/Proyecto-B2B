<template>
    <div class="container">
      <h2>Panel de Análisis</h2>
      <div>
        <bar-chart :chart-data="barChartData" v-if="barChartData"/>
        <line-chart :chart-data="lineChartData" v-if="lineChartData"/>
        <pie-chart :chart-data="pieChartData" v-if="pieChartData"/>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import BarChart from '@/views/BarChart.vue';
  import LineChart from '@/views/LineChart.vue';
  import PieChart from '@/views/PieChart.vue';
  
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
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  </style>
  