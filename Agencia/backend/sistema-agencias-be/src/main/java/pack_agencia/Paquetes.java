package pack_agencia;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * La clase {@code Paquetes} representa un paquete turístico en el sistema de agencia de viajes.
 * Incluye detalles sobre el paquete como el nombre, descripción y detalles asociados de hotel y vuelo.
 */
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

    @Column(name = "id_Usuario")
    private Long idUsuario;

    @Column(name = "id_ReservaHabitacion")
    private Long idReservaHabitacion;

    @Column(name = "id_Boleto")
    private String idBoleto;

    /**
     * Obtiene el ID del paquete.
     * @return El ID del paquete.
     */
    public Long getIdPaquete() {
        return idPaquete;
    }

    /**
     * Obtiene el nombre del paquete.
     * @return El nombre del paquete.
     */
    public String getNombrePaquete() {
        return nombrePaquete;
    }

    /**
     * Obtiene la descripción del paquete.
     * @return La descripción del paquete.
     */
    public String getDescripcion() {
        return descripcion;
    }

    /**
     * Obtiene el ID del hotel asociado al paquete.
     * @return El ID del hotel.
     */
    public Long getIdHotel() {
        return idHotel;
    }

    /**
     * Obtiene el ID de la habitación del hotel asociada al paquete.
     * @return El ID de la habitación.
     */
    public Long getIdHabitacion() {
        return idHabitacion;
    }

    /**
     * Obtiene el ID del vuelo asociado al paquete.
     * @return El ID del vuelo.
     */
    public String getIdVuelo() {
        return idVuelo;
    }

    /**
     * Obtiene el estado del paquete.
     * @return El estado del paquete.
     */
    public String getEstadoPaquete() {
        return estadoPaquete;
    }

    /**
     * Obtiene el ID del usuario que reservó el paquete.
     * @return El ID del usuario.
     */
    public Long getIdUsuario() {
        return idUsuario;
    }

    /**
     * Obtiene el ID de la reserva de habitación.
     * @return El ID de la reserva de la habitación.
     */
    public Long getIdReservaHabitacion() {
        return idReservaHabitacion;
    }

    /**
     * Obtiene el ID del boleto asociado al paquete.
     * @return El ID del boleto.
     */
    public String getIdBoleto() {
        return idBoleto;
    }

    /**
     * Establece el ID del paquete.
     * @param idPaquete El nuevo ID del paquete.
     */
    public void setIdPaquete(Long idPaquete) {
        this.idPaquete = idPaquete;
    }

    /**
     * Establece el nombre del paquete.
     * @param nombrePaquete El nuevo nombre del paquete.
     */
    public void setNombrePaquete(String nombrePaquete) {
        this.nombrePaquete = nombrePaquete;
    }

    /**
     * Establece la descripción del paquete.
     * @param descripcion La nueva descripción del paquete.
     */
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    /**
     * Establece el ID del hotel asociado al paquete.
     * @param idHotel El nuevo ID del hotel.
     */
    public void setIdHotel(Long idHotel) {
        this.idHotel = idHotel;
    }

    /**
     * Establece el ID de la habitación asociada al paquete.
     * @param idHabitacion El nuevo ID de la habitación.
     */
    public void setIdHabitacion(Long idHabitacion) {
        this.idHabitacion = idHabitacion;
    }

    /**
     * Establece el ID del vuelo asociado al paquete.
     * @param idVuelo El nuevo ID del vuelo.
     */
    public void setIdVuelo(String idVuelo) {
        this.idVuelo = idVuelo;
    }

    /**
     * Establece el estado del paquete.
     * @param estadoPaquete El nuevo estado del paquete.
     */
    public void setEstadoPaquete(String estadoPaquete) {
        this.estadoPaquete = estadoPaquete;
    }

    /**
     * Establece el ID del usuario que reservó el paquete.
     * @param idUsuario El nuevo ID del usuario.
     */
    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    /**
     * Establece el ID de la reserva de habitación.
     * @param idReservaHabitacion El nuevo ID de la reserva de la habitación.
     */
    public void setIdReservaHabitacion(Long idReservaHabitacion) {
        this.idReservaHabitacion = idReservaHabitacion;
    }

    /**
     * Establece el ID del boleto asociado al paquete.
     * @param idBoleto El nuevo ID del boleto.
     */
    public void setIdBoleto(String idBoleto) {
        this.idBoleto = idBoleto;
    }
}

