<template>
    <div>
      <canvas ref="pieCanvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  const props = defineProps({
    chartData: Object
  });
  
  const pieCanvas = ref(null);
  
  onMounted(() => {
    const ctx = pieCanvas.value.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: props.chartData,
      options: {}
    });
  });
  </script>
  