package pack_agencia;

/**
 * La clase Hospedaje representa un lugar de alojamiento en el sistema de agencia de viajes.
 * Contiene detalles sobre el hospedaje como el nombre, la ciudad, la descripción, el precio,
 * la capacidad máxima y la disponibilidad.
 */
public class Hospedaje {
    private int id;
    private String ciudad;
    private String nombre;
    private String descripcion;
    private String precio;
    private Disponibilidad disponibilidad;
    private int capacidadMax;

    /**
     * Constructor por defecto para crear una instancia vacía de Hospedaje.
     */
    public Hospedaje() {
    }

    /**
     * Constructor para crear una instancia de Hospedaje con todos los detalles proporcionados.
     * @param id Identificador del hospedaje.
     * @param ciudad Ciudad donde se encuentra el hospedaje.
     * @param nombre Nombre del hospedaje.
     * @param descripcion Descripción del hospedaje.
     * @param precio Precio por noche del hospedaje.
     * @param disponibilidad Disponibilidad del hospedaje.
     * @param capacidadMax Capacidad máxima de huéspedes para el hospedaje.
     */
    public Hospedaje(int id, String ciudad, String nombre, String descripcion, String precio, Disponibilidad disponibilidad, int capacidadMax) {
        this.id = id;
        this.ciudad = ciudad;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.disponibilidad = disponibilidad;
        this.capacidadMax = capacidadMax;
    }

    // Métodos getters y setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getPrecio() {
        return precio;
    }

    public void setPrecio(String precio) {
        this.precio = precio;
    }

    public Disponibilidad getDisponibilidad() {
        return disponibilidad;
    }

    public void setDisponibilidad(Disponibilidad disponibilidad) {
        this.disponibilidad = disponibilidad;
    }

    public int getCapacidadMax() {
        return capacidadMax;
    }

    public void setCapacidadMax(int capacidadMax) {
        this.capacidadMax = capacidadMax;
    }

    /**
     * Clase interna Disponibilidad que define el periodo de tiempo durante el cual el hospedaje está disponible.
     */
    public static class Disponibilidad {
        private String inicio;
        private String fin;

        /**
         * Constructor por defecto para la disponibilidad.
         */
        public Disponibilidad() {
        }

        /**
         * Constructor para crear una disponibilidad con fechas específicas de inicio y fin.
         * @param inicio Fecha de inicio de la disponibilidad.
         * @param fin Fecha de fin de la disponibilidad.
         */
        public Disponibilidad(String inicio, String fin) {
            this.inicio = inicio;
            this.fin = fin;
        }

        public String getInicio() {
            return inicio;
        }

        public void setInicio(String inicio) {
            this.inicio = inicio;
        }

        public String getFin() {
            return fin;
        }

        public void setFin(String fin) {
            this.fin = fin;
        }
    }
}

