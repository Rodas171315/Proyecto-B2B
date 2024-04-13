package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class VerificarDisponibilidadDTOTest {

    private VerificarDisponibilidadDTO verificarDisponibilidadDTO;

    @BeforeEach
    public void setUp() {
        verificarDisponibilidadDTO = new VerificarDisponibilidadDTO();
    }

    @Test
    public void testSetAndGetIdHabitacion() {
        Long idHabitacion = 1L;
        verificarDisponibilidadDTO.setIdHabitacion(idHabitacion);
        Assertions.assertEquals(idHabitacion, verificarDisponibilidadDTO.getIdHabitacion());
    }

    @Test
    public void testSetAndGetFechaIngreso() {
        String fechaIngreso = "2023-04-01";
        verificarDisponibilidadDTO.setFechaIngreso(fechaIngreso);
        Assertions.assertEquals(fechaIngreso, verificarDisponibilidadDTO.getFechaIngreso());
    }

    @Test
    public void testSetAndGetFechaSalida() {
        String fechaSalida = "2023-04-05";
        verificarDisponibilidadDTO.setFechaSalida(fechaSalida);
        Assertions.assertEquals(fechaSalida, verificarDisponibilidadDTO.getFechaSalida());
    }
}

