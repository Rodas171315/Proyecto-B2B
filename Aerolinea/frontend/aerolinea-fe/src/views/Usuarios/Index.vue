<script setup>
import axios from 'axios';
import { ref, onMounted, nextTick } from 'vue';
import { confirmation, sendRequest, fechaFormateada } from '../../functions';
import Modal from '@/components/ModalItem.vue';
import Paginate from 'vuejs-paginate-next';

onMounted(() => {
    getUsuarios(1);
});
const usuarios = ref([]);
const load = ref(false);
const rows = ref(0);
const form = ref({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    nacionalidad: '',
    rol: '',
    pasaporte: '',
});
const emailInput = ref('');
const _id = ref('');
const title = ref('');
const operation = ref(1); // 1 para guardar y 2 para editar
const close = ref([]);

const getUsuarios = async (page) => {
    await axios
        .get(import.meta.env.VITE_BACKEND_URL + '/usuarios?page=' + page)
        .then(
            (response) => (
                (usuarios.value = response.data), (rows.value = response.data.last_page)
            ),
        );
    load.value = true;
};
const deleteUsuario = (_id) => {
    confirmation(_id, import.meta.env.VITE_BACKEND_URL + '/usuarios/' + _id, '/usuarios');
};
const openModal = (
    op,
    email,
    password,
    nombre,
    apellido,
    fecha_nacimiento,
    nacionalidad,
    pasaporte,
    rol,
    usuario,
) => {
    clear();
    setTimeout(() => nextTick(() => emailInput.value.focus()), 600);
    operation.value = op;
    _id.value = usuario;
    if (op == 1) {
        title.value = 'Crear usuario';
    } else {
        title.value = 'Editar usuario';
        form.value.email = email;
        form.value.password = password;
        form.value.nombre = nombre;
        form.value.apellido = apellido;
        form.value.fecha_nacimiento = fechaFormateada(fecha_nacimiento);
        form.value.nacionalidad = nacionalidad;
        form.value.pasaporte = pasaporte;
        form.value.rol = rol;
    }
};
const clear = () => {
    form.value.email = '';
    form.value.password = '';
    form.value.nombre = '';
    form.value.apellido = '';
    form.value.fecha_nacimiento = '';
    form.value.nacionalidad = '';
    form.value.pasaporte = '';
    form.value.rol = '';
};
const save = async () => {
    let res;
    if (operation.value == 1) {
        res = await sendRequest(
            'POST',
            form.value,
            import.meta.env.VITE_BACKEND_URL + '/usuarios',
            '',
        );
        if (res == true) {
            clear();
            nextTick(() => emailInput.value.focus());
            getUsuarios(1);
        }
    } else {
        res = await sendRequest(
            'PUT',
            form.value,
            import.meta.env.VITE_BACKEND_URL + '/usuarios/' + _id.value,
            '/usuarios',
        );
        if (res == true) {
            nextTick(() => close.value.click());
        }
    }
};
</script>
<template>
    <div class="row">
        <div class="col-md-4 offset-md-4">
            <div class="d-grid col-10 mx-auto">
                <button
                    class="btn btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#modal"
                    @click="($event) => openModal(1)"
                >
                    <i class="fa-solid fa-circle-plus"></i> Agregar
                </button>
            </div>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-md-10 offset-md-1">
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
                            <th>Email</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Nacionalidad</th>
                            <th>Pasaporte</th>
                            <th>Rol</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="(usuario, i) in usuarios" :key="usuario._id">
                            <td>{{ i + 1 }}</td>
                            <td>{{ usuario.email }}</td>
                            <td>{{ usuario.nombre }}</td>
                            <td>{{ usuario.apellido }}</td>
                            <td>{{ fechaFormateada(usuario.fecha_nacimiento) }}</td>
                            <td>{{ usuario.nacionalidad }}</td>
                            <td>{{ usuario.pasaporte }}</td>
                            <td>{{ usuario.isAdmin ? 'Administrador' : 'Usuario' }}</td>
                            <td>
                                <button
                                    class="btn btn-warning"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modal"
                                    @click="
                                        ($event) =>
                                            openModal(
                                                2,
                                                usuario.email,
                                                usuario.password,
                                                usuario.nombre,
                                                usuario.apellido,
                                                usuario.fecha_nacimiento,
                                                usuario.nacionalidad,
                                                usuario.pasaporte,
                                                usuario.rol,
                                                usuario._id,
                                            )
                                    "
                                >
                                    <i class="fa-solid fa-edit"></i>
                                </button>
                            </td>
                            <td>
                                <button
                                    class="btn btn-danger"
                                    @click="($event) => deleteUsuario(usuario._id)"
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Paginate
                    :page-count="rows"
                    :click-handler="getUsuarios"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :container-class="'pagination'"
                ></Paginate>
            </div>
        </div>
    </div>
    <Modal id="modal" :title="title">
        <div class="modal-body">
            <form @submit.prevent="save">
                <div class="input-group mb-3">
                    <span class="input-group-text">
                        <i class="fa-solid fa-envelope"></i>
                    </span>
                    <input
                        autofocus
                        type="email"
                        v-model="form.email"
                        placeholder="Email"
                        class="form-control"
                        required
                        ref="emailInput"
                    />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">
                        <i class="fa-solid fa-lock"></i>
                    </span>
                    <input
                        autofocus
                        type="password"
                        v-model="form.password"
                        placeholder="Contraseña"
                        class="form-control"
                        required
                        ref="passwordInput"
                    />
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
                <div class="input-group mb-3">
                    <span class="input-group-text">
                        <i class="fa-solid fa-user-tie"></i>
                    </span>
                    <input
                        type="text"
                        v-model="form.apellido"
                        placeholder="Apellido"
                        class="form-control"
                        required
                        ref="apellidoInput"
                    />
                </div>
                <div class="mb-3">
                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="fa-solid fa-calendar-days"></i>
                        </span>
                        <input
                            type="date"
                            v-model="form.fecha_nacimiento"
                            placeholder="Fecha de nacimiento"
                            class="form-control"
                            required
                            ref="fecha_nacimientoInput"
                            aria-describedby="fecha_nacimientoHelpBlock"
                        />
                    </div>
                    <div id="fecha_nacimientoHelpBlock" class="form-text">Fecha de nacimiento</div>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">
                        <i class="fa-solid fa-earth-americas"></i>
                    </span>
                    <input
                        type="text"
                        v-model="form.nacionalidad"
                        placeholder="Nacionalidad"
                        class="form-control"
                        required
                        ref="nacionalidadInput"
                    />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">
                        <i class="fa-solid fa-passport"></i>
                    </span>
                    <input
                        type="number"
                        v-model="form.pasaporte"
                        placeholder="Pasaporte"
                        class="form-control"
                        required
                        ref="pasaporteInput"
                    />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">
                        <i class="fa-solid fa-key"></i>
                    </span>
                    <div class="form-check form-check-reverse">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            id="isAdmin"
                            v-model="form.isAdmin"
                        />
                        <label class="form-check-label" for="isAdmin">¿Es Administrador?</label>
                    </div>
                </div>
                <div class="d-grid col-10 mx-auto">
                    <button class="btn btn-success">
                        <i class="fa-solid fa-save"></i> Guardar
                    </button>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button class="btn btn-dark" ref="close" data-bs-dismiss="modal">Cerrar</button>
        </div>
    </Modal>
</template>
