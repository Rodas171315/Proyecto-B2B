<template>
<div class="container mt-5">
  <h2 class="text-center mb-4">Confirmar Reserva</h2>
  <div v-if="vuelo" class="card">
    <div class="card-body">
      <p class="card-text"><strong>Origen:</strong> {{ vuelo.ciudad_origen }}</p>
      <p class="card-text"><strong>Destino:</strong> {{ vuelo.ciudad_destino }}</p>
      <p class="card-text"><strong>Fecha de Salida:</strong> {{ fechayhoraFormateada(vuelo.fecha_salida, 'read') }}</p>
      <p class="card-text"><strong>Precio:</strong> Q{{ vuelo.precio }}</p>
      <div class="mb-3">
        <label for="tipoAsiento" class="form-label"><strong>Tipo de Asiento:</strong></label>
        <select id="tipoAsiento" v-model="tipoAsiento" class="form-select" @change="cargarAsientosDisponibles(vuelo._id)">
          <option value="turista">Turista</option>
          <option value="ejecutivo">Ejecutivo</option>
        </select>
      </div>
      <div v-if="asientosDisponibles[tipoAsiento] > 0">
        <p>Asientos disponibles: {{ asientosDisponibles[tipoAsiento] }}</p>
        <input type="number" v-model.number="cantidadSeleccionada" :max="asientosDisponibles[tipoAsiento]" min="1" placeholder="Cantidad de asientos" required>
      </div>
      <button @click="confirmarReserva" class="btn btn-primary w-100">Confirmar Reserva</button>
    </div>
<!-- Comentarios y formulario para enviar comentarios -->
<div class="comentarios-container mt-4">
        <h3>Comentarios del vuelo</h3>
        <ul class="comentarios-lista">
          <li v-for="comentario in comentarios" :key="comentario._id" class="comentario">
            <div class="comentario-contenido">
              <strong>{{ comentario.usuario ? comentario.usuario.nombre : 'Usuario desconocido' }}</strong>: {{ comentario.contenido }}
              <button @click="responderComentario(comentario._id)" class="responder-btn">Responder</button>
            </div>
            <ul v-if="comentario.respuestas && comentario.respuestas.length" class="respuestas">
              <li v-for="respuesta in comentario.respuestas" :key="respuesta._id" class="respuesta">
                <div class="respuesta-contenido">
                  <strong>{{ respuesta.usuario ? respuesta.usuario.nombre : 'Usuario desconocido' }}</strong>: {{ respuesta.contenido }}
                </div>
              </li>
            </ul>
            <div v-if="comentario._id === comentarioSeleccionado" class="responder-formulario">
              <textarea v-model="nuevoRespuesta" placeholder="Escribe tu respuesta..." class="form-control mb-2"></textarea>
              <button @click="() => enviarRespuesta(comentario._id, vuelo._id)" class="btn btn-success">Enviar Respuesta</button>
            </div>
          </li>
        </ul>
        <form @submit.prevent="enviarComentario" class="nuevo-comentario-formulario">
          <textarea v-model="nuevoComentario" placeholder="Escribe tu comentario..." class="form-control mb-2"></textarea>
          <button type="submit" class="btn btn-success">Enviar Comentario</button>
        </form>
</div>



  </div>
  <div v-else>
    <p>Cargando detalles del vuelo...</p>
  </div>
</div>


</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { fechayhoraFormateada } from '../functions.js';

const router = useRouter();
const vuelo = ref(null);
const tipoAsiento = ref('turista');
const asientosDisponibles = ref({ turista: 0, ejecutivo: 0 });
const cantidadSeleccionada = ref(1);
const comentarios = ref([]);
const nuevoComentario = ref('');
const comentarioSeleccionado = ref(null);
const nuevoRespuesta = ref('');



onMounted(async () => {
    const vueloSeleccionado = localStorage.getItem('vueloSeleccionado');
    if (vueloSeleccionado) {
        vuelo.value = JSON.parse(vueloSeleccionado);
        cargarAsientosDisponibles(vuelo.value._id);
        cargarComentarios(vuelo.value._id);
    } else {
        console.error('No se han proporcionado detalles del vuelo.');
        router.push({ name: 'VuelosDisponibles' });
    }
});

const cargarAsientosDisponibles = async (vueloId) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vuelos/${vueloId}/asientos-disponibles`);
        asientosDisponibles.value = {
            turista: data.asientosTuristaDisponibles,
            ejecutivo: data.asientosEjecutivosDisponibles
        };
    } catch (error) {
        console.error('Error al cargar asientos disponibles:', error);
        asientosDisponibles.value = { turista: 0, ejecutivo: 0 };
    }
};

const confirmarReserva = async () => {
    const usuarioId = localStorage.getItem('user_id');
    if (!usuarioId) {
        alert('Por favor, inicia sesión.');
        console.error('Usuario no logueado');
        return;
    }

    const cantidad = parseInt(cantidadSeleccionada.value);
    if (isNaN(cantidad) || cantidad <= 0 || cantidad > asientosDisponibles.value[tipoAsiento.value]) {
        alert('Por favor, selecciona una cantidad válida de asientos dentro del rango disponible.');
        return;
    }

    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/boletos`, {
            usuarioId,
            vueloId: vuelo.value._id,
            tipoAsiento: tipoAsiento.value,
            cantidad 
        });
        alert('Reserva confirmada con éxito.');
        await cargarAsientosDisponibles(vuelo.value._id);
        router.push({ name: 'HistorialReservas' });
    } catch (error) {
        console.error('Error al confirmar la reserva:', error);
        alert('Hubo un problema al confirmar tu reserva. Por favor, intenta de nuevo.');
    }
};



