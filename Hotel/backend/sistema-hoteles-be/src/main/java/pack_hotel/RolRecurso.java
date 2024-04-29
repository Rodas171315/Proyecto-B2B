package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Objects;

/**
 * Entidad JPA que representa un rol dentro del sistema. Cada rol está asociado con un tipo específico
 * que define el conjunto de permisos o responsabilidades dentro de la aplicación.
 */
@Entity
public class RolRecurso {
    
    @Id
    private Long id;
    private String tipo; // This stores the role name.

    /**
     * Constructor por defecto requerido por JPA.
     */
    public RolRecurso() {
    }

    /**
     * Constructor con todos los campos inicializados, utilizado para crear nuevas instancias del rol.
     * @param id Identificador único del rol.
     * @param tipo Nombre del rol.
     */
    public RolRecurso(Long id, String tipo) {
        this.id = id;
        this.tipo = tipo;
    }

    // Getters
    /**
     * Devuelve el identificador único del rol.
     * @return el identificador del rol.
     */
    public Long getId() {
        return id;
    }

    /**
     * Devuelve el nombre del rol.
     * @return el nombre del rol.
     */
    public String getTipo() {
        return tipo;
    }

    // Setters
    /**
     * Establece el identificador único del rol.
     * @param id el nuevo identificador del rol.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Establece el nombre del rol.
     * @param tipo el nuevo nombre del rol.
     */
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    // hashCode, equals, and toString methods
        /**
     * Método generado para calcular el código hash de la instancia, basado en el identificador y el tipo de rol.
     * @return un valor hash calculado.
     */
    @Override
    public int hashCode() {
        return Objects.hash(id, tipo);
    }

        /**
     * Método para comparar esta instancia de RolRecurso con otro objeto para determinar la igualdad.
     * @param o el objeto con el que comparar.
     * @return true si ambos objetos son iguales, false en caso contrario.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RolRecurso rol = (RolRecurso) o;
        return Objects.equals(id, rol.id) &&
               Objects.equals(tipo, rol.tipo);
    }

        /**
     * Representación en forma de cadena de la instancia del rol, incluyendo su identificador y tipo.
     * @return una cadena que representa el objeto.
     */
    @Override
    public String toString() {
        return "Rol{" +
               "id=" + id +
               ", tipo='" + tipo + '\'' +
               '}';
    }
}
