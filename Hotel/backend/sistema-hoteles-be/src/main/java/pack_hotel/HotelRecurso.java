/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pack_hotel;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import java.util.List;
import java.util.NoSuchElementException;

/**
 *
 * @author root
 */

@Path("/hoteles")
@Transactional
public class HotelRecurso {
    
    @Inject
    private HotelRepositorio hotelesRepositorio;
    
    @GET
    public List<Hoteles> index() {
        return hotelesRepositorio.listAll();
    }
    
    @POST
    public Hoteles insert(Hoteles insertedHotel) {
        assert insertedHotel.getId_hotel() == null;
        hotelesRepositorio.persist(insertedHotel);
        assert insertedHotel.getId_hotel() != null;
        return insertedHotel;
    }
    
    @GET
    @Path("{id}")
    public Hoteles retrieve(@PathParam("id") Long id) {
        var hotel = hotelesRepositorio.findById(id);
        if (hotel != null) {
            return hotel;
        }
        throw new NoSuchElementException("No hay hotel con el ID " + id + ".");
    }
    
    @DELETE
    @Path("{id}")
    public String delete(@PathParam("id") Long id) {
        if (hotelesRepositorio.deleteById(id)) {
            return "El hotel se ha borrado";
        } else {
            return "No se ha borrado (no existe)";
        }
    }
    
    @PUT
    @Path("{id}")
    public Hoteles update(@PathParam("id") Long id, Hoteles hotel) {
        var updatedHotel = hotelesRepositorio.findById(id);
        if (updatedHotel != null) {
            updatedHotel.setId_cadena(hotel.getId_cadena());
            updatedHotel.setNombre(hotel.getNombre());
            updatedHotel.setPais(hotel.getPais());
            updatedHotel.setCiudad(hotel.getCiudad());
            updatedHotel.setDireccion(hotel.getDireccion());
            updatedHotel.setCheckin(hotel.getCheckin());
            updatedHotel.setCheckout(hotel.getCheckout());
            hotelesRepositorio.persist(updatedHotel);
            return updatedHotel;
        }
        throw new NoSuchElementException("No existe un hotel con el ID: " + id + ".");
    }
    
}
