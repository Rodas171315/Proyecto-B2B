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
          <span>{{ usuario.correo }}</span>
        </div>

      </div>
    </div>
    <div v-else>
      <h2>No hay información disponible. Por favor, inicia sesión.</h2>
    </div>
  </template>
  
  <script>
  export default {
    name: "Perfil",
    data() {
      return {
        // datos del usuario se obtendrán dinámicamente,
        // inicialmente se configura como un objeto vacío
        usuario: {},
      };
    },
    methods: {

    },
    mounted() {

      /*
      axios.get('url-a-tu-api/perfil')
        .then(response => {
          this.usuario = response.data;
        })
        .catch(error => {
          console.error('Error al cargar los datos del perfil:', error);
        });
      */
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
  
  </style>
  