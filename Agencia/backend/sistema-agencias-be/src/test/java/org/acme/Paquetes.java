package org.acme;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Paquetes")
public class Paquetes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Paquete")
    private Long idPaquete;

    @Column(name = "Nombre_Paquete", nullable = false, length = 255)
    private String nombrePaquete;

    @Column(name = "Descripcion", length = 500)
    private String descripcion;

    @Column(name = "ID_Hotel")
    private Long idHotel;

    @Column(name = "ID_Habitacion")
    private Long idHabitacion;

    @Column(name = "ID_Vuelo", length = 500)
    private String idVuelo;

    @Column(name = "estadoPaquete", nullable = false, length = 20)
    private String estadoPaquete;

    
    public Long getIdPaquete() {
        return idPaquete;
    }

    public String getNombrePaquete() {
        return nombrePaquete;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Long getIdHotel() {
        return idHotel;
    }

    public Long getIdHabitacion() {
        return idHabitacion;
    }

    public String getIdVuelo() {
        return idVuelo;
    }

    public String getEstadoPaquete() {
        return estadoPaquete;
    }

 
    public void setIdPaquete(Long idPaquete) {
        this.idPaquete = idPaquete;
    }

    public void setNombrePaquete(String nombrePaquete) {
        this.nombrePaquete = nombrePaquete;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setIdHotel(Long idHotel) {
        this.idHotel = idHotel;
    }

    public void setIdHabitacion(Long idHabitacion) {
        this.idHabitacion = idHabitacion;
    }

    public void setIdVuelo(String idVuelo) {
        this.idVuelo = idVuelo;
    }

    public void setEstadoPaquete(String estadoPaquete) {
        this.estadoPaquete = estadoPaquete;
    }
}
