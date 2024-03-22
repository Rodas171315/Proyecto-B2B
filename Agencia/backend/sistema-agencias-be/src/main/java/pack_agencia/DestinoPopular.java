package pack_agencia;

public class DestinoPopular {
    private int id;
    private String ciudad;
    private String pais;
    private String imagen;
    private String descripcion;

    
    public DestinoPopular() {
    }

   
    public DestinoPopular(int id, String ciudad, String pais, String imagen, String descripcion) {
        this.id = id;
        this.ciudad = ciudad;
        this.pais = pais;
        this.imagen = imagen;
        this.descripcion = descripcion;
    }

    
    public int getId() {
        return id;
    }

    public String getCiudad() {
        return ciudad;
    }

    public String getPais() {
        return pais;
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

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}

