<script setup>
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
</script>
<template>
    <nav class="navbar navbar-expand-lg bg-body-secondary">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">UNIS Airlines</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <!--
                    <li class="nav-item h4">
                        {{ authStore.user.name }}
                    </li>
                    -->
                    <li class="nav-item">
                        <RouterLink to="/vuelos" class="nav-link">Vuelos</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/usuarios" class="nav-link">Usuarios</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/graphic" class="nav-link">Graficas</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/reports" class="nav-link">Reportes</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/vuelosdisponibles" class="nav-link"
                            >Vuelos Disponibles</RouterLink
                        >
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/register" class="nav-link">Registrarse</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/login" class="nav-link">Iniciar Sesión</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/perfil" class="nav-link">Perfil</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/historialreservas" class="nav-link"
                            >Mis Reservas</RouterLink
                        >
                    </li>
                </ul>
                <ul class="navbar-nav me-2 mb-2 mb-lg-0">
                    <li class="nav-item px-lg-5">
                        <button @click="($event) => authStore.logout()" class="btn btn-danger">
                            Salir
                        </button>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input
                        class="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>
