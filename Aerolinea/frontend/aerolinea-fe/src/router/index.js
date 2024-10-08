import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import VuelosDisponibles from '../views/VuelosDisponibles.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Perfil from '../views/Perfil.vue';
import Vuelos from '../views/Vuelos/Index.vue';
import Usuarios from '../views/Usuarios/Index.vue';
import Graphic from '../views/Usuarios/Graphic.vue';
import Reports from '../views/Usuarios/Reports.vue';
import HistorialReservas from '../views/HistorialReservas.vue';
import Create from '../views/Vuelos/Create.vue';
import EditVuelo from '../views/Vuelos/Edit.vue'; 
import Checkout from '../views/Checkout.vue'; 

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/vuelosdisponibles', name: 'vuelosdisponibles', component: VuelosDisponibles },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/perfil', name: 'perfil', component: Perfil },
  { path: '/vuelos', name: 'vuelos', component: Vuelos, meta: { requiresAdmin: true } },
  { path: '/usuarios', name: 'usuarios', component: Usuarios, meta: { requiresAdmin: true } },
  { path: '/graphic', name: 'graphic', component: Graphic, meta: { requiresAdmin: true } },
  { path: '/reports', name: 'reports', component: Reports, meta: { requiresAdmin: true } },
  { path: '/historialreservas', name: 'historialreservas', component: HistorialReservas },
  { path: '/create', name: 'create', component: Create }, 
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditVuelo,
    props: true, 
  },
    { path: '/checkout', name: 'Checkout', component: Checkout },


    {
        path: '/historial-reservas',
        name: 'HistorialReservas',
        component: HistorialReservas, 
      },






];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user_id');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (to.meta.requiresAdmin && !isAdmin) {
    next('/login');
  } else {
    next();
  }
});

export default router;