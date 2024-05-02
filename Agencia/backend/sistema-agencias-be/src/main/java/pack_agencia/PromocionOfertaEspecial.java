package pack_agencia;

import java.util.List;

/**
 * La clase PromocionOfertaEspecial representa una oferta especial de paquetes turísticos
 * en el sistema de agencia de viajes. Incluye detalles sobre la promoción como el paquete,
 * precio, lo que incluye, imagen representativa y descripción.
 */
public class PromocionOfertaEspecial {
    private int id;
    private String paquete;
    private double precio;
    private List<String> incluye;
    private String imagen;
    private String descripcion;

    /**
     * Constructor por defecto.
     */
    public PromocionOfertaEspecial() {
    }

    /**
     * Constructor con parámetros para crear una promoción de oferta especial con todos los detalles.
     * @param id Identificador único de la promoción.
     * @param paquete Nombre del paquete promocionado.
     * @param precio Precio de la oferta.
     * @param incluye Lista de características o servicios incluidos en la promoción.
     * @param imagen URL o referencia a la imagen representativa de la oferta.
     * @param descripcion Descripción detallada de la oferta.
     */
    public PromocionOfertaEspecial(int id, String paquete, double precio, List<String> incluye, String imagen, String descripcion) {
        this.id = id;
        this.paquete = paquete;
        this.precio = precio;
        this.incluye = incluye;
        this.imagen = imagen;
        this.descripcion = descripcion;
    }

    // Métodos getters y setters

    /**
     * Obtiene el ID de la promoción.
     * @return ID de la promoción.
     */
    public int getId() {
        return id;
    }

    /**
     * Establece el ID de la promoción.
     * @param id ID de la promoción.
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Obtiene el nombre del paquete promocionado.
     * @return Nombre del paquete.
     */
    public String getPaquete() {
        return paquete;
    }

    /**
     * Establece el nombre del paquete promocionado.
     * @param paquete Nombre del paquete.
     */
    public void setPaquete(String paquete) {
        this.paquete = paquete;
    }

    /**
     * Obtiene el precio de la oferta.
     * @return Precio de la oferta.
     */
    public double getPrecio() {
        return precio;
    }

    /**
     * Establece el precio de la oferta.
     * @param precio Precio de la oferta.
     */
    public void setPrecio(double precio) {
        this.precio = precio;
    }

    /**
     * Obtiene la lista de características o servicios incluidos en la oferta.
     * @return Lista de servicios incluidos.
     */
    public List<String> getIncluye() {
        return incluye;
    }

    /**
     * Establece la lista de características o servicios incluidos en la oferta.
     * @param incluye Lista de servicios incluidos.
     */
    public void setIncluye(List<String> incluye) {
        this.incluye = incluye;
    }

    /**
     * Obtiene la imagen representativa de la oferta.
     * @return URL o referencia de la imagen.
     */
    public String getImagen() {
        return imagen;
    }

    /**
     * Establece la imagen representativa de la oferta.
     * @param imagen URL o referencia de la imagen.
     */
    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    /**
     * Obtiene la descripción detallada de la oferta.
     * @return Descripción de la oferta.
     */
    public String getDescripcion() {
        return descripcion;
    }

    /**
     * Establece la descripción detallada de la oferta.
     * @param descripcion Descripción de la oferta.
     */
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}

