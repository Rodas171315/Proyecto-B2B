package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;



/**
 *
 * @author root
 */

 @ApplicationScoped
 public class HabitacionRepositorio implements PanacheRepository<Habitaciones> {
     


    @Inject
    EntityManager em;


    public List<Habitaciones> findByHotelIdAndEstado(Long hotelId, String estado) {
        return find("id_hotel = ?1 and estado = ?2", hotelId, estado).list();
    }

    public List<Habitaciones> findByHotelId(Long hotelId) {
        return find("id_hotel", hotelId).list();
    }

     public List<Habitaciones> buscarPorHotelId(Long hotelId) {
         return find("id_hotel", hotelId).list();
     }
     
     // Método para obtener el precio por noche de una habitación específica por su ID
     public Optional<Double> findPrecioPorNochePorIdHabitacion(Long idHabitacion) {
         return findByIdOptional(idHabitacion)
                 .map(Habitaciones::getPrecioxnoche);
     }


     public List<Habitaciones> buscarPorTipoYDisponibilidad(Integer tipoHabitacion, LocalDate fechaIngreso, LocalDate fechaSalida, Long hotelId) {
        // Asegúrate de que usas 'tipo_habitacion' y 'id_hotel' para coincidir con los nombres de los campos de la entidad
        List<Habitaciones> habitacionesTipo = list("tipo_habitacion = ?1 and id_hotel = ?2", tipoHabitacion, hotelId);
    
        // Filtra las habitaciones que no tienen reservas confirmadas que choquen con las fechas dadas.
        return habitacionesTipo.stream().filter(habitacion -> {
            List<Reservas> reservas = getEntityManager().createQuery("FROM Reservas WHERE idHabitacion = ?1 AND estadoReserva = 'confirmada' AND NOT (fechaSalida <= ?2 OR fechaIngreso >= ?3)", Reservas.class)
                    .setParameter(1, habitacion.getId_habitacion())
                    .setParameter(2, fechaIngreso)
                    .setParameter(3, fechaSalida)
                    .getResultList();
            return reservas.isEmpty(); // Si no hay reservas, la habitación está disponible.
        }).collect(Collectors.toList());
    }
    
    

    public List<Habitaciones> buscarPorPaisYDisponibilidad(String pais, LocalDate fechaIngreso, LocalDate fechaSalida, int numeroPersonas) {
        List<Long> hotelIds = em.createQuery("SELECT h.id FROM Hoteles h WHERE h.pais = :pais", Long.class)
                                .setParameter("pais", pais)
                                .getResultList();
        List<Habitaciones> habitacionesDisponibles = new ArrayList<>();
        for (Long hotelId : hotelIds) {
            List<Habitaciones> habitaciones = list("id_hotel = ?1 and capacidad_personas >= ?2", hotelId, numeroPersonas);
            for (Habitaciones habitacion : habitaciones) {
                long reservas = em.createQuery("SELECT COUNT(r) FROM Reservas r WHERE r.idHabitacion = :idHabitacion AND r.estadoReserva = 'confirmada' AND NOT (r.fechaSalida <= :fechaIngreso OR r.fechaIngreso >= :fechaSalida)", Long.class)
                                  .setParameter("idHabitacion", habitacion.getId_habitacion())
                                  .setParameter("fechaIngreso", fechaIngreso)
                                  .setParameter("fechaSalida", fechaSalida)
                                  .getSingleResult();
                if (reservas == 0) {
                    habitacionesDisponibles.add(habitacion);
                }
            }
        }
        return habitacionesDisponibles;
    }






    // ESTAODS


    @Transactional
    public void cambiarEstadoPorHotelId(Long hotelId, String estado) {
        List<Habitaciones> habitaciones = findByHotelId(hotelId);
        for (Habitaciones habitacion : habitaciones) {
            habitacion.setEstado(estado);
            persist(habitacion); 
        }
    }



}