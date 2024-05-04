package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Response;
import java.time.LocalDateTime;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.SecurityContext;
import jakarta.ws.rs.core.UriInfo;



/**
 * Clase de recursos para manejar las operaciones de la API relacionadas con las habitaciones.
 */
@Path("/habitaciones")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Transactional
public class HabitacionRecurso {
    
    @Inject
    private HabitacionRepositorio habitacionesRepositorio;


    @Inject
    private HotelRepositorio hotelesRepositorio;

    @Inject
    private ReservasRepositorio reservasRepositorio;




    @Inject
    private RegistroBusquedaRepositorio registroBusquedaRepositorio;

    @Context
    private SecurityContext securityContext;

    @Inject
    private UsuarioRepositorio UsuarioRepositorio;

    private String determinarTipoAcceso() {
        // Implementación específica 
        return "web"; // o "rest", dependiendo del contexto
    }


    /**
     * Obtiene todas las habitaciones o las filtra por hotel si se proporciona el ID del hotel.
     *
     * @param hotelId Identificador del hotel para filtrar habitaciones.
     * @return Lista de habitaciones.
     */
    @GET
    public List<Habitaciones> index(@QueryParam("hotelId") Long hotelId) {
        if (hotelId != null) {
            // Filtra las habitaciones por el ID del hotel si se proporciona un hotelId
            return habitacionesRepositorio.list("id_hotel", hotelId);
        }
        // Si no se proporciona hotelId, devuelve todas las habitaciones
        return habitacionesRepositorio.listAll();
    }
    

    /**
     * Crea una nueva habitación en la base de datos.
     *
     * @param habitacion Datos de la nueva habitación.
     * @return Habitación creada con ID asignado.
     */
    @POST
    public Habitaciones insert(Habitaciones insertedData) {
        // Ensure the ID is null to create a new entity
        assert insertedData.getId_habitacion() == null;
        habitacionesRepositorio.persist(insertedData);
        // After persist, ID should be generated and non-null
        assert insertedData.getId_habitacion() != null;
        return insertedData;
    }
    

    /**
     * Recupera una habitación por su ID.
     *
     * @param id Identificador de la habitación.
     * @return Habitación encontrada.
     */
    @GET
    @Path("{id}")
    public Habitaciones retrieve(@PathParam("id") Long id) {
        var habitacion = habitacionesRepositorio.findById(id);
        if (habitacion != null) {
            return habitacion;
        }
        throw new NoSuchElementException("No hay habitacion con el ID " + id + ".");
    }
    

    /**
     * Elimina una habitación por su ID.
     *
     * @param id Identificador de la habitación a eliminar.
     * @return Mensaje indicando el resultado de la operación.
     */
    @DELETE
    @Path("{id}")
    public String delete(@PathParam("id") Long id) {
        if (habitacionesRepositorio.deleteById(id)) {
            return "La habitacion se ha borrado";
        } else {
            return "No se ha borrado (no existe)";
        }
    }
    

    /**
     * Actualiza los datos de una habitación existente.
     *
     * @param id            Identificador de la habitación a actualizar.
     * @param datosActualizados Datos nuevos para actualizar la habitación.
     * @return Habitación actualizada.
     */
    @PUT
    @Path("{id}")
    public Habitaciones update(@PathParam("id") Long id, Habitaciones datosActualizados) {
        Habitaciones habitacionExistente = habitacionesRepositorio.findById(id);
        if (habitacionExistente != null) {
            habitacionExistente.setPrecioxpersona(datosActualizados.getPrecioxpersona());
            habitacionExistente.setPrecioxnoche(datosActualizados.getPrecioxnoche());
    
            // Solo actualiza tipo_habitacion si no es null
            if (datosActualizados.getTipo_habitacion() != null) {
                habitacionExistente.setTipo_habitacion(datosActualizados.getTipo_habitacion());
            }
    
            
            habitacionesRepositorio.persist(habitacionExistente);
            return habitacionExistente;
        } else {
            throw new NoSuchElementException("No se encontró la habitación con el ID proporcionado.");
        }
    }
    
    
    /**
     * Obtiene una lista de capacidades únicas de habitaciones disponibles.
     *
     * @return Lista de capacidades únicas como entero.
     */
    @GET
    @Path("/capacidades")
    public List<Integer> capacidadesUnicas() {
        // Obtiene todas las habitaciones, extrae sus capacidades y las convierte en un conjunto para eliminar duplicados, y luego tolist ls convertirlo en una lista
        List<Integer> capacidades = habitacionesRepositorio.listAll().stream()
                                                            .map(Habitaciones::getCapacidad_personas)
                                                            .distinct()
                                                            .collect(Collectors.toList());
        return capacidades;
    }
    
    



