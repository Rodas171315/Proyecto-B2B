import { createRouter, createWebHistory } from 'vue-router'
// import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue'),
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/Register.vue'),
        },
        {
            path: '/vuelos',
            name: 'vuelos',
            component: () => import('../views/Vuelos/Index.vue'),
        },
        {
            path: '/create',
            name: 'create',
            component: () => import('../views/Vuelos/Create.vue'),
        },
        {
            path: '/edit/:id',
            name: 'edit',
            component: () => import('../views/Vuelos/Edit.vue'),
        },
        {
            path: '/usuarios',
            name: 'usuarios',
            component: () => import('../views/Usuarios/Index.vue'),
        },
        {
            path: '/graphic',
            name: 'graphic',
            component: () => import('../views/Usuarios/Graphic.vue'),
        },
        {
            path: '/reports',
            name: 'reports',
            component: () => import('../views/Usuarios/Reports.vue'),
        },
    ],
})
/*
router.beforeEach(async (to) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()
  if(authRequired && !auth.user){
    auth.returnUrl = to.fullPath
    return '/login'
  }
})
*/
export default router
