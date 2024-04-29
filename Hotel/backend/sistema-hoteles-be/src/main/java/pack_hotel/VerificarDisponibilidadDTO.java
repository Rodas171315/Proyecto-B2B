package pack_hotel;


/**
 * Clase de Transferencia de Datos (Data Transfer Object, DTO) para verificar la disponibilidad de una habitación.
 * Utilizada para transportar la información necesaria para verificar si una habitación está disponible entre dos fechas.
 */
public class VerificarDisponibilidadDTO {
    private Long idHabitacion;
    private String fechaIngreso;
    private String fechaSalida;

    /**
     * Obtiene el identificador de la habitación.
     * @return el identificador de la habitación.
     */
    public Long getIdHabitacion() {
        return idHabitacion;
    }

    /**
     * Establece el identificador de la habitación.
     * @param idHabitacion El nuevo identificador de la habitación.
     */
    public void setIdHabitacion(Long idHabitacion) {
        this.idHabitacion = idHabitacion;
    }

    /**
     * Obtiene la fecha de ingreso.
     * @return la fecha de ingreso en formato de cadena.
     */
    public String getFechaIngreso() {
        return fechaIngreso;
    }

    /**
     * Establece la fecha de ingreso.
     * @param fechaIngreso La nueva fecha de ingreso en formato de cadena.
     */
    public void setFechaIngreso(String fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    /**
     * Obtiene la fecha de salida.
     * @return la fecha de salida en formato de cadena.
     */
    public String getFechaSalida() {
        return fechaSalida;
    }

    /**
     * Establece la fecha de salida.
     * @param fechaSalida La nueva fecha de salida en formato de cadena.
     */
    public void setFechaSalida(String fechaSalida) {
        this.fechaSalida = fechaSalida;
    }
}