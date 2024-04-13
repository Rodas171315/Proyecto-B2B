package pack_hotel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Faqs {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String pregunta;
    
    private String respuesta;

    // Constructor
    public Faqs() {
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getPregunta() {
        return pregunta;
    }

    public String getRespuesta() {
        return respuesta;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

    // hashCode, equals, y toString pueden ser generados por tu IDE para facilitar la depuración y el manejo en colecciones
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
