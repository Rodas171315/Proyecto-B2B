<template>
    <div class="container">
      <h2 class="mb-4 text-center">Vuelos Disponibles</h2>
      <!-- Filtros -->
      <div class="filters mb-4">
        <select v-model="filtroOrigen" class="form-control me-2">
          <option value="">Seleccione Origen</option>
          <option v-for="ciudad in ciudadesOrigen" :key="ciudad" :value="ciudad">{{ ciudad }}</option>
        </select>
        <select v-model="filtroDestino" class="form-control me-2">
          <option value="">Seleccione Destino</option>
          <option v-for="ciudad in ciudadesDestino" :key="ciudad" :value="ciudad">{{ ciudad }}</option>
        </select>
        <input v-model="filtroFecha" type="date" class="form-control me-2" />
        <button @click="aplicarFiltros" class="btn btn-success">Filtrar</button>
      </div>
        <div class="card border border-white text-center" v-if="!load">
            <div class="card-body">
                <img src="/flight-loader.gif" class="img-fluid" />
                <h3>Cargando vuelos...</h3>
            </div>
        </div>
        <div v-else-if="vuelosDirectos.length === 0 && vuelosConEscala.length === 0" class="alert alert-warning">
      No hay vuelos disponibles en este momento.
    </div>
        <div v-else class="d-flex flex-wrap justify-content-center">
            <div
                v-for="(vuelo, index) in vuelosFiltrados"
                :key="vuelo._id"
                class="card m-2"
                style="width: 18rem"
            >
            <div v-for="(vuelo, index) in vuelosDirectos" :key="vuelo._id" class="card m-2" style="width: 18rem">
        <template v-if="vuelo.imagenesUrl && vuelo.imagenesUrl.length">
          <!-- Mostrar solo las primeras 2 imágenes -->
          <img :src="vuelo.imagenesUrl[0]" class="card-img-top" alt="Imagen del vuelo" />
          <img v-if="vuelo.imagenesUrl[1]" :src="vuelo.imagenesUrl[1]" class="card-img-top" alt="Imagen secundaria del vuelo" />
        </template>


                    
                </div>
        <div class="card-body">
          <h5 class="card-title">{{ vuelo.ciudad_origen }} - {{ vuelo.ciudad_destino }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ fechayhoraFormateada(vuelo.fecha_salida, 'read') }}</h6>
          <p class="card-text">Duración del vuelo: {{ vuelo.duracion }} horas</p>
          <p class="card-text">Precio: Q{{ vuelo.precio }}</p>
          <p class="card-text">Valoración: {{ vuelo.valuacion }}/5</p>
          <div class="rating">
                        <span v-for="star in 5" :key="star" @click="rateFlight(vuelo._id, star)" :class="{ 'filled': star <= vuelo.valuacion }">&#9733;</span>
                    </div>
          <p v-if="!vuelo.esDirecto">Escala en {{ vuelo.ciudad_escala }} con una duración de {{ vuelo.duracion_escala }} horas.</p>
          <button @click="reservarVuelo(vuelo._id)" class="btn btn-primary">Reservar</button>
        </div>
      </div>




      <!-- Añadir una sección para vuelos con escala -->
<!-- Añadir una sección para vuelos con escala -->
<div v-for="(combinacion, idx) in vuelosConEscala" :key="'combinacion-' + idx" class="card m-2" style="width: 18rem">
  <div class="card-body">
    <h5 class="card-title">Combinación: {{ combinacion.vuelo1.ciudad_origen }} - {{ combinacion.vuelo2.ciudad_destino }}</h5>
    <h6 class="card-subtitle mb-2 text-muted">Escala en {{ combinacion.vuelo1.ciudad_destino }}</h6>
    <p class="card-text">Salida del vuelo 1: {{ fechayhoraFormateada(combinacion.vuelo1.fecha_salida, 'read') }}</p>
    <p class="card-text">Llegada estimada del vuelo 1: {{ fechayhoraFormateada(calculaHoraLlegada(combinacion.vuelo1.fecha_salida, combinacion.vuelo1.duracion), 'read') }}</p>
    <p class="card-text">Salida del vuelo 2: {{ fechayhoraFormateada(combinacion.vuelo2.fecha_salida, 'read') }}</p>
    <p class="card-text">Llegada estimada del vuelo 2: {{ fechayhoraFormateada(calculaHoraLlegada(combinacion.vuelo2.fecha_salida, combinacion.vuelo2.duracion), 'read') }}</p>
    <p class="card-text">Tiempo total de viaje: {{ calculaDuracionTotal(combinacion) }} horas (incluye escala)</p>
    <p class="card-text">Costo total: Q{{ combinacion.vuelo1.precio + combinacion.vuelo2.precio }}</p>
    <button @click="reservarCombinacion(combinacion)" class="btn btn-primary">Reservar Viaje</button>
  </div>
