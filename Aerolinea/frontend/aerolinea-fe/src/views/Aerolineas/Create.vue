<script setup>
import { ref, nextTick } from 'vue';
import { sendRequest, handleLogout, fechayhoraFormateada } from '../../functions';

const form = ref({
    companyName: '',
    email: '',
    password: '',
    nombre: '',
});
const companyNameInput = ref('');
const emailInput = ref('');
const passwordInput = ref('');
const nombreInput = ref('');

const save = async () => {
    await sendRequest(
        'POST',
        form.value,
        import.meta.env.VITE_BACKEND_URL + '/aerolineas',
        '/login',
    );
    /*
    form.value = {
        companyName: '',
        email: '',
        password: '',
        nombre: '',
    };
    nextTick(() => companyNameInput.value.focus());
    */
    handleLogout();
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
                                v-model="form.companyName"
                                placeholder="Nombre de la aerolinea"
                                class="form-control"
                                required
                                ref="companyNameInput"
                            />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-envelope"></i>
                            </span>
                            <input
                                type="email"
                                v-model="form.email"
                                placeholder="Email"
                                class="form-control"
                                required
                                ref="emailInput"
                            />
                        </div>
                        <div class="mb-3">
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="fa-solid fa-lock"></i>
                                </span>
                                <input
                                    type="password"
                                    v-model="form.password"
                                    placeholder="Contraseña"
                                    class="form-control"
                                    required
                                    ref="passwordInput"
                                />
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-user"></i>
                            </span>
                            <input
                                type="text"
                                v-model="form.nombre"
                                placeholder="Nombre"
                                class="form-control"
                                required
                                ref="nombreInput"
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
                    <RouterLink :to="{ path: '/' }" class="btn btn-dark">
                        <i class="fa-solid fa-arrow-left"></i> Regresar
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
