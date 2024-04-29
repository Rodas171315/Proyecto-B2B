package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.Objects;

/**
 * La clase {@code Reservas} representa una reserva de habitación en un hotel.
 * Incluye información detallada sobre el hotel, la habitación, el usuario que realiza la reserva,
 * las fechas de ingreso y salida, y otros detalles pertinentes de la reserva.
 */
@Entity
@Table(name = "RESERVAS")
public class Reservas {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reserva_seq_generator")
    @SequenceGenerator(name = "reserva_seq_generator", sequenceName = "reserva_seq", allocationSize = 1)
    @Column(name = "ID_RESERVA")
    private Long idReserva;

    @Column(name = "ID_HOTEL")
    private Long idHotel;

    @Column(name = "ID_HABITACION", nullable = false)
    private Long idHabitacion;

    @Column(name = "ID_USUARIO", nullable = false)
    private Long idUsuario;

    @Column(name = "CODIGO_RESERVA", nullable = false)
    private Integer codigoReserva;

    @Column(name = "PERSONAS_RESERVA", nullable = false)
    private Integer personasReserva;

    @Column(name = "FECHA_INGRESO", nullable = false)
    private LocalDate fechaIngreso;

    @Column(name = "FECHA_SALIDA", nullable = false)
    private LocalDate fechaSalida;

    @Column(name = "TOTAL_RESERVA")
    private Integer totalReserva;

    @Column(name = "ESTADO_RESERVA")
    private String estadoReserva;

    @Column(name = "TIPO_HABITACION")
    private Integer tipoHabitacion;

    /**
     * Obtiene el identificador único de la reserva.
     * @return El identificador de la reserva.
     */
    public Long getIdReserva() {
        return idReserva;
    }

    /**
     * Establece el identificador único de la reserva.
     * @param idReserva El nuevo identificador de la reserva.
     */
    public void setIdReserva(Long idReserva) {
        this.idReserva = idReserva;
    }

    /**
     * Obtiene el identificador del hotel asociado a la reserva.
     * @return El identificador del hotel.
     */
    public Long getIdHotel() {
        return idHotel;
    }

    /**
     * Establece el identificador del hotel asociado a la reserva.
     * @param idHotel El nuevo identificador del hotel.
     */
    public void setIdHotel(Long idHotel) {
        this.idHotel = idHotel;
    }

    /**
     * Obtiene el identificador de la habitación reservada.
     * @return El identificador de la habitación.
     */
    public Long getIdHabitacion() {
        return idHabitacion;
    }

    /**
     * Establece el identificador de la habitación reservada.
     * @param idHabitacion El nuevo identificador de la habitación.
     */
    public void setIdHabitacion(Long idHabitacion) {
        this.idHabitacion = idHabitacion;
    }

    /**
     * Obtiene el identificador del usuario que realiza la reserva.
     * @return El identificador del usuario.
     */
    public Long getIdUsuario() {
        return idUsuario;
    }

    /**
     * Establece el identificador del usuario que realiza la reserva.
     * @param idUsuario El nuevo identificador del usuario.
     */
    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    /**
     * Obtiene el código de la reserva.
     * @return El código de la reserva.
     */
    public Integer getCodigoReserva() {
        return codigoReserva;
    }

    /**
     * Establece el código de la reserva.
     * @param codigoReserva El nuevo código de la reserva.
     */
    public void setCodigoReserva(Integer codigoReserva) {
        this.codigoReserva = codigoReserva;
    }

    /**
     * Obtiene el número de personas incluidas en la reserva.
     * @return El número de personas.
     */
    public Integer getPersonasReserva() {
        return personasReserva;
    }

    /**
     * Establece el número de personas incluidas en la reserva.
     * @param personasReserva El nuevo número de personas.
     */
    public void setPersonasReserva(Integer personasReserva) {
        this.personasReserva = personasReserva;
    }

    /**
     * Obtiene la fecha de ingreso programada para la reserva.
     * @return La fecha de ingreso.
     */
    public LocalDate getFechaIngreso() {
        return fechaIngreso;
    }

    /**
     * Establece la fecha de ingreso programada para la reserva.
     * @param fechaIngreso La nueva fecha de ingreso.
     */
    public void setFechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    /**
     * Obtiene la fecha de salida programada para la reserva.
     * @return La fecha de salida.
     */
    public LocalDate getFechaSalida() {
        return fechaSalida;
    }

    /**
     * Establece la fecha de salida programada para la reserva.
     * @param fechaSalida La nueva fecha de salida.
     */
    public void setFechaSalida(LocalDate fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    /**
     * Obtiene el total calculado para el costo de la reserva.
     * @return El total de la reserva.
     */
    public Integer getTotalReserva() {
        return totalReserva;
    }

    /**
     * Establece el total calculado para el costo de la reserva.
     * @param totalReserva El nuevo total de la reserva.
     */
    public void setTotalReserva(Integer totalReserva) {
        this.totalReserva = totalReserva;
    }

    /**
     * Obtiene el estado actual de la reserva (por ejemplo, "confirmada", "cancelada").
     * @return El estado de la reserva.
     */
    public String getEstadoReserva() {
        return estadoReserva;
    }

    /**
     * Establece el estado actual de la reserva.
     * @param estadoReserva El nuevo estado de la reserva.
     */
    public void setEstadoReserva(String estadoReserva) {
        this.estadoReserva = estadoReserva;
    }

    /**
     * Obtiene el tipo de habitación reservada.
     * @return El tipo de habitación.
     */
    public Integer getTipoHabitacion() {
        return tipoHabitacion;
    }

    /**
     * Establece el tipo de habitación reservada.
     * @param tipoHabitacion El nuevo tipo de habitación.
     */
    public void setTipoHabitacion(Integer tipoHabitacion) {
        this.tipoHabitacion = tipoHabitacion;
    }

    

    // hashCode, equals, toString
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Reservas)) return false;
        Reservas reservas = (Reservas) o;
        return Objects.equals(idReserva, reservas.idReserva) &&
                Objects.equals(idHotel, reservas.idHotel); 
    }

    @Override
    public int hashCode() {
        return Objects.hash(idReserva, idHotel); 
    }

    @Override
    public String toString() {
        return "Reservas{" +
                "idReserva=" + idReserva +
                ", idHotel=" + idHotel +
                ", idHabitacion=" + idHabitacion +
                ", idUsuario=" + idUsuario +
                ", codigoReserva=" + codigoReserva +
                ", personasReserva=" + personasReserva +
                ", fechaIngreso=" + fechaIngreso +
                ", fechaSalida=" + fechaSalida +
                ", totalReserva=" + totalReserva +
                ", estadoReserva='" + estadoReserva + '\'' +
                ", tipoHabitacion=" + tipoHabitacion +
                '}';
    }
}