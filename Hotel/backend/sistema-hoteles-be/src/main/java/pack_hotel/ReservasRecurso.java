package pack_hotel;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.QueryParam;
import jakarta.persistence.Query;

import jakarta.ws.rs.Produces;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import java.util.Optional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.Set;
import java.util.stream.Collectors;



@Path("/reservas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ReservasRecurso {

    private static final Logger log = Logger.getLogger(ReservasRecurso.class);


    @Inject
    private ReservasRepositorio reservasRepositorio;

    @Inject
    private HabitacionRepositorio habitacionRepositorio;

    @Inject
    HotelRepositorio hotelRepositorio;

    @Inject
    Tipo_habitacionRepositorio tipoHabitacionRepositorio; 

    @Inject
    private UsuarioRepositorio UsuarioRepositorio;
    
    @GET
    public List<Reservas> listarTodasLasReservas() {
        return reservasRepositorio.listAll();

    }

    @PersistenceContext
    EntityManager entityManager;



    @GET
    @Path("{id}")
    public Response obtenerReservaPorId(@PathParam("id") Long id) {
        Reservas reserva = reservasRepositorio.findById(id);
        if (reserva != null) {
            return Response.ok(reserva).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }



    @POST
    @Path("/verificar-disponibilidad")
    @Transactional
    public Response verificarDisponibilidad(VerificarDisponibilidadDTO verificarDisponibilidadDTO) {
        // Obtiene todas las reservas para la habitación, pero solo considera aquellas que no estén canceladas.
        List<Reservas> reservasExistentes = reservasRepositorio.list(
            "idHabitacion = ?1 AND estadoReserva != 'Cancelada'", verificarDisponibilidadDTO.getIdHabitacion());
        LocalDate fechaIngreso = LocalDate.parse(verificarDisponibilidadDTO.getFechaIngreso());
        LocalDate fechaSalida = LocalDate.parse(verificarDisponibilidadDTO.getFechaSalida());
    
        // Recorre las reservas existentes para verificar si alguna interfiere con las nuevas fechas de ingreso y salida.
        for (Reservas reserva : reservasExistentes) {
            // Verifica que las fechas de la nueva reserva no se solapen con reservas existentes y confirmadas.
            if (!(fechaSalida.isBefore(reserva.getFechaIngreso()) || fechaIngreso.isAfter(reserva.getFechaSalida()))) {
                // Si hay solapamiento, la habitación no está disponible.
                return Response.ok(new DisponibilidadDTO(false)).build();
            }
        }
        // Si llega hasta aquí, significa que no hay solapamientos con reservas confirmadas y la habitación está disponible.
        return Response.ok(new DisponibilidadDTO(true)).build();
    }
    



    
    @PUT
    @Path("{id}/estado")
    @Transactional
    public Response actualizarEstadoReserva(@PathParam("id") Long id, Reservas estadoReserva) {
        Reservas reservaExistente = reservasRepositorio.findById(id);
        if (reservaExistente != null) {
            reservaExistente.setEstadoReserva(estadoReserva.getEstadoReserva());
            reservasRepositorio.persist(reservaExistente);
            return Response.ok(reservaExistente).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }


    
    
    @POST
    @Transactional
    public Response crearReserva(Reservas reserva) {
        LocalDate fechaIngreso = reserva.getFechaIngreso();
        LocalDate fechaSalida = reserva.getFechaSalida();
        
        log.infof("Inicio del proceso de creación de reserva. Fecha de ingreso: %s, Fecha de salida: %s", fechaIngreso, fechaSalida);
    
        // Corrección en la consulta para considerar correctamente las reservas que no están canceladas y su intersección con las fechas
        List<Reservas> reservasExistentes = reservasRepositorio.list(
            "FROM Reservas WHERE idHabitacion = ?1 AND estadoReserva != 'Cancelada' " +
            "AND ((fechaIngreso <= ?3 AND fechaSalida >= ?2) OR (fechaIngreso <= ?2 AND fechaSalida >= ?2) OR (fechaIngreso <= ?3 AND fechaSalida >= ?3))", 
            reserva.getIdHabitacion(), fechaIngreso, fechaSalida
        );
    
        if (!reservasExistentes.isEmpty()) {
            log.infof("Conflicto encontrado con otras reservas. No se puede crear la reserva para las fechas seleccionadas.");
            return Response.status(Response.Status.CONFLICT).entity("La habitación no está disponible para las fechas seleccionadas.").build();
        } else {
            log.infof("No se encontraron conflictos con otras reservas. Procediendo con la creación de la reserva.");
        }
        
        try {
            Habitaciones habitacion = habitacionRepositorio.findByIdOptional(reserva.getIdHabitacion())
                    .orElseThrow(() -> new WebApplicationException("Habitación no encontrada.", Response.Status.NOT_FOUND));
    
            log.infof("Habitación encontrada. Tipo de habitación obtenido: %s", habitacion.getTipo_habitacion());
            
            reserva.setTipoHabitacion(habitacion.getTipo_habitacion());
            reserva.setEstadoReserva("confirmada"); // Establece el estado inicial de la reserva como "confirmada"
            reservasRepositorio.persist(reserva);
    
            log.infof("Reserva creada con éxito. ID de la reserva: %s", reserva.getIdReserva());
            
            return Response.status(Response.Status.CREATED).entity(reserva).build();
        } catch (WebApplicationException e) {
            log.errorf("Error WebApplicationException al crear la reserva: %s", e.getMessage());
            return Response.status(e.getResponse().getStatus()).entity(e.getMessage()).build();
        } catch (Exception e) {
            log.errorf("Error al crear la reserva: %s", e.getMessage());
            e.printStackTrace();
            return Response.serverError().entity("Error al crear la reserva: " + e.getMessage()).build();
        }
    }
    

    
    
    
    @GET
@Path("/usuario/{idUsuario}")
public Response obtenerReservasPorUsuario(@PathParam("idUsuario") Long idUsuario) {
    List<Reservas> reservas = reservasRepositorio.list("idUsuario", idUsuario);
    if (reservas.isEmpty()) {
        return Response.status(Response.Status.NOT_FOUND).entity("No se encontraron reservas para el usuario.").build();
    }
    return Response.ok(reservas).build();
}



@GET
@Path("/detalle/usuario/{idUsuario}")
public Response obtenerDetalleReservasPorUsuario(@PathParam("idUsuario") Long idUsuario) {
    List<Reservas> reservas = reservasRepositorio.list("idUsuario", idUsuario);
    if (reservas.isEmpty()) {
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    List<DetalleReservaDTO> detalleReservasList = reservas.stream().map(reserva -> {
        DetalleReservaDTO detalle = new DetalleReservaDTO();

        Hoteles hotel = hotelRepositorio.findById(reserva.getIdHotel());
        if (hotel == null) {
            throw new WebApplicationException("Hotel no encontrado.", Response.Status.NOT_FOUND);
        }
        
        Habitaciones habitacion = habitacionRepositorio.findById(reserva.getIdHabitacion());
        if (habitacion == null) {
            throw new WebApplicationException("Habitación no encontrada.", Response.Status.NOT_FOUND);
        }

        detalle.setIdReserva(reserva.getIdReserva());
        detalle.setIdHotel(reserva.getIdHotel()); 
        detalle.setIdHabitacion(reserva.getIdHabitacion()); 
        detalle.setNumeroHabitacion(habitacion.getNumero_habitacion());
        detalle.setNombreHotel(hotel.getNombre());
        detalle.setPais(hotel.getPais());
        detalle.setCiudad(hotel.getCiudad());
        detalle.setDireccion(hotel.getDireccion());
        detalle.setTipoHabitacion(reserva.getTipoHabitacion()); 
        detalle.setFechaIngreso(reserva.getFechaIngreso());
        detalle.setFechaSalida(reserva.getFechaSalida());
        long numeroNoches = ChronoUnit.DAYS.between(reserva.getFechaIngreso(), reserva.getFechaSalida());
        detalle.setNumeroNoches((int) numeroNoches);
        detalle.setCodigoReserva(reserva.getCodigoReserva());
        detalle.setTotalReserva(reserva.getTotalReserva());
        detalle.setEstadoReserva(reserva.getEstadoReserva());
        detalle.setCapacidadPersonas(habitacion.getCapacidad_personas());

        return detalle;
    }).collect(Collectors.toList());

    return Response.ok(detalleReservasList).build();
}



@Path("/detalle/todas")
@GET
public Response obtenerDetalleTodasReservas() {
    List<Reservas> reservas = reservasRepositorio.listAll();
    if (reservas.isEmpty()) {
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    List<DetalleReservaDTO> detalleReservasList = new ArrayList<>();
    for (Reservas reserva : reservas) {
        if (reserva.getIdHotel() == null || reserva.getIdHabitacion() == null || reserva.getIdUsuario() == null) {
            continue; // Ignorar reservas con IDs nulos para evitar errores
        }

        Hoteles hotel = hotelRepositorio.findById(reserva.getIdHotel());
        Habitaciones habitacion = habitacionRepositorio.findById(reserva.getIdHabitacion());
        Usuarios usuario = UsuarioRepositorio.findById(reserva.getIdUsuario());

        if (hotel == null || habitacion == null || usuario == null) {
            continue; // Ignorar reservas donde las entidades relacionadas no se encuentran
        }

        DetalleReservaDTO detalle = new DetalleReservaDTO();
        detalle.setIdReserva(reserva.getIdReserva());
        detalle.setIdHotel(reserva.getIdHotel()); 
        detalle.setIdHabitacion(reserva.getIdHabitacion()); 
        detalle.setNumeroHabitacion(habitacion.getNumero_habitacion());
        detalle.setNombreHotel(hotel.getNombre());
        detalle.setPais(hotel.getPais());
        detalle.setCiudad(hotel.getCiudad());
        detalle.setDireccion(hotel.getDireccion());
        detalle.setTipoHabitacion(reserva.getTipoHabitacion()); 
        detalle.setFechaIngreso(reserva.getFechaIngreso());
        detalle.setFechaSalida(reserva.getFechaSalida());
        long numeroNoches = ChronoUnit.DAYS.between(reserva.getFechaIngreso(), reserva.getFechaSalida());
        detalle.setNumeroNoches((int) numeroNoches);
        detalle.setCodigoReserva(reserva.getCodigoReserva());
        detalle.setTotalReserva(reserva.getTotalReserva());
        detalle.setEstadoReserva(reserva.getEstadoReserva());
        detalle.setCapacidadPersonas(habitacion.getCapacidad_personas());
        detalle.setIdUsuario(usuario.getId());
        detalle.setCorreoElectronico(usuario.getEmail());

        detalleReservasList.add(detalle);
    }

    if (detalleReservasList.isEmpty()) {
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    return Response.ok(detalleReservasList).build();
}








@PUT
@Path("{id}")
@Transactional
public Response actualizarReserva(@PathParam("id") Long id, Reservas reservaActualizada) {
    log.infof("Recibido solicitud de actualización para reserva con ID: %s", id);
    log.infof("Datos de actualización: %s", reservaActualizada.toString());

    Reservas reservaExistente = reservasRepositorio.findById(id);
    if (reservaExistente == null) {
        log.errorf("Reserva no encontrada para ID: %s", id);
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    List<Habitaciones> habitacionesDisponibles = habitacionRepositorio.buscarPorTipoYDisponibilidad(
        reservaActualizada.getTipoHabitacion(), 
        reservaActualizada.getFechaIngreso(), 
        reservaActualizada.getFechaSalida(),
        reservaExistente.getIdHotel() // Usa el idHotel de la reserva existente
    );

    if (habitacionesDisponibles.isEmpty()) {
        return Response.status(Response.Status.CONFLICT).entity("No hay habitaciones disponibles para el tipo y las fechas seleccionadas.").build();
    }

    // Selecciona una de las habitaciones disponibles
    Habitaciones nuevaHabitacion = habitacionesDisponibles.get(0); // Selecciona la primera habitación disponible

    // Actualiza la reserva con la nueva habitación y recalcula el total
    reservaExistente.setFechaIngreso(reservaActualizada.getFechaIngreso());
    reservaExistente.setFechaSalida(reservaActualizada.getFechaSalida());
    reservaExistente.setIdHabitacion(nuevaHabitacion.getId_habitacion());
    reservaExistente.setTipoHabitacion(nuevaHabitacion.getTipo_habitacion());

    // Verifica la disponibilidad de la habitación para las nuevas fechas
    List<Reservas> reservasExistentes = reservasRepositorio.list(
        "FROM Reservas WHERE idHabitacion = ?1 AND estadoReserva = 'confirmada' AND id != ?2 AND NOT (fechaSalida <= ?3 OR fechaIngreso >= ?4)",
        reservaExistente.getIdHabitacion(), id, reservaActualizada.getFechaIngreso(), reservaActualizada.getFechaSalida());

    if (!reservasExistentes.isEmpty()) {
        return Response.status(Response.Status.CONFLICT).entity("La habitación no está disponible para las nuevas fechas seleccionadas.").build();
    }

    int totalReserva = calcularTotalReservaPorTipo(
        reservaActualizada.getFechaIngreso(), 
        reservaActualizada.getFechaSalida(), 
        nuevaHabitacion.getId_habitacion()
    );
    reservaExistente.setTotalReserva(totalReserva);
    
    reservasRepositorio.persist(reservaExistente);
    
    log.infof("Reserva actualizada con éxito para el ID: %s. Nueva habitación: %d, Nuevo total: %d", id, nuevaHabitacion.getId_habitacion(), totalReserva);
    return Response.ok(reservaExistente).build();
}

private Integer calcularTotalReservaPorTipo(LocalDate fechaIngreso, LocalDate fechaSalida, Long idHabitacion) {
    Optional<Double> precioPorNoche = habitacionRepositorio.findPrecioPorNochePorIdHabitacion(idHabitacion);

    if (!precioPorNoche.isPresent()) {
        log.error("No se encontró precio por noche para el ID de habitación especificado: " + idHabitacion);
        return 0;
    }

    long numeroNoches = ChronoUnit.DAYS.between(fechaIngreso, fechaSalida);
    double totalReserva = numeroNoches * precioPorNoche.get();
    log.infof("Calculando total reserva basado en el ID de habitación %d: %d noches a %f por noche. Total: %f", idHabitacion, numeroNoches, precioPorNoche.get(), totalReserva);

    return (int) Math.round(totalReserva);
}




@PUT
@Path("/{id}/cancelar")
@Transactional
public Response cancelarReserva(@PathParam("id") Long id) {
    Reservas reserva = reservasRepositorio.findById(id);
    if (reserva == null) {
        return Response.status(Response.Status.NOT_FOUND).entity("Reserva no encontrada").build();
    }
    
    // Suponiendo que tienes un estado de reserva que indica la cancelación
    reserva.setEstadoReserva("Cancelada");
    reservasRepositorio.persist(reserva);
    
    log.infof("Reserva con ID: %s ha sido cancelada", id);
    return Response.ok().entity("Reserva cancelada con éxito").build();
}


@GET
@Path("/tipos-habitacion-por-hotel")
public Response obtenerTiposHabitacionPorHotel(@QueryParam("hotelId") Long hotelId) {
    if (hotelId == null) {
        return Response.status(Response.Status.BAD_REQUEST).entity("Es necesario especificar el ID del hotel").build();
    }

    try {
        // Obtiene todas las habitaciones para el hotelId proporcionado
        List<Habitaciones> habitacionesDelHotel = habitacionRepositorio.buscarPorHotelId(hotelId);

        // Extrae los IDs únicos de tipos de habitación de las habitaciones encontradas
        Set<Integer> tiposHabitacionUnicos = habitacionesDelHotel.stream()
                .map(Habitaciones::getTipo_habitacion)
                .collect(Collectors.toSet());

        // Si se requiere más información sobre cada tipo, ajusta esta parte para devolver una lista más detallada
        return Response.ok(tiposHabitacionUnicos).build();
    } catch (Exception e) {
        return Response.serverError().entity("Error al recuperar los tipos de habitación: " + e.getMessage()).build();
    }
}


// vista

   @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/historial/{idUsuario}")
    public Response obtenerHistorialReservasUsuario(@PathParam("idUsuario") Long idUsuario) {
        try {
            List<DetalleReservaDTO> historialReservas = reservasRepositorio.obtenerReservasPorUsuario(idUsuario);
            if (historialReservas.isEmpty()) {
                return Response.status(Response.Status.NOT_FOUND).entity("No se encontraron reservas para el usuario con ID: " + idUsuario).build();
            }
            return Response.ok(historialReservas).build();
        } catch (Exception e) {
            log.error("Error al obtener el historial de reservas del usuario", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error al procesar la solicitud").build();
        }
    }
    


    


}