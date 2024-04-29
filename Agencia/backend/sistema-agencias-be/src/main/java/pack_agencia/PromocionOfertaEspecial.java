package pack_agencia;

import java.util.List;

public class PromocionOfertaEspecial {
    private int id;
    private String paquete;
    private double precio;
    private List<String> incluye;
    private String imagen;
    private String descripcion;

   
    public PromocionOfertaEspecial() {
    }

    
    public PromocionOfertaEspecial(int id, String paquete, double precio, List<String> incluye, String imagen, String descripcion) {
        this.id = id;
        this.paquete = paquete;
        this.precio = precio;
        this.incluye = incluye;
        this.imagen = imagen;
        this.descripcion = descripcion;
    }

   
    public int getId() {
        return id;
    }

    public String getPaquete() {
        return paquete;
    }

    public double getPrecio() {
        return precio;
    }

    public List<String> getIncluye() {
        return incluye;
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

    public void setPaquete(String paquete) {
        this.paquete = paquete;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public void setIncluye(List<String> incluye) {
        this.incluye = incluye;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}

