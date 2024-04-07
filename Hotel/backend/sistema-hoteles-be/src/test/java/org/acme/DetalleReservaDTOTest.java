package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;

public class DetalleReservaDTOTest {

    private DetalleReservaDTO detalleReservaDTO;

    @BeforeEach
    public void setUp() {
        detalleReservaDTO = new DetalleReservaDTO();
    }

    @Test
    public void testSetAndGetIdReserva() {
        Long idReserva = 1L;
        detalleReservaDTO.setIdReserva(idReserva);
        Assertions.assertEquals(idReserva, detalleReservaDTO.getIdReserva());
    }

    @Test
    public void testSetAndGetIdHotel() {
        Long idHotel = 2L;
        detalleReservaDTO.setIdHotel(idHotel);
        Assertions.assertEquals(idHotel, detalleReservaDTO.getIdHotel());
    }

    @Test
    public void testSetAndGetIdHabitacion() {
        Long idHabitacion = 3L;
        detalleReservaDTO.setIdHabitacion(idHabitacion);
        Assertions.assertEquals(idHabitacion, detalleReservaDTO.getIdHabitacion());
    }

    @Test
    public void testSetAndGetNumeroHabitacion() {
        int numeroHabitacion = 101;
        detalleReservaDTO.setNumeroHabitacion(numeroHabitacion);
        Assertions.assertEquals(numeroHabitacion, detalleReservaDTO.getNumeroHabitacion());
    }

    @Test
    public void testSetAndGetNombreHotel() {
        String nombreHotel = "Hotel Prueba";
        detalleReservaDTO.setNombreHotel(nombreHotel);
        Assertions.assertEquals(nombreHotel, detalleReservaDTO.getNombreHotel());
    }

    @Test
    public void testSetAndGetPais() {
        String pais = "País Prueba";
        detalleReservaDTO.setPais(pais);
        Assertions.assertEquals(pais, detalleReservaDTO.getPais());
    }

    @Test
    public void testSetAndGetCiudad() {
        String ciudad = "Ciudad Prueba";
        detalleReservaDTO.setCiudad(ciudad);
        Assertions.assertEquals(ciudad, detalleReservaDTO.getCiudad());
    }

    @Test
    public void testSetAndGetDireccion() {
        String direccion = "Dirección Prueba";
        detalleReservaDTO.setDireccion(direccion);
        Assertions.assertEquals(direccion, detalleReservaDTO.getDireccion());
    }

    @Test
    public void testSetAndGetTipoHabitacion() {
        Integer tipoHabitacion = 1;
        detalleReservaDTO.setTipoHabitacion(tipoHabitacion);
        Assertions.assertEquals(tipoHabitacion, detalleReservaDTO.getTipoHabitacion());
    }

    @Test
    public void testSetAndGetFechaIngreso() {
        LocalDate fechaIngreso = LocalDate.now();
        detalleReservaDTO.setFechaIngreso(fechaIngreso);
        Assertions.assertEquals(fechaIngreso, detalleReservaDTO.getFechaIngreso());
    }

    @Test
    public void testSetAndGetFechaSalida() {
        LocalDate fechaSalida = LocalDate.now().plusDays(1);
        detalleReservaDTO.setFechaSalida(fechaSalida);
        Assertions.assertEquals(fechaSalida, detalleReservaDTO.getFechaSalida());
    }

    @Test
    public void testSetAndGetNumeroNoches() {
        Integer numeroNoches = 2;
        detalleReservaDTO.setNumeroNoches(numeroNoches);
        Assertions.assertEquals(numeroNoches, detalleReservaDTO.getNumeroNoches());
    }

    @Test
    public void testSetAndGetCodigoReserva() {
        Integer codigoReserva = 123456;
        detalleReservaDTO.setCodigoReserva(codigoReserva);
        Assertions.assertEquals(codigoReserva, detalleReservaDTO.getCodigoReserva());
    }

    @Test
    public void testSetAndGetTotalReserva() {
        Integer totalReserva = 2000;
        detalleReservaDTO.setTotalReserva(totalReserva);
        Assertions.assertEquals(totalReserva, detalleReservaDTO.getTotalReserva());
    }

    @Test
    public void testSetAndGetEstadoReserva() {
        String estadoReserva = "Confirmada";
        detalleReservaDTO.setEstadoReserva(estadoReserva);
        Assertions.assertEquals(estadoReserva, detalleReservaDTO.getEstadoReserva());
    }

    @Test
    public void testSetAndGetCapacidadPersonas() {
        Integer capacidadPersonas = 4;
        detalleReservaDTO.setCapacidadPersonas(capacidadPersonas);
        Assertions.assertEquals(capacidadPersonas, detalleReservaDTO.getCapacidadPersonas());
    }

    @Test
    public void testSetAndGetIdUsuario() {
        Long idUsuario = 5L;
        detalleReservaDTO.setIdUsuario(idUsuario);
        Assertions.assertEquals(idUsuario, detalleReservaDTO.getIdUsuario());
    }

    @Test
    public void testSetAndGetCorreoElectronico() {
        String correoElectronico = "usuario@ejemplo.com";
        detalleReservaDTO.setCorreoElectronico(correoElectronico);
        Assertions.assertEquals(correoElectronico, detalleReservaDTO.getCorreoElectronico());
    }

}
