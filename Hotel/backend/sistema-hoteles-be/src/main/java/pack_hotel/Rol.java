package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "ROLES") // Este nombre debe coincidir con el nombre de tu tabla en la base de datos.
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // o GenerationType.SEQUENCE, dependiendo de la configuración de tu DB.
    @Column(name = "ID_ROL") // Este nombre debe coincidir con el nombre de tu columna en la base de datos.
    private Long idRol;

    @Column(name = "TIPO") // Este nombre debe coincidir con el nombre de tu columna en la base de datos.
    private String tipo;

    // Constructor sin argumentos necesario para JPA
    public Rol() {
    }

    // Constructor con argumentos para facilitar la creación de instancias.
    public Rol(Long idRol, String tipo) {
        this.idRol = idRol;
        this.tipo = tipo;
    }

    // Getters y Setters
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

    // hashCode y equals basados en el ID del rol
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

    // toString para representar el objeto en forma de String
    @Override
    public String toString() {
        return "Rol [idRol=" + idRol + ", tipo=" + tipo + "]";
    }
}