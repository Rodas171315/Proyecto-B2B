<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { sendRequest, fechayhoraFormateada } from '../../functions';
import axios from 'axios';

const route = useRoute();
const form = ref({ id: '', ciudad_origen: '', ciudad_destino: '', fecha_salida: '', precio: '' });
const id = ref(route.params.id);
onMounted(() => {
    getVuelo();
});
const getVuelo = () => {
    axios
        .get(import.meta.env.VITE_BACKEND_URL + '/vuelos/' + id.value)
        .then(
            (response) => (
                (form.value.ciudad_origen = response.data.ciudad_origen),
                (form.value.ciudad_destino = response.data.ciudad_destino),
                (form.value.fecha_salida = fechayhoraFormateada(
                    response.data.fecha_salida,
                    'edit',
                )),
                (form.value.precio = response.data.precio)
            ),
        );
};
const save = () => {
    form.value.fecha_salida = fechayhoraFormateada(form.value.fecha_salida, 'create');
    sendRequest(
        'PUT',
        form.value,
        import.meta.env.VITE_BACKEND_URL + '/vuelos/' + id.value,
        '/vuelos',
    );
};
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
                        <div class="mb-3">
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="fa-solid fa-calendar-days"></i>
                                </span>
                                <input
                                    type="datetime-local"
                                    v-model="form.fecha_salida"
                                    placeholder="Fecha de salida"
                                    class="form-control"
                                    required
                                    aria-describedby="fecha_salidaHelpBlock"
                                />
                            </div>
                            <div id="fecha_salidaHelpBlock" class="form-text">
                                Fecha y hora de salida del vuelo
                            </div>
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
                            <button class="btn btn-success">
                                <i class="fa-solid fa-save"></i> Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
