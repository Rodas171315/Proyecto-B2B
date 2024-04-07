package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ImagenAmenidadTest {

    private ImagenAmenidad imagenAmenidad;
    private Hoteles hotel;

    @BeforeEach
    public void setUp() {
        imagenAmenidad = new ImagenAmenidad();
        hotel = new Hoteles(); 
        hotel.setId_hotel(1L); 
    }

    @Test
    public void testSetAndGetIdImagen() {
        Long idImagen = 1L;
        imagenAmenidad.setIdImagen(idImagen);
        Assertions.assertEquals(idImagen, imagenAmenidad.getIdImagen());
    }

    @Test
    public void testSetAndGetHotel() {
        imagenAmenidad.setHotel(hotel);
        Assertions.assertEquals(hotel, imagenAmenidad.getHotel());
        Assertions.assertEquals(1L, imagenAmenidad.getHotel().getId_hotel()); 
    }

    @Test
    public void testSetAndGetUrlImagen() {
        String urlImagen = "http://example.com/imagen.jpg";
        imagenAmenidad.setUrlImagen(urlImagen);
        Assertions.assertEquals(urlImagen, imagenAmenidad.getUrlImagen());
    }
}

