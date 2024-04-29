package pack_hotel;

/**
 * La clase DisponibilidadDTO representa la disponibilidad de una habitación o recurso en el sistema de gestión hotelera.
 */
public class DisponibilidadDTO {
    private boolean esDisponible;

    /**
     * Constructor para crear una instancia con un estado de disponibilidad específico.
     * @param esDisponible indica si la habitación o recurso está disponible o no.
     */
    public DisponibilidadDTO(boolean esDisponible) {
        this.esDisponible = esDisponible;
    }

    /**
     * Devuelve el estado de disponibilidad.
     * @return true si está disponible, false en caso contrario.
     */
    public boolean isEsDisponible() {
        return esDisponible;
    }

    /**
     * Establece el estado de disponibilidad.
     * @param esDisponible nuevo estado de disponibilidad, true si está disponible, false en caso contrario.
     */
    public void setEsDisponible(boolean esDisponible) {
        this.esDisponible = esDisponible;
    }
}
