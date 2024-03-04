/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pack_quarkus;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

/**
 *
 * @author root
 */

@Path("/temperaturas")
public class TemperaturasResource {
    
    private TemperaturasService temperaturas;
    
    @Inject
    public TemperaturasResource(TemperaturasService temperaturas){
        this.temperaturas = temperaturas;
    }
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Temperatura nueva(Temperatura temp) {
        temperaturas.addTemperatura(temp);
        return temp;
    }
    
    /*
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Temperatura> list(){
        return Arrays.asList(
                new Temperatura("Guatemala", 18, 28),
                new Temperatura("Antigua", 20, 30),
                new Temperatura("Quetzaltenango", 16, 25),
                new Temperatura("Coban", -4, 11)
        );
    }
    */
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Temperatura> list(){
        return temperaturas.obtenerTemperaturas();
    }
    
    @GET
    @Path("/maxima")
    @Produces(MediaType.TEXT_PLAIN)
    public Response maxima(){
        if (temperaturas.isEmpty()) {
            return Response.status(404).entity("No hay temperaturas").build();
        }else{
            int temperaturaMaxima = temperaturas.maxima();
            return Response.ok(Integer.toString(temperaturaMaxima))
                    .header("X-Hola", "Soy un header")
                    .build();
        }
    }
    
    @GET
    @Path("{ciudad}")
    @Produces(MediaType.APPLICATION_JSON)
    public Temperatura sacar(@PathParam("ciudad") String ciudad){
        return temperaturas.sacarTemperatura(ciudad)
                .orElseThrow(() -> new NoSuchElementException("No hay registro para la ciudad " + ciudad));
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/una")
    public Temperatura medicion(){
        return new Temperatura("Guatemala", 18, 28);
    }
    
}
