import { defineStore } from 'pinia';
import { show_alerta } from '@/functions';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({ authUser: null, authToken: null }),
    getters: {
        user: (state) => state.authUser,
        token: (state) => state.authToken,
    },
    actions: {
        async getToken() {
            await axios.get(import.meta.env.VITE_BACKEND_URL + '/cookie');
        },
        async login(form) {
            await this.getToken();
            await axios
                .post(import.meta.env.VITE_BACKEND_URL + '/auth/login', form)
                .then((res) => {
                    this.authToken = res.data.token;
                    this.authUser = res.data.data;
                    this.router.push('/vuelos');
                })
                .catch((errors) => {
                    let desc = '';
                    errors.response.data.errors.map((e) => {
                        desc = desc + ' ' + e;
                    });
                    show_alerta(desc, 'error', '');
                });
        },
        async register(form) {
            await this.getToken();
            await axios
                .post(import.meta.env.VITE_BACKEND_URL + '/auth/register', form)
                .then((res) => {
                    show_alerta(res.data.message, 'success', '');
                    setTimeout(() => this.router.push('/login'), 2000);
                })
                .catch((errors) => {
                    let desc = '';
                    errors.response.data.errors.map((e) => {
                        desc = desc + ' ' + e;
                    });
                    show_alerta(desc, 'error', '');
                });
        },
        async logout() {
            /*
            await axios.get(import.meta.env.VITE_BACKEND_URL + '/auth/logout', this.authToken);
            this.authToken = null;
            this.authUser = null;
            */
            localStorage.user_id = null;
            localStorage.isAdmin = null;
            this.router.push('/');
        },
    },
    persist: true,
});
