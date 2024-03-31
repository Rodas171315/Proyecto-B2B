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
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.Produces;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

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
    public Hoteles insert(Hoteles insertedData) {
        assert insertedData.getId_hotel() == null;
        hotelesRepositorio.persist(insertedData);
        assert insertedData.getId_hotel() != null;
        return insertedData;
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
        var updatedData = hotelesRepositorio.findById(id);
        if (updatedData != null) {
            updatedData.setId_cadena(hotel.getId_cadena());
            updatedData.setNombre(hotel.getNombre());
            updatedData.setPais(hotel.getPais());
            updatedData.setCiudad(hotel.getCiudad());
            updatedData.setDireccion(hotel.getDireccion());
            updatedData.setCheckin(hotel.getCheckin());
            updatedData.setCheckout(hotel.getCheckout());
            hotelesRepositorio.persist(updatedData);
            return updatedData;
        }
        throw new NoSuchElementException("No existe un hotel con el ID: " + id + ".");
    }

    @GET
    @Path("/por-pais/{pais}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Hoteles> obtenerHotelesPorPais(@PathParam("pais") String pais) {
        return hotelesRepositorio.findByPais(pais);
    }
    
    @GET
    @Path("/pais")
    public List<String> obtenerPaisesUnicos() {
        return hotelesRepositorio.listarPaisesUnicos();
    }


    //imagenes


    @GET
    @Path("/{id}/imagenes")
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> obtenerImagenesAmenidades(@PathParam("id") Long id) {
        return hotelesRepositorio.obtenerImagenesAmenidadesPorHotel(id);
    }


    }

    
