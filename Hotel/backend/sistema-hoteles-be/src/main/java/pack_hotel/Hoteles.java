/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.time.LocalTime;
import java.util.Objects;

/**
 *
 * @author root
 */

@Entity
public class Hoteles {
    
    @Id
    @GeneratedValue
    private Long id_hotel;
    
    private Long id_cadena;
    
    private String nombre;
    
    private String pais;
    
    private String ciudad;
    
    private String direccion;
    
    private LocalTime checkin;
    
    private LocalTime checkout;

    private String imagenUrl;

    private String estado = "activo"; 


    public Long getId_hotel() {
        return id_hotel;
    }

    public Long getId_cadena() {
        return id_cadena;
    }

    public String getNombre() {
        return nombre;
    }

    public String getPais() {
        return pais;
    }

    public String getCiudad() {
        return ciudad;
    }

    public String getDireccion() {
        return direccion;
    }

    public LocalTime getCheckin() {
        return checkin;
    }

    public LocalTime getCheckout() {
        return checkout;
    }

    public void setId_hotel(Long id_hotel) {
        this.id_hotel = id_hotel;
    }

    public void setId_cadena(Long id_cadena) {
        this.id_cadena = id_cadena;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public void setCheckin(LocalTime checkin) {
        this.checkin = checkin;
    }

    public void setCheckout(LocalTime checkout) {
        this.checkout = checkout;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public String getEstado() {
        return estado;
    }
    
    public void setEstado(String estado) {
        this.estado = estado.toLowerCase();
    }
    
    

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 17 * hash + Objects.hashCode(this.id_hotel);
        hash = 17 * hash + Objects.hashCode(this.id_cadena);
        hash = 17 * hash + Objects.hashCode(this.nombre);
        hash = 17 * hash + Objects.hashCode(this.pais);
        hash = 17 * hash + Objects.hashCode(this.ciudad);
        hash = 17 * hash + Objects.hashCode(this.direccion);
        hash = 17 * hash + Objects.hashCode(this.checkin);
        hash = 17 * hash + Objects.hashCode(this.checkout);
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
        final Hoteles other = (Hoteles) obj;
        if (!Objects.equals(this.nombre, other.nombre)) {
            return false;
        }
        if (!Objects.equals(this.pais, other.pais)) {
            return false;
        }
        if (!Objects.equals(this.ciudad, other.ciudad)) {
            return false;
        }
        if (!Objects.equals(this.direccion, other.direccion)) {
            return false;
        }
        if (!Objects.equals(this.id_hotel, other.id_hotel)) {
            return false;
        }
        if (!Objects.equals(this.id_cadena, other.id_cadena)) {
            return false;
        }
        if (!Objects.equals(this.checkin, other.checkin)) {
            return false;
        }
        return Objects.equals(this.checkout, other.checkout);
    }

    @Override
    public String toString() {
        return "Hoteles{" + "id_hotel=" + id_hotel + ", id_cadena=" + id_cadena + ", nombre=" + nombre + ", pais=" + pais + ", ciudad=" + ciudad + ", direccion=" + direccion + ", checkin=" + checkin + ", checkout=" + checkout + '}';
    }
    
    
    
}
