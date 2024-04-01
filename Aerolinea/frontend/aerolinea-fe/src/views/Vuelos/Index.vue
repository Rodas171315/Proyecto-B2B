<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { confirmation } from '../../functions'

onMounted(() => {
    getVuelos()
})
const vuelos = ref([])
const load = ref(false)
const getVuelos = async () => {
    await axios
        .get('http://localhost:8800/vuelos')
        .then((response) => (vuelos.value = response.data))
    load.value = true
}
const deleteVuelo = (id) => {
    confirmation(id, 'http://localhost:8800/vuelos/' + id, '/vuelos')
}
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
        <div class="col-md-6 offset-md-3">
            <div class="card border border-white text-center" v-if="!load">
                <div class="card-body">
                    <img src="/flight-loader.gif" class="img-fluid" />
                </div>
            </div>
            <div class="table-responsive" v-else>
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Fecha de salida</th>
                            <th>Precio</th>
                            <th>Valuacion</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="(vuelo, i) in vuelos" :key="vuelo._id">
                            <td>{{ i + 1 }}</td>
                            <td>{{ vuelo.ciudad_origen }}</td>
                            <td>{{ vuelo.ciudad_destino }}</td>
                            <td>{{ vuelo.fecha_salida }}</td>
                            <td>Q{{ vuelo.precio }}</td>
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
