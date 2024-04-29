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
 *
 * @author root
 */

@Entity
public class Tipos_habitacion {
    
    @Id
    @GeneratedValue
    private Long id_tipo;
    
    private String tipo;

    @Column(name = "IMAGEN_URL")
    private String imagenUrl;

        @ElementCollection(fetch = FetchType.LAZY)
    private List<String> urlsImagenes = new ArrayList<>();



    public Long getId_tipo() {
        return id_tipo;
    }

    public void setId_tipo(Long id_tipo) {
        this.id_tipo = id_tipo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }


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