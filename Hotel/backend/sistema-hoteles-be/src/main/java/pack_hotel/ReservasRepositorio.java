/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;



/**
 * Repositorio para manejar las operaciones de base de datos relacionadas con las reservas.
 */
@ApplicationScoped
public class ReservasRepositorio implements PanacheRepository<Reservas> {
    
    
    @PersistenceContext
    EntityManager em;

    /**
     * Obtiene una lista de detalles de reservas asociadas a un usuario específico.
     * @param idUsuario El identificador del usuario cuyas reservas se desean obtener.
     * @return Una lista de objetos DetalleReservaDTO con la información detallada de cada reserva.
     */
    @SuppressWarnings("unchecked")
    public List<DetalleReservaDTO> obtenerReservasPorUsuario(Long idUsuario) {
        List<Object[]> rawList = em.createNativeQuery("SELECT id_reserva, id_hotel, id_habitacion, id_usuario, tipo_habitacion, codigo_reserva, fecha_ingreso, fecha_salida, total_reserva, estado_reserva FROM VistaSeguimientoClientes WHERE id_usuario = :idUsuario")
                                .setParameter("idUsuario", idUsuario)
                                .getResultList();
    
        List<DetalleReservaDTO> reservas = new ArrayList<>();
        for (Object[] record : rawList) {
            DetalleReservaDTO dto = new DetalleReservaDTO();
            dto.setIdReserva(convertToLong(record[0]));
            dto.setIdHotel(convertToLong(record[1]));
            dto.setIdHabitacion(convertToLong(record[2]));
            dto.setIdUsuario(convertToLong(record[3]));
            dto.setTipoHabitacion(convertToInt(record[4]));
            dto.setCodigoReserva(convertToInt(record[5]));
            dto.setFechaIngreso(convertToLocalDate(record[6]));
            dto.setFechaSalida(convertToLocalDate(record[7]));
            dto.setTotalReserva(convertToInt(record[8]));
            dto.setEstadoReserva(convertToString(record[9]));
            reservas.add(dto);
        }
        return reservas;
    }

    private Long convertToLong(Object dbData) {
        return dbData != null ? ((Number) dbData).longValue() : null;
    }

private Integer convertToInt(Object dbData) {
    if (dbData != null) {
        if (dbData instanceof Number) {
            return ((Number) dbData).intValue();
        } else if (dbData instanceof String) {
            try {
                return Integer.parseInt((String) dbData);
            } catch (NumberFormatException e) {
                // Manejar la excepción si la cadena no puede convertirse en un número
                return null;
            }
        }
    }
    return null;
}

private LocalDate convertToLocalDate(Object dbData) {
    if (dbData != null) {
        return ((java.sql.Timestamp) dbData).toLocalDateTime().toLocalDate();
    }
    return null;
}




    private String convertToString(Object dbData) {
        return dbData != null ? dbData.toString() : null;
    }



    /**
     * Encuentra reservas por identificador de habitación y estado.
     * @param idHabitacion Identificador de la habitación.
     * @param estado Estado de la reserva.
     * @return Una lista de reservas que coinciden con los criterios.
     */
public List<Reservas> findByHabitacionAndEstado(Long idHabitacion, String estado) {
    return list("idHabitacion = ?1 and estadoReserva = ?2", idHabitacion, estado);
}

    /**
     * Cancela todas las reservas confirmadas para una habitación específica, si es necesario.
     * @param idHabitacion Identificador de la habitación para la cual se cancelarán las reservas.
     */
public void cancelarReservasPorHabitacionSiNecesario(Long idHabitacion) {
    List<Reservas> reservasConfirmadas = em.createQuery("SELECT r FROM Reservas r WHERE r.idHabitacion = :idHabitacion AND r.estadoReserva = 'confirmada'", Reservas.class)
                                           .setParameter("idHabitacion", idHabitacion)
                                           .getResultList();
    for (Reservas reserva : reservasConfirmadas) {
        reserva.setEstadoReserva("Cancelada");
        persist(reserva);
    }
}




    
}
    