const transformComentarios = (flatComments) => {
  const parentComments = flatComments.filter(c => !c.parentId);

  parentComments.forEach(parent => {
    parent.respuestas = flatComments.filter(c => c.parentId === parent._id);
  });

  return parentComments;
};



const cargarComentarios = async (vueloId) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/comentarios/vuelo/${vueloId}`);

        // Map the response data to include the username within the usuario object
        const comentariosConNombre = response.data.map(comentario => ({
            ...comentario,
            usuario: { 
              nombre: comentario.usuarioId && comentario.usuarioId.nombre 
                       ? comentario.usuarioId.nombre 
                       : 'Usuario desconocido'
            }
        }));

        // Transform the flat comments with usernames into a nested structure
        const nestedComentarios = nestComments(comentariosConNombre);

        comentarios.value = nestedComentarios;
    } catch (error) {
        console.error('Error al cargar los comentarios:', error);
        comentarios.value = [];
    }
};

// The nestComments function remains unchanged, as it does not manipulate the usuario object.


// Helper function to transform a flat comment array into a nested structure
const nestComments = (flatComments) => {
    // Initialize a map to associate comments and replies
    const commentMap = new Map();

    // Populate the map with all comments, ensuring each has an empty replies array
    flatComments.forEach(comment => {
        commentMap.set(comment._id, {...comment, respuestas: [] });
    });

    // Associate replies with their parent comments
    flatComments.forEach(comment => {
        if (comment.parentId) {
            const parent = commentMap.get(comment.parentId);
            if (parent) {
                parent.respuestas.push(comment);
            }
        }
    });

    // Extract top-level comments (those without a parentId) with their nested replies
    return Array.from(commentMap.values()).filter(comment => !comment.parentId);
};



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

        const nombreUsuario = response.data.usuario ? response.data.usuario.nombre : 'Usuario desconocido';

        const comentarioConNombre = {
            ...response.data,
            usuario: { nombre: nombreUsuario }
        };

        comentarios.value.unshift(comentarioConNombre);
        nuevoComentario.value = '';
    } catch (error) {
        console.error('Error al enviar comentario:', error);
    }
};


const enviarRespuesta = async (comentarioId, vueloId) => {
    const usuarioId = localStorage.getItem('user_id');
    const payload = {
        contenido: nuevoRespuesta.value,
        usuarioId,
        vueloId,
        parentId: comentarioId, // this is the ID of the comment being responded to
    };

    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/comentarios`, payload);
        if (response && response.data) {
            // Assuming response.data contains the newly created comment
            const newResponse = response.data;

            // Ensure comentarios is an array and update it
            if (Array.isArray(comentarios.value)) {
                const parentIndex = comentarios.value.findIndex(c => c._id === comentarioId);
                if (parentIndex !== -1) {
                    if (!comentarios.value[parentIndex].respuestas) {
                        comentarios.value[parentIndex].respuestas = []; // Initialize if it doesn't exist
                    }
                    comentarios.value[parentIndex].respuestas.push(newResponse);
                }
            }

            nuevoRespuesta.value = ''; // Clear the input after submission
        }
    } catch (error) {
        console.error("Failed to send response:", error);
    }
};





const responderComentario = (comentarioId) => {
    comentarioSeleccionado.value = comentarioId;
};



</script>




<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card {
  background-color: white;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.card-body {
  padding: 2rem;
}

.card-text {
  margin-bottom: 1rem;
  color: #495057;
}

.btn-primary {
  background-color: #0056b3;
  border-color: #0056b3;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

.btn-primary:hover {
  background-color: #004494;
  border-color: #003d7a;
}

.form-select {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-select:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

input[type="number"] {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

input[type="number"]:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.mb-3 {
  margin-bottom: 1.5rem;
}



.comentarios-container {
  background-color: #f9f9f9;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comentarios-lista {
  list-style-type: none;
  padding-left: 0;
  margin-top: 10px;
}

.comentario {
  background: #f0f0f0;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 10px;
  position: relative;
}


.comentario-contenido, .respuesta-contenido {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: white;
}

.respuestas {
  list-style-type: none;
  padding-left: 20px; /* Indent responses for visual hierarchy */
}

.respuesta {
  background: #fff;
  padding: 8px;
  border-radius: 4px;
  margin-top: 5px;
  border-left: 2px solid #007bff;
  margin-left: 20px; /* Indent replies */
}

.responder-formulario, .nuevo-comentario-formulario {
  margin-top: 10px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 5px;
}

.btn-enviar-respuesta, .btn-enviar-comentario {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #5cb85c;
  color: white;
}

.btn-enviar-respuesta:hover, .btn-enviar-comentario:hover {
  background-color: #4cae4c;
}

.responder-btn {
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  cursor: pointer;
}

.responder-btn:hover {
  background-color: #e9e9e9;
}

/* Add a visual cue for comments with responses */
.comentario-contenido {
  position: relative;
}

.comentario-contenido::after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-color: #eef;
  position: absolute;
  bottom: 0;
  left: 0;
  visibility: hidden;
}

.comentario-contenido:hover::after,
.comentario-contenido:has(+ .respuestas) {
  visibility: visible;
}

</style>
