package pack_agencia;

import java.util.List;

/**
 * Representa un vuelo en el sistema de gestión de la agencia.
 * Contiene detalles como origen, destino, fecha, hora, aerolínea, precio y las clases disponibles.
 */
public class Vuelo {
    private Long id;
    private String origen;
    private String destino;
    private String fecha;
    private String hora;
    private String aerolinea;
    private String precio;
    private List<String> clasesDisponibles;

    /**
     * Constructor por defecto.
     */
    public Vuelo() {
    }

    /**
     * Constructor con parámetros para crear un nuevo vuelo con toda la información necesaria.
     * @param id El identificador único del vuelo.
     * @param origen Ciudad de origen del vuelo.
     * @param destino Ciudad destino del vuelo.
     * @param fecha Fecha del vuelo.
     * @param hora Hora de salida del vuelo.
     * @param aerolinea Aerolínea que opera el vuelo.
     * @param precio Precio del vuelo.
     * @param clasesDisponibles Lista de clases disponibles en el vuelo (ej. económica, primera clase).
     */
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

