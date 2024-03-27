package pack_hotel;

import java.time.LocalDate;

public class UsuarioCreacionDTO {

    private String email;
    private String password; // Incluido aquí por ser necesario para crear la cuenta
    private int rol; // Se puede incluir si se desea especificar el rol durante la creación
    private String primerNombre;
    private String segundoNombre;
    private String primerApellido;
    private String segundoApellido;
    private LocalDate fechaNacimiento;
    private String nacionalidad;
    private Long pasaporte;
    private String recaptchaToken;

    // Constructor sin argumentos
    public UsuarioCreacionDTO() {
    }

    // Constructor con todos los argumentos excepto el ID, que es generado automáticamente
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

    // Getters y setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getRol() {
        return rol;
    }

    public void setRol(int rol) {
        this.rol = rol;
    }

    public String getPrimerNombre() {
        return primerNombre;
    }

    public void setPrimerNombre(String primerNombre) {
        this.primerNombre = primerNombre;
    }
    
    public String getSegundoNombre() {
        return segundoNombre;
    }
    
    public void setSegundoNombre(String segundoNombre) {
        this.segundoNombre = segundoNombre;
    }
    
    public String getPrimerApellido() {
        return primerApellido;
    }
    
    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }
    
    public String getSegundoApellido() {
        return segundoApellido;
    }
    
    public void setSegundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
    }
    
    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }
    
    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }
    
    public String getNacionalidad() {
        return nacionalidad;
    }
    
    public void setNacionalidad(String nacionalidad) {
        this.nacionalidad = nacionalidad;
    }
    
    public Long getPasaporte() {
        return pasaporte;
    }
    
    public void setPasaporte(Long pasaporte) {
        this.pasaporte = pasaporte;
    }

    public String getRecaptchaToken() {
        return recaptchaToken;
    }
    
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