    /**
     * Busca habitaciones por país y disponibilidad basándose en fechas y número de personas.
     *
     * @param pais Nombre del país para filtrar habitaciones.
     * @param fechaIngresoStr Fecha de ingreso en formato ISO_LOCAL_DATE.
     * @param fechaSalidaStr Fecha de salida en formato ISO_LOCAL_DATE.
     * @param numeroPersonas Número de personas para comprobar la capacidad.
     * @param usuarioId Identificador del usuario que realiza la búsqueda.
     * @return Lista de habitaciones disponibles o un mensaje de error si no se encuentran.
     */
    @GET
    @Path("/buscar")
    public Response buscarPorPaisYDisponibilidad(
            @Context UriInfo uriInfo,  // Inyecta UriInfo para acceder a detalles de la URI de la solicitud
            @QueryParam("pais") String pais,
            @QueryParam("fechaIngreso") String fechaIngresoStr,
            @QueryParam("fechaSalida") String fechaSalidaStr,
            @QueryParam("numeroPersonas") int numeroPersonas,
            @QueryParam("usuarioId") Long usuarioId) {

        int puerto = uriInfo.getBaseUri().getPort();  // Obtiene el puerto de la URI base

        try {
            RegistroBusqueda registro = new RegistroBusqueda();
            registro.setParametrosBusqueda("pais=" + pais + "; fechaIngreso=" + fechaIngresoStr + "; fechaSalida=" + fechaSalidaStr + "; numeroPersonas=" + numeroPersonas);
            registro.setUsuarioId(usuarioId);
            registro.setFechaHora(LocalDateTime.now());
            registro.setTipoAcceso(puerto == 3000 ? "web" : "REST");  // Establece el tipo de acceso basado en el puerto
            registro.setEsAutenticado(usuarioId != null);
            
            registroBusquedaRepositorio.persist(registro);
            System.out.println("Registro de búsqueda guardado con usuarioId: " + usuarioId + " desde el puerto: " + puerto);
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error al registrar búsqueda").build();
        }

        LocalDate fechaIngreso = null;
        LocalDate fechaSalida = null;
        
        try {
            if (fechaIngresoStr != null && !fechaIngresoStr.isEmpty()) {
                fechaIngreso = LocalDate.parse(fechaIngresoStr, DateTimeFormatter.ISO_LOCAL_DATE);
            }
            if (fechaSalidaStr != null && !fechaSalidaStr.isEmpty()) {
                fechaSalida = LocalDate.parse(fechaSalidaStr, DateTimeFormatter.ISO_LOCAL_DATE);
            }
        } catch (DateTimeParseException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Formato de fecha inválido. Use formato ISO_LOCAL_DATE.").build();
        }
        
        List<Habitaciones> habitacionesDisponibles = habitacionesRepositorio.buscarPorPaisYDisponibilidad(pais, fechaIngreso, fechaSalida, numeroPersonas);
        if (habitacionesDisponibles.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).entity("No se encontraron habitaciones disponibles para los parámetros dados.").build();
        }
        
        return Response.ok(habitacionesDisponibles).build();
    }

    /**
     * Cambia el estado de una habitación y actualiza las reservas relacionadas si es necesario.
     *
     * @param idHabitacion ID de la habitación a actualizar.
     * @param estado Nuevo estado de la habitación ('activo' o 'inactivo').
     * @return Respuesta con el estado actualizado de la habitación o un mensaje de error.
     */
    @PUT
    @Path("/{idHabitacion}/estado/{estado}")
    public Response cambiarEstadoHabitacion(@PathParam("idHabitacion") Long idHabitacion, @PathParam("estado") String estado) {
        Habitaciones habitacion = habitacionesRepositorio.findById(idHabitacion);
        if (habitacion == null) {
            throw new NoSuchElementException("No hay habitación con el ID " + idHabitacion + ".");
        }

        estado = estado.toLowerCase();
        if (!"activo".equals(estado) && !"inactivo".equals(estado)) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Estado no válido. Los estados válidos son 'activo' o 'inactivo'.").build();
        }

        habitacion.setEstado(estado);
        habitacionesRepositorio.persist(habitacion);

        // Si la habitación se desactiva, también cancela todas las reservas confirmadas para esa habitación
        if ("inactivo".equals(estado)) {
            reservasRepositorio.cancelarReservasPorHabitacionSiNecesario(idHabitacion);
        }

        return Response.ok(habitacion).build();
    }





}



