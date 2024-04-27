<template>
<div class="comentarios-container">
  <h3>Comentarios</h3>
  <ul>
    <li v-for="(comentario, index) in comentarios" :key="comentario._id">
      <strong>{{ comentario.usuario ? comentario.usuario.nombre : 'Usuario desconocido' }}</strong>: {{ comentario.contenido }}
      <button @click="toggleRespuestas(index); logButtonClicked(comentario.usuario)">Ver/Ocultar Respuestas</button>
      <div v-if="mostrar[index]" class="respuestas">
        <ul>
          <li v-for="(respuesta, idxRespuesta) in comentario.respuestas" :key="respuesta._id">
            <comentario-component :comentario="respuesta" @updateComments="handleUpdateComments"></comentario-component>
          </li>
        </ul>
        <form @submit.prevent="enviarRespuesta(comentario._id)">
          <textarea v-model="comentario.nuevaRespuesta" placeholder="Escribe una respuesta..."></textarea>
          <button type="submit">Enviar Respuesta</button>
        </form>
      </div>
    </li>
  </ul>
  <form @submit.prevent="enviarComentario">
    <textarea v-model="nuevoComentario" placeholder="Escribe un comentario..."></textarea>
    <button type="submit">Enviar Comentario</button>
  </form>
</div>


  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const comentarios = ref([]);
const nuevoComentario = ref('');
const vueloId = ref(null); 
const mostrar = ref([]);

onMounted(async () => {
  if (!vueloId.value) return;

  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/comentarios/vuelo/${vueloId.value}`);
    comentarios.value = response.data.map(comentario => ({
      ...comentario,
      respuestas: [],
      nuevaRespuesta: ''
    }));
  } catch (error) {
    console.error('Error al cargar los comentarios:', error);
  }
});

const enviarComentario = async () => {
    const usuarioId = localStorage.getItem('user_id');
    if (!nuevoComentario.value.trim() || !vuelo.value || !usuarioId) {
        alert('Todos los campos son necesarios.');
        return;
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/comentarios`, {
            contenido: nuevoComentario.value,
            usuarioId: usuarioId,
            vueloId: vuelo.value._id,
        });

        const comentarioConNombre = {
            ...response.data,
            usuario: { nombre: response.data.usuario.nombre }
        };

        comentarios.value.unshift(comentarioConNombre);
        nuevoComentario.value = '';
    } catch (error) {
        console.error('Error al enviar comentario:', error);
    }
};




const enviarRespuesta = async (comentarioId) => {
  const comentarioIndex = comentarios.value.findIndex(c => c._id === comentarioId);
  if (!comentarios.value[comentarioIndex].nuevaRespuesta.trim()) return;

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/comentarios`, {
      contenido: comentarios.value[comentarioIndex].nuevaRespuesta,
      vueloId: vueloId.value,
      usuarioId: 'ID_del_usuario',
      parentId: comentarioId
    });
    comentarios.value[comentarioIndex].respuestas.push(response.data);
    comentarios.value[comentarioIndex].nuevaRespuesta = '';
  } catch (error) {
    console.error('Error al enviar respuesta:', error);
  }
};

// Mostrar/ocultar respuestas
const toggleRespuestas = (comentarioIndex) => {
  mostrar.value[comentarioIndex] = !mostrar.value[comentarioIndex];
};

// Log para verificar si se hace clic en el botón
const logButtonClicked = (usuario) => {
  console.log('Botón clickeado por:', usuario ? usuario.nombre : 'Usuario desconocido');
};

export {
  comentarios,
  nuevoComentario,
  vueloId,
  mostrar,
  enviarComentario,
  enviarRespuesta,
  toggleRespuestas,
  logButtonClicked
};

  </script>
  