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

    public Long getId() {
        return id;
    }
    
    public int getRol() {
        return rol;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getPrimer_nombre() {
        return primer_nombre;
    }

    public String getSegundo_nombre() {
        return segundo_nombre;
    }

    public String getPrimer_apellido() {
        return primer_apellido;
    }

    public String getSegundo_apellido() {
        return segundo_apellido;
    }

    public LocalDate getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    public String getNacionalidad() {
        return nacionalidad;
    }

    public Long getPasaporte() {
        return pasaporte;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public void setRol(int rol) {
        this.rol = rol;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPrimer_nombre(String primer_nombre) {
        this.primer_nombre = primer_nombre;
    }

    public void setSegundo_nombre(String segundo_nombre) {
        this.segundo_nombre = segundo_nombre;
    }

    public void setPrimer_apellido(String primer_apellido) {
        this.primer_apellido = primer_apellido;
    }

    public void setSegundo_apellido(String segundo_apellido) {
        this.segundo_apellido = segundo_apellido;
    }

    public void setFecha_nacimiento(LocalDate fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }

    public void setNacionalidad(String nacionalidad) {
        this.nacionalidad = nacionalidad;
    }

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
