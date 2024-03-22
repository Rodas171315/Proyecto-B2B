package pack_agencia;

public class HospedajeFavorito {
    private int id;
    private String nombre;
    private String ciudad;
    private String pais;
    private double precioPorNoche;
    private int calificacion;
    private String imagen;
    private String descripcion;


    public HospedajeFavorito() {
    }


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

