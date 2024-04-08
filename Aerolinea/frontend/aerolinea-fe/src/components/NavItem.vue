<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">UNIS Airlines</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <!-- Muestra Vuelos Disponibles para todos los usuarios -->
                    <li class="nav-item">
                        <router-link to="/vuelosdisponibles" class="nav-link"
                            >Vuelos Disponibles</router-link
                        >
                    </li>
                    <!-- Muestra estas opciones solo si el usuario es administrador -->
                    <li class="nav-item" v-if="isAdmin">
                        <router-link to="/vuelos" class="nav-link">Vuelos</router-link>
                    </li>
                    <li class="nav-item" v-if="isAdmin">
                        <router-link to="/usuarios" class="nav-link">Usuarios</router-link>
                    </li>
                    <li class="nav-item" v-if="isAdmin">
                        <router-link to="/graphic" class="nav-link">Gráficas</router-link>
                    </li>
                    <li class="nav-item" v-if="isAdmin">
                        <router-link to="/reports" class="nav-link">Reportes</router-link>
                    </li>
                    <!-- Muestra Registrarse e Iniciar Sesión solo si el usuario no está autenticado -->
                    <li class="nav-item" v-if="!isAuthenticated">
                        <router-link to="/register" class="nav-link">Registrarse</router-link>
                    </li>
                    <li class="nav-item" v-if="!isAuthenticated">
                        <router-link to="/login" class="nav-link">Iniciar Sesión</router-link>
                    </li>
                    <!-- Muestra estas opciones solo si el usuario está autenticado -->
                    <li class="nav-item" v-if="isAuthenticated">
                        <router-link to="/perfil" class="nav-link">Perfil</router-link>
                    </li>
                    <li class="nav-item" v-if="isAuthenticated">
                        <router-link to="/historialreservas" class="nav-link"
                            >Mis Reservas</router-link
                        >
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const isAuthenticated = ref(false);
const isAdmin = ref(false);

// Reactivamente actualiza las variables basadas en el estado de autenticación y rol del usuario
watchEffect(() => {
    const userId = localStorage.getItem('user_id');
    const adminStatus = localStorage.getItem('isAdmin');

    isAuthenticated.value = !!userId;
    isAdmin.value = adminStatus === 'true';
});
</script>

<style scoped>
/* Tus estilos aquí */
</style>

<style scoped>
.navbar {
    background-color: #d65d5d; /* Color principal */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
    color: #bca77b !important;
    font-weight: bold;
}

.nav-link {
    color: #5b3434cc !important; /* Color de los enlaces */
    transition: color 0.3s;
}

.nav-link:hover {
    color: #c18138 !important; /* Color al pasar el mouse */
    background-color: transparent;
}

.navbar-toggler {
    border-color: rgba(236, 25, 25, 0.1);
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

@media (max-width: 992px) {
    .navbar-collapse {
        background-color: #cab9a1; /* Color de fondo cuando está colapsado */
    }

    .nav-link {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Línea divisoria */
    }
}
</style>
