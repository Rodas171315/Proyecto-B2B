package pack_hotel;

/**
 * La clase {@code RecaptchaResponse} representa la respuesta recibida del servicio de reCAPTCHA.
 * Incluye información sobre el éxito de la verificación, el timestamp del desafío, el nombre del host y los posibles códigos de error.
 */
public class RecaptchaResponse {

    private boolean success;
    private String challenge_ts;
    private String hostname;
    private String[] errorCodes;

    /**
     * Verifica si la respuesta de reCAPTCHA fue exitosa.
     * @return {@code true} si la verificación fue exitosa, {@code false} en caso contrario.
     */
    public boolean isSuccess() {
        return success;
    }

    /**
     * Establece el resultado de la verificación de reCAPTCHA.
     * @param success {@code true} si la verificación fue exitosa, {@code false} en caso contrario.
     */
    public void setSuccess(boolean success) {
        this.success = success;
    }

    /**
     * Obtiene el timestamp del desafío reCAPTCHA.
     * @return El timestamp del desafío.
     */
    public String getChallenge_ts() {
        return challenge_ts;
    }

    /**
     * Establece el timestamp del desafío reCAPTCHA.
     * @param challenge_ts El nuevo timestamp del desafío.
     */
    public void setChallenge_ts(String challenge_ts) {
        this.challenge_ts = challenge_ts;
    }

    /**
     * Obtiene el nombre del host donde se verificó el reCAPTCHA.
     * @return El nombre del host.
     */
    public String getHostname() {
        return hostname;
    }

    /**
     * Establece el nombre del host donde se verificó el reCAPTCHA.
     * @param hostname El nuevo nombre del host.
     */
    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    /**
     * Obtiene los códigos de error de reCAPTCHA si la verificación falló.
     * @return Un arreglo de strings con los códigos de error.
     */
    public String[] getErrorCodes() {
        return errorCodes;
    }

    /**
     * Establece los códigos de error de reCAPTCHA.
     * @param errorCodes Un arreglo de strings con los nuevos códigos de error.
     */
    public void setErrorCodes(String[] errorCodes) {
        this.errorCodes = errorCodes;
    }
}

