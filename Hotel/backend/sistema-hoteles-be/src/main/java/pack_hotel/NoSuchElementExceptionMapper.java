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
 *
 * @author root
 */

@Provider
public class NoSuchElementExceptionMapper implements ExceptionMapper<NoSuchElementException> {

    public static record NoSuchElementMessage(String message, String detail) {
    
    }
    
    @Override
    public Response toResponse(NoSuchElementException e) {
        var error = new NoSuchElementMessage(e.getMessage(), null);
        return Response.status(404).entity(error).build();
    }
    
}
