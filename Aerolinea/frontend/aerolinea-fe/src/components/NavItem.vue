<template>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">UNIS Airlines</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/vuelosdisponibles" class="nav-link">Vuelos Disponibles</router-link>
            </li>
            <!-- Solo visible para administradores -->
            <template v-if="isAdmin">
              <li class="nav-item">
                <router-link to="/vuelos" class="nav-link">Vuelos</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/usuarios" class="nav-link">Usuarios</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/analiticos" class="nav-link">Analíticos</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/reports" class="nav-link">Reportes</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/administrar-boletos" class="nav-link">Administrar Boletos</router-link>
              </li>
            </template>
            <!-- Solo visible para no autenticados -->
            <template v-if="!isAuthenticated">
              <li class="nav-item">
                <router-link to="/register" class="nav-link">Registrarse</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/login" class="nav-link">Iniciar Sesión</router-link>
              </li>
            </template>
            <!-- Solo visible para autenticados -->
            <template v-if="isAuthenticated">
              <li class="nav-item">
                <router-link to="/perfil" class="nav-link">Perfil</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/historialreservas" class="nav-link">Mis Reservas</router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue';
  
  const isAuthenticated = ref(localStorage.getItem('user_id') !== null);
  const isAdmin = ref(localStorage.getItem('isAdmin') === 'true');
  
  // Reaccionar a cambios en el almacenamiento local
  watchEffect(() => {
    isAuthenticated.value = localStorage.getItem('user_id') !== null;
    isAdmin.value = localStorage.getItem('isAdmin') === 'true';
  });
  </script>
  
  




<style scoped>
/* Tus estilos aquí */
</style>

<style scoped>
/*
.navbar {
    background-color: #d65d5d;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
    color: #bca77b !important;
    font-weight: bold;
}

.nav-link {
    color: #5b3434cc !important;
    transition: color 0.3s;
}

.nav-link:hover {
    color: #c18138 !important;
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
        background-color: #cab9a1;
    }

    .nav-link {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
}
*/
</style>
