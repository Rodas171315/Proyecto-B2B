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


      <div class="comentarios-container mt-4">
    <h3>Comentarios del vuelo</h3>
    <ul class="comentarios-lista">
      <li v-for="comentario in comentarios" :key="comentario._id" class="comentario">
        <div class="comentario-contenido">
          <strong>{{ comentario.usuario && comentario.usuario.nombre ? comentario.usuario.nombre : 'Usuario ' }}</strong>: {{ comentario.contenido }}
          <button @click="responderComentario(comentario._id)" class="btn btn-success">Responder</button>
        </div>
        <ul v-if="comentario.respuestas && comentario.respuestas.length" class="respuestas">
          <li v-for="respuesta in comentario.respuestas" :key="respuesta._id" class="respuesta">
    {{ console.log(respuesta) }}          <div class="respuesta-contenido">
              <strong>{{ respuesta.usuario && respuesta.usuario.nombre ? respuesta.usuario.nombre : 'Usuario ' }}</strong>: {{ respuesta.contenido }}
              <button @click="responderComentario(respuesta._id)" class="btn btn-success">Responder</button>

              <div v-if="respuesta._id === comentarioSeleccionado" class="responder-formulario">
                <textarea v-model="nuevoRespuesta" placeholder="Escribe tu respuesta..." class="form-control mb-2"></textarea>
                <button @click="() => enviarRespuesta(respuesta._id, vuelo._id)" class="btn btn-success">Enviar Respuesta</button>
              </div>
            </div>


            <ul v-if="respuesta.respuestas && respuesta.respuestas.length" class="nested-respuestas">
              <li v-for="nestedRespuesta in respuesta.respuestas" :key="nestedRespuesta._id" class="respuesta">
                <div class="respuesta-contenido">
                  <strong>{{ nestedRespuesta.usuario && nestedRespuesta.usuario.nombre ? nestedRespuesta.usuario.nombre : 'Usuario ' }}</strong>: {{ nestedRespuesta.contenido }}
                  <button @click="responderComentario(nestedRespuesta._id)" class="btn btn-success">Responder</button>


                  <div v-if="nestedRespuesta._id === comentarioSeleccionado" class="responder-formulario">
                    <textarea v-model="nuevoRespuesta" placeholder="Escribe tu respuesta..." class="form-control mb-2"></textarea>
                    <button @click="() => enviarRespuesta(nestedRespuesta._id, vuelo._id)" class="btn btn-success">Enviar Respuesta</button>
                  </div>
                </div>

                <ul v-if="nestedRespuesta.respuestas && nestedRespuesta.respuestas.length" class="nested-respuestas">
                  <li v-for="furtherNestedRespuesta in nestedRespuesta.respuestas" :key="furtherNestedRespuesta._id" class="respuesta">
                    <div class="respuesta-contenido">
                      <strong>{{ furtherNestedRespuesta.usuario && furtherNestedRespuesta.usuario.nombre ? furtherNestedRespuesta.usuario.nombre : 'Usuario ' }}</strong>: {{ furtherNestedRespuesta.contenido }}
                      <button @click="responderComentario(furtherNestedRespuesta._id)" class="btn btn-success">Responder</button>

                      <div v-if="furtherNestedRespuesta._id === comentarioSeleccionado" class="responder-formulario">
                        <textarea v-model="nuevoRespuesta" placeholder="Escribe tu respuesta..." class="form-control mb-2"></textarea>
                        <button @click="() => enviarRespuesta(furtherNestedRespuesta._id, vuelo._id)" class="btn btn-success">Enviar Respuesta</button>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
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
  import emailjs from 'emailjs-com';

  
  const router = useRouter();
  const vuelo = ref(null);
  const tipoAsiento = ref('turista');
  const asientosDisponibles = ref({ turista: 0, ejecutivo: 0 });
  const cantidadSeleccionada = ref(1);
  const usuario = ref({});  
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

  const usuarioId = localStorage.getItem('user_id');
    if (usuarioId) {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${usuarioId}`)
        .then(response => {
            usuario.value = response.data;
        })
        .catch(error => {
            console.error('Error al cargar los datos del usuario:', error);
            alert('No se pudo cargar la información del usuario.');
        });
    }

  
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



  const sendTicketEmail = () => {
  if (!usuario.value.email || !usuario.value.nombre) {
    console.error('Datos del usuario no disponibles para enviar el correo.');
    return;
  }

  const templateParams = {
    to_name: usuario.value.nombre,
    from_name: "Unis Airlines",
    to_email: usuario.value.email,
    flight_origin: vuelo.value.ciudad_origen,
    flight_destination: vuelo.value.ciudad_destino,
    flight_date: fechayhoraFormateada(vuelo.value.fecha_salida, 'read'),
    seat_type: tipoAsiento.value,
    quantity: cantidadSeleccionada.value,
    total_price: vuelo.value.precio * cantidadSeleccionada.value
  };

  emailjs.send('service_pzs5mlz', 'template_9m8cigb', templateParams, '4KZRrnu_XlHEApeh4')
    .then((result) => {
      console.log('Confirmation email sent!', result.text);
    }, (error) => {
      console.error('Failed to send confirmation email:', error.text);
    });
};







  
  const confirmarReserva = async () => {
      const usuarioId = localStorage.getItem('user_id');
      if (!usuario.value._id) {
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
            usuarioId: usuario.value._id,
              vueloId: vuelo.value._id,
              tipoAsiento: tipoAsiento.value,
              cantidad 
          });
          
          alert('Reserva confirmada con éxito.');
          console.log('Reserva confirmada con éxito:', response.data);
          sendTicketEmail();

        
          await cargarAsientosDisponibles(vuelo.value._id);
          router.push({ name: 'historialreservas' }).catch(err => {
  console.error('Routing error:', err);
});
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
          if (response.data && Array.isArray(response.data)) {
              const comentariosConNombre = response.data.map(comentario => ({
                  ...comentario,
                  usuario: {
                      nombre: comentario.usuarioId?.nombre || 'Usuario '
                  },
                  respuestas: [] 
              }));
  
              const nestedComentarios = nestComments(comentariosConNombre);
              comentarios.value = nestedComentarios; 
          } else {
              throw new Error("Invalid data structure received from API");
          }
      } catch (error) {
          console.error('Error al cargar los comentarios:', error);
          comentarios.value = []; 
      }
  };
  
  const nestComments = (comments) => {
      const commentMap = new Map();
      const topLevelComments = [];
  
      comments.forEach(comment => {
          comment.respuestas = [];
          commentMap.set(comment._id, {...comment});
      });
  
      comments.forEach(comment => {
          if (comment.parentId) {
              const parent = commentMap.get(comment.parentId);
              if (parent) {
                  parent.respuestas.push(commentMap.get(comment._id));
              }
          } else {
              topLevelComments.push(commentMap.get(comment._id));
          }
      });
  
      return topLevelComments;
  };
  
  
  
  
  
  
  
  
  const enviarComentario = async () => {
      const usuarioId = localStorage.getItem('user_id');
      if (!nuevoComentario.value.trim() || !vuelo.value || !usuarioId) {
          alert('Inicia sesión para dejar tu comentario.');
          return;
      }
      try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/comentarios`, {
              contenido: nuevoComentario.value,
              usuarioId: usuarioId,
              vueloId: vuelo.value._id,
          });
  
          const nombreUsuario = response.data.usuario ? response.data.usuario.nombre : 'Usuario ';
  
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
          parentId: comentarioId, 
      };
  
      try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/comentarios`, payload);
          if (response && response.data) {
              const newResponse = {
                  ...response.data,
                  usuario: { nombre: response.data.usuario?.nombre || 'Usuario ' },
                  respuestas: [] 
              };
  
              const insertResponse = (comments, id, response) => {
      for (const comment of comments) {
          if (comment._id === id) {
              if (!comment.respuestas) {
                  comment.respuestas = [];
              }
              comment.respuestas.push(response);
              return true;
          }
          if (comment.respuestas && comment.respuestas.length > 0) {
              if (insertResponse(comment.respuestas, id, response)) {
                  return true;
              }
          }
      }
      return false;
  };
  
              if (!insertResponse(comentarios.value, comentarioId, newResponse)) {
                  console.error('Error: No se encontró el comentario padre adecuado.');
              }
  
              nuevoRespuesta.value = '';
          }
      } catch (error) {
          console.error("Failed to send response:", error);
      }
  };
  
  
  
  
  
  
  const responderComentario = (comentarioId) => {
      if (comentarioSeleccionado.value === comentarioId) {
          comentarioSeleccionado.value = null;  
      } else {
          comentarioSeleccionado.value = comentarioId;
      }
  };
  
  
  
  </script>
  
  
  
  
  <style scoped>
  .container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      background-color: #d2b48c; /* Soft beige background */
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .card {
      background-color: #e3d2c3; /* Lighter beige variant */
      border: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
  }
  
  .card-body {
      padding: 2rem;
  }
  
  .card-text {
      margin-bottom: 1rem;
      color: #3a312c; /* Darker contrast color for text */
  }
  
  
  .btn-primary {
      background-color: #a6785c; /* Warm earthy tone */
      border-color: #8c6b4f;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border-radius: 0.375rem;
      transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  }
  
  .btn-primary:hover {
      background-color: #8c6b4f; /* Darker shade for hover */
      border-color: #705543;
  }
  
  .form-select {
      display: block;
      width: 100%;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #3a312c;
      background-color: #dcd3c9; /* Neutral off-white background */
      background-clip: padding-box;
      border: 1px solid #bbaa9b;
      border-radius: 0.375rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  
  .form-select:focus {
      border-color: #a6785c;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(166, 120, 92, 0.25);
  }
  
  input[type="number"] {
      display: block;
      width: 100%;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #3a312c;
      background-color: #f0ede6;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      border-radius: 0.375rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  
  input[type="number"]:focus {
      border-color: #a6785c;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(166, 120, 92, 0.25);
  }
  
  .mb-3 {
      margin-bottom: 1.5rem;
  }
  
  .comentarios-container {
      background-color: #d2b48c; /* Consistent beige for containers */
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
      background: #e3d2c3; /* Lighter beige for comments */
      padding: 8px;
      border-radius: 4px;
      margin-bottom: 10px;
      position: relative;
  }
  
  .comentario-contenido, .respuesta-contenido {
      border: 1px solid #bbaa9b;
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 5px;
      background-color: white;
  }
  
  .respuestas {
      list-style-type: none;
      padding-left: 20px;
  }
  
  .respuesta {
      background: #fff;
      padding: 8px;
      border-radius: 4px;
      margin-top: 5px;
      border-left: 2px solid #a6785c; /* Warm earthy tone for accents */
      margin-left: 20px;
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
      background-color: #5cb85c; /* Keep for visibility, or adjust to fit theme */
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
