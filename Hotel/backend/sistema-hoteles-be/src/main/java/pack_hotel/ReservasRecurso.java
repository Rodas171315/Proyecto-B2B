package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
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
    
    @GET
    public List<Reservas> listarTodasLasReservas() {
        return reservasRepositorio.listAll();
    }

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
        List<Reservas> reservasExistentes = reservasRepositorio.list("idHabitacion = ?1", verificarDisponibilidadDTO.getIdHabitacion());
        LocalDate fechaIngreso = LocalDate.parse(verificarDisponibilidadDTO.getFechaIngreso());
        LocalDate fechaSalida = LocalDate.parse(verificarDisponibilidadDTO.getFechaSalida());
        for (Reservas reserva : reservasExistentes) {
            if (!(fechaSalida.isBefore(reserva.getFechaIngreso()) || fechaIngreso.isAfter(reserva.getFechaSalida()))) {
                return Response.ok(new DisponibilidadDTO(false)).build();
            }
        }
        return Response.ok(new DisponibilidadDTO(true)).build();
    }



    
    @PUT
    @Path("{id}/estado")
    @Transactional
    public Response actualizarEstadoReserva(@PathParam("id") Long id, Reservas estadoReserva) {
        Reservas reservaExistente = reservasRepositorio.findById(id);
        if (reservaExistente != null) {
            // Aquí solo actualizamos el estado de la reserva, pero podrías ajustar para manejar otras propiedades si fuera necesario.
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
    
        // Verifica disponibilidad de la habitación para las fechas dadas
        List<Reservas> reservasExistentes = reservasRepositorio.list("idHabitacion", reserva.getIdHabitacion());
        for (Reservas reservaExistente : reservasExistentes) {
            if (!(fechaSalida.isBefore(reservaExistente.getFechaIngreso()) || fechaIngreso.isAfter(reservaExistente.getFechaSalida()))) {
                return Response.status(Response.Status.CONFLICT).entity("La habitación no está disponible para las fechas seleccionadas.").build();
            }
        }
    
        try {
            Habitaciones habitacion = habitacionRepositorio.findByIdOptional(reserva.getIdHabitacion())
                    .orElseThrow(() -> new WebApplicationException("Habitación no encontrada.", Response.Status.NOT_FOUND));
    
            // Asigna el tipo de habitación obtenido al campo correspondiente en la entidad Reservas
            System.out.println("Tipo de habitación obtenido: " + habitacion.getTipo_habitacion());
            reserva.setTipoHabitacion(habitacion.getTipo_habitacion());
    
            reserva.setEstadoReserva("confirmada"); // Establece el estado inicial de la reserva
            reservasRepositorio.persist(reserva);
    
            return Response.status(Response.Status.CREATED).entity(reserva).build();
        } catch (WebApplicationException e) {
            return Response.status(e.getResponse().getStatus()).entity(e.getMessage()).build();
        } catch (Exception e) {
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
        detalle.setIdHabitacion(reserva.getIdHabitacion()); // Asegúrate de setear idHabitacion aquí
        detalle.setNombreHotel(hotel.getNombre());
        detalle.setPais(hotel.getPais());
        detalle.setCiudad(hotel.getCiudad());
        detalle.setDireccion(hotel.getDireccion());
        detalle.setTipoHabitacion(reserva.getTipoHabitacion()); // Corrección aquí
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

    Habitaciones habitacion = habitacionRepositorio.findById(reservaActualizada.getIdHabitacion());
    if (habitacion == null) {
        log.errorf("Habitación no encontrada para ID: %s", reservaActualizada.getIdHabitacion());
        return Response.status(Response.Status.NOT_FOUND).entity("Habitación no encontrada").build();
    }

    // Asumir que la habitación y el tipo ya han sido validados como existentes y adecuados
    // Ahora, aplicar una lógica similar a la creación de reserva para verificar la disponibilidad
    List<Reservas> reservasExistentes = reservasRepositorio.list("idHabitacion = ?1 AND id != ?2",
                                                                   reservaActualizada.getIdHabitacion(), id);
    LocalDate fechaIngreso = reservaActualizada.getFechaIngreso();
    LocalDate fechaSalida = reservaActualizada.getFechaSalida();
    boolean conflicto = reservasExistentes.stream().anyMatch(r -> 
        !(fechaSalida.isBefore(r.getFechaIngreso()) || fechaIngreso.isAfter(r.getFechaSalida())) &&
        r.getTipoHabitacion().equals(reservaActualizada.getTipoHabitacion()));

    if (conflicto) {
        return Response.status(Response.Status.CONFLICT).entity("La habitación no está disponible para las fechas y el tipo de habitación seleccionados.").build();
    }

    // Actualiza la reserva si no hay conflictos
    reservaExistente.setFechaIngreso(fechaIngreso);
    reservaExistente.setFechaSalida(fechaSalida);
    reservaExistente.setIdHabitacion(reservaActualizada.getIdHabitacion());
    reservaExistente.setTipoHabitacion(reservaActualizada.getTipoHabitacion());
    int totalReserva = calcularTotalReserva(habitacion, fechaIngreso, fechaSalida);
    reservaExistente.setTotalReserva(totalReserva);
    
    reservasRepositorio.persist(reservaExistente);

    log.infof("Reserva actualizada con éxito para el ID: %s", id);
    return Response.ok(reservaExistente).build();
}


private boolean verificarDisponibilidadConExclusion(Long idHabitacion, LocalDate fechaIngreso, LocalDate fechaSalida, Long reservaId, Integer tipoHabitacion) {
    // Aquí asumimos que "list" realiza una consulta a la base de datos que retorna todas las reservas excepto la actual (reservaId)
    List<Reservas> reservasExistentes = reservasRepositorio.list(
        "idHabitacion = ?1 AND tipoHabitacion = ?2 AND id != ?3", idHabitacion, tipoHabitacion, reservaId);

    return reservasExistentes.stream().noneMatch(reserva -> 
        (fechaIngreso.isBefore(reserva.getFechaSalida()) && fechaSalida.isAfter(reserva.getFechaIngreso()))
    );

}

private Integer calcularTotalReserva(Habitaciones habitacion, LocalDate fechaIngreso, LocalDate fechaSalida) {
    long numeroNoches = ChronoUnit.DAYS.between(fechaIngreso, fechaSalida);
    double totalReserva = numeroNoches * habitacion.getPrecioxnoche();
    return (int) Math.round(totalReserva);
}



    @DELETE
    @Path("{id}")
    @Transactional
    public Response eliminarReserva(@PathParam("id") Long id) {
        boolean eliminado = reservasRepositorio.deleteById(id);
        if (eliminado) {
            return Response.status(Response.Status.NO_CONTENT).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}