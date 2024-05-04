<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { confirmation, fechayhoraFormateada } from '../../functions';

onMounted(() => {
    getVuelos();
});
const vuelos = ref([]);
const load = ref(false);
const getVuelos = async () => {
    await axios
        .get(import.meta.env.VITE_BACKEND_URL + '/vuelos')
        .then((response) => (vuelos.value = response.data));
    load.value = true;
};
const deleteVuelo = (id) => {
    confirmation(id, import.meta.env.VITE_BACKEND_URL + '/vuelos/' + id, '/vuelos');
};
</script>
<template>
    <div class="row">
        <div class="col-md-4 offset-md-4">
            <div class="d-grid col-10 mx-auto">
                <RouterLink :to="{ path: 'create' }" class="btn btn-dark">
                    <i class="fa-solid fa-circle-plus"></i> Agregar
                </RouterLink>
            </div>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-md-* offset-md-0">
            <div class="card border border-white text-center" v-if="!load">
                <div class="card-body">
                    <img src="/flight-loader.gif" class="img-fluid" />
                    <h3>Cargando...</h3>
                </div>
            </div>
            <div class="table-responsive" v-else>
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Fecha y hora de salida</th>
                            <th>Duracion</th>
                            <th>Precio</th>
                            <th>Asientos Disponibles</th>
                            <th>Ciudad de Escala</th>
                            <th>Duracion de Escala</th>
                            <th>Valuacion</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="(vuelo, i) in vuelos" :key="vuelo._id">
                            <td>{{ i + 1 }}</td>
                            <td>{{ vuelo.ciudad_origen }}</td>
                            <td>{{ vuelo.ciudad_destino }}</td>
                            <td>{{ fechayhoraFormateada(vuelo.fecha_salida, 'read') }}</td>
                            <td>{{ vuelo.duracion }} Horas</td>
                            <td>Q{{ vuelo.precio }}</td>
                            <td>
                                {{ vuelo.asientosTuristaDisponibles }} de Turista.<br />
                                {{ vuelo.asientosEjecutivosDisponibles }} de Ejecutiva.
                            </td>
                            <td>{{ vuelo.ciudad_escala }}</td>
                            <td>{{ vuelo.duracion_escala }} Horas</td>
                            <td>{{ vuelo.valuacion }}</td>
                            <td>
                                <RouterLink
                                    :to="{ path: 'edit/' + vuelo._id }"
                                    class="btn btn-warning"
                                    ><i class="fa-solid fa-edit"></i
                                ></RouterLink>
                            </td>
                            <td>
                                <button
                                    class="btn btn-danger"
                                    @click="($event) => deleteVuelo(vuelo._id)"
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
