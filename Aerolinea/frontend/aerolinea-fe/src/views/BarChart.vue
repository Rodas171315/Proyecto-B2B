<template>
    <div>
      <canvas ref="barCanvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  const props = defineProps({
    chartData: Object
  });
  
  const barCanvas = ref(null);
  
  onMounted(() => {
    const ctx = barCanvas.value.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: props.chartData,
      options: {}
    });
  });
  </script>
  