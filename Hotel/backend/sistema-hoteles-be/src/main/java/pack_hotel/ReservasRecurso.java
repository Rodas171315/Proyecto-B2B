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
    @Transactional
    public Response crearReserva(Reservas reserva) {
        try {
            System.out.println("Creando reserva con datos: " + reserva);
            // Agregar impresiones de depuración para cada campo
            System.out.println("ID Habitación: " + reserva.getIdHabitacion());
            System.out.println("ID Usuario: " + reserva.getIdUsuario());
            System.out.println("Código Reserva: " + reserva.getCodigoReserva());
            System.out.println("Fecha Ingreso: " + reserva.getFechaIngreso());
            System.out.println("Fecha Salida: " + reserva.getFechaSalida());
            System.out.println("Total Reserva: " + reserva.getTotalReserva());
    
            if (reserva.getPersonasReserva() == null) {
                reserva.setPersonasReserva(1); // O cualquier valor predeterminado lógico
            }
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