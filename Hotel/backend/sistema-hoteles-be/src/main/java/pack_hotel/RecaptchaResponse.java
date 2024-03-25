package pack_hotel;

import java.util.HashMap;
import java.util.Map;

public class RecaptchaResponse {

    private boolean success;
    private double score;
    private String action;
    private String challenge_ts;
    private String hostname;
    private Map<String, String> errorCodes = new HashMap<>();

    // Getters y Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getChallenge_ts() {
        return challenge_ts;
    }

    public void setChallenge_ts(String challenge_ts) {
        this.challenge_ts = challenge_ts;
    }

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public Map<String, String> getErrorCodes() {
        return errorCodes;
    }

    public void setErrorCodes(Map<String, String> errorCodes) {
        this.errorCodes = errorCodes;
    }
}
