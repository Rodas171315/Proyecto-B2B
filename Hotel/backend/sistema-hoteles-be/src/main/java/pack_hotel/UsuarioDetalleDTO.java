package pack_hotel;

import java.time.LocalDate;


/**
 * Clase que representa un DTO para detalles de usuarios en el sistema de un hotel.
 */
public class UsuarioDetalleDTO {

    private Long id;
    private String rolNombre;
    private String email;
    private String primerNombre;
    private String segundoNombre;
    private String primerApellido;
    private String segundoApellido;
    private LocalDate fechaNacimiento;
    private String nacionalidad;
    private Long pasaporte;

    /**
     * Constructor sin argumentos para crear una instancia vacía de UsuarioDetalleDTO.
     */
    public UsuarioDetalleDTO() {
    }

    /**
     * Constructor para crear una instancia de UsuarioDetalleDTO con los datos proporcionados.
     *
     * @param id El identificador del usuario.
     * @param rolNombre El nombre del rol del usuario.
     * @param email El correo electrónico del usuario.
     * @param primerNombre El primer nombre del usuario.
     * @param segundoNombre El segundo nombre del usuario.
     * @param primerApellido El primer apellido del usuario.
     * @param segundoApellido El segundo apellido del usuario.
     * @param fechaNacimiento La fecha de nacimiento del usuario.
     * @param nacionalidad La nacionalidad del usuario.
     * @param pasaporte El número de pasaporte del usuario.
     */
    public UsuarioDetalleDTO(Long id, String rolNombre, String email, String primerNombre, String segundoNombre,
                             String primerApellido, String segundoApellido, LocalDate fechaNacimiento, 
                             String nacionalidad, Long pasaporte) {
        this.id = id;
        this.rolNombre = rolNombre;
        this.email = email;
        this.primerNombre = primerNombre;
        this.segundoNombre = segundoNombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.fechaNacimiento = fechaNacimiento;
        this.nacionalidad = nacionalidad;
        this.pasaporte = pasaporte;
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
     * Obtiene el nombre del rol del usuario.
     * @return El nombre del rol del usuario.
     */
    public String getRolNombre() {
        return rolNombre;
    }

    /**
     * Establece el nombre del rol del usuario.
     * @param rolNombre El nombre del rol a establecer.
     */
    public void setRolNombre(String rolNombre) {
        this.rolNombre = rolNombre;
    }

    /**
     * Obtiene el correo electrónico del usuario.
     * @return El correo electrónico del usuario.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Establece el correo electrónico del usuario.
     * @param email El correo electrónico a establecer.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Obtiene el primer nombre del usuario.
     * @return El primer nombre del usuario.
     */
    public String getPrimerNombre() {
        return primerNombre;
    }

    /**
     * Establece el primer nombre del usuario.
     * @param primerNombre El primer nombre a establecer.
     */
    public void setPrimerNombre(String primerNombre) {
        this.primerNombre = primerNombre;
    }

    /**
     * Obtiene el segundo nombre del usuario.
     * @return El segundo nombre del usuario.
     */
    public String getSegundoNombre() {
        return segundoNombre;
    }

    /**
     * Establece el segundo nombre del usuario.
     * @param segundoNombre El segundo nombre a establecer.
     */
    public void setSegundoNombre(String segundoNombre) {
        this.segundoNombre = segundoNombre;
    }

    /**
     * Obtiene el primer apellido del usuario.
     * @return El primer apellido del usuario.
     */
    public String getPrimerApellido() {
        return primerApellido;
    }

    /**
     * Establece el primer apellido del usuario.
     * @param primerApellido El primer apellido a establecer.
     */
    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }

    /**
     * Obtiene el segundo apellido del usuario.
     * @return El segundo apellido del usuario.
     */
    public String getSegundoApellido() {
        return segundoApellido;
    }

    /**
     * Establece el segundo apellido del usuario.
     * @param segundoApellido El segundo apellido a establecer.
     */
    public void setSegundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
    }

    /**
     * Obtiene la fecha de nacimiento del usuario.
     * @return La fecha de nacimiento del usuario.
     */
    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    /**
     * Establece la fecha de nacimiento del usuario.
     * @param fechaNacimiento La fecha de nacimiento a establecer.
     */
    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    /**
     * Obtiene la nacionalidad del usuario.
     * @return La nacionalidad del usuario.
     */
    public String getNacionalidad() {
        return nacionalidad;
    }

    /**
     * Establece la nacionalidad del usuario.
     * @param nacionalidad La nacionalidad a establecer.
     */
    public void setNacionalidad(String nacionalidad) {
        this.nacionalidad = nacionalidad;
    }

    /**
     * Obtiene el número de pasaporte del usuario.
     * @return El número de pasaporte del usuario.
     */
    public Long getPasaporte() {
        return pasaporte;
    }

    /**
     * Establece el número de pasaporte del usuario.
     * @param pasaporte El número de pasaporte a establecer.
     */
    public void setPasaporte(Long pasaporte) {
        this.pasaporte = pasaporte;
    }

    @Override
    public String toString() {
        return "UsuarioDetalleDTO{" +
                "id=" + id +
                ", rolNombre='" + rolNombre + '\'' +
                ", email='" + email + '\'' +
                ", primerNombre='" + primerNombre + '\'' +
                ", segundoNombre='" + segundoNombre + '\'' +
                ", primerApellido='" + primerApellido + '\'' +
                ", segundoApellido='" + segundoApellido + '\'' +
                ", fechaNacimiento=" + fechaNacimiento +
                ", nacionalidad='" + nacionalidad + '\'' +
                ", pasaporte=" + pasaporte +
                '}';
    }
}
