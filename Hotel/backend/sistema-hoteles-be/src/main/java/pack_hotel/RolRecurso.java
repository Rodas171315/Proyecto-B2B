package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class RolRecurso {
    
    @Id
    private Long id;
    private String tipo; // This stores the role name.

    // Default constructor is required by JPA
    public RolRecurso() {
    }

    // Constructor with all fields
    public RolRecurso(Long id, String tipo) {
        this.id = id;
        this.tipo = tipo;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getTipo() {
        return tipo;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    // hashCode, equals, and toString methods
    @Override
    public int hashCode() {
        return Objects.hash(id, tipo);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RolRecurso rol = (RolRecurso) o;
        return Objects.equals(id, rol.id) &&
               Objects.equals(tipo, rol.tipo);
    }

    @Override
    public String toString() {
        return "Rol{" +
               "id=" + id +
               ", tipo='" + tipo + '\'' +
               '}';
    }
}
