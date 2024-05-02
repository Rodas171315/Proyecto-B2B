package pack_agencia;

/**
 * La clase DestinoPopular representa un destino turístico popular en el sistema de agencias de viajes.
 * Almacena detalles sobre el destino, incluyendo su identificador, ciudad, país, imagen representativa,
 * descripción y precio de paquetes turísticos asociados.
 */
public class DestinoPopular {
    private int id;
    private String ciudad;
    private String pais;
    private String imagen;
    private String descripcion;
    private double precio;

    /**
     * Constructor por defecto para crear una instancia vacía de DestinoPopular.
     */
    public DestinoPopular() {
    }

    /**
     * Constructor para crear una instancia de DestinoPopular con todos los detalles proporcionados.
     * @param id Identificador del destino.
     * @param ciudad Ciudad del destino.
     * @param pais País del destino.
     * @param imagen URL de la imagen representativa del destino.
     * @param descripcion Descripción del destino.
     * @param precio Precio estimado para viajar al destino.
     */
    public DestinoPopular(int id, String ciudad, String pais, String imagen, String descripcion, double precio) {
        this.id = id;
        this.ciudad = ciudad;
        this.pais = pais;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    /**
     * Obtiene el identificador del destino.
     * @return el identificador del destino.
     */
    public int getId() {
        return id;
    }

    /**
     * Obtiene la ciudad del destino.
     * @return la ciudad del destino.
     */
    public String getCiudad() {
        return ciudad;
    }

    /**
     * Obtiene el país del destino.
     * @return el país del destino.
     */
    public String getPais() {
        return pais;
    }

    /**
     * Obtiene la URL de la imagen representativa del destino.
     * @return la URL de la imagen.
     */
    public String getImagen() {
        return imagen;
    }

    /**
     * Obtiene la descripción del destino.
     * @return la descripción del destino.
     */
    public String getDescripcion() {
        return descripcion;
    }

    /**
     * Obtiene el precio estimado para viajar al destino.
     * @return el precio del destino.
     */
    public double getPrecio() {
        return precio;
    }

    /**
     * Establece el identificador del destino.
     * @param id el nuevo identificador del destino.
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Establece la ciudad del destino.
     * @param ciudad la nueva ciudad del destino.
     */
    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    /**
     * Establece el país del destino.
     * @param pais el nuevo país del destino.
     */
    public void setPais(String pais) {
        this.pais = pais;
    }

    /**
     * Establece la URL de la imagen representativa del destino.
     * @param imagen la nueva URL de la imagen.
     */
    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    /**
     * Establece la descripción del destino.
     * @param descripcion la nueva descripción del destino.
     */
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    /**
     * Establece el precio estimado para viajar al destino.
     * @param precio el nuevo precio del destino.
     */
    public void setPrecio(double precio) {
        this.precio = precio;
    }
}


