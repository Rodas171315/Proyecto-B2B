package pack_agencia;

public class Hospedaje {
    private int id;
    private String ciudad;
    private String nombre;
    private String descripcion;
    private String precio;
    private Disponibilidad disponibilidad;
    private int capacidadMax;

    public Hospedaje() {
    }


    public Hospedaje(int id, String ciudad, String nombre, String descripcion, String precio, Disponibilidad disponibilidad, int capacidadMax) {
        this.id = id;
        this.ciudad = ciudad;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.disponibilidad = disponibilidad;
        this.capacidadMax = capacidadMax;
    }


    public int getId() {
        return id;
    }

    public String getCiudad() {
        return ciudad;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getPrecio() {
        return precio;
    }

    public Disponibilidad getDisponibilidad() {
        return disponibilidad;
    }

    public int getCapacidadMax() {
        return capacidadMax;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setPrecio(String precio) {
        this.precio = precio;
    }

    public void setDisponibilidad(Disponibilidad disponibilidad) {
        this.disponibilidad = disponibilidad;
    }

    public void setCapacidadMax(int capacidadMax) {
        this.capacidadMax = capacidadMax;
    }


    public static class Disponibilidad {
        private String inicio;
        private String fin;


        public Disponibilidad() {
        }


        public Disponibilidad(String inicio, String fin) {
            this.inicio = inicio;
            this.fin = fin;
        }


        public String getInicio() {
            return inicio;
        }

        public String getFin() {
            return fin;
        }


        public void setInicio(String inicio) {
            this.inicio = inicio;
        }

        public void setFin(String fin) {
            this.fin = fin;
        }
    }
}
