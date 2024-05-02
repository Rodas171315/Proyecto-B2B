/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pack_hotel;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import java.util.NoSuchElementException;

/**
 * Implementación de ExceptionMapper para manejar la excepción NoSuchElementException.
 * Proporciona una respuesta uniforme para las excepciones de elementos no encontrados en la API.
 */

@Provider
public class NoSuchElementExceptionMapper implements ExceptionMapper<NoSuchElementException> {

    /**
     * Clase de registro interna para encapsular mensajes de error.
     */
    public static record NoSuchElementMessage(String message, String detail) {
    
    }
    
    /**
     * Método que convierte una NoSuchElementException en una respuesta HTTP adecuada.
     * 
     * @param e La excepción capturada que se manejará.
     * @return Una respuesta HTTP con un código de estado 404 (No encontrado) y un mensaje de error.
     */
    @Override
    public Response toResponse(NoSuchElementException e) {
        var error = new NoSuchElementMessage(e.getMessage(), null);
        return Response.status(404).entity(error).build();
    }
    
}
