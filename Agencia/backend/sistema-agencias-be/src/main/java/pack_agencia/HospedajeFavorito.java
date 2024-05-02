package pack_agencia;

/**
 * Representa un hospedaje favorito, con detalles sobre la ubicación, precio y características.
 */
public class HospedajeFavorito {
    private int id;
    private String nombre;
    private String ciudad;
    private String pais;
    private double precioPorNoche;
    private int calificacion;
    private String imagen;
    private String descripcion;

    /**
     * Constructor por defecto.
     */
    public HospedajeFavorito() {
    }

    /**
     * Constructor con parámetros para crear un nuevo hospedaje favorito.
     * @param id Identificador único del hospedaje.
     * @param nombre Nombre del hospedaje.
     * @param ciudad Ciudad donde se encuentra el hospedaje.
     * @param pais País donde se encuentra el hospedaje.
     * @param precioPorNoche Precio por noche en el hospedaje.
     * @param calificacion Calificación promedio del hospedaje.
     * @param imagen URL de la imagen representativa del hospedaje.
     * @param descripcion Descripción breve del hospedaje.
     */
    public HospedajeFavorito(int id, String nombre, String ciudad, String pais, double precioPorNoche, int calificacion, String imagen, String descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.pais = pais;
        this.precioPorNoche = precioPorNoche;
        this.calificacion = calificacion;
        this.imagen = imagen;
        this.descripcion = descripcion;
    }


    public int getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getCiudad() {
        return ciudad;
    }

    public String getPais() {
        return pais;
    }

    public double getPrecioPorNoche() {
        return precioPorNoche;
    }

    public int getCalificacion() {
        return calificacion;
    }

    public String getImagen() {
        return imagen;
    }

    public String getDescripcion() {
        return descripcion;
    }

  
    public void setId(int id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public void setPrecioPorNoche(double precioPorNoche) {
        this.precioPorNoche = precioPorNoche;
    }

    public void setCalificacion(int calificacion) {
        this.calificacion = calificacion;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}

