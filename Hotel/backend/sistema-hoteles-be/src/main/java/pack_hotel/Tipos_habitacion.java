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

    public void setId_tipo(Long id_tipo) {
        this.id_tipo = id_tipo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Tipos_habitacion that = (Tipos_habitacion) obj;
        return Objects.equals(id_tipo, that.id_tipo) &&
               Objects.equals(tipo, that.tipo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id_tipo, tipo);
    }

    @Override
    public String toString() {
        return "Tipos_habitacion{" +
               "id_tipo=" + id_tipo +
               ", tipo='" + tipo + '\'' +
               '}';
    }
}