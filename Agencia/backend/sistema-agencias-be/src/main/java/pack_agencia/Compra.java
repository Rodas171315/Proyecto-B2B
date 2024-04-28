package pack_agencia;

/**
 * La clase Compra representa una compra de un vuelo en el sistema de agencias de viajes.
 * Almacena información relevante sobre la compra como el identificador del vuelo, el nombre del comprador y su email.
 */
public class Compra {
    private int vueloId;
    private String nombre;
    private String email;

    /**
     * Obtiene el identificador del vuelo comprado.
     * @return el identificador del vuelo.
     */
    public int getVueloId() {
        return vueloId;
    }

    /**
     * Establece el identificador del vuelo comprado.
     * @param vueloId el nuevo identificador del vuelo.
     */
    public void setVueloId(int vueloId) {
        this.vueloId = vueloId;
    }

    /**
     * Obtiene el nombre del comprador del vuelo.
     * @return el nombre del comprador.
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Establece el nombre del comprador del vuelo.
     * @param nombre el nuevo nombre del comprador.
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Obtiene el email del comprador del vuelo.
     * @return el email del comprador.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Establece el email del comprador del vuelo.
     * @param email el nuevo email del comprador.
     */
    public void setEmail(String email) {
        this.email = email;
    }
}
