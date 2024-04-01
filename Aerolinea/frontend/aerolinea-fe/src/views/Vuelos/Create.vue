<script setup>
import { ref, nextTick } from 'vue'
import { sendRequest } from '../../functions'

const form = ref({ ciudad_origen: '', ciudad_destino: '', fecha_salida: '', precio: '' })
const ciudad_origenInput = ref('')
const ciudad_destinoInput = ref('')
const fecha_salidaInput = ref('')
const precioInput = ref('')
const save = () => {
    sendRequest('POST', form.value, 'http://localhost:8800/vuelos', '')
    form.value.ciudad_origen = ''
    form.value.ciudad_destino = ''
    form.value.fecha_salida = ''
    form.value.precio = ''
    nextTick(() => ciudad_origenInput.value.focus())
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
                                ref="ciudad_origenInput"
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
                                ref="ciudad_destinoInput"
                            />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-calendar-days"></i>
                            </span>
                            <input
                                type="datetime-local"
                                v-model="form.fecha_salida"
                                placeholder="Fecha de salida"
                                class="form-control"
                                required
                                ref="fecha_salidaInput"
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
                                ref="precioInput"
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
