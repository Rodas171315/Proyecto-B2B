package pack_hotel;

/**
 * Clase que representa un DTO (Data Transfer Object) para la edición de roles de usuarios en el sistema de un hotel.
 */
public class UsuarioEdicionDTO {

    private Long id;
    private Integer rol;

    /**
     * Constructor sin argumentos para crear una instancia vacía de UsuarioEdicionDTO.
     */
    public UsuarioEdicionDTO() {
    }

    /**
     * Constructor para crear una instancia de UsuarioEdicionDTO con los datos proporcionados.
     *
     * @param id El identificador del usuario.
     * @param rol El nuevo rol del usuario dentro del sistema.
     */
    public UsuarioEdicionDTO(Long id, Integer rol) {
        this.id = id;
        this.rol = rol;
    }

    /**
     * Obtiene el identificador del usuario.
     * @return El identificador del usuario.
     */
    public Long getId() {
        return id;
    }

    /**
     * Establece el identificador del usuario.
     * @param id El identificador a establecer.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Obtiene el rol del usuario dentro del sistema.
     * @return El rol del usuario.
     */
    public Integer getRol() {
        return rol;
    }

    /**
     * Establece el rol del usuario dentro del sistema.
     * @param rol El rol a establecer.
     */
    public void setRol(Integer rol) {
        this.rol = rol;
    }


    @Override
    public String toString() {
        return "UsuarioEdicionDTO{" +
                "id=" + id +
                ", rol=" + rol +
                '}';
    }
}
