package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import java.util.Objects;

/**
 * La clase {@code Habitaciones} representa una habitación dentro de un hotel en el sistema de gestión hotelera.
 * Incluye detalles como la disponibilidad, el número de la habitación, la capacidad de personas, y precios.
 */
@Entity
@Table(name = "HABITACIONES")
public class Habitaciones {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "habitacion_seq_generator")
    @SequenceGenerator(name = "habitacion_seq_generator", sequenceName = "habitacion_seq", allocationSize = 1)
    private Long id_habitacion;
    
    private Long id_hotel;
    
    private boolean disponible;
    
    private int numero_habitacion;
    
    private int capacidad_personas;
    
    private Integer tipo_habitacion; 
    
    private double precioxpersona;
    
    private double precioxnoche;
    
    private int valuacion;
    
    private String estado = "activo"; 

    /**
     * Obtiene el ID de la habitación.
     * @return el ID de la habitación.
     */
    public Long getId_habitacion() {
        return id_habitacion;
    }

    /**
     * Establece el ID de la habitación.
     * @param id_habitacion el nuevo ID de la habitación.
     */
    public void setId_habitacion(Long id_habitacion) {
        this.id_habitacion = id_habitacion;
    }

    /**
     * Obtiene el ID del hotel al que pertenece la habitación.
     * @return el ID del hotel.
     */
    public Long getId_hotel() {
        return id_hotel;
    }

    /**
     * Establece el ID del hotel al que pertenece la habitación.
     * @param id_hotel el nuevo ID del hotel.
     */
    public void setId_hotel(Long id_hotel) {
        this.id_hotel = id_hotel;
    }

    /**
     * Verifica si la habitación está disponible.
     * @return verdadero si la habitación está disponible, falso si no lo está.
     */
    public boolean isDisponible() {
        return disponible;
    }

    /**
     * Establece la disponibilidad de la habitación.
     * @param disponible el estado de disponibilidad de la habitación.
     */
    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    /**
     * Obtiene el número de la habitación.
     * @return el número de la habitación.
     */
    public int getNumero_habitacion() {
        return numero_habitacion;
    }

    /**
     * Establece el número de la habitación.
     * @param numero_habitacion el nuevo número de la habitación.
     */
    public void setNumero_habitacion(int numero_habitacion) {
        this.numero_habitacion = numero_habitacion;
    }

    /**
     * Obtiene la capacidad máxima de personas para la habitación.
     * @return la capacidad de personas.
     */
    public int getCapacidad_personas() {
        return capacidad_personas;
    }

    /**
     * Establece la capacidad máxima de personas para la habitación.
     * @param capacidad_personas la nueva capacidad de personas.
     */
    public void setCapacidad_personas(int capacidad_personas) {
        this.capacidad_personas = capacidad_personas;
    }

    /**
     * Obtiene el tipo de habitación (puede ser un identificador para tipos definidos en otro lugar del sistema).
     * @return el tipo de habitación.
     */
    public Integer getTipo_habitacion() {
        return tipo_habitacion;
    }

    /**
     * Establece el tipo de habitación.
     * @param tipo_habitacion el nuevo tipo de habitación.
     */
    public void setTipo_habitacion(Integer tipo_habitacion) {
        this.tipo_habitacion = tipo_habitacion;
    }

    /**
     * Obtiene el precio por persona.
     * @return el precio por persona.
     */
    public double getPrecioxpersona() {
        return precioxpersona;
    }

    /**
     * Establece el precio por persona.
     * @param precioxpersona el nuevo precio por persona.
     */
    public void setPrecioxpersona(double precioxpersona) {
        this.precioxpersona = precioxpersona;
    }

    /**
     * Obtiene el precio por noche.
     * @return el precio por noche.
     */
    public double getPrecioxnoche() {
        return precioxnoche;
    }

    /**
     * Establece el precio por noche.
     * @param precioxnoche el nuevo precio por noche.
     */
    public void setPrecioxnoche(double precioxnoche) {
        this.precioxnoche = precioxnoche;
    }

    /**
     * Obtiene la valuación de la habitación, generalmente basada en la calidad o servicios ofrecidos.
     * @return la valuación de la habitación.
     */
    public int getValuacion() {
        return valuacion;
    }

    /**
     * Establece la valuación de la habitación.
     * @param valuacion la nueva valuación.
     */
    public void setValuacion(int valuacion) {
        this.valuacion = valuacion;
    }

    /**
     * Obtiene el estado actual de la habitación (por ejemplo, 'activo', 'en mantenimiento').
     * @return el estado de la habitación.
     */
    public String getEstado() {
        return estado;
    }

    /**
     * Establece el estado actual de la habitación.
     * @param estado el nuevo estado de la habitación.
     */
    public void setEstado(String estado) {
        this.estado = estado;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Habitaciones)) return false;
        Habitaciones other = (Habitaciones) obj;
        return Objects.equals(id_habitacion, other.id_habitacion)
                && Objects.equals(id_hotel, other.id_hotel)
                && disponible == other.disponible
                && numero_habitacion == other.numero_habitacion
                && capacidad_personas == other.capacidad_personas
                && Objects.equals(tipo_habitacion, other.tipo_habitacion)
                && Double.compare(precioxpersona, other.precioxpersona) == 0
                && Double.compare(precioxnoche, other.precioxnoche) == 0
                && valuacion == other.valuacion;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id_habitacion, id_hotel, disponible, numero_habitacion, capacidad_personas, tipo_habitacion, precioxpersona, precioxnoche, valuacion);
    }

    @Override
    public String toString() {
        return "Habitaciones{" +
                "id_habitacion=" + id_habitacion +
                ", id_hotel=" + id_hotel +
                ", disponible=" + disponible +
                ", numero_habitacion=" + numero_habitacion +
                ", capacidad_personas=" + capacidad_personas +
                ", tipo_habitacion=" + tipo_habitacion +
                ", precioxpersona=" + precioxpersona +
                ", precioxnoche=" + precioxnoche +
                ", valuacion=" + valuacion +
                '}';
    }
}
