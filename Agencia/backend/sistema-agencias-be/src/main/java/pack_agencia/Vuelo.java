package pack_agencia;

import java.util.List;

public class Vuelo {
    private Long id;
    private String origen;
    private String destino;
    private String fecha;
    private String hora;
    private String aerolinea;
    private String precio;
    private List<String> clasesDisponibles;


    public Vuelo() {
    }


    public Vuelo(Long id, String origen, String destino, String fecha, String hora, String aerolinea, String precio, List<String> clasesDisponibles) {
        this.id = id;
        this.origen = origen;
        this.destino = destino;
        this.fecha = fecha;
        this.hora = hora;
        this.aerolinea = aerolinea;
        this.precio = precio;
        this.clasesDisponibles = clasesDisponibles;
    }


    public Long getId() {
        return id;
    }

    public String getOrigen() {
        return origen;
    }

    public String getDestino() {
        return destino;
    }

    public String getFecha() {
        return fecha;
    }

    public String getHora() {
        return hora;
    }

    public String getAerolinea() {
        return aerolinea;
    }

    public String getPrecio() {
        return precio;
    }

    public List<String> getClasesDisponibles() {
        return clasesDisponibles;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public void setOrigen(String origen) {
        this.origen = origen;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public void setAerolinea(String aerolinea) {
        this.aerolinea = aerolinea;
    }

    public void setPrecio(String precio) {
        this.precio = precio;
    }

    public void setClasesDisponibles(List<String> clasesDisponibles) {
        this.clasesDisponibles = clasesDisponibles;
    }
}

