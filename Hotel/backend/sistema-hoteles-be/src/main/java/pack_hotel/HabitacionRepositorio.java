/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


/**
 *
 * @author root
 */

 @ApplicationScoped
 public class HabitacionRepositorio implements PanacheRepository<Habitaciones> {
     
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
    
    
    
 }