</div>

    </div>
  </div>
</template>


<script setup>
import axios from 'axios';
import { ref, onMounted, computed, watch } from 'vue';
import { confirmation, fechayhoraFormateada } from '../functions';
import { useRouter } from 'vue-router';


const router = useRouter();
const vuelosDirectos = ref([]);
const vuelosConEscala = ref([]); 
const vuelos = ref([]);
const load = ref(false);
const filtroOrigen = ref('');
const filtroDestino = ref('');
const filtroFecha = ref('');
const ciudadesOrigen = ref([]);
const ciudadesDestino = ref([]);
const userId = localStorage.getItem('user_id');

// Consolidated data fetching method
async function fetchData() {
  await fetchCiudadesDisponibles();
  await cargarVuelos();
  await cargarVuelosConFiltro(); // Renaming to reflect functionality

}

const fetchCiudadesDisponibles = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/vuelos/ciudades-disponibles');
    ciudadesOrigen.value = response.data.origen;
    ciudadesDestino.value = response.data.destino;
    console.log('Ciudades Origen:', ciudadesOrigen.value); // Debugging
    console.log('Ciudades Destino:', ciudadesDestino.value); // Debugging
  } catch (error) {
    console.error('Error al obtener ciudades disponibles:', error);
  }
};

async function cargarVuelos() {
  try {
    const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/vuelos');
    vuelos.value = response.data;
    load.value = true;
    console.log('Vuelos cargados:', vuelos.value); // Debugging
  } catch (error) {
    console.error('Error al obtener los vuelos:', error);
    load.value = true;
  }
}



async function cargarVuelosConFiltro() {
    load.value = false; // Establecer a false mientras carga
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vuelos/buscar-con-escala`, {
            params: { origen: filtroOrigen.value, destino: filtroDestino.value, fecha: filtroFecha.value }
        });
        vuelosDirectos.value = response.data.directos;
        vuelosConEscala.value = response.data.conEscala;
    } catch (error) {
        console.error('Error al buscar vuelos:', error);
    } finally {
        load.value = true; // Restablecer a true una vez que los datos se han cargado
    }
}



onMounted(fetchData);

const vuelosFiltrados = computed(() => vuelos.value.filter((vuelo) => {
  const cumpleOrigen = vuelo.ciudad_origen.toLowerCase().includes(filtroOrigen.value.toLowerCase());
  const cumpleDestino = vuelo.ciudad_destino.toLowerCase().includes(filtroDestino.value.toLowerCase());
  const fechaVuelo = new Date(vuelo.fecha_salida).toISOString().slice(0, 10);
  return cumpleOrigen && cumpleDestino && (!filtroFecha.value || fechaVuelo === filtroFecha.value);
}));

async function aplicarFiltros() {
    await cargarVuelosConFiltro(); // Correct the function name here
    await registrarBusqueda();
}


const calculaDuracionTotal = (combinacion) => {
    if (!combinacion || !combinacion.vuelo1 || !combinacion.vuelo2) return 0;

    // Convertimos las fechas de salida a objetos Date.
    const fechaSalidaVuelo1 = new Date(combinacion.vuelo1.fecha_salida);
    const fechaSalidaVuelo2 = new Date(combinacion.vuelo2.fecha_salida);

    // Mostramos las fechas de salida.
    console.log("Fecha de salida vuelo 1:", fechaSalidaVuelo1);
    console.log("Fecha de salida vuelo 2:", fechaSalidaVuelo2);

    // Calculamos la llegada del primer vuelo basándonos en su duración.
    const duracionVuelo1EnMinutos = combinacion.vuelo1.duracion * 60; // Duración del primer vuelo en minutos.
    const fechaLlegadaVuelo1 = new Date(fechaSalidaVuelo1.getTime() + duracionVuelo1EnMinutos * 60000); // Tiempo de llegada del primer vuelo.

    // Mostramos la hora de llegada calculada y la duración del vuelo.
    console.log("Hora de llegada del vuelo 1:", fechaLlegadaVuelo1);
    console.log("Duración del vuelo 1 (minutos):", duracionVuelo1EnMinutos);

    // Calculamos el tiempo de layover en minutos.
    const layoverDurationInMinutes = (fechaSalidaVuelo2 - fechaLlegadaVuelo1) / 60000; // Duración del layover en minutos.

    // Mostramos la duración del layover.
    console.log("Duración del layover (minutos):", layoverDurationInMinutes);

    // Duración del segundo vuelo en minutos.
    const duracionVuelo2EnMinutos = combinacion.vuelo2.duracion * 60;

    // Mostramos la duración del segundo vuelo.
    console.log("Duración del vuelo 2 (minutos):", duracionVuelo2EnMinutos);

    // Tiempo total de viaje en minutos, incluyendo vuelos y layover.
    const totalTravelTimeInMinutes = duracionVuelo1EnMinutos + layoverDurationInMinutes + duracionVuelo2EnMinutos;

    // Convertimos el tiempo total de viaje en minutos a horas para la presentación.
    const totalTravelTimeInHours = totalTravelTimeInMinutes / 60;  // Convertimos minutos a horas.

    // Mostramos el tiempo total de viaje en horas antes del redondeo.
    console.log("Tiempo total de viaje (horas):", totalTravelTimeInHours);

    // Redondeamos a dos decimales para la presentación.
    return totalTravelTimeInHours.toFixed(2);  // Redondeo a dos decimales.
};






const calculaHoraLlegada = (fechaSalida, duracion) => {
  const fechaInicio = new Date(fechaSalida);
  const tiempoTotalMs = fechaInicio.getTime() + duracion * 3600000; // Convierte horas en milisegundos
  return new Date(tiempoTotalMs);
};





async function registrarBusqueda() {
    const parametros = {
        origen: filtroOrigen.value,
        destino: filtroDestino.value,
        fecha: filtroFecha.value,
        usuarioId: userId,
        esAutenticado: !!userId 
    };

    try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/analiticos/registro-busqueda`, parametros);
        console.log('Búsqueda registrada con éxito');
    } catch (error) {
        console.error('Error registrando la búsqueda:', error.response.data);
    }
}



