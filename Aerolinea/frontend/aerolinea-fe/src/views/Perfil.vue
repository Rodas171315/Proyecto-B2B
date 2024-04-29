<template>
    <div class="perfil-container" v-if="usuario && Object.keys(usuario).length > 0">
        <div class="perfil-header">
            <h1>Perfil de Usuario</h1>
        </div>
        <div class="perfil-info">
            <div class="info-item">
                <label>Nombre:</label>
                <span>{{ usuario.nombre }}</span>
            </div>
            <div class="info-item">
                <label>Apellido:</label>
                <span>{{ usuario.apellido }}</span>
            </div>
            <div class="info-item">
                <label>Correo electrónico:</label>
                <span>{{ usuario.email }}</span>
            </div>

            <div class="info-item">
                <label>Rol:</label>
                <span>{{ usuario.isAdmin ? 'Administrador' : 'Usuario' }}</span>
            </div>
        </div>
        <button class="btn btn-danger mt-3" @click="cerrarSesion">Cerrar Sesión</button>
    </div>
    <div v-else>
        <div class="card border border-white text-center" v-if="!load">
            <div class="card-body">
                <img src="/flight-loader.gif" class="img-fluid" />
                <h3>Cargando...</h3>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

// En PerfilView.vue
export default {
    name: 'PerfilView',
    data() {
        return {
            usuario: {},
            load: false,
        };
    },
    methods: {
        cerrarSesion() {
            localStorage.removeItem('user_id');
            this.$router.push({ name: 'login' });
        },
    },
    mounted() {
        this.load = true; // Comienza el estado de carga.
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${localStorage.user_id}`)
            .then((response) => {
                this.usuario = response.data;
                this.load = false; // Termina el estado de carga.
            })
            .catch((error) => {
                console.error('Error al cargar los datos del perfil:', error);
                this.load = false; // Asegura terminar el estado de carga incluso si hay un error.
            });
    },
};

</script>

<style>
.perfil-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
}

.perfil-header h1 {
    text-align: center;
}

.info-item {
    margin: 10px 0;
}

.info-item label {
    font-weight: bold;
}
.btn-danger {
    margin-top: 20px;
    display: block;
    width: 100%;
}
</style>
