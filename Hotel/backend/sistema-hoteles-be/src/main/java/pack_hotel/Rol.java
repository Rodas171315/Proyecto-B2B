package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

/**
 * La clase {@code Rol} representa un rol de usuario en el sistema.
 * Cada rol tiene un tipo que define el conjunto de permisos asociados.
 */
@Entity
@Table(name = "ROLES") 
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "ID_ROL") 
    private Long idRol;

    @Column(name = "TIPO") 
    private String tipo;

    /**
     * Constructor sin argumentos necesario para JPA.
     */
    public Rol() {
    }

    /**
     * Constructor con argumentos para facilitar la creación de instancias.
     * @param idRol El identificador del rol.
     * @param tipo El tipo de rol.
     */
    public Rol(Long idRol, String tipo) {
        this.idRol = idRol;
        this.tipo = tipo;
    }

    /**
     * Obtiene el identificador único del rol.
     * @return El identificador del rol.
     */
    public Long getIdRol() {
        return idRol;
    }

    /**
     * Establece el identificador único del rol.
     * @param idRol El nuevo identificador del rol.
     */
    public void setIdRol(Long idRol) {
        this.idRol = idRol;
    }

    /**
     * Obtiene el tipo de rol.
     * @return El tipo de rol.
     */
    public String getTipo() {
        return tipo;
    }

    /**
     * Establece el tipo de rol.
     * @param tipo El nuevo tipo de rol.
     */
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