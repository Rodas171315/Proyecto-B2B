<template>
    <div class="container">
        <h2 class="mb-4 text-center">Vuelos Disponibles</h2>
        <!-- Filtros -->
        <div class="filters mb-4">
            <input
                v-model="filtroOrigen"
                type="text"
                placeholder="Origen"
                class="form-control me-2"
            />
            <input
                v-model="filtroDestino"
                type="text"
                placeholder="Destino"
                class="form-control me-2"
            />
            <input v-model="filtroFecha" type="date" class="form-control me-2" />
            <button @click="aplicarFiltros" class="btn btn-success">Filtrar</button>
        </div>
        <div class="card border border-white text-center" v-if="!load">
            <div class="card-body">
                <img src="/flight-loader.gif" class="img-fluid" />
                <h3>Cargando vuelos...</h3>
            </div>
        </div>
        <div v-else-if="vuelosFiltrados.length === 0" class="alert alert-warning" role="alert">
            No hay vuelos disponibles en este momento.
        </div>
        <div v-else class="d-flex flex-wrap justify-content-center">
            <div
                v-for="(vuelo, index) in vuelosFiltrados"
                :key="vuelo._id"
                class="card m-2"
                style="width: 18rem"
            >
                <div v-if="vuelo.imagenesUrl && vuelo.imagenesUrl.length">
                    <!-- Mostrar solo las primeras 2 imágenes -->
                    <img :src="vuelo.imagenesUrl[0]" class="card-img-top" alt="Imagen del vuelo" />
                    <img
                        v-if="vuelo.imagenesUrl[1]"
                        :src="vuelo.imagenesUrl[1]"
                        class="card-img-top"
                        alt="Imagen secundaria del vuelo"
                    />
                </div>
                <div class="card-body">
                    <h5 class="card-title">
                        {{ vuelo.ciudad_origen }} - {{ vuelo.ciudad_destino }}
                    </h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                        {{ fechayhoraFormateada(vuelo.fecha_salida, 'read') }}
                    </h6>
                    <p class="card-text">Precio: Q{{ vuelo.precio }}</p>
                    <p class="card-text">Valoración: {{ vuelo.valuacion }}/5</p>
                    <button @click="reservarVuelo(vuelo._id)" class="btn btn-primary">
                        Reservar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { confirmation, fechayhoraFormateada } from '../functions';
import { useRouter } from 'vue-router';

const router = useRouter();
const vuelos = ref([]);
const load = ref(false);
const filtroOrigen = ref('');
const filtroDestino = ref('');
const filtroFecha = ref('');

async function cargarVuelos() {
    try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/vuelos');
        vuelos.value = response.data;
        load.value = true;
    } catch (error) {
        console.error('Error al obtener los vuelos:', error);
        load.value = true;
    }
}

onMounted(cargarVuelos);

const vuelosFiltrados = computed(() => {
    return vuelos.value.filter((vuelo) => {
        const cumpleOrigen = vuelo.ciudad_origen
            .toLowerCase()
            .includes(filtroOrigen.value.toLowerCase());
        const cumpleDestino = vuelo.ciudad_destino
            .toLowerCase()
            .includes(filtroDestino.value.toLowerCase());
        const fechaVuelo = new Date(vuelo.fecha_salida).toISOString().slice(0, 10);
        const cumpleFecha = !filtroFecha.value || fechaVuelo === filtroFecha.value;
        return cumpleOrigen && cumpleDestino && cumpleFecha;
    });
});

async function aplicarFiltros() {
    cargarVuelos();
    registrarBusqueda();
}

async function registrarBusqueda() {
    try {
        const parametros = {
            origen: filtroOrigen.value,
            destino: filtroDestino.value,
            fecha: filtroFecha.value
        };
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/analiticos/registro-busqueda`, parametros);
    } catch (error) {
        console.error('Error registrando la búsqueda:', error);
    }
}

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
.container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
}

.card {
    background-color: #ffffff;
    border: 1px solid #dddddd;
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
