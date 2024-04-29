package pack_hotel;

public class DisponibilidadDTO {
    private boolean esDisponible;

    // Constructor
    public DisponibilidadDTO(boolean esDisponible) {
        this.esDisponible = esDisponible;
    }

    // Getter
    public boolean isEsDisponible() {
        return esDisponible;
    }

    // Setter
    public void setEsDisponible(boolean esDisponible) {
        this.esDisponible = esDisponible;
    }
}