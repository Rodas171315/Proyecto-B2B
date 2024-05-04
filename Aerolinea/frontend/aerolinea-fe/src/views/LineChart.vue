<template>
    <div>
      <canvas ref="lineCanvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  const props = defineProps({
    chartData: Object
  });
  
  const lineCanvas = ref(null);
  
  onMounted(() => {
    const ctx = lineCanvas.value.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: props.chartData,
      options: {}
    });
  });
  </script>
  