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

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import io.smallrye.common.annotation.Blocking;
import jakarta.ws.rs.Produces;

/**
 *
 * @author root
 */

@Path("/tipos_habitacion")
@Transactional
public class Tipo_habitacionRecurso {
    
    @Inject
    private Tipo_habitacionRepositorio tipos_habitacionRepositorio;
    
    @GET
    public List<Tipos_habitacion> index() {
        List<Tipos_habitacion> tipos = tipos_habitacionRepositorio.listAll();
        System.out.println("Fetching tipos_habitacion: " + tipos);
        return tipos;
    }
    
    @POST
    public Tipos_habitacion insert(Tipos_habitacion insertedData) {
        assert insertedData.getId_tipo() == null;
        tipos_habitacionRepositorio.persist(insertedData);
        assert insertedData.getId_tipo() != null;
        return insertedData;
    }
    

    
    @Blocking // Indica que este método puede realizar operaciones bloqueantes
    @GET
    @Path("{id}")
    public Tipos_habitacion retrieve(@PathParam("id") Long id) {
        var tipo = tipos_habitacionRepositorio.findById(id);
        if (tipo != null) {
            if (tipo.getImagenUrl() == null) {
                tipo.setImagenUrl("URL por defecto"); // Proporciona la URL por defecto aquí
            }
            return tipo;
        }
        throw new NoSuchElementException("No hay tipo de habitacion con el ID " + id + ".");
    }
    
    

    
    @DELETE
    @Path("{id}")
    public String delete(@PathParam("id") Long id) {
        if (tipos_habitacionRepositorio.deleteById(id)) {
            return "El tipo de habitacion se ha borrado";
        } else {
            return "No se ha borrado (no existe)";
        }
    }
    
    @PUT
    @Path("{id}")
    public Tipos_habitacion update(@PathParam("id") Long id, Tipos_habitacion tipo_habitacion) {
        var updatedData = tipos_habitacionRepositorio.findById(id);
        if (updatedData != null) {
            updatedData.setId_tipo(tipo_habitacion.getId_tipo());
            updatedData.setTipo(tipo_habitacion.getTipo());
            tipos_habitacionRepositorio.persist(updatedData);
            return updatedData;
        }
        throw new NoSuchElementException("No existe un tipo de habitacion con el ID: " + id + ".");
    }


    
    
}
