package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;

public class ReservasTest {

    private Reservas reserva;

    @BeforeEach
    public void setUp() {
        reserva = new Reservas();
    }

    @Test
    public void testSetAndGetIdReserva() {
        Long idReserva = 1L;
        reserva.setIdReserva(idReserva);
        Assertions.assertEquals(idReserva, reserva.getIdReserva());
    }

    @Test
    public void testSetAndGetIdHotel() {
        Long idHotel = 2L;
        reserva.setIdHotel(idHotel);
        Assertions.assertEquals(idHotel, reserva.getIdHotel());
    }

    @Test
    public void testSetAndGetIdHabitacion() {
        Long idHabitacion = 3L;
        reserva.setIdHabitacion(idHabitacion);
        Assertions.assertEquals(idHabitacion, reserva.getIdHabitacion());
    }

    @Test
    public void testSetAndGetIdUsuario() {
        Long idUsuario = 4L;
        reserva.setIdUsuario(idUsuario);
        Assertions.assertEquals(idUsuario, reserva.getIdUsuario());
    }

    @Test
    public void testSetAndGetCodigoReserva() {
        Integer codigoReserva = 12345;
        reserva.setCodigoReserva(codigoReserva);
        Assertions.assertEquals(codigoReserva, reserva.getCodigoReserva());
    }

    @Test
    public void testSetAndGetPersonasReserva() {
        Integer personasReserva = 2;
        reserva.setPersonasReserva(personasReserva);
        Assertions.assertEquals(personasReserva, reserva.getPersonasReserva());
    }

    @Test
    public void testSetAndGetFechaIngreso() {
        LocalDate fechaIngreso = LocalDate.of(2023, 10, 1);
        reserva.setFechaIngreso(fechaIngreso);
        Assertions.assertEquals(fechaIngreso, reserva.getFechaIngreso());
    }

    @Test
    public void testSetAndGetFechaSalida() {
        LocalDate fechaSalida = LocalDate.of(2023, 10, 5);
        reserva.setFechaSalida(fechaSalida);
        Assertions.assertEquals(fechaSalida, reserva.getFechaSalida());
    }

    @Test
    public void testSetAndGetTotalReserva() {
        Integer totalReserva = 1000;
        reserva.setTotalReserva(totalReserva);
        Assertions.assertEquals(totalReserva, reserva.getTotalReserva());
    }

    @Test
    public void testSetAndGetEstadoReserva() {
        String estadoReserva = "Confirmada";
        reserva.setEstadoReserva(estadoReserva);
        Assertions.assertEquals(estadoReserva, reserva.getEstadoReserva());
    }

    @Test
    public void testSetAndGetTipoHabitacion() {
        Integer tipoHabitacion = 1;
        reserva.setTipoHabitacion(tipoHabitacion);
        Assertions.assertEquals(tipoHabitacion, reserva.getTipoHabitacion());
    }
}

