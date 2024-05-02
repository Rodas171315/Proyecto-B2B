package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class DisponibilidadDTOTest {

    @Test
    public void testSetAndGetEsDisponible() {
        DisponibilidadDTO disponibilidadDTO = new DisponibilidadDTO(false);
        
        Assertions.assertFalse(disponibilidadDTO.isEsDisponible());

        
        disponibilidadDTO.setEsDisponible(true);
        Assertions.assertTrue(disponibilidadDTO.isEsDisponible());
    }
}

