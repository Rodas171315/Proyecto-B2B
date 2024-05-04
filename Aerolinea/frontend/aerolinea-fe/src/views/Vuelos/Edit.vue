<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { sendRequest, fechayhoraFormateada } from '../../functions';
import axios from 'axios';

const route = useRoute();
const form = ref({
    id: '',
    ciudad_origen: '',
    ciudad_destino: '',
    fecha_salida: '',
    duracion: '',
    precio: '',
    asientosTuristaDisponibles: '',
    asientosEjecutivosDisponibles: '',
    imagenesUrl: [],
    esDirecto: false,
    ciudad_escala: '',
    duracion_escala: '',
});
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
                (form.value.duracion = response.data.duracion),
                (form.value.precio = response.data.precio),
                (form.value.asientosTuristaDisponibles = response.data.asientosTuristaDisponibles),
                (form.value.asientosEjecutivosDisponibles =
                    response.data.asientosEjecutivosDisponibles),
                (form.value.imagenesUrl[0] = response.data.imagenesUrl[0]),
                (form.value.imagenesUrl[1] = response.data.imagenesUrl[1]),
                (form.value.esDirecto = response.data.esDirecto),
                (form.value.ciudad_escala = response.data.ciudad_escala),
                (form.value.duracion_escala = response.data.duracion_escala)
            ),
        );
};
const save = () => {
    // BUG: Si al actualizar un usuario no cambiamos la fecha, esta falla
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
                                <i class="fa-solid fa-clock"></i>
                            </span>
                            <input
                                type="number"
                                v-model="form.duracion"
                                placeholder="Duracion del vuelo en horas"
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
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-chair"></i>
                            </span>
                            <input
                                type="number"
                                v-model="form.asientosTuristaDisponibles"
                                placeholder="Capacidad de asientos turistas"
                                class="form-control"
                                required
                            />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-couch"></i>
                            </span>
                            <input
                                type="number"
                                v-model="form.asientosEjecutivosDisponibles"
                                placeholder="Capacidad de asientos ejecutivos"
                                class="form-control"
                                required
                            />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-image"></i>
                            </span>
                            <input
                                type="text"
                                v-model="form.imagenesUrl[0]"
                                placeholder="URL de la imagen 1"
                                class="form-control"
                            />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-image"></i>
                            </span>
                            <input
                                type="text"
                                v-model="form.imagenesUrl[1]"
                                placeholder="URL de la imagen 2"
                                class="form-control"
                            />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-plane-circle-exclamation"></i>
                            </span>
                            <div class="form-check form-check-reverse">
                                <input
                                    type="checkbox"
                                    v-model="form.esDirecto"
                                    class="form-check-input"
                                    id="esDirecto"
                                />
                                <label class="form-check-label" for="esDirecto"
                                    >¿Es vuelo Directo?</label
                                >
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-building"></i>
                            </span>
                            <input
                                type="text"
                                v-model="form.ciudad_escala"
                                placeholder="Ciudad de escala"
                                class="form-control"
                            />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-clock"></i>
                            </span>
                            <input
                                type="number"
                                v-model="form.duracion_escala"
                                placeholder="Duracion de la escala en horas"
                                class="form-control"
                            />
                        </div>
                        <div class="d-grid col-10 mx-auto">
                            <button class="btn btn-success">
                                <i class="fa-solid fa-save"></i> Guardar
                            </button>
                        </div>
                    </form>
                </div>
                <div class="card-footer">
                    <RouterLink :to="{ path: '../vuelos' }" class="btn btn-dark">
                        <i class="fa-solid fa-arrow-left"></i> Regresar
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
