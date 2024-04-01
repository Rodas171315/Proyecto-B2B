<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { sendRequest } from '../../functions'
import axios from 'axios'

const route = useRoute()
const form = ref({ id: '', ciudad_origen: '', ciudad_destino: '', fecha_salida: '', precio: '' })
const id = ref(route.params.id)
onMounted(() => {
    getVuelo()
})
const getVuelo = () => {
    axios
        .get('http://localhost:8800/vuelos/' + id.value)
        .then(
            (response) => (
                (form.value.ciudad_origen = response.data.ciudad_origen),
                (form.value.ciudad_destino = response.data.ciudad_destino),
                (form.value.fecha_salida = response.data.fecha_salida),
                (form.value.precio = response.data.precio)
            ),
        )
}
const save = () => {
    sendRequest('PUT', form.value, 'http://localhost:8800/vuelos/' + id.value, '/vuelos')
}
</script>
<template>
    <div class="row mt-5">
        <div class="col-md-4 offset-md-4">
            <div class="card border border-success">
                <div class="card-header bg-success border border-success"></div>
                <div class="card-body">
                    <form @submit.prevent="save">
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-building"></i>
                            </span>
                            <input
                                autofocus
                                type="text"
                                v-model="form.ciudad_origen"
                                placeholder="Ciudad de origen"
                                class="form-control"
                                required
                            />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-building"></i>
                            </span>
                            <input
                                type="text"
                                v-model="form.ciudad_destino"
                                placeholder="Ciudad de destino"
                                class="form-control"
                                required
                            />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-calendar-days"></i>
                            </span>
                            <input
                                type="text"
                                v-model="form.fecha_salida"
                                placeholder="Fecha de salida"
                                class="form-control"
                                required
                            />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-money-bill"></i>
                            </span>
                            <input
                                type="number"
                                v-model="form.precio"
                                placeholder="Precio"
                                class="form-control"
                                required
                            />
                        </div>
                        <div class="d-grid col-10 mx-auto">
                            <button class="btn btn-dark">
                                <i class="fa-solid fa-save"></i> Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
