/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
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
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.Map;

import java.util.List;
import jakarta.persistence.EntityManager;

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
    

    
    @Blocking // puede realizar operaciones bloqueantes
    @GET
    @Path("{id}")
    public Tipos_habitacion retrieve(@PathParam("id") Long id) {
        var tipo = tipos_habitacionRepositorio.findById(id);
        if (tipo != null) {
            if (tipo.getImagenUrl() == null) {
                tipo.setImagenUrl("URL por defecto"); 
            }
            return tipo;
        }
        throw new NoSuchElementException("No hay tipo de habitacion con el ID " + id + ".");
    }
    
    
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response actualizarImagenTipoHabitacion(@PathParam("id") Long id, Map<String, String> imagenData) {
        Tipos_habitacion tipoHabitacion = tipos_habitacionRepositorio.findById(id);
        if (tipoHabitacion == null) {
            throw new NoSuchElementException("No hay tipo de habitación con el ID " + id + ".");
        }
        
        String nuevaUrlImagen = imagenData.get("imagenUrl");
        tipos_habitacionRepositorio.actualizarImagen(id, nuevaUrlImagen);
        
        return Response.ok().build();
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


    
    
}
