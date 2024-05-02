package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalTime;

public class HotelesTest {

    private Hoteles hotel;

    @BeforeEach
    public void setUp() {
        hotel = new Hoteles();
    }

    @Test
    public void testSetAndGetIdHotel() {
        Long idHotel = 1L;
        hotel.setId_hotel(idHotel);
        Assertions.assertEquals(idHotel, hotel.getId_hotel());
    }

    @Test
    public void testSetAndGetIdCadena() {
        Long idCadena = 2L;
        hotel.setId_cadena(idCadena);
        Assertions.assertEquals(idCadena, hotel.getId_cadena());
    }

    @Test
    public void testSetAndGetNombre() {
        String nombre = "Hotel Test";
        hotel.setNombre(nombre);
        Assertions.assertEquals(nombre, hotel.getNombre());
    }

    @Test
    public void testSetAndGetPais() {
        String pais = "Testlandia";
        hotel.setPais(pais);
        Assertions.assertEquals(pais, hotel.getPais());
    }

    @Test
    public void testSetAndGetCiudad() {
        String ciudad = "Testópolis";
        hotel.setCiudad(ciudad);
        Assertions.assertEquals(ciudad, hotel.getCiudad());
    }

    @Test
    public void testSetAndGetDireccion() {
        String direccion = "Calle Test 123";
        hotel.setDireccion(direccion);
        Assertions.assertEquals(direccion, hotel.getDireccion());
    }

    @Test
    public void testSetAndGetCheckin() {
        LocalTime checkin = LocalTime.of(14, 0);
        hotel.setCheckin(checkin);
        Assertions.assertEquals(checkin, hotel.getCheckin());
    }

    @Test
    public void testSetAndGetCheckout() {
        LocalTime checkout = LocalTime.of(12, 0);
        hotel.setCheckout(checkout);
        Assertions.assertEquals(checkout, hotel.getCheckout());
    }

    @Test
    public void testSetAndGetImagenUrl() {
        String imagenUrl = "http://example.com/image.jpg";
        hotel.setImagenUrl(imagenUrl);
        Assertions.assertEquals(imagenUrl, hotel.getImagenUrl());
    }
}

