/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.time.LocalDate;
import java.util.Objects;

/**
 *
 * @author root
 */

/**
 * Clase que representa la entidad de Usuarios en la base de datos del sistema de un hotel.
 * Incluye detalles personales y de identificación de los usuarios.
 */
@Entity
public class Usuarios {
    
    @Id
    @GeneratedValue
    private Long id;
    
    private int rol;
    
    private String email;
    
    private String password;
    
    private String primer_nombre;
    
    private String segundo_nombre;
    
    private String primer_apellido;
    
    private String segundo_apellido;
    
    private LocalDate fecha_nacimiento;
    
    private String nacionalidad;
    
    private Long pasaporte;

    /**
     * Obtiene el identificador del usuario.
     * @return El identificador único del usuario.
     */
    public Long getId() {
        return id;
    }
    
    /**
     * Obtiene el rol del usuario dentro del sistema.
     * @return El rol del usuario.
     */
    public int getRol() {
        return rol;
    }

    /**
     * Obtiene el correo electrónico del usuario.
     * @return El correo electrónico del usuario.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Obtiene la contraseña del usuario.
     * @return La contraseña del usuario.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Obtiene el primer nombre del usuario.
     * @return El primer nombre del usuario.
     */
    public String getPrimer_nombre() {
        return primer_nombre;
    }

    /**
     * Obtiene el segundo nombre del usuario.
     * @return El segundo nombre del usuario.
     */
    public String getSegundo_nombre() {
        return segundo_nombre;
    }

    /**
     * Obtiene el primer apellido del usuario.
     * @return El primer apellido del usuario.
     */
    public String getPrimer_apellido() {
        return primer_apellido;
    }

    /**
     * Obtiene el segundo apellido del usuario.
     * @return El segundo apellido del usuario.
     */
    public String getSegundo_apellido() {
        return segundo_apellido;
    }

    /**
     * Obtiene la fecha de nacimiento del usuario.
     * @return La fecha de nacimiento del usuario.
     */
    public LocalDate getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    /**
     * Obtiene la nacionalidad del usuario.
     * @return La nacionalidad del usuario.
     */
    public String getNacionalidad() {
        return nacionalidad;
    }

    /**
     * Obtiene el número de pasaporte del usuario.
     * @return El número de pasaporte del usuario.
     */
    public Long getPasaporte() {
        return pasaporte;
    }

    /**
     * Establece el identificador del usuario.
     * @param id El identificador único a establecer.
     */
    public void setId(Long id) {
        this.id = id;
    }
    
    /**
     * Establece el rol del usuario dentro del sistema.
     * @param rol El rol a establecer.
     */
    public void setRol(int rol) {
        this.rol = rol;
    }

    /**
     * Establece el correo electrónico del usuario.
     * @param email El correo electrónico a establecer.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Establece la contraseña del usuario.
     * @param password La contraseña a establecer.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Establece el primer nombre del usuario.
     * @param primer_nombre El primer nombre a establecer.
     */
    public void setPrimer_nombre(String primer_nombre) {
        this.primer_nombre = primer_nombre;
    }

    /**
     * Establece el segundo nombre del usuario.
     * @param segundo_nombre El segundo nombre a establecer.
     */
    public void setSegundo_nombre(String segundo_nombre) {
        this.segundo_nombre = segundo_nombre;
    }

    /**
     * Establece el primer apellido del usuario.
     * @param primer_apellido El primer apellido a establecer.
     */
    public void setPrimer_apellido(String primer_apellido) {
        this.primer_apellido = primer_apellido;
    }

    /**
     * Establece el segundo apellido del usuario.
     * @param segundo_apellido El segundo apellido a establecer.
     */
    public void setSegundo_apellido(String segundo_apellido) {
        this.segundo_apellido = segundo_apellido;
    }

    /**
     * Establece la fecha de nacimiento del usuario.
     * @param fecha_nacimiento La fecha de nacimiento a establecer.
     */
    public void setFecha_nacimiento(LocalDate fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }

    /**
     * Establece la nacionalidad del usuario.
     * @param nacionalidad La nacionalidad a establecer.
     */
    public void setNacionalidad(String nacionalidad) {
        this.nacionalidad = nacionalidad;
    }

    /**
     * Establece el número de pasaporte del usuario.
     * @param pasaporte El número de pasaporte a establecer.
     */
    public void setPasaporte(Long pasaporte) {
        this.pasaporte = pasaporte;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 47 * hash + this.rol;
        hash = 47 * hash + Objects.hashCode(this.email);
        hash = 47 * hash + Objects.hashCode(this.password);
        hash = 47 * hash + Objects.hashCode(this.primer_nombre);
        hash = 47 * hash + Objects.hashCode(this.segundo_nombre);
        hash = 47 * hash + Objects.hashCode(this.primer_apellido);
        hash = 47 * hash + Objects.hashCode(this.segundo_apellido);
        hash = 47 * hash + Objects.hashCode(this.fecha_nacimiento);
        hash = 47 * hash + Objects.hashCode(this.nacionalidad);
        hash = 47 * hash + Objects.hashCode(this.pasaporte);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Usuarios other = (Usuarios) obj;
        if (this.rol != other.rol) {
            return false;
        }
        if (!Objects.equals(this.email, other.email)) {
            return false;
        }
        if (!Objects.equals(this.password, other.password)) {
            return false;
        }
        if (!Objects.equals(this.primer_nombre, other.primer_nombre)) {
            return false;
        }
        if (!Objects.equals(this.segundo_nombre, other.segundo_nombre)) {
            return false;
        }
        if (!Objects.equals(this.primer_apellido, other.primer_apellido)) {
            return false;
        }
        if (!Objects.equals(this.segundo_apellido, other.segundo_apellido)) {
            return false;
        }
        if (!Objects.equals(this.nacionalidad, other.nacionalidad)) {
            return false;
        }
        if (!Objects.equals(this.fecha_nacimiento, other.fecha_nacimiento)) {
            return false;
        }
        return Objects.equals(this.pasaporte, other.pasaporte);
    }

    @Override
    public String toString() {
        return "Usuarios{" + "id=" + id + ", rol=" + rol + ", email=" + email + ", password=" + password + ", primer_nombre=" + primer_nombre + ", segundo_nombre=" + segundo_nombre + ", primer_apellido=" + primer_apellido + ", segundo_apellido=" + segundo_apellido + ", fecha_nacimiento=" + fecha_nacimiento + ", nacionalidad=" + nacionalidad + ", pasaporte=" + pasaporte + '}';
    }
    
    
    
}
