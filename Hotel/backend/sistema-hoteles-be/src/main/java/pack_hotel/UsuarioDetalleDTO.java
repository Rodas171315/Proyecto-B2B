package pack_hotel;

import java.time.LocalDate;

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

    // Constructor sin argumentos
    public UsuarioDetalleDTO() {
    }

    // Constructor completo
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

    // Getters
    public Long getId() {
        return id;
    }

    public String getRolNombre() {
        return rolNombre;
    }

    public String getEmail() {
        return email;
    }

    public String getPrimerNombre() {
        return primerNombre;
    }

    public String getSegundoNombre() {
        return segundoNombre;
    }

    public String getPrimerApellido() {
        return primerApellido;
    }

    public String getSegundoApellido() {
        return segundoApellido;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public String getNacionalidad() {
        return nacionalidad;
    }

    public Long getPasaporte() {
        return pasaporte;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setRolNombre(String rolNombre) {
        this.rolNombre = rolNombre;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPrimerNombre(String primerNombre) {
        this.primerNombre = primerNombre;
    }

    public void setSegundoNombre(String segundoNombre) {
        this.segundoNombre = segundoNombre;
    }

    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }

    public void setSegundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public void setNacionalidad(String nacionalidad) {
        this.nacionalidad = nacionalidad;
    }

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
