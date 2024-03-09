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
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.LocalDate;
import java.util.List;

@Path("/reservas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ReservasRecurso {

    @Inject
    ReservasRepositorio reservasRepositorio;

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
        // Convertir las fechas a LocalDate
        LocalDate fechaIngreso = reserva.getFechaIngreso();
        LocalDate fechaSalida = reserva.getFechaSalida();
    
        // Verificar disponibilidad
        List<Reservas> reservasExistentes = reservasRepositorio.list("idHabitacion = ?1", reserva.getIdHabitacion());
        for (Reservas reservaExistente : reservasExistentes) {
            if (!(fechaSalida.isBefore(reservaExistente.getFechaIngreso()) || fechaIngreso.isAfter(reservaExistente.getFechaSalida()))) {
                // Si se encuentra una reserva existente que se superpone en fechas, retorna una respuesta indicando no disponibilidad
                return Response.status(Response.Status.CONFLICT).entity("La habitación no está disponible para las fechas seleccionadas.").build();
            }
        }
    
        // Si la habitación está disponible, procede con la creación de la reserva
        try {
            System.out.println("Creando reserva con datos: " + reserva);
            reserva.setEstadoReserva("confirmada");
            reservasRepositorio.persist(reserva);
            return Response.status(Response.Status.CREATED).entity(reserva).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().entity("Error al crear la reserva: " + e.getMessage()).build();
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