/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;

/**
 * La clase {@code Tipos_habitacion} representa los diferentes tipos de habitaciones disponibles en el hotel,
 * cada tipo de habitación tiene un identificador único, un nombre, y una lista de URLs de imágenes asociadas.
 */
@Entity
public class Tipos_habitacion {
    
    @Id
    @GeneratedValue
    private Long id_tipo;
    
    private String tipo;

    @Column(name = "IMAGEN_URL")
    private String imagenUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> urlsImagenes = new ArrayList<>();

    /**
     * Obtiene el identificador único del tipo de habitación.
     * @return El identificador del tipo de habitación.
     */
    public Long getId_tipo() {
        return id_tipo;
    }

    /**
     * Establece el identificador único del tipo de habitación.
     * @param id_tipo El nuevo identificador del tipo de habitación.
     */
    public void setId_tipo(Long id_tipo) {
        this.id_tipo = id_tipo;
    }

    /**
     * Obtiene el nombre del tipo de habitación.
     * @return El nombre del tipo de habitación.
     */
    public String getTipo() {
        return tipo;
    }

    /**
     * Establece el nombre del tipo de habitación.
     * @param tipo El nuevo nombre del tipo de habitación.
     */
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    /**
     * Obtiene la URL de la imagen representativa del tipo de habitación.
     * @return La URL de la imagen.
     */
    public String getImagenUrl() {
        return imagenUrl;
    }

    /**
     * Establece la URL de la imagen representativa del tipo de habitación.
     * @param imagenUrl La nueva URL de la imagen.
     */
    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    /**
     * Obtiene la lista de URLs de imágenes asociadas al tipo de habitación.
     * @return La lista de URLs de imágenes.
     */
    public List<String> getUrlsImagenes() {
        return urlsImagenes;
    }

    /**
     * Actualiza la lista de URLs de imágenes asociadas al tipo de habitación.
     * @param nuevasUrls La nueva lista de URLs de imágenes.
     */
    public void actualizarUrlsImagenes(List<String> nuevasUrls) {
        this.urlsImagenes.clear();
        if (nuevasUrls != null) {
            this.urlsImagenes.addAll(nuevasUrls);
        }
    }
    

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Tipos_habitacion that = (Tipos_habitacion) obj;
        return Objects.equals(id_tipo, that.id_tipo) &&
               Objects.equals(tipo, that.tipo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id_tipo, tipo);
    }

    @Override
    public String toString() {
        return "Tipos_habitacion{" +
               "id_tipo=" + id_tipo +
               ", tipo='" + tipo + '\'' +
               '}';
    }
}