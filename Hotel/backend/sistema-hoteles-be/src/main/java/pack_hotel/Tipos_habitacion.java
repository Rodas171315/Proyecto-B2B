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
public class Tipos_habitacion {
    
    @Id
    @GeneratedValue
    private Long id_tipo;
    
    private String tipo;

    public Long getId_tipo() {
        return id_tipo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setId_tipo(Long id_tipo) {
        this.id_tipo = id_tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 79 * hash + Objects.hashCode(this.id_tipo);
        hash = 79 * hash + Objects.hashCode(this.tipo);
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
        final Tipos_habitacion other = (Tipos_habitacion) obj;
        if (!Objects.equals(this.tipo, other.tipo)) {
            return false;
        }
        return Objects.equals(this.id_tipo, other.id_tipo);
    }

    @Override
    public String toString() {
        return "Tipos_habitacion{" + "id_tipo=" + id_tipo + ", tipo=" + tipo + '}';
    }
    
    
    
}
