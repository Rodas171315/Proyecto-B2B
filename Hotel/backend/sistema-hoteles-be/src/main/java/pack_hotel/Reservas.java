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

    public Integer getCodigoReserva() {
        return codigoReserva;
    }

    public void setCodigoReserva(Integer codigoReserva) {
        this.codigoReserva = codigoReserva;
    }

    public Integer getPersonasReserva() {
        return personasReserva;
    }

    public void setPersonasReserva(Integer personasReserva) {
        this.personasReserva = personasReserva;
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

        public Integer getTipoHabitacion() {
        return tipoHabitacion;
    }

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