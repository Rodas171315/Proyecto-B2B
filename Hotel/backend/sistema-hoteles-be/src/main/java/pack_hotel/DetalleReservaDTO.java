package pack_hotel;

import java.time.LocalDate;

public class DetalleReservaDTO {

    private Long idReserva;
    private Long idHotel; // Campo añadido para almacenar el ID del hotel
    private Long idHabitacion; // Campo añadido, ya funciona con este
    private int numeroHabitacion; 
    private String nombreHotel;
    private String pais;
    private String ciudad;
    private String direccion;
    private Integer tipoHabitacion; // Cambiado de String a Integer
    private LocalDate fechaIngreso;
    private LocalDate fechaSalida;
    private Integer numeroNoches;
    private Integer codigoReserva;
    private Integer totalReserva;
    private String estadoReserva;
    private Integer capacidadPersonas;
    private Long idUsuario; 
    private String correoElectronico; 


    // Constructor vacío
    public DetalleReservaDTO() {
    }

    // Getters y setters
    public Long getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(Long idReserva) {
        this.idReserva = idReserva;
    }

    public Long getIdHotel() {
        return idHotel;
    }

    public void setIdHotel(Long idHotel) {
        this.idHotel = idHotel;
    }

    public String getNombreHotel() {
        return nombreHotel;
    }

    public void setNombreHotel(String nombreHotel) {
        this.nombreHotel = nombreHotel;
    }

    public int getNumeroHabitacion() {
        return numeroHabitacion;
    }
    
    public void setNumeroHabitacion(int numeroHabitacion) {
        this.numeroHabitacion = numeroHabitacion;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Integer getTipoHabitacion() {
        return tipoHabitacion;
    }

    public void setTipoHabitacion(Integer tipoHabitacion) {
        this.tipoHabitacion = tipoHabitacion;
    }

    public LocalDate getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public LocalDate getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(LocalDate fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public Integer getNumeroNoches() {
        return numeroNoches;
    }

    public void setNumeroNoches(Integer numeroNoches) {
        this.numeroNoches = numeroNoches;
    }

    public Integer getCodigoReserva() {
        return codigoReserva;
    }

    public void setCodigoReserva(Integer codigoReserva) {
        this.codigoReserva = codigoReserva;
    }

    public Integer getTotalReserva() {
        return totalReserva;
    }

    public void setTotalReserva(Integer totalReserva) {
        this.totalReserva = totalReserva;
    }

    public String getEstadoReserva() {
        return estadoReserva;
    }

    public void setEstadoReserva(String estadoReserva) {
        this.estadoReserva = estadoReserva;
    }


    public Integer getCapacidadPersonas() {
        return capacidadPersonas;
    }


    public void setCapacidadPersonas(Integer capacidadPersonas) {
        this.capacidadPersonas = capacidadPersonas;
    }


    public Long getIdHabitacion() {
        return idHabitacion;
    }

    public void setIdHabitacion(Long idHabitacion) {
        this.idHabitacion = idHabitacion;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }
}