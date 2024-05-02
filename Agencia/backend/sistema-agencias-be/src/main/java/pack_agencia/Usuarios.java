/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pack_agencia;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.time.LocalDate;
import java.util.Objects;

/**
 * Clase Usuarios que representa a un usuario en el sistema de una agencia de viajes.
 * Almacena información relevante como nombres, apellidos, fechas importantes, y datos de identificación.
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
     * Obtiene el ID del usuario.
     * @return el ID del usuario.
     */
    public Long getId() {
        return id;
    }

    /**
     * Establece el ID del usuario.
     * @param id el nuevo ID del usuario.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Obtiene el rol del usuario dentro del sistema.
     * @return el rol del usuario.
     */
    public int getRol() {
        return rol;
    }

    /**
     * Establece el rol del usuario dentro del sistema.
     * @param rol el nuevo rol del usuario.
     */
    public void setRol(int rol) {
        this.rol = rol;
    }

    /**
     * Obtiene el correo electrónico del usuario.
     * @return el correo electrónico del usuario.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Establece el correo electrónico del usuario.
     * @param email el nuevo correo electrónico del usuario.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Obtiene la contraseña del usuario.
     * @return la contraseña del usuario.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Establece la contraseña del usuario.
     * @param password la nueva contraseña del usuario.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Obtiene el primer nombre del usuario.
     * @return el primer nombre del usuario.
     */
    public String getPrimer_nombre() {
        return primer_nombre;
    }

    /**
     * Establece el primer nombre del usuario.
     * @param primer_nombre el nuevo primer nombre del usuario.
     */
    public void setPrimer_nombre(String primer_nombre) {
        this.primer_nombre = primer_nombre;
    }

    /**
     * Obtiene el segundo nombre del usuario.
     * @return el segundo nombre del usuario.
     */
    public String getSegundo_nombre() {
        return segundo_nombre;
    }

    /**
     * Establece el segundo nombre del usuario.
     * @param segundo_nombre el nuevo segundo nombre del usuario.
     */
    public void setSegundo_nombre(String segundo_nombre) {
        this.segundo_nombre = segundo_nombre;
    }

    /**
     * Obtiene el primer apellido del usuario.
     * @return el primer apellido del usuario.
     */
    public String getPrimer_apellido() {
        return primer_apellido;
    }

    /**
     * Establece el primer apellido del usuario.
     * @param primer_apellido el nuevo primer apellido del usuario.
     */
    public void setPrimer_apellido(String primer_apellido) {
        this.primer_apellido = primer_apellido;
    }

    /**
     * Obtiene el segundo apellido del usuario.
     * @return el segundo apellido del usuario.
     */
    public String getSegundo_apellido() {
        return segundo_apellido;
    }

    /**
     * Establece el segundo apellido del usuario.
     * @param segundo_apellido el nuevo segundo apellido del usuario.
     */
    public void setSegundo_apellido(String segundo_apellido) {
        this.segundo_apellido = segundo_apellido;
    }

    /**
     * Obtiene la fecha de nacimiento del usuario.
     * @return la fecha de nacimiento del usuario.
     */
    public LocalDate getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    /**
     * Establece la fecha de nacimiento del usuario.
     * @param fecha_nacimiento la nueva fecha de nacimiento del usuario.
     */
    public void setFecha_nacimiento(LocalDate fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }

    /**
     * Obtiene la nacionalidad del usuario.
     * @return la nacionalidad del usuario.
     */
    public String getNacionalidad() {
        return nacionalidad;
    }

    /**
     * Establece la nacionalidad del usuario.
     * @param nacionalidad la nueva nacionalidad del usuario.
     */
    public void setNacionalidad(String nacionalidad) {
        this.nacionalidad = nacionalidad;
    }

    /**
     * Obtiene el número de pasaporte del usuario.
     * @return el número de pasaporte del usuario.
     */
    public Long getPasaporte() {
        return pasaporte;
    }

    /**
     * Establece el número de pasaporte del usuario.
     * @param pasaporte el nuevo número de pasaporte del usuario.
     */
    public void setPasaporte(Long pasaporte) {
        this.pasaporte = pasaporte;
    }


    @Override
    public int hashCode() {
        int hash = 3;
        hash = 23 * hash + Objects.hashCode(this.id);
        hash = 23 * hash + this.rol;
        hash = 23 * hash + Objects.hashCode(this.email);
        hash = 23 * hash + Objects.hashCode(this.password);
        hash = 23 * hash + Objects.hashCode(this.primer_nombre);
        hash = 23 * hash + Objects.hashCode(this.segundo_nombre);
        hash = 23 * hash + Objects.hashCode(this.primer_apellido);
        hash = 23 * hash + Objects.hashCode(this.segundo_apellido);
        hash = 23 * hash + Objects.hashCode(this.fecha_nacimiento);
        hash = 23 * hash + Objects.hashCode(this.nacionalidad);
        hash = 23 * hash + Objects.hashCode(this.pasaporte);
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
        if (!Objects.equals(this.pasaporte, other.pasaporte)) {
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
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return Objects.equals(this.fecha_nacimiento, other.fecha_nacimiento);
    }

    @Override
    public String toString() {
        return "Usuarios{" + "id=" + id + ", role=" + rol + ", email=" + email + ", password=" + password + ", primer_nombre=" + primer_nombre + ", segundo_nombre=" + segundo_nombre + ", primer_apellido=" + primer_apellido + ", segundo_apellido=" + segundo_apellido + ", fecha_nacimiento=" + fecha_nacimiento + ", nacionalidad=" + nacionalidad + ", pasaporte=" + pasaporte + '}';
    }
    
    
    
}
