<template>
    <div class="container">
      <h2>Analytics Dashboard</h2>
      <div>
        <form @submit.prevent="handleSearch">
          <div class="form-group">
            <label for="fechaDesde">Fecha Desde:</label>
            <input type="date" id="fechaDesde" v-model="filters.fechaDesde" class="form-control">
          </div>
          <div class="form-group">
            <label for="fechaHasta">Fecha Hasta:</label>
            <input type="date" id="fechaHasta" v-model="filters.fechaHasta" class="form-control">
          </div>
          <div class="form-group">
            <label for="tipoAcceso">Tipo de Acceso:</label>
            <select id="tipoAcceso" v-model="filters.tipoAcceso" class="form-control">
              <option value="">Todos</option>
              <option value="web">Web</option>
              <option value="api">API</option>
            </select>
          </div>
          <div class="form-check">
            <input type="checkbox" id="esAutenticado" v-model="filters.esAutenticado" class="form-check-input">
            <label for="esAutenticado" class="form-check-label">Autenticado</label>
          </div>
          <button type="submit" class="btn btn-primary">Buscar</button>
        </form>
      </div>
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

  
  const filters = ref({
    fechaDesde: '',
    fechaHasta: '',
    tipoAcceso: '',
    esAutenticado: null
  });
  
  const barChartData = ref(null);
  const lineChartData = ref(null);
  const pieChartData = ref(null);
  
  onMounted(() => {
    fetchAnalyticsData();
  });
  
  const fetchAnalyticsData = async () => {
    try {
      const { data } = await axios.get('/api/analiticos/registros');
      processChartData(data);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    }
  };
  
  const handleSearch = async () => {
    const queryParams = {
      params: {
        fechaDesde: filters.value.fechaDesde,
        fechaHasta: filters.value.fechaHasta,
        tipoAcceso: filters.value.tipoAcceso,
        esAutenticado: filters.value.esAutenticado
      }
    };
    try {
      const { data } = await axios.get('/api/analiticos/filtrar', queryParams);
      processChartData(data);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };
  
  const processChartData = (data) => {
    // You would process your data here to fit the structure needed for Chart.js
    // Update barChartData, lineChartData, pieChartData accordingly
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  .form-group {
    margin-bottom: 10px;
  }
  </style>
  