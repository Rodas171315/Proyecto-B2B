<template>
    <div class="login-container">
      <h1>Iniciar sesión</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  
  const handleLogin = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/auth/login', {
        email: email.value,
        password: password.value,
      });
  
      localStorage.setItem('user_id', response.data.details._id);
      localStorage.setItem('isAdmin', response.data.isAdmin.toString()); // Convertir booleano a string para almacenamiento
  
      // Redirigir al perfil y recargar la página para reflejar la sesión
      router.push('/perfil').then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  };


  const handleLogout = () => {
  localStorage.removeItem('user_id');
  localStorage.removeItem('isAdmin');
  router.push('/login').then(() => {
    window.location.reload();
  });
};




  </script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

h1 {
    text-align: center;
    color: #333;
}

.form-group {
    margin-bottom: 1.5em;
}

.form-group label {
    display: block;
    margin-bottom: 0.5em;
    color: #666;
    font-weight: bold;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

button[type='submit'] {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    color: #fff;
    background-color: #007bff;
    cursor: pointer;
    transition: background-color 0.2s;
}

button[type='submit']:hover {
    background-color: #0056b3;
}
</style>
