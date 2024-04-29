package org.acme;

public class DisponibilidadDTO {
    private boolean esDisponible;

    
    public DisponibilidadDTO(boolean esDisponible) {
        this.esDisponible = esDisponible;
    }

    
    public boolean isEsDisponible() {
        return esDisponible;
    }

   
    public void setEsDisponible(boolean esDisponible) {
        this.esDisponible = esDisponible;
    }
}