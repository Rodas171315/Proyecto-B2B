/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.util.Objects;

/**
 *
 * @author root
 */

@Entity
public class Habitaciones {
    
    @Id
    @GeneratedValue
    private Long id_habitacion;
    
    private Long id_hotel;
    
    private boolean disponible;
    
    private int numero_habitacion;
    
    private int capacidad_personas;
    
    private int tipo_habitacion;
    
    private double precioxpersona;
    
    private double precioxnoche;
    
    private int valuacion;

    public Long getId_habitacion() {
        return id_habitacion;
    }

    public Long getId_hotel() {
        return id_hotel;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public int getNumero_habitacion() {
        return numero_habitacion;
    }

    public int getCapacidad_personas() {
        return capacidad_personas;
    }

    public int getTipo_habitacion() {
        return tipo_habitacion;
    }

    public double getPrecioxpersona() {
        return precioxpersona;
    }

    public double getPrecioxnoche() {
        return precioxnoche;
    }

    public int getValuacion() {
        return valuacion;
    }

    public void setId_habitacion(Long id_habitacion) {
        this.id_habitacion = id_habitacion;
    }

    public void setId_hotel(Long id_hotel) {
        this.id_hotel = id_hotel;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public void setNumero_habitacion(int numero_habitacion) {
        this.numero_habitacion = numero_habitacion;
    }

    public void setCapacidad_personas(int capacidad_personas) {
        this.capacidad_personas = capacidad_personas;
    }

    public void setTipo_habitacion(int tipo_habitacion) {
        this.tipo_habitacion = tipo_habitacion;
    }

    public void setPrecioxpersona(double precioxpersona) {
        this.precioxpersona = precioxpersona;
    }

    public void setPrecioxnoche(double precioxnoche) {
        this.precioxnoche = precioxnoche;
    }

    public void setValuacion(int valuacion) {
        this.valuacion = valuacion;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 89 * hash + Objects.hashCode(this.id_habitacion);
        hash = 89 * hash + Objects.hashCode(this.id_hotel);
        hash = 89 * hash + (this.disponible ? 1 : 0);
        hash = 89 * hash + this.numero_habitacion;
        hash = 89 * hash + this.capacidad_personas;
        hash = 89 * hash + this.tipo_habitacion;
        hash = 89 * hash + (int) (Double.doubleToLongBits(this.precioxpersona) ^ (Double.doubleToLongBits(this.precioxpersona) >>> 32));
        hash = 89 * hash + (int) (Double.doubleToLongBits(this.precioxnoche) ^ (Double.doubleToLongBits(this.precioxnoche) >>> 32));
        hash = 89 * hash + this.valuacion;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Habitaciones other = (Habitaciones) obj;
        if (this.disponible != other.disponible) {
            return false;
        }
        if (this.numero_habitacion != other.numero_habitacion) {
            return false;
        }
        if (this.capacidad_personas != other.capacidad_personas) {
            return false;
        }
        if (this.tipo_habitacion != other.tipo_habitacion) {
            return false;
        }
        if (Double.doubleToLongBits(this.precioxpersona) != Double.doubleToLongBits(other.precioxpersona)) {
            return false;
        }
        if (Double.doubleToLongBits(this.precioxnoche) != Double.doubleToLongBits(other.precioxnoche)) {
            return false;
        }
        if (this.valuacion != other.valuacion) {
            return false;
        }
        if (!Objects.equals(this.id_habitacion, other.id_habitacion)) {
            return false;
        }
        return Objects.equals(this.id_hotel, other.id_hotel);
    }

    @Override
    public String toString() {
        return "Habitaciones{" + "id_habitacion=" + id_habitacion + ", id_hotel=" + id_hotel + ", disponible=" + disponible + ", numero_habitacion=" + numero_habitacion + ", capacidad_personas=" + capacidad_personas + ", tipo_habitacion=" + tipo_habitacion + ", precioxpersona=" + precioxpersona + ", precioxnoche=" + precioxnoche + ", valuacion=" + valuacion + '}';
    }
    
    
    
}
