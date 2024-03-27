/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

/**
 *
 * @author root
 */

@ApplicationScoped
public class HabitacionRepositorio implements PanacheRepository<Habitaciones> {
    
    public List<Habitaciones> buscarPorHotelId(Long hotelId) {
        return find("id_hotel", hotelId).list();
    }
}