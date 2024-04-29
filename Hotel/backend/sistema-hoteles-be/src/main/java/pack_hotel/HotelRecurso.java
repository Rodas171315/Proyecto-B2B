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
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.Produces;
import java.util.List;
import java.util.NoSuchElementException;

import java.util.Map;

/**
 * Recurso REST para operaciones CRUD sobre hoteles.
 */
@Path("/hoteles")
@Transactional
public class HotelRecurso {
    
    @Inject
    private HotelRepositorio hotelesRepositorio;


    @Inject
    private HabitacionRepositorio habitacionRepositorio;

        
    @Inject
    private ImagenAmenidadRepositorio imagenAmenidadRepositorio;
    
    @Inject
    private ReservasRepositorio reservasRepositorio;

    /**
     * Lista todos los hoteles.
     *
     * @return Una lista de objetos Hoteles.
     */ 
    @GET
    public List<Hoteles> index() {
        return hotelesRepositorio.listAll();
    }
    

    /**
     * Inserta un nuevo hotel en la base de datos.
     *
     * @param insertedData Datos del hotel a insertar.
     * @return El hotel insertado.
     */
    @POST
    public Hoteles insert(Hoteles insertedData) {
        assert insertedData.getId_hotel() == null;
        hotelesRepositorio.persist(insertedData);
        assert insertedData.getId_hotel() != null;
        return insertedData;
    }
    

    /**
     * Obtiene un hotel por su ID.
     *
     * @param id ID del hotel.
     * @return El objeto Hoteles recuperado.
     */
    @GET
    @Path("{id}")
    public Hoteles retrieve(@PathParam("id") Long id) {
        var hotel = hotelesRepositorio.findById(id);
        if (hotel != null) {
            return hotel;
        }
        throw new NoSuchElementException("No hay hotel con el ID " + id + ".");
    }
    

    /**
     * Elimina un hotel por su ID.
     *
     * @param id ID del hotel.
     * @return Un mensaje indicando si el hotel fue eliminado o no.
     */
    @DELETE
    @Path("{id}")
    public String delete(@PathParam("id") Long id) {
        if (hotelesRepositorio.deleteById(id)) {
            return "El hotel se ha borrado";
        } else {
            return "No se ha borrado (no existe)";
        }
    }
    
    /**
     * Actualiza los datos de un hotel existente.
     *
     * @param id ID del hotel.
     * @param hotel Datos actualizados del hotel.
     * @return El hotel actualizado.
     */
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


    /**
     * Obtiene una lista de hoteles por país.
     *
     * @param pais El país para filtrar hoteles.
     * @return Una lista de hoteles en el país especificado.
     */
    @GET
    @Path("/por-pais/{pais}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Hoteles> obtenerHotelesPorPais(@PathParam("pais") String pais) {
        return hotelesRepositorio.findByPais(pais);
    }
    

    /**
     * Obtiene una lista de todos los países únicos donde hay hoteles.
     *
     * @return Una lista de nombres de países.
     */
    @GET
    @Path("/pais")
    public List<String> obtenerPaisesUnicos() {
        return hotelesRepositorio.listarPaisesUnicos();
    }


    /**
     * Obtiene las imágenes de amenidades de un hotel por su ID.
     *
     * @param id ID del hotel.
     * @return Lista de URLs de imágenes.
     */
    @GET
    @Path("/{id}/imagenes")
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> obtenerImagenesAmenidades(@PathParam("id") Long id) {
        return hotelesRepositorio.obtenerImagenesAmenidadesPorHotel(id);
    }


    /**
     * Actualiza las imágenes de un hotel.
     *
     * @param id ID del hotel.
     * @param urlImagenes Lista de nuevas URLs de imágenes.
     * @return Response indicando si la actualización fue exitosa.
     */
    @POST
    @Path("/{id}/imagenes")
    public Response actualizarImagenesHotel(@PathParam("id") Long id, List<String> urlImagenes) {
        Hoteles hotel = hotelesRepositorio.findById(id);
        if (hotel == null) {
            throw new NoSuchElementException("No hay hotel con el ID " + id + ".");
        }
        
        // Eliminar imágenes existentes
        imagenAmenidadRepositorio.deleteByHotelId(hotel.getId_hotel());
        
        // Añadir nuevas imágenes
        for (String urlImagen : urlImagenes) {
            ImagenAmenidad nuevaImagen = new ImagenAmenidad();
            nuevaImagen.setUrlImagen(urlImagen);
            nuevaImagen.setHotel(hotel);
            imagenAmenidadRepositorio.persist(nuevaImagen);
        }
    
        return Response.ok().build();
    }
    


  @PUT
  @Path("/{id}/imagen")
  public Response updateHotelImage(@PathParam("id") Long id, Map<String, String> image) {
    Hoteles hotel = hotelesRepositorio.findById(id);
    if (hotel != null) {
      hotel.setImagenUrl(image.get("urlImagen"));
      hotelesRepositorio.persist(hotel);
      return Response.ok(hotel).build();
    } else {
      throw new NoSuchElementException("No hay hotel con el ID " + id + ".");
    }
  }

  @DELETE
  @Path("/{id}/imagen")
  public Response deleteHotelImage(@PathParam("id") Long id) {
    Hoteles hotel = hotelesRepositorio.findById(id);
    if (hotel != null) {
      hotel.setImagenUrl(null);
      hotelesRepositorio.persist(hotel);
      return Response.ok().build();
    } else {
      throw new NoSuchElementException("No hay hotel con el ID " + id + ".");
    }
  }


    /**
     * Cambia el estado de un hotel.
     *
     * @param idHotel ID del hotel.
     * @param estado Nuevo estado del hotel ('activo' o 'inactivo').
     * @return Response con el hotel actualizado.
     */
  @PUT
  @Path("/{id}/estado/{estado}")
  public Response cambiarEstadoHotel(@PathParam("id") Long idHotel, @PathParam("estado") String estado) {
      estado = estado.toLowerCase();
      Hoteles hotel = hotelesRepositorio.findById(idHotel);
      if (hotel == null) {
          throw new NoSuchElementException("No hay hotel con el ID " + idHotel + ".");
      }
      
      if (!"activo".equals(estado) && !"inactivo".equals(estado)) {
          return Response.status(Response.Status.BAD_REQUEST).entity("Estado no válido. Los estados válidos son 'activo' o 'inactivo'.").build();
      }
  
      hotel.setEstado(estado);
      hotelesRepositorio.persist(hotel);
  
      // este para actualizar el estado de todas las habitaciones del hotel
      List<Habitaciones> habitaciones = habitacionRepositorio.findByHotelId(idHotel);
      for (Habitaciones habitacion : habitaciones) {
          habitacion.setEstado(estado);
          habitacionRepositorio.persist(habitacion);
          
          if ("inactivo".equals(estado)) {
              reservasRepositorio.cancelarReservasPorHabitacionSiNecesario(habitacion.getId_habitacion());
          }
      }
  
      return Response.ok(hotel).build();
  }
  
  
  
    /**
     * Desactiva un hotel.
     *
     * @param id ID del hotel.
     * @return Response indicando si la desactivación fue exitosa.
     */
@PUT
@Path("/{id}/desactivar")
public Response desactivarHotel(@PathParam("id") Long id) {
    return cambiarEstadoHotel(id, "inactivo");
}


    /**
     * Activa un hotel.
     *
     * @param id ID del hotel.
     * @return Response indicando si la activación fue exitosa.
     */
@PUT
@Path("/{id}/activar")
public Response activarHotel(@PathParam("id") Long id) {
    return cambiarEstadoHotel(id, "activo");
}



}

    
