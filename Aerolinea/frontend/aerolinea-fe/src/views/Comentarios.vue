<template>
    <div class="comentarios-container">
      <h3>Comentarios</h3>
      <ul>
        <li v-for="(comentario, index) in comentarios" :key="comentario._id">
          <strong>{{ comentario.usuario.nombre }}</strong>: {{ comentario.contenido }}
          <button @click="mostrarRespuestas(index)">Ver/Ocultar Respuestas</button>
          <div v-if="mostrar[index]" class="respuestas">
            <ul>
              <li v-for="(respuesta, indexRespuesta) in comentario.respuestas" :key="respuesta._id">
                <strong>{{ respuesta.usuario.nombre }}</strong>: {{ respuesta.contenido }}
                <button @click="mostrarSubrespuestas(index, indexRespuesta)">Ver/Ocultar Subrespuestas</button>
                <div v-if="mostrar[index].subRespuestas[indexRespuesta]" class="subrespuestas">
                  <ul>
                    <li v-for="(subComentario, indexSub) in respuesta.respuestas" :key="subComentario._id">
                      <strong>{{ subComentario.usuario.nombre }}</strong>: {{ subComentario.contenido }}
                      <button @click="mostrarSubrespuestas(index, indexRespuesta, indexSub)">Ver/Ocultar Subrespuestas</button>
                      <div v-if="mostrar[index].subRespuestas[indexRespuesta].subRespuestas[indexSub]" class="subrespuestas">
                        </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <form @submit.prevent="enviarRespuesta(comentario._id)">
              <textarea v-model="nuevaRespuesta" placeholder="Escribe una respuesta..."></textarea>
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
  
  // Datos
  const comentarios = ref([]);
  const nuevoComentario = ref('');
  const vueloId = ref(null); // Este valor deberá ser establecido dinámicamente o pasado como prop
  
  // Control de estado para mostrar/ocultar respuestas y subrespuestas
  const mostrar = ref({});
  for (let i = 0; i < comentarios.value.length; i++) {
    mostrar.value[i] = {
      respuestas: false,
      subRespuestas: {},
    };
  }
  
  // Carga inicial de comentarios
  onMounted(async () => {
    if (!vueloId.value) return; // Verifica si el ID del vuelo está disponible
  
    const response = await axios.get(`/api/comentarios/${vueloId.value}`);
    comentarios.value = response.data;
  });
  
  // Enviar un comentario nuevo
  const enviarComentario = async () => {
    if (!nuevoComentario.value) return;
  
    const response = await axios.post('/api/comentarios', {
      contenido: nuevoComentario.value,
      vueloId: vueloId.value,
    });
  
    comentarios.value.unshift(response.data); // Agrega el nuevo comentario al principio de la lista
    nuevoComentario.value = ''; // Limpiar el campo después de enviar
  };
  
  // Enviar una respuesta a un comentario
  const enviarRespuesta = async (comentarioId) => {
    if (!nuevaRespuesta.value) return;
  
    const response = await axios.post('/api/comentarios/respuestas', {
      contenido: nuevaRespuesta.value,
      comentarioId,
    });
  
    const comentarioIndex = comentarios.value.findIndex((c) => c._id === comentarioId);
    if (comentarioIndex !== -1) {
      comentarios.value[comentarioIndex].respuestas.push(response.data);
    }
  
    nuevaRespuesta.value = ''; // Limpiar el campo después de enviar
  };
  
  // Mostrar/ocultar respuestas
  const mostrarRespuestas = (comentarioIndex) => {
    mostrar.value[comentarioIndex].respuestas = !mostrar.value[comentarioIndex].respuestas;
  };
  
  // Mostrar/ocultar subrespuestas
  const mostrarSubrespuestas = (comentarioIndex, respuestaIndex, subRespuestaIndex = null) => {
    if (subRespuestaIndex !== null) {
      mostrar.value[comentarioIndex].subRespuestas[respuestaIndex].subRespuestas[subRespuestaIndex] =
        !mostrar.value[comentarioIndex].subRespuestas[respuestaIndex].subRespuestas[subRespuestaIndex];
    } else {
      mostrar.value[comentarioIndex].subRespuestas[respuestaIndex] =
        !mostrar.value[comentarioIndex].subRespuestas[respuestaIndex];
    }
  };
  </script>