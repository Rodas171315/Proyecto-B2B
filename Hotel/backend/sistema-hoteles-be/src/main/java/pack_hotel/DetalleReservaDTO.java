package pack_hotel;

import java.time.LocalDate;

/**
 * Clase DTO para almacenar detalles de una reserva de hotel. Esta clase facilita la transferencia
 * de datos entre la interfaz de usuario y el servidor, encapsulando los detalles de la reserva en una forma más manejable.
 */
public class DetalleReservaDTO {

    private Long idReserva;
    private Long idHotel;
    private Long idHabitacion;
    private int numeroHabitacion;
    private String nombreHotel;
    private String pais;
    private String ciudad;
    private String direccion;
    private Integer tipoHabitacion;
    private LocalDate fechaIngreso;
    private LocalDate fechaSalida;
    private Integer numeroNoches;
    private Integer codigoReserva;
    private Integer totalReserva;
    private String estadoReserva;
    private Integer capacidadPersonas;
    private Long idUsuario;
    private String correoElectronico;

    /**
     * Constructor sin argumentos para uso en frameworks que requieren un constructor por defecto.
     */
    public DetalleReservaDTO() {}

    /**
     * Obtiene el ID de la reserva.
     * @return ID de la reserva.
     */
    public Long getIdReserva() {
        return idReserva;
    }

    /**
     * Establece el ID de la reserva.
     * @param idReserva ID de la reserva.
     */
    public void setIdReserva(Long idReserva) {
        this.idReserva = idReserva;
    }

    /**
     * Obtiene el ID del hotel asociado a la reserva.
     * @return ID del hotel.
     */
    public Long getIdHotel() {
        return idHotel;
    }

    /**
     * Establece el ID del hotel asociado a la reserva.
     * @param idHotel ID del hotel.
     */
    public void setIdHotel(Long idHotel) {
        this.idHotel = idHotel;
    }

    /**
     * Obtiene el ID de la habitación reservada.
     * @return ID de la habitación.
     */
    public Long getIdHabitacion() {
        return idHabitacion;
    }

    /**
     * Establece el ID de la habitación reservada.
     * @param idHabitacion ID de la habitación.
     */
    public void setIdHabitacion(Long idHabitacion) {
        this.idHabitacion = idHabitacion;
    }

    /**
     * Obtiene el número de la habitación reservada.
     * @return Número de la habitación.
     */
    public int getNumeroHabitacion() {
        return numeroHabitacion;
    }

    /**
     * Establece el número de la habitación reservada.
     * @param numeroHabitacion Número de la habitación.
     */
    public void setNumeroHabitacion(int numeroHabitacion) {
        this.numeroHabitacion = numeroHabitacion;
    }

    /**
     * Obtiene el nombre del hotel.
     * @return Nombre del hotel.
     */
    public String getNombreHotel() {
        return nombreHotel;
    }

    /**
     * Establece el nombre del hotel.
     * @param nombreHotel Nombre del hotel.
     */
    public void setNombreHotel(String nombreHotel) {
        this.nombreHotel = nombreHotel;
    }

    /**
     * Obtiene el país donde se encuentra el hotel.
     * @return País del hotel.
     */
    public String getPais() {
        return pais;
    }

    /**
     * Establece el país donde se encuentra el hotel.
     * @param pais País del hotel.
     */
    public void setPais(String pais) {
        this.pais = pais;
    }

    /**
     * Obtiene la ciudad donde se encuentra el hotel.
     * @return Ciudad del hotel.
     */
    public String getCiudad() {
        return ciudad;
    }

    /**
     * Establece la ciudad donde se encuentra el hotel.
     * @param ciudad Ciudad del hotel.
     */
    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    /**
     * Obtiene la dirección del hotel.
     * @return Dirección del hotel.
     */
    public String getDireccion() {
        return direccion;
    }

    /**
     * Establece la dirección del hotel.
     * @param direccion Dirección del hotel.
     */
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    /**
     * Obtiene el tipo de habitación reservada.
     * @return Tipo de habitación.
     */
    public Integer getTipoHabitacion() {
        return tipoHabitacion;
    }

    /**
     * Establece el tipo de habitación reservada.
     * @param tipoHabitacion Tipo de habitación.
     */
    public void setTipoHabitacion(Integer tipoHabitacion) {
        this.tipoHabitacion = tipoHabitacion;
    }

    /**
     * Obtiene la fecha de ingreso a la habitación.
     * @return Fecha de ingreso.
     */
    public LocalDate getFechaIngreso() {
        return fechaIngreso;
    }

    /**
     * Establece la fecha de ingreso a la habitación.
     * @param fechaIngreso Fecha de ingreso.
     */
    public void setFechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    /**
     * Obtiene la fecha de salida de la habitación.
     * @return Fecha de salida.
     */
    public LocalDate getFechaSalida() {
        return fechaSalida;
    }

    /**
     * Establece la fecha de salida de la habitación.
     * @param fechaSalida Fecha de salida.
     */
    public void setFechaSalida(LocalDate fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    /**
     * Obtiene el número de noches de la reserva.
     * @return Número de noches.
     */
    public Integer getNumeroNoches() {
        return numeroNoches;
    }

    /**
     * Establece el número de noches de la reserva.
     * @param numeroNoches Número de noches.
     */
    public void setNumeroNoches(Integer numeroNoches) {
        this.numeroNoches = numeroNoches;
    }

    /**
     * Obtiene el código de la reserva.
     * @return Código de la reserva.
     */
    public Integer getCodigoReserva() {
        return codigoReserva;
    }

    /**
     * Establece el código de la reserva.
     * @param codigoReserva Código de la reserva.
     */
    public void setCodigoReserva(Integer codigoReserva) {
        this.codigoReserva = codigoReserva;
    }

    /**
     * Obtiene el total de la reserva.
     * @return Total de la reserva.
     */
    public Integer getTotalReserva() {
        return totalReserva;
    }

    /**
     * Establece el total de la reserva.
     * @param totalReserva Total de la reserva.
     */
    public void setTotalReserva(Integer totalReserva) {
        this.totalReserva = totalReserva;
    }

    /**
     * Obtiene el estado de la reserva.
     * @return Estado de la reserva.
     */
    public String getEstadoReserva() {
        return estadoReserva;
    }

    /**
     * Establece el estado de la reserva.
     * @param estadoReserva Estado de la reserva.
     */
    public void setEstadoReserva(String estadoReserva) {
        this.estadoReserva = estadoReserva;
    }

    /**
     * Obtiene la capacidad máxima de personas para la habitación reservada.
     * @return Capacidad máxima de personas.
     */
    public Integer getCapacidadPersonas() {
        return capacidadPersonas;
    }

    /**
     * Establece la capacidad máxima de personas para la habitación reservada.
     * @param capacidadPersonas Capacidad máxima de personas.
     */
    public void setCapacidadPersonas(Integer capacidadPersonas) {
        this.capacidadPersonas = capacidadPersonas;
    }

    /**
     * Obtiene el ID del usuario que realizó la reserva.
     * @return ID del usuario.
     */
    public Long getIdUsuario() {
        return idUsuario;
    }

    /**
     * Establece el ID del usuario que realizó la reserva.
     * @param idUsuario ID del usuario.
     */
    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    /**
     * Obtiene el correo electrónico del usuario que realizó la reserva.
     * @return Correo electrónico del usuario.
     */
    public String getCorreoElectronico() {
        return correoElectronico;
    }

    /**
     * Establece el correo electrónico del usuario que realizó la reserva.
     * @param correoElectronico Correo electrónico del usuario.
     */
    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }
}
