package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
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

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Path("/reservas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ReservasRecurso {

    @Inject
    ReservasRepositorio reservasRepositorio;

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
    
        List<Reservas> reservasExistentes = reservasRepositorio.list("idHabitacion", reserva.getIdHabitacion());
        for (Reservas reservaExistente : reservasExistentes) {
            if (!(fechaSalida.isBefore(reservaExistente.getFechaIngreso()) || fechaIngreso.isAfter(reservaExistente.getFechaSalida()))) {
                return Response.status(Response.Status.CONFLICT).entity("La habitación no está disponible para las fechas seleccionadas.").build();
            }
        }
    
        // Si la habitación está disponible, procede con la creación de la reserva
    try {
        Habitaciones habitacion = habitacionRepositorio.findByIdOptional(reserva.getIdHabitacion())
        .orElseThrow(() -> new WebApplicationException("Habitación no encontrada.", Response.Status.NOT_FOUND));

        reserva.setEstadoReserva("confirmada"); // Estado inicial de la reserva
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
        detalle.setNombreHotel(hotel.getNombre());
        detalle.setPais(hotel.getPais());
        detalle.setCiudad(hotel.getCiudad());
        detalle.setDireccion(hotel.getDireccion());
        detalle.setTipoHabitacion(getTipoHabitacionAsString(habitacion.getTipo_habitacion()));
        detalle.setFechaIngreso(reserva.getFechaIngreso());
        detalle.setFechaSalida(reserva.getFechaSalida());
        long numeroNoches = java.time.temporal.ChronoUnit.DAYS.between(reserva.getFechaIngreso(), reserva.getFechaSalida());
        detalle.setNumeroNoches((int) numeroNoches);
        detalle.setCodigoReserva(reserva.getCodigoReserva());
        detalle.setTotalReserva(reserva.getTotalReserva());
        detalle.setEstadoReserva(reserva.getEstadoReserva());
        detalle.setCapacidadPersonas(habitacion.getCapacidad_personas());

        return detalle;
    }).collect(Collectors.toList());

    return Response.ok(detalleReservasList).build();
}

private String getTipoHabitacionAsString(int tipoHabitacionId) {
    // Aquí va la implementación de tu método
    switch(tipoHabitacionId) {
        case 1: return "Doble";
        case 2: return "Junior Suite";
        case 3: return "Suite";
        case 4: return "Gran Suite";
        default: return "Unknown";
    }
}
    




    @PUT
    @Path("{id}")
    @Transactional
    public Response actualizarReserva(@PathParam("id") Long id, Reservas reservaActualizada) {
        Reservas reservaExistente = reservasRepositorio.findById(id);
        if (reservaExistente != null) {
            reservaExistente.setIdHabitacion(reservaActualizada.getIdHabitacion());
            reservaExistente.setIdUsuario(reservaActualizada.getIdUsuario());
            reservaExistente.setCodigoReserva(reservaActualizada.getCodigoReserva());
            reservaExistente.setPersonasReserva(reservaActualizada.getPersonasReserva());
            reservaExistente.setFechaIngreso(reservaActualizada.getFechaIngreso());
            reservaExistente.setFechaSalida(reservaActualizada.getFechaSalida());
            reservaExistente.setTotalReserva(reservaActualizada.getTotalReserva());
            reservaExistente.setEstadoReserva(reservaActualizada.getEstadoReserva());
            reservasRepositorio.persist(reservaExistente);
            return Response.ok(reservaExistente).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
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