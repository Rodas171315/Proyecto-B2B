/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pack_quarkus;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.QueryParam;
import java.util.Optional;

/**
 *
 * @author root
 */

@Path("/saludar")
public class EcoResource {
    
    @GET
    @Path("/{nombre}")
    public String saludo(@PathParam("nombre") String nombre){
        return "Hola, " + nombre;
    }
    
    @GET
    @Path("/{nombre}/gritar")
    public String gritar(@PathParam("nombre") String nombre){
        return "HOLA, " + nombre.toUpperCase();
    }
    
    @GET
    public String saludar(@QueryParam("mensaje") String mensaje) {
        return Optional.ofNullable(mensaje)
                .map(n -> "> " + n)
                .orElse("No se muy bien que decir");
    }
    
    /*
    @GET
    public String saludar(@QueryParam("mensaje") String mensaje) {
        if (mensaje == null){
            return "No se muy bien que decir";
        }else{
            return "> " + mensaje;
        }
    }
    */
    
    /*
    @GET
    public String saludar() {
        return "Hola";
    }
    */
    
    @GET
    @Path("/dias")
    public String dias() {
        return "Hola, muy buenos dias";
    }
    
    @GET
    @Path("/tardes")
    public String tardes() {
        return "Hola, muy buenas tardes";
    }
    
    @GET
    @Path("/noches")
    public String noches() {
        return "Hola, muy buenas noches";
    }
    
}
