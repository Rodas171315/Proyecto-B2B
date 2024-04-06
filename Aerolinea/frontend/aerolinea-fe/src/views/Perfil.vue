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
        <h2>No hay información disponible. Por favor, inicia sesión.</h2>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PerfilView',
    data() {
        return {
            // datos del usuario se obtendrán dinámicamente,
            // inicialmente se configura como un objeto vacío
            usuario: {},
        };
    },
    methods: {
        cerrarSesion() {
            // Limpiar localStorage o cualquier otro mecanismo de autenticación que estés usando
            localStorage.removeItem('user_id');
            // Añadir cualquier otra limpieza necesaria aquí
            
            // Redirigir al usuario a la página de inicio o de inicio de sesión
            this.$router.push({ name: 'login' });
        }
    },
    mounted() {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + '/usuarios/' + localStorage.user_id)
            .then((response) => {
                this.usuario = response.data;
            })
            .catch((error) => {
                console.error('Error al cargar los datos del perfil:', error);
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
