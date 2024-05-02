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
 * La clase {@code Hoteles} representa a un hotel dentro del sistema de gestión hotelera.
 * Incluye información como pertenencia a una cadena de hoteles, nombre, ubicación y horarios de check-in y check-out.
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

    /**
     * Obtiene el ID del hotel.
     * @return el ID del hotel.
     */
    public Long getId_hotel() {
        return id_hotel;
    }

    /**
     * Obtiene el ID de la cadena de hoteles a la que pertenece el hotel.
     * @return el ID de la cadena.
     */
    public Long getId_cadena() {
        return id_cadena;
    }

    /**
     * Obtiene el nombre del hotel.
     * @return el nombre del hotel.
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Obtiene el país donde se encuentra el hotel.
     * @return el país del hotel.
     */
    public String getPais() {
        return pais;
    }

    /**
     * Obtiene la ciudad donde se encuentra el hotel.
     * @return la ciudad del hotel.
     */
    public String getCiudad() {
        return ciudad;
    }

    /**
     * Obtiene la dirección del hotel.
     * @return la dirección del hotel.
     */
    public String getDireccion() {
        return direccion;
    }

    /**
     * Obtiene la hora de check-in del hotel.
     * @return la hora de check-in.
     */
    public LocalTime getCheckin() {
        return checkin;
    }

    /**
     * Obtiene la hora de check-out del hotel.
     * @return la hora de check-out.
     */
    public LocalTime getCheckout() {
        return checkout;
    }

    /**
     * Establece el ID del hotel.
     * @param id_hotel el nuevo ID del hotel.
     */
    public void setId_hotel(Long id_hotel) {
        this.id_hotel = id_hotel;
    }

    /**
     * Establece el ID de la cadena de hoteles a la que pertenece el hotel.
     * @param id_cadena el nuevo ID de la cadena.
     */
    public void setId_cadena(Long id_cadena) {
        this.id_cadena = id_cadena;
    }

    /**
     * Establece el nombre del hotel.
     * @param nombre el nuevo nombre del hotel.
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Establece el país donde se encuentra el hotel.
     * @param pais el nuevo país del hotel.
     */
    public void setPais(String pais) {
        this.pais = pais;
    }

    /**
     * Establece la ciudad donde se encuentra el hotel.
     * @param ciudad la nueva ciudad del hotel.
     */
    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    /**
     * Establece la dirección del hotel.
     * @param direccion la nueva dirección del hotel.
     */
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    /**
     * Establece la hora de check-in del hotel.
     * @param checkin la nueva hora de check-in.
     */
    public void setCheckin(LocalTime checkin) {
        this.checkin = checkin;
    }

    /**
     * Establece la hora de check-out del hotel.
     * @param checkout la nueva hora de check-out.
     */
    public void setCheckout(LocalTime checkout) {
        this.checkout = checkout;
    }

    /**
     * Obtiene la URL de la imagen representativa del hotel.
     * @return la URL de la imagen.
     */
    public String getImagenUrl() {
        return imagenUrl;
    }

    /**
     * Establece la URL de la imagen representativa del hotel.
     * @param imagenUrl la nueva URL de la imagen.
     */
    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    /**
     * Obtiene el estado actual del hotel (por ejemplo, 'activo' o 'inactivo').
     * @return el estado del hotel.
     */
    public String getEstado() {
        return estado;
    }
    
    /**
     * Establece el estado actual del hotel.
     * @param estado el nuevo estado del hotel (activo o inactivo).
     */
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
