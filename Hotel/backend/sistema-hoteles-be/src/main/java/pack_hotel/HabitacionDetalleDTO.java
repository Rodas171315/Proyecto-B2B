package pack_hotel;
import java.util.Objects;

import java.util.List;

public class HabitacionDetalleDTO {
    private Long idHabitacion;
    private boolean disponible;
    private int numeroHabitacion;
    private int capacidadPersonas;
    private double precioXPersona;
    private double precioXNoche;
    private int valuacion;

    private Long idHotel;
    private String nombreHotel;
    private String paisHotel;
    private String ciudadHotel;
    private String direccionHotel;
    private String imagenHotelUrl; // URL principal del hotel

    private String tipoHabitacion;
    private List<String> imagenesTipoHabitacion; // URLs de imágenes del tipo de habitación

    // Constructor completo
    public HabitacionDetalleDTO(Long idHabitacion, boolean disponible, int numeroHabitacion, int capacidadPersonas, double precioXPersona, double precioXNoche, int valuacion, Long idHotel, String nombreHotel, String paisHotel, String ciudadHotel, String direccionHotel, String imagenHotelUrl, String tipoHabitacion, List<String> imagenesTipoHabitacion) {
        this.idHabitacion = idHabitacion;
        this.disponible = disponible;
        this.numeroHabitacion = numeroHabitacion;
        this.capacidadPersonas = capacidadPersonas;
        this.precioXPersona = precioXPersona;
        this.precioXNoche = precioXNoche;
        this.valuacion = valuacion;
        this.idHotel = idHotel;
        this.nombreHotel = nombreHotel;
        this.paisHotel = paisHotel;
        this.ciudadHotel = ciudadHotel;
        this.direccionHotel = direccionHotel;
        this.imagenHotelUrl = imagenHotelUrl;
        this.tipoHabitacion = tipoHabitacion;
        this.imagenesTipoHabitacion = imagenesTipoHabitacion;
    }
    // Getters
    public Long getIdHabitacion() { return idHabitacion; }
    public boolean isDisponible() { return disponible; }
    public int getNumeroHabitacion() { return numeroHabitacion; }
    public int getCapacidadPersonas() { return capacidadPersonas; }
    public double getPrecioXPersona() { return precioXPersona; }
    public double getPrecioXNoche() { return precioXNoche; }
    public int getValuacion() { return valuacion; }
    public Long getIdHotel() { return idHotel; }
    public String getNombreHotel() { return nombreHotel; }
    public String getPaisHotel() { return paisHotel; }
    public String getCiudadHotel() { return ciudadHotel; }
    public String getDireccionHotel() { return direccionHotel; }
    public String getImagenHotelUrl() { return imagenHotelUrl; }
    public String getTipoHabitacion() { return tipoHabitacion; }
    public List<String> getImagenesTipoHabitacion() { return imagenesTipoHabitacion; }

    // Setters
    public void setIdHabitacion(Long idHabitacion) { this.idHabitacion = idHabitacion; }
    public void setDisponible(boolean disponible) { this.disponible = disponible; }
    public void setNumeroHabitacion(int numeroHabitacion) { this.numeroHabitacion = numeroHabitacion; }
    public void setCapacidadPersonas(int capacidadPersonas) { this.capacidadPersonas = capacidadPersonas; }
    public void setPrecioXPersona(double precioXPersona) { this.precioXPersona = precioXPersona; }
    public void setPrecioXNoche(double precioXNoche) { this.precioXNoche = precioXNoche; }
    public void setValuacion(int valuacion) { this.valuacion = valuacion; }
    public void setIdHotel(Long idHotel) { this.idHotel = idHotel; }
    public void setNombreHotel(String nombreHotel) { this.nombreHotel = nombreHotel; }
    public void setPaisHotel(String paisHotel) { this.paisHotel = paisHotel; }
    public void setCiudadHotel(String ciudadHotel) { this.ciudadHotel = ciudadHotel; }
    public void setDireccionHotel(String direccionHotel) { this.direccionHotel = direccionHotel; }
    public void setImagenHotelUrl(String imagenHotelUrl) { this.imagenHotelUrl = imagenHotelUrl; }
    public void setTipoHabitacion(String tipoHabitacion) { this.tipoHabitacion = tipoHabitacion; }
    public void setImagenesTipoHabitacion(List<String> imagenesTipoHabitacion) { this.imagenesTipoHabitacion = imagenesTipoHabitacion; }

    // Sobrescribe los métodos toString(), equals() y hashCode()
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HabitacionDetalleDTO that = (HabitacionDetalleDTO) o;
        return idHabitacion.equals(that.idHabitacion);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idHabitacion);
    }

    @Override
    public String toString() {
        return "HabitacionDetalleDTO{" +
                "idHabitacion=" + idHabitacion +
                ", disponible=" + disponible +
                ", numeroHabitacion=" + numeroHabitacion +
                ", capacidadPersonas=" + capacidadPersonas +
                ", precioXPersona=" + precioXPersona +
                ", precioXNoche=" + precioXNoche +
                ", valuacion=" + valuacion +
                ", idHotel=" + idHotel +
                ", nombreHotel='" + nombreHotel + '\'' +
                ", paisHotel='" + paisHotel + '\'' +
                ", ciudadHotel='" + ciudadHotel + '\'' +
                ", direccionHotel='" + direccionHotel + '\'' +
                ", imagenHotelUrl='" + imagenHotelUrl + '\'' +
                ", tipoHabitacion='" + tipoHabitacion + '\'' +
                ", imagenesTipoHabitacion=" + imagenesTipoHabitacion +
                '}';
    }
}