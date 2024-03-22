package pack_agencia;

public class Compra {
    private int vueloId;
    private String nombre;
    private String email;
    // Otros campos necesarios para la compra

    // Constructor, getters y setters
    public Compra() {}

    public int getVueloId() {
        return vueloId;
    }

    public void setVueloId(int vueloId) {
        this.vueloId = vueloId;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Otros getters y setters
}
