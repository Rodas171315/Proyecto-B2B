package pack_hotel;

public class UsuarioEdicionDTO {

    private Long id;
    private Integer rol;

    public UsuarioEdicionDTO() {
    }

    public UsuarioEdicionDTO(Long id, Integer rol) {
        this.id = id;
        this.rol = rol;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRol() {
        return rol;
    }

    public void setRol(Integer rol) {
        this.rol = rol;
    }

    @Override
    public String toString() {
        return "UsuarioEdicionDTO{" +
                "id=" + id +
                ", rol=" + rol +
                '}';
    }
}
