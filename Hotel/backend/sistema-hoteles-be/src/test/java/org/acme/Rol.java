package org.acme;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity(name = "RolAcme")
@Table(name = "ROLES") 
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ROL") 
    private Long idRol;

    @Column(name = "TIPO") 
    private String tipo;

   
    public Rol() {
    }

    
    public Rol(Long idRol, String tipo) {
        this.idRol = idRol;
        this.tipo = tipo;
    }

    
    public Long getIdRol() {
        return idRol;
    }

    public void setIdRol(Long idRol) {
        this.idRol = idRol;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((idRol == null) ? 0 : idRol.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null) return false;
        if (getClass() != obj.getClass()) return false;
        Rol other = (Rol) obj;
        if (idRol == null) {
            if (other.idRol != null) return false;
        } else if (!idRol.equals(other.idRol)) return false;
        return true;
    }

    
    @Override
    public String toString() {
        return "Rol [idRol=" + idRol + ", tipo=" + tipo + "]";
    }
}
