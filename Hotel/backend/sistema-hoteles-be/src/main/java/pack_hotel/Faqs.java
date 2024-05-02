package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * La clase {@code Faqs} representa una pregunta frecuente en un sistema de gestión hotelera.
 */
@Entity
public class Faqs {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String pregunta;
    
    private String respuesta;

    /**
     * Constructor por defecto.
     */
    public Faqs() {
    }

    /**
     * Devuelve el identificador único de la FAQ.
     * @return identificador de la FAQ.
     */
    public Long getId() {
        return id;
    }

    /**
     * Devuelve la pregunta de la FAQ.
     * @return pregunta de la FAQ.
     */
    public String getPregunta() {
        return pregunta;
    }

    /**
     * Devuelve la respuesta de la FAQ.
     * @return respuesta de la FAQ.
     */
    public String getRespuesta() {
        return respuesta;
    }

    /**
     * Establece el identificador único de la FAQ.
     * @param id identificador de la FAQ.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Establece la pregunta de la FAQ.
     * @param pregunta pregunta de la FAQ.
     */
    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    /**
     * Establece la respuesta de la FAQ.
     * @param respuesta respuesta de la FAQ.
     */
    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Faqs)) return false;
        Faqs faq = (Faqs) o;
        return id != null && id.equals(faq.id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Faq{" +
                "id=" + id +
                ", pregunta='" + pregunta + '\'' +
                ", respuesta='" + respuesta + '\'' +
                '}';
    }
}