const rateFlight = async (vueloId, rating) => {
    try {
        const response = await axios.post('http://localhost:8800/revisiones', {
            vueloId,
            usuarioId: userId, 
            valoracion: rating,
            comentario: ''
        });
        console.log('Valoración enviada:', response.data);
    } catch (error) {
        console.error('Error al enviar la valoración:', error);
    }
};



const reservarVuelo = (vueloId) => {
    const vueloSeleccionado = vuelosFiltrados.value.find((vuelo) => vuelo._id === vueloId);
    if (!vueloSeleccionado) {
        console.error('Vuelo no encontrado');
        return;
    }
    localStorage.setItem('vueloSeleccionado', JSON.stringify(vueloSeleccionado));
    router.push({ name: 'Checkout' });
};
</script>


<style scoped>



.rating {
    unicode-bidi: bidi-override;
    direction: rtl;
    position: relative;
}
.rating span {
    display: inline-block;
    position: relative;
    width: 1.1em;
    color: transparent;
    cursor: pointer;
}
.rating span:before {
    content: '\2605';
    position: absolute;
    left: 0;
    color: #FFD700;
}
.rating span.filled:before {
    color: #FFD700;
}


.container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
}

.card {
    background-color: #f1e3df;
    border: 1px solid #e07f1d;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition:
        transform 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-body {
    padding: 15px;
}

.card-title {
    margin-bottom: 15px;
    color: #333333;
    font-weight: bold;
    font-size: 1.25rem;
}

.card-subtitle {
    color: #666666;
    margin-bottom: 15px;
}

.card-text {
    color: #555555;
    margin-bottom: 20px;
    font-size: 1rem;
    line-height: 1.5;
}

.btn-primary {
    background-color: #9f5816;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
    display: block;
    width: 80%;
    margin: 10px auto 20px auto;
}

.btn-primary:hover {
    background-color: #004094;
}

.d-flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.alert-warning {
    background-color: #ffecd1;
    color: #856404;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #ffeeba;
}

@media (max-width: 768px) {
    .card {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .btn-primary {
        width: auto;
        margin: 10px 20px;
    }
}
</style>
