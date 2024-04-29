package pack_hotel;

import java.time.LocalDate;

/**
 * Clase que representa un DTO para la creación de usuarios en el sistema de un hotel.
 */
public class UsuarioCreacionDTO {

    private String email;
    private String password;
    private int rol;
    private String primerNombre;
    private String segundoNombre;
    private String primerApellido;
    private String segundoApellido;
    private LocalDate fechaNacimiento;
    private String nacionalidad;
    private Long pasaporte;
    private String recaptchaToken;

    /**
     * Constructor sin argumentos para crear una instancia vacía de UsuarioCreacionDTO.
     */
    public UsuarioCreacionDTO() {
    }

    /**
     * Constructor para crear una instancia de UsuarioCreacionDTO con los datos proporcionados.
     *
     * @param email            El correo electrónico del usuario.
     * @param password         La contraseña del usuario.
     * @param rol              El rol del usuario dentro del sistema.
     * @param primerNombre     El primer nombre del usuario.
     * @param segundoNombre    El segundo nombre del usuario.
     * @param primerApellido   El primer apellido del usuario.
     * @param segundoApellido  El segundo apellido del usuario.
     * @param fechaNacimiento  La fecha de nacimiento del usuario.
     * @param nacionalidad     La nacionalidad del usuario.
     * @param pasaporte        El número de pasaporte del usuario.
     */
    public UsuarioCreacionDTO(String email, String password, int rol, String primerNombre, String segundoNombre,
                              String primerApellido, String segundoApellido, LocalDate fechaNacimiento,
                              String nacionalidad, Long pasaporte) {
        this.email = email;
        this.password = password;
        this.rol = rol;
        this.primerNombre = primerNombre;
        this.segundoNombre = segundoNombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.fechaNacimiento = fechaNacimiento;
        this.nacionalidad = nacionalidad;
        this.pasaporte = pasaporte;
    }

    // Getters y setters documentados:

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
     * Obtiene la contraseña del usuario.
     * @return La contraseña del usuario.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Establece la contraseña del usuario.
     * @param password La contraseña a establecer.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Obtiene el rol del usuario dentro del sistema.
     * @return El rol del usuario.
     */
    public int getRol() {
        return rol;
    }

    /**
     * Establece el rol del usuario dentro del sistema.
     * @param rol El rol a establecer.
     */
    public void setRol(int rol) {
        this.rol = rol;
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

    /**
     * Obtiene el token de reCAPTCHA del usuario.
     * @return El token de reCAPTCHA.
     */
    public String getRecaptchaToken() {
        return recaptchaToken;
    }

    /**
     * Establece el token de reCAPTCHA del usuario.
     * @param recaptchaToken El token de reCAPTCHA a establecer.
     */
    public void setRecaptchaToken(String recaptchaToken) {
        this.recaptchaToken = recaptchaToken;
    }

    
    @Override
    public String toString() {
        return "UsuarioCreacionDTO{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", rol=" + rol +
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