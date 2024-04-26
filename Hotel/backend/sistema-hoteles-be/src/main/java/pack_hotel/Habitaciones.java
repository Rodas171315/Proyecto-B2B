package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.Objects;

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

    // Getters and setters
    public Long getId_habitacion() {
        return id_habitacion;
    }

    public void setId_habitacion(Long id_habitacion) {
        this.id_habitacion = id_habitacion;
    }

    public Long getId_hotel() {
        return id_hotel;
    }

    public void setId_hotel(Long id_hotel) {
        this.id_hotel = id_hotel;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public int getNumero_habitacion() {
        return numero_habitacion;
    }

    public void setNumero_habitacion(int numero_habitacion) {
        this.numero_habitacion = numero_habitacion;
    }

    public int getCapacidad_personas() {
        return capacidad_personas;
    }

    public void setCapacidad_personas(int capacidad_personas) {
        this.capacidad_personas = capacidad_personas;
    }

    public Integer getTipo_habitacion() { // Updated getter to use Integer
        return tipo_habitacion;
    }

    public void setTipo_habitacion(Integer tipo_habitacion) { // Updated setter to use Integer
        this.tipo_habitacion = tipo_habitacion;
    }

    public double getPrecioxpersona() {
        return precioxpersona;
    }

    public void setPrecioxpersona(double precioxpersona) {
        this.precioxpersona = precioxpersona;
    }

    public double getPrecioxnoche() {
        return precioxnoche;
    }

    public void setPrecioxnoche(double precioxnoche) {
        this.precioxnoche = precioxnoche;
    }

    public int getValuacion() {
        return valuacion;
    }

    public void setValuacion(int valuacion) {
        this.valuacion = valuacion;
    }

    public String getEstado() {
        return estado;
    }
    
